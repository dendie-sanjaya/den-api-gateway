from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def hello_world():
    return jsonify(message='Hello, World!')

@app.route('/ms-2/welcome')
def welcome():
    return jsonify(message='Welcome to Microservice 2')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4500)