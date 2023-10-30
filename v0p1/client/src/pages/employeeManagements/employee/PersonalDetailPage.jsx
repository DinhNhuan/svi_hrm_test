import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout";
import { fecthFields, getEmployeeInfo } from "@/api/employeeApi";
import { EmployeeAttributeForm } from "@/components/forms";

const breadcrumbs = ["Employee Management", "Employee List"];

const PersonalDetailPage = () => {
  const isFetchingAttributes = useRef(null);
  const isFetchingEmployeeInfo = useRef(null);

  const [employeeAttributes, setEmployeeAttributes] = useState([]);

  const [employeeInfo, setEmployeeInfo] = useState(null);

  const { id } = useParams();
  const topMenus = [
    { name: "profile", link: `/employee/${id}/profile` },
    { name: "personal details", link: `/employee/${id}/personal-details` },
    { name: "report to", link: "" },
    { name: "salary", link: "" },
  ];

  // Fetch employee information
  useLayoutEffect(() => {
    if (!isFetchingEmployeeInfo.current) {
      isFetchingEmployeeInfo.current = true;
      const fetchEmployeeInfo = async () => {
        let responses = await getEmployeeInfo({ id });
        setEmployeeInfo(responses.data);
      };
      fetchEmployeeInfo();
    }
  }, []);

  // Fetch attribute list
  useLayoutEffect(() => {
    if (!isFetchingAttributes.current) {
      isFetchingAttributes.current = true;
      const fetchEmployeeAttributes = async () => {
        let responses = await fecthFields();
        setEmployeeAttributes(responses.data);
      };
      fetchEmployeeAttributes();
    }
  }, []);


  return (
    <Layout breadcrumbs={breadcrumbs} topMenus={topMenus}>
      <div className="flex flex-col gap-10">
        {employeeAttributes &&
          employeeInfo &&
          employeeAttributes.map((employeeAttributes, index) => (
            <EmployeeAttributeForm
              key={index}
              group={employeeAttributes}
              employeeInfo={employeeInfo}
            />
          ))}
      </div>
    </Layout>
  );
};
export default PersonalDetailPage;
