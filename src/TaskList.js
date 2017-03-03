import TaskItem from './TaskItem';

export default class TaskList {

    constructor()
    {
        this.inputField= document.getElementById('task-input');
        this.addButton = document.getElementById('add-task');
        this.tasksElem = document.getElementById('tasks');

        this.tasks = JSON.parse(localStorage.getItem('userTasks')) || [];
        this.addButton.addEventListener('click', () => this.addNewTask())
        console.log(this);
         
    }

    addNewTask()
    {
        const newTaskTitle = this.inputField.value;

        if (newTaskTitle)
        {
            const newTask = new TaskItem(this.tasks.length, newTaskTitle)
            this.tasks.push(newTask)
            this.inputField.value = '';
            localStorage.setItem('userTasks',JSON.stringify(this.tasks));
            this.displayTasks()
        }
    }
    
    displayTasks()
    {
        console.log(this.tasks);
    }




}




