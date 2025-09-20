import requests
import uuid

BASE_URL = "http://localhost:3000"
TOKEN = "6kiK4TxnTZl1uJkBuwso5uJI7bhBxb4s.ecfMkD6%2B5U6S9%2FqfJcuTiLtLeku7hLtpOx1CDqM5l1g%3D"
HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json"
}
TIMEOUT = 30


def test_get_all_user_notes_with_pagination():
    # Step 1: Create multiple notes to ensure pagination data is present
    created_note_ids = []
    try:
        for i in range(25):
            title = f"Test Note {uuid.uuid4()}"
            content = f"Content for {title}"
            create_resp = requests.post(
                f"{BASE_URL}/api/note/create",
                json={"title": title, "content": content},
                headers=HEADERS,
                timeout=TIMEOUT
            )
            assert create_resp.status_code == 200, f"Create note failed: {create_resp.text}"
            create_data = create_resp.json()
            assert create_data.get("success") is True, f"Create note unsuccessful: {create_data}"
            note_id = create_data.get("data", {}).get("id")
            assert note_id, "No note ID returned on creation"
            created_note_ids.append(note_id)

        # Step 2: Retrieve notes with pagination parameters page=1, limit=10
        params = {"page": 1, "limit": 10}
        get_resp = requests.get(
            f"{BASE_URL}/api/note/all",
            headers=HEADERS,
            params=params,
            timeout=TIMEOUT
        )
        assert get_resp.status_code == 200, f"Failed to get notes: {get_resp.text}"
        resp_json = get_resp.json()

        # Validate response structure and success flag
        assert "success" in resp_json, "Missing 'success' in response"
        assert resp_json["success"] is True, "Response success flag is not True"
        assert "data" in resp_json, "Missing 'data' in response"
        assert isinstance(resp_json["data"], list), "'data' should be a list"
        assert len(resp_json["data"]) <= params["limit"], "Returned notes exceed limit"

        # Validate each note object
        for note in resp_json["data"]:
            assert isinstance(note, dict), "Note item is not a dict"
            assert "id" in note and isinstance(note["id"], str) and note["id"], "Note missing valid 'id'"
            assert "title" in note and isinstance(note["title"], str), "Note missing valid 'title'"
            assert "content" in note and isinstance(note["content"], str), "Note missing valid 'content'"
            assert "createdAt" in note and isinstance(note["createdAt"], str) and note["createdAt"], "Note missing valid 'createdAt'"

        # Validate pagination metadata
        assert "pagination" in resp_json, "Missing pagination metadata"
        pagination = resp_json["pagination"]
        assert isinstance(pagination, dict), "Pagination is not a dict"
        assert "total" in pagination and isinstance(pagination["total"], int) and pagination["total"] >= len(created_note_ids), "Invalid pagination total"
        assert "page" in pagination and pagination["page"] == params["page"], "Pagination page mismatch"
        assert "limit" in pagination and pagination["limit"] == params["limit"], "Pagination limit mismatch"
        assert "totalPages" in pagination and isinstance(pagination["totalPages"], int) and pagination["totalPages"] >= 1, "Invalid totalPages in pagination"

    finally:
        # Cleanup: delete created notes
        for note_id in created_note_ids:
            try:
                del_resp = requests.delete(
                    f"{BASE_URL}/api/note/delete/{note_id}",
                    headers=HEADERS,
                    timeout=TIMEOUT
                )
                # 200 or 404 is acceptable if double delete triggered
                if del_resp.status_code not in (200, 404):
                    print(f"Warning: Unexpected delete status {del_resp.status_code} for note {note_id}")
            except Exception as e:
                print(f"Exception while deleting note {note_id}: {e}")


test_get_all_user_notes_with_pagination()