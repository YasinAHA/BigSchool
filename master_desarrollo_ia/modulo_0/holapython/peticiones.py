import requests

url = "https://jsonplaceholder.typicode.com/users/1"
response = requests.get(url)
if response.status_code == 200:
    data = response.json()
    print(data)
else:
    print(f"Error: {response.status_code}")