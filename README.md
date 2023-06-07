# LoginSignup

This is a simple Express.js API for user authentication. It allows users to sign up and log in using their credentials, and provides a token-based authentication mechanism.

## Prerequisites

Before running the application, make sure you have the following dependencies installed:

- Node.js
- npm (Node Package Manager)
- MySQL

## Installation

1. Clone the repository:
```
git clone https://github.com/RitikPant/LoginSignup.git
```

2. Navigate to the project directory:
```
cd LoginSignup
```

3. Install the dependencies:
```
npm install
```

4. Set up the database:

- Create a MySQL database named "info".
- Configure the database connection details in the code (`app.js`), such as the host, username, password, and database name.

5. Start the application:
```
node index.js
```

6. Access the API endpoints:

- To sign up a user, use the following endpoint:

  ```
  GET /signup/:name/:username/:pwd
  ```

- To log in a user, use the following endpoint:

  ```
  GET /login/:username/:pwd
  ```

Replace `:name`, `:username`, and `:pwd` with the respective values.

## Usage

- Sign Up: Send a GET request to the sign-up endpoint with the user's name, username, and password. The API will create a new user record in the database and return an access token.

- Log In: Send a GET request to the login endpoint with the user's username and password. The API will validate the credentials, generate an access token, and return the user information along with the access token.

**Note:** This is a simplified example for educational purposes. In a production environment, it's recommended to use more secure methods for storing and transmitting passwords, such as hashing and encryption.
