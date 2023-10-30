import { useEffect, useState, useRef } from "react";
import { AiOutlinePlus } from "react-icons/ai";

import { Button } from "@/components/common";
import { Layout } from "@/components/layout";
import { EmployeeModal } from "@/components/modals";
import { getEmployeeList, getTableHeader } from "@/api/employeeApi";
import { useNavigate } from "react-router-dom";
import { defaultPhoto } from "@/assets/images";
import { useSelector } from "react-redux";

const EmployeeListPage = () => {
  const navigate = useNavigate();

  const initialFetchRequest = useRef(null);
  const isFetchHeaders = useRef(null);

  const { userInfo } = useSelector((state) => state.auth);

  const [employees, setEmployees] = useState(null);

  const [headers, setHeaders] = useState([]);

  const [currentPage, setCurrentPage] = useState(10);

  // fetch header
  useEffect(() => {
    if (!isFetchHeaders.current) {
      isFetchHeaders.current = true;
      const fecthHeaders = async () => {
        let response = await getTableHeader();
        setHeaders(response.data);
      };
      fecthHeaders();
    }
  }, []);

  // fetch employee list
  useEffect(() => {
    if (!initialFetchRequest.current) {
      initialFetchRequest.current = true;
      const fetchEmployees = async () => {
        let response = await getEmployeeList();
        setEmployees(response.data);
      };
      fetchEmployees();
    }
  }, [headers]);

  // state to track modal open/close
  const [isOpenModal, setIsOpenModal] = useState(false);

  // handle button add employee click
  const addEmployeeClick = () => {
    setIsOpenModal(true);
  };

  // Handle close modals add employee
  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handlePageChange = (e) => {
    const page = e.target.value;
    setCurrentPage(page);
  };

  const topMenus = [
    { name: "My Info", link: `/employee/${userInfo.user_id}/profile` },
  ];

  return (
    <Layout breadcrumbs={["Employee Management"]} topMenus={topMenus}>
      <div className="bg-white w-full p-5 py-8 rounded-3xl relative">
        {/* Button add new employee */}
        <Button
          isPadding={false}
          className="
                            flex
                            items-center
                            justify-center
                            
                            fixed
                            top-28 
                            right-8 
                            border 
                            w-50 
                            h-50 
                            z-20
                            p-4 
                            bg-primary-500
                            hover:bg-primary-400
                            text-white
                            rounded-full
                            shadow-xl
                            cursor-pointer
                            duration-300"
          onClick={addEmployeeClick}
        >
          <AiOutlinePlus />
        </Button>

        {/* Employee table list  */}
        <div className="w-full">
          <table className="w-full">
            {/* table header */}
            <thead className="w-full">
              <tr className="bg-reg-500 border-b w-full">
               
                {/* columns */}
                {headers &&
                  headers.map((header) => (
                    <th key={header.id} className={`
                            py-5  text-left 
                            ${header.accessor === 'svi_id' || header.accessor === 'image_url' ? 'max-w-[15px] ' : '' }
                    `}>
                      <span
                        className={`capitalize text-xs font-nutito text-secondary-600`}
                      >
                        {header.name}
                      </span>
                    </th>
                  ))}
              </tr>
            </thead>

            {/* Table body */}
            <tbody>
              {employees &&
                employees
                  .slice(
                    0,
                    currentPage === "all" ? employees.length : currentPage
                  )
                  ?.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b hover:bg-secondary-100 "
                    >

                      {/* rows */}
                      {employees &&
                        headers.map((column, index) => (
                          <td key={index} className="py-2.5 text-left">
                            {/* Avatar column */}
                            {column.accessor === "image_url" ? (
                              <div className="w-10 h-10  bg-secondary-500 rounded-full select-none overflow-hidden">
                                <img
                                  src={
                                    row[column.accessor]
                                      ? row[column.accessor]
                                      : defaultPhoto
                                  }
                                  alt="Avatar"
                                  className="object-cover w-full h-full"
                                />
                              </div>
                            ) : (
                              // text row
                              <span
                                className={`text-xs font-nutito text-secondary-700
                                        ${column.accessor === "email" || column.accessor === "full_name" ? "cursor-pointer  p-3": ""}
                                        `}
                                onClick={
                                  column.accessor === "email" || column.accessor === "full_name"
                                    ? () => {
                                        navigate(`/employee/${row.id}/profile`);
                                      }
                                    : () => {}
                                }
                              >
                                {row[column.accessor]}
                              </span>
                            )}
                          </td>
                        ))}
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div
          className="py-5
                    flex 
                    justify-end 
                    items-center 
                    gap-2 
                    text-xs 
                    text-secondary-600"
        >
          <span className="text-xs text-secondary-600">Rows per page</span>
          <select
            onChange={handlePageChange}
            className="outline-none w-10 cursor-pointer capitalize"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="all">all</option>
          </select>
          <span>
            1 -
            {currentPage >= employees?.length
              ? employees?.length
              : currentPage !== "all"
              ? currentPage
              : employees?.length}{" "}
            of {employees?.length}
          </span>
        </div>

        {/* Modals */}
        <EmployeeModal isOpen={isOpenModal} onClose={handleCloseModal} />
      </div>
    </Layout>
  );
};

export default EmployeeListPage;
