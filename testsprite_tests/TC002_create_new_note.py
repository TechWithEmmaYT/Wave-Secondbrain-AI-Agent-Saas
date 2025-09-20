import requests
from datetime import datetime

BASE_URL = "http://localhost:3000"
TOKEN = "6kiK4TxnTZl1uJkBuwso5uJI7bhBxb4s.ecfMkD6%2B5U6S9%2FqfJcuTiLtLeku7hLtpOx1CDqM5l1g%3D"
HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json",
    "Accept": "application/json"
}
TIMEOUT = 30

def test_create_new_note():
    url_create = f"{BASE_URL}/api/note/create"
    url_delete = None

    # Prepare payload for creating a note
    payload = {
        "title": "Test Note Title",
        "content": "This is a test note content."
    }

    try:
        # Create a new note
        response = requests.post(url_create, json=payload, headers=HEADERS, timeout=TIMEOUT)
        assert response.status_code == 200, f"Expected 200 OK, got {response.status_code}"
        resp_json = response.json()
        assert isinstance(resp_json, dict), "Response is not a JSON object"
        assert resp_json.get("success") is True, "Success flag not True in response"
        data = resp_json.get("data")
        assert data is not None and isinstance(data, dict), "Data field missing or invalid"
        note_id = data.get("id")
        assert isinstance(note_id, str) and note_id, "Note ID is missing or invalid"
        url_delete = f"{BASE_URL}/api/note/delete/{note_id}"

        # Validate returned note fields
        assert data.get("title") == payload["title"], "Title mismatch in response data"
        assert data.get("content") == payload["content"], "Content mismatch in response data"
        user_id = data.get("userId")
        assert isinstance(user_id, str) and user_id, "User ID missing or invalid"
        
        # Validate createdAt and updatedAt are ISO 8601 date-time strings and logical
        created_at_str = data.get("createdAt")
        updated_at_str = data.get("updatedAt")
        assert isinstance(created_at_str, str) and created_at_str, "createdAt missing or invalid"
        assert isinstance(updated_at_str, str) and updated_at_str, "updatedAt missing or invalid"
        created_at = datetime.fromisoformat(created_at_str.replace('Z', '+00:00'))
        updated_at = datetime.fromisoformat(updated_at_str.replace('Z', '+00:00'))
        assert updated_at >= created_at, "updatedAt is earlier than createdAt"

    finally:
        # Clean up: delete the created note if created
        if url_delete:
            try:
                del_resp = requests.delete(url_delete, headers=HEADERS, timeout=TIMEOUT)
                assert del_resp.status_code == 200, f"Failed to delete note after test, status {del_resp.status_code}"
            except Exception as e:
                raise AssertionError(f"Exception during cleanup deleting note: {e}")

test_create_new_note()