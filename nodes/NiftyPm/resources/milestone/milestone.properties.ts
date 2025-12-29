import { INodeProperties } from 'n8n-workflow';

export const milestoneOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['milestone'],
			},
		},
		options: [
			{
				name: 'Archive',
				value: 'archive',
				action: 'Archive a milestone',
				description: 'Archive or unarchive a milestone',
				routing: {
					request: {
						method: 'POST',
						url: '=/milestones/{{ typeof $parameter["milestoneId"] === "object" ? $parameter["milestoneId"].value : $parameter["milestoneId"] }}/archive',
					},
				},
			},
			{
				name: 'Create',
				value: 'create',
				action: 'Create a milestone',
				description: 'Create a new milestone',
				routing: {
					request: {
						method: 'POST',
						url: '/milestones',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a milestone',
				description: 'Delete a milestone',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/milestones/{{ typeof $parameter["milestoneId"] === "object" ? $parameter["milestoneId"].value : $parameter["milestoneId"] }}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a milestone',
				description: 'Get a milestone by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/milestones/{{ typeof $parameter["milestoneId"] === "object" ? $parameter["milestoneId"].value : $parameter["milestoneId"] }}',
					},
				},
			},
		{
			name: 'Get Many',
			value: 'getMany',
			action: 'Get many milestones',
			description: 'Get a list of milestones',
			routing: {
				request: {
					method: 'GET',
					url: '/milestones',
				},
				output: {
					postReceive: [
						{
							type: 'rootProperty',
							properties: {
								property: 'items',
							},
						},
					],
				},
				operations: {
					pagination: {
						type: 'offset',
						properties: {
							limitParameter: 'limit',
							offsetParameter: 'offset',
							pageSize: 100,
							type: 'query',
						},
					},
				},
			},
		},
			{
				name: 'Move to Project',
				value: 'moveToProject',
				action: 'Move milestone to project',
				description: 'Move a milestone to another project',
				routing: {
					request: {
						method: 'PUT',
						url: '=/milestones/{{ typeof $parameter["milestoneId"] === "object" ? $parameter["milestoneId"].value : $parameter["milestoneId"] }}/move_to_project',
					},
				},
			},
			{
				name: 'Tie Tasks',
				value: 'tieTasks',
				action: 'Tie tasks to milestone',
				description: 'Add tasks to a milestone',
				routing: {
					request: {
						method: 'PUT',
						url: '=/milestones/{{ typeof $parameter["milestoneId"] === "object" ? $parameter["milestoneId"].value : $parameter["milestoneId"] }}/tasks',
					},
				},
			},
			{
				name: 'Untie Tasks',
				value: 'untieTasks',
				action: 'Untie tasks from milestone',
				description: 'Remove tasks from a milestone',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/milestones/{{ typeof $parameter["milestoneId"] === "object" ? $parameter["milestoneId"].value : $parameter["milestoneId"] }}/tasks',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a milestone',
				description: 'Update a milestone',
				routing: {
					request: {
						method: 'PUT',
						url: '=/milestones/{{ typeof $parameter["milestoneId"] === "object" ? $parameter["milestoneId"].value : $parameter["milestoneId"] }}',
					},
				},
			},
		],
		default: 'getMany',
	},
];

