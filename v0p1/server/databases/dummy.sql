-- EMployees
INSERT INTO employees (employee_id, employee_username) VALUES(1, 'nhuanhoang');

-- user roles
INSERT INTO roles
(role_id, role_name, role_display_name)
VALUES(1, 'admin', 'administration');
INSERT INTO roles
(role_id, role_name, role_display_name)
VALUES(2, 'employee', 'employee');

-- role types


INSERT INTO employee_role
(employee_role_id, employee_id, role_id)
VALUES(1, 1, 1);

-- Status
INSERT INTO status
(status_id, status_name)
VALUES(1, 'active');
INSERT INTO status
(status_id, status_name)
VALUES(2, 'inactive');

INSERT INTO employee_status
(employee_status_id, employee_id, status_id)
VALUES(1, 1, 1);


-- Groups   

INSERT INTO groups ( group_id , group_accessor, group_name, group_order) VALUES (1, 'personal_information', 'Personal Information', 1);
INSERT INTO groups ( group_id , group_accessor, group_name, group_order) VALUES (2, 'bank_account', 'Bank Account ( Only accept VietCombank Account)', 2);
INSERT INTO groups ( group_id ,group_accessor, group_name, group_order) VALUES (3, 'registration_address', 'Registration Address (Địa chỉ thường trú)', 3);
INSERT INTO groups ( group_id ,group_accessor, group_name, group_order) VALUES (4, 'contract_address', 'Contract Address (Địa chỉ tạm trú)', 4);
INSERT INTO groups ( group_id ,group_accessor, group_name, group_order) VALUES (5, 'identification_information', 'Identification Information', 5);
INSERT INTO groups ( group_id ,group_accessor, group_name, group_order) VALUES (6, 'social_insurance', 'Social Insurance / Personal Income Tax', 6);
INSERT INTO groups ( group_id ,group_accessor, group_name, group_order) VALUES (7, 'guardian_information', 'Guardian Information to contact in case of emergency', 7);
INSERT INTO groups ( group_id ,group_accessor, group_name, group_order) VALUES (8, 'household_registration', 'Household Registration Information (Hộ khẩu)', 8);
INSERT INTO groups ( group_id ,group_accessor, group_name, group_order) VALUES (9, 'education', 'Education', 9);
INSERT INTO groups ( group_id ,group_accessor, group_name, group_order) VALUES (10, 'experienced', 'For experienced employees', 10);


-- Attributes

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, attribute_order) 
VALUES ('fullName', 'Full Name', 'text', 1, 1 );

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, attribute_order) 
VALUES ('personal_email', 'Personal Email', 'text', 1, 2 );

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, attribute_order) 
VALUES ('previous_work', 'Previous work at Savarti as', 'text', 1, 3);

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, attribute_order) 
VALUES ('office_applied', 'Office Applied', 'select', 1, 4);

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, attribute_order) 
VALUES ('join_date', 'Joined Date', 'date', 1, 5);

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, attribute_order) 
VALUES ('date_of_birth', 'Date of Birth', 'date', 1, 6);

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, description, attribute_order) 
VALUES ('place_date_of_birth', 'Place of Birth in Full', 'text', 'Ex: Tp Hồ Chí Minh', 1, 7);

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, attribute_order) 
VALUES ('Commune_ward', 'Commune/ Ward (Xã/Phường)', 'text',0, 8);

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, attribute_order) 
VALUES ('district', 'District (Quận/Huyện)', 'text', 0, 9);

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, attribute_order) 
VALUES ('city', 'City', 'text', 0, 10 );

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, attribute_order) 
VALUES ('mobile_no', 'Mobile No', 'text', 1, 11);

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, attribute_order) 
VALUES ('place_of_origin', 'Place of origin (Quê quán)', 'text', 1, 12);

