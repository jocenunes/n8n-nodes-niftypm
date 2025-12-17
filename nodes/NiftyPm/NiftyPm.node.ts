import {
	ILoadOptionsFunctions,
	INodeListSearchItems,
	INodeListSearchResult,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import { projectOperations, projectFields } from './resources/project/project.properties';
import { taskOperations, taskFields } from './resources/task/task.properties';
import { memberOperations, memberFields } from './resources/member/member.properties';
import { documentOperations, documentFields } from './resources/document/document.properties';
import { portfolioOperations, portfolioFields } from './resources/portfolio/portfolio.properties';
import { timeTrackingOperations, timeTrackingFields } from './resources/timeTracking/timeTracking.properties';
import { milestoneOperations, milestoneFields } from './resources/milestone/milestone.properties';
import { taskGroupOperations, taskGroupFields } from './resources/taskGroup/taskGroup.properties';
import { tagOperations, tagFields } from './resources/tag/tag.properties';
import { userFields, userOperations } from './resources/user/user.properties';

// Helper function to extract value from resourceLocator or string
function extractResourceLocatorValue(param: unknown): string {
	if (!param) return '';
	if (typeof param === 'string') return param;
	if (typeof param === 'object' && param !== null) {
		const obj = param as Record<string, unknown>;
		// Handle resourceLocator format: { mode: 'list', value: 'id' } or { __rl: true, value: 'id' }
		if (obj.value && typeof obj.value === 'string') return obj.value;
	}
	return '';
}

export class NiftyPm implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Nifty PM',
		name: 'niftyPm',
		icon: 'file:niftypm.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Nifty PM API for project management',
		defaults: {
			name: 'Nifty PM',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'niftyPmOAuth2Api',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://openapi.niftypm.com/api/v1.0',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Document',
						value: 'document',
					},
					{
						name: 'Member',
						value: 'member',
					},
					{
						name: 'Milestone',
						value: 'milestone',
					},
					{
						name: 'Portfolio',
						value: 'portfolio',
					},
					{
						name: 'Project',
						value: 'project',
					},
					{
						name: 'Tag',
						value: 'tag',
					},
					{
						name: 'Task',
						value: 'task',
					},
					{
						name: 'Task Group (Status)',
						value: 'taskGroup',
					},
					{
						name: 'Time Tracking',
						value: 'timeTracking',
					},
					{
						name: 'User',
						value: 'user',
					},
				],
				default: 'project',
			},
			// Operations and fields for each resource
			...projectOperations,
			...projectFields,
			...taskOperations,
			...taskFields,
			...memberOperations,
			...memberFields,
			...documentOperations,
			...documentFields,
			...portfolioOperations,
			...portfolioFields,
			...timeTrackingOperations,
			...timeTrackingFields,
			...milestoneOperations,
			...milestoneFields,
			...taskGroupOperations,
			...taskGroupFields,
			...tagOperations,
			...tagFields,
			...userOperations,
			...userFields,
		],
	};

	methods = {
		listSearch: {
			async getProjects(
				this: ILoadOptionsFunctions,
				filter?: string,
			): Promise<INodeListSearchResult> {
				const response = await this.helpers.requestWithAuthentication.call(
					this,
					'niftyPmOAuth2Api',
					{
						method: 'GET',
						url: 'https://openapi.niftypm.com/api/v1.0/projects',
						qs: {
							limit: 100,
						},
						json: true,
					},
				);

				const projects = response.projects || response || [];
				let results: INodeListSearchItems[] = projects.map((project: { id: string; name: string }) => ({
					name: project.name,
					value: project.id,
				}));

				if (filter) {
					results = results.filter((item: INodeListSearchItems) =>
						item.name.toLowerCase().includes(filter.toLowerCase()),
					);
				}

				return { results };
			},

			async getTaskGroups(
				this: ILoadOptionsFunctions,
				filter?: string,
			): Promise<INodeListSearchResult> {
				let projectId = '';

				// Try multiple parameter names for projectId (different operations use different names)
				const parameterNames = ['projectId', 'targetProjectId'];

				for (const paramName of parameterNames) {
					if (projectId) break;

					// Try getCurrentNodeParameter first (unsaved form values)
					try {
						const param = this.getCurrentNodeParameter(paramName);
						projectId = extractResourceLocatorValue(param);
					} catch {
						// Continue
					}

					// Try getNodeParameter as fallback (saved values)
					if (!projectId) {
						try {
							const param = this.getNodeParameter(paramName, null);
							projectId = extractResourceLocatorValue(param);
						} catch {
							// Continue
						}
					}
				}

				// Also try filters.project_id for getMany operation context
				if (!projectId) {
					try {
						const filters = this.getCurrentNodeParameter('filters') as Record<string, unknown> | undefined;
						if (filters?.project_id) {
							projectId = extractResourceLocatorValue(filters.project_id);
						}
					} catch {
						// Not in filters context
					}
				}

				if (!projectId) {
					return { results: [] };
				}

				try {
					// Call /taskgroups with all required parameters (archived is required per API docs)
					const response = await this.helpers.httpRequestWithAuthentication.call(
						this,
						'niftyPmOAuth2Api',
						{
							method: 'GET',
							url: 'https://openapi.niftypm.com/api/v1.0/taskgroups',
							qs: {
								project_id: projectId,
								archived: false,
								limit: 100,
								offset: 0,
								sort: 'ascending',
							},
							headers: {
								'Accept': 'application/json',
							},
						},
					);

					const taskGroups = ((response as Record<string, unknown>).items || []) as Array<{ id: string; name: string }>;

					const results: INodeListSearchItems[] = taskGroups
						.filter((group) => !filter || group.name.toLowerCase().includes(filter.toLowerCase()))
						.map((group) => ({
							name: group.name,
							value: group.id,
						}));

					return { results };
				} catch {
					return { results: [] };
				}
			},

			async getMilestones(
				this: ILoadOptionsFunctions,
				filter?: string,
			): Promise<INodeListSearchResult> {
				let projectId = '';

				// Try multiple parameter names for projectId
				const parameterNames = ['projectId', 'targetProjectId'];

				for (const paramName of parameterNames) {
					if (projectId) break;

					try {
						const param = this.getCurrentNodeParameter(paramName);
						projectId = extractResourceLocatorValue(param);
					} catch {
						// Continue
					}

					if (!projectId) {
						try {
							const param = this.getNodeParameter(paramName, null);
							projectId = extractResourceLocatorValue(param);
						} catch {
							// Continue
						}
					}
				}

				// Also try filters.project_id
				if (!projectId) {
					try {
						const filters = this.getCurrentNodeParameter('filters') as Record<string, unknown> | undefined;
						if (filters?.project_id) {
							projectId = extractResourceLocatorValue(filters.project_id);
						}
					} catch {
						// Not in filters context
					}
				}

				if (!projectId) {
					return { results: [] };
				}

				try {
					const response = await this.helpers.requestWithAuthentication.call(
						this,
						'niftyPmOAuth2Api',
						{
							method: 'GET',
							url: 'https://openapi.niftypm.com/api/v1.0/milestones',
							qs: {
								project_id: projectId,
							},
							json: true,
						},
					);

					const milestones = response.milestones || response || [];
					let results: INodeListSearchItems[] = milestones.map((milestone: { id: string; name: string }) => ({
						name: milestone.name,
						value: milestone.id,
					}));

					if (filter) {
						results = results.filter((item: INodeListSearchItems) =>
							item.name.toLowerCase().includes(filter.toLowerCase()),
						);
					}

					return { results };
				} catch {
					return { results: [] };
				}
			},

			async getMembers(
				this: ILoadOptionsFunctions,
				filter?: string,
			): Promise<INodeListSearchResult> {
				let projectId = '';

				// Try multiple parameter names for projectId
				const parameterNames = ['projectId', 'targetProjectId'];

				for (const paramName of parameterNames) {
					if (projectId) break;

					try {
						const param = this.getCurrentNodeParameter(paramName);
						projectId = extractResourceLocatorValue(param);
					} catch {
						// Continue
					}

					if (!projectId) {
						try {
							const param = this.getNodeParameter(paramName, null);
							projectId = extractResourceLocatorValue(param);
						} catch {
							// Continue
						}
					}
				}

				// Also try filters.project_id
				if (!projectId) {
					try {
						const filters = this.getCurrentNodeParameter('filters') as Record<string, unknown> | undefined;
						if (filters?.project_id) {
							projectId = extractResourceLocatorValue(filters.project_id);
						}
					} catch {
						// Not in filters context
					}
				}

				const url = 'https://openapi.niftypm.com/api/v1.0/members';
				const qs: Record<string, string | number> = { limit: 100 };

				if (projectId) {
					qs.project_id = projectId;
				}

				try {
					const response = await this.helpers.requestWithAuthentication.call(
						this,
						'niftyPmOAuth2Api',
						{
							method: 'GET',
							url,
							qs,
							json: true,
						},
					);

					const members = response.members || response || [];
					let results: INodeListSearchItems[] = members.map((member: { id: string; name: string; email?: string }) => ({
						name: member.name || member.email || member.id,
						value: member.id,
					}));

					if (filter) {
						results = results.filter((item: INodeListSearchItems) =>
							item.name.toLowerCase().includes(filter.toLowerCase()),
						);
					}

					return { results };
				} catch {
					return { results: [] };
				}
			},

			async getTasks(
				this: ILoadOptionsFunctions,
				filter?: string,
			): Promise<INodeListSearchResult> {
				let projectId = '';

				// Try multiple parameter names for projectId
				const parameterNames = ['projectId', 'targetProjectId'];

				for (const paramName of parameterNames) {
					if (projectId) break;

					try {
						const param = this.getCurrentNodeParameter(paramName);
						projectId = extractResourceLocatorValue(param);
					} catch {
						// Continue
					}

					if (!projectId) {
						try {
							const param = this.getNodeParameter(paramName, null);
							projectId = extractResourceLocatorValue(param);
						} catch {
							// Continue
						}
					}
				}

				// Also try filters.project_id
				if (!projectId) {
					try {
						const filters = this.getCurrentNodeParameter('filters') as Record<string, unknown> | undefined;
						if (filters?.project_id) {
							projectId = extractResourceLocatorValue(filters.project_id);
						}
					} catch {
						// Not in filters context
					}
				}

				try {
					// Nifty PM API doesn't support text search, so we need to fetch all and filter locally
					// When user is searching, fetch more pages to find the task
					const allTasks: Array<{ id: string; name: string }> = [];
					let offset = 0;
					const pageSize = 100;
					const maxPages = filter ? 10 : 1; // Fetch more pages when searching

					for (let page = 0; page < maxPages; page++) {
						const qs: Record<string, string | number> = {
							limit: pageSize,
							offset,
						};
						if (projectId) {
							qs.project_id = projectId;
						}

						const response = await this.helpers.requestWithAuthentication.call(
							this,
							'niftyPmOAuth2Api',
							{
								method: 'GET',
								url: 'https://openapi.niftypm.com/api/v1.0/tasks',
								qs,
								json: true,
							},
						);

						const tasks = response.tasks || response || [];
						allTasks.push(...tasks);

						// Stop if we got less than a full page (no more results)
						if (tasks.length < pageSize) {
							break;
						}

						offset += pageSize;
					}

					let results: INodeListSearchItems[] = allTasks.map((task) => ({
						name: task.name,
						value: task.id,
					}));

					if (filter) {
						results = results.filter((item: INodeListSearchItems) =>
							item.name.toLowerCase().includes(filter.toLowerCase()),
						);
					}

					return { results };
				} catch {
					return { results: [] };
				}
			},

			async getPortfolios(
				this: ILoadOptionsFunctions,
				filter?: string,
			): Promise<INodeListSearchResult> {
				try {
					const response = await this.helpers.requestWithAuthentication.call(
						this,
						'niftyPmOAuth2Api',
						{
							method: 'GET',
							url: 'https://openapi.niftypm.com/api/v1.0/portfolios',
							json: true,
						},
					);

					const portfolios = response.portfolios || response || [];
					let results: INodeListSearchItems[] = portfolios.map((portfolio: { id: string; name: string }) => ({
						name: portfolio.name,
						value: portfolio.id,
					}));

					if (filter) {
						results = results.filter((item: INodeListSearchItems) =>
							item.name.toLowerCase().includes(filter.toLowerCase()),
						);
					}

					return { results };
				} catch {
					return { results: [] };
				}
			},

			async getTags(
				this: ILoadOptionsFunctions,
				filter?: string,
			): Promise<INodeListSearchResult> {
				let projectId = '';

				// Try multiple parameter names for projectId
				const parameterNames = ['projectId', 'targetProjectId'];

				for (const paramName of parameterNames) {
					if (projectId) break;

					try {
						const param = this.getCurrentNodeParameter(paramName);
						projectId = extractResourceLocatorValue(param);
					} catch {
						// Continue
					}

					if (!projectId) {
						try {
							const param = this.getNodeParameter(paramName, null);
							projectId = extractResourceLocatorValue(param);
						} catch {
							// Continue
						}
					}
				}

				// Also try filters.project_id
				if (!projectId) {
					try {
						const filters = this.getCurrentNodeParameter('filters') as Record<string, unknown> | undefined;
						if (filters?.project_id) {
							projectId = extractResourceLocatorValue(filters.project_id);
						}
					} catch {
						// Not in filters context
					}
				}

				if (!projectId) {
					return { results: [] };
				}

				try {
					const response = await this.helpers.requestWithAuthentication.call(
						this,
						'niftyPmOAuth2Api',
						{
							method: 'GET',
							url: 'https://openapi.niftypm.com/api/v1.0/labels',
							qs: {
								project_id: projectId,
							},
							json: true,
						},
					);

					const tags = response.labels || response || [];
					let results: INodeListSearchItems[] = tags.map((tag: { id: string; name: string }) => ({
						name: tag.name,
						value: tag.id,
					}));

					if (filter) {
						results = results.filter((item: INodeListSearchItems) =>
							item.name.toLowerCase().includes(filter.toLowerCase()),
						);
					}

					return { results };
				} catch {
					return { results: [] };
				}
			},
		},
	};

}
