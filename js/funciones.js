// Obtener referencia a los elementos del DOM
const taskForm = document.querySelector('form');
const taskList = document.querySelector('#taskList');

// Obtener animes almacenados en localStorage, o crear un array vacío si no hay ninguno
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Función para mostrar los animes en pantalla
function displayTasks() {
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    // Crear un elemento <li> para el anime
    const taskItem = document.createElement('li');

    // Agregar el texto del anime al <li>
    taskItem.innerText = task;

    // Crear un botón para eliminar el anime
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Eliminar';
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', () => {
      // Eliminar el anime del array
      tasks.splice(index, 1);

      // Actualizar los animes almacenadas en localStorage
      localStorage.setItem('tasks', JSON.stringify(tasks));

      // Volver a mostrar los animes en pantalla
      displayTasks();
    });

    // Agregar el botón al <li>
    taskItem.appendChild(deleteButton);

    // Agregar el <li> a la lista de animes
    taskList.appendChild(taskItem);
  });
}

// Mostrar los animes al cargar la página
displayTasks();

// Agregar un anime al enviar el formulario
taskForm.addEventListener('submit', event => {
  event.preventDefault();

  // Obtener el anime del input
  const taskInput = document.querySelector('#task');
  const newTask = taskInput.value;

  // Verificar si el anime ya existe en el array
  if (tasks.includes(newTask)) {
    const messageContainer = document.querySelector('#message-container');
    messageContainer.textContent = 'Anime ya agregado';
    messageContainer.style.display = 'block';
    setTimeout(() => {
      messageContainer.style.display = 'none';
    }, 3000);
    return;
  }

  // Agregar el anime al array
  tasks.push(newTask);

  // Actualizar los animes almacenadas en localStorage
  localStorage.setItem('tasks', JSON.stringify(tasks));

  // Mostrar los animes en pantalla
  displayTasks();

  // Limpiar el input
  taskInput.value = '';
});

