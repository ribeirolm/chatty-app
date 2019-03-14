import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        currentUser: {name: 'Bob'},
        messages: [],
        totalUsers: 0,
      };
  }
  ws = new WebSocket('ws://0.0.0.0:3001');
  componentDidMount() {
    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected to server')
    }

    this.ws.onmessage = data => {
      const returnedMessage = JSON.parse(data.data);
          // on receiving a message, add it to the list of messages in the App state, thus triggering a re-render
      if(returnedMessage.type === 'incomingNotification' || returnedMessage.type === 'incomingMessage'){
      const messages = this.state.messages.concat(returnedMessage);
      this.setState({messages: messages});
      } else {
        this.setState({totalUsers: returnedMessage})
      }
    }

    this.ws.onclose = () => {
      console.log('disconnected')
    }
  }

  addMessage = (content) => {
    // Send a new message to the websocket server to add a UUID and broadcast to every client
    const newMessage = {type: 'postMessage', username: this.state.currentUser.name, content: content};
    this.ws.send(JSON.stringify(newMessage));
  };

  updateUsername = (username) => {
    // Send a new message to the websocket server to add a type and broadcast to every client
    const newUsername = {name: username};
    const userNameNotification = {type: 'postNotification', content: `${this.state.currentUser.name} has changed their name to ${username}`}
    this.ws.send(JSON.stringify(userNameNotification));
    // Update the currentUser state
    this.setState({currentUser: newUsername});
    
  };  

  render() {
    return (
      <div>
        <NavBar totalUsers={this.state.totalUsers}/>
        <div>
          <MessageList messages={this.state.messages}/>
          <ChatBar name={this.state.currentUser.name} addMessage={this.addMessage} updateUsername={this.updateUsername}/>
        </div>
      </div>
      
    );
  }
}
export default App;
