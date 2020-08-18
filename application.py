from flask import Response, Flask, redirect, url_for, request, render_template, abort, jsonify, send_file, send_from_directory, safe_join, abort
from flask_cors import CORS
from helper import read_persons, write_person, read_admins
from werkzeug.utils import secure_filename
import os
application = Flask(__name__)
CORS(application)

# serving json request from android app
@application.route('/login/', methods=['POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        print(data)
        username = data['uname']
        password = data['pass']
        for admin in read_admins():
            if(username == admin["username"] and password == admin["password"]):
                response = jsonify('true')
                response.headers.add('Access-Control-Allow-Origin', '*')
                return response
        else:
            response = jsonify('false')
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response


@application.route('/getAllPerson/', methods=['POST', 'GET'])
def getAllPerson():
    response = jsonify({'persons': read_persons()})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@application.route("/get-image/<image_name>")
def get_image(image_name):

    try:
        return send_from_directory("./images/", filename=image_name, as_attachment=True)
    except FileNotFoundError:
        abort(404)


@application.route("/set-image/", methods=['POST'])
def set_image():
    data = request.files

    for i in range(len(data)):
        for key in data.keys():
            f = data[key]
            f.save(os.path.join(
                'images', secure_filename(f.filename)))
    return jsonify("true")


@application.route('/addPerson/', methods=['POST'])
def addPerson():
    if request.method == 'POST':
        data = request.get_json()

        print(data)
        name = data['name']
        mobile = data['mobile']
        email = data['email']
        profilePic = data['profilePic']
        write_person([name, mobile, email, profilePic])
        response = jsonify("true")
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response


@application.route('/addManyPerson/', methods=['POST'])
def addManyPerson():
    if request.method == 'POST':
        data = request.get_json()
        print(data)
        for person in data:
            print(person)
            name = person['name']
            mobile = person['mobile']
            email = person['email']
            profilePic = person['profilePic']
            write_person([name, mobile, email, profilePic])
        response = jsonify("true")
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response


if __name__ == '__main__':
    application.run(threaded=True)
