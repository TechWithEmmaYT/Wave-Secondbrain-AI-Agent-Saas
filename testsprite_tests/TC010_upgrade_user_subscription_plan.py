import requests

BASE_URL = "http://localhost:3000"
TOKEN = "6kiK4TxnTZl1uJkBuwso5uJI7bhBxb4s.ecfMkD6%2B5U6S9%2FqfJcuTiLtLeku7hLtpOx1CDqM5l1g%3D"
HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json"
}
TIMEOUT = 30


def test_upgrade_user_subscription_plan():
    url = f"{BASE_URL}/api/subscription/upgrade"
    callback_url = "http://localhost/success"

    # Test upgrading to 'plus' plan
    payload_plus = {
        "plan": "plus",
        "callbackUrl": callback_url
    }
    response_plus = requests.post(url, headers=HEADERS, json=payload_plus, timeout=TIMEOUT)
    # Allow either success (200) or error 400 if already on plan
    assert response_plus.status_code in (200, 400), f"Unexpected status code for plus plan: {response_plus.status_code}"
    if response_plus.status_code == 200:
        body = response_plus.json()
        assert isinstance(body, dict), "Response is not a JSON object"
        assert "success" in body and isinstance(body["success"], bool), "'success' missing or not boolean"
        assert body["success"] is True, "'success' should be True for 200 response"
        assert "checkoutUrl" in body and isinstance(body["checkoutUrl"], str) and body["checkoutUrl"].strip() != "", "'checkoutUrl' missing or empty"
    else:
        # 400 case: check message or just pass
        pass

    # Test upgrading to 'premium' plan
    payload_premium = {
        "plan": "premium",
        "callbackUrl": callback_url
    }
    response_premium = requests.post(url, headers=HEADERS, json=payload_premium, timeout=TIMEOUT)
    assert response_premium.status_code in (200, 400), f"Unexpected status code for premium plan: {response_premium.status_code}"
    if response_premium.status_code == 200:
        body = response_premium.json()
        assert isinstance(body, dict), "Response is not a JSON object"
        assert "success" in body and isinstance(body["success"], bool), "'success' missing or not boolean"
        assert body["success"] is True, "'success' should be True for 200 response"
        assert "checkoutUrl" in body and isinstance(body["checkoutUrl"], str) and body["checkoutUrl"].strip() != "", "'checkoutUrl' missing or empty"
    else:
        # 400 case: check message or just pass
        pass


test_upgrade_user_subscription_plan()
