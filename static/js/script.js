document.getElementById('chat-form').onsubmit = async function(event) {
    event.preventDefault();  // Prevent the form from submitting the traditional way
    const userInput = document.getElementById('user-input-text').value;

    // Display the user input in the conversation area
    const conversationDiv = document.getElementById('conversation');
    conversationDiv.innerHTML += `<div class="message user-message">${userInput}</div>`; // Removed "You:"

    // Send the input to the /chat endpoint
    const response = await fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
    });

    const data = await response.json();
    const modelResponse = data.response || data.error;

    // Display the model response in the conversation area
    conversationDiv.innerHTML += `<div class="message assistant-message">${modelResponse}</div>`; // Removed "Assistant:"
    document.getElementById('user-input-text').value = ''; // Clear the input box

    // Scroll to the bottom of the conversation
    conversationDiv.scrollTop = conversationDiv.scrollHeight;
};

// Clear conversation function
document.getElementById('clear-button').onclick = async function() {
    const response = await fetch('/clear', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        document.getElementById('conversation').innerHTML = ''; // Clear the conversation history on the front end
    } else {
        console.error('Failed to clear conversation:', response.statusText);
    }
};

// Save conversation function
document.getElementById('save-button').onclick = function() {
    const conversationDiv = document.getElementById('conversation');
    const conversationText = conversationDiv.innerText; // Get the text content of the conversation
    const blob = new Blob([conversationText], { type: 'text/plain' }); // Create a blob from the text
    const url = URL.createObjectURL(blob); // Create a URL for the blob
    const a = document.createElement('a'); // Create a link element
    a.href = url; // Set the link's href to the blob URL
    a.download = 'conversation.txt'; // Set the default filename
    document.body.appendChild(a); // Append the link to the body
    a.click(); // Programmatically click the link to trigger the download
    document.body.removeChild(a); // Remove the link from the document
    URL.revokeObjectURL(url); // Free up memory
};

// Add event listener for Cmd + Return (or Ctrl + Enter)
document.getElementById('user-input-text').addEventListener('keydown', function(event) {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault(); // Prevent the default action (like a new line)
        document.getElementById('chat-form').dispatchEvent(new Event('submit')); // Trigger form submission
    }
});
