import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def create_simple_tasks(task):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are an expert task manager. "
                    "Break down the following task into simple, "
                    "manageable tasks."
                ),
            },
            {
                "role": "user",
                "content": f"Break down this task into simple tasks: {task}",
            },
        ],
        max_tokens=500,
        temperature=0.7,
    )
    return response.choices[0].message.content.strip()
