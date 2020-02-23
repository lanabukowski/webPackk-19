import '../styles/index.scss';

import {
    ToDoAppController
} from './ToDoAppController';


let mainApp = document.querySelectorAll(".todo-app");
mainApp.forEach(function (item) {
    const controller = new ToDoAppController(item);
});