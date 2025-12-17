import { INodeProperties } from 'n8n-workflow';

export const timeTrackingOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['timeTracking'],
			},
		},
		options: [
			{
				name: 'Get Duration',
				value: 'getDuration',
				action: 'Get tracked time duration',
				description: 'Get tracked time duration for a period',
				routing: {
					request: {
						method: 'GET',
						url: '/time/duration',
					},
				},
			},
			{
				name: 'Get Report',
				value: 'getReport',
				action: 'Get time tracking report',
				description: 'Get tracked time report',
				routing: {
					request: {
						method: 'GET',
						url: '/time',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'time_logs',
								},
							},
						],
					},
				},
			},
		],
		default: 'getReport',
	},
];

export const timeTrackingFields: INodeProperties[] = [
	// ----------------------------------
	//         timeTracking: getReport
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: {
			show: {
				resource: ['timeTracking'],
				operation: ['getReport'],
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
				resource: ['timeTracking'],
				operation: ['getReport'],
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
				resource: ['timeTracking'],
				operation: ['getReport'],
			},
		},
		options: [
			{
				displayName: 'End Date',
				name: 'end_date',
				type: 'dateTime',
				default: '',
				description: 'End date for the report',
				routing: {
					send: {
						type: 'query',
						property: 'end_date',
					},
				},
			},
			{
				displayName: 'Include Subtasks',
				name: 'include_subtasks',
				type: 'boolean',
				default: false,
				description: 'Whether to include subtasks in the report',
				routing: {
					send: {
						type: 'query',
						property: 'include_subtasks',
					},
				},
			},
			{
				displayName: 'Member ID',
				name: 'member_id',
				type: 'string',
				default: '',
				description: 'Filter by member ID',
				routing: {
					send: {
						type: 'query',
						property: 'member_id',
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
				displayName: 'Start Date',
				name: 'start_date',
				type: 'dateTime',
				default: '',
				description: 'Start date for the report',
				routing: {
					send: {
						type: 'query',
						property: 'start_date',
					},
				},
			},
			{
				displayName: 'Task ID',
				name: 'task_id',
				type: 'string',
				default: '',
				description: 'Filter by task ID',
				routing: {
					send: {
						type: 'query',
						property: 'task_id',
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
						value: 'all',
					},
					{
						name: 'Running',
						value: 'running',
					},
				],
				default: 'all',
				description: 'Type of time entries to return',
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
	//         timeTracking: getDuration
	// ----------------------------------
	{
		displayName: 'Start Date',
		name: 'start',
		type: 'dateTime',
		required: true,
		default: '',
		description: 'Start date for the duration calculation',
		displayOptions: {
			show: {
				resource: ['timeTracking'],
				operation: ['getDuration'],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'start',
			},
		},
	},
	{
		displayName: 'End Date',
		name: 'end',
		type: 'dateTime',
		required: true,
		default: '',
		description: 'End date for the duration calculation',
		displayOptions: {
			show: {
				resource: ['timeTracking'],
				operation: ['getDuration'],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'end',
			},
		},
	},
	{
		displayName: 'Additional Filters',
		name: 'additionalFilters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['timeTracking'],
				operation: ['getDuration'],
			},
		},
		options: [
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
				displayName: 'Task ID',
				name: 'task_id',
				type: 'string',
				default: '',
				description: 'Filter by task ID',
				routing: {
					send: {
						type: 'query',
						property: 'task_id',
					},
				},
			},
			{
				displayName: 'User ID',
				name: 'user_id',
				type: 'string',
				default: '',
				description: 'Filter by user ID',
				routing: {
					send: {
						type: 'query',
						property: 'user_id',
					},
				},
			},
			{
				displayName: 'User IDs',
				name: 'user_ids',
				type: 'string',
				default: '',
				description: 'Comma-separated list of user IDs to filter by',
				routing: {
					send: {
						type: 'query',
						property: 'user_ids',
					},
				},
			},
		],
	},
];
