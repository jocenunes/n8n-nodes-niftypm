# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2024-12-29

### Added
- AI Tool support (`usableAsTool: true`) - node can now be used with n8n AI agents
- Enhanced Document operations with additional fields and options
- Enhanced Task operations with more filter options and fields
- Enhanced Milestone operations with expanded field support
- Enhanced Portfolio operations (now using subteams API)
- Enhanced Tag operations (global labels API)

### Fixed
- Fixed members API response handling (`items` instead of `members`)
- Fixed portfolios/subteams API endpoint and response structure
- Fixed labels/tags API to work globally (team-level, not project-level)
- Removed unnecessary Content-Type header from request defaults
- Fixed Docker custom node loading for n8n 2.x

### Changed
- Improved SVG icon
- Updated resource property definitions for better API compatibility

## [0.1.0] - 2024-12-17

### Added
- Initial release
- OAuth2 authentication support for Nifty PM API
- **Project** operations: Create, Get, Get Many, Update, Delete, Start, Invite Member
- **Task** operations: Create, Get, Get Many, Update, Delete, Complete, Uncomplete, Clone, Move, Add Comment, Get Comments, Create Subtask, Get Subtasks, Create Personal, Get Personal
- **Member** operations: Get, Get Many
- **Document** operations: Create, Get, Get Many, Update, Delete, Invite Members
- **Portfolio** operations: Create, Get, Get Many, Update, Delete, Get Projects
- **Time Tracking** operations: Get Report, Get Duration
- **Milestone** operations: Create, Get, Get Many, Update, Delete
- **Task Group (Status)** operations: Create, Get Many, Update, Delete
- **Tag** operations: Create, Get, Get Many, Update, Delete
- **User** operations: Get Me
