export const TASK = (taskName) => ({
    name: taskName,
    done: false,
    changeStatus() {
        this.done = !this.done;
    }
});

export class ToDoAppState {
    constructor() {
        this.tasks = [];
    }
    addTask(taskName) {
        let taskObject = TASK(taskName);
        this.tasks.push(taskObject);
    }
    deleteTask(taskIndex) {
        this.tasks.splice(taskIndex, 1);
    }
    tickTask(taskIndex) {
        this.tasks[taskIndex].changeStatus();
    }
    getTasks() {
        return this.tasks;
    }
}