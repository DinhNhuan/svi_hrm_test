import os
from flask import Blueprint, jsonify, request, current_app, send_from_directory
from werkzeug.utils import secure_filename

from app_config import config
from src.common.routes import ServiceRoutes
from src.common.utils import token_required, generate_image_name
import traceback

service_bp = Blueprint('service_bp', __name__)


@service_bp.route(ServiceRoutes.UPLOAD_IMAGE, methods=['POST'])
@token_required
def upload_image():
    try:

        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 401
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 401

        if file:
            filename = secure_filename(file.filename)
            file_id = generate_image_name(config.UPLOAD_FOLDER)
            print(file_id)
            file.save(os.path.join(config.UPLOAD_FOLDER, str(file_id)))
            
            image_url = request.host_url + \
                config.APPLICATION_ROOT + '/service' + \
                ServiceRoutes.VIEW_PHOTO + "/" + str(file_id)
            
            return jsonify({'message': 'File uploaded', 'url': image_url}), 201
    except Exception as e:
        print(e)
        traceback.print_exc()
        return jsonify({'error': str(e)}), 403
    
@service_bp.route(ServiceRoutes.VIEW_PHOTO + '/<path:file_name>', methods=['GET'])
def render_image(file_name):
    upload_dir = config.UPLOAD_FOLDER
    return send_from_directory(upload_dir, path=file_name, mimetype='image/jpeg')


