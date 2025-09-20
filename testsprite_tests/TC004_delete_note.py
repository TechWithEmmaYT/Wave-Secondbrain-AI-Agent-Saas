import requests

BASE_URL = "http://localhost:3000"
TOKEN = "6kiK4TxnTZl1uJkBuwso5uJI7bhBxb4s.ecfMkD6%2B5U6S9%2FqfJcuTiLtLeku7hLtpOx1CDqM5l1g%3D"

HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json"
}

def test_delete_note():
    create_url = f"{BASE_URL}/api/note/create"
    delete_url_template = f"{BASE_URL}/api/note/delete/{{}}"
    get_url_template = f"{BASE_URL}/api/note/{{}}"
    note_payload = {
        "title": "Temporary Note for Deletion",
        "content": "This note is created to test deletion endpoint."
    }

    note_id = None
    try:
        # Create a note to delete
        create_resp = requests.post(create_url, json=note_payload, headers=HEADERS, timeout=30)
        assert create_resp.status_code == 200, f"Create note failed with status {create_resp.status_code}"
        create_data = create_resp.json()
        assert create_data.get("success") is True, "Create note response success flag not True"
        note_id = create_data.get("data", {}).get("id")
        assert note_id, "Created note ID missing"

        # Delete the created note
        delete_url = delete_url_template.format(note_id)
        delete_resp = requests.delete(delete_url, headers=HEADERS, timeout=30)
        assert delete_resp.status_code == 200, f"Delete note failed with status {delete_resp.status_code}"

        # Verify the note no longer exists (should get 404)
        get_url = get_url_template.format(note_id)
        get_resp = requests.get(get_url, headers=HEADERS, timeout=30)
        assert get_resp.status_code == 404, f"Expected 404 for deleted note, got {get_resp.status_code}"

        # Attempt deleting a non-existent note (should get 404)
        non_existent_id = "nonexistentid1234567890"
        delete_resp_404 = requests.delete(delete_url_template.format(non_existent_id), headers=HEADERS, timeout=30)
        assert delete_resp_404.status_code == 404, f"Expected 404 deleting non-existent note, got {delete_resp_404.status_code}"

    finally:
        # Cleanup: Just in case the note was not deleted by test
        if note_id:
            requests.delete(delete_url_template.format(note_id), headers=HEADERS, timeout=30)

test_delete_note()