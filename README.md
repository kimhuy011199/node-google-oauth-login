# Node Express Login by Google OAuth 2.0

A simple web app to login using Google OAuth 2.0.

**Note:** This app focuses on describe the authorization code flow, not has the HTML template.

## Authorization Code Flow

The Authorization Code Flow involves the following steps:

1. The client application sends a request to the authorization server to start the authentication process.

2. The authorization server authenticates the end-user and asks for their consent to grant access to the client application.

3. If the end-user consents, the authorization server sends an authorization code to the client application.

4. The client application uses the authorization code, client id and client secret to request an access token from the authorization server.

5. The authorization server verifies the authorization code and issues an access token to the client application.

6. The client application can use the access token to access protected resources on behalf of the end-user.

## Usage

- Get source: `git clone https://github.com/kimhuy011199/node-google-oauth-login.git`
- Install depedencies: `npm i`
- Run app: `node index.js`
- Go to login endpoint: `http://localhost:5500/login`
- Enter credentials
- View user info in terminal
