import os

#get environment from wsgi settings
mode = os.environ['ENV_MODE']
app_dir = os.environ['APP_DIR']

# Setup access token information
HRM_ACCESS_TOKEN_SECRET_KEY = f'{mode}_access_token_secret_key'
HRM_ACCESS_TOKEN_EXPIRATION = '10000'  # minute

# Setup refresh token information
HRM_REFRESH_TOKEN_SECRET_KEY = f'{mode}_refresh_token_secret_key'
HRM_REFRESH_TOKEN_EXPIRATION = '30000000'  # minute


if mode == 'dev':
    DB_NAME = 'hrm_dev'
elif mode == 'pilot':
    DB_NAME = 'hrm_pilot'
elif mode == 'prod':
    DB_NAME = 'hrm'

DB_USER = 'hrm'
DB_PASS = 'hrm_svi4ams!'
DB_HOST = '192.168.200.59'
DB_PORT = 3306


# Setup prefix for server api
APPLICATION_ROOT = f'/api/v1'

# Config folder to upload image for the employee
UPLOAD_FOLDER = f'{app_dir}/workspaces/images'

# Log dir
LOG_DIR = f'{app_dir}/workspaces/log'
