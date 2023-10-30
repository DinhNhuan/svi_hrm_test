
import jwt
import datetime
import logging
import sys, os
from functools import wraps
from flask import request, jsonify
from logging.handlers import RotatingFileHandler
import traceback
import platform

from app_config import config

from src.common.enum import LoggingLevel


def check_cridentials(cridentials, domain=None):
    try:
        username = cridentials.get('username')
        password = cridentials.get('password')

        # Get the system's platform
        current_platform = platform.system()

        if current_platform == "Windows":
            print("The current system is running Windows.")

            import ctypes
            import ctypes.wintypes

            # Initialize variables
            token = ctypes.wintypes.HANDLE()
            logon_result = ctypes.windll.advapi32.LogonUserW(
                username,  # Username
                domain,    # Domain (or None for local authentication)
                password,  # Password
                2,         # Logon type: LOGON32_LOGON_NETWORK
                0,         # Logon provider: LOGON32_PROVIDER_DEFAULT
                ctypes.byref(token)  # Receives a handle to the logged-on user
            )

            # Close the token handle to release resources
            ctypes.windll.kernel32.CloseHandle(token)

            # Check the result
            if logon_result == 0:
                return False  # Authentication failed
            else:
                return True  # Authentication successful

        elif current_platform == "Linux":
            print("The current system is running Linux.")

            import pexpect

            run = pexpect.spawn('su %s' % str(username), timeout=100)
            # run.waitnoecho()
            run.expect('Password: ')
            run.sendline(password)
            run.sendline('echo current_user: `whoami`.')
            run.sendline('exit')
            log = run.read()
            run.close()
        else:
            print("The current system is running on an unknown platform.")
            return False

    except Exception as e:
        # Handle any exceptions that may occur during authentication
        print(f"Error during authentication: {str(e)}")
        return False  # Authentication failed
    

def generate_token(username,  secrect_key, expire_time, optional={}):    
    payload = {
        'sub': username,
        'exp': datetime.datetime.utcnow() + expire_time,  # Token expiration time
        **optional  # Include additional user-specific data
    }
    token = jwt.encode(payload,  secrect_key,  algorithm='HS256')
    return token

# Decorator for protecting routes with JWT authentication
def token_required(func):
    @wraps(func)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing'}), 401
        try:
            token = list(filter(None, token.split('Bearer')))[0].strip().strip('"')

            print("Token: ", len(token))
            print("SECRET_KEY", config.HRM_ACCESS_TOKEN_SECRET_KEY)
            # Verify and decode the token using the secret key
            data = jwt.decode(
                token, config.HRM_ACCESS_TOKEN_SECRET_KEY, algorithms=['HS256'])
        except jwt.ExpiredSignatureError as e:
            handle_log(str(e))
            return jsonify({'message': 'Token has expired'}), 401
        except jwt.InvalidTokenError as e:
            handle_log(str(e))
            return jsonify({'message': 'Invalid token'}), 401
        
        

        # Attach the token data to the request object for use in the route function
        request.current_user = data

        return func(*args, **kwargs)

    return decorated


def init_log_file(log_path):
    try:
            log_formatter = logging.Formatter('%(asctime)s %(levelname)s (%(lineno)d) %(message)s')
            log = logging.getLogger()
            
            handler = RotatingFileHandler(log_path,maxBytes= 500*1024,backupCount=10)
            handler.setFormatter(log_formatter)
            log.setLevel(logging.DEBUG)
            log.addHandler(handler)
    except Exception as e:
        print("Error occurred while creatting log file.")


def handle_log(msg, logging_level=LoggingLevel.INFO, is_exit=False):

    log_level = logging_level.strip().lower() if logging_level else LoggingLevel.INFO

    if log_level == LoggingLevel.INFO:
        logging.info(msg)
        print(f'[INFO]: {msg}')

    elif log_level == LoggingLevel.WARNING:
        logging.warn(msg)
        print(f'[WARN]: {msg}')

    elif log_level == LoggingLevel.ERROR:
        logging.error(msg)
        print(f'[ERROR]: {msg}')
        traceback.print_exc()
    elif log_level == LoggingLevel.DEBUG:
        logging.debug(msg)

    else:
        print(msg)

    if is_exit:
        sys.exit(0)

# List out all file in the upload  image dir, count  max number (file_name) and create a new file


def generate_image_name(upload_dir):

    if os.path.exists(upload_dir) and os.path.isdir(upload_dir):
        # List all files in the folder
        files = [int(f)for f in os.listdir(upload_dir) if os.path.isfile(os.path.join(upload_dir, str(f)))]
        if len(files):
            return max(files) + 1
    return 1

        