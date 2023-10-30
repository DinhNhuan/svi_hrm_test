
import os
from flask import Flask, Blueprint, g, render_template

from src.routes.auth import auth_bp
from src.routes.employee import employee_bp
from src.routes.service import service_bp

from src.common.utils import init_log_file
from flask_cors import CORS
from app_config import config

current_dir = os.path.dirname(__file__)
current_dir = current_dir.replace('\\', '/')
template_folder = current_dir + '/../client/dist'
static_folder = current_dir + '/..//client/dist/assets'



app = Flask(__name__,
            template_folder=template_folder,
            static_folder=static_folder
            )

CORS(app)

# Initialize logging configuration
log_file = os.path.join(config.LOG_DIR,  'hrm.log')
init_log_file(log_file)


app_root = config.APPLICATION_ROOT
parent = Blueprint('index', __name__, url_prefix=app_root)

parent.register_blueprint(auth_bp, url_prefix='/auth')
parent.register_blueprint(employee_bp, url_prefix='/employee')
parent.register_blueprint(service_bp, url_prefix='/service')

app.register_blueprint(parent)


@app.route('/')
@app.route('/login')
@app.route('/dashboard')
@app.route('/employees')
@app.route('/reports-and-analytics/catalogue')
@app.route('/leave')
@app.route('/recruitment')
@app.route('/performance')
@app.route('/admin/system-users')
def index():
    return render_template('./index.html')


@app.route('/employee/<id>/profile')
@app.route('/employee/<id>/personal-details')
def index1(id):
    return render_template('./index.html')
