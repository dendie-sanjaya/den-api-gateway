from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World! - Microservice 2 - Python'

if __name__ == '__main__':
    app.run(port=5000)