import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
// import Message from './Message.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        currentUser: {name: 'Bob'}, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: [
          {
            username: 'Bob',
            content: 'Has anyone seen my marbles?',
          },
          {
            username: 'Anonymous',
            content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
          }
        ]
      }
  }

  addMessage = (content) => {
      // Add a new message to the list of messages in the data store
    const newMessage = {username: this.state.currentUser.name, content: content};
    const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
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
