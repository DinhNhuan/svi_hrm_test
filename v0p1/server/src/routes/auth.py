from flask import Blueprint, jsonify, request, current_app, make_response
import jwt
import time
import os
import datetime

from app_config import config
from src.common.utils import check_cridentials, generate_token, handle_log, token_required
from src.common.enum import LoggingLevel, TokenKeys
from src.common.routes import AuthRoutes, EmployeeRoutes
from src.common.db_enum import DBTableFields
from src.controllers.controller import Controllers


auth_bp = Blueprint('auth_bp', __name__)

controller = Controllers()


@auth_bp.route(AuthRoutes.SIGN_IN, methods=['POST'])
def sign_in():
    try:

        email = request.json.get('email')
        password = request.json.get('password')

        user_info = controller.get_user_by_email(email)

        time.sleep(1)
        if user_info:
            # is_valid = check_cridentials(request.json)
            is_valid = True

            if not is_valid or not email or not password:
                return jsonify(status="fail", message='Incorrect the email or password'), 200

            access_token = generate_token(email,
                                          config.HRM_ACCESS_TOKEN_SECRET_KEY,
                                          datetime.timedelta(
                                              hours=int(config.HRM_ACCESS_TOKEN_EXPIRATION)),
                                          optional={
                                              TokenKeys.USER_ID: user_info[DBTableFields.EMPLOYEE_ID],
                                              TokenKeys.ROLES: user_info[DBTableFields.ROLE_ID],
                                              TokenKeys.AVATAR: user_info[DBTableFields.IMAGE_URL]

                                          }
                                          )

            refresh_token = generate_token(email,
                                           config.HRM_REFRESH_TOKEN_SECRET_KEY,
                                           datetime.timedelta(
                                               hours=int(config.HRM_REFRESH_TOKEN_EXPIRATION)),
                                           optional={
                                               TokenKeys.USER_ID: user_info[DBTableFields.EMPLOYEE_ID],
                                               TokenKeys.ROLES: user_info[DBTableFields.ROLE_ID],
                                               TokenKeys.AVATAR: user_info[DBTableFields.IMAGE_URL]
                                           }
                                           )
            controller.save_refresh_token(
                user_info[DBTableFields.EMPLOYEE_ID], refresh_token)

            return jsonify(
                status="success",
                message="Login Successfully",
                data={
                    'token': access_token,
                    'refreshToken': refresh_token
                }), 200
        else:
            return jsonify(status="fail", message='Incorrect the email or password'), 200

    except Exception as e:
        handle_log(str(e), LoggingLevel.ERROR)
        return jsonify({'error': str(e)}), 403


@auth_bp.route(AuthRoutes.SIGN_OUT, methods=['GET'])
def sign_out():
    # if user_id:
    #     controller.remove_refresh_token(user_id)

    return jsonify(data={'message': 'Logout successfully'}), 200


# Route for refreshing an access token using a valid refresh token
@auth_bp.route(AuthRoutes.REFRESH, methods=['POST'])
def refresh_token():

    refresh_token = request.json.get('refreshToken').strip('"')
    if not refresh_token:
        return jsonify({'message': 'Refresh token is missing'}), 401

    try:
        data = jwt.decode(
            refresh_token, config.HRM_REFRESH_TOKEN_SECRET_KEY, algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Refresh token has expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'message': 'Invalid refresh token'}), 401

    # Generate a new access token
    username = data['sub']
    access_token = generate_token(username,
                                  config.HRM_ACCESS_TOKEN_SECRET_KEY,
                                  datetime.timedelta(
                                      hours=int(config.HRM_ACCESS_TOKEN_EXPIRATION)),
                                  optional={
                                      TokenKeys.USER_ID: data[TokenKeys.USER_ID],
                                      TokenKeys.ROLES: data[TokenKeys.ROLES],
                                      TokenKeys.AVATAR: data[TokenKeys.AVATAR]
                                  }
                                  )

    return jsonify({'accessToken': access_token})
