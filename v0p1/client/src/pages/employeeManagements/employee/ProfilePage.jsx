import React from "react";
import { Layout } from "@/components/layout";
import { About, QuickAccess, LeaveToDay } from "@/components/widgets";
import { routeKeys } from "@/constants/routes";
import { useParams } from "react-router-dom";

const breadcrumbs = ["Employee Management", "My Info"];

const EmployeeProfile = () => {
  const { id } = useParams();
  const topMenus = [
    { name: "profile", link: `/employee/${id}/profile` },
    { name: "personal details", link: `/employee/${id}/personal-details` },
    { name: "report to"  },
    { name: "salary"},
  ];

  return (
    <Layout breadcrumbs={breadcrumbs} topMenus={topMenus}>
      <div className="flex justify-center items-center">
        <div className="flex items-stretch flex-wrap gap-4 max-w-6xl">
          <div className="basis-2/3-gap-4">
            <About />
          </div>
          <div className="basis-1/3-gap-4">
            <QuickAccess />
          </div>
          <div className="basis-1/3-gap-4">
            <LeaveToDay />
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default EmployeeProfile;
