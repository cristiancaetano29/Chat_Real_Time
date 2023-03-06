import React, {useRef, useState, useEffect} from 'react'

export default function chat({socket}) {
  const messageRef = useRef()
  const [messageList, setMessageList] = useState([])

  const handleSubmit = () => {
    const message = messageRef.current.value
    if (!message.trim()) return
    
    socket.emit('send_message', message)
    clearInput()
  }

  const clearInput = () => {
    messageRef.current.value = ''
  }

  useEffect(() => {
    socket.on('receive_message', data => {
      setMessageList((current) => [...current, data])
    })
    return () => socket.off('receive_message')
  }, [socket])

  console.log('messageList2', messageList)
  console.log('socket', socket)

  return (
    <div>
        <h1>Chat</h1>
        {
          messageList.map((message, index) => {
            {console.log('map', messageList)}
            return (
              <div key={index}>
                <p>{message.username}: {message.message}</p>
              </div>
            )
          })
        }
        <input type="text" ref ={messageRef} placeholder='mensagem' />
        <button onClick={() => handleSubmit()}>Enviar</button>
    </div>
  )
}