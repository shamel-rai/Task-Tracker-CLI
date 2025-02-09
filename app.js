const fs = require("fs");
const { argv, exit } = require("process");

const command = argv[2];
const argument = argv[3];
const newDesc = argv[4];

if (!command) {
    console.log("Please provide a command.");
    exit(1);
}

if (!fs.existsSync("task.json")) {
    fs.writeFileSync("task.json", "[]", "utf-8");
}

const getTask = () => {
    const data = fs.readFileSync("task.json", "utf-8");
    return JSON.parse(data);
};

const saveTask = (tasks) => {
    fs.writeFileSync("task.json", JSON.stringify(tasks, null, 2), "utf-8")
}

const addTask = (desc) => {
    if (!desc) {
        console.log("Please provide a description for the task");
        return;
    }

    const tasks = getTask();
    const newTask = {
        id: tasks.length + 1,
        description: desc,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    tasks.push(newTask);
    saveTask(tasks)

    console.log("Task Added");
};


const deleteTask = (id) => {
    id = Number(id); // Convert id to a number
    if (isNaN(id)) {
        console.log("Invalid ID");
        return;
    }

    if (!fs.existsSync("task.json")) {
        console.log("File does not exist");
        return;
    }

    const tasks = getTask();
    const delTask = tasks.filter((task) => task.id !== id);

    if (tasks.length === delTask.length) {  // FIXED: Checking correctly
        console.log("Task not found");
        return;
    }

    saveTask(tasks)

    console.log("Task deleted");
};

const updateTask = (id, newDesc) => {
    id = Number(id);
    if (isNaN(id)) {
        console.log("Invalid id")
        return
    }

    if (!fs.existsSync("todo.json")) {
        console.log("File does not exists");
        return
    }

    const tasks = getTask();
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
        console.log("Task not found ")
        return
    }

    tasks[taskIndex].description = newDescl
    tasks[taskIndex].updatedAt = new Date().toISOString();

    saveTask(tasks)
    console.log("Task updated successfully")

}


const markTaskStatus = (id, status) => {
    id = Number(id);
    if (isNaN(id)) {
        console.log("Invalid id")
        return
    }

    const validStatus = ["not done", "in progess", "done"];
    if (!validStatus.includes(status.toLowerCase())) {
        console.log("Invalid status");
        return
    }
    const tasks = getTask();
    const index = tasks.findIndex(task => task.id === id);
    if (index === -1) {
        console.log("No task found")
        return
    }

    tasks[index].status = status.toLowerCase();
    tasks[index].updatedAt = new Date().toISOString();

    saveTask(tasks);
    console.log("Task status updated successfully")

}

const taskList = () => {
    const tasks = getTasks();
    if (!tasks.length) {
        console.log("No task found")
        return
    }

    console.log("All tasks")
    tasks.forEach(task => console.log(task))
}

const listTasksByStatus = (status) => {
    const tasks = getTask();
    const filteredTasks = tasks.filter(task => task.status === status);
    if (!filteredTasks.length) {
        console.log("There is no task")
        return
    }
    console.log("Task with status; ", status)
    filteredTasks.forEach(task => console.log(task))
}

const handleTask = (command, argument) => {
    switch (command) {
        case "add":
            addTask(argument);
            break;
        case "list":
            console.log(getTask());
            break;
        case "delete":
            deleteTask(argument);
            break;
        case "update":
            updateTask(argument, newDesc)
            break;
        case "mark":
            markTaskStatus(argument, newDesc);
            break;
        case "list-done":
            listTasksByStatus("done");
            break;
        case "list-inprogress":
            listTasksByStatus("in progress");
            break;
        case "list-notdone":
            listTasksByStatus("not-done");
            break;
        default:
            console.log("Unknown command. Use 'add' or 'list'.");
    }
};

handleTask(command, argument, newDesc);
