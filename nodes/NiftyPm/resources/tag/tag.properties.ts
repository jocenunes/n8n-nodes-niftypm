import { INodeProperties } from 'n8n-workflow';

export const tagOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['tag'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a tag',
				description: 'Create a new tag (label)',
				routing: {
					request: {
						method: 'POST',
						url: '/labels',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a tag',
				description: 'Delete a tag (label)',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/labels/{{$parameter["tagId"]}}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a tag',
				description: 'Get a tag by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/labels/{{$parameter["tagId"]}}',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get many tags',
				description: 'Get a list of tags (labels)',
				routing: {
					request: {
						method: 'GET',
						url: '/labels',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'labels',
								},
							},
						],
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a tag',
				description: 'Update a tag (label)',
				routing: {
					request: {
						method: 'PUT',
						url: '=/labels/{{$parameter["tagId"]}}',
					},
				},
			},
		],
		default: 'getMany',
	},
];

export const tagFields: INodeProperties[] = [
	// ----------------------------------
	//         tag: getMany
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: {
			show: {
				resource: ['tag'],
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
				resource: ['tag'],
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
				resource: ['tag'],
				operation: ['getMany'],
			},
		},
		options: [
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
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: [
					{
						name: 'Others',
						value: 'others',
					},
					{
						name: 'Member',
						value: 'member',
					},
				],
				default: 'others',
				description: 'Type of tags to return',
				routing: {
					send: {
						type: 'query',
						property: 'type',
					},
				},
			},
		],
	},

	// ----------------------------------
	//         tag: get, update, delete
	// ----------------------------------
	{
		displayName: 'Tag ID',
		name: 'tagId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the tag',
		displayOptions: {
			show: {
				resource: ['tag'],
				operation: ['get', 'update', 'delete'],
			},
		},
	},

	// ----------------------------------
	//         tag: create
	// ----------------------------------
	{
		displayName: 'Tag Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		description: 'Name of the tag',
		displayOptions: {
			show: {
				resource: ['tag'],
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
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['tag'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Color',
				name: 'color',
				type: 'color',
				default: '#3498db',
				description: 'Color of the tag',
				routing: {
					send: {
						type: 'body',
						property: 'color',
					},
				},
			},
		],
	},

	// ----------------------------------
	//         tag: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['tag'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Color',
				name: 'color',
				type: 'color',
				default: '#3498db',
				description: 'Color of the tag',
				routing: {
					send: {
						type: 'body',
						property: 'color',
					},
				},
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Name of the tag',
				routing: {
					send: {
						type: 'body',
						property: 'name',
					},
				},
			},
		],
	},
];
