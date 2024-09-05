from flask import Flask, request, jsonify, render_template
import os
import logging
from openai import OpenAI

app = Flask(__name__)

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Retrieve environment variables
endpoint_id = os.environ.get("RUNPOD_ENDPOINT_ID")
api_key = os.environ.get("RUNPOD_API_KEY")

# Initialize the OpenAI client with the RunPod endpoint
client = OpenAI(
    base_url=f"https://api.runpod.ai/v2/{endpoint_id}/openai/v1",
    api_key=api_key,
)

# Initialize conversation history
conversation_history = []

@app.route('/', methods=['GET'])
def home():
    """Home route that provides a welcome message and a form for user input."""
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message')  # Get the user input from the request
    
    # Log the user input
    logger.info(f"User input: {user_input}")
    
    # Append the user input to the conversation history
    conversation_history.append({"role": "user", "content": user_input})
    
    # Prepare the message for the OpenAI API
    try:
        # Send a request to the RunPod VLLM Worker with the entire conversation history
        chat_completion = client.chat.completions.create(
            model=os.environ.get("MODEL"),  # Specify your model here
            messages=conversation_history
        )
        
        # Log the raw response
        logger.info(f"Raw response: {chat_completion}")

        # Check if the response is valid
        if chat_completion is None or not chat_completion.choices:
            logger.error("Received an invalid response from the model.")
            return jsonify({'error': 'Invalid response from the model.'}), 500
        
        # Extract the response content correctly
        response_content = chat_completion.choices[0].message.content
        
        # Log the model response
        logger.info(f"Model response: {response_content}")
        
        # Append the model's response to the conversation history
        conversation_history.append({"role": "assistant", "content": response_content})
        
        return jsonify({'response': response_content})  # Return the model's output
    except Exception as e:
        logger.error(f"Error occurred: {str(e)}")  # Log the error
        return jsonify({'error': str(e)}), 500  # Handle errors

@app.route('/clear', methods=['POST'])
def clear_conversation():
    """Clear the conversation history."""
    global conversation_history
    conversation_history = []  # Reset the conversation history
    logger.info("Conversation history cleared.")
    return jsonify({'message': 'Conversation history cleared.'}), 200

if __name__ == '__main__':
    app.run(debug=True)
