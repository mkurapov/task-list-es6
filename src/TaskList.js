import TaskItem from './TaskItem';
import * as helpers from './Helpers';


export default class TaskList {

    constructor()
    {
        this.inputField= document.getElementById('task-input');
        this.addButton = document.getElementById('add-task');
        this.tasksElem = document.getElementById('tasks');
        this.tasks = JSON.parse(localStorage.getItem('userTasks')) || [];

        this.displayTasks()
        this.initializeEventListeners()

    }

    initializeEventListeners()
    {
        this.tasksElem.addEventListener('click', (event) => {
            const taskId = event.target.parentNode.getAttribute('data-id');

            switch (event.target.className) {
                case 'remove-button':
                    this.removeTask(taskId);
                    break;
                case 'task-toggle':
                    this.toggleCompleted(taskId);
                    break;
                default:
            }
        })


        this.addButton.addEventListener('click', this.addNewTask.bind(this))
    }

    addNewTask()
    {
        const newTaskTitle = this.inputField.value.trim();

        if (newTaskTitle)
        {
            let newTaskID = helpers.getRandomId().toString(); //still need to check if id exists
            const newTask = new TaskItem(newTaskID, helpers.htmlEscape(newTaskTitle))
            this.tasks.push(newTask)
            this.inputField.value = '';
            this.saveTasks()
            this.displayTasks()
        }
    }

    removeTask(idToRemove)
    {
        this.tasks = this.tasks.filter((task) => {
            return task.id !== idToRemove
        });

        this.saveTasks()
        this.displayTasks()
    }


    toggleCompleted(idToToggle)
    {
        this.tasks.forEach((task)=>{
            if (task.id === idToToggle) {
                task.completed = !task.completed;
            }
        })

        this.saveTasks()
        this.displayTasks()
    }

    saveTasks()
    {
        localStorage.setItem('userTasks',JSON.stringify(this.tasks));
    }


    displayTasks()
    {
        this.tasksElem.innerHTML = this.tasks.reduce((acc, task) => {
            return acc + this.returnTaskTemplate(task)
        },'');
    }


    returnTaskTemplate(task)
    {
        return `<li class="${task.completed ? 'completed' : ''}" data-id="${task.id}">
                   <input class="task-toggle" type="checkbox" ${task.completed ? 'checked' : ''}>
                   <label class="task-title">${task.title}</label>
                   <button class="remove-button">Remove</button>
                </li>`;
    }






}




