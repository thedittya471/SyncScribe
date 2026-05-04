import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, Image as ImageIcon, Video, PieChart } from 'lucide-react';
import heroImage from '../assets/hero.png';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Documents', path: '/document', icon: FileText },
  { name: 'Images', path: '/image', icon: ImageIcon },
  { name: 'Media', path: '/media', icon: Video },
  { name: 'Others', path: '/others', icon: PieChart },
];

const Sidebar = () => {
  return (
    <aside className="w-[300px] h-screen bg-white shadow-[0_0_40px_rgba(0,0,0,0.03)] flex flex-col pt-12 pb-8 px-6 sticky top-0 shrink-0 overflow-y-auto md:flex z-50">
      
      {/* Logo */}
      <div className="flex items-center gap-2 mb-12 ml-4">
        <div className="relative flex items-center w-12 h-10">
          <div className="absolute left-0 w-10 h-10 bg-[#FA7275]/20 rounded-full"></div>
          <div className="absolute left-4 w-10 h-10 bg-[#FA7275] rounded-full"></div>
        </div>
        <span className="text-[1.8rem] font-bold text-[#FA7275] tracking-tight ml-3">SyncScribe</span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-3 flex-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-4 px-6 py-4 rounded-3xl font-semibold text-[1.05rem] transition-all duration-300
              ${isActive 
                ? 'bg-[#FA7275] text-white shadow-[0_8px_20px_rgba(250,114,117,0.3)]' 
                : 'text-[#536173] hover:bg-gray-50'
              }
            `}
          >
            {({ isActive }) => (
              <>
                <item.icon 
                  className={`w-6 h-6 transition-colors ${isActive ? 'text-white' : 'text-[#A3B2C7]'}`} 
                  strokeWidth={2.5}
                />
                {item.name}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Illustration Block */}
      <div className="bg-[#FFF4F4] rounded-[2.5rem] mt-10 mb-8 pt-8 pb-4 px-6 flex justify-center items-center relative">
        <img 
          src={heroImage} 
          alt="Illustration" 
          className="w-full max-w-[160px] object-contain hover:-translate-y-2 transition-transform duration-500 drop-shadow-md"
        />
      </div>

      {/* Profile */}
      <div className="flex items-center gap-4 px-4 py-2 mt-auto">
        <img 
          src="https://api.dicebear.com/7.x/notionists/svg?seed=Adrian&backgroundColor=e2e8f0" 
          alt="Profile" 
          className="w-12 h-12 rounded-full object-cover bg-gray-200"
        />
        <div>
          <p className="font-bold text-[#2C3647]">Adrian JSM</p>
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;
