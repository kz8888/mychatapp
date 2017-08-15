import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms'
import * as io from "socket.io-client";
import uuidv1 from 'uuid/v1';

@Component({
  selector: 'ChatComponent',
  templateUrl: './chat.component.html'
})

export class ChatComponent implements OnInit {
    messages = [];
    
    socket = io('mychatapp-kz8888.c9users.io:8082');
    
    constructor(){}
    
    ngOnInit() {
      console.log('ngOnInit');
      this.socket.on('new-message', function (newMessage) {
          this.messages.push(newMessage);
      }.bind(this));
    }
    
    onSubmit(f: NgForm){
      console.log('f: ' + f.value.author );
      let newMessage = {
        id: uuidv1(),
        timestamp: new Date().toISOString(),
        author: f.value.author,
        text: f.value.text
      };
      this.socket.emit("new-message", newMessage);
    }
}

