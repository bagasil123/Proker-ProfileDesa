<template>
  <main class="pb-xl">
    <nav class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-6">
      <div class="flex items-center text-on-surface-variant font-body-sm">
        <router-link to="/" class="breadcrumb-item hover:text-primary transition-colors">Beranda</router-link>
        <router-link to="/umkm" class="breadcrumb-item hover:text-primary transition-colors">UMKM</router-link>
        <span class="text-primary font-semibold">{{ product.name }}</span>
      </div>
    </nav>
    <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-xl">
        <div class="lg:col-span-7">
          <div class="relative rounded-[1.5rem] overflow-hidden bg-surface-container-low aspect-[4/3] md:aspect-video shadow-sm">
            <img class="w-full h-full object-cover" :alt="product.name" :src="product.product_image_path"/>
            <div class="absolute top-4 left-4">
              <span class="bg-primary/90 text-on-primary px-4 py-1.5 rounded-full font-label-md backdrop-blur-sm">
                {{ product.category }}
              </span>
            </div>
          </div>
        </div>
        <div class="lg:col-span-5 flex flex-col gap-md">
          <div>
            <h1 class="font-headline-lg text-headline-lg text-on-surface mb-2">{{ product.name }}</h1>
            <p class="text-primary font-headline-sm text-headline-sm">{{ product.price }}</p>
          </div>
          <div class="p-md bg-surface-container-lowest rounded-xl border border-outline-variant flex flex-col gap-sm">
            <div class="flex items-start gap-3">
              <span class="material-symbols-outlined text-primary">person</span>
              <div>
                <p class="text-on-surface-variant font-label-sm">Pemilik Bisnis</p>
                <p class="font-body-md font-semibold">{{ product.owner }}</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <span class="material-symbols-outlined text-primary">location_on</span>
              <div>
                <p class="text-on-surface-variant font-label-sm">Alamat Produksi</p>
                <p class="font-body-md">{{ product.address }}</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <span class="material-symbols-outlined text-primary">schedule</span>
              <div>
                <p class="text-on-surface-variant font-label-sm">Jam Operasional</p>
                <p class="font-body-md">{{ product.hours }}</p>
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-sm mt-4">
            <a class="flex items-center justify-center gap-2 bg-primary text-on-primary h-[56px] rounded-xl font-label-md hover:brightness-110 transition-all shadow-md group" :href="`https://wa.me/${product.whatsapp}`" target="_blank">
              <span class="material-symbols-outlined group-hover:scale-110 transition-transform">chat</span>
              Hubungi via WhatsApp
            </a>
            <button class="flex items-center justify-center gap-2 border-2 border-primary text-primary h-[56px] rounded-xl font-label-md hover:bg-primary-container/10 transition-all" @click="scrollToMaps">
              <span class="material-symbols-outlined">map</span>
              Lihat Lokasi di Maps
            </button>
          </div>
        </div>
      </div>
      <div class="mt-xl max-w-[800px]">
        <h2 class="font-headline-md text-headline-md mb-4">Deskripsi Produk</h2>
        <div class="text-on-surface-variant space-y-4 font-body-lg leading-relaxed">
          <p v-for="(paragraph, index) in product.detailed_description.paragraphs" :key="index">{{ paragraph }}</p>
          <ul class="list-disc pl-5 space-y-2 mt-4 text-body-md">
            <li v-for="(feature, index) in product.detailed_description.features" :key="index">{{ feature }}</li>
          </ul>
        </div>
      </div>
      <div class="mt-xl" id="maps">
        <h2 class="font-headline-md text-headline-md mb-6">Lokasi UMKM</h2>
        <div class="rounded-[1.5rem] overflow-hidden border border-outline-variant h-[400px] relative">
          <iframe 
            :src="product.maps_embed_url" 
            class="w-full h-full border-0 absolute inset-0" 
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
          <div class="absolute bottom-6 left-6 right-6 md:right-auto bg-surface/90 backdrop-blur-md p-md rounded-xl border border-outline-variant shadow-lg max-w-sm">
            <div class="flex gap-4">
              <div class="bg-primary-container p-3 rounded-lg flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-on-primary-container">directions</span>
              </div>
              <div>
                <p class="font-semibold text-on-surface">{{ product.address }}</p>
                <a :href="product.maps_url" target="_blank" class="text-body-sm text-on-surface-variant hover:text-primary transition-colors">Klik untuk petunjuk arah di Google Maps</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section class="mt-xl">
        <div class="flex justify-between items-end mb-8">
          <div>
            <h2 class="font-headline-md text-headline-md">Produk Terkait</h2>
            <p class="text-on-surface-variant">Temukan camilan lezat lainnya dari pengrajin desa kami.</p>
          </div>
          <router-link to="/umkm" class="text-primary font-label-md flex items-center gap-1 hover:underline underline-offset-4">
            Lihat Semua <span class="material-symbols-outlined">arrow_forward</span>
          </router-link>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md">
          <div v-for="related in relatedProducts" :key="related.id" class="group bg-surface-container-lowest rounded-[1.5rem] overflow-hidden border border-outline-variant hover:shadow-lg transition-all">
            <div class="aspect-square overflow-hidden relative">
              <router-link :to="`/umkm/${related.id}`">
                <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer" :alt="related.name" :src="related.image"/>
              </router-link>
            </div>
            <div class="p-4 flex flex-col h-full">
              <p class="text-primary font-label-sm mb-1">{{ related.category }}</p>
              <h3 class="font-body-lg font-bold text-on-surface mb-2 line-clamp-2">{{ related.name }}</h3>
              <p class="text-primary font-semibold mb-4">{{ related.price }}</p>
              <router-link :to="`/umkm/${related.id}`" class="mt-auto text-center w-full py-2 border border-outline text-on-surface-variant rounded-full font-label-md group-hover:bg-primary group-hover:text-on-primary group-hover:border-primary transition-colors cursor-pointer block">
                Lihat Detail
              </router-link>
            </div>
          </div>
        </div>
      </section>
    </div>
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
        .slice(0, 4)
        .map(u => ({
            ...u,
            image: u.product_image_path,
            category: getCategoryName(u.umkm_category_id)
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
