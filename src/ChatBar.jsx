import React, {Component} from 'react';

class ChatBar extends Component {

  onEnterMessage = (event) => {
    if(event.key === 'Enter'){
      this.props.addMessage(event.target.value);
    }
  }

  onEnterUsername = (event) => {
    if(event.key === 'Enter'){
      this.props.updateUsername(event.target.value);
    }
  }

  render(){
    return (
      <footer className="chatbar">
      <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.name} onKeyPress={this.onEnterUsername}/>
      <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.onEnterMessage}/>
</footer>
    );
  }  
  
}
export default ChatBar;
