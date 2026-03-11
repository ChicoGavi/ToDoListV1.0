function pageLoad() {
    const formUser = document.querySelector('#form');
    const tableUser = document.querySelector('#task-list');
    const inputContainer = document.querySelector('#task-input');
    const botonToggle = document.querySelector('.btn-icon');
    let idNum = 0;
    loadStorage();
    
    formUser.addEventListener('submit', (event) => {
        event.preventDefault(); // Avoid  and prevent default behavior
        
        const task = inputContainer.value;

        if(task){
            idNum++
            tableUser.append(createTaskElement(task));
            storeDataInLocalStorage(task);
            inputContainer.value = '';
        }
    })


    tableUser.addEventListener('click', (event) => {
        if(event.target.classList.contains('fa-trash')){
            deleteItem(event.target.closest('tr'));
        } else if(event.target.classList.contains('fa-pencil-alt')){
            editTask(event.target.closest('tr'));
        }
    })

    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'light'){
        document.body.classList.add('btn-toggle');
    }
    
    toggleMode();
    

    function createTaskElement(task){
        const elementCreate = document.createElement("tr");

        elementCreate.innerHTML += `<td></td>
                <td></td>
                <td class="actions">
                    <button class="edit-btn"><i class="fas fa-pencil-alt"></i></button>
                    <button class="delete-btn"><i class="fas fa-trash"></i></button>
                </td>`

        elementCreate.firstElementChild.textContent = `${idNum}`;
        elementCreate.children[1].textContent = `${task}`;
        return elementCreate;
    }

    function deleteItem(itemDelete){
        let dataDelete = itemDelete.children[1].textContent;
        if(confirm('Are you sure to delete the task?')){
            deleteLocalStorageElement(dataDelete);
            itemDelete.remove();
        }
    }

    function editTask(parentTask) {
        const newTask = prompt('Edit your current task: ', parentTask.children[1].textContent);
        if(newTask !== null){
            parentTask.children[1].textContent = newTask;
            updateLocalStorage();
        }
    }


    function storeDataInLocalStorage(task){
        const tasks = JSON.parse(localStorage.getItem('tasks') || "[]");
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    function loadStorage(){
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.forEach((taskElement) => {
            idNum++
            tableUser.append(createTaskElement(taskElement));
        })
    }
    
    function deleteLocalStorageElement(itemToDelete){
        let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.forEach( taskElement => { 
            if(taskElement === itemToDelete){
                tasks = tasks.filter((element) => {
                    return element !== itemToDelete;
                })
            }
        })
        
        localStorage.setItem('tasks', JSON.stringify(tasks) );
    }
    
    function updateLocalStorage(){
        const tasks = Array.from(tableUser.querySelectorAll('tr')).map((td) => {
            return td.children[1].textContent;
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    function toggleMode(){
        botonToggle.addEventListener('click', () =>{
            document.body.classList.toggle('btn-toggle');
            
            const theme = document.body.classList.contains('btn-toggle') ? "light" : "dark" ;
            localStorage.setItem('theme', theme);
        })
    }
    



}

window.addEventListener('DOMContentLoaded', pageLoad);