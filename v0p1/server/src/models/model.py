from pprint import pprint
from src.models.server import DbConnection
from src.common.db_enum import DBTableName, DBTableFields, DBViewName


class EmployeeModel():
    def __init__():
        pass
    

    def init_value(self):
        sql = f""" INSERT INTO {DBTableName.ATTRIBUTE_VALUES} ( {DBTableFields.ATTRIBUTE_VALUE}) VALUES ('');"""
        value_id = self.db_execute_return_id(sql)
        return value_id
    
    def add_user_role(self, user_id, role_id):
        sql =   f"""
                    INSERT INTO {DBTableName.EMPLOYEE_ROLE}
                        ({DBTableFields.EMPLOYEE_ID}, {DBTableFields.ROLE_ID})
                    VALUES ({user_id}, {role_id})
                """
        self.db_execute_return_id(sql)
    
    def save_attribute_value(self, user_id, attribute_id, value_id):
        sql = f""" INSERT INTO {DBTableName.EMPLOYEE_ATTRIBUTE_VALUES}
                         ( {DBTableFields.EMPLOYEE_ID}, {DBTableFields.ATTRIBUTE_ID}, {DBTableFields.ATTRIBUTE_VALUE_ID}) 
                    VALUES ({user_id}, {attribute_id}, {value_id});
                    """
        self.db_execute(sql)

    def get_group_attributes(self):

        output = []
        sql_query = f"""
                    SELECT 
                        `{DBTableName.GROUPS}`.`{DBTableFields.GROUP_ID}`,
                        `{DBTableName.GROUPS}`.`{DBTableFields.GROUP_NAME}`,
                        `{DBTableName.GROUPS}`.`{DBTableFields.GROUP_ORDER}`,
                        `{DBTableName.GROUPS}`.`{DBTableFields.GROUP_ACCESSOR}`,
                        `{DBTableName.ATTRIBUTES}`.`{DBTableFields.ATTRIBUTE_ID}`,
                        `{DBTableName.ATTRIBUTES}`.`{DBTableFields.ATTRIBUTE_NAME}`,
                        `{DBTableName.ATTRIBUTES}`.`{DBTableFields.ATTRIBUTE_TYPE}`,
                        `{DBTableName.ATTRIBUTES}`.`{DBTableFields.ATTRIBUTE_REQUIRED}`,
                        `{DBTableName.ATTRIBUTES}`.`{DBTableFields.ATTRIBUTE_ORDER}`,
                        `{DBTableName.ATTRIBUTES}`.`{DBTableFields.ATTRIBUTE_DESCRIPTION}`,
                        `{DBTableName.ATTRIBUTES}`.`{DBTableFields.ATTRIBUTE_ACCESSOR}`
                    FROM {DBTableName.GROUP_ATTRIBUTES}
                    INNER JOIN {DBTableName.GROUPS} ON {DBTableName.GROUPS}.{DBTableFields.GROUP_ID} = {DBTableName.GROUP_ATTRIBUTES}.{DBTableFields.GROUP_ID}
                    INNER JOIN {DBTableName.ATTRIBUTES} ON {DBTableName.ATTRIBUTES}.{DBTableFields.ATTRIBUTE_ID} = {DBTableName.GROUP_ATTRIBUTES}.{DBTableFields.ATTRIBUTE_ID}
                    """

        rows = self.db_query(sql_query)
        if rows:
            group = {}
            
            for row in rows:
                group_accessor = row[DBTableFields.GROUP_ACCESSOR]
                attribute = {}
                attribute['id'] = row[DBTableFields.ATTRIBUTE_ID]
                attribute['name'] = row[DBTableFields.ATTRIBUTE_NAME]
                attribute['accessor'] = row[DBTableFields.ATTRIBUTE_ACCESSOR]
                attribute['type'] = row[DBTableFields.ATTRIBUTE_TYPE]
                attribute['isRequired'] = row[DBTableFields.ATTRIBUTE_REQUIRED]
                attribute['description'] = row[DBTableFields.ATTRIBUTE_DESCRIPTION]
                attribute['order'] = row[DBTableFields.ATTRIBUTE_ORDER]

                try:
                   group[group_accessor] 
                except KeyError:
                    group[group_accessor]  = {}
                    group[group_accessor]['id'] = row[DBTableFields.GROUP_ID]
                    group[group_accessor]['name'] = row[DBTableFields.GROUP_NAME]
                    group[group_accessor]['accessor'] = row[DBTableFields.GROUP_ACCESSOR]
                    group[group_accessor]['order'] = row[DBTableFields.GROUP_ORDER]
                    group[group_accessor]['attributes'] = []
                group[group_accessor]['attributes'].append(attribute)
            # pprint(group)
            for item in group:
                output.append(group[item])

        return output


    def get_attributes(self):
        sql =  f""" 
                    SELECT 
                        {DBTableFields.ATTRIBUTE_ID},
                        {DBTableFields.ATTRIBUTE_ACCESSOR}
                    FROM {DBTableName.ATTRIBUTES}
                """
        rows = self.db_query(sql)
        output = []
        if rows:
            for row in rows:
                item = {}
                item[DBTableFields.ATTRIBUTE_ID] = row[DBTableFields.ATTRIBUTE_ID]
                item[DBTableFields.ATTRIBUTE_ACCESSOR] = row[DBTableFields.ATTRIBUTE_ACCESSOR]
                output.append(item)
        return output


    def check_email_exist_in_db(self, email):
        sql_query = f"""
                        SELECT {DBTableFields.EMPLOYEE_ID}  
                        FROM {DBTableName.EMPLOYEES} 
                        WHERE {DBTableFields.EMAIL} = '{email}'
                    """
        rows = self.db_query(sql_query)
        if (rows):
            return True
        else:
            return False

    def add_user(self,email ):
        sql_query = f"""
                        INSERT INTO {DBTableName.EMPLOYEES}
                            ({DBTableFields.EMAIL})
                        VALUES ("{email}")                         
                    """
        user_id = self.db_execute_return_id(sql_query)
        return user_id
    
    def add_attribute_value(self, attr_value):
        sql = f"""
                    INSERT INTO {DBTableName.ATTRIBUTE_VALUES}
                        ({DBTableFields.ATTRIBUTE_VALUE})
                    VALUES ("{attr_value}")                         
                """
        attr_value_id = self.db_execute_return_id(sql)
        return attr_value_id
    
    def get_attribute_id_by_accessor(self, attr_accessor):
        sql = f"""  SELECT {DBTableFields.ATTRIBUTE_ID}
                    FROM {DBTableName.ATTRIBUTES}
                    WHERE {DBTableFields.ATTRIBUTE_ACCESSOR} = "{attr_accessor}"
                """
        
        attr_id = None
        rows = self.db_query(sql)
        if rows:
            attr_id = rows[0][DBTableFields.ATTRIBUTE_ID]
        return attr_id