export const milestoneFields: INodeProperties[] = [
	// ----------------------------------
	//         milestone: getMany
	// ----------------------------------
	{
		displayName: 'Project',
		name: 'projectId',
		type: 'resourceLocator',
		required: true,
		default: { mode: 'list', value: '' },
		description: 'The project to get milestones from',
		displayOptions: {
			show: {
				resource: ['milestone'],
				operation: ['getMany'],
			},
		},
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				typeOptions: {
					searchListMethod: 'getProjects',
					searchable: true,
				},
			},
			{
				displayName: 'By ID',
				name: 'id',
				type: 'string',
				placeholder: 'e.g. abc123',
			},
		],
		routing: {
			send: {
				type: 'query',
				property: 'project_id',
				value: '={{ typeof $value === "object" ? $value.value : $value }}',
			},
		},
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: {
			show: {
				resource: ['milestone'],
				operation: ['getMany'],
			},
		},
		routing: {
			send: {
				paginate: '={{$value}}',
			},
			operations: {
				pagination: {
					type: 'offset',
					properties: {
						limitParameter: 'limit',
						offsetParameter: 'offset',
						pageSize: 100,
						type: 'query',
					},
				},
			},
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 25,
		description: 'Max number of results to return',
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		displayOptions: {
			show: {
				resource: ['milestone'],
				operation: ['getMany'],
				returnAll: [false],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'limit',
			},
			output: {
				postReceive: [
					{
						type: 'limit',
						properties: {
							maxResults: '={{$value}}',
						},
					},
				],
			},
		},
	},
	{
		displayName: 'Offset',
		name: 'offset',
		type: 'number',
		default: 0,
		description: 'Number of records to skip (pagination)',
		typeOptions: {
			minValue: 0,
		},
		displayOptions: {
			show: {
				resource: ['milestone'],
				operation: ['getMany'],
				returnAll: [false],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'offset',
			},
		},
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['milestone'],
				operation: ['getMany'],
			},
		},
		options: [
			{
				displayName: 'Completed',
				name: 'completed',
				type: 'boolean',
				default: false,
				description: 'Whether to return completed milestones',
				routing: {
					send: {
						type: 'query',
						property: 'completed',
					},
				},
			},
			{
				displayName: 'Is List',
				name: 'is_list',
				type: 'boolean',
				default: false,
				description: 'Whether to filter by list type',
				routing: {
					send: {
						type: 'query',
						property: 'is_list',
					},
				},
			},
			{
				displayName: 'Sort',
				name: 'sort',
				type: 'options',
				options: [
					{
						name: 'Ascending',
						value: 'ascending',
					},
					{
						name: 'Descending',
						value: 'descending',
					},
				],
				default: 'descending',
				description: 'Sort order',
				routing: {
					send: {
						type: 'query',
						property: 'sort',
					},
				},
			},
		],
	},

	// ----------------------------------
	//         milestone: get, update, delete, archive, moveToProject, tieTasks, untieTasks
	// ----------------------------------
	{
		displayName: 'Milestone',
		name: 'milestoneId',
		type: 'resourceLocator',
		required: true,
		default: { mode: 'list', value: '' },
		description: 'The milestone to operate on',
		displayOptions: {
			show: {
				resource: ['milestone'],
				operation: ['get', 'update', 'delete', 'archive', 'moveToProject', 'tieTasks', 'untieTasks'],
			},
		},
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				typeOptions: {
					searchListMethod: 'getMilestones',
					searchable: true,
				},
			},
			{
				displayName: 'By ID',
				name: 'id',
				type: 'string',
				placeholder: 'e.g. abc123',
			},
		],
	},

	// ----------------------------------
	//         milestone: archive
	// ----------------------------------
	{
		displayName: 'Archive',
		name: 'archived',
		type: 'boolean',
		required: true,
		default: true,
		description: 'Whether to archive (true) or unarchive (false) the milestone',
		displayOptions: {
			show: {
				resource: ['milestone'],
				operation: ['archive'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'archived',
			},
		},
	},

	// ----------------------------------
	//         milestone: moveToProject
	// ----------------------------------
	{
		displayName: 'Target Project',
		name: 'targetProjectId',
		type: 'resourceLocator',
		required: true,
		default: { mode: 'list', value: '' },
		description: 'The project to move the milestone to',
		displayOptions: {
			show: {
				resource: ['milestone'],
				operation: ['moveToProject'],
			},
		},
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				typeOptions: {
					searchListMethod: 'getProjects',
					searchable: true,
				},
			},
			{
				displayName: 'By ID',
				name: 'id',
				type: 'string',
				placeholder: 'e.g. abc123',
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'project_id',
				value: '={{ typeof $value === "object" ? $value.value : $value }}',
			},
		},
	},

	// ----------------------------------
	//         milestone: tieTasks, untieTasks
	// ----------------------------------
	{
		displayName: 'Tasks',
		name: 'taskIds',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		placeholder: 'Add Task',
		required: true,
		default: {},
		description: 'Tasks to add/remove from the milestone',
		displayOptions: {
			show: {
				resource: ['milestone'],
				operation: ['tieTasks', 'untieTasks'],
			},
		},
		options: [
			{
				displayName: 'Task',
				name: 'taskValues',
				values: [
					{
						displayName: 'Task',
						name: 'id',
						type: 'resourceLocator',
						default: { mode: 'list', value: '' },
						description: 'Task to add/remove',
						modes: [
							{
								displayName: 'From List',
								name: 'list',
								type: 'list',
								typeOptions: {
									searchListMethod: 'getTasks',
									searchable: true,
								},
							},
							{
								displayName: 'By ID',
								name: 'id',
								type: 'string',
								placeholder: 'e.g. abc123',
							},
						],
					},
				],
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'tasks',
				value: '={{ $value.taskValues ? $value.taskValues.map(t => typeof t.id === "object" ? t.id.value : t.id) : [] }}',
			},
		},
	},

	// ----------------------------------
	//         milestone: create
	// ----------------------------------
	{
		displayName: 'Milestone Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		description: 'Name of the milestone',
		displayOptions: {
			show: {
				resource: ['milestone'],
				operation: ['create'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'name',
			},
		},
	},
	{
		displayName: 'Project',
		name: 'projectId',
		type: 'resourceLocator',
		required: true,
		default: { mode: 'list', value: '' },
		description: 'The project to create the milestone in',
		displayOptions: {
			show: {
				resource: ['milestone'],
				operation: ['create'],
			},
		},
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				typeOptions: {
					searchListMethod: 'getProjects',
					searchable: true,
				},
			},
			{
				displayName: 'By ID',
				name: 'id',
				type: 'string',
				placeholder: 'e.g. abc123',
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'project_id',
				value: '={{ typeof $value === "object" ? $value.value : $value }}',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['milestone'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Color',
				name: 'color',
				type: 'color',
				default: '#3498db',
				description: 'Color of the milestone',
				routing: {
					send: {
						type: 'body',
						property: 'color',
					},
				},
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the milestone',
				routing: {
					send: {
						type: 'body',
						property: 'description',
					},
				},
			},
			{
				displayName: 'End Date',
				name: 'end_date',
				type: 'dateTime',
				default: '',
				description: 'End date of the milestone',
				routing: {
					send: {
						type: 'body',
						property: 'end_date',
					},
				},
			},
			{
				displayName: 'Is List',
				name: 'is_list',
				type: 'boolean',
				default: false,
				description: 'Whether this milestone is a list',
				routing: {
					send: {
						type: 'body',
						property: 'is_list',
					},
				},
			},
			{
				displayName: 'Is Task Group',
				name: 'isTaskGroup',
				type: 'boolean',
				default: false,
				description: 'Whether this milestone is a task group',
				routing: {
					send: {
						type: 'body',
						property: 'isTaskGroup',
					},
				},
			},
			{
				displayName: 'Start Date',
				name: 'start_date',
				type: 'dateTime',
				default: '',
				description: 'Start date of the milestone',
				routing: {
					send: {
						type: 'body',
						property: 'start_date',
					},
				},
			},
			{
				displayName: 'Task Group',
				name: 'task_group_id',
				type: 'resourceLocator',
				default: { mode: 'list', value: '' },
				description: 'Task group to associate with this milestone. Select a project first.',
				modes: [
					{
						displayName: 'From List',
						name: 'list',
						type: 'list',
						typeOptions: {
							searchListMethod: 'getTaskGroups',
							searchable: true,
						},
					},
					{
						displayName: 'By ID',
						name: 'id',
						type: 'string',
						placeholder: 'e.g. abc123',
					},
				],
				routing: {
					send: {
						type: 'body',
						property: 'task_group_id',
						value: '={{ typeof $value === "object" ? $value.value : $value }}',
					},
				},
			},
		],
	},

	// ----------------------------------
	//         milestone: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['milestone'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Color',
				name: 'color',
				type: 'color',
				default: '#3498db',
				description: 'Color of the milestone',
				routing: {
					send: {
						type: 'body',
						property: 'color',
					},
				},
			},
			{
				displayName: 'Completed',
				name: 'completed',
				type: 'boolean',
				default: false,
				description: 'Whether the milestone is completed',
				routing: {
					send: {
						type: 'body',
						property: 'completed',
					},
				},
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the milestone',
				routing: {
					send: {
						type: 'body',
						property: 'description',
					},
				},
			},
			{
				displayName: 'End Date',
				name: 'end_date',
				type: 'dateTime',
				default: '',
				description: 'End date of the milestone',
				routing: {
					send: {
						type: 'body',
						property: 'end_date',
					},
				},
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Name of the milestone',
				routing: {
					send: {
						type: 'body',
						property: 'name',
					},
				},
			},
			{
				displayName: 'Start Date',
				name: 'start_date',
				type: 'dateTime',
				default: '',
				description: 'Start date of the milestone',
				routing: {
					send: {
						type: 'body',
						property: 'start_date',
					},
				},
			},
		],
	},
];
