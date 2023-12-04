import React, {useEffect, useState} from 'react';
import Pusher from "pusher-js";

const Repair = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        const pusher = new Pusher('1b73ff2cb6205e81e98b', {
            cluster: 'eu',
            encrypted: true,
        });

        const channel = pusher.subscribe('chat');
        channel.bind('message', (data) => {
            setMessages([...messages, data]);
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [messages]);

    const handleSendMessage = async () => {
        if (newMessage.trim() !== '') {
            const response = await fetch('http://127.0.0.1:8000/api/chat/messages/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: newMessage, sender: 'user' }),
            });

            const data = await response.json();
            setMessages([...messages, data]);
            setNewMessage('');
            console.log(data)
        }
    };

    return (
        <div>
            <div style={{ height: '400px', border: '1px solid #ccc', overflowY: 'scroll' }}>
                {messages.map((message, index) => (
                    <div key={index} style={{ padding: '5px', textAlign: message.sender === 'user' ? 'right' : 'left' }}>
                        {message.text}
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '10px' }}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    style={{ marginRight: '10px' }}
                />
                <button onClick={handleSendMessage}>Отправить</button>
            </div>
        </div>
    );
};

export default Repair;