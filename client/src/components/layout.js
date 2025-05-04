import React from 'react';
import '../styles/LayoutStyles.css';
import { adminMenu, userMenu } from '../Data/data';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Badge, message, Avatar } from 'antd';

const Layout = ({ children }) => {
  const { user } = useSelector(state => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    message.success('Logout Successfully');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    navigate('/login');
  };

  const doctorMenu = [
    {
      name: 'Home',
      path: '/',
      icon: 'fa-solid fa-house-chimney'
    },
    {
      name: 'Appointments',
      path: '/doctor-appointments',
      icon: 'fa-solid fa-list-ul'
    },
    {
      name: 'Profile',
      path: `/doctor/profile/${user?._id}`,
      icon: 'fa-solid fa-user'
    },
  ];

  const SidebarMenu = user?.isAdmin 
    ? adminMenu 
    : user?.isDoctor 
      ? doctorMenu 
      : userMenu(user);

  return (
    <>
      <div className='main'>
        <div className='layout'>
          {/* Enhanced Sidebar */}
          <div className='sidebar'>
            <div className='logo-container'>
              <div className='logo-content'>
                <img
                  src="/kunal.png"
                  alt="MediConnect Logo"
                  className='logo-image'
                />
                <h1 className='logo-text'>MediConnect</h1>
              </div>
            </div>
            <hr className='sidebar-divider'/>
            <div className='menu'>
              {SidebarMenu.map((menu, index) => {
                const isActive = location.pathname === menu.path;
                return (
                  <div 
                    key={menu.path || index} 
                    className={`menu-item ${isActive && "active"}`}
                    onClick={() => navigate(menu.path)}
                  >
                    <i className={menu.icon}></i>
                    <span className='menu-text'>{menu.name}</span>
                    {isActive && <div className='active-indicator'></div>}
                  </div>
                );
              })}

              <div 
                className="menu-item logout-button" 
                onClick={handleLogout}
              >
                <i className="fa-solid fa-right-from-bracket"></i>
                <span className='menu-text'>Logout</span>
              </div>
            </div>
            
            <div className='sidebar-footer'>
              <Avatar 
                size="large" 
                style={{ 
                  backgroundColor: '#1890ff',
                  marginRight: '10px'
                }}
              >
                {user?.name?.charAt(0).toUpperCase()}
              </Avatar>
              <div className='user-info'>
                <span className='user-name'>{user?.name}</span>
                <span className='user-role'>
                  {user?.isAdmin ? 'Admin' : user?.isDoctor ? 'Doctor' : 'User'}
                </span>
              </div>
            </div>
          </div>

          {/* Main Content with Enhanced Header */}
          <div className='content'>
            <div className='header'>
              <div className='header-content'>
                <div className='notification-container'>
                  <Badge 
                    count={user && user.notification.length} 
                    onClick={() => navigate('/notification')}
                    className='notification-badge'
                  >
                    <div className='notification-bell'>
                      <i className='fa-solid fa-bell notification-icon'></i>
                    </div>
                  </Badge>
                </div>
                
                <div 
                  className='user-profile' 
                  onClick={() => navigate('/profile')}
                >
                 
                  <span className='user-name'>{user?.name}</span>
                  <i className="fa-solid fa-chevron-down dropdown-icon"></i>
                </div>
              </div>
            </div>
            <div className='body'>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;