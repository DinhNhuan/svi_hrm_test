from flask import request
from src.common.utils import handle_log
from src.common.db_enum import DBTableFields
class EmployeeController():
    def __init__(self):
        pass

    def get_employee_attributues(self):
        group_attributes = self.model.get_group_attributes()
        return group_attributes  
    
    def check_email_exist_in_db(self, email):
        is_existed = self.model.check_email_exist_in_db(email)
        return is_existed
    
    def add_user(self, payload):

        # Add user
        email = payload.get('email')
        user_id = self.model.add_user(email)

        # Add Role 1. Admin 2. employee
        self.model.add_user_role(user_id, 2)

        list_item_added = []
        for item in payload:
            attr_value = payload[item]
            value_id = self.model.add_attribute_value(attr_value)
            attr_id = self.model.get_attribute_id_by_accessor(item)
            self.model.save_attribute_value(user_id, attr_id, value_id)
            list_item_added.append(attr_id)
        
        list_attributes = self.model.get_attributes()
        # Initialize attribute for new user
        for attribute in list_attributes:
            if (attribute[DBTableFields.ATTRIBUTE_ID] not in list_item_added):
                attr_value_id = self.model.init_value()
                self.model.save_attribute_value(user_id, attribute[DBTableFields.ATTRIBUTE_ID],attr_value_id )


        return user_id
    
    def get_user_profile(self, user_id):
        user = self.model.get_user_profile(user_id)
        return user
   
    def get_table_headers(self):
        headers = self.model.get_table_headers()
        return headers
    
    def get_employee_list(self):
        
        current_user_id = request.current_user['user_id']
        headers = self.model.get_table_headers()
        employees = self.model.get_employee_list(headers, current_user_id)
        return employees

    def get_employee_info(self, user_id):
        employee_infor = self.model.get_employee_info(user_id)
        return employee_infor
    
    def update_employee_info(self, user_id, payload):

        for attribute_accessor in payload:
            attr_id = self.model.get_attribute_id_by_accessor(attribute_accessor)
            value_id = self.model.get_value_id(user_id, attr_id)
            if(value_id != None):
                self.model.update_attribute_value(value_id, payload[attribute_accessor])
            else:        
                print(attribute_accessor)


    def get_user_create_fields(self):
        fields =self.model.get_user_create_fields()
        return fields

    def update_avatar(self, payload):
        user_id = payload.get('userId')
        image_url = payload.get('imageUrl')

        current_user = request.current_user
        current_id = current_user['user_id']
        roles = current_user['roles']
        is_admin = [role for role in roles if role['accessor'] == 'admin']
        if is_admin or current_id == user_id:
            attr_id = self.model.get_attribute_id_by_accessor(DBTableFields.IMAGE_URL)
            value_id = self.model.get_value_id(user_id, attr_id)
            self.model.update_attribute_value(value_id, image_url)
            return True
        else:
            return False
        
    def get_email_list_created(self):
        email_list = self.get_attribute_value(DBTableFields.EMAIL)
        return email_list
    
    def get_svi_id_list_created(self):
        id_list = self.get_attribute_value(DBTableFields.SVI_ID)
        return id_list

    def get_attribute_value(self, attribute_accessor, user_id= None):
        items = self.model.get_attribute_value_by_attribute_accessor(attribute_accessor, user_id)
        return items




