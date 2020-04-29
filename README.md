# Wunderlist

## Endpoints

Base: https://lambdawunderlist.herokuapp.com/

### Auth Routes


| Method | Type     | Endpoint           | Send                                          | Returns                                              |
| ------ | -------- | ------------------ | --------------------------------------------- | ---------------------------------------------------- |
| POST   | Register | api/auth/register/ | JSON with "username", "email", and "password" | Message: `res.data`                                  |
| POST   | Login    | api/auth/login/    | JSON with "username", and "password"          | Message: `res.data.message`, Token: `res.data.token` |

Registration info:

| \\\\\\\\\\\\\\\   | Required | Type   |
| ----------------- | -------- | ------ |
| username (unique) | yes      | string |
| email (unique)    | yes      | string |
| password          | yes      | string |

## Restricted Routes

_Token must be sent to access_


USERS
| Method | Type             | Endpoint       | Send      | Returns                |
| ------ | ---------------- | -------------- | --------- | --------------------   |
| List   |                  | `:id` = userId |           |                        |
| GET    | Read All users   | /api/users/    |           | Array with all users   |
| PUT    | Update user info | /api/users/:id | password  | Message, userId, token |

TASKS
| Method | Type             | Endpoint                   | Send                                     | Returns                 |
| ------ | ---------------  | -------------------------- | ---------------------------------------- | ----------------------- |
| List   |                  | `:id` = userId             |                                          |                         |
| POST   | Add Task         | /api/lists/`:id`           | taskName, taskDescription                | task added              |
| PUT    | Update Task      | /api/lists/`:id`/`:todoId` | taskName, taskDescription, modifiedDate  | task updated            |
| DELETE | Delete Task      | /api/lists/`:id`/`:todoId` |                                          | Success or Fail Message |
| GET    | Read All Tasks   | /api/lists/                |                                          | Array with all tasks    |
| GET    | Read Task by id  | /api/lists/`:id`/          |                                          | Task by id              |


Task Info

- taskName - required
- taskDescription - required
- sortField - optional, defaults to 1
- creationDate - auto generated (ex: 2020-04-28 12:52:20.927797-04)
- modifiedDate - auto generated (ex: 2020-04-28 12:52:20.927797-04) - can be modified
- completed - defaults to false

# If you have any trouble please contact me
