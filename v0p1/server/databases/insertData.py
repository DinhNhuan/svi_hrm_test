

import re
from pprint import pprint
import pymysql
from pymysql.constants import CLIENT



def create_connection():
    """ create a database connection to the MYSQL database
    specified by db_file
    :param : None
    :return: Connection object or None
    """
    connection = None
    try:
        connection = pymysql.connect(host = '192.168.200.59',
                        port         = 3306,
                        user         = 'hrm',
                        password     = 'hrm_svi4ams!',
                        db           = 'hrm_dev',
                        charset      = 'utf8mb4',
                        cursorclass  = pymysql.cursors.DictCursor,
                        client_flag  = CLIENT.MULTI_STATEMENTS
                        )
    
        return connection
    except Exception as e:
        print(e)

def execute_query(query):
    connection = create_connection()
    cursor = connection.cursor()
    cursor.execute(query)
    connection.commit()
    return cursor.lastrowid


execute_query('delete from group_attributes;')
execute_query('delete from attributes;')
execute_query('delete from groups;')



f = open('./data.py', 'r', encoding="utf8")
lines = f.readlines()
f.close()

list_groups = [
    ['personal_information', 'Personal Information'],
    ['bank_account', 'Bank Account ( Only accept VietCombank Account)'],
    ['registration_address', 'Registration Address (Địa chỉ thường trú)'],
    ['contract_address', 'Contract Address (Địa chỉ tạm trú)'],
    ['identification_information', 'Identification Information'],
    ['social_insurance', 'Social Insurance / Personal Income Tax'],
    ['guardian_information', 'Guardian Information to contact in case of emergency'],
    ['household_registration', 'Household Registration Information (Hộ khẩu)'],
    ['education', 'Education'],
    ['experienced', 'For experienced employees'],
]

items = {}
i = 0
for line in lines:
    if line and len(line) > 5:
        elements = list(filter(None, re.split('\|', line)))
        group_name = elements[0].strip()
        i+=1
        field = {
            'accessor': elements[1].strip(),
            'name': elements[2].strip(),
            'type': elements[3].strip(),
            'required': elements[4].strip(),
            'example': elements[5].strip() if len(elements) > 5 else '',
            'order': i
        }
        try:
            tmp = items[group_name]
        except KeyError:
            items[group_name] = []

        items[group_name].append(field)
grp_index= 0
for group in list_groups:
    grp_index+=1
    grp_accessor  = group[0]

    if grp_accessor in items:
        grp_query = f"""INSERT INTO groups ( group_id , group_accessor, group_name, group_order) VALUES ('{grp_index}', '{grp_accessor}', '{group[1]}', '{grp_index}');"""
        print(grp_query)
        grp_id = execute_query(grp_query)
        fields = items[grp_accessor]
        for field in fields:
            field_query = f"""  INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, attribute_order, description) 
                                VALUES ('{field['accessor']}', '{field['name']}', '{field['type']}','{field['required']}', {field['order']}, '{field['example']}');"""
            print(field_query)
            field_id = execute_query(field_query)

            grp_attr_query = f"""INSERT INTO group_attributes ( group_id , attribute_id) VALUES ('{grp_id}', '{field_id}');"""
            execute_query(grp_attr_query)

