import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { Layout } from "@/components/layout";
const AdminRoute = ({ children, roleAllowed }) => {
  let location = useLocation();

  const { userInfo, isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
    return <p>Checking authenticaton..</p>;
  }

  if (!userInfo) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  const { roles } = userInfo;
  const isAccessible = roles.filter((role) =>
    roleAllowed.includes(role.accessor)
  );

  if (isAccessible.length > 0) {
    return children;
  } else {
    const topMenus = [
      { name: "My Info", link: `/employee/${userInfo.user_id}/profile` },
    ];
    return <Layout breadcrumbs={["Forbidden"]} topMenus={topMenus}></Layout>;
  }
};

export default AdminRoute;
