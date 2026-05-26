<template>
  <main>
    <!-- 1. HERO SECTION -->
    <section class="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden pb-10">
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 hero-gradient z-10"></div>
        <img :alt="'Desa ' + db.villages.name" class="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[10s]" :src="db.villages.hero_image_path">
      </div>
      <div class="relative z-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full text-white mt-12 md:mt-0 text-center md:text-left">
        <div class="max-w-2xl space-y-4 md:space-y-6 mx-auto md:mx-0">
          <h1 class="font-display-lg font-bold text-4xl sm:text-5xl leading-tight md:text-[64px] md:leading-[1.1]">
            Website Resmi Desa <span class="text-primary-fixed">{{ db.villages.name }}</span>
          </h1>
          <p class="font-body-lg text-body-md md:text-body-lg text-white/90 max-w-lg mx-auto md:mx-0">
            {{ db.villages.tagline }}
          </p>
          <div class="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto justify-center md:justify-start">
            <button @click="scrollToSection('stats')" class="w-full sm:w-auto justify-center px-8 py-4 bg-primary text-on-primary rounded-xl font-label-md font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center gap-2">
              Jelajahi Desa
              <span class="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
            <router-link to="/umkm" class="w-full sm:w-auto justify-center px-8 py-4 flex items-center bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl font-label-md font-bold hover:bg-white/20 transition-all">
              Lihat UMKM
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. STATS SECTION (Tanpa Overlap di Mobile) -->
    <section id="stats" class="relative z-30 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mt-6 md:-mt-24 mb-12 md:mb-16">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-md">

        <!-- Card 1: Penduduk -->
        <div class="block p-4 md:p-lg bg-surface rounded-2xl shadow-lg border border-outline-variant text-center md:text-left flex flex-col items-center md:items-start">
          <div class="w-10 h-10 md:w-12 md:h-12 bg-primary-fixed text-on-primary-fixed rounded-lg flex items-center justify-center mb-3 md:mb-4">
            <span class="material-symbols-outlined text-[20px] md:text-[24px]" style="font-variation-settings: 'FILL' 1;">groups</span>
          </div>
          <h3 class="font-bold text-2xl md:font-headline-lg text-primary">{{ formatNumber(db.village_statistics.population_total) }}+</h3>
          <p class="text-xs sm:text-sm md:font-label-md text-on-surface-variant">Penduduk</p>
        </div>

        <!-- Card 2: Produk UMKM -->
        <div class="block p-4 md:p-lg bg-surface rounded-2xl shadow-lg border border-outline-variant text-center md:text-left flex flex-col items-center md:items-start">
          <div class="w-10 h-10 md:w-12 md:h-12 bg-secondary-fixed text-on-secondary-fixed rounded-lg flex items-center justify-center mb-3 md:mb-4">
            <span class="material-symbols-outlined text-[20px] md:text-[24px]" style="font-variation-settings: 'FILL' 1;">storefront</span>
          </div>
          <h3 class="font-bold text-2xl md:font-headline-lg text-secondary">{{ db.aggregates.umkm_count }}+</h3>
          <p class="text-xs sm:text-sm md:font-label-md text-on-surface-variant">Produk UMKM</p>
        </div>

        <!-- Card 3: Fasilitas Umum -->
        <div class="block p-4 md:p-lg bg-surface rounded-2xl shadow-lg border border-outline-variant text-center md:text-left flex flex-col items-center md:items-start">
          <div class="w-10 h-10 md:w-12 md:h-12 bg-tertiary-fixed text-on-tertiary-fixed rounded-lg flex items-center justify-center mb-3 md:mb-4">
            <span class="material-symbols-outlined text-[20px] md:text-[24px]" style="font-variation-settings: 'FILL' 1;">home_health</span>
          </div>
          <h3 class="font-bold text-2xl md:font-headline-lg text-tertiary">{{ db.aggregates.facilities_count }}+</h3>
          <p class="text-xs sm:text-sm md:font-label-md text-on-surface-variant">Fasilitas Umum</p>
        </div>

        <!-- Card 4: Wilayah Desa -->
        <div class="block p-4 md:p-lg bg-surface rounded-2xl shadow-lg border border-outline-variant text-center md:text-left flex flex-col items-center md:items-start">
          <div class="w-10 h-10 md:w-12 md:h-12 bg-primary-fixed-dim text-on-primary-fixed-variant rounded-lg flex items-center justify-center mb-3 md:mb-4">
            <span class="material-symbols-outlined text-[20px] md:text-[24px]" style="font-variation-settings: 'FILL' 1;">map</span>
          </div>
          <h3 class="font-bold text-2xl md:font-headline-lg text-on-primary-fixed-variant">{{ db.village_statistics.area_ha }} Ha</h3>
          <p class="text-xs sm:text-sm md:font-label-md text-on-surface-variant">Wilayah Desa</p>
        </div>

      </div>
    </section>

    <!-- 3. SAMBUTAN KADES -->
    <section class="py-12 md:py-xl" v-if="kepalaDesa">
      <div class="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div class="bg-surface-container-low rounded-3xl p-6 md:p-xl overflow-hidden relative">
          <div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div class="flex flex-col md:flex-row gap-8 md:gap-lg items-center relative z-10">
            <div class="w-full max-w-[220px] md:max-w-none md:w-1/3 mx-auto">
              <div class="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img :alt="kepalaDesa.position + ' ' + db.villages.name" class="w-full h-full object-cover" :src="kepalaDesa.photo_path">
              </div>
            </div>
            <div class="w-full md:w-2/3 space-y-4 md:space-y-md text-center md:text-left">
              <h2 class="font-headline-md md:font-headline-lg font-bold text-on-surface">Sambutan {{ kepalaDesa.position }}</h2>
              <blockquote class="font-body-md md:font-body-lg italic text-on-surface-variant relative">
                <span class="hidden md:block material-symbols-outlined text-primary/20 text-6xl absolute -top-8 -left-4 select-none">format_quote</span>
                "{{ kepalaDesa.description }}"
              </blockquote>
              <div class="pt-4 md:pt-base border-t border-outline-variant flex flex-col md:flex-row items-center md:justify-between gap-4">
                <div>
                  <p class="font-headline-sm font-bold text-on-surface">{{ kepalaDesa.name }}</p>
                  <p class="font-label-md text-primary">{{ kepalaDesa.position }} {{ db.villages.name }}</p>
                </div>
                <div class="opacity-70 grayscale contrast-150">
                  <img alt="Tanda Tangan Digital" class="h-12 md:h-16 object-contain" :src="kepalaDesa.signature_path">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. UMKM UNGGULAN -->
    <section class="py-12 md:py-xl bg-surface-bright">
      <div class="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-lg gap-4">
          <div class="max-w-xl">
            <span class="text-1xl font-label-md font-bold text-primary uppercase tracking-widest block mb-2">Potensi Lokal</span>
            <h2 class="text-2xl font-headline-md md:font-headline-lg font-bold text-on-surface">UMKM Unggulan Desa</h2>
            <p class="font-body-sm md:font-body-md text-on-surface-variant mt-2">Dukung produk lokal karya warga {{ db.villages.name }} yang telah menembus pasar nasional.</p>
          </div>
          <router-link to="/umkm" class="font-label-md font-bold text-primary flex items-center gap-1 hover:underline underline-offset-4 w-full md:w-auto justify-end">
            Lihat Semua Produk
            <span class="material-symbols-outlined text-[18px]">chevron_right</span>
          </router-link>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <router-link
            v-for="umkm in featuredUmkms"
            :key="umkm.id"
            :to="`/umkm/${umkm.id}`"
            class="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col cursor-pointer block"
          >
            <div class="relative h-48 md:h-56 overflow-hidden flex-shrink-0">
              <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" :alt="umkm.name" :src="umkm.product_image_path"/>
              <div class="absolute top-4 left-4">
                <span :class="['px-3 py-1 rounded-full text-label-sm font-bold shadow-sm', getCategoryStyle(umkm.umkm_category_id)]">
                  {{ getCategoryName(umkm.umkm_category_id) }}
                </span>
              </div>
            </div>
            <div class="p-4 md:p-md flex flex-col flex-grow">
              <h3 class="font-headline-sm font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">{{ umkm.name }}</h3>
              <p class="font-body-sm text-on-surface-variant mb-4 line-clamp-2">{{ umkm.description }}</p>
              <div class="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant/40">
                <span class="text-primary font-bold font-body-md">{{ umkm.price || 'Lihat Detail' }}</span>
                <span class="material-symbols-outlined text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-[20px] md:text-[24px]">arrow_forward</span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- 5. BERITA TERBARU -->
    <section class="py-12 md:py-xl">
      <div class="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div class="text-center mb-8 md:mb-lg">
          <h2 class="text-2xl font-headline-md md:font-headline-lg font-bold text-on-surface">Kabar Desa Terbaru</h2>
          <p class="font-body-sm md:font-body-md text-on-surface-variant mt-2 px-4">Update kegiatan, kebijakan, dan prestasi terkini dari masyarakat {{ db.villages.name }}.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-md">
          <article v-for="news in latestNews" :key="news.id" class="flex flex-col bg-white border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
            <router-link :to="`/berita/${news.id}`" class="relative h-48 overflow-hidden block cursor-pointer">
              <img :alt="news.title" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" :src="news.cover_image_path"/>
              <div class="absolute top-3 left-3">
                <span :class="['px-3 py-1 rounded-full font-label-sm font-bold', news.color_class || 'bg-primary text-on-primary']">
                  {{ news.category || 'Berita' }}
                </span>
              </div>
            </router-link>
            <div class="p-4 md:p-md flex flex-col flex-grow">
              <span class="font-label-sm text-outline mb-2">{{ formatDate(news.published_at) }}</span>
              <router-link :to="`/berita/${news.id}`">
                <h3 class="font-headline-sm font-bold text-on-background mb-2 md:mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {{ news.title }}
                </h3>
              </router-link>
              <p class="font-body-sm text-on-surface-variant mb-4 line-clamp-2">
                {{ news.excerpt }}
              </p>
              <router-link :to="`/berita/${news.id}`" class="mt-auto flex items-center justify-between w-full font-label-md text-primary font-bold group-hover:gap-2 transition-all">
                Baca Selengkapnya
                <span class="material-symbols-outlined text-[18px]">chevron_right</span>
              </router-link>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- 6. HUBUNGI KAMI -->
    <section class="py-12 md:py-xl bg-surface-container-low">
      <div class="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div class="flex flex-col md:flex-row gap-0 md:gap-lg bg-surface-container-lowest rounded-2xl md:rounded-3xl overflow-hidden shadow-sm border border-outline-variant">
          <div class="w-full md:w-1/2 p-6 md:p-xl space-y-6 md:space-y-md">
            <div>
              <h2 class="font-headline-md md:font-headline-lg font-bold text-on-surface">Hubungi Kami</h2>
              <p class="font-body-sm md:font-body-md text-on-surface-variant mt-2">Kami siap melayani kebutuhan informasi dan layanan administratif Anda.</p>
            </div>
            <div class="space-y-4">
              <div class="flex items-start gap-4 p-3 md:p-4 rounded-xl hover:bg-surface-container transition-colors">
                <span class="material-symbols-outlined text-primary p-2 bg-primary/10 rounded-lg">location_on</span>
                <div>
                  <h3 class="font-label-md font-bold text-on-surface">Alamat Kantor Desa</h3>
                  <p class="font-body-sm text-on-surface-variant">{{ db.contact_infos.office_address }}</p>
                </div>
              </div>
              <div class="flex items-start gap-4 p-3 md:p-4 rounded-xl hover:bg-surface-container transition-colors">
                <span class="material-symbols-outlined text-primary p-2 bg-primary/10 rounded-lg">schedule</span>
                <div>
                  <h3 class="font-label-md font-bold text-on-surface">Jam Operasional</h3>
                  <p class="font-body-sm text-on-surface-variant">{{ db.contact_infos.operational_hours }}</p>
                </div>
              </div>
              <div class="flex items-start gap-4 p-3 md:p-4 rounded-xl hover:bg-surface-container transition-colors">
                <span class="material-symbols-outlined text-primary p-2 bg-primary/10 rounded-lg">mail</span>
                <div>
                  <h3 class="font-label-md font-bold text-on-surface">Email &amp; Telepon</h3>
                  <p class="font-body-sm text-on-surface-variant">{{ db.contact_infos.email }}<br>{{ db.contact_infos.phone }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/2 h-[250px] md:h-auto min-h-[250px] md:min-h-full relative overflow-hidden group border-t md:border-t-0 md:border-l border-outline-variant">
            <iframe
              :class="[
                'absolute inset-0 w-full h-full transition-all duration-500',
                'grayscale-0 opacity-100',
                'md:grayscale md:opacity-80 group-hover:grayscale-0 group-hover:opacity-100'
              ]"
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
    const featured = db.value.umkms.filter(u => u.is_featured === true || u.is_featured === 1)

    return featured.length > 0
           ? featured.slice(0, 3)
           : db.value.umkms.slice(0, 3)
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
