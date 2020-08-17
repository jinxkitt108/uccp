
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },

  //Admin Routes
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    meta: {
      requiresAuth: true,
      isAdmin: true
    },
    children: [
      { path: '/admin-dashboard', component: () => import('pages/admin/AdminDashboard.vue') },
      { path: '/admin-users', component: () => import('pages/admin/Users.vue') }
    ]
  },

  //Staff Routes
  {
    path: '/staff',
    component: () => import('layouts/StaffLayout.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      { path: '/staff-dashboard', component: () => import('pages/staff/Dashboard.vue') },
      { path: '/staff-calendar-events', component: () => import('pages/staff/CalendarEvents.vue') },
      { path: '/staff-members', component: () => import('pages/staff/Members.vue') },
      { path: '/staff-marriage', component: () => import('pages/staff/Marriage.vue') },
      { path: '/staff-baptism', component: () => import('pages/staff/Baptism.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