class Models(DbConnection, EmployeeModel):
    def __init__(self):
        DbConnection.__init__(self)
    
    def get_user_by_email(self, email):

        sql_query = f"""
                        SELECT 
                            {DBViewName.VIEW_EMPLOYEE_ROLE}.{DBTableFields.EMPLOYEE_ID},
                            {DBViewName.VIEW_EMPLOYEE_ROLE}.{DBTableFields.EMAIL},
                            {DBViewName.VIEW_EMPLOYEE_ROLE}.{DBTableFields.ROLE_ID},
                            {DBViewName.VIEW_EMPLOYEE_ROLE}.{DBTableFields.ROLE_ACCESSOR},
                            {DBViewName.VIEW_EMPLOYEE_ROLE}.{DBTableFields.ROLE_NAME},
                            {DBViewName.VIEW_EMPLOYEE_ATTRIBUTE}.{DBTableFields.IMAGE_URL}
                        FROM {DBViewName.VIEW_EMPLOYEE_ROLE}
                        INNER JOIN {DBViewName.VIEW_EMPLOYEE_ATTRIBUTE} ON {DBViewName.VIEW_EMPLOYEE_ATTRIBUTE}.{DBTableFields.EMPLOYEE_ID} = {DBViewName.VIEW_EMPLOYEE_ROLE}.{DBTableFields.EMPLOYEE_ID}
                        WHERE {DBViewName.VIEW_EMPLOYEE_ROLE}.{DBTableFields.EMAIL} = "{email}";
                    """
        rows = self.db_query(sql_query)
        user = {}
        if rows:
            for row in rows:
                user[DBTableFields.EMPLOYEE_ID] = row[DBTableFields.EMPLOYEE_ID]
                user[DBTableFields.EMAIL] = row[DBTableFields.EMAIL]
                user[DBTableFields.IMAGE_URL] = row[DBTableFields.IMAGE_URL]

                if DBTableFields.ROLE_ID not in user:
                    user[DBTableFields.ROLE_ID] = []
                    
                user[DBTableFields.ROLE_ID].append({
                                                        'id': row[DBTableFields.ROLE_ID],
                                                        'name': row[DBTableFields.ROLE_NAME],
                                                        'accessor': row[DBTableFields.ROLE_ACCESSOR],
                                                    })
             
        return user
    

    def save_refresh_token(self, user_id, refresh_token):
        sql_query = f"""
                        INSERT INTO {DBTableName.EMPLOYEE_TOKENS} 
                            ({DBTableFields.EMPLOYEE_ID}, {DBTableFields.TOKEN})
                        VALUES 
                            ('{user_id}', '{refresh_token}');
                    """
        self.db_execute(sql_query)

    def remove_refresh_token(self, user_id):
        sql_query = f"""
                        DELETE FROM 
                            {DBTableName.EMPLOYEE_TOKENS} 
                        WHERE {DBTableFields.EMPLOYEE_ID} = '{user_id}';
                    """
        self.db_execute(sql_query)

    def get_user_profile(self, user_id):
        sql = f"""
                SELECT 
                    {DBTableFields.EMAIL},
                    {DBTableFields.EMPLOYEE_ID},
                    {DBTableFields.FIRST_NAME},
                    {DBTableFields.MIDDLE_NAME},
                    {DBTableFields.LAST_NAME},
                    {DBTableFields.JOINED_DATE},
                    {DBTableFields.SVI_ID},
                    {DBTableFields.IMAGE_URL}
                FROM {DBViewName.VIEW_EMPLOYEE_ATTRIBUTE} 
                WHERE {DBTableFields.EMPLOYEE_ID} = {user_id}
                """
        rows = self.db_query(sql)
        output = {}
        if rows:
            for row in rows:
                output['id'] = row[DBTableFields.EMPLOYEE_ID]
                output['email'] = row[DBTableFields.EMAIL]
                output['firstName'] = row[DBTableFields.FIRST_NAME]
                output['middleName'] = row[DBTableFields.MIDDLE_NAME]
                output['lastName'] = row[DBTableFields.LAST_NAME]
                output['joinedDate'] = row[DBTableFields.JOINED_DATE]
                output['employeeId'] = row[DBTableFields.SVI_ID]
                output['image'] = row[DBTableFields.IMAGE_URL]
        return output
    
    def get_table_headers(self):
        sql = f"""
                SELECT 
                    {DBTableName.ATTRIBUTES}.{DBTableFields.ATTRIBUTE_ID},
                    {DBTableName.ATTRIBUTES}.{DBTableFields.ATTRIBUTE_NAME},
                    {DBTableName.ATTRIBUTES}.{DBTableFields.ATTRIBUTE_ACCESSOR},
                    {DBTableName.ATTRIBUTES}.{DBTableFields.ATTRIBUTE_DESCRIPTION},              
                    {DBTableName.ATTRIBUTES}.{DBTableFields.ATTRIBUTE_ORDER}              
                FROM {DBTableName.ATTRIBUTES}
                WHERE {DBTableFields.IS_DISPLAY_TABLE} = '1'
                ORDER BY {DBTableName.ATTRIBUTES}.{DBTableFields.ATTRIBUTE_ORDER};
                """
        rows = self.db_query(sql)
        output = []
        if rows:
            for row in rows:
                item = {}
                item['id'] = row[DBTableFields.ATTRIBUTE_ID]
                item['name'] = row[DBTableFields.ATTRIBUTE_NAME]
                item['accessor'] = row[DBTableFields.ATTRIBUTE_ACCESSOR]
                item['description'] = row[DBTableFields.ATTRIBUTE_DESCRIPTION]
                item['order'] = row[DBTableFields.ATTRIBUTE_ORDER]
                output.append(item)

        return output
    
    def get_employee_list(self, headers, current_user_id):
        header_accessors = []
        order_by = ''
        for item in headers:
            header_accessors.append(item['accessor'])
            if 'svi_id' == item['accessor']:
                order_by = 'ORDER BY svi_id'

        str_headers = ",".join(header_accessors)
       
       

        sql = f"""
            SELECT 
                {DBTableFields.EMPLOYEE_ID},
                {DBTableFields.FIRST_NAME},
                {DBTableFields.LAST_NAME},
                {DBTableFields.MIDDLE_NAME},
                {str_headers}
            FROM {DBViewName.VIEW_EMPLOYEE_ATTRIBUTE} 
            WHERE {DBTableFields.EMPLOYEE_ID} != {current_user_id} {order_by}
        """
        rows = self.db_query(sql)
        output = []
        if rows:
            for row in rows:
                employee = {}
                employee['id'] = row[DBTableFields.EMPLOYEE_ID]
                first_name = row[DBTableFields.FIRST_NAME]
                last_name = row[DBTableFields.LAST_NAME]
                middle_name = row[DBTableFields.MIDDLE_NAME]
                for accessor in header_accessors:
                    employee[accessor] = row[accessor]  
                employee['full_name'] = f"{last_name} {middle_name} {first_name}"
                output.append(employee)

        return output
    
    def get_employee_info(self, user_id):
        sql  = f"""
                    SELECT * 
                    FROM {DBViewName.VIEW_EMPLOYEE_ATTRIBUTE}
                    WHERE {DBTableFields.EMPLOYEE_ID} = '{user_id}'
                """
        rows = self.db_query(sql)
        output = {}
        if rows:
            output= rows[0]
                
        return output
    
    def update_employee_info(self, user_id, payload):
        fields = []
        for item in payload:
            fields.append(f"""{item}="{payload[item]}""")
        
        if fields:
            field_update = ", ".join(fields)
            sql  = f"""
                        UPDATE {DBTableName.ATTRIBUTE_VALUES}
                        SET {field_update}
                        FROM {DBViewName.VIEW_EMPLOYEE_ATTRIBUTE}
                        WHERE {DBTableFields.EMPLOYEE_ID} = '{user_id}'
                    """
            rows = self.db_query(sql)
            output = {}
            if rows:
                output= rows[0]
                    
            return output
        
    def get_value_id(self, user_id, attr_id):
        sql = f"""
                SELECT 
                    {DBTableName.EMPLOYEE_ATTRIBUTE_VALUES}.{DBTableFields.ATTRIBUTE_VALUE_ID}
                FROM {DBTableName.EMPLOYEE_ATTRIBUTE_VALUES}
                WHERE {DBTableName.EMPLOYEE_ATTRIBUTE_VALUES}.{DBTableFields.EMPLOYEE_ID} = {user_id}
                AND {DBTableName.EMPLOYEE_ATTRIBUTE_VALUES}.{DBTableFields.ATTRIBUTE_ID} = {attr_id};
                """
        rows = self.db_query(sql)
        output = None
        if rows:
            output = rows[0][DBTableFields.ATTRIBUTE_VALUE_ID]
        return output


    def get_user_create_fields(self):
        sql = f"""
                SELECT 
                    {DBTableName.ATTRIBUTES}.{DBTableFields.ATTRIBUTE_ID},
                    {DBTableName.ATTRIBUTES}.{DBTableFields.ATTRIBUTE_NAME},
                    {DBTableName.ATTRIBUTES}.{DBTableFields.ATTRIBUTE_ACCESSOR},
                    {DBTableName.ATTRIBUTES}.{DBTableFields.ATTRIBUTE_TYPE},
                    {DBTableName.ATTRIBUTES}.{DBTableFields.ATTRIBUTE_REQUIRED},
                    {DBTableName.ATTRIBUTES}.{DBTableFields.ATTRIBUTE_DESCRIPTION},              
                    {DBTableName.ATTRIBUTES}.{DBTableFields.ATTRIBUTE_ORDER}              
                FROM {DBTableName.ATTRIBUTES}
                WHERE {DBTableFields.IS_ADD_USER_REQUIRED} = '1'
                ORDER BY {DBTableFields.ATTRIBUTE_ORDER};
                """
        rows = self.db_query(sql)
        output = []
        if rows:
            for row in rows:
                item = {}
                item['id'] = row[DBTableFields.ATTRIBUTE_ID]
                item['name'] = row[DBTableFields.ATTRIBUTE_NAME]
                item['accessor'] = row[DBTableFields.ATTRIBUTE_ACCESSOR]
                item['type'] = row[DBTableFields.ATTRIBUTE_TYPE]
                item['required'] = row[DBTableFields.ATTRIBUTE_REQUIRED]
                item['description'] = row[DBTableFields.ATTRIBUTE_DESCRIPTION]
                item['order'] = row[DBTableFields.ATTRIBUTE_ORDER]
                output.append(item)

        return output
    

    def update_attribute_value(self, attr_value_id, attr_value):
        sql =   f"""
                    UPDATE  {DBTableName.ATTRIBUTE_VALUES}
                    SET {DBTableFields.ATTRIBUTE_VALUE} = "{attr_value}"
                    WHERE {DBTableFields.ATTRIBUTE_VALUE_ID} = {attr_value_id}
                """
        self.db_execute(sql)




    def get_attribute_value_by_attribute_accessor(self, attribute_accessor, user_id= None):

        sql_conditon = ""
        if user_id != None: 
            sql_conditon = "WHERE {DBTableFields.EMPLOYEE_ID} = {user_id}"

        sql =   f"""
                    SELECT 
                        {attribute_accessor}
                    FROM {DBViewName.VIEW_EMPLOYEE_ATTRIBUTE}
                    {sql_conditon} ORDER BY {attribute_accessor}    
                """
        rows = self.db_query(sql)
        output = []
        for row in rows:
            output.append(row[attribute_accessor])
        return output
