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
				name: 'Add Members',
				value: 'addMembers',
				action: 'Add members to portfolio',
				description: 'Add members to a portfolio',
				routing: {
					request: {
						method: 'PUT',
						url: '=/subteams/{{ typeof $parameter["portfolioId"] === "object" ? $parameter["portfolioId"].value : $parameter["portfolioId"] }}/members',
					},
				},
			},
			{
				name: 'Create',
				value: 'create',
				action: 'Create a portfolio',
				description: 'Create a new portfolio',
				routing: {
					request: {
						method: 'POST',
						url: '/subteams',
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
						url: '=/subteams/{{ typeof $parameter["portfolioId"] === "object" ? $parameter["portfolioId"].value : $parameter["portfolioId"] }}',
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
						url: '=/subteams/{{ typeof $parameter["portfolioId"] === "object" ? $parameter["portfolioId"].value : $parameter["portfolioId"] }}',
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
						url: '/subteams',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'subteams',
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
						url: '=/projects?subteam_id={{ typeof $parameter["portfolioId"] === "object" ? $parameter["portfolioId"].value : $parameter["portfolioId"] }}',
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
				name: 'Leave',
				value: 'leave',
				action: 'Leave a portfolio',
				description: 'Leave a portfolio as the current user',
				routing: {
					request: {
						method: 'POST',
						url: '=/subteams/{{ typeof $parameter["portfolioId"] === "object" ? $parameter["portfolioId"].value : $parameter["portfolioId"] }}/leave',
					},
				},
			},
			{
				name: 'Remove Members',
				value: 'removeMembers',
				action: 'Remove members from portfolio',
				description: 'Remove members from a portfolio',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/subteams/{{ typeof $parameter["portfolioId"] === "object" ? $parameter["portfolioId"].value : $parameter["portfolioId"] }}/members',
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
						url: '=/subteams/{{ typeof $parameter["portfolioId"] === "object" ? $parameter["portfolioId"].value : $parameter["portfolioId"] }}',
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

	{
		displayName: 'Portfolio',
		name: 'portfolioId',
		type: 'resourceLocator',
		required: true,
		default: { mode: 'list', value: '' },
		description: 'The portfolio to operate on',
		displayOptions: {
			show: {
				resource: ['portfolio'],
				operation: ['get', 'update', 'delete', 'getProjects', 'addMembers', 'removeMembers', 'leave'],
			},
		},
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				typeOptions: {
					searchListMethod: 'getPortfolios',
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

	{
		displayName: 'Members',
		name: 'members',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		required: true,
		default: {},
		placeholder: 'Add Member',
		description: 'Members to add or remove from the portfolio',
		displayOptions: {
			show: {
				resource: ['portfolio'],
				operation: ['addMembers', 'removeMembers'],
			},
		},
		options: [
			{
				name: 'memberValues',
				displayName: 'Member',
				values: [
					{
						displayName: 'Member',
						name: 'id',
						type: 'resourceLocator',
						required: true,
						default: { mode: 'list', value: '' },
						description: 'The member to add/remove',
						modes: [
							{
								displayName: 'From List',
								name: 'list',
								type: 'list',
								typeOptions: {
									searchListMethod: 'getMembers',
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
				property: 'members',
				value: '={{ $value.memberValues ? $value.memberValues.map(m => typeof m.id === "object" ? m.id.value : m.id) : [] }}',
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
