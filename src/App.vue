<template>
  <nav :class="['fixed top-0 w-full z-50 transition-all duration-300', isScrolled ? 'bg-surface/90 backdrop-blur-md border-b border-outline-variant shadow-md h-20' : 'bg-surface/90 backdrop-blur-md border-b border-outline-variant shadow-sm h-20']">
      <div class="flex justify-between items-center h-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div class="flex items-center gap-base">
              <img :alt="db.villages.name" class="w-10 h-10 object-contain" :src="db.villages.logo_path">
              <span class="font-headline-sm text-headline-sm font-bold text-primary">{{ db.villages.name }}</span>
          </div>
          <div class="hidden md:flex items-center gap-lg">
              <router-link v-for="(menu, index) in navigation" :key="index" :to="menu.url" 
                 @click="scrollToTop"
                 class="font-body-md text-on-surface-variant hover:text-primary transition-colors"
                 active-class="text-primary font-bold border-b-2 border-primary pb-1">
                 {{ menu.name }}
              </router-link>
          </div>
          
          <button @click="toggleMobileMenu" class="md:hidden text-primary p-2">
              <span class="material-symbols-outlined">{{ isMobileMenuOpen ? 'close' : 'menu' }}</span>
          </button>
      </div>

      <div v-show="isMobileMenuOpen" class="md:hidden absolute top-20 left-0 w-full bg-surface shadow-lg border-b border-outline-variant py-4 px-margin-mobile flex flex-col gap-4">
           <router-link v-for="(menu, index) in navigation" :key="index" :to="menu.url" 
              class="block text-on-surface-variant hover:text-primary transition-colors font-body-md py-2 border-b border-outline-variant/30"
              @click="() => { isMobileMenuOpen = false; scrollToTop(); }">
              {{ menu.name }}
           </router-link>
      </div>
  </nav>

  <router-view class="pt-20" />

  <footer class="w-full py-xl bg-surface-container-low border-t border-outline-variant mt-auto">
    <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-4 gap-md">
      <div class="md:col-span-1">
        <div class="flex items-center gap-2 mb-4">
          <img :alt="'Logo ' + db.villages.name" class="w-10 h-10 object-contain" :src="db.villages.logo_path">
          <span class="font-headline-md text-headline-md font-bold text-on-surface">{{ db.villages.name }}</span>
        </div>
        <p class="font-body-sm text-on-surface-variant mb-6">
          Mewujudkan desa digital yang mandiri, transparan, dan menjunjung tinggi warisan luhur budaya nusantara.
        </p>
        <div class="flex items-center gap-4">
          <a :href="db.contact_infos.facebook_url" target="_blank" class="text-on-surface-variant hover:text-primary transition-all">
            <span class="material-symbols-outlined">social_leaderboard</span>
          </a>
          <a :href="db.contact_infos.instagram_url" target="_blank" class="text-on-surface-variant hover:text-primary transition-all">
            <span class="material-symbols-outlined">public</span>
          </a>
          <a :href="'mailto:' + db.contact_infos.email" class="text-on-surface-variant hover:text-primary transition-all">
            <span class="material-symbols-outlined">alternate_email</span>
          </a>
        </div>
      </div>
      <div>
        <h4 class="font-label-md text-on-surface mb-6">Menu Navigasi</h4>
        <ul class="space-y-4">
          <li><router-link @click="scrollToTop" class="font-body-sm text-on-surface-variant hover:text-primary underline-offset-4 hover:underline transition-all" to="/">Beranda</router-link></li>
          <li><router-link @click="scrollToTop" class="font-body-sm text-on-surface-variant hover:text-primary underline-offset-4 hover:underline transition-all" to="/about">Tentang Kami</router-link></li>
          <li><router-link @click="scrollToTop" class="font-body-sm text-on-surface-variant hover:text-primary underline-offset-4 hover:underline transition-all" to="/fasilitas">Fasilitas Desa</router-link></li>
          <li><router-link @click="scrollToTop" class="font-body-sm text-on-surface-variant hover:text-primary underline-offset-4 hover:underline transition-all" to="/umkm">Produk UMKM</router-link></li>
        </ul>
      </div>
      <div>
        <h4 class="font-label-md text-on-surface mb-6">Informasi Publik</h4>
        <ul class="space-y-4">
          <li><router-link @click="scrollToTop" class="font-body-sm text-on-surface-variant hover:text-primary underline-offset-4 hover:underline transition-all" to="/berita">Berita Terkini</router-link></li>
          <li><router-link @click="scrollToTop" class="font-body-sm text-on-surface-variant hover:text-primary underline-offset-4 hover:underline transition-all" to="/berita">Transparansi Dana</router-link></li>
          <li><router-link @click="scrollToTop" class="font-body-sm text-on-surface-variant hover:text-primary underline-offset-4 hover:underline transition-all" to="/berita">Pengumuman</router-link></li>
          <li><router-link @click="scrollToTop" class="font-body-sm text-on-surface-variant hover:text-primary underline-offset-4 hover:underline transition-all" to="/kontak">Kontak Kami</router-link></li>
        </ul>
      </div>
      <div>
        <h4 class="font-label-md text-on-surface mb-6">Kontak Kantor</h4>
        <p class="font-body-sm text-on-surface-variant mb-2 whitespace-pre-wrap">{{ db.contact_infos.office_address }}</p>
        <p class="font-body-sm text-on-surface-variant mb-4">{{ db.contact_infos.phone }}</p>
        <div class="h-32 w-full rounded-lg bg-surface-container-highest overflow-hidden border border-outline-variant">
          <iframe 
            class="w-full h-full grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
            style="border:0;" 
            loading="lazy" 
            allowfullscreen 
            referrerpolicy="no-referrer-when-downgrade" 
            :src="db.contact_infos.maps_embed_url">
          </iframe>
        </div>
      </div>
    </div>
    <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-xl pt-8 border-t border-outline-variant text-center">
      <p class="font-body-sm text-on-surface-variant">© {{ new Date().getFullYear() }} {{ db.villages.name }}. Hak Cipta Dilindungi Undang-Undang.</p>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { database } from '@/data/db.js'

const db = ref(database)
const isMobileMenuOpen = ref(false)
const isScrolled = ref(false)

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const handleScroll = () => {
    isScrolled.value = window.scrollY > 50
}

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})

const navigation = ref([
    { name: 'Beranda', url: '/' },
    { name: 'About', url: '/about' },
    { name: 'Fasilitas', url: '/fasilitas' },
    { name: 'UMKM', url: '/umkm' },
    { name: 'Berita', url: '/berita' },
    { name: 'Kontak', url: '/kontak' },
])
</script>