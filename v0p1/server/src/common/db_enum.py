class DBTableName:
    EMPLOYEES = 'employees'
    EMPLOYEE_ROLE = 'employee_role'
    EMPLOYEE_TOKENS = 'employee_tokens'
    GROUPS = 'groups'
    ATTRIBUTES = 'attributes'
    ATTRIBUTE_VALUES = 'attribute_values'
    GROUP_ATTRIBUTES = 'group_attributes'
    ATTRIBUTE_DISPLAY   =   "attribute_display"
    EMPLOYEE_ATTRIBUTE_VALUES = 'employee_attribute_values'


class DBViewName:
    VIEW_EMPLOYEE_ROLE = 'v_employee_role'
    VIEW_EMPLOYEE_ATTRIBUTE = 'v_employee_attribute'
class DBTableFields:

    # Common
    CREATED_AT = 'created_at'

    # Employees
    EMPLOYEE_ID = 'employee_id'

    EMAIL = 'email'
    FIRST_NAME = 'first_name'
    MIDDLE_NAME = 'middle_name'
    LAST_NAME = 'last_name'
    IMAGE_URL = 'image_url'
    JOINED_DATE = 'joined_date'
    SVI_ID = 'svi_id'

    

    # Roles
    ROLE_ID = 'role_id'
    ROLE_ACCESSOR = 'role_accessor'
    ROLE_NAME = 'role_name'

    # Token
    TOKEN = 'token'

    #Status
    STATUS_ID = 'status_id'
    STATUS_NAME = 'status_name'

    # Groups 
    GROUP_ID = 'group_id'
    GROUP_NAME = 'group_name'
    GROUP_ORDER = 'group_order'
    GROUP_ACCESSOR = 'group_accessor'
    GROUP_DESCRIPTION = 'description'


    # Attributes 
    ATTRIBUTE_ID = 'attribute_id'
    ATTRIBUTE_NAME = 'attribute_name'
    ATTRIBUTE_TYPE = 'attribute_type'
    ATTRIBUTE_REQUIRED = 'is_required'
    ATTRIBUTE_ORDER = 'attribute_order'
    ATTRIBUTE_DESCRIPTION = 'description'
    ATTRIBUTE_ACCESSOR = 'attribute_accessor'
    IS_DISPLAY_TABLE = 'is_display_table'
    IS_ADD_USER_REQUIRED = 'is_add_user_required'


    # Values
    ATTRIBUTE_VALUE_ID = 'attribute_value_id'
    ATTRIBUTE_VALUE = 'attribute_value'


