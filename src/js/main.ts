const list = (<HTMLInputElement>document.getElementById('todoList'));
const newTask = (<HTMLInputElement>document.getElementById('newTask'));

/**
 * Create HTML list item of a task
 * @param {string} value  Task value to put into the list item.
 */
function createListItem(value:string) {
  let listItem = document.createElement('li');
  listItem.classList.add('task__item');

  let button = document.createElement('button');
  button.innerHTML = 'x';
  button.onclick = () => {
    removeTask(listItem);
  };

  let checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.onclick = () => {
    toggleTaskState(listItem);
  }

  let text = document.createElement('div');
  text.classList.add('task__text');
  text.innerHTML = value;

  listItem.appendChild(checkbox);
  listItem.appendChild(text);
  listItem.appendChild(button);

  return listItem;
}

/**
 * Add task to the task list
 */
function addTask() {
  if(newTask.value) {
    var listItem = createListItem(newTask.value);

    // We want to add the new item on the top of the list
    list.prepend(listItem);

    newTask.value = "";
    newTask.focus();
  }
}

/**
 * Remove task from the tasklist
 * @param {any} task  Task to remove from the list.
 */
function removeTask(task:any) {
  list.removeChild(task);
}

/**
 * Toggle the state of the task (done / not done)
 * @param {any} task  Task to toggle state.
 */
function toggleTaskState(task:any) {
  const className = 'task__item--done';
  // Toggle state based on the class
  task.classList.contains(className) ? task.classList.remove(className) : task.classList.add(className);
}

// Set the focus on the input bar when we enter the page
newTask.focus();

// Make sure the user can use their enter key to add a task
document.addEventListener('keypress', (event) => {
  const keyPressed = event.which || event.keyCode;

  if(keyPressed === 13) addTask();
});
