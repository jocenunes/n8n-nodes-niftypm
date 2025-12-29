import { INodeProperties } from 'n8n-workflow';

export const taskGroupOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['taskGroup'],
			},
		},
		options: [
			{
				name: 'Assign Members',
				value: 'assignMembers',
				action: 'Assign members to task group',
				description: 'Assign members to a task group (status)',
				routing: {
					request: {
						method: 'PUT',
						url: '=/taskgroups/{{ typeof $parameter["taskGroupId"] === "object" ? $parameter["taskGroupId"].value : $parameter["taskGroupId"] }}/assignees',
					},
				},
			},
			{
				name: 'Create',
				value: 'create',
				action: 'Create a task group',
				description: 'Create a new task group (status)',
				routing: {
					request: {
						method: 'POST',
						url: '/taskgroups',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a task group',
				description: 'Delete a task group (status)',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/taskgroups/{{ typeof $parameter["taskGroupId"] === "object" ? $parameter["taskGroupId"].value : $parameter["taskGroupId"] }}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a task group',
				description: 'Get a task group (status) by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/taskgroups/{{ typeof $parameter["taskGroupId"] === "object" ? $parameter["taskGroupId"].value : $parameter["taskGroupId"] }}',
					},
				},
			},
		{
			name: 'Get Many',
			value: 'getMany',
			action: 'Get many task groups',
			description: 'Get a list of task groups (statuses) for a project',
			routing: {
				request: {
					method: 'GET',
					url: '/taskgroups',
					qs: {
						archived: false,
						sort: 'ascending',
					},
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
				name: 'Move Tasks',
				value: 'moveTasks',
				action: 'Move all tasks from task group',
				description: 'Move all tasks from one task group to another',
				routing: {
					request: {
						method: 'POST',
						url: '=/taskgroups/{{ typeof $parameter["taskGroupId"] === "object" ? $parameter["taskGroupId"].value : $parameter["taskGroupId"] }}/move',
					},
				},
			},
			{
				name: 'Unassign Members',
				value: 'unassignMembers',
				action: 'Unassign members from task group',
				description: 'Remove members from a task group (status)',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/taskgroups/{{ typeof $parameter["taskGroupId"] === "object" ? $parameter["taskGroupId"].value : $parameter["taskGroupId"] }}/assignees',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a task group',
				description: 'Update a task group (status)',
				routing: {
					request: {
						method: 'PUT',
						url: '=/taskgroups/{{ typeof $parameter["taskGroupId"] === "object" ? $parameter["taskGroupId"].value : $parameter["taskGroupId"] }}',
					},
				},
			},
		],
		default: 'getMany',
	},
];

export const taskGroupFields: INodeProperties[] = [
	// ----------------------------------
	//         taskGroup: getMany
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: {
			show: {
				resource: ['taskGroup'],
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
				resource: ['taskGroup'],
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
				resource: ['taskGroup'],
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
		displayName: 'Project',
		name: 'projectId',
		type: 'resourceLocator',
		required: true,
		default: { mode: 'list', value: '' },
		description: 'The project to get task groups from',
		displayOptions: {
			show: {
				resource: ['taskGroup'],
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

	// ----------------------------------
	//         taskGroup: update, delete
	// ----------------------------------
	{
		displayName: 'Task Group',
		name: 'taskGroupId',
		type: 'resourceLocator',
		required: true,
		default: { mode: 'list', value: '' },
		description: 'The task group (status) to operate on',
		displayOptions: {
			show: {
				resource: ['taskGroup'],
				operation: ['update', 'delete'],
			},
		},
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
	},

	// ----------------------------------
	//         taskGroup: create
	// ----------------------------------
	{
		displayName: 'Task Group Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		description: 'Name of the task group (status)',
		displayOptions: {
			show: {
				resource: ['taskGroup'],
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
		description: 'The project to create the task group in',
		displayOptions: {
			show: {
				resource: ['taskGroup'],
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
				resource: ['taskGroup'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Color',
				name: 'color',
				type: 'color',
				default: '#3498db',
				description: 'Color of the task group',
				routing: {
					send: {
						type: 'body',
						property: 'color',
					},
				},
			},
			{
				displayName: 'Is Complete Status',
				name: 'is_complete',
				type: 'boolean',
				default: false,
				description: 'Whether tasks in this group are considered complete',
				routing: {
					send: {
						type: 'body',
						property: 'is_complete',
					},
				},
			},
			{
				displayName: 'Order',
				name: 'order',
				type: 'number',
				default: 0,
				description: 'Order position of the task group',
				routing: {
					send: {
						type: 'body',
						property: 'order',
					},
				},
			},
		],
	},

	// ----------------------------------
	//         taskGroup: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['taskGroup'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Color',
				name: 'color',
				type: 'color',
				default: '#3498db',
				description: 'Color of the task group',
				routing: {
					send: {
						type: 'body',
						property: 'color',
					},
				},
			},
			{
				displayName: 'Is Complete Status',
				name: 'is_complete',
				type: 'boolean',
				default: false,
				description: 'Whether tasks in this group are considered complete',
				routing: {
					send: {
						type: 'body',
						property: 'is_complete',
					},
				},
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Name of the task group',
				routing: {
					send: {
						type: 'body',
						property: 'name',
					},
				},
			},
			{
				displayName: 'Order',
				name: 'order',
				type: 'number',
				default: 0,
				description: 'Order position of the task group',
				routing: {
					send: {
						type: 'body',
						property: 'order',
					},
				},
			},
		],
	},
];
