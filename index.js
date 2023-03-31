const express = require('express');
const axios = require('axios');
const querystring = require('node:querystring');

const app = express();
const port = 5500;

// Google configurations
const GOOGLE_CLIENT_ID = '';
const GOOGLE_CLIENT_SECRET = '';
const GOOGLE_CALLBACK_URL = '';
const AUTHORIZATION_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const TOKEN_URL = 'https://www.googleapis.com/oauth2/v4/token';
const USER_PROFILE_URL = 'https://www.googleapis.com/oauth2/v3/userinfo';

// Generate a Google OAuth login URL
app.get('/login', function (req, res, next) {
  const query = {
    response_type: 'code',
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: GOOGLE_CALLBACK_URL,
    scope: 'profile email',
    prompt: 'consent',
  };
  const queryStringified = querystring.stringify(query);
  const loginURL = `${AUTHORIZATION_URL}?${queryStringified}`;

  res.redirect(loginURL);
});

app.get('/callback', async function (req, res, next) {
  try {
    // Exchange authorization code with access token
    const query = {
      code: req.query.code,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: GOOGLE_CALLBACK_URL,
      grant_type: 'authorization_code',
    };
    const queryStringified = querystring.stringify(query);
    const tokenURL = `${TOKEN_URL}?${queryStringified}`;

    const tokenResponse = await axios.post(
      tokenURL,
      {},
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    const tokenData = tokenResponse.data;

    // Request user data with access token
    const userResponse = await axios.get(USER_PROFILE_URL, {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });
    const userData = userResponse.data;
    console.log(userData);

    // Redirect to homepage or do something with user data
    res.redirect('/');
  } catch (err) {
    console.log({ err });
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
