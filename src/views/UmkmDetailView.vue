<template>
  <main class="pb-xl relative">
    <nav class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-6">
      <div class="flex items-center text-on-surface-variant font-body-sm">
        <router-link to="/umkm" class="breadcrumb-item hover:text-primary transition-colors">UMKM</router-link>
        <span class="text-primary font-bold">{{ product.name }}</span>
      </div>
    </nav>

    <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-xl">

        <div class="lg:col-span-7">
          <div class="relative rounded-[1.5rem] overflow-hidden bg-surface-container-low aspect-[4/3] md:aspect-video shadow-sm">
            <img class="w-full h-full object-cover" :alt="product.name" :src="product.product_image_path"/>
            <div class="absolute top-4 left-4">
              <span class="bg-primary/90 text-on-primary px-4 py-1.5 rounded-full font-label-md font-bold backdrop-blur-sm">
                {{ product.category }}
              </span>
            </div>
          </div>
        </div>

        <div class="lg:col-span-5 flex flex-col gap-6 md:gap-md">
          <div>
            <h1 class="font-headline-lg text-headline-lg text-on-surface mb-2 font-bold">{{ product.name }}</h1>
            <p class="text-primary font-headline-sm text-headline-sm font-bold">{{ product.price }}</p>
          </div>
          <div class="p-6 md:p-md bg-surface-container-lowest rounded-xl border border-outline-variant flex flex-col gap-4 md:gap-sm shadow-sm">
            <div class="flex items-start gap-4 md:gap-3">
              <span class="material-symbols-outlined text-primary text-[24px]">person</span>
              <div>
                <p class="text-on-surface-variant font-label-sm font-bold">Pemilik Bisnis</p>
                <p class="font-body-md">{{ product.owner }}</p>
              </div>
            </div>
            <div class="flex items-start gap-4 md:gap-3">
              <span class="material-symbols-outlined text-primary text-[24px]">location_on</span>
              <div>
                <p class="text-on-surface-variant font-label-sm font-bold">Alamat Produksi</p>
                <p class="font-body-md">{{ product.address }}</p>
              </div>
            </div>
            <div class="flex items-start gap-4 md:gap-3">
              <span class="material-symbols-outlined text-primary text-[24px]">schedule</span>
              <div>
                <p class="text-on-surface-variant font-label-sm font-bold">Jam Operasional</p>
                <p class="font-body-md">{{ product.hours }}</p>
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-3 md:gap-sm mt-2 md:mt-4">
            <a class="flex items-center justify-center gap-2 bg-primary text-on-primary h-[56px] rounded-xl font-label-md font-bold hover:shadow-lg transition-all" :href="`https://wa.me/${product.whatsapp.replace(/[^0-9]/g, '')}`" target="_blank">
              <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">chat</span>
              Hubungi via WhatsApp
            </a>
            <button class="flex items-center justify-center gap-2 border-2 border-primary text-primary h-[56px] rounded-xl font-label-md font-bold hover:bg-primary/10 transition-all" @click="scrollToMaps">
              <span class="material-symbols-outlined">map</span>
              Lihat Lokasi di Maps
            </button>
          </div>
        </div>
      </div>

      <div class="mt-12 md:mt-xl max-w-[800px]">
        <h2 class="font-headline-md text-headline-md font-bold mb-6">Deskripsi Produk</h2>
        <div class="text-on-surface-variant space-y-4 font-body-lg md:font-body-lg leading-relaxed text-justify md:text-left">
          <p v-for="(paragraph, index) in product.detailed_description.paragraphs" :key="index">{{ paragraph }}</p>
          <ul class="list-disc pl-6 space-y-2 mt-6 text-body-md">
            <li v-for="(feature, index) in product.detailed_description.features" :key="index">{{ feature }}</li>
          </ul>
        </div>
      </div>

      <!-- VIDEO PROFIL (Muncul jika ada video_url) -->
     <div class="mt-12 md:mt-xl max-w-[800px]" v-if="product.video_url">
        <h2 class="font-headline-md text-headline-md font-bold mb-6">
          Video Profil Usaha
        </h2>

        <div class="rounded-[1.5rem] overflow-hidden shadow-md aspect-video bg-surface-container-highest border border-outline-variant">

          <video
            :src="product.video_url"
            controls
            class="w-full h-full object-cover"
          >
            Browser Anda tidak mendukung pemutar video.
          </video>

        </div>
      </div>

      <div class="mt-12 md:mt-xl max-w-[800px]">
        <h2 class="font-headline-md text-headline-md font-bold mb-6">Galeri Usaha</h2>

        <div v-if="product.gallery && product.gallery.length > 0" class="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          <div
            v-for="(img, index) in product.gallery"
            :key="index"
            @click="openLightbox(img)"
            class="relative aspect-square rounded-xl overflow-hidden group border border-outline-variant/50 shadow-sm cursor-pointer"
          >
            <img
              :src="img.src"
              :alt="img.alt"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
               <span class="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 transition-opacity text-3xl drop-shadow-md">zoom_in</span>
            </div>
          </div>
        </div>

        <div v-else class="bg-surface-container-low border-2 border-dashed border-outline-variant text-center p-8 md:p-12 rounded-xl flex flex-col items-center justify-center gap-4">
          <div class="w-16 h-16 bg-surface-container-highest rounded-full flex items-center justify-center">
             <span class="material-symbols-outlined text-outline text-[32px]">hide_image</span>
          </div>
          <p class="font-body-md text-on-surface-variant max-w-md">Belum ada foto dokumentasi tambahan untuk UMKM ini. Silakan hubungi penjual via WhatsApp untuk melihat katalog produk secara langsung.</p>
        </div>
      </div>

      <div class="mt-12 md:mt-xl" id="maps">
        <h2 class="font-headline-md text-headline-md font-bold mb-6">Lokasi UMKM</h2>
        <div class="rounded-[1.5rem] overflow-hidden border border-outline-variant h-[300px] md:h-[400px] relative">
          <iframe
            :src="product.maps_embed_url"
            class="w-full h-full border-0 absolute inset-0 grayscale md:grayscale-0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
          <div class="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-auto bg-surface/95 backdrop-blur-md p-4 md:p-md rounded-xl border border-outline-variant shadow-lg max-w-sm">
            <div class="flex gap-4">
              <div class="bg-primary-container p-3 rounded-lg flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-on-primary-container">directions</span>
              </div>
              <div>
                <p class="font-bold text-on-surface mb-1">{{ product.address }}</p>
                <a :href="product.maps_url" target="_blank" class="font-body-sm text-on-surface-variant hover:text-primary hover:underline transition-all">Buka di Google Maps</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section class="mt-16 md:mt-xl">
        <div class="flex justify-between items-end mb-6 md:mb-8">
          <div>
            <h2 class="font-headline-md text-headline-md font-bold mb-2">Usaha Terkait</h2>
            <p class="text-on-surface-variant font-body-sm md:font-body-md">
              Temukan potensi UMKM lainnya dari lingkungan RW kami.
            </p>
          </div>
          <router-link to="/umkm" class="text-primary font-label-md font-bold flex items-center gap-1 hover:underline underline-offset-4 shrink-0">
            Lihat Semua <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </router-link>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <router-link
            v-for="related in relatedProducts"
            :key="related.id"
            :to="`/umkm/${related.id}`"
            class="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col cursor-pointer block"
          >
            <div class="relative h-48 md:h-56 overflow-hidden flex-shrink-0 bg-surface-container">
              <img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" :alt="related.name" :src="related.image" />
              <div class="absolute top-3 left-3 md:top-4 md:left-4">
                <span :class="['px-3 py-1 rounded-full font-label-sm font-bold shadow-sm backdrop-blur-sm', related.style]">
                  {{ related.category }}
                </span>
              </div>
            </div>

            <div class="p-4 md:p-md flex flex-col flex-grow">
              <h3 class="font-headline-sm text-headline-sm font-bold text-on-surface mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {{ related.name }}
              </h3>
              <p class="font-body-sm text-body-sm text-on-surface-variant mb-4 line-clamp-2">
                {{ related.description }}
              </p>
              <div class="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant/40">
                <span class="text-primary font-bold font-body-md">{{ related.price || 'Lihat Detail'  }}</span>
                <span class="material-symbols-outlined text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">
                  arrow_forward
                </span>
              </div>
            </div>
          </router-link>
        </div>
      </section>
    </div>

    <transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0">
      <div v-if="isLightboxOpen" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-8 backdrop-blur-sm" @click="closeLightbox">
        <button @click.stop="closeLightbox" class="absolute top-4 right-4 md:top-8 md:right-8 text-white p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10">
          <span class="material-symbols-outlined text-3xl">close</span>
        </button>
        <div class="relative max-w-5xl w-full max-h-full flex items-center justify-center" @click.stop>
           <img v-if="selectedImage" :src="selectedImage.src" :alt="selectedImage.alt" class="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl" />
           <p v-if="selectedImage && selectedImage.alt" class="absolute -bottom-10 text-white font-body-md text-center w-full">{{ selectedImage.alt }}</p>
        </div>
      </div>
    </transition>

  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { database } from '@/data/db.js'

