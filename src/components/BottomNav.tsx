import React from 'react';
import { Home, Compass, Bookmark, Clock } from 'lucide-react';

export const BottomNav: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-slate-100 px-8 flex justify-between items-center z-40">
      <NavItem icon={<Home size={24} />} active />
      <NavItem icon={<Compass size={24} />} />
      <NavItem icon={<Bookmark size={24} />} />
      <NavItem icon={<Clock size={24} />} />
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode; active?: boolean }> = ({ icon, active }) => (
  <button className={`relative flex items-center justify-center ${active ? 'text-emerald-600' : 'text-slate-300 hover:text-slate-500'}`}>
    {icon}
    {active && (
      <span className="absolute -bottom-2 w-1.5 h-1.5 bg-emerald-600 rounded-full" />
    )}
  </button>
);