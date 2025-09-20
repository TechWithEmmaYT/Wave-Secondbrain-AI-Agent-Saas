import requests

BASE_URL = "http://localhost:3000"
TOKEN = "6kiK4TxnTZl1uJkBuwso5uJI7bhBxb4s.ecfMkD6%2B5U6S9%2FqfJcuTiLtLeku7hLtpOx1CDqM5l1g%3D"
HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Accept": "application/json",
}


def test_get_all_user_chats():
    url = f"{BASE_URL}/api/chat"
    try:
        response = requests.get(url, headers=HEADERS, timeout=30)
    except requests.RequestException as e:
        assert False, f"Request failed: {e}"

    assert response.status_code == 200, f"Expected status code 200 but got {response.status_code}"

    json_data = response.json()
    assert "success" in json_data, "Response JSON missing 'success' key"
    assert json_data["success"] is True, "'success' key should be True"

    assert "data" in json_data, "Response JSON missing 'data' key"
    assert isinstance(json_data["data"], list), "'data' should be a list"

    # Verify each chat item has required fields and correct user association (userId is a non-empty string)
    for chat in json_data["data"]:
        assert isinstance(chat, dict), "Each chat item should be a dict"
        for field in ["id", "title", "userId", "createdAt"]:
            assert field in chat, f"Chat item missing '{field}' field"
        # userId should be a non-empty string
        assert isinstance(chat["userId"], str) and chat["userId"], "'userId' should be a non-empty string"


test_get_all_user_chats()