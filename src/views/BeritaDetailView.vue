<template>
  <main class="pb-xl">
    <div class="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mt-6">

      <!-- BREADCRUMB -->
      <nav class="flex items-center gap-2 mb-8 text-on-surface-variant overflow-x-auto whitespace-nowrap" style="scrollbar-width: none;">
        <router-link to="/berita" class="font-label-md text-label-md hover:text-primary">Berita</router-link>
        <span class="material-symbols-outlined text-sm">chevron_right</span>
        <span class="font-label-md text-label-md text-primary">{{ article.titleShort }}</span>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-xl">
        <article class="lg:col-span-8">

          <header class="mb-8">
            <span class="inline-block px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-label-sm font-label-sm mb-4">
              {{ article.category }}
            </span>
            <h1 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-6 leading-tight">
              {{ article.title }}
            </h1>

            <div class="flex flex-wrap items-center gap-6 text-on-surface-variant">
              <!-- Author -->
              <div class="flex items-center gap-2" v-if="article.author">
                <div class="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center">
                  <span class="material-symbols-outlined text-on-primary-fixed">person</span>
                </div>
                <div>
                  <p class="font-label-md text-on-surface leading-none font-bold">{{ article.author.name }}</p>
                  <p class="font-label-sm text-body-sm">{{ article.author.role }}</p>
                </div>
              </div>
              <!-- Tanggal -->
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-lg">calendar_today</span>
                <span class="font-label-md">{{ article.date }}</span>
              </div>
            </div>
          </header>

          <!-- GAMBAR UTAMA (HERO BERITA) -->
          <figure class="mb-10 group">
            <div class="aspect-video w-full overflow-hidden rounded-xl bg-surface-container mb-3 shadow-md">
              <img :alt="article.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" :src="article.image"/>
            </div>
            <figcaption class="text-center font-body-sm text-on-surface-variant italic">
              {{ article.imageCaption }}
            </figcaption>
          </figure>

          <!-- ISI ARTIKEL -->
          <div class="article-content max-w-none text-justify md:text-left" v-html="article.content"></div>

          <!-- GALERI KEGIATAN (Muncul jika ada data gallery) -->
          <section class="mt-12 pt-8 border-t border-outline-variant" v-if="article.gallery && article.gallery.length > 0">
            <h3 class="font-headline-md text-headline-md mb-6 font-bold">Galeri Kegiatan</h3>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              <div
                v-for="(img, index) in article.gallery"
                :key="index"
                @click="openLightbox(img)"
                class="relative aspect-square rounded-xl overflow-hidden group border border-outline-variant/50 shadow-sm cursor-pointer animate-fade-in"
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
          </section>

          <!-- BAGIKAN -->
          <div class="mt-12 py-8 border-t border-b border-outline-variant flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h4 class="font-headline-sm text-on-surface mb-1 font-bold">Suka artikel ini?</h4>
              <p class="font-body-sm text-on-surface-variant">Bagikan informasi ini kepada warga dan kerabat Anda.</p>
            </div>
            <div class="flex flex-wrap items-center gap-3">
              <button @click="shareWhatsApp" class="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white font-label-md font-bold hover:opacity-90 transition-opacity">
                <span class="material-symbols-outlined text-lg">share</span> WhatsApp
              </button>
              <button @click="shareFacebook" class="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1877F2] text-white font-label-md font-bold hover:opacity-90 transition-opacity">
                <span class="material-symbols-outlined text-lg">social_leaderboard</span> Facebook
              </button>
              <button @click="copyLink" class="w-11 h-11 flex items-center justify-center rounded-full border border-outline-variant hover:bg-surface-container transition-colors">
                <span class="material-symbols-outlined text-on-surface-variant">link</span>
              </button>
            </div>
          </div>

          <!-- FORM TANGGAPAN -->
          <section class="mt-12">
            <h3 class="font-headline-md text-headline-md font-bold mb-8">Pertanyaan &amp; Tanggapan</h3>
            <div class="bg-surface-container-low rounded-xl p-6 md:p-8 border border-outline-variant/30">
              <p class="font-body-md text-on-surface-variant mb-6">Punya tanggapan terkait kegiatan ini? Hubungi pengurus RW melalui formulir di bawah.</p>
              <form @submit.prevent="submitForm" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="space-y-1">
                    <label class="font-label-md font-bold text-on-surface">Nama Lengkap</label>
                    <input v-model="formData.name" required class="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none" placeholder="Masukkan nama Anda" type="text"/>
                  </div>
                  <div class="space-y-1">
                    <label class="font-label-md font-bold text-on-surface">Alamat Email</label>
                    <input v-model="formData.email" required class="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none" placeholder="nama@email.com" type="email"/>
                  </div>
                </div>
                <div class="space-y-1">
                  <label class="font-label-md font-bold text-on-surface">Pesan atau Pertanyaan</label>
                  <textarea v-model="formData.message" required class="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none" placeholder="Tuliskan pesan Anda di sini..." rows="4"></textarea>
                </div>
                <button
                  :disabled="isSubmitting"
                  :class="[
                    'px-8 py-3 rounded-lg font-label-md font-bold transition-all w-full md:w-auto',
                    submitStatus === 'success' ? 'bg-primary-container text-on-primary-container' : 'bg-primary text-on-primary hover:bg-primary/90'
                  ]"
                  type="submit">
                  {{ isSubmitting ? 'Mengirim...' : (submitStatus === 'success' ? 'Pesan Terkirim!' : 'Kirim Pesan') }}
                </button>
              </form>
            </div>
          </section>
        </article>

        <!-- SIDEBAR BERITA TERKAIT -->
        <aside class="lg:col-span-4 space-y-xl">
          <div>
            <h3 class="font-headline-sm font-bold mb-6 flex items-center gap-2">
              <span class="material-symbols-outlined text-primary">dynamic_feed</span>
              Baca Berita Lainnya
            </h3>
            <div class="space-y-6">
              <router-link v-for="news in relatedNews" :key="news.id" :to="`/berita/${news.id}`" class="group flex gap-4">
                <div class="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-surface-container">
                  <img :alt="news.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" :src="news.image"/>
                </div>
                <div class="flex flex-col justify-between py-1">
                  <h4 class="font-label-md font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                    {{ news.title }}
                  </h4>
                  <span class="font-body-sm text-on-surface-variant">{{ news.date }}</span>
                </div>
              </router-link>
            </div>
          </div>
          <div class="p-6 rounded-xl bg-surface-container-low border border-outline-variant/30">
            <h3 class="font-headline-sm font-bold mb-4">Kategori Berita</h3>
            <div class="flex flex-wrap gap-2">
              <router-link v-for="cat in categories" :key="cat" to="/berita" class="px-3 py-1.5 rounded-full border border-outline-variant bg-surface text-on-surface font-label-sm cursor-pointer hover:bg-primary hover:text-on-primary hover:border-primary transition-all">{{ cat }}</router-link>
            </div>
          </div>
        </aside>
      </div>
    </div>

    <!-- MODAL LIGHTBOX GALERI -->
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

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('id-ID', options)
}

