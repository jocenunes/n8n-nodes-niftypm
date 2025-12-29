import { INodeProperties } from 'n8n-workflow';

export const projectOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['project'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a project',
				description: 'Create a new project',
				routing: {
					request: {
						method: 'POST',
						url: '/projects',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a project',
				description: 'Delete a project',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/projects/{{ typeof $parameter["projectId"] === "object" ? $parameter["projectId"].value : $parameter["projectId"] }}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a project',
				description: 'Get a project by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/projects/{{ typeof $parameter["projectId"] === "object" ? $parameter["projectId"].value : $parameter["projectId"] }}',
					},
				},
			},
		{
			name: 'Get Many',
			value: 'getMany',
			action: 'Get many projects',
			description: 'Get a list of projects',
			routing: {
				request: {
					method: 'GET',
					url: '/projects',
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
				name: 'Invite Member',
				value: 'inviteMember',
				action: 'Invite member to project',
				description: 'Invite a team member to a project',
				routing: {
					request: {
						method: 'POST',
						url: '=/projects/{{ typeof $parameter["projectId"] === "object" ? $parameter["projectId"].value : $parameter["projectId"] }}/invite',
					},
				},
			},
			{
				name: 'Leave',
				value: 'leave',
				action: 'Leave a project',
				description: 'Leave a project as the current user',
				routing: {
					request: {
						method: 'POST',
						url: '=/projects/{{ typeof $parameter["projectId"] === "object" ? $parameter["projectId"].value : $parameter["projectId"] }}/leave',
					},
				},
			},
			{
				name: 'Start',
				value: 'start',
				action: 'Start a project',
				description: 'Mark project as started',
				routing: {
					request: {
						method: 'POST',
						url: '=/projects/{{ typeof $parameter["projectId"] === "object" ? $parameter["projectId"].value : $parameter["projectId"] }}/start',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a project',
				description: 'Update a project',
				routing: {
					request: {
						method: 'PUT',
						url: '=/projects/{{ typeof $parameter["projectId"] === "object" ? $parameter["projectId"].value : $parameter["projectId"] }}',
					},
				},
			},
		],
		default: 'getMany',
	},
];

export const projectFields: INodeProperties[] = [
	// ----------------------------------
	//         project: getMany
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: {
			show: {
				resource: ['project'],
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
				resource: ['project'],
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
				resource: ['project'],
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
				resource: ['project'],
				operation: ['getMany'],
			},
		},
		options: [
			{
				displayName: 'Archived',
				name: 'archived',
				type: 'boolean',
				default: false,
				description: 'Whether to return only archived projects',
				routing: {
					send: {
						type: 'query',
						property: 'archived',
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
				default: 'ascending',
				description: 'Sort order',
				routing: {
					send: {
						type: 'query',
						property: 'sort',
					},
				},
			},
			{
				displayName: 'Subteam ID',
				name: 'subteam_id',
				type: 'string',
				default: '',
				description: 'Filter by subteam ID',
				routing: {
					send: {
						type: 'query',
						property: 'subteam_id',
					},
				},
			},
		],
	},

	// ----------------------------------
	//         project: get, delete, update, start
	// ----------------------------------
	{
		displayName: 'Project',
		name: 'projectId',
		type: 'resourceLocator',
		required: true,
		default: { mode: 'list', value: '' },
		description: 'The project to operate on',
		displayOptions: {
			show: {
				resource: ['project'],
				operation: ['get', 'delete', 'update', 'start', 'inviteMember', 'leave'],
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
	},

	// ----------------------------------
	//         project: create
	// ----------------------------------
	{
		displayName: 'Project Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		description: 'Name of the project',
		displayOptions: {
			show: {
				resource: ['project'],
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
				resource: ['project'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the project',
				routing: {
					send: {
						type: 'body',
						property: 'description',
					},
				},
			},
			{
				displayName: 'Template ID',
				name: 'template_id',
				type: 'string',
				default: '',
				description: 'Template ID to use for the project',
				routing: {
					send: {
						type: 'body',
						property: 'template_id',
					},
				},
			},
		],
	},

	// ----------------------------------
	//         project: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['project'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Archived',
				name: 'archived',
				type: 'boolean',
				default: false,
				description: 'Whether the project is archived',
				routing: {
					send: {
						type: 'body',
						property: 'archived',
					},
				},
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the project',
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
				description: 'Name of the project',
				routing: {
					send: {
						type: 'body',
						property: 'name',
					},
				},
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
		description: 'Members to invite to the project',
		displayOptions: {
			show: {
				resource: ['project'],
				operation: ['inviteMember'],
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
						description: 'The member to invite',
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
];
