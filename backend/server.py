from flask import Flask, request, jsonify
from http import HTTPStatus
from person_model import Person
from dao import Dao
from flask_cors import CORS

server = Flask(__name__)
CORS(server)

dao = Dao()

server.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///people.db"

@server.route("/", methods=["POST"])
def submitted_form():
    body = request.get_json()

    print(body, flush=True)

    person = Person(
        first_name=body["firstName"],
        last_name=body["lastName"],
        cnp=body["cnp"],
        mail=body["email"],
        phone=body["phone"],
        county=body["county"],
        preferred_license_plate=body["userPreferredNumber"],
        total=body["total"]
    )

    return_code = dao.insert_into_db(person)

    if return_code is False:
        response_data = {"message": "insertion failed"}
        return jsonify(response_data), HTTPStatus.METHOD_NOT_ALLOWED

    response_data = {"message": "data received!"}
    return jsonify(response_data), HTTPStatus.CREATED

if __name__ == "__main__":
    server.run(debug=True)
