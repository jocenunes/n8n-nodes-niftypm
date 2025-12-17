import { INodeProperties } from 'n8n-workflow';

export const portfolioOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['portfolio'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a portfolio',
				description: 'Create a new portfolio',
				routing: {
					request: {
						method: 'POST',
						url: '/portfolios',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a portfolio',
				description: 'Delete a portfolio',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/portfolios/{{$parameter["portfolioId"]}}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a portfolio',
				description: 'Get a portfolio by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/portfolios/{{$parameter["portfolioId"]}}',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get many portfolios',
				description: 'Get a list of portfolios',
				routing: {
					request: {
						method: 'GET',
						url: '/portfolios',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'portfolios',
								},
							},
						],
					},
				},
			},
			{
				name: 'Get Projects',
				value: 'getProjects',
				action: 'Get portfolio projects',
				description: 'Get projects in a portfolio',
				routing: {
					request: {
						method: 'GET',
						url: '=/portfolios/{{$parameter["portfolioId"]}}/projects',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'projects',
								},
							},
						],
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a portfolio',
				description: 'Update a portfolio',
				routing: {
					request: {
						method: 'PUT',
						url: '=/portfolios/{{$parameter["portfolioId"]}}',
					},
				},
			},
		],
		default: 'getMany',
	},
];

export const portfolioFields: INodeProperties[] = [
	// ----------------------------------
	//         portfolio: getMany
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: {
			show: {
				resource: ['portfolio'],
				operation: ['getMany', 'getProjects'],
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
				resource: ['portfolio'],
				operation: ['getMany', 'getProjects'],
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
				resource: ['portfolio'],
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
		],
	},

	// ----------------------------------
	//         portfolio: get, update, delete, getProjects
	// ----------------------------------
	{
		displayName: 'Portfolio ID',
		name: 'portfolioId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the portfolio',
		displayOptions: {
			show: {
				resource: ['portfolio'],
				operation: ['get', 'update', 'delete', 'getProjects'],
			},
		},
	},

	// ----------------------------------
	//         portfolio: create
	// ----------------------------------
	{
		displayName: 'Portfolio Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		description: 'Name of the portfolio',
		displayOptions: {
			show: {
				resource: ['portfolio'],
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
				resource: ['portfolio'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Color',
				name: 'color',
				type: 'color',
				default: '#3498db',
				description: 'Color of the portfolio',
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
				description: 'Description of the portfolio',
				routing: {
					send: {
						type: 'body',
						property: 'description',
					},
				},
			},
		],
	},

	// ----------------------------------
	//         portfolio: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['portfolio'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Color',
				name: 'color',
				type: 'color',
				default: '#3498db',
				description: 'Color of the portfolio',
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
				description: 'Description of the portfolio',
				routing: {
					send: {
						type: 'body',
						property: 'description',
					},
				},
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Name of the portfolio',
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
