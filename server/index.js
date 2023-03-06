const app = require('express')
const server = require('http').createServer(app)
const io = require('socket.io')(server, { cors: { origin: 'https://candid-pasca-84aaa7.netlify.app/' } }) //http://localhost:5173/
const PORT = 3001

io.on('connection', (socket) => {
    console.log('New client connected', socket.id)

    socket.on('disconnect', () => {
        console.log('Client disconnected', socket.id)
    })

    socket.on('set_username', username => {
        socket.data.username = username
        console.log(socket.data.username)
    })

    socket.on('send_message', message => {
        io.emit('receive_message',
            {
                message,
                authorId: socket.id,
                username: socket.data.username
            })
    })
})


server.listen(PORT, () => console.log(`Server is running!!!`))
