const apiBaseUrl = 'http://localhost:3000';  // URL da API

async function fetchTasks() {
  const response = await fetch(`${apiBaseUrl}/tasks`);
  const tasks = await response.json();
  return tasks;
}

async function addTask(event) {
  event.preventDefault();
  const form = document.querySelector('#taskForm');
  const formData = new FormData(form);

  const taskTitle = formData.get('title');
  const taskDescription = formData.get('description');

  const response = await fetch(`${apiBaseUrl}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title: taskTitle, description: taskDescription }),
  });

  if (response.ok) {
    const task = await response.json();
    appendTaskToDOM(task);
    form.reset();
  }
}

function appendTaskToDOM(task) {
  const taskList = document.querySelector('#taskList');
  const li = document.createElement('li');

  li.id = task.id;
  li.innerHTML = `
    <h2>${task.title}</h2>
    <p>${task.description}</p>
    <button class="edit-button" onclick="openEditDialog(${task.id})" title="Editar Tarefa">✏️</button>
    <button class="delete-button" onclick="deleteTask(${task.id})" title="Excluir Tarefa">❌</button>
  `;

  taskList.appendChild(li);
}

async function openEditDialog(taskId) {
  const response = await fetch(`${apiBaseUrl}/tasks/${taskId}`);
  const task = await response.json();

  const editDialog = document.createElement('dialog');
  editDialog.innerHTML = `
    <form id="editForm">
      <input type="text" name="editTitle" id="editTitle" value="${task.title}" required placeholder="Informe o título da tarefa" />
      <textarea id="editDescription" name="editDescription" required placeholder="Informe a descrição da tarefa">${task.description}</textarea>
      <button type="submit">Editar</button>
      <button type="button" onclick="closeEditDialog()">Cancelar</button>
      <button type="button" onclick="deleteTask(${taskId})" title="Excluir Tarefa">Excluir</button>
    </form>
  `;
  document.body.appendChild(editDialog);

  editDialog.showModal();

  editDialog.querySelector('#editForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const editedTitle = formData.get('editTitle');
    const editedDescription = formData.get('editDescription');

    const response = await fetch(`${apiBaseUrl}/tasks/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: editedTitle, description: editedDescription }),
    });

    if (response.ok) {
      const updatedTask = await response.json();
      updateTaskInDOM(updatedTask);
      editDialog.close();
    }
  });
}

function updateTaskInDOM(updatedTask) {
  const taskElement = document.getElementById(updatedTask.id);
  taskElement.querySelector('h2').textContent = updatedTask.title;
  taskElement.querySelector('p').textContent = updatedTask.description;
}

function closeEditDialog() {
  const editDialog = document.querySelector('dialog');
  editDialog.close();
  editDialog.remove();
}

async function deleteTask(taskId) {
  const response = await fetch(`${apiBaseUrl}/tasks/${taskId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    const taskElement = document.getElementById(taskId);
    taskElement.remove();
  }
}

async function filterTasks(event) {
  event.preventDefault();
  const filterInput = document.querySelector('#filterTitle');
  const filterTitle = filterInput.value.toLowerCase();

  const tasks = await fetchTasks();
  const filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(filterTitle));

  const taskList = document.querySelector('#taskList');
  taskList.innerHTML = '';
  filteredTasks.forEach(task => appendTaskToDOM(task));
}

window.addEventListener('DOMContentLoaded', async () => {
  const tasks = await fetchTasks();
  tasks.forEach(task => appendTaskToDOM(task));
});
