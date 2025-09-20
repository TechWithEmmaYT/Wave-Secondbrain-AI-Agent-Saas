import requests

BASE_URL = "http://localhost:3000"
TOKEN = "6kiK4TxnTZl1uJkBuwso5uJI7bhBxb4s.ecfMkD6%2B5U6S9%2FqfJcuTiLtLeku7hLtpOx1CDqM5l1g%3D"
HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json"
}
TIMEOUT = 30


def test_update_existing_note():
    note_create_url = f"{BASE_URL}/api/note/create"
    note_update_url_template = f"{BASE_URL}/api/note/update/{{}}"
    note_delete_url_template = f"{BASE_URL}/api/note/delete/{{}}"

    created_note_id = None
    # First, create a note to update
    create_payload = {
        "title": "Original Title",
        "content": "Original content of the note."
    }

    try:
        create_resp = requests.post(note_create_url, json=create_payload, headers=HEADERS, timeout=TIMEOUT)
        assert create_resp.status_code == 200, f"Note creation failed with status {create_resp.status_code}"
        create_data = create_resp.json()
        assert create_data.get("success") is True, "Note creation success flag is False"
        note_data = create_data.get("data")
        assert note_data and "id" in note_data, "Created note data missing id"
        created_note_id = note_data["id"]

        # Prepare update payload - update both title and content
        update_payload = {
            "title": "Updated Title",
            "content": "Updated content of the note."
        }
        update_url = note_update_url_template.format(created_note_id)

        update_resp = requests.patch(update_url, json=update_payload, headers=HEADERS, timeout=TIMEOUT)
        assert update_resp.status_code == 200, f"Note update failed with status {update_resp.status_code}"

        # Verify the update by fetching the note
        get_note_url = f"{BASE_URL}/api/note/{created_note_id}"
        get_resp = requests.get(get_note_url, headers=HEADERS, timeout=TIMEOUT)
        assert get_resp.status_code == 200, f"Getting updated note failed with status {get_resp.status_code}"
        note = get_resp.json().get("data")
        assert note is not None, "Updated note data missing"
        assert note.get("title") == update_payload["title"], "Note title was not updated correctly"
        assert note.get("content") == update_payload["content"], "Note content was not updated correctly"

        # Test update on a non-existent note id
        fake_id = "nonexistent-note-id-123456"
        fake_update_url = note_update_url_template.format(fake_id)
        fake_update_resp = requests.patch(fake_update_url, json=update_payload, headers=HEADERS, timeout=TIMEOUT)
        assert fake_update_resp.status_code == 404, f"Updating non-existent note should return 404 but got {fake_update_resp.status_code}"

    finally:
        # Cleanup: delete the created note if it exists
        if created_note_id:
            delete_url = note_delete_url_template.format(created_note_id)
            try:
                requests.delete(delete_url, headers=HEADERS, timeout=TIMEOUT)
            except Exception:
                pass


test_update_existing_note()