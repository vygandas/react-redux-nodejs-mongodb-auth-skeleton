# React Redux NodeJs skeleton boilerplate project with user authentication and registration

Skeleton boilerplate project with user authentication for fast
launching new projects with React, Redux, NodeJs, MongoDB.

Authentication uses JsonWebTokens (JWT).

Features:

* Sign In
* Sign Up
* Sign Out
* Protect routes
* Save token to local storage
* Send requests with auth token
* Keep sign in status after refresh
* Prevent unauthorized access to server data
* CORS

## Structure

This project contains both backend and frontend parts. They are separated
as different projects and can be ran separately.

Client project uses React and Redux for UI.

Server project uses NodeJs with Mongo. You can change database driver to any
you want of course.

I have tried to comment each part of code to make it clear what part does what.

## Installation

Guess what... git clone or download this as zip :)

```
git clone https://github.com/vygandas/react-redux-nodejs-mongodb-auth-skeleton.git project-name
cd project-name
```

### Launching Server

```
cd server
npm install
npm run dev
```

Will listen on http://localhost:3090

### Launching Client

```
cd client
npm install
npm run build
npm start
```

Will listen on http://localhost:8080

*npm run build* - collects all sass stuff and places into one file.