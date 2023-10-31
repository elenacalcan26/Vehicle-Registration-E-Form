from flask import Flask, request, jsonify
from http import HTTPStatus
from flask_cors import CORS

server = Flask(__name__)
CORS(server)

@server.route("/", methods=["POST"])
def submitted_form():
    body = request.get_json()

    print(body, flush=True)

    response_data = {"message": "data received!"}
    return jsonify(response_data), HTTPStatus.CREATED

if __name__ == "__main__":
    server.run(debug=True)
