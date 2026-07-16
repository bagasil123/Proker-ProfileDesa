<template>
  <main class="pb-12 md:pb-xl">
    <!-- 1. HEADER -->
    <header class="relative overflow-hidden bg-primary-container text-on-primary-container py-12 md:py-xl mb-8 md:mb-lg">
      <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10 text-center md:text-left">
        <h1 class="font-display-lg font-bold text-4xl md:text-display-lg mb-4 md:mb-sm leading-tight">
          Berita &amp; Pengumuman Desa
        </h1>
        <p class="font-body-md md:font-body-lg max-w-2xl mx-auto md:mx-0 mb-4 md:mb-md text-on-primary-container/80">
          Dapatkan informasi terbaru mengenai program pembangunan, kegiatan kemasyarakatan, dan berita terkini langsung dari kantor Desa Pusaka.
        </p>
      </div>
    </header>

    <!-- 2. SEARCH & FILTER BAR -->
    <section class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-8 md:mb-lg">
      <div class="bg-surface-container-low p-4 md:p-md rounded-xl border border-outline-variant flex flex-col md:flex-row gap-4 md:gap-6 md:items-center">

        <!-- Search -->
        <div class="relative w-full md:flex-1">
          <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px] md:text-[24px]">
            search
          </span>
          <input
            v-model="searchQuery"
            class="w-full pl-12 pr-4 py-3 bg-white border border-outline-variant rounded-full font-body-sm md:font-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
            placeholder="Cari judul berita..."
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
                Semua
              </button>

              <button
                v-for="category in categories"
                :key="category"
                type="button"
                @click="selectCategory(category)"
                class="w-full text-left px-4 py-3 hover:bg-primary-container transition-colors border-t border-outline-variant/30"
                :class="activeCategory === category ? 'bg-primary text-on-primary font-bold' : 'text-on-surface'"
              >
                {{ category }}
              </button>
            </div>
          </transition>
        </div>

      </div>
    </section>

    <section class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">

      <!-- 3. FEATURED NEWS (Berita Utama) -->
      <!-- <div v-if="featuredNews && activeCategory === 'Semua' && !searchQuery" class="group relative overflow-hidden rounded-xl bg-white border border-outline-variant mb-8 md:mb-lg shadow-sm hover:shadow-md transition-shadow">
        <div class="grid grid-cols-1 md:grid-cols-2">
          <router-link :to="`/berita/${featuredNews.id}`" class="relative h-56 sm:h-64 md:h-[400px] block cursor-pointer">
            <img :alt="featuredNews.title" class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" :src="featuredNews.cover_image_path"/>
            <div class="absolute top-4 left-4">
              <span class="bg-secondary-container text-on-secondary-container px-3 md:px-md py-1 rounded-full font-label-sm uppercase tracking-wider font-bold shadow-sm">{{ featuredNews.category }}</span>
            </div>
          </router-link>
          <div class="p-4 md:p-lg flex flex-col justify-center">
            <div class="flex items-center gap-2 text-outline font-label-sm mb-2 md:mb-3">
              <span class="material-symbols-outlined text-[16px] md:text-[18px]">calendar_today</span>
              {{ formatDate(featuredNews.published_at) }}
            </div>
            <router-link :to="`/berita/${featuredNews.id}`">
              <h2 class="font-headline-md md:font-headline-lg font-bold text-on-background mb-3 md:mb-4 group-hover:text-primary transition-colors">
                {{ featuredNews.title }}
              </h2>
            </router-link>
            <p class="font-body-sm md:font-body-md text-on-surface-variant mb-4 md:mb-6 line-clamp-3">
              {{ featuredNews.excerpt }}
            </p>
            <router-link class="inline-flex items-center gap-2 font-label-md text-primary font-bold hover:gap-3 transition-all" :to="`/berita/${featuredNews.id}`">
              Baca Selengkapnya
              <span class="material-symbols-outlined text-[20px]">arrow_forward</span>
            </router-link>
          </div>
        </div>
      </div> -->

      <!-- 4. REGULAR NEWS GRID -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-gutter">
        <article v-for="news in paginatedNews" :key="news.id" class="flex flex-col bg-white border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
          <router-link :to="`/berita/${news.id}`" class="relative h-48 overflow-hidden block cursor-pointer">
            <img :alt="news.title" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" :src="news.cover_image_path"/>
            <div class="absolute top-3 left-3">
              <span :class="['px-3 py-1 rounded-full font-label-sm font-bold shadow-sm', news.color_class]">{{ news.category }}</span>
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
              <span class="material-symbols-outlined text-[20px]">chevron_right</span>
            </router-link>
          </div>
        </article>
      </div>

    </section>

    <!-- 5. PAGINATION -->
    <section class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-8 md:mt-xl flex flex-col md:flex-row items-center justify-between gap-4 md:gap-md" v-if="filteredNews.length > 0">
      <span class="font-body-sm text-on-surface-variant text-center md:text-left">
        Menampilkan {{ (currentPage - 1) * itemsPerPage + 1 }}-{{ Math.min(currentPage * itemsPerPage, filteredNews.length) }} dari {{ filteredNews.length }} berita
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
    </section>

    <!-- 6. EMPTY STATE -->
    <section v-else class="text-center py-12 md:py-xl">
       <p class="font-body-md md:font-body-lg text-on-surface-variant">Belum ada berita ditemukan.</p>
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

const categories = computed(() => {
  const uniqueCategories = [...new Set(
    db.value.news_posts
      .map(news => news.category)
      .filter(Boolean)
  )]
  return uniqueCategories
})

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

const sortedNews = computed(() => {
  return [...db.value.news_posts].sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
})

// const featuredNews = computed(() => {
//   return sortedNews.value[0]
// })

const filteredNews = computed(() => {
  // Hapus .slice(1) agar semua berita ditampilkan
  let result = sortedNews.value

  if (activeCategory.value !== 'Semua') {
    result = result.filter(news => news.category === activeCategory.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(news =>
      news.title.toLowerCase().includes(query) ||
      news.excerpt.toLowerCase().includes(query)
    )
  }

  return result
})

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(filteredNews.value.length / itemsPerPage))
})

const paginatedNews = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredNews.value.slice(start, end)
})

const changePage = (page) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

watch([activeCategory, searchQuery], () => {
  currentPage.value = 1
})

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('id-ID', options)
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

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
