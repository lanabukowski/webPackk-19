import {
    TASK,
    ToDoAppState
} from './ToDoAppState';

export class ToDoAppController {
    constructor(el) {
        this.container = el;
        this.state = new ToDoAppState();
        this.handleListClick = this.handleListClick.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.initDOMElements();
        this.subscribeForEvents();
    }
    initDOMElements() {
        this.form = this.container.querySelector('.todo-form');
        this.button = this.container.querySelector('.todo-form-btn');
        this.input = this.container.querySelector('.todo-form-input');
        this.list = this.container.querySelector('.tasksBoard .list');
    }
    subscribeForEvents() {
        this.list.addEventListener('click', this.handleListClick);
        this.form.addEventListener('submit', this.handleFormSubmit);
    }
    handleListClick(e) {
        let id;
        if (e.target.className == 'item') {
            id = e.target.getAttribute('data-id');
        } else {
            id = e.target.parentNode.getAttribute('data-id');
        }
        if (e.target.className == 'delete') {
            this.state.deleteTask(id);
        } else {
            this.state.tickTask(id);
        }
        this.render();
    }
    handleFormSubmit(e) {
        e.preventDefault();
        if (this.input.value != '') {
            this.state.addTask(this.input.value);
        }
        this.input.value = '';
        this.render();
    }

    render() {
        if (this.state.tasks.length) {
            this.list.parentNode.style.display = 'block';
        } else {
            this.list.parentNode.style.display = 'none';
        }
        const tasks = this.state.getTasks();
        let i = 0;
        const html = tasks.reduce((acc, task) => {
            return acc + `
            <li class="item" data-id="${i++}">
              <input type="checkbox" ${task.done ? 'checked' : ''}><label class="${task.done ? 'tick' : ''}">${task.name}</label><span class="delete">×</span>
            </li>
          `;
        }, '');
        this.list.innerHTML = html;
    }
}