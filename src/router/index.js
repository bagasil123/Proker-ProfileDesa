import { createRouter, createWebHistory } from 'vue-router'
import BerandaView from '../views/BerandaView.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'beranda',
      component: BerandaView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/fasilitas',
      name: 'fasilitas',
      component: () => import('../views/FasilitasView.vue')
    },
    {
      path: '/berita',
      name: 'berita',
      component: () => import('../views/BeritaView.vue')
    },
    {
      path: '/umkm',
      name: 'umkm',
      component: () => import('../views/UmkmView.vue')
    },
    {
      path: '/kontak',
      name: 'kontak',
      component: () => import('../views/KontakView.vue')
    },
    {
      path: '/umkm/:id',
      name: 'umkm-detail',
      component: () => import('../views/UmkmDetailView.vue')
    },
    {
      path: '/fasilitas/:id',
      name: 'fasilitas-detail',
      component: () => import('../views/FasilitasDetailView.vue')
    },
    {
      path: '/berita/:id',
      name: 'berita-detail',
      component: () => import('../views/BeritaDetailView.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: 'smooth' };
    }
  }
})

export default router