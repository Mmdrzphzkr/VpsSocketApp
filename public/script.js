const socket = io(); // Connect to the WebSocket server

// Handle incoming messages
socket.on('message', (message) => {
  const messagesContainer = document.getElementById('messages');
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  messagesContainer.appendChild(messageElement);
});

// Handle confirmed message from the server
socket.on('confirmedMessage', (confirmedMessage) => {
  const messagesContainer = document.getElementById('messages');
  const confirmedMessageElement = document.createElement('div');
  confirmedMessageElement.textContent = confirmedMessage;
  confirmedMessageElement.classList.add('confirmed-message');
  messagesContainer.appendChild(confirmedMessageElement);
});

// Handle form submission
const form = document.getElementById('message-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.getElementById('message-input');
  const message = input.value;
  input.value = '';

  // Send the message to the server
  socket.emit('message', message);
});