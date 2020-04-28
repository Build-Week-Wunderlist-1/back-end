# Wunderlist

## Endpoints

Base: https://lambdawunderlist.herokuapp.com/

### Auth Routes

| Method | Type     | Endpoint                   | Send                                | Returns                                              |
| ------ | -------- | -------------------------- | ----------------------------------- | ---------------------------------------------------- |
| POST   | Register | /auth/register/`:userType` | See below                           | Message: `res.data`                                  |
| POST   | Login    | /auth/login/`:userType`    | JSON with "username" and "password" | Message: `res.data.message`, Token: `res.data.token` |

Registration info:

| \\\\\\\\\\\\\\\   | Required | Type   |
| ----------------- | -------- | ------ |
| username (unique) | yes      | string |
| email (unique)    | yes      | string |
| password          | yes      | string |

## Restricted Routes

_Token must be sent to access_

| Method | Type            | Endpoint                   | Send                      | Returns                 |
| ------ | --------------- | -------------------------- | ------------------------- | ----------------------- |
| List   |                 | `:id` = userId             |                           |                         |
| POST   | Add Task        | /api/lists/`:id`           | taskName, taskDescription | task added              |
| PUT    | Update Task     | /api/lists/`:id`/`:todoId` | taskName, taskDescription | task updated            |
| DELETE | Delete Task     | /api/lists/`:id`/`:todoId` |                           | Success or Fail Message |
| GET    | Read All Tasks  | /api/lists/`:id`/          |                           | Array with all tasks    |
| GET    | Read Task by id | /api/lists/`:id`/`:todoId` |                           | Task by id              |

Task Info

- taskName - required
- taskDescription - required
- sortField - optional
- date - auto generated (ex: 2020-04-28 12:52:20.927797-04)
- completed - defaults to false

# If you have any trouble please contact me
