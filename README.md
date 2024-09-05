# Unlearning Interface

The code in this repository serves as an interface for testing models produced as part of the larger project found at [UnitTestStudio/unlearning](https://github.com/UnitTestStudio/unlearning). The ChatGPT style chatbot web-app allows users to interact with and test various language models developed in the unlearning project. 

The application is built with Flask for the backend and uses HTML, CSS, and JavaScript for the frontend, providing a user-friendly chat interface to facilitate model testing and evaluation.

## Features

-   **Interactive Chat Interface**: Users can send messages and receive responses from the model.
-   **Clear Conversation**: Users can clear the conversation history from both the frontend and backend.
-   **Save Conversation**: Users can download the conversation history as a text file.
-   **Responsive Design**: The application is designed to be responsive and user-friendly.

## Technologies Used

-   **Backend**: Flask
-   **Frontend**: HTML, CSS, JavaScript
-   **API**: OpenAI API (or a compatible LLM API)
-   **Logging**: Python's built-in logging module

## Project Structure
```
unlearning-interface/
│
├── app.py                # Your main Flask application
├── static/               # Directory for static files (CSS, JS, images)
│   ├── css/
│   │   └── styles.css    # CSS styles
│   └── js/
│       └── script.js      # JavaScript code
│
└── templates/            # Directory for HTML templates
└── index.html        # Your main HTML file
```

## Installation
### 1. **Clone the repository**:
```sh
git clone https://github.com/UnitTestStudio/unlearning.git
cd unlearning-interface
```
### 2.	Set up a virtual environment (optional but recommended):
```sh
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
```
### 3.	Install the required packages:
```sh
pip install -r requirements.txt
```
### 4.	Set environment variables:
Make sure to set the following environment variables:
- RUNPOD_ENDPOINT_ID: Your RunPod endpoint ID.
- RUNPOD_API_KEY: Your RunPod API key.
- MODEL: The model you want to use (e.g., openchat/openchat-3.5-0106).
You can set these in your terminal like this:
```bash
export RUNPOD_ENDPOINT_ID=<your_endpoint_id>
export RUNPOD_API_KEY=<your_api_key>
export MODEL=<your_model>
```
You can also store them in a `.env` file

### 5.	Run the application:

```python
python app.py
```
### 6.	Access the application:
Open your web browser and navigate to `http://localhost:5000/`.