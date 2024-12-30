"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint('api', __name__)
# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/register', methods=['POST'])
def register():
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    if not email or not password:
        return jsonify({'success': False, 'msg': 'Todos los campos son necesarios'}), 400
    exist = User.query.filter_by(email=email).first()
    if exist: 
        return jsonify({'success': False, 'msg': 'El correo electronico ya existe'}), 400
    hashed_password = generate_password_hash(password)
    new_user = User(email=email, password=hashed_password, is_active= True)
    db.session.add(new_user)
    db.session.commit()
    token = create_access_token(identity=str(new_user.id))
    return jsonify({'success': True, 'user': new_user.serialize(), 'token': token}), 200

@api.route('/login', methods=['POST'])
def login():
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    user = User.query.filter_by(email=email).first()
    if user: 
        if check_password_hash(user.password, password):
            access_token = create_access_token(identity=user.id)
            return jsonify({'success': True, 'user': user.serialize(), 'token': access_token}), 200
        else:
            return jsonify({'success': False, 'msg': 'Usuario/Contraseña no válidos'}), 400
    
    return jsonify({'success': False, 'msg': 'El correo electronico no tiene una cuenta asociada'}), 404

@api.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    identity = get_jwt_identity()
    user = User.query.get(identity)   
    if user: 
        print(user.serialize()) 
        return  jsonify({'success': True, 'msg': 'Has accedido a la ruta protegida '})
    return jsonify({'success': False, 'msg': 'Token erroneo'})