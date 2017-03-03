class TaskList {

    constructor()
    {
        this.inputField= document.getElementById('task-input');
        this.addButton = document.getElementById('add-task');
        this.tasks = [];
        this.addButton.addEventListener('click', () => this.addNewTask())
    }

    addNewTask()
    {
        const newTask = this.inputField.value;

        if (newTask)
        {
            this.tasks.push(newTask)
            this.inputField.value = '';
        }


    }




}




window.addEventListener('load', ()=> new TaskList())