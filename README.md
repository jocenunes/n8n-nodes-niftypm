# n8n-nodes-niftypm

This is an n8n community node for [Nifty PM](https://niftypm.com) - a project management platform that helps teams collaborate and manage projects efficiently.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Community Nodes (Recommended)

1. In n8n, go to **Settings** > **Community Nodes**
2. Click **Install a community node**
3. Enter `n8n-nodes-niftypm`
4. Click **Install**

### Manual Installation

```bash
cd ~/.n8n/custom
npm install n8n-nodes-niftypm
```

## Credentials

This node requires Nifty PM OAuth2 credentials.

### OAuth2 Setup

1. Go to [Nifty PM Developer Portal](https://developers.niftypm.com/)
2. Create a new application to get your **Client ID** and **Client Secret**
3. Set the redirect URL to your n8n OAuth callback URL:
   - For self-hosted: `https://your-n8n-domain.com/rest/oauth2-credential/callback`
   - For n8n Cloud: `https://app.n8n.cloud/rest/oauth2-credential/callback`

### n8n Credential Setup

1. In n8n, go to **Credentials** > **New**
2. Search for "Nifty PM OAuth2 API"
3. Enter your **Client ID** and **Client Secret**
4. Click **Connect my account** to authorize

## Supported Operations

| Resource | Operations |
|----------|------------|
| **Project** | Create, Get, Get Many, Update, Delete, Start, Invite Member |
| **Task** | Create, Get, Get Many, Update, Delete, Complete, Uncomplete, Clone, Move, Add Comment, Get Comments, Create Subtask, Get Subtasks, Create Personal, Get Personal |
| **Member** | Get, Get Many |
| **Document** | Create, Get, Get Many, Update, Delete, Invite Members |
| **Portfolio** | Create, Get, Get Many, Update, Delete, Get Projects |
| **Time Tracking** | Get Report, Get Duration |
| **Milestone** | Create, Get, Get Many, Update, Delete |
| **Task Group (Status)** | Create, Get Many, Update, Delete |
| **Tag** | Create, Get, Get Many, Update, Delete |
| **User** | Get Me |

## Compatibility

- Minimum n8n version: 0.200.0
- Tested with n8n version: 1.x

## Resources

- [Nifty PM Website](https://niftypm.com)
- [Nifty PM API Documentation](https://developers.niftypm.com/)
- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)

## License

[MIT](LICENSE)