const route = useRoute()
const db = ref(database)

const scrollToMaps = () => {
    document.getElementById('maps')?.scrollIntoView({ behavior: 'smooth' })
}

const getCategoryName = (id) => {
    const cat = db.value.umkm_categories.find(c => c.id === id)
    return cat ? cat.name : ''
}

const getCategoryStyle = (id) => {
    const cat = db.value.umkm_categories.find(c => c.id === id)
    return cat ? cat.style : ''
}

// Logika Lightbox Galeri
const isLightboxOpen = ref(false)
const selectedImage = ref(null)

const openLightbox = (img) => {
    selectedImage.value = img
    isLightboxOpen.value = true
    document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
    isLightboxOpen.value = false
    document.body.style.overflow = 'auto'
    setTimeout(() => { selectedImage.value = null }, 300)
}

const product = computed(() => {
    const p = db.value.umkms.find(u => u.id == route.params.id) || db.value.umkms[0]
    return {
        ...p,
        category: getCategoryName(p.umkm_category_id)
    }
})

const relatedProducts = computed(() => {
    const currentId = parseInt(route.params.id) || 1
    return db.value.umkms
        .filter(u => u.id !== currentId)
        .slice(0, 3)
        .map(u => ({
            ...u,
            image: u.product_image_path,
            category: getCategoryName(u.umkm_category_id),
            style: getCategoryStyle(u.umkm_category_id)
        }))
})
</script>

<style scoped>
.breadcrumb-item:not(:last-child)::after {
    content: "chevron_right";
    font-family: 'Material Symbols Outlined';
    margin: 0 8px;
    font-size: 16px;
    color: #707a6c;
    vertical-align: middle;
}
</style>
