import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Activity, LogOut, LayoutDashboard, HeartPulse, History } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="glass-nav sticky-top mb-4">
      <div className="container d-flex justify-content-between align-items-center py-2">
        <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none h4 mb-0 font-weight-bold">
          <Activity className="text-primary" size={24} />
          <span className="text-white font-weight-bold">HealthSense AI</span>
        </Link>
        
        <div className="d-none d-md-flex align-items-center gap-4">
          {[
            { to: '/', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
            { to: '/predict', icon: <HeartPulse size={18} />, label: 'Predictions' },
            { to: '/history', icon: <History size={18} />, label: 'History' }
          ].map((item, idx) => (
            <NavLink 
              key={idx} to={item.to} end={item.to === '/'} 
              className={({isActive}) => `nav-link-custom d-flex align-items-center gap-2 ${isActive ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>

        <div className="d-flex align-items-center gap-3">
          <div className="badge-user d-none d-sm-flex align-items-center gap-2">
            <div className="bg-primary rounded-circle" style={{ width: 8, height: 8 }}></div>
            <span className="small text-white font-weight-bold">{user?.name}</span>
          </div>
          <button onClick={logout} className="btn btn-link text-danger p-1" title="Logout">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


