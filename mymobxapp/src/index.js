import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ToDoApp from './ToDoApp';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ToDoApp />, document.getElementById('root'));
registerServiceWorker();
