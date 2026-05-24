<template>
  <main class="pb-xl">
    <header class="relative overflow-hidden bg-primary-container text-on-primary-container py-xl mb-lg">
      <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10 text-center md:text-left">
        <h1 class="font-display-lg text-display-lg md:text-display-lg mb-sm leading-tight">
          Berita &amp; Pengumuman Desa
        </h1>
        <p class="font-body-lg text-body-lg max-w-2xl mb-md text-on-primary-container/80">
          Dapatkan informasi terbaru mengenai program pembangunan, kegiatan kemasyarakatan, dan berita terkini langsung dari kantor Desa Pusaka.
        </p>
      </div>
    </header>
    <section class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-lg">
      <div class="flex flex-col md:flex-row gap-gutter items-center justify-between bg-surface-container-low p-md rounded-xl border border-outline-variant">
        <div class="relative w-full md:w-1/3 group-focus-within:ring-2">
          <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
          <input
            v-model="searchQuery"
            class="w-full pl-12 pr-4 py-3 bg-white border border-outline-variant rounded-full font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="Cari judul berita..."
            type="text"
          />
        </div>
        <div class="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
          <button
            @click="activeCategory = 'Semua'"
            :class="[
              'whitespace-nowrap px-md py-2 rounded-full font-label-md text-label-md transition-colors',
              activeCategory === 'Semua' ? 'bg-primary text-on-primary' : 'bg-white text-on-surface-variant border border-outline-variant hover:bg-surface-container-high'
            ]">
            Semua
          </button>
          <button
            v-for="category in categories" :key="category"
            @click="activeCategory = category"
            :class="[
              'whitespace-nowrap px-md py-2 rounded-full font-label-md text-label-md transition-colors',
              activeCategory === category ? 'bg-primary text-on-primary' : 'bg-white text-on-surface-variant border border-outline-variant hover:bg-surface-container-high'
            ]">
            {{ category }}
          </button>
        </div>
      </div>
    </section>
    <section class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-lg">
      <div v-if="featuredNews && activeCategory === 'Semua' && !searchQuery" class="group relative overflow-hidden rounded-xl bg-white border border-outline-variant mb-lg shadow-sm hover:shadow-md transition-shadow">
        <div class="grid grid-cols-1 md:grid-cols-2">
          <router-link :to="`/berita/${featuredNews.id}`" class="relative h-64 md:h-[400px] block cursor-pointer">
            <img :alt="featuredNews.title" class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" :src="featuredNews.cover_image_path"/>
            <div class="absolute top-4 left-4">
              <span class="bg-secondary-container text-on-secondary-container px-md py-1 rounded-full font-label-sm text-label-sm uppercase tracking-wider">{{ featuredNews.category }}</span>
            </div>
          </router-link>
          <div class="p-md md:p-lg flex flex-col justify-center">
            <div class="flex items-center gap-2 text-outline font-label-sm text-label-sm mb-2">
              <span class="material-symbols-outlined text-[18px]">calendar_today</span>
              {{ formatDate(featuredNews.published_at) }}
            </div>
            <router-link :to="`/berita/${featuredNews.id}`">
              <h2 class="font-headline-lg text-headline-lg text-on-background mb-4 group-hover:text-primary transition-colors">
                {{ featuredNews.title }}
              </h2>
            </router-link>
            <p class="font-body-md text-body-md text-on-surface-variant mb-6 line-clamp-3">
              {{ featuredNews.excerpt }}
            </p>
            <router-link class="inline-flex items-center gap-2 font-label-md text-label-md text-primary font-bold hover:gap-3 transition-all" :to="`/berita/${featuredNews.id}`">
              Baca Selengkapnya
              <span class="material-symbols-outlined">arrow_forward</span>
            </router-link>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        <article v-for="news in paginatedNews" :key="news.id" class="flex flex-col bg-white border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
          <router-link :to="`/berita/${news.id}`" class="relative h-48 overflow-hidden block cursor-pointer">
            <img :alt="news.title" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" :src="news.cover_image_path"/>
            <div class="absolute top-3 left-3">
              <span :class="['px-3 py-1 rounded-full font-label-sm text-label-sm', news.color_class]">{{ news.category }}</span>
            </div>
          </router-link>
          <div class="p-md flex flex-col flex-grow">
            <span class="font-label-sm text-label-sm text-outline mb-2">{{ formatDate(news.published_at) }}</span>
            <router-link :to="`/berita/${news.id}`">
              <h3 class="font-headline-sm text-headline-sm text-on-background mb-3 group-hover:text-primary transition-colors line-clamp-2">
                {{ news.title }}
              </h3>
            </router-link>
            <p class="font-body-sm text-body-sm text-on-surface-variant mb-4 line-clamp-2">
              {{ news.excerpt }}
            </p>
            <router-link :to="`/berita/${news.id}`" class="mt-auto flex items-center justify-between w-full font-label-md text-label-md text-primary font-bold group-hover:gap-2 transition-all">
              Baca Selengkapnya
              <span class="material-symbols-outlined">chevron_right</span>
            </router-link>
          </div>
        </article>
      </div>
    </section>
    <section class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-xl flex flex-col md:flex-row items-center justify-between gap-md" v-if="filteredNews.length > 0">
      <span class="font-body-sm text-body-sm text-on-surface-variant">Menampilkan {{ (currentPage - 1) * itemsPerPage + 1 }}-{{ Math.min(currentPage * itemsPerPage, filteredNews.length) }} dari {{ filteredNews.length }} berita</span>
      <div class="flex items-center gap-2">
        <button
          @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant text-outline hover:bg-surface-container-high transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed">
          <span class="material-symbols-outlined">chevron_left</span>
        </button>
        <button
          v-for="page in totalPages" :key="page"
          @click="changePage(page)"
          :class="[
            'w-10 h-10 flex items-center justify-center rounded-full font-label-md text-label-md cursor-pointer transition-colors',
            currentPage === page ? 'bg-primary text-on-primary' : 'border border-outline-variant text-on-surface-variant hover:bg-surface-container-high'
          ]">
          {{ page }}
        </button>
        <button
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed">
          <span class="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </section>
    <section v-else class="text-center py-xl">
       <p class="font-body-lg text-on-surface-variant">Belum ada berita ditemukan.</p>
    </section>
  </main>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { database } from '@/data/db.js'

const db = ref(database)
const searchQuery = ref('')
const activeCategory = ref('Semua')

const currentPage = ref(1)
const itemsPerPage = 6

const categories = ['Pengumuman', 'Kegiatan Desa', 'Ekonomi', 'Kesehatan']

const sortedNews = computed(() => {
    return [...db.value.news_posts].sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
})

const featuredNews = computed(() => {
    return sortedNews.value[0]
})

const filteredNews = computed(() => {
    let result = sortedNews.value.slice(1)

    if (activeCategory.value !== 'Semua') {
        result = result.filter(news => news.category === activeCategory.value)
    }

    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        result = db.value.news_posts.filter(news =>
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

watch(() => filteredNews.value, () => {
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
</style>
