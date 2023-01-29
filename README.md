# API Testing using SuperTest

Implementation of API testing using SuperTest tutorial from [Hackernoon](https://hackernoon.com/api-testing-using-supertest-1f830ce838f1)

## Installation

First, clone the repository with the 'clone' command, or just download the zip.

    git clone https://github.com/abenteuerzeit/SuperTests.git

Then, install the project dependencies.

    npm install

## Users Database

The users database is generated in the `db.js` file. This file is used by the server to generate the database. It contains a list of users with their name, email and password, and other information.

Every time the server is restarted, the database is regenerated with different users and dummy data.

The users databse is tested using Chai and Mocha in the `test` folder.
To run all the tests, use the following command:

    npm test

To run the tests for the users database, use the following command:

    npm run test-db

To run the tests for the API endpoints, use the following command:

    npm run test-api

## Running the Server

To run the server, use the following command:

    npm start

The server will be running on port 3000.

## API Endpoints

The API endpoints are listed below.

### GET /users

Returns a list of all users. You can navigate through the pages using the `page` query parameter.

    curl http://localhost:3000/users

or enter the following URL in your browser:

    http://localhost:3000/users
