import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const Layout = () => {
  return (
    <div className="flex h-screen w-full bg-[#F2F4F8] font-sans overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <Topbar />
        <div className="flex-1 overflow-y-auto px-4 md:px-8 pb-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
