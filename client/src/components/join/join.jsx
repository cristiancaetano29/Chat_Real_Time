import React, { useState, useRef } from 'react'
import io from 'socket.io-client'

export default function join({ setChatVisible, setSocket }) {
  //const [username, setUsername] = useState('')
  //onChange={pegaValorDoInput}
  /*
  const pegaValorDoInput = e => {
    setUsername(e.target.value)
  }
  */

  const usernameRef = useRef()

  const handleSubmit = async () => {
    const username = usernameRef.current.value
    if (!username.trim()) return
    const socket = await io.connect('https://chat-server-nj27.onrender.com')
    socket.emit('set_username', username)
    setSocket(socket)

    setChatVisible(true)
  }
  
  return (
    <div>
      <h1>Join</h1>
      <input type="text" ref={usernameRef}  placeholder='usuario' />
      <button onClick={() => handleSubmit()}>Entrar</button>
    </div>
  )
}
