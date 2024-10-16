if(!localStorage.getItem('token')) document.location.pathname='/login.html'
const $containertodos=document.getElementsByClassName("containertodos")[0]

fetch("http://localhost:8000/todos",{headers:{authorization:localStorage.getItem("token")}})
.then(res=>(res.json()))
.then(res=>{
    res.forEach(todo=>{
        const div=document.createElement("div")
        div.className="box"
        const h2=document.createElement("h2")
        h2.innerHTML=todo.task
        const button=document.createElement("button")
        button.innerHTML="update"
        div.appendChild(h2)
        div.appendChild(button)
        $containertodos.appendChild(div)
    })
})

function logout(){
    localStorage.removeItem('token')
    location.reload()
}