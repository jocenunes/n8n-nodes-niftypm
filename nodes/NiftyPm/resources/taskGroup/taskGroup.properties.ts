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
						url: '=/taskgroups/{{$parameter["taskGroupId"]}}',
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
							limit: 100,
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
						url: '=/taskgroups/{{$parameter["taskGroupId"]}}',
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
