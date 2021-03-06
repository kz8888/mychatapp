import { Component, OnInit } from '@angular/core';
import * as io from "socket.io-client";
import uuidv1 from 'uuid/v1';

@Component({
  selector: 'ChatComponent',
  templateUrl: './chat.component.html'
})

export class ChatComponent implements OnInit {
    messages = [];
    
    socket = io('localhost:8082');
    
    constructor(){}
    
    ngOnInit() {
      console.log('ngOnInit');
      this.socket.on('new-message', function (newMessage) {
          this.messages.push(newMessage);
      }.bind(this));
    }
    
    postMessage(author,text){
      console.log('author: ' + author.value );
      console.log('text: ' + text.value );
      let newMessage = {
        id: uuidv1(),
        timestamp: new Date().toISOString(),
        author: author.value,
        text: text.value
      };
      text.value = '';
      this.socket.emit("new-message", newMessage);
    }
}