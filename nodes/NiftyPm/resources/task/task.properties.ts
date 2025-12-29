import { INodeProperties } from 'n8n-workflow';

export const taskOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['task'],
			},
		},
		options: [
			{
				name: 'Add Comment',
				value: 'addComment',
				action: 'Add comment to task',
				description: 'Add a comment to a task',
				routing: {
					request: {
						method: 'POST',
						url: '/messages',
					},
				},
			},
			{
				name: 'Clone',
				value: 'clone',
				action: 'Clone a task',
				description: 'Create a copy of a task',
				routing: {
					request: {
						method: 'POST',
						url: '=/tasks/{{ typeof $parameter["taskId"] === "object" ? $parameter["taskId"].value : $parameter["taskId"] }}/clone',
					},
				},
			},
			{
				name: 'Complete',
				value: 'complete',
				action: 'Complete a task',
				description: 'Mark a task as completed',
				routing: {
					request: {
						method: 'POST',
						url: '=/tasks/{{ typeof $parameter["taskId"] === "object" ? $parameter["taskId"].value : $parameter["taskId"] }}/complete',
					},
				},
			},
			{
				name: 'Create',
				value: 'create',
				action: 'Create a task',
				description: 'Create a new task',
				routing: {
					request: {
						method: 'POST',
						url: '/tasks',
					},
				},
			},
			{
				name: 'Create Personal',
				value: 'createPersonal',
				action: 'Create personal task',
				description: 'Create a personal task',
				routing: {
					request: {
						method: 'POST',
						url: '/tasks/personal',
					},
				},
			},
			{
				name: 'Create Subtask',
				value: 'createSubtask',
				action: 'Create a subtask',
				description: 'Create a subtask for a task',
				routing: {
					request: {
						method: 'POST',
						url: '=/tasks/{{ typeof $parameter["taskId"] === "object" ? $parameter["taskId"].value : $parameter["taskId"] }}/subtasks',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete tasks',
				description: 'Delete one or more tasks',
				routing: {
					request: {
						method: 'DELETE',
						url: '/tasks',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a task',
				description: 'Get a task by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/tasks/{{ typeof $parameter["taskId"] === "object" ? $parameter["taskId"].value : $parameter["taskId"] }}',
					},
				},
			},
			{
				name: 'Get Comments',
				value: 'getComments',
				action: 'Get task comments',
				description: 'Get comments for a task (via messages API)',
				routing: {
					request: {
						method: 'GET',
						url: '/messages',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'messages',
								},
							},
						],
					},
				},
			},
		{
			name: 'Get Many',
			value: 'getMany',
			action: 'Get many tasks',
			description: 'Get a list of tasks',
			routing: {
				request: {
					method: 'GET',
					url: '/tasks',
				},
				output: {
					postReceive: [
						{
							type: 'rootProperty',
							properties: {
								property: 'tasks',
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
			action: 'Get personal tasks',
			description: 'Get personal tasks',
			routing: {
				request: {
					method: 'GET',
					url: '/tasks/personal',
				},
				output: {
					postReceive: [
						{
							type: 'rootProperty',
							properties: {
								property: 'tasks',
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
				name: 'Get Subtasks',
				value: 'getSubtasks',
				action: 'Get subtasks',
				description: 'Get subtasks for a task',
				routing: {
					request: {
						method: 'GET',
						url: '/tasks',
						qs: {
							include_subtasks: true,
						},
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'tasks',
								},
							},
						],
					},
				},
			},
			{
				name: 'Move',
				value: 'move',
				action: 'Move tasks',
				description: 'Move tasks to another project or status',
				routing: {
					request: {
						method: 'POST',
						url: '/tasks/move',
					},
				},
			},
		{
			name: 'Add Labels',
			value: 'addLabels',
			action: 'Add labels to task',
			description: 'Add labels/tags to a task',
			routing: {
				request: {
					method: 'PUT',
					url: '=/tasks/{{ typeof $parameter["taskId"] === "object" ? $parameter["taskId"].value : $parameter["taskId"] }}/labels',
				},
			},
		},
		{
			name: 'Archive',
			value: 'archive',
			action: 'Archive a task',
			description: 'Archive a task',
			routing: {
				request: {
					method: 'POST',
					url: '=/tasks/{{ typeof $parameter["taskId"] === "object" ? $parameter["taskId"].value : $parameter["taskId"] }}/archive',
				},
			},
		},
		{
			name: 'Assign',
			value: 'assign',
			action: 'Assign task to members',
			description: 'Assign members to a task',
			routing: {
				request: {
					method: 'PUT',
					url: '=/tasks/{{ typeof $parameter["taskId"] === "object" ? $parameter["taskId"].value : $parameter["taskId"] }}/assignees',
				},
			},
		},
		{
			name: 'Link Tasks',
			value: 'linkTask',
			action: 'Link tasks together',
			description: 'Create a link between tasks',
			routing: {
				request: {
					method: 'POST',
					url: '=/tasks/{{ typeof $parameter["taskId"] === "object" ? $parameter["taskId"].value : $parameter["taskId"] }}/link_task',
				},
			},
		},
		{
			name: 'Remove Labels',
			value: 'removeLabels',
			action: 'Remove labels from task',
			description: 'Remove labels/tags from a task',
			routing: {
				request: {
					method: 'DELETE',
					url: '=/tasks/{{ typeof $parameter["taskId"] === "object" ? $parameter["taskId"].value : $parameter["taskId"] }}/labels',
				},
			},
		},
		{
			name: 'Unassign',
			value: 'unassign',
			action: 'Unassign members from task',
			description: 'Remove assigned members from a task',
			routing: {
				request: {
					method: 'DELETE',
					url: '=/tasks/{{ typeof $parameter["taskId"] === "object" ? $parameter["taskId"].value : $parameter["taskId"] }}/assignees',
				},
			},
		},
		{
			name: 'Uncomplete',
			value: 'uncomplete',
			action: 'Uncomplete a task',
			description: 'Mark a task as not completed',
			routing: {
				request: {
					method: 'DELETE',
					url: '=/tasks/{{ typeof $parameter["taskId"] === "object" ? $parameter["taskId"].value : $parameter["taskId"] }}/complete',
				},
			},
		},
		{
			name: 'Update',
			value: 'update',
			action: 'Update a task',
			description: 'Update a task',
			routing: {
				request: {
					method: 'PUT',
					url: '=/tasks/{{ typeof $parameter["taskId"] === "object" ? $parameter["taskId"].value : $parameter["taskId"] }}',
				},
			},
		},
	],
	default: 'getMany',
},
];

export const taskFields: INodeProperties[] = [
	// ----------------------------------
	//         task: getMany
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: {
			show: {
				resource: ['task'],
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
				resource: ['task'],
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
				resource: ['task'],
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
				resource: ['task'],
				operation: ['getMany'],
			},
		},
		options: [
			{
				displayName: 'Archived',
				name: 'archived',
				type: 'boolean',
				default: false,
				description: 'Whether to return archived tasks',
				routing: {
					send: {
						type: 'query',
						property: 'archived',
					},
				},
			},
		{
			displayName: 'Completed',
			name: 'completed',
			type: 'boolean',
			default: false,
			description: 'Whether to return completed tasks',
			routing: {
				send: {
					type: 'query',
					property: 'completed',
				},
			},
		},
		{
			displayName: 'Completed By',
			name: 'completed_by',
			type: 'resourceLocator',
			default: { mode: 'list', value: '' },
			description: 'Filter by member who completed the task',
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
			routing: {
				send: {
					type: 'query',
					property: 'completed_by',
					value: '={{ typeof $value === "object" ? $value.value : $value }}',
				},
			},
		},
		{
			displayName: 'Completed From',
			name: 'completed_from',
			type: 'dateTime',
			default: '',
			description: 'Filter tasks completed from this date',
			routing: {
				send: {
					type: 'query',
					property: 'completed_from',
				},
			},
		},
		{
			displayName: 'Completed To',
			name: 'completed_to',
			type: 'dateTime',
			default: '',
			description: 'Filter tasks completed until this date',
			routing: {
				send: {
					type: 'query',
					property: 'completed_to',
				},
			},
		},
		{
			displayName: 'Due Date From',
			name: 'from',
			type: 'dateTime',
			default: '',
			description: 'Filter tasks with due date from this date',
			routing: {
				send: {
					type: 'query',
					property: 'from',
				},
			},
		},
		{
			displayName: 'Due Date To',
			name: 'to',
			type: 'dateTime',
			default: '',
			description: 'Filter tasks with due date until this date',
			routing: {
				send: {
					type: 'query',
					property: 'to',
				},
			},
		},
		{
			displayName: 'Include Archived',
			name: 'include_archived',
			type: 'boolean',
			default: false,
			description: 'Whether to include archived tasks in results',
			routing: {
				send: {
					type: 'query',
					property: 'include_archived',
				},
			},
		},
		{
			displayName: 'Include Subtasks',
			name: 'include_subtasks',
			type: 'boolean',
			default: false,
			description: 'Whether to include subtasks',
			routing: {
				send: {
					type: 'query',
					property: 'include_subtasks',
				},
			},
		},
			{
				displayName: 'Member',
				name: 'member_id',
				type: 'resourceLocator',
				default: { mode: 'list', value: '' },
				description: 'Filter by member',
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
				routing: {
					send: {
						type: 'query',
						property: 'member_id',
						value: '={{ typeof $value === "object" ? $value.value : $value }}',
					},
				},
			},
			{
				displayName: 'Milestone',
				name: 'milestone_id',
				type: 'resourceLocator',
				default: { mode: 'list', value: '' },
				description: 'Filter by milestone',
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
				routing: {
					send: {
						type: 'query',
						property: 'milestone_id',
						value: '={{ typeof $value === "object" ? $value.value : $value }}',
					},
				},
			},
			{
				displayName: 'Order',
				name: 'order',
				type: 'options',
				options: [
					{
						name: 'Due Date ASC',
						value: 'dueDate:ASC',
					},
					{
						name: 'Due Date DESC',
						value: 'dueDate:DESC',
					},
					{
						name: 'Completed On ASC',
						value: 'completedOn:ASC',
					},
					{
						name: 'Completed On DESC',
						value: 'completedOn:DESC',
					},
				],
				default: 'dueDate:ASC',
				description: 'Sort order',
				routing: {
					send: {
						type: 'query',
						property: 'order',
					},
				},
			},
			{
				displayName: 'Project',
				name: 'project_id',
				type: 'resourceLocator',
				default: { mode: 'list', value: '' },
				description: 'Filter by project',
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
				displayName: 'Task Group (Status)',
				name: 'task_group_id',
				type: 'resourceLocator',
				default: { mode: 'list', value: '' },
				description: 'Filter by task group (status). Select a project first.',
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
						type: 'query',
						property: 'task_group_id',
						value: '={{ typeof $value === "object" ? $value.value : $value }}',
					},
				},
			},
		],
	},

	// ----------------------------------
	//         task: get, update, delete, complete, uncomplete, clone
	// ----------------------------------
	{
		displayName: 'Task',
		name: 'taskId',
		type: 'resourceLocator',
		required: true,
		default: { mode: 'list', value: '' },
		description: 'The task to operate on',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['get', 'update', 'complete', 'uncomplete', 'clone', 'createSubtask', 'archive', 'assign', 'unassign', 'addLabels', 'removeLabels', 'linkTask'],
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
	},
	// Field for addComment - sends task_id in request body
	{
		displayName: 'Task',
		name: 'taskId',
		type: 'resourceLocator',
		required: true,
		default: { mode: 'list', value: '' },
		description: 'The task to add a comment to',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['addComment'],
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
				type: 'body',
				property: 'task_id',
			},
		},
	},
	// Field for getComments - sends task_id as query parameter
	{
		displayName: 'Task',
		name: 'taskId',
		type: 'resourceLocator',
		required: true,
		default: { mode: 'list', value: '' },
		description: 'The task to get comments from',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['getComments'],
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
			},
		},
	},
	// Field for getSubtasks - sends task_id as query parameter
	{
		displayName: 'Parent Task',
		name: 'taskId',
		type: 'resourceLocator',
		required: true,
		default: { mode: 'list', value: '' },
		description: 'The parent task to get subtasks from',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['getSubtasks'],
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
			},
		},
	},

	// ----------------------------------
	//         task: create
	// ----------------------------------
	{
		displayName: 'Task Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		description: 'Name of the task',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['create', 'createPersonal', 'createSubtask'],
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
		description: 'The project to create the task in. Select this first to load task groups.',
		displayOptions: {
			show: {
				resource: ['task'],
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
		displayName: 'Task Group (Status)',
		name: 'taskGroupId',
		type: 'resourceLocator',
		required: true,
		default: { mode: 'list', value: '' },
		description: 'The task group (status) to create the task in. Select a project first.',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['create'],
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
		routing: {
			send: {
				type: 'body',
				property: 'task_group_id',
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
				resource: ['task'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Assignees',
				name: 'assignees',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				placeholder: 'Add Assignee',
				default: {},
				description: 'Members to assign to the task',
				options: [
					{
						displayName: 'Assignee',
						name: 'assigneeValues',
						values: [
							{
								displayName: 'Member',
								name: 'id',
								type: 'resourceLocator',
								default: { mode: 'list', value: '' },
								description: 'Member to assign',
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
						property: 'assignees',
						value: '={{ $value.assigneeValues ? $value.assigneeValues.map(a => typeof a.id === "object" ? a.id.value : a.id) : [] }}',
					},
				},
			},
			{
				displayName: 'Banner URL',
				name: 'banner',
				type: 'string',
				default: '',
				description: 'URL of the banner image for the task',
				routing: {
					send: {
						type: 'body',
						property: 'banner',
					},
				},
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'Description of the task',
				routing: {
					send: {
						type: 'body',
						property: 'description',
					},
				},
			},
			{
				displayName: 'Due Date',
				name: 'due_date',
				type: 'dateTime',
				default: '',
				description: 'Due date of the task',
				routing: {
					send: {
						type: 'body',
						property: 'due_date',
					},
				},
			},
			{
				displayName: 'Embed URL',
				name: 'embed_url',
				type: 'string',
				default: '',
				description: 'URL to embed in the task (e.g., Figma, YouTube)',
				routing: {
					send: {
						type: 'body',
						property: 'embed_url',
					},
				},
			},
			{
				displayName: 'Labels',
				name: 'labels',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				placeholder: 'Add Label',
				default: {},
				description: 'Labels/tags to add to the task',
				options: [
					{
						displayName: 'Label',
						name: 'labelValues',
						values: [
							{
								displayName: 'Label',
								name: 'id',
								type: 'resourceLocator',
								default: { mode: 'list', value: '' },
								description: 'Label to add',
								modes: [
									{
										displayName: 'From List',
										name: 'list',
										type: 'list',
										typeOptions: {
											searchListMethod: 'getTags',
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
						property: 'labels',
						value: '={{ $value.labelValues ? $value.labelValues.map(l => typeof l.id === "object" ? l.id.value : l.id) : [] }}',
					},
				},
			},
			{
				displayName: 'Milestone',
				name: 'milestone_id',
				type: 'resourceLocator',
				default: { mode: 'list', value: '' },
				description: 'Milestone to assign the task to. Select a project first.',
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
				routing: {
					send: {
						type: 'body',
						property: 'milestone_id',
						value: '={{ typeof $value === "object" ? $value.value : $value }}',
					},
				},
			},
			{
				displayName: 'Order',
				name: 'order',
				type: 'number',
				default: 0,
				description: 'Order/position of the task in the list',
				routing: {
					send: {
						type: 'body',
						property: 'order',
					},
				},
			},
			{
				displayName: 'Start Date',
				name: 'start_date',
				type: 'dateTime',
				default: '',
				description: 'Start date of the task',
				routing: {
					send: {
						type: 'body',
						property: 'start_date',
					},
				},
			},
			{
				displayName: 'Story Points',
				name: 'story_points',
				type: 'number',
				default: 0,
				description: 'Story points for the task (for agile workflows)',
				routing: {
					send: {
						type: 'body',
						property: 'story_points',
					},
				},
			},
			{
				displayName: 'Template',
				name: 'template_id',
				type: 'string',
				default: '',
				description: 'ID of a task template to use',
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
	//         task: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Assignees',
				name: 'assignees',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				placeholder: 'Add Assignee',
				default: {},
				description: 'Members to assign to the task',
				options: [
					{
						displayName: 'Assignee',
						name: 'assigneeValues',
						values: [
							{
								displayName: 'Member',
								name: 'id',
								type: 'resourceLocator',
								default: { mode: 'list', value: '' },
								description: 'Member to assign',
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
						property: 'assignees',
						value: '={{ $value.assigneeValues ? $value.assigneeValues.map(a => typeof a.id === "object" ? a.id.value : a.id) : [] }}',
					},
				},
			},
			{
				displayName: 'Banner URL',
				name: 'banner',
				type: 'string',
				default: '',
				description: 'URL for the task banner image',
				routing: {
					send: {
						type: 'body',
						property: 'banner',
					},
				},
			},
			{
				displayName: 'Dependency',
				name: 'dependency',
				type: 'resourceLocator',
				default: { mode: 'list', value: '' },
				description: 'Task that this task depends on',
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
						property: 'dependency',
						value: '={{ typeof $value === "object" ? $value.value : $value }}',
					},
				},
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'Description of the task',
				routing: {
					send: {
						type: 'body',
						property: 'description',
					},
				},
			},
			{
				displayName: 'Due Date',
				name: 'due_date',
				type: 'dateTime',
				default: '',
				description: 'Due date of the task',
				routing: {
					send: {
						type: 'body',
						property: 'due_date',
					},
				},
			},
			{
				displayName: 'Embed URL',
				name: 'embed_url',
				type: 'string',
				default: '',
				description: 'URL to embed in the task (e.g., Figma, YouTube)',
				routing: {
					send: {
						type: 'body',
						property: 'embed_url',
					},
				},
			},
			{
				displayName: 'Labels',
				name: 'labels',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				placeholder: 'Add Label',
				default: {},
				description: 'Labels/tags to assign to the task',
				options: [
					{
						displayName: 'Label',
						name: 'labelValues',
						values: [
							{
								displayName: 'Label',
								name: 'id',
								type: 'resourceLocator',
								default: { mode: 'list', value: '' },
								description: 'Label to add',
								modes: [
									{
										displayName: 'From List',
										name: 'list',
										type: 'list',
										typeOptions: {
											searchListMethod: 'getTags',
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
						property: 'labels',
						value: '={{ $value.labelValues ? $value.labelValues.map(l => typeof l.id === "object" ? l.id.value : l.id) : [] }}',
					},
				},
			},
			{
				displayName: 'Milestone',
				name: 'milestone_id',
				type: 'resourceLocator',
				default: { mode: 'list', value: '' },
				description: 'Milestone to assign the task to',
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
				routing: {
					send: {
						type: 'body',
						property: 'milestone_id',
						value: '={{ typeof $value === "object" ? $value.value : $value }}',
					},
				},
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Name of the task',
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
				description: 'Order/position of the task in the list',
				routing: {
					send: {
						type: 'body',
						property: 'order',
					},
				},
			},
			{
				displayName: 'Reminder',
				name: 'reminder',
				type: 'dateTime',
				default: '',
				description: 'Reminder date/time for the task',
				routing: {
					send: {
						type: 'body',
						property: 'reminder',
					},
				},
			},
			{
				displayName: 'Start Date',
				name: 'start_date',
				type: 'dateTime',
				default: '',
				description: 'Start date of the task',
				routing: {
					send: {
						type: 'body',
						property: 'start_date',
					},
				},
			},
			{
				displayName: 'Story Points',
				name: 'story_points',
				type: 'number',
				default: 0,
				description: 'Story points for the task (for agile workflows)',
				routing: {
					send: {
						type: 'body',
						property: 'story_points',
					},
				},
			},
			{
				displayName: 'Task Group (Status)',
				name: 'task_group_id',
				type: 'resourceLocator',
				default: { mode: 'list', value: '' },
				description: 'Task group (status) to assign the task to',
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
	//         task: delete
	// ----------------------------------
	{
		displayName: 'Task IDs',
		name: 'taskIds',
		type: 'string',
		required: true,
		default: '',
		description: 'Comma-separated list of task IDs to delete',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['delete'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'tasks',
				value: '={{$value.split(",").map(id => id.trim())}}',
			},
		},
	},

	// ----------------------------------
	//         task: move
	// ----------------------------------
	{
		displayName: 'Task IDs',
		name: 'taskIds',
		type: 'string',
		required: true,
		default: '',
		description: 'Comma-separated list of task IDs to move',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['move'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'tasks',
				value: '={{$value.split(",").map(id => id.trim())}}',
			},
		},
	},
	{
		displayName: 'Target Project',
		name: 'targetProjectId',
		type: 'resourceLocator',
		required: true,
		default: { mode: 'list', value: '' },
		description: 'The target project to move tasks to',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['move'],
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
		displayName: 'Target Task Group (Status)',
		name: 'targetTaskGroupId',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		description: 'The target task group (status) to move tasks to',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['move'],
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
		routing: {
			send: {
				type: 'body',
				property: 'task_group_id',
				value: '={{ typeof $value === "object" ? $value.value : $value }}',
			},
		},
	},

	// ----------------------------------
	//         task: addComment
	// ----------------------------------
	{
		displayName: 'Comment',
		name: 'comment',
		type: 'string',
		required: true,
		default: '',
		description: 'The comment text',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['addComment'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'text',
			},
		},
	},
	// Hidden field to send type: 'text' to the API
	{
		displayName: 'Message Type',
		name: 'messageType',
		type: 'hidden',
		default: 'text',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['addComment'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'type',
			},
		},
	},
	{
		displayName: 'Attach Image',
		name: 'attachImage',
		type: 'boolean',
		default: false,
		description: 'Whether to attach an image to the comment',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['addComment'],
			},
		},
	},
	{
		displayName: 'Image Source',
		name: 'imageSource',
		type: 'options',
		default: 'binaryData',
		description: 'Where to get the image from',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['addComment'],
				attachImage: [true],
			},
		},
		options: [
			{
				name: 'Binary Data',
				value: 'binaryData',
				description: 'Use binary data from a previous node',
			},
			{
				name: 'URL',
				value: 'url',
				description: 'Use an image URL directly',
			},
		],
	},
	{
		displayName: 'Binary Property',
		name: 'binaryPropertyName',
		type: 'string',
		default: 'data',
		required: true,
		description: 'Name of the binary property containing the image',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['addComment'],
				attachImage: [true],
				imageSource: ['binaryData'],
			},
		},
	},
	{
		displayName: 'Image URL',
		name: 'imageUrl',
		type: 'string',
		default: '',
		required: true,
		description: 'URL of the image to attach',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['addComment'],
				attachImage: [true],
				imageSource: ['url'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'external_files',
				value: '={{ $value ? [$value] : undefined }}',
			},
		},
	},
	{
		displayName: 'MinIO/S3 Settings',
		name: 'minioSettings',
		type: 'collection',
		placeholder: 'Configure MinIO/S3',
		default: {},
		description: 'Settings for uploading images to MinIO/S3',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['addComment'],
				attachImage: [true],
				imageSource: ['binaryData'],
			},
		},
		options: [
			{
				displayName: 'Endpoint',
				name: 'endpoint',
				type: 'string',
				default: 'http://localhost:9000',
				description: 'MinIO/S3 endpoint URL',
			},
			{
				displayName: 'Bucket',
				name: 'bucket',
				type: 'string',
				default: 'n8n-nifty-files',
				description: 'Bucket name for storing images',
			},
			{
				displayName: 'Access Key',
				name: 'accessKey',
				type: 'string',
				default: 'minioadmin',
				description: 'Access key for MinIO/S3',
			},
			{
				displayName: 'Secret Key',
				name: 'secretKey',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: 'minioadmin',
				description: 'Secret key for MinIO/S3',
			},
			{
				displayName: 'Public URL Base',
				name: 'publicUrl',
				type: 'string',
				default: 'http://localhost:9000',
				description: 'Public URL base for accessing uploaded files',
			},
			{
				displayName: 'Region',
				name: 'region',
				type: 'string',
				default: 'us-east-1',
				description: 'Region for S3 (use us-east-1 for MinIO)',
			},
		],
	},

	{
		displayName: 'Archive',
		name: 'archived',
		type: 'boolean',
		required: true,
		default: true,
		description: 'Whether to archive (true) or unarchive (false) the task',
		displayOptions: {
			show: {
				resource: ['task'],
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

	{
		displayName: 'Members',
		name: 'assignees',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		placeholder: 'Add Member',
		default: {},
		required: true,
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['assign', 'unassign'],
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
						description: 'Member to assign/unassign',
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
				property: 'assignees',
				value: '={{ $value.memberValues ? $value.memberValues.map(m => typeof m.id === "object" ? m.id.value : m.id) : [] }}',
			},
		},
	},

	{
		displayName: 'Labels',
		name: 'labels',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		placeholder: 'Add Label',
		default: {},
		required: true,
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['addLabels', 'removeLabels'],
			},
		},
		options: [
			{
				displayName: 'Label',
				name: 'labelValues',
				values: [
					{
						displayName: 'Label',
						name: 'id',
						type: 'resourceLocator',
						default: { mode: 'list', value: '' },
						description: 'Label/tag to add or remove',
						modes: [
							{
								displayName: 'From List',
								name: 'list',
								type: 'list',
								typeOptions: {
									searchListMethod: 'getTags',
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
				property: 'labels',
				value: '={{ $value.labelValues ? $value.labelValues.map(l => typeof l.id === "object" ? l.id.value : l.id) : [] }}',
			},
		},
	},

	{
		displayName: 'Tasks to Link',
		name: 'linkedTasks',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		placeholder: 'Add Task to Link',
		default: {},
		required: true,
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['linkTask'],
			},
		},
		options: [
			{
				displayName: 'Linked Task',
				name: 'taskValues',
				values: [
					{
						displayName: 'Task',
						name: 'id',
						type: 'resourceLocator',
						default: { mode: 'list', value: '' },
						description: 'Task to link',
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
					{
						displayName: 'Link Type',
						name: 'type',
						type: 'options',
						options: [
							{
								name: 'Blocks',
								value: 'blocks',
							},
							{
								name: 'Blocked By',
								value: 'blocked_by',
							},
							{
								name: 'Related',
								value: 'related',
							},
						],
						default: 'related',
						description: 'Type of link between tasks',
					},
				],
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'tasks',
				value: '={{ $value.taskValues ? $value.taskValues.map(t => ({ task_id: typeof t.id === "object" ? t.id.value : t.id, type: t.type })) : [] }}',
			},
		},
	},
];