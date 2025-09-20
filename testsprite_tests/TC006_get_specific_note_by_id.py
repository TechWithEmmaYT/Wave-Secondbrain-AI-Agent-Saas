import requests

BASE_URL = "http://localhost:3000"
TOKEN = "6kiK4TxnTZl1uJkBuwso5uJI7bhBxb4s.ecfMkD6%2B5U6S9%2FqfJcuTiLtLeku7hLtpOx1CDqM5l1g%3D"
HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json"
}
TIMEOUT = 30

def test_get_specific_note_by_id():
    # First create a note to have a valid note id
    create_payload = {
        "title": "Test Note for TC006",
        "content": "This is a test note content for test case TC006."
    }
    note_id = None
    try:
        create_response = requests.post(
            f"{BASE_URL}/api/note/create",
            json=create_payload,
            headers=HEADERS,
            timeout=TIMEOUT
        )
        assert create_response.status_code == 200, f"Expected 200 on note creation, got {create_response.status_code}"
        create_json = create_response.json()
        assert create_json.get("success") is True, "Note creation success flag is not True"
        data = create_json.get("data")
        assert data is not None, "No data object in creation response"
        note_id = data.get("id")
        assert isinstance(note_id, str) and len(note_id) > 0, "Note ID invalid in creation response"

        # Test successful retrieval of the note by id
        get_response = requests.get(
            f"{BASE_URL}/api/note/{note_id}",
            headers=HEADERS,
            timeout=TIMEOUT
        )
        assert get_response.status_code == 200, f"Expected 200 when retrieving existing note, got {get_response.status_code}"
        get_json = get_response.json()
        # Check returned note data integrity
        assert get_json.get("id") == note_id or get_json.get("data", {}).get("id") == note_id or "data" in get_json, \
            "Returned note ID does not match requested ID"
        # The response schema is not explicitly detailed for GET /api/note/{id} 200, but at least success and note details expected
        # Validate that required fields exist in response
        note_data = get_json if "id" in get_json else get_json.get("data") if get_json.get("data") else {}
        assert note_data.get("title") == create_payload["title"], "Note title mismatch in retrieved data"
        assert note_data.get("content") == create_payload["content"], "Note content mismatch in retrieved data"

        # Test retrieval of a non-existent note id yields 404
        fake_id = "nonexistent-note-id-1234567890"
        if fake_id == note_id:
            fake_id += "xyz"  # ensure different
        not_found_response = requests.get(
            f"{BASE_URL}/api/note/{fake_id}",
            headers=HEADERS,
            timeout=TIMEOUT
        )
        assert not_found_response.status_code == 404, f"Expected 404 when retrieving non-existent note, got {not_found_response.status_code}"

    finally:
        # Cleanup: delete the created note if it was created
        if note_id:
            try:
                del_response = requests.delete(
                    f"{BASE_URL}/api/note/delete/{note_id}",
                    headers=HEADERS,
                    timeout=TIMEOUT
                )
                # Deletion might return 200 if deleted successfully, 404 if already deleted
                assert del_response.status_code in [200, 404], f"Unexpected status code on note deletion: {del_response.status_code}"
            except Exception:
                pass

test_get_specific_note_by_id()