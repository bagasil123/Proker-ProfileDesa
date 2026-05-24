<template>
  <main>
    <section class="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden">
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 hero-gradient z-10"></div>
        <img :alt="'Desa ' + db.villages.name" class="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[10s]" :src="db.villages.hero_image_path">
      </div>
      <div class="relative z-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full text-white">
        <div class="max-w-2xl space-y-md">
          <div class="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 px-4 py-1.5 rounded-full">
            <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span class="font-label-sm uppercase tracking-wider text-primary-fixed">Informasi Terkini Desa</span>
          </div>
          <h1 class="font-display-lg text-display-lg leading-tight md:text-[64px] md:leading-[1.1]">
            Website Resmi Desa <span class="text-primary-fixed">{{ db.villages.name }}</span>
          </h1>
          <p class="font-body-lg text-body-lg text-white/90 max-w-lg">
            {{ db.villages.tagline }}
          </p>
          <div class="flex flex-wrap gap-base pt-4">
            <button @click="scrollToSection('stats')" class="px-8 py-4 bg-primary text-on-primary rounded-xl font-label-md hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center gap-2">
              Jelajahi Desa
              <span class="material-symbols-outlined">arrow_forward</span>
            </button>
            <router-link to="/umkm" class="px-8 py-4 flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl font-label-md hover:bg-white/20 transition-all">
              Lihat UMKM
            </router-link>
          </div>
        </div>
      </div>
    </section>
    <section id="stats" class="py-xl bg-surface">
      <div class="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-md">
          <router-link to="/about" class="block p-lg bg-surface-container-lowest rounded-xl border border-outline-variant hover:shadow-md transition-shadow group">
            <div class="w-12 h-12 bg-primary-fixed text-on-primary-fixed rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">groups</span>
            </div>
            <h3 class="font-headline-lg text-headline-lg text-primary">{{ formatNumber(db.village_statistics.population_total) }}+</h3>
            <p class="font-label-md text-on-surface-variant group-hover:text-primary transition-colors">Penduduk</p>
          </router-link>
          <router-link to="/umkm" class="block p-lg bg-surface-container-lowest rounded-xl border border-outline-variant hover:shadow-md transition-shadow group">
            <div class="w-12 h-12 bg-secondary-fixed text-on-secondary-fixed rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">storefront</span>
            </div>
            <h3 class="font-headline-lg text-headline-lg text-secondary">{{ db.aggregates.umkm_count }}+</h3>
            <p class="font-label-md text-on-surface-variant group-hover:text-primary transition-colors">Produk UMKM</p>
          </router-link>
          <router-link to="/fasilitas" class="block p-lg bg-surface-container-lowest rounded-xl border border-outline-variant hover:shadow-md transition-shadow group">
            <div class="w-12 h-12 bg-tertiary-fixed text-on-tertiary-fixed rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">home_health</span>
            </div>
            <h3 class="font-headline-lg text-headline-lg text-tertiary">{{ db.aggregates.facilities_count }}+</h3>
            <p class="font-label-md text-on-surface-variant group-hover:text-primary transition-colors">Fasilitas Umum</p>
          </router-link>
          <router-link to="/about" class="block p-lg bg-surface-container-lowest rounded-xl border border-outline-variant hover:shadow-md transition-shadow group">
            <div class="w-12 h-12 bg-primary-fixed-dim text-on-primary-fixed-variant rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">map</span>
            </div>
            <h3 class="font-headline-lg text-headline-lg text-on-primary-fixed-variant">{{ db.village_statistics.area_ha }} Ha</h3>
            <p class="font-label-md text-on-surface-variant group-hover:text-primary transition-colors">Wilayah Desa</p>
          </router-link>
        </div>
      </div>
    </section>
    <section class="py-xl" v-if="kepalaDesa">
      <div class="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div class="bg-surface-container-low rounded-3xl p-md md:p-xl overflow-hidden relative">
          <div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div class="flex flex-col md:flex-row gap-lg items-center relative z-10">
            <div class="w-full md:w-1/3">
              <div class="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <img :alt="kepalaDesa.position + ' ' + db.villages.name" class="w-full h-full object-cover" :src="kepalaDesa.photo_path">
              </div>
            </div>
            <div class="w-full md:w-2/3 space-y-md">
              <h2 class="font-headline-lg text-headline-lg text-on-surface">Sambutan {{ kepalaDesa.position }}</h2>
              <blockquote class="font-body-lg text-body-lg italic text-on-surface-variant relative">
                <span class="material-symbols-outlined text-primary/20 text-6xl absolute -top-8 -left-4 select-none">format_quote</span>
                "{{ kepalaDesa.description }}"
              </blockquote>
              <div class="pt-base border-t border-outline-variant flex items-center justify-between">
                <div>
                  <p class="font-headline-sm text-headline-sm text-on-surface">{{ kepalaDesa.name }}</p>
                  <p class="font-label-md text-primary">{{ kepalaDesa.position }} {{ db.villages.name }}</p>
                </div>
                <div class="opacity-70 grayscale contrast-150">
                  <img alt="Tanda Tangan Digital" class="h-16 object-contain" :src="kepalaDesa.signature_path">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="py-xl bg-surface-bright">
      <div class="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div class="flex flex-col md:flex-row justify-between items-end mb-lg gap-md">
          <div class="max-w-xl">
            <span class="font-label-md text-primary uppercase tracking-widest block mb-2">Potensi Lokal</span>
            <h2 class="font-headline-lg text-headline-lg">UMKM Unggulan Desa</h2>
            <p class="font-body-md text-on-surface-variant mt-2">Dukung produk lokal karya warga {{ db.villages.name }} yang telah menembus pasar nasional dengan kualitas premium.</p>
          </div>
          <router-link to="/umkm" class="font-label-md text-primary flex items-center gap-2 hover:underline underline-offset-4">
            Lihat Semua Produk
            <span class="material-symbols-outlined">chevron_right</span>
          </router-link>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-md">
          <div v-for="umkm in featuredUmkms" :key="umkm.id" class="bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant group hover:shadow-xl transition-all">
            <router-link to="/umkm/detail" class="h-56 overflow-hidden relative block">
              <div class="absolute top-4 left-4 z-20">
                <span :class="['px-3 py-1 rounded-full font-label-sm', getCategoryStyle(umkm.umkm_category_id)]">
                  {{ getCategoryName(umkm.umkm_category_id) }}
                </span>
              </div>
              <img :alt="umkm.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" :src="umkm.product_image_path">
            </router-link>
            <div class="p-md space-y-sm">
              <router-link to="/umkm/detail"><h3 class="font-headline-sm text-headline-sm hover:text-primary transition-colors">{{ umkm.name }}</h3></router-link>
              <p class="font-body-sm text-on-surface-variant line-clamp-2">{{ umkm.description }}</p>
              <div class="flex gap-2 pt-2">
                <a :href="'https://wa.me/' + umkm.whatsapp" target="_blank" class="flex-1 py-3 bg-secondary-container text-on-secondary-container rounded-xl font-label-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                  <span class="material-symbols-outlined text-base">chat</span>
                  WhatsApp
                </a>
                <a :href="umkm.maps_url" target="_blank" class="p-3 border border-outline-variant rounded-xl hover:bg-surface-container transition-colors">
                  <span class="material-symbols-outlined text-on-surface-variant">location_on</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="py-xl">
      <div class="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div class="text-center mb-lg">
          <h2 class="font-headline-lg text-headline-lg">Kabar Desa Terbaru</h2>
          <p class="font-body-md text-on-surface-variant mt-2">Update kegiatan, kebijakan, dan prestasi terkini dari masyarakat {{ db.villages.name }}.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-md">
          <router-link to="/berita/detail" v-for="news in latestNews" :key="news.id" class="group cursor-pointer block">
            <div class="aspect-video rounded-2xl overflow-hidden mb-sm">
              <img :alt="news.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" :src="news.cover_image_path">
            </div>
            <time class="font-label-sm text-primary">{{ formatDate(news.published_at) }}</time>
            <h3 class="font-headline-sm text-headline-sm group-hover:text-primary transition-colors mt-1">{{ news.title }}</h3>
            <p class="font-body-sm text-on-surface-variant mt-2 line-clamp-2">{{ news.excerpt }}</p>
          </router-link>
        </div>
      </div>
    </section>
    <section class="py-xl bg-surface-container-low">
      <div class="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div class="flex flex-col md:flex-row gap-lg bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm border border-outline-variant">
          <div class="w-full md:w-1/2 p-md md:p-xl space-y-md">
            <div>
              <h2 class="font-headline-lg text-headline-lg">Hubungi Kami</h2>
              <p class="font-body-md text-on-surface-variant mt-2">Kami siap melayani kebutuhan informasi dan layanan administratif Anda.</p>
            </div>
            <div class="space-y-base">
              <div class="flex items-start gap-4 p-4 rounded-xl hover:bg-surface-container transition-colors">
                <span class="material-symbols-outlined text-primary p-2 bg-primary/10 rounded-lg">location_on</span>
                <div>
                  <p class="font-label-md text-on-surface">Alamat Kantor Desa</p>
                  <p class="font-body-sm text-on-surface-variant">{{ db.contact_infos.office_address }}</p>
                </div>
              </div>
              <div class="flex items-start gap-4 p-4 rounded-xl hover:bg-surface-container transition-colors">
                <span class="material-symbols-outlined text-primary p-2 bg-primary/10 rounded-lg">schedule</span>
                <div>
                  <p class="font-label-md text-on-surface">Jam Operasional</p>
                  <p class="font-body-sm text-on-surface-variant">{{ db.contact_infos.operational_hours }}</p>
                </div>
              </div>
              <div class="flex items-start gap-4 p-4 rounded-xl hover:bg-surface-container transition-colors">
                <span class="material-symbols-outlined text-primary p-2 bg-primary/10 rounded-lg">mail</span>
                <div>
                  <p class="font-label-md text-on-surface">Email &amp; Telepon</p>
                  <p class="font-body-sm text-on-surface-variant">{{ db.contact_infos.email }}<br>{{ db.contact_infos.phone }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/2 min-h-[300px] relative overflow-hidden group">
            <iframe 
              class="absolute inset-0 w-full h-full grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
              style="border:0;" 
              loading="lazy" 
              allowfullscreen 
              referrerpolicy="no-referrer-when-downgrade" 
              :src="db.contact_infos.maps_embed_url">
            </iframe>
            <div class="absolute inset-0 bg-primary/10 pointer-events-none group-hover:opacity-0 transition-opacity duration-500"></div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { database } from '@/data/db.js'

const db = ref(database)

const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
const kepalaDesa = computed(() => {
    return db.value.village_officials.find(o => o.sort_order === 1)
})

const featuredUmkms = computed(() => {
    return db.value.umkms.filter(u => u.is_featured)
})

const latestNews = computed(() => {
    return [...db.value.news_posts]
        .sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
        .slice(0, 3)
})
const getCategoryName = (id) => {
    const cat = db.value.umkm_categories.find(c => c.id === id)
    return cat ? cat.name : ''
}

const getCategoryStyle = (id) => {
    const cat = db.value.umkm_categories.find(c => c.id === id)
    return cat && cat.style ? cat.style : 'bg-surface-variant text-on-surface-variant'
}

const formatNumber = (num) => {
    return new Intl.NumberFormat('id-ID').format(num)
}

const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'long', year: 'numeric' }
    return new Date(dateString).toLocaleDateString('id-ID', options)
}
</script>

<style scoped>
.hero-gradient {
    background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6));
}
.bento-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
}
@media (max-width: 768px) {
    .bento-grid {
        grid-template-columns: repeat(1, 1fr);
    }
}
</style>