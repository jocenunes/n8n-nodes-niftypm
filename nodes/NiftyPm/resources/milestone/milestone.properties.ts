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
						url: '=/milestones/{{$parameter["milestoneId"]}}',
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
						url: '=/milestones/{{$parameter["milestoneId"]}}',
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
									property: 'milestones',
								},
							},
						],
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
						url: '=/milestones/{{$parameter["milestoneId"]}}',
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
				displayName: 'Offset',
				name: 'offset',
				type: 'number',
				default: 0,
				description: 'Number of records to skip',
				routing: {
					send: {
						type: 'query',
						property: 'offset',
					},
				},
			},
		],
	},

	// ----------------------------------
	//         milestone: get, update, delete
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
				operation: ['get', 'update', 'delete'],
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
