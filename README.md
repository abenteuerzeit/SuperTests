# API Testing using SuperTest

Implementation of API testing using SuperTest tutorial from [Hackernoon](https://hackernoon.com/api-testing-using-supertest-1f830ce838f1)

## Installation

First, clone the repository with the 'clone' command, or just download the zip.

    ```bash
    $ git clone https://github.com/abenteuerzeit/SuperTests.git
    ```

Then, install the project dependencies.

    ```bash
    $ npm install
    ```

## Users Database

The users database is a simple JSON file located in the `data` folder. It contains a list of users with their name, email and password, and other information.

Every time the server is restarted, the database is regenerated with different users and dummy data.

The users databse is tested using Chai and Mocha in the `test` folder.
To run the tests, use the following command:

    ```bash
    $ npm test
    ```

## Running the Server

To run the server, use the following command:

    ```bash
    $ npm start
    ```

The server will be running on port 3000.

## API Endpoints

The API endpoints are listed below.

### GET /users

Returns a list of all users. You can navigate through the pages using the `page` query parameter.

    ```bash
    $ curl http://localhost:3000/users
    ```

or enter the following URL in your browser:

    ```bash
    http://localhost:3000/users
    ```

