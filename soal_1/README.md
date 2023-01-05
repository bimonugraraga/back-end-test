## Setup
List of command to setup api
- `Change .env`
 - `npm i`
 - `Postman Using Authorization Bearer token`

## Run Server And Test
List of command
  - `npm start`

## Endpoints
List of available endpoints
  - `POST v1/user/register`
  - `POST v1/user/login`
  - `GET v1/user/jobs`
  - `GET v1/user/jobs/:id`

### 1. POST v1/user/register
  Description: Create User

  Request:
  - body
  ```json
    "username": "string",
    "password": "string"
  ```
### 2. POST v1/user/login
  Description: login

  Request:
  - body
  ```json
    "username": "string",
    "password": "string"
  ```

### 3. POST v1/user/jobs
  Description: get all jobs

  Request:
  - header
  ```json
    "authorization": "Bearer access_token"
  ```
  - query
    1. description
    2. full_time
    3. location
    4. page (default = 1)
    5. limit (default = 2)

### 3. POST v1/user/jobs/:id
  Description: get job

  Request:
  - header
  ```json
    "authorization": "Bearer access_token"
  ```
  - params
    1. id