-- Bank account
INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, attribute_order) 
VALUES ('back_account', 'Bank Account Number', 'text', 1, 12 );

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, attribute_order) 
VALUES ('bank_brand', 'Bank Brand', 'text', 1, 13 );

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, attribute_order) 
VALUES ('registration_address', 'Registration Address(Số nhà , Đường)', 'text', 1, 14 );

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, attribute_order) 
VALUES ('registration_commune', 'Commune/Ward (Xã/Phường)', 'text', 1, 15 );

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, attribute_order) 
VALUES ('registration_district', 'District (Quận /Huyện)', 'text', 1, 16 );

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, attribute_order) 
VALUES ('registration_city', 'City (Tỉnh/ Tp)', 'text', 1, 17 );

-- Contact address
INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, attribute_order) 
VALUES ('contact_address', 'Contact Address', 'text', 1, 18 )

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, attribute_order) 
VALUES ('contact_commune', 'Contact - Commune/Ward (Xã/Phường)', 'text', 1, 19 )

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, attribute_order) 
VALUES ('contact_district', 'Contact - District (Quận/Huyện)', 'text', 1, 20 )

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, attribute_order) 
VALUES ('contact_city', 'Contact - City (Tỉnh/Tp)', 'text', 1, 21 )

-- Identification Information

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, attribute_order) 
VALUES ('id_no', 'ID No', 'text', 1, 22 )

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, attribute_order) 
VALUES ('id_issue_date', 'ID Issue Date', 'text', 1, 24 )

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, attribute_order) 
VALUES ('id_issue_place', 'ID issue place', 'text', 1, 25 )

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, attribute_order) 
VALUES ('cccd_no', 'CCCD No', 'text', 1, 26 )

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, attribute_order) 
VALUES ('cccd_issue_date', 'CCCD Issue date', 'text', 1, 27)

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, attribute_order) 
VALUES ('cccd_issue_place', 'CCCD issue place', 'text', 1, 28 )

-- Social Insurance / Personal Income Tax

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, description, attribute_order) 
VALUES ('si_id', 'SI_ID', 'text', 1, 'To check your Social Insurance (BHXH) if there is at https://baohiemxahoi.gov.vn/tracuu/Pages/tra-cuu-ho-gia-dinh.aspx', 29 )

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required,description,  attribute_order) 
VALUES ('social_health_check_place', 'Social Health Check Place (Nơi KCBBĐ)', 'text', 1, 'Nơi khám chữa bệnh ban đầu, nhân viên chọn nơi KCBBĐ dựa vào danh sách sau: HCM: https://drive.google.com/file/d/1vVxWlmSXpPY09BXC-21oVoSHbfTRrV4S/view DN: https://drive.google.com/file/d/1pyBCTd7A3stB7US5G4rSECjEa_FMdFPV/view Hue: https://drive.google.com/file/d/1wSxNuPT-hW0-ZUdBHJ9-I2-PD8DM9M2V/view', 30 )

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, description, attribute_order) 
VALUES ('tax_code', 'TAX Code', 'text', 1, 'To check personal Tax Code if there is at http://tracuunnt.gdt.gov.vn/tcnnt/mstcn.jsp', 31 )

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, attribute_order) 
VALUES ('tax_code_issue_date', 'Tax Code issue date', 'text', 1, 32 )

--Guardian Information to contact in case of emergency

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, attribute_order) 
VALUES ('guardian_01', 'Guardian 01', 'text', 1, 33)

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, attribute_order) 
VALUES ('guardian_01_contact_no', 'Guardian 01 Contact No', 'text', 1, 34)

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, attribute_order) 
VALUES ('guardian_02', 'Guardian 02', 'text', 1, 35)

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, attribute_order) 
VALUES ('guardian_02_contact_no', 'Guardian 02 Contact No', 'text', 1, 36)

