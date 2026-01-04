import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');

function App() {
  const [text, setText] = useState('');

  useEffect(() => {
    socket.on('load-document', (data) => {
      setText(data);
    });

    socket.on('receive-changes', (data) => {
      setText(data);
    });

    return () => {
      socket.off('load-document');
      socket.off('receive-changes');
    };
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);
    socket.emit('send-changes', value);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Real-Time Collaborative Document Editor</h2>
      <textarea
        value={text}
        onChange={handleChange}
        rows="15"
        cols="80"
        placeholder="Start typing..."
        style={{ width: '100%' }}
      />
    </div>
  );
}

export default App;