import { INodeProperties } from 'n8n-workflow';

export const memberOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['member'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get a member',
				description: 'Get a member by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/members/{{$parameter["memberId"]}}',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get many members',
				description: 'Get a list of all team members',
				routing: {
					request: {
						method: 'GET',
						url: '/members',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'members',
								},
							},
						],
					},
				},
			},
		],
		default: 'getMany',
	},
];

export const memberFields: INodeProperties[] = [
	// ----------------------------------
	//         member: get
	// ----------------------------------
	{
		displayName: 'Member ID',
		name: 'memberId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the member',
		displayOptions: {
			show: {
				resource: ['member'],
				operation: ['get'],
			},
		},
	},
];
