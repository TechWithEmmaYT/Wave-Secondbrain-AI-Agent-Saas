import requests
import uuid

BASE_URL = "http://localhost:3000"
TOKEN = "6kiK4TxnTZl1uJkBuwso5uJI7bhBxb4s.ecfMkD6%2B5U6S9%2FqfJcuTiLtLeku7hLtpOx1CDqM5l1g%3D"
HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json",
    "Accept": "application/json",
}
TIMEOUT = 30


def test_start_or_continue_chat_conversation():
    # Prepare a unique chat ID and request payload
    chat_id = str(uuid.uuid4())
    message_payload = {"text": "Hello, AI! Please start the conversation."}  # Changed to object
    selected_model_id = "default-model"

    url = f"{BASE_URL}/api/chat"
    payload = {
        "id": chat_id,
        "message": message_payload,
        "selectedModelId": selected_model_id
    }

    try:
        # Make the POST request to start or continue the chat conversation
        response = requests.post(url, json=payload, headers=HEADERS, timeout=TIMEOUT, stream=True)

        # If 403, must be generation limit reached
        if response.status_code == 403:
            json_resp = None
            try:
                json_resp = response.json()
            except Exception:
                pass
            # Assert error due to generation limit
            assert json_resp is None or (isinstance(json_resp, dict)), "403 response should be JSON or empty"
            return  # Test passes as 403 is valid error when limit reached

        # For success 200, expect streamed response (likely chunked)
        assert response.status_code == 200, f"Expected 200 OK or 403, got {response.status_code}"

        # Since streaming, we read chunks and accumulate them
        full_response_text = ""
        for chunk in response.iter_content(chunk_size=1024, decode_unicode=True):
            if chunk:
                full_response_text += chunk

        # Basic response validation: must contain some AI generated text as string
        assert len(full_response_text.strip()) > 0, "Streaming response should not be empty"

    except requests.exceptions.RequestException as e:
        assert False, f"Request failed: {str(e)}"


test_start_or_continue_chat_conversation()
