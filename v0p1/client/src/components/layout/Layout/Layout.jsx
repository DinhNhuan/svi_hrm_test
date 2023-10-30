import React from "react";
import Header from "../Header";
import SideBar from "../SideBar";
import TopMenu from "../TopMenu";

const Layout = ({ breadcrumbs, topMenus, children }) => {
  return (
    <div
      className="flex 
                        justify-start 
                        h-screen 
                        bg-[#f6f5fb] 
                        bg-gradient-to-r 
                        from-secondary-100
                        "
    >
      <SideBar />

      <div className="relative flex flex-col grow gap-0  overflow-auto">
        <Header breadcrumbs={breadcrumbs} />
        <main className="flex grow flex-col p-1 bg-pink-100/20  overflow-auto pb-10">
          {/* Top menu component */}
          <TopMenu menuItems={topMenus} />

          <section className="px-10 py-5">{children}</section>
        </main>
      </div>
    </div>
  );
};

export default Layout;
