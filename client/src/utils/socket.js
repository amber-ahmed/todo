import { io } from "socket.io-client";
const socket = io('/')
function addTodo(msg){
    socket.emit('todo-added',localStorage.getItem('id'),msg)
}
function getAddTodo(reload,setReload){
    socket.on('add' + localStorage.getItem('id'),(msg)=>{
        console.log(msg)
        alert(msg)
        // setReload(!reload)
        window.location.reload();
    })
}
function deleteTodo(){
    socket.emit('todo-deleted',localStorage.getItem('id'))
}
function getDeleteTodo(reload,setReload){
    socket.on('delete' + localStorage.getItem('id'),()=>{
        console.log('task deleted')
        alert('todo deleted')
        // setReload(!reload)
        window.location.reload();

    })
}
function test(){
    socket.emit('test','hello')
}
export {test,addTodo,getAddTodo,deleteTodo,getDeleteTodo}