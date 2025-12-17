import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class NiftyPmOAuth2Api implements ICredentialType {
	name = 'niftyPmOAuth2Api';
	displayName = 'Nifty PM OAuth2 API';
	documentationUrl = 'https://developers.niftypm.com/reference/authentication';
	extends = ['oAuth2Api'];

	properties: INodeProperties[] = [
		{
			displayName: 'Grant Type',
			name: 'grantType',
			type: 'hidden',
			default: 'authorizationCode',
		},
		{
			displayName: 'Authorization URL',
			name: 'authUrl',
			type: 'hidden',
			default: 'https://nifty.pm/authorize',
		},
		{
			displayName: 'Access Token URL',
			name: 'accessTokenUrl',
			type: 'hidden',
			default: 'https://openapi.niftypm.com/oauth/token',
		},
		{
			displayName: 'Scope',
			name: 'scope',
			type: 'hidden',
			default: 'task project milestone message doc file member subteam subtask task_group label time_tracking folder',
		},
		{
			displayName: 'Auth URI Query Parameters',
			name: 'authQueryParameters',
			type: 'hidden',
			default: '',
		},
		{
			displayName: 'Authentication',
			name: 'authentication',
			type: 'hidden',
			default: 'header',
		},
	];
}