// Data Artikel
const article = computed(() => {
    const p = db.value.news_posts.find(n => n.id == route.params.id) || db.value.news_posts[0]
    return {
        ...p,
        titleShort: p.title.length > 30 ? p.title.substring(0, 30) + '...' : p.title,
        date: formatDate(p.published_at),
        image: p.cover_image_path
    }
})

// Data Berita Terkait
const relatedNews = computed(() => {
    const currentId = parseInt(route.params.id) || 1
    return db.value.news_posts
        .filter(n => n.id !== currentId)
        .slice(0, 3)
        .map(n => ({
            ...n,
            image: n.cover_image_path,
            date: formatDate(n.published_at)
        }))
})

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

const categories = ref([
    "Kegiatan Sosial", "Pembangunan", "Keamanan", "Kesehatan", "Karang Taruna", "Pengumuman"
])

const formData = ref({
    name: '',
    email: '',
    message: ''
})

const isSubmitting = ref(false)
const submitStatus = ref('idle')
const targetEmail = ref('bagas.indra.bil@gmail.com')

const submitForm = () => {
    if (isSubmitting.value) return
    isSubmitting.value = true
    submitStatus.value = 'idle'
    const subject = encodeURIComponent(`[Website RW - Tanggapan Berita] ${article.value.title}`)
    const body = encodeURIComponent(`Nama Pengirim: ${formData.value.name}\nEmail Pengirim: ${formData.value.email}\nTanggapan untuk Berita: ${article.value.title}\n\nPesan:\n${formData.value.message}`)
    window.location.href = `mailto:${targetEmail.value}?subject=${subject}&body=${body}`
    setTimeout(() => {
        isSubmitting.value = false
        submitStatus.value = 'success'
        setTimeout(() => {
            submitStatus.value = 'idle'
            formData.value = { name: '', email: '', message: '' }
        }, 3000)
    }, 800)
}

const shareWhatsApp = () => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(`Baca berita terbaru: ${article.value.title}`)
    window.open(`https://wa.me/?text=${text}%20${url}`, '_blank')
}

const shareFacebook = () => {
    const url = encodeURIComponent(window.location.href)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
}

const copyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Tautan berhasil disalin!')
    }).catch(err => {
        console.error('Gagal menyalin tautan: ', err)
    })
}
</script>

<style>
.article-content h2 {
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 1.5rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: #191c1d;
}
.article-content p {
    font-family: 'Inter', sans-serif;
    font-size: 1.125rem;
    line-height: 1.75rem;
    margin-bottom: 1.5rem;
    color: #40493d;
}
</style>
