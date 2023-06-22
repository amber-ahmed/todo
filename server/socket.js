function socket(io){
    console.log('socket')
io.on("connection",(socket)=>{
    socket.on("todo-added",(userid,msg)=>{
        console.log(userid)
        socket.broadcast.emit("add" + userid,msg)
    })
    socket.on("todo-deleted",(userid)=>{
        socket.broadcast.emit("delete" + userid)
    })
    socket.on('test',(data)=>{
        console.log(data)
        socket.broadcast.emit('demo','working')
    })
})
}
export default socket