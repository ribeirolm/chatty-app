import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
// import Message from './Message.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        currentUser: {name: 'Bob'}, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: []
      };
  }
  ws = new WebSocket('ws://0.0.0.0:3001');
  componentDidMount() {
    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected to server')
    }

    this.ws.onmessage = dataObject => {
      // on receiving a message, add it to the list of messages in the App state, thus triggering a re-render
      let returnedMessage = JSON.parse(dataObject.data);
      // console.log(message);
      const messages = this.state.messages.concat(returnedMessage);
      this.setState({messages: messages});
    }

    this.ws.onclose = () => {
      console.log('disconnected')
    }
  }

  addMessage = (content) => {
      // Send a new message to the websocket server to add a UUID 
    const newMessage = {username: this.state.currentUser.name, content: content};
    this.ws.send(JSON.stringify(newMessage));
  };

  updateUsername = (username) => {
    const newUsername = {name: username};
    this.setState({currentUser: newUsername});
    
  };  
  

  render() {
    return (
      <div>
      <MessageList messages={this.state.messages}/>
      <ChatBar name={this.state.currentUser.name} addMessage={this.addMessage} updateUsername={this.updateUsername}/>
      </div>
    );
  }
}
export default App;
