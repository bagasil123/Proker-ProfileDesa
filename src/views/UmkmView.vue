<template>
  <main class="pb-12 md:pb-xl">
    <!-- 1. HEADER -->
    <header class="relative overflow-hidden bg-primary-container text-on-primary-container py-12 md:py-xl">
      <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10 text-center md:text-left">
        <h1 class="font-display-lg font-bold text-4xl md:text-display-lg mb-4 md:mb-sm leading-tight">
          Katalog UMKM Desa
        </h1>
        <p class="font-body-md md:font-body-lg max-w-2xl mx-auto md:mx-0 mb-4 md:mb-md text-on-primary-container/80">
          Dukung ekonomi lokal dengan menjelajahi produk unggulan dari warga Pusaka Desa. Dari tangan terampil pengrajin hingga hasil bumi segar dari petani kami.
        </p>
      </div>
      <div class="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
    </header>

    <section class="relative z-20 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-6 md:mt-lg mb-6 md:mb-lg overflow-visible">
      <div class="bg-surface-container-low p-4 md:p-md rounded-xl border border-outline-variant flex flex-col md:flex-row gap-4 md:gap-6 md:items-center">

        <!-- Search -->
        <div class="relative w-full md:flex-1">
          <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px] md:text-[24px]">
            search
          </span>
          <input
            v-model="searchQuery"
            class="w-full pl-12 pr-4 py-3 bg-white border border-outline-variant rounded-full font-body-sm md:font-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
            placeholder="Cari produk atau nama UMKM..."
            type="text"
          />
        </div>

        <!-- Filter -->
        <div ref="dropdownRef" class="relative w-full md:w-48">
          <button
            type="button"
            @click="toggleCategoryMenu"
            class="w-full pl-12 pr-10 py-3 bg-white border border-outline-variant rounded-full font-body-sm md:font-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm text-left relative"
          >
            <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px] md:text-[24px]">
              filter_list
            </span>
            <span class="block truncate">{{ activeCategory }}</span>
            <span class="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline text-[20px] md:text-[24px]">
              expand_more
            </span>
          </button>

          <transition name="fade">
            <div
              v-if="isCategoryMenuOpen"
              class="absolute left-0 top-full mt-2 w-full bg-white border border-outline-variant rounded-2xl shadow-xl z-50 overflow-hidden"
            >
              <button
                type="button"
                @click="selectCategory('Semua')"
                class="w-full text-left px-4 py-3 hover:bg-primary-container transition-colors"
                :class="activeCategory === 'Semua' ? 'bg-primary text-on-primary font-bold' : 'text-on-surface'"
              >
                Semua Kategori
              </button>

              <button
                v-for="category in db.umkm_categories"
                :key="category.id"
                type="button"
                @click="selectCategory(category.name)"
                class="w-full text-left px-4 py-3 hover:bg-primary-container transition-colors border-t border-outline-variant/30"
                :class="activeCategory === category.name ? 'bg-primary text-on-primary font-bold' : 'text-on-surface'"
              >
                {{ category.name }}
              </button>
            </div>
          </transition>
        </div>

      </div>
    </section>

    <!-- 3. GRID UMKM -->
    <section class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <router-link
          v-for="umkm in paginatedUmkms"
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

          <!-- Area Konten -->
          <div class="p-4 md:p-md flex flex-col flex-grow">
            <h3 class="font-headline-sm font-bold text-on-surface mb-1 md:mb-xs group-hover:text-primary transition-colors">{{ umkm.name }}</h3>
            <p class="font-body-sm text-on-surface-variant mb-4 md:mb-md line-clamp-2">{{ umkm.description }}</p>

            <div class="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant/40">
              <span class="text-primary font-bold font-body-md">{{ umkm.price || 'Lihat Detail' }}</span>
              <span class="material-symbols-outlined text-[20px] md:text-[24px] text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">arrow_forward</span>
            </div>
          </div>
        </router-link>
      </div>

      <div v-if="filteredUmkms.length === 0" class="text-center py-12 md:py-xl">
        <p class="font-body-md md:font-body-lg text-on-surface-variant">Tidak ada UMKM yang ditemukan.</p>
      </div>

      <!-- 4. PAGINATION -->
      <div class="mt-8 md:mt-xl flex flex-col md:flex-row items-center justify-between gap-4 md:gap-md" v-if="filteredUmkms.length > 0">
        <span class="font-body-sm text-on-surface-variant text-center md:text-left">
          Menampilkan {{ (currentPage - 1) * itemsPerPage + 1 }}-{{ Math.min(currentPage * itemsPerPage, filteredUmkms.length) }} dari {{ filteredUmkms.length }} produk UMKM
        </span>
        <div class="flex items-center gap-2">
          <button
            @click="changePage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant text-outline hover:bg-surface-container-high transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed">
            <span class="material-symbols-outlined text-[20px]">chevron_left</span>
          </button>
          <button
            v-for="page in totalPages" :key="page"
            @click="changePage(page)"
            :class="[
              'w-10 h-10 flex items-center justify-center rounded-full font-label-md transition-colors',
              currentPage === page ? 'bg-primary text-on-primary font-bold' : 'border border-outline-variant text-on-surface-variant hover:bg-surface-container-high'
            ]">
            {{ page }}
          </button>
          <button
            @click="changePage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed">
            <span class="material-symbols-outlined text-[20px]">chevron_right</span>
          </button>
        </div>
      </div>

      <!-- 5. CALL TO ACTION (CTA) BAWAH -->
      <div class="mt-12 md:mt-xl bg-primary rounded-2xl p-6 md:p-lg text-center text-on-primary">
        <h2 class="font-headline-md md:font-headline-lg font-bold mb-3 md:mb-sm">Ingin UMKM Anda Terdaftar?</h2>
        <p class="font-body-sm md:font-body-md mb-6 md:mb-lg opacity-90 max-w-xl mx-auto">Tingkatkan visibilitas bisnis lokal Anda dengan bergabung di platform katalog digital Pusaka Desa secara gratis.</p>
        <router-link to="/kontak" class="w-full sm:w-auto inline-block px-8 py-3 bg-on-primary text-primary font-bold rounded-full hover:bg-primary-container hover:text-on-primary-container transition-all">
          Daftar Sekarang
        </router-link>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { database } from '@/data/db.js'

const db = ref(database)
const searchQuery = ref('')
const activeCategory = ref('Semua')

const currentPage = ref(1)
const itemsPerPage = 6

const isCategoryMenuOpen = ref(false)
const dropdownRef = ref(null)

const getCategoryName = (id) => {
  const cat = db.value.umkm_categories.find(c => c.id === id)
  return cat ? cat.name : ''
}

const getCategoryStyle = (id) => {
  const cat = db.value.umkm_categories.find(c => c.id === id)
  return cat ? cat.style : ''
}

const toggleCategoryMenu = () => {
  isCategoryMenuOpen.value = !isCategoryMenuOpen.value
}

const selectCategory = (category) => {
  activeCategory.value = category
  isCategoryMenuOpen.value = false
}

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isCategoryMenuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

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

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(filteredUmkms.value.length / itemsPerPage))
})

const paginatedUmkms = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredUmkms.value.slice(start, end)
})

const changePage = (page) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

watch([activeCategory, searchQuery], () => {
  currentPage.value = 1
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
