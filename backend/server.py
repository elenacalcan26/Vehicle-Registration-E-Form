from flask import Flask, request

server = Flask(__name__)

@server.route('/submitted', method=["POST"])
def submitted_form():
    return

if __name__ == '__main__':
    server.run()
