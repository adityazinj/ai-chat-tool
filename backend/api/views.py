import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings

@api_view(["POST"])
def chat_ai(request):
    user_message = request.data.get("message")
    
    if not user_message:
        return Response({"error": "Message is required"}, status=400)

    headers = {
        "Authorization": f"Bearer {settings.OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "React AI Chatbot"
    }

    payload = {
        "model": "xiaomi/mimo-v2-flash:free",
        "messages": [
            {"role": "user", "content": user_message}
        ]
    }

    response = requests.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers=headers,
        json=payload
    )

    data = response.json()

    if "choices" not in data:
        return Response({
            "error": "OpenRouter error",
            "details": data
        }, status=response.status_code)

    reply = data["choices"][0]["message"]["content"]
    return Response({"reply": reply})
