from flask import Blueprint, jsonify, request
from pprint import pprint
from src.common.routes import EmployeeRoutes
from src.common.utils import token_required
from src.controllers.controller import Controllers

employee_bp = Blueprint('employee_bp', __name__)

controller = Controllers()

@employee_bp.route(EmployeeRoutes.EMPLOYEES, methods=['GET'])
@token_required
def get_employees():
    try:
        return jsonify({'data': []}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 403


@employee_bp.route(EmployeeRoutes.GET_GROUP_ATTRIBUTES, methods=['GET'])
@token_required
def get_group_attributes():
    try:
        items = controller.get_employee_attributues()
        return jsonify({'message': 'success', 'data': items}), 201
    except Exception as e:
        print(e)
        return jsonify({'message': 'error', 'data': []}), 403
    
@employee_bp.route(EmployeeRoutes.EMAIL_VALID, methods=['POST'])
def check_email_exist_in_db():
    try:
        
        email = request.json.get('email')
        is_existed = controller.check_email_exist_in_db(email)
        return jsonify({'existed': is_existed}), 201
    except Exception as e:
        print(e)
        return jsonify({'message': 'error', 'data': []}), 403
    
@employee_bp.route(EmployeeRoutes.WIZARD, methods=['POST'])
def add_user():
    try:
        user_id = controller.add_user(request.json)
        return jsonify({'employeeId': user_id}), 201
    except Exception as e:
        print(e)
        return jsonify({'message': 'error', 'data': []}), 403
    
@employee_bp.route(EmployeeRoutes.GET_USER_PROFILE, methods=['GET'])
def get_user_profile():
    try:

        employee_id = request.args.get('employeeId')
        user_profile = controller.get_user_profile(employee_id)
        return jsonify(data=user_profile), 200
    except Exception as e:
        print(e)
        return jsonify({'message': 'error', 'data': []}), 403

@employee_bp.route(EmployeeRoutes.GET_TABLE_HEADERS, methods=['GET'])
def get_table_headers():
    try:
        headers = controller.get_table_headers()
        return jsonify(data=headers), 200
    except Exception as e:
        print(e)
        return jsonify({'message': 'error', 'data': []}), 403
    

@employee_bp.route(EmployeeRoutes.GET_EMPLOYEE_LIST, methods=['GET'])
@token_required
def get_employee_list():
    try:
        employees = controller.get_employee_list()
        return jsonify(data=employees), 200
    except Exception as e:
        print(e)
        return jsonify({'message': 'error', 'data': []}), 403
    

@employee_bp.route(EmployeeRoutes.GET_EMPLOYEE_INFO, methods=['POST'])
@token_required
def get_employee_info():
    try:
        user_id = request.json.get('id')
        employee_info = controller.get_employee_info(user_id)
        return jsonify(data=employee_info), 200
    except Exception as e:
        print(e)
        return jsonify({'message': 'error', 'data': []}), 403
    

@employee_bp.route(EmployeeRoutes.PATCH_EMPLOYEE_INFO, methods=['PATCH'])
@token_required
def update_employee_info(id):
    try:
        payload = request.json
        controller.update_employee_info(id, payload)

        return jsonify({"message": "success", "data":[]}), 200
    except Exception as e:
        print(e)
        return jsonify({'message': 'error', 'data': []}), 403

@employee_bp.route(EmployeeRoutes.GET_USER_CREATE_FIELDS, methods=['GET'])
@token_required
def get_user_create_fields():
    try:
        fields = controller.get_user_create_fields()
        return jsonify(data=fields), 200
    except Exception as e:
        print(e)
        return jsonify({'message': 'error', 'data': []}), 403


@employee_bp.route(EmployeeRoutes.UPDATE_AVATAR, methods=['POST'])
@token_required
def update_avatar():
    try:

        payload = request.json
        is_success = controller.update_avatar(payload)
        if is_success:
            return jsonify({'message': 'success', 'data': []}), 200
        return jsonify({'message': 'error', 'data': []}), 403
    except Exception as e:
        print(e)
        return jsonify({'message': 'error', 'data': []}), 403


@employee_bp.route(EmployeeRoutes.GET_EMAIL_LIST, methods=['GET'])
@token_required
def get_email_list_created():
    try:
        email_list = controller.get_email_list_created()
        return jsonify({'message': 'success', 'data': email_list}), 200
    except Exception as e:
        print(e)
        return jsonify({'message': 'error', 'data': []}), 403


@employee_bp.route(EmployeeRoutes.GET_SVI_ID_LIST, methods=['GET'])
@token_required
def get_svi_id_list_created():
    try:
        id_list = controller.get_svi_id_list_created()
        return jsonify({'message': 'success', 'data': id_list}), 200
    except Exception as e:
        print(e)
        return jsonify({'message': 'error', 'data': []}), 403
