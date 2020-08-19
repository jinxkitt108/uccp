
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
      { path: 'dashboard', component: () => import('pages/admin/AdminDashboard.vue') },
      { path: 'users', component: () => import('pages/admin/Users.vue') }
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
      { path: 'dashboard', component: () => import('pages/staff/Dashboard.vue') },
      { path: 'calendar-events', component: () => import('pages/staff/CalendarEvents.vue') },
      { path: 'members', component: () => import('pages/staff/Members.vue') },
      { path: 'marriage', component: () => import('pages/staff/Marriage.vue') },
      { path: 'baptism', component: () => import('pages/staff/Baptism.vue') }
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
