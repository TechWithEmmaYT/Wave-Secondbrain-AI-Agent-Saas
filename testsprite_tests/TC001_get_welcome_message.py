import requests

BASE_URL = "http://localhost:3000"
TOKEN = "6kiK4TxnTZl1uJkBuwso5uJI7bhBxb4s.ecfMkD6%2B5U6S9%2FqfJcuTiLtLeku7hLtpOx1CDqM5l1g%3D"
HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Accept": "application/json"
}
TIMEOUT = 30

def test_get_welcome_message():
    url = f"{BASE_URL}/api/"
    try:
        response = requests.get(url, headers=HEADERS, timeout=TIMEOUT)
        assert response.status_code == 200, f"Expected 200 but got {response.status_code}"
        json_data = response.json()
        assert isinstance(json_data, dict), "Response is not a JSON object"
        assert "message" in json_data, "Response JSON does not contain 'message' key"
        assert isinstance(json_data["message"], str), "'message' is not a string"
        assert len(json_data["message"]) > 0, "'message' is empty"
    except requests.exceptions.RequestException as e:
        assert False, f"Request failed: {e}"

test_get_welcome_message()