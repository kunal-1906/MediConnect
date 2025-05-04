export const userMenu = (user) => [
    {
      name: 'Home',
      path: '/',
      icon: 'fa-solid fa-house-chimney'
    },
    {
      name: 'Appointments',
      path: '/appointments',
      icon: 'fa-solid fa-list-ul'
    },
    // Show "Apply Doctor" only if the user is NOT a doctor
    ...(user?.isDoctor ? [] : [{
      name: 'Apply Doctor',
      path: '/apply-doctor',
      icon: 'fa-solid fa-user-doctor'
    }]),
    {
      name: 'Profile',
      path: user?.isDoctor ? `/doctor/profile/${user?._id}`:'/profile',
      icon: 'fa-solid fa-user'
    }
  ];
  
  export const adminMenu = [
    {
      name: 'Home',
      path: '/',
      icon: 'fa-solid fa-house-chimney'
    },
    {
      name: 'Doctors',
      path: '/admin/doctors',
      icon: 'fa-solid fa-user-doctor'
    },
    {
      name: 'Users',
      path: '/admin/users',
      icon: 'fa-solid fa-user'
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: 'fa-solid fa-user'
    }
  ];
  