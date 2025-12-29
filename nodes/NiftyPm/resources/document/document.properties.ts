import { INodeProperties } from 'n8n-workflow';

export const documentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['document'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a document',
				description: 'Create a new document',
				routing: {
					request: {
						method: 'POST',
						url: '/docs',
					},
				},
			},
			{
				name: 'Create Personal',
				value: 'createPersonal',
				action: 'Create personal document',
				description: 'Create a personal document',
				routing: {
					request: {
						method: 'POST',
						url: '/docs/personal',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a document',
				description: 'Delete a document',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/docs/{{$parameter["documentId"]}}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a document',
				description: 'Get a document by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/docs/{{$parameter["documentId"]}}',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get many documents',
				description: 'Get a list of documents from a project and task',
				routing: {
					request: {
						method: 'GET',
						url: '/docs',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'docs',
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
				name: 'Get Personal',
				value: 'getPersonal',
				action: 'Get personal documents',
				description: 'Get personal documents',
				routing: {
					request: {
						method: 'GET',
						url: '/docs/personal',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'docs',
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
				name: 'Invite Members',
				value: 'inviteMembers',
				action: 'Invite members to document',
				description: 'Invite members to a document',
				routing: {
					request: {
						method: 'PUT',
						url: '=/docs/{{$parameter["documentId"]}}/members',
					},
				},
			},
			{
				name: 'Move to Project',
				value: 'moveToProject',
				action: 'Move document to project',
				description: 'Move a document to another project',
				routing: {
					request: {
						method: 'PUT',
						url: '=/docs/{{$parameter["documentId"]}}/move_to_project',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a document',
				description: 'Update a document',
				routing: {
					request: {
						method: 'PUT',
						url: '=/docs/{{$parameter["documentId"]}}',
					},
				},
			},
		],
		default: 'getMany',
	},
];

export const documentFields: INodeProperties[] = [
	// ----------------------------------
	//         document: getMany
	// ----------------------------------
	{
		displayName: 'Project',
		name: 'projectId',
		type: 'resourceLocator',
		required: true,
		default: { mode: 'list', value: '' },
		description: 'The project to get documents from. Select this first to load tasks.',
		displayOptions: {
			show: {
				resource: ['document'],
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
		displayName: 'Task',
		name: 'taskId',
		type: 'resourceLocator',
		required: true,
		default: { mode: 'list', value: '' },
		description: 'The task to get documents from. Select a project first.',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['getMany'],
			},
		},
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
		routing: {
			send: {
				type: 'query',
				property: 'task_id',
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
				resource: ['document'],
				operation: ['getMany', 'getPersonal'],
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
				resource: ['document'],
				operation: ['getMany', 'getPersonal'],
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
				resource: ['document'],
				operation: ['getMany', 'getPersonal'],
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
				resource: ['document'],
				operation: ['getMany'],
			},
		},
		options: [
			{
				displayName: 'Author',
				name: 'author',
				type: 'string',
				default: '',
				description: 'Filter by document author',
				routing: {
					send: {
						type: 'query',
						property: 'author',
					},
				},
			},
			{
				displayName: 'Folder ID',
				name: 'folder_id',
				type: 'string',
				default: '',
				description: 'Filter by folder ID',
				routing: {
					send: {
						type: 'query',
						property: 'folder_id',
					},
				},
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Filter by document name',
				routing: {
					send: {
						type: 'query',
						property: 'name',
					},
				},
			},
			{
				displayName: 'Parent Document ID',
				name: 'parent_doc_id',
				type: 'string',
				default: '',
				description: 'Filter by parent document ID',
				routing: {
					send: {
						type: 'query',
						property: 'parent_doc_id',
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
				description: 'Sorting order',
				routing: {
					send: {
						type: 'query',
						property: 'sort',
					},
				},
			},
			{
				displayName: 'Tag',
				name: 'tag',
				type: 'string',
				default: '',
				description: 'Filter by document tag',
				routing: {
					send: {
						type: 'query',
						property: 'tag',
					},
				},
			},
		],
	},
	// Filters for getPersonal (different set of options)
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['getPersonal'],
			},
		},
		options: [
			{
				displayName: 'Author',
				name: 'author',
				type: 'string',
				default: '',
				description: 'Filter by document author',
				routing: {
					send: {
						type: 'query',
						property: 'author',
					},
				},
			},
			{
				displayName: 'Folder ID',
				name: 'folder_id',
				type: 'string',
				default: '',
				description: 'Filter by folder ID',
				routing: {
					send: {
						type: 'query',
						property: 'folder_id',
					},
				},
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Filter by document name',
				routing: {
					send: {
						type: 'query',
						property: 'name',
					},
				},
			},
			{
				displayName: 'Parent Document ID',
				name: 'parent_doc_id',
				type: 'string',
				default: '',
				description: 'Filter by parent document ID',
				routing: {
					send: {
						type: 'query',
						property: 'parent_doc_id',
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
				description: 'Sorting order',
				routing: {
					send: {
						type: 'query',
						property: 'sort',
					},
				},
			},
			{
				displayName: 'Tag',
				name: 'tag',
				type: 'string',
				default: '',
				description: 'Filter by document tag',
				routing: {
					send: {
						type: 'query',
						property: 'tag',
					},
				},
			},
		],
	},

	// ----------------------------------
	//         document: get, update, delete
	// ----------------------------------
	{
		displayName: 'Document ID',
		name: 'documentId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the document',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['get', 'update', 'delete', 'inviteMembers', 'moveToProject'],
			},
		},
	},

	// ----------------------------------
	//         document: create
	// ----------------------------------
	{
		displayName: 'Document Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		description: 'Name of the document',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['create', 'createPersonal'],
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
		description: 'The project to create the document in',
		displayOptions: {
			show: {
				resource: ['document'],
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
				resource: ['document'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Access Type',
				name: 'access_type',
				type: 'options',
				options: [
					{
						name: 'Public',
						value: 'public',
					},
					{
						name: 'Limited',
						value: 'limited',
					},
					{
						name: 'Personal',
						value: 'personal',
					},
				],
				default: 'public',
				description: 'Access type of the document',
				routing: {
					send: {
						type: 'body',
						property: 'access_type',
					},
				},
			},
			{
				displayName: 'Content',
				name: 'content',
				type: 'json',
				default: '{}',
				description: 'Document content as JSON',
				routing: {
					send: {
						type: 'body',
						property: 'content',
					},
				},
			},
			{
				displayName: 'Folder ID',
				name: 'folder_id',
				type: 'string',
				default: '',
				description: 'Folder ID to place the document in',
				routing: {
					send: {
						type: 'body',
						property: 'folder_id',
					},
				},
			},
			{
				displayName: 'Parent Document ID',
				name: 'parent_doc_id',
				type: 'string',
				default: '',
				description: 'Parent document ID',
				routing: {
					send: {
						type: 'body',
						property: 'parent_doc_id',
					},
				},
			},
			{
				displayName: 'Task',
				name: 'task_id',
				type: 'resourceLocator',
				default: { mode: 'list', value: '' },
				description: 'Associate document with a task. Select a project first.',
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
				routing: {
					send: {
						type: 'body',
						property: 'task_id',
						value: '={{ typeof $value === "object" ? $value.value : $value }}',
					},
				},
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: [
					{
						name: 'Doc',
						value: 'doc',
					},
					{
						name: 'Embed',
						value: 'embed',
					},
					{
						name: 'External',
						value: 'external',
					},
				],
				default: 'doc',
				description: 'Document type',
				routing: {
					send: {
						type: 'body',
						property: 'type',
					},
				},
			},
		],
	},

	// ----------------------------------
	//         document: createPersonal
	// ----------------------------------
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['createPersonal'],
			},
		},
		options: [
			{
				displayName: 'Content',
				name: 'content',
				type: 'json',
				default: '{}',
				description: 'Document content as JSON',
				routing: {
					send: {
						type: 'body',
						property: 'content',
					},
				},
			},
			{
				displayName: 'Folder ID',
				name: 'folder_id',
				type: 'string',
				default: '',
				description: 'Folder ID to place the document in',
				routing: {
					send: {
						type: 'body',
						property: 'folder_id',
					},
				},
			},
			{
				displayName: 'Parent Document ID',
				name: 'parent_doc_id',
				type: 'string',
				default: '',
				description: 'Parent document ID',
				routing: {
					send: {
						type: 'body',
						property: 'parent_doc_id',
					},
				},
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: [
					{
						name: 'Doc',
						value: 'doc',
					},
					{
						name: 'Embed',
						value: 'embed',
					},
					{
						name: 'External',
						value: 'external',
					},
				],
				default: 'doc',
				description: 'Document type',
				routing: {
					send: {
						type: 'body',
						property: 'type',
					},
				},
			},
		],
	},

	// ----------------------------------
	//         document: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Access Type',
				name: 'access_type',
				type: 'options',
				options: [
					{
						name: 'Public',
						value: 'public',
					},
					{
						name: 'Limited',
						value: 'limited',
					},
					{
						name: 'Personal',
						value: 'personal',
					},
				],
				default: 'public',
				description: 'Access type of the document',
				routing: {
					send: {
						type: 'body',
						property: 'access_type',
					},
				},
			},
			{
				displayName: 'Archived',
				name: 'archived',
				type: 'boolean',
				default: false,
				description: 'Whether the document is archived',
				routing: {
					send: {
						type: 'body',
						property: 'archived',
					},
				},
			},
			{
				displayName: 'Content',
				name: 'content',
				type: 'json',
				default: '{}',
				description: 'Document content as JSON',
				routing: {
					send: {
						type: 'body',
						property: 'content',
					},
				},
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Name of the document',
				routing: {
					send: {
						type: 'body',
						property: 'name',
					},
				},
			},
		],
	},

	// ----------------------------------
	//         document: inviteMembers
	// ----------------------------------
	{
		displayName: 'Members',
		name: 'members',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		placeholder: 'Add Member',
		default: {},
		required: true,
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['inviteMembers'],
			},
		},
		options: [
			{
				displayName: 'Member',
				name: 'memberValues',
				values: [
					{
						displayName: 'Member',
						name: 'id',
						type: 'resourceLocator',
						default: { mode: 'list', value: '' },
						description: 'Member to invite',
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
					{
						displayName: 'Permission',
						name: 'permission',
						type: 'options',
						options: [
							{
								name: 'View',
								value: 'view',
							},
							{
								name: 'Comment',
								value: 'comment',
							},
							{
								name: 'Edit',
								value: 'edit',
							},
						],
						default: 'view',
						description: 'Permission level for the member',
					},
				],
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'members',
				value: '={{ $value.memberValues ? $value.memberValues.map(m => ({ id: typeof m.id === "object" ? m.id.value : m.id, permission: m.permission })) : [] }}',
			},
		},
	},

	// ----------------------------------
	//         document: moveToProject
	// ----------------------------------
	{
		displayName: 'Target Project',
		name: 'targetProjectId',
		type: 'resourceLocator',
		required: true,
		default: { mode: 'list', value: '' },
		description: 'The project to move the document to',
		displayOptions: {
			show: {
				resource: ['document'],
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
	{
		displayName: 'Additional Options',
		name: 'moveOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['moveToProject'],
			},
		},
		options: [
			{
				displayName: 'Folder ID',
				name: 'folder_id',
				type: 'string',
				default: '',
				description: 'Target folder ID in the new project',
				routing: {
					send: {
						type: 'body',
						property: 'folder_id',
					},
				},
			},
		],
	},
];
