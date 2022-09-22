# Express Authentication Server Using Typescript
This is an example of how a project may be designed. This should not be used in a production environment.

---


## Getting Started
To get the Node server running locally:
- Clone this repo to your local machine
- Run `npm install` to install a dependencies
- Install MongoDB Community Edition ([instructions][1]) and run by executing monod
- Run `npm run dev start` to start the local server

To run unit and integration tests:
- Run `npm run test`

---

## Application Structure
- `index.js` - The entry point to the application. This file defines our express server and connects it to Mongo using mongoose. It also imports all routes and initializes our error handling.

- `tests/` - All unit and integration testing to be run will be located in this directory.

- `src/config/` - This directory contains configurations for Mongo and server logging.

- `src/constansts/` - Contains static classs defining human readable messages.

- `src/controllers/` - Routing controls will be located in this directory.

- `src/interfaces/` - Any custom interfaces that will be use are located here. Any additional interfaces created should also be placed in this directory.

- `src/middlewares/` - The directory where middleware methods *(such as to authenticat a user, generate a token or handle errors)* are located.

- `src/models/` - All Mongo models will be located here.

- `src/routes/` - This directory contains an index.ts file that manages all the route classes and provides these to the application.

- `src/services/` - Services for route controllers and any global service that may be required.

- `src/utils/` - Helpers, formatters and global generic functions.

- `src/validators/` - Any custom validation classes or methods should be placed here.

---
## Server and Request Logs

The server logs can be found at `./logs/server/`. 
The request logs can be found at `./logs/requests/`

---
## Error Handling
In `middlewares/error.middleware.ts`, we define a error-handling middleware for handling Mongoose's ValidationError. This middleware will respond with a status code and formats the response to have error codes and messages the clients can understand. An example would be:
```
{
    code: 409,
    message: 'The provided email address could not be found.'
}
```
---
## Authentication
Requests are authenticated using the `Authorization` header with a valid JWT. We define middleware in `middelwares/auth.middleware.ts` that can be used to authenticate requests. The required middleware configures `userAuth` middleware using our application's secret *(production environments should implement certificates and keys)* and will return a 401 status code if the request cannot be authenticated.

[1]: https://docs.mongodb.com/manual/installation/#tutorials