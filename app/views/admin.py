from flask import Blueprint, jsonify, request, url_for
from marshmallow import Schema, fields, ValidationError
from app.db import db_session
from datetime import timedelta
from app.models import Admin
from flask_bcrypt import Bcrypt
from app import app
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)
jwt = JWTManager(app)

mod = Blueprint('admin', __name__, url_prefix='/admin')
bcrypt = Bcrypt()

@mod.route('/', methods=['POST'])
@jwt_required()
def add_admin():
    
    if get_jwt_identity()["role"] != "admin":
        return jsonify({'error': 'Not enough permission'}), 403
    
    try:
        class CredentialsSchema(Schema):
            login = fields.Str(required=True)
            password = fields.Str(required=True)
            info = fields.Dict(required=True)
            
        class AdminSchema(Schema):
            first_name = fields.Str(required=True)
            last_name = fields.Str(required=True)
            university_id = fields.Int(required=True)
            subject_ids = fields.List(fields.Int(), required=True)
        
        CredentialsSchema().load(request.json)
    except ValidationError as err:
        return jsonify(err.messages), 400
    same_login = db_session.query(Admin).filter(Admin.login == request.json['login'])
    if same_login.count() > 0:
        return jsonify({'message': 'Admin with this login already exists'}), 400
    admin = Admin(login = request.json['login'], password = bcrypt.generate_password_hash(request.json['password']).decode('utf-8'))
    db_session.add(admin)
    db_session.commit()
    return jsonify(admin.id), 200

@mod.route('/', methods=['GET'])
@jwt_required()
def get_universities():
    if get_jwt_identity()["role"] != "admin":
        return jsonify({"error": "Not enough permission"}), 403
    admins = db_session.query(Admin).all()
    res = []
    for admin in admins:
        res.append({
            'id': admin.id,
            "login": admin.login,
        })
    return jsonify(res), 200

@mod.route('/<int:admin_id>/change-password', methods=['POST'])
@jwt_required()
def update_admin(admin_id):
    if get_jwt_identity()["role"] != "admin":
        return jsonify({'error': 'Not enough permission'}), 403
    try:
        class AdminPasswordSchema(Schema):
            password = fields.Str(required=True)
        
        AdminPasswordSchema().load(request.json)
    except ValidationError as err:
        return jsonify(err.messages), 400
    same_id = db_session.query(Admin).filter(Admin.id == admin_id)
    if same_id.count() > 0:
        same_id.first().password = bcrypt.generate_password_hash(request.json['password']).decode('utf-8')
        db_session.commit()
        return jsonify("The admin was updated"), 201
    return jsonify({'message': 'The admin was not found'}), 404

@mod.route('/<int:admin_id>', methods=['DELETE'])
@jwt_required()
def delete_admin(admin_id):
    if get_jwt_identity()["role"] != "admin":
        return jsonify({'error': 'Not enough permission'}), 403
    same_id = db_session.query(Admin).filter(Admin.id == admin_id)
    if same_id.count() > 0:
        db_session.delete(same_id.first())
        db_session.commit()
        return "The admin was successfully deleted", 204
    return jsonify({'message': 'The admin was not found'}), 404
    
@mod.route("/login", methods=["POST"], endpoint='login')
def login():
    class Admininfo(Schema):
        login = fields.Str(required=True)
        password = fields.Str(required=True)
    try:
        if not request.json:
            raise ValidationError('No input data provided')
        Admininfo().load(request.json)
    except ValidationError as err:
        return jsonify(err.messages), 400
    db_admin = db_session.query(Admin).filter(Admin.login == request.json['login']).first()
    if db_admin is None:
        return jsonify({'message': 'User not found'}), 404
    if not bcrypt.check_password_hash(db_admin.password, request.json['password']):
        return jsonify({'message': 'Incorrect password'}), 401
        
    admin_identity = {"id": db_admin.id, "role": "admin"}
    access_token = create_access_token(identity=admin_identity, expires_delta=timedelta(days=1))
    return jsonify({'token': access_token, 'id': db_admin.id}), 200

