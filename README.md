
# Task Tracker CLI 🚀  
A simple command-line interface (CLI) tool to track and manage your tasks efficiently. This lightweight task tracker allows you to add, update, delete, and manage tasks using a JSON file for storage—no external dependencies required!  

## Features ✨  
✅ Add, update, and delete tasks  
✅ Mark tasks as **todo**, **in-progress**, or **done**  
✅ List all tasks or filter by status  
✅ Stores tasks in a JSON file for persistence  
✅ Handles errors and edge cases gracefully  

## Usage 💻  

# Add a task
task-cli add "Buy groceries"

# Update a task
task-cli update 1 "Buy groceries and cook dinner"

# Mark as in progress or done
task-cli mark-in-progress 1
task-cli mark-done 1

# List tasks
task-cli list
task-cli list done
task-cli list in-progress


## Task Properties 📌  
Each task includes:  
- **id**: Unique identifier  
- **description**: Task details  
- **status**: `todo`, `in-progress`, or `done`  
- **createdAt**: Timestamp when the task was created  
- **updatedAt**: Timestamp when the task was last updated  

## Installation & Setup ⚡  
Clone the repo and run the script directly. No external dependencies required!  

