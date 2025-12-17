import { INodeProperties } from 'n8n-workflow';

export const userOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['user'],
			},
		},
		options: [
			{
				name: 'Get Me',
				value: 'getMe',
				action: 'Get current user',
				description: 'Get the current authenticated user details',
				routing: {
					request: {
						method: 'GET',
						url: '/users/me',
					},
				},
			},
		],
		default: 'getMe',
	},
];

export const userFields: INodeProperties[] = [];
