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
						url: '=/tasks/{{$parameter["taskId"]}}/clone',
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
						url: '=/tasks/{{$parameter["taskId"]}}/complete',
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
						url: '=/tasks/{{$parameter["taskId"]}}/subtasks',
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
						url: '=/tasks/{{$parameter["taskId"]}}',
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
				name: 'Uncomplete',
				value: 'uncomplete',
				action: 'Uncomplete a task',
				description: 'Mark a task as not completed',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/tasks/{{$parameter["taskId"]}}/complete',
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
						url: '=/tasks/{{$parameter["taskId"]}}',
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
				operation: ['get', 'update', 'complete', 'uncomplete', 'clone', 'createSubtask'],
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
				type: 'string',
				default: '',
				description: 'Comma-separated list of member IDs to assign',
				routing: {
					send: {
						type: 'body',
						property: 'assignees',
						value: '={{$value ? $value.split(",").map(id => id.trim()) : []}}',
					},
				},
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
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
				type: 'string',
				default: '',
				description: 'Comma-separated list of member IDs to assign',
				routing: {
					send: {
						type: 'body',
						property: 'assignees',
						value: '={{$value ? $value.split(",").map(id => id.trim()) : []}}',
					},
				},
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
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
];