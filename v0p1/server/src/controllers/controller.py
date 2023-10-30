from src.controllers.authController import AuthController
from src.controllers.employeeController import EmployeeController
from src.models.model import Models

class Controllers(AuthController, EmployeeController):
    def __init__(self):
        self.model = Models()