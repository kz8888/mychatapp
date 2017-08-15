import React from 'react';
import io from "socket.io-client";
import uuidv1 from 'uuid/v1';

let socket = io('https://localhost:8082');

const MessageView = (({message}) =>
    <li>({message.timestamp}) <strong>{message.author}: </strong>{message.text}</li>
    )

class Chat extends React.Component {
    constructor() {
        super();
        this.state = {
            messages: []
        };
        this.handleSubmit.bind(this);
    }
    componentDidMount() {  
        var self = this;
        socket.on('new-message', msg => {
            var messages = self.state.messages;
            messages.push(msg);
            self.setState({ messages: messages });
        });
    };
    handleSubmit( e ) {
        e.preventDefault();
        let newMessage = {
            id: uuidv1(),
            timestamp: new Date().toISOString(),
            author: this.authorInput.value,
            text: this.messageInput.value
        }; 
        socket.emit('new-message', newMessage )
        this.setState({ messages: [ ...this.state.messages, newMessage ] });
        //this.authorInput.value = '';
        this.messageInput.value = ''; 
    }  

    render() {
        return (
        <div>
            <ul>
                {this.state.messages.map(message => <MessageView key = {message.id} message = {message} />)}
            </ul>
            <form onSubmit={this.handleSubmit.bind(this)}>
                <input type="text" ref={author => this.authorInput = author} placeholder="author" />
                <input type="text" ref={text => this.messageInput = text} placeholder="text" />
                <input type="submit" value="Post Message" />
            </form>
        </div>
        );
    }
}

export default Chat;