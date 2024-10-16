const $form=document.getElementsByTagName("form")[0]

$form.addEventListener("submit",function(event){
    event.preventDefault()
    const email=event.target.email.value
    const password=event.target.password.value
    axios.post("http://localhost:8000/login",{email,password})
    .then(res=>{console.log(res)
        localStorage.setItem("token", res.data)
        document.location.pathname="index.html"
    })
    .catch(e=>console.log(e))



})