--  Household Registration Information (Hộ khẩu)

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, attribute_order) 
VALUES ('household_registration_full_name', 'Household Registration - Full Name', 'text', 1, 37)

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, description, attribute_order) 
VALUES ('household_registration_contact_no', 'Household Registration - Contact No', 'text', 1, 'Hand-phone No',  38)

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, attribute_order) 
VALUES ('household_registration_book_no', 'Household Registration - Book No', 'text', 1, 39)

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, description, attribute_order) 
VALUES ('household_registration_address', 'Household Registration - Address', 'text', 1, 'Ex: 253 Hoàng Văn Thụ, Phường 3, Quận Tân Bình, Tp Hồ Chí Minh',  40)

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, description, attribute_order) 
VALUES ('household_registration_commun', 'Household - Commun/Ward (Xã/Phường)', 'text', 1, 'Ex: Phường 3',  41)

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, description, attribute_order) 
VALUES ('household_registration_commun', 'Household - District (Quận/Huyện)', 'text', 1, 'Ex: Quận Tân Bình',  42)

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, description, attribute_order) 
VALUES ('household_registration_city', 'Household - City (Tỉnh/Tp)', 'text', 1, 'Ex: Tp Hồ Chí Minh',  43)

-- 9 education
INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, description, attribute_order) 
VALUES ('high_school', 'High School', 'text', 1, 'Trường cấp ba - Thành phố',  44)

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, description, attribute_order) 
VALUES ('uni_extrance_exam', 'Uni Entrance Exam', 'text', 1, 'Điểm thi Đại Học',  45)

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, description, attribute_order) 
VALUES ('uni_extrance_exam', 'University', 'text', 1, 'Trường Đại Học',  46)

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, description, attribute_order) 
VALUES ('faculty', 'Faculty', 'text', 1, 'Khoa',  47)

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, description, attribute_order) 
VALUES ('major', 'Major (Chuyên ngành học)', 'text', 1, 'Chuyên ngành',  48)

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, attribute_order) 
VALUES ('year_graduated', 'Year Graduated', 'date', 1,  49)

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, attribute_order) 
VALUES ('GPA_4', 'GPA/4', 'text', 1,  50)

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, attribute_order) 
VALUES ('GPA_10', 'GPA/10', 'text', 1,  51)

-- 10. For experienced employees

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, attribute_order) 
VALUES ('year_of_experiences', 'Year of Experiences', 'text', 1,  52)

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, description, attribute_order) 
VALUES ('recent_company', 'Recent Company', 'text', 1, 'Công ty làm việc mới nhất',  53)

INSERT INTO attributes (attribute_accessor, attribute_name, attribute_type, is_required, attribute_order) 
VALUES ('position', 'Position', 'text', 1,  54)



INSERT INTO types (type_id, type_name, type_display) values (1, 'ess', 'ESS');
INSERT INTO types (type_id, type_name, type_display) values (2, 'supervisor', 'Supervisor');
INSERT INTO types (type_id, type_name, type_display) values (3, 'Admin', 'admin');

INSERT INTO attribute_display (attribute_id) values (53);
INSERT INTO attribute_display (attribute_id) values (54);
INSERT INTO attribute_display (attribute_id) values (55);
INSERT INTO attribute_display (attribute_id) values (56);
INSERT INTO attribute_display (attribute_id) values (57);
INSERT INTO attribute_display (attribute_id) values (58);




