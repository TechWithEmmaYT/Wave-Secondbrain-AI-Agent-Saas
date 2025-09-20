import requests
import uuid

BASE_URL = "http://localhost:3000"
TOKEN = "6kiK4TxnTZl1uJkBuwso5uJI7bhBxb4s.ecfMkD6%2B5U6S9%2FqfJcuTiLtLeku7hLtpOx1CDqM5l1g%3D"
HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json"
}
TIMEOUT = 30


def test_get_specific_chat_with_messages():
    chat_id = None

    # Create a new chat to get a valid chat id
    # Per PRD: POST /api/chat - requires id, message, selectedModelId
    create_chat_url = f"{BASE_URL}/api/chat"
    new_chat_id = str(uuid.uuid4())
    payload = {
        "id": new_chat_id,
        "message": {
            "role": "user",
            "content": "Hello, this is a test message."
        },
        "selectedModelId": "test-model-1"
    }

    try:
        # Create chat/conversation
        create_resp = requests.post(create_chat_url, json=payload, headers=HEADERS, timeout=TIMEOUT)
        assert create_resp.status_code == 200, f"Expected 200, got {create_resp.status_code}"
        # The chat id is the one we sent "id" in payload
        chat_id = new_chat_id

        # Now get the specific chat with messages
        get_chat_url = f"{BASE_URL}/api/chat/{chat_id}"
        get_resp = requests.get(get_chat_url, headers=HEADERS, timeout=TIMEOUT)
        assert get_resp.status_code == 200, f"Expected 200, got {get_resp.status_code}"
        data = get_resp.json()
        # Based on description, expecting a chat object with messages
        # Basic checks for structure
        assert isinstance(data, dict), "Response JSON should be an object"
        # Expect containing keys relevant to chat and messages
        # Since schema is not explicit, check for 'id' and 'messages' key presence
        assert "id" in data, "'id' field missing in chat data"
        assert data["id"] == chat_id, "Returned chat id does not match requested id"
        assert "messages" in data, "'messages' field missing in chat data"
        assert isinstance(data["messages"], list), "'messages' should be a list"
        # If there are messages, check structure of the first message
        if data["messages"]:
            first_msg = data["messages"][0]
            assert isinstance(first_msg, dict), "Each message should be an object"
            assert "role" in first_msg, "Message missing 'role' field"
            assert "content" in first_msg, "Message missing 'content' field"

    finally:
        # Cleanup: Delete the created chat if API supports deletion of chat
        # The PRD does not specify chat delete, so skip delete cleanup
        # If chat delete endpoint existed, we'd call it here
        pass


test_get_specific_chat_with_messages()