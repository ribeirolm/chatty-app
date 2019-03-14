Chatty App
=====================

Chatty App is a full stack web application that allows users to communicate with each other without having to register accounts.

## Final Product

Users can chat with multiple people.
!["Screenshot of Homepage with multi-user chat] (https://github.com/ribeirolm/chatty-app/blob/master/docs/multi-user-chat.png?raw=true)


Upon changing username, a notification message is sent to all users.
!["Screenshot of Homepage with multi-user chat] (https://github.com/ribeirolm/chatty-app/blob/master/docs/username-change.png?raw=true)


### Getting Started

Install the dependencies and start the web server.

```
npm install
npm start
```
Start the websocket server by navigating within the 
`chatty-server` folder and running the server using the `npm start` command.

Open http://localhost:3000 


### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
