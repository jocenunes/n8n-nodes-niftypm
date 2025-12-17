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
				description: 'Get a list of documents',
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
				},
			},
			{
				name: 'Invite Members',
				value: 'inviteMembers',
				action: 'Invite members to document',
				description: 'Invite members to a document',
				routing: {
					request: {
						method: 'POST',
						url: '=/docs/{{$parameter["documentId"]}}/invite',
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
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: {
			show: {
				resource: ['document'],
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
				resource: ['document'],
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
				resource: ['document'],
				operation: ['getMany'],
			},
		},
		options: [
			{
				displayName: 'Archived',
				name: 'archived',
				type: 'boolean',
				default: false,
				description: 'Whether to return archived documents',
				routing: {
					send: {
						type: 'query',
						property: 'archived',
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
			{
				displayName: 'Project ID',
				name: 'project_id',
				type: 'string',
				default: '',
				description: 'Filter by project ID',
				routing: {
					send: {
						type: 'query',
						property: 'project_id',
					},
				},
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: [
					{
						name: 'All',
						value: '',
					},
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
				default: '',
				description: 'Document type',
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
				operation: ['get', 'update', 'delete', 'inviteMembers'],
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
		displayName: 'Project ID',
		name: 'projectId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the project',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['create'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'project_id',
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
						displayName: 'Member ID',
						name: 'id',
						type: 'string',
						default: '',
						description: 'ID of the member to invite',
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
				value: '={{$value.memberValues}}',
			},
		},
	},
];