CREATE OR REPLACE VIEW v_employee_attribute AS 
SELECT 
    v_employee_cols.employee_id,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'image_url' THEN v_employee_cols.attribute_value END) AS image_url,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'email' THEN v_employee_cols.attribute_value END) AS email,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'first_name' THEN v_employee_cols.attribute_value END) AS first_name,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'middle_name' THEN v_employee_cols.attribute_value END) AS middle_name,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'last_name' THEN v_employee_cols.attribute_value END) AS last_name,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'full_name' THEN v_employee_cols.attribute_value END) AS full_name,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'commune_ward' THEN v_employee_cols.attribute_value END) AS commune_ward,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'GPA_10' THEN v_employee_cols.attribute_value END) AS GPA_10,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'GPA_4' THEN v_employee_cols.attribute_value END) AS GPA_4,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'back_account' THEN v_employee_cols.attribute_value END) AS back_account,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'bank_brand' THEN v_employee_cols.attribute_value END) AS bank_brand,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'cccd_issue_date' THEN v_employee_cols.attribute_value END) AS cccd_issue_date,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'cccd_issue_place' THEN v_employee_cols.attribute_value END) AS cccd_issue_place,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'cccd_no' THEN v_employee_cols.attribute_value END) AS cccd_no,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'city' THEN v_employee_cols.attribute_value END) AS city,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'contact_address' THEN v_employee_cols.attribute_value END) AS contact_address,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'contact_city' THEN v_employee_cols.attribute_value END) AS contact_city,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'contact_commune' THEN v_employee_cols.attribute_value END) AS contact_commune,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'contact_district' THEN v_employee_cols.attribute_value END) AS contact_district,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'date_of_birth' THEN v_employee_cols.attribute_value END) AS date_of_birth,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'district' THEN v_employee_cols.attribute_value END) AS district,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'faculty' THEN v_employee_cols.attribute_value END) AS faculty,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'fullName' THEN v_employee_cols.attribute_value END) AS fullName,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'guardian_01' THEN v_employee_cols.attribute_value END) AS guardian_01,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'guardian_01_contact_no' THEN v_employee_cols.attribute_value END) AS guardian_01_contact_no,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'guardian_02' THEN v_employee_cols.attribute_value END) AS guardian_02,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'guardian_02_contact_no' THEN v_employee_cols.attribute_value END) AS guardian_02_contact_no,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'high_school' THEN v_employee_cols.attribute_value END) AS high_school,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'household_registration_address' THEN v_employee_cols.attribute_value END) AS household_registration_address,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'household_registration_book_no' THEN v_employee_cols.attribute_value END) AS household_registration_book_no,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'household_registration_city' THEN v_employee_cols.attribute_value END) AS household_registration_city,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'household_registration_commun' THEN v_employee_cols.attribute_value END) AS household_registration_commun,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'household_registration_contact_no' THEN v_employee_cols.attribute_value END) AS household_registration_contact_no,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'household_registration_full_name' THEN v_employee_cols.attribute_value END) AS household_registration_full_name,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'id_issue_date' THEN v_employee_cols.attribute_value END) AS id_issue_date,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'id_issue_place' THEN v_employee_cols.attribute_value END) AS id_issue_place,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'id_no' THEN v_employee_cols.attribute_value END) AS id_no,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'joined_date' THEN v_employee_cols.attribute_value END) AS joined_date,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'major' THEN v_employee_cols.attribute_value END) AS major,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'mobile_no' THEN v_employee_cols.attribute_value END) AS mobile_no,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'office_applied' THEN v_employee_cols.attribute_value END) AS office_applied,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'personal_email' THEN v_employee_cols.attribute_value END) AS personal_email,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'place_date_of_birth' THEN v_employee_cols.attribute_value END) AS place_date_of_birth,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'place_of_origin' THEN v_employee_cols.attribute_value END) AS place_of_origin,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'position' THEN v_employee_cols.attribute_value END) AS position,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'previous_work' THEN v_employee_cols.attribute_value END) AS previous_work,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'recent_company' THEN v_employee_cols.attribute_value END) AS recent_company,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'registration_address' THEN v_employee_cols.attribute_value END) AS registration_address,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'registration_city' THEN v_employee_cols.attribute_value END) AS registration_city,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'registration_commune' THEN v_employee_cols.attribute_value END) AS registration_commune,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'registration_district' THEN v_employee_cols.attribute_value END) AS registration_district,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'si_id' THEN v_employee_cols.attribute_value END) AS si_id,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'social_health_check_place' THEN v_employee_cols.attribute_value END) AS social_health_check_place,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'tax_code' THEN v_employee_cols.attribute_value END) AS tax_code,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'tax_code_issue_date' THEN v_employee_cols.attribute_value END) AS tax_code_issue_date,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'uni_extrance_exam' THEN v_employee_cols.attribute_value END) AS uni_extrance_exam,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'year_graduated' THEN v_employee_cols.attribute_value END) AS year_graduated,
    MAX(CASE WHEN v_employee_cols.attribute_accessor = 'year_of_experiences' THEN v_employee_cols.attribute_value END) AS year_of_experiences
FROM v_employee_cols GROUP BY employee_id;
    