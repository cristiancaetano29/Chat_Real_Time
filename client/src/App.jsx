import { useState } from 'react'
import './App.css'
import Join from './components/join/join'
import Chat from './components/chat/chat'

function App() {
  const [chatVisible, setChatVisible] = useState(false)
  const [socket, setSocket] = useState(null)

  return (
    <div className="App">
      {
        chatVisible ? <Chat socket={socket}/> : <Join setSocket={setSocket} setChatVisible={setChatVisible}/>
      }
    </div>
  )
}

export default App
