# Goala API Endpoints

## Note: all endpoints require:
**"authorization": "bearer TokenService.getAuthToken()"**

## /goals
**GET /api/goals**
----
  Returns json goals for a single user.

**POST /api/goals**
----
  Post a goal for a single user.
  
* **Body Params**
  `{ title: "goal_title", action_id: 1 }`