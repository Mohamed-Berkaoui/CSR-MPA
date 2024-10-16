const $addtodo=document.getElementById("add-todo-form")

$addtodo.addEventListener("submit",function(event){
    event.preventDefault()

    const task=event.target.todo.value

    fetch("http://localhost:8000/todo/add",{method: "POST",
       headers: { authorization:localStorage.getItem("token"), Accept: "application/json", "Content-Type": "application/json"},
      body: JSON.stringify({task:task})}
    )
    .then((res) => res.json())
    .then((json) => document.location.reload())
    .catch(e=>console.log(e.message))

})