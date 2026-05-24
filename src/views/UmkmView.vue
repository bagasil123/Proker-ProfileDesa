<template>
  <main class="pb-xl">
    <header class="relative overflow-hidden bg-primary-container text-on-primary-container py-xl mb-lg">
      <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10 text-center md:text-left">
        <h1 class="font-display-lg text-display-lg md:text-display-lg mb-sm leading-tight">
          Katalog UMKM Desa
        </h1>
        <p class="font-body-lg text-body-lg max-w-2xl mb-md">
          Dukung ekonomi lokal dengan menjelajahi produk unggulan dari warga Pusaka Desa. Dari tangan terampil pengrajin hingga hasil bumi segar dari petani kami.
        </p>
        <div class="bg-surface-container-lowest p-md rounded-xl shadow-sm max-w-4xl mx-auto md:mx-0 flex flex-col md:flex-row gap-sm items-center">
          <div class="relative w-full flex-grow group-focus-within:ring-2">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input
              v-model="searchQuery"
              class="w-full pl-10 pr-4 py-3 bg-surface-container border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-body-md transition-all"
              placeholder="Cari produk atau nama UMKM..."
              type="text"
            />
          </div>
          <button class="w-full md:w-auto px-lg py-3 bg-primary text-on-primary rounded-lg font-label-md flex items-center justify-center gap-2 hover:opacity-90">
            <span class="material-symbols-outlined">filter_list</span>
            Cari
          </button>
        </div>
      </div>
      <div class="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
    </header>

    <section class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
      <div class="flex flex-wrap gap-sm mb-lg justify-center md:justify-start">
        <button
          @click="activeCategory = 'Semua'"
          :class="[
            'px-md py-2 rounded-full font-label-md shadow-sm transition-colors',
            activeCategory === 'Semua' ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant hover:bg-primary-container/20'
          ]">
          Semua
        </button>
        <button
          v-for="category in db.umkm_categories" :key="category.id"
          @click="activeCategory = category.name"
          :class="[
            'px-md py-2 rounded-full font-label-md transition-colors',
            activeCategory === category.name ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant hover:bg-primary-container/20'
          ]">
          {{ category.name }}
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        <article v-for="umkm in filteredUmkms" :key="umkm.id" class="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden hover:shadow-md transition-shadow group">
          <div class="relative h-56 overflow-hidden">
            <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" :alt="umkm.name" :src="umkm.product_image_path"/>
            <div class="absolute top-4 left-4">
              <span :class="['px-3 py-1 rounded-full text-label-sm font-bold shadow-sm', getCategoryStyle(umkm.umkm_category_id)]">
                {{ getCategoryName(umkm.umkm_category_id) }}
              </span>
            </div>
          </div>
          <div class="p-md">
            <h3 class="font-headline-sm text-headline-sm text-on-surface mb-xs">{{ umkm.name }}</h3>
            <p class="font-body-sm text-body-sm text-on-surface-variant mb-md line-clamp-2">{{ umkm.description }}</p>
            <div class="flex items-center justify-between mb-lg">
              <span class="text-primary font-bold font-body-md">{{ umkm.price }}</span>
            </div>
            <div class="flex flex-col gap-sm">
              <router-link :to="`/umkm/${umkm.id}`" class="flex items-center justify-center gap-2 py-3 bg-surface-container-high text-on-surface border border-outline-variant rounded-lg font-label-md hover:bg-surface-container-highest transition-colors w-full">
                <span class="material-symbols-outlined text-[18px]">info</span> Lihat Detail
              </router-link>
              <div class="grid grid-cols-2 gap-sm">
                <a :href="`https://wa.me/${umkm.whatsapp}`" target="_blank" class="flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white rounded-lg font-label-md hover:opacity-90">
                  <span class="material-symbols-outlined text-[18px]">chat</span> WhatsApp
                </a>
                <a :href="umkm.maps_url" target="_blank" class="flex items-center justify-center gap-2 py-3 border border-outline text-on-surface-variant rounded-lg font-label-md hover:bg-surface-container-low transition-colors">
                  <span class="material-symbols-outlined text-[18px]">location_on</span> Lokasi
                </a>
              </div>
            </div>
          </div>
        </article>
      </div>
      <div v-if="filteredUmkms.length === 0" class="text-center py-xl">
        <p class="font-body-lg text-on-surface-variant">Tidak ada UMKM yang ditemukan.</p>
      </div>
      <div class="mt-xl bg-primary rounded-2xl p-lg text-center text-on-primary">
        <h2 class="font-headline-md text-headline-md mb-sm">Ingin UMKM Anda Terdaftar?</h2>
        <p class="font-body-md text-body-md mb-lg opacity-90 max-w-xl mx-auto">Tingkatkan visibilitas bisnis lokal Anda dengan bergabung di platform katalog digital Pusaka Desa secara gratis.</p>
        <router-link to="/kontak" class="inline-block px-lg py-3 bg-on-primary text-primary font-bold rounded-full hover:bg-primary-container hover:text-on-primary-container transition-all">
          Daftar Sekarang
        </router-link>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { database } from '@/data/db.js'

const db = ref(database)
const searchQuery = ref('')
const activeCategory = ref('Semua')

const getCategoryName = (id) => {
    const cat = db.value.umkm_categories.find(c => c.id === id)
    return cat ? cat.name : ''
}

const getCategoryStyle = (id) => {
    const cat = db.value.umkm_categories.find(c => c.id === id)
    return cat ? cat.style : ''
}

const filteredUmkms = computed(() => {
    let result = db.value.umkms

    if (activeCategory.value !== 'Semua') {
        const cat = db.value.umkm_categories.find(c => c.name === activeCategory.value)
        if (cat) {
            result = result.filter(u => u.umkm_category_id === cat.id)
        }
    }

    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        result = result.filter(u =>
            u.name.toLowerCase().includes(query) ||
            u.description.toLowerCase().includes(query)
        )
    }

    return result
})
</script>

<style scoped>

</style>
