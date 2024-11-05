let form = document.querySelector("#form");
let button = document.querySelector(".delete-todo-button");
let ul = document.querySelector(".todos")


let todoItem = {}
let todo = []

form.addEventListener("submit", (event) => {
    event.preventDefault();
    // console.log(event.target.todoName.value);
    todoItem = {
        id: Date.now(),
        todoValue: event.target.todoName.value
    }

    if (event.target.todoName.value === '') {
        alert("Please Enter Your Todo")
    }else {

        todo.push(todoItem)
    
    
        localStorage.setItem("todoList", JSON.stringify(todo))
        
        
    
        location.href = window.location.href
    }
});


if (localStorage.length > 0) {
    let todoData = [...JSON.parse(localStorage.getItem("todoList"))]
    todo = [...todoData]

}

todo.forEach((todos) => {
    ul.innerHTML +=`      <li class="todo " >
        <input type="text" id="inp" value="${todos.todoValue}" readonly >
        <div class="toggle-delete">
          <input type="checkbox" name="complated" class="todo-checked">
          <button class="edit-todo-button" onclick="editTodo(this)"><i class="fa-solid fa-pen-to-square"></i></button>
          <button class="delete-todo-button" id='${todos.id}'><i class="fa-solid fa-trash"></i></button>
        </div>
      </li>
      `

      let ulButtons = ul.querySelectorAll("li .toggle-delete .delete-todo-button");



      Array.from(ulButtons).forEach((buttons) => {
        buttons.addEventListener("click", (event) => {

            console.log(event.target);
            
            
            let id = (Number(event.target.getAttribute("id")))
            // console.log(event.target);
            let deleteTodo = todo.filter((todos) =>  todos.id !== id)

            // localStorage.removeItem("todoList", helo)

            todo = [...deleteTodo]

            
            localStorage.setItem("todoList", JSON.stringify(todo))
            
            location.href = window.location.href; 
            
        });
    });


    let ulcheckBox = ul.querySelectorAll("li .toggle-delete .todo-checked");
    
    Array.from(ulcheckBox).forEach((check, index) => {
        check.addEventListener("click", () => {
            if (check.checked) {
                ul.querySelectorAll("li")[index].classList.add("completed")
                ul.querySelectorAll("li")[index].children[1].children[1].classList.add("disable");
                ul.querySelectorAll("li")[index].children[1].children[2].classList.add("disable");


                
            }else {
                ul.querySelectorAll("li")[index].classList.remove("completed");
                ul.querySelectorAll("li")[index].children[1].children[1].classList.remove("disable");
                ul.querySelectorAll("li")[index].children[1].children[2].classList.remove("disable");
            }
        })

    });
    
});


const editTodo = (event) => {
    let editInput = event.parentNode.parentNode.firstElementChild;
    let chcekBoxEdit = event.previousElementSibling;
    let deleteButtonEdit = event.nextElementSibling;

    console.log(chcekBoxEdit);
    

    if (editInput.readOnly) {
        chcekBoxEdit.classList.add("disable")
        deleteButtonEdit.classList.add("disable")
        editInput.removeAttribute("readOnly");
        editInput.focus();
    }else {
        editInput.setAttribute("readOnly", "")
        chcekBoxEdit.classList.remove("disable")
        deleteButtonEdit.classList.remove("disable")
    }
    
    
};











