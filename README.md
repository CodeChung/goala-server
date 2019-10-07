# Goala API
## Required:
- Authorization: Bearer {LoginToken}
## Endpoints:
### /api/actions
- `GET` - Returns actions with matching user id.
- `POST` - Creates action with user id.
        - **body**: `{ title: 'Golfing' }`
- /:actionId `DELETE` - Deletes action with matching actionId.
### /api/auth
- `POST` - Returns JWT for valid user
        - **body**: `{ username: 'jimothy', password: 'password' }`
### /api/blocks
- `POST` - Returns an array of Draggable Block Components for Goals/Reminders
        - **body**: `{ ids: [sequence of Block Ids] }`
- /:blockId `PATCH` - Updates the value of the block with matching id
        - **body**: `{ value: {type: 'text', text: 'Get the milk'} }`
- /:new `POST` - Creates an array of new blocks
        - **body**: `{ newBlocks: [{id: 23, type: 'weekly'},], goal_id: 1, reminder_id: null }`
        - either goal_id or reminder_id
- /goal/:goalId `GET` - Get blocks that match goalId
- /reminder/:reminderId `GET` - Get blocks that match reminderId
### /api/entries
- `GET` - gets entries that match user id
- `PATCH` - updates entries
- `POST` - creates new entry
        - **body**: `{ title, date, text: string, blocks: [arr of blockIds] }` 
- /month/:month `GET` - gets user entries by month
- /search/:keyword `GET` -gets user entries by keyword
- /date/:date `GET` -gets user entries by date, format(YYYY-MM-DD)
- /title/:entryId `POST` -posts new title to entry with matching id.
        - **body**: `{ title: 'Yo' }`
- /text/:entryId `POST` -posts new text to entry with matching id.
        - **body**: `{ text: 'Gabba' }` 
### /api/goals
- `GET` - gets goals that match user id
- `POST` - creates new goals
        - **body**: `{ title, action_id }` 
- /day/:day `GET`- get user's goals by day of the week
- /:goalId `GET` - get goal by id.
- /:goalId `DELETE` -delete goal by id
### /api/reminders
- `GET` - gets reminders that match user id
- `POST` - creates new reminders
        - **body**: `{ title, action_id }` 
- /day/:day `GET`- get user's reminders by day of the week
- /date/:date `GET` -get user's reminders by specific date
- /:reminderId `GET` - get reminder by id.
- /:reminderId `DELETE` -delete reminder by id
### /api/users
- `POST` - Creates a new user
        - **body**: `{ name: (string), username: (string), password: (string)}`

## Technologies Used:
* React
* Node.js
* Postgres
* HTML5
* CSS3
* JWT Authentication
* Love
