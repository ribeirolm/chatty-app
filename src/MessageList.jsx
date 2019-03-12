import React, {Component} from 'react';
import Message from './Message.jsx';



class MessageList extends Component {
  
  render(){
    const messages = this.props.messages;
    const listMessages = messages.map((message, index) => {
      return <Message key={`${message.username}_${index}`} username={message.username} content={message.content}/>
    });
    return <main className="messages">{listMessages}</main>
  }

}



export default MessageList;