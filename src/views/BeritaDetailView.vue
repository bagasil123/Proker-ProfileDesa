<template>
  <main class="pb-xl">
    <div class="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mt-6">
      <nav class="flex items-center gap-2 mb-8 text-on-surface-variant overflow-x-auto whitespace-nowrap">
        <router-link to="/" class="font-label-md text-label-md hover:text-primary">Beranda</router-link>
        <span class="material-symbols-outlined text-sm">chevron_right</span>
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
              <div class="flex items-center gap-2">
                <div class="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center">
                  <span class="material-symbols-outlined text-on-primary-fixed">person</span>
                </div>
                <div>
                  <p class="font-label-md text-on-surface leading-none">{{ article.author.name }}</p>
                  <p class="font-label-sm text-body-sm">{{ article.author.role }}</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-lg">calendar_today</span>
                <span class="font-label-md">{{ article.date }}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-lg">visibility</span>
                <span class="font-label-md">{{ article.views }} Dilihat</span>
              </div>
            </div>
          </header>
          
          <figure class="mb-10 group">
            <div class="aspect-video w-full overflow-hidden rounded-xl bg-surface-container mb-3 shadow-md">
              <img :alt="article.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" :src="article.image"/>
            </div>
            <figcaption class="text-center font-body-sm text-on-surface-variant italic">
              {{ article.imageCaption }}
            </figcaption>
          </figure>
          
          <div class="article-content max-w-none" v-html="article.content"></div>
          <div class="mt-12 py-8 border-t border-b border-outline-variant flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h4 class="font-headline-sm text-on-surface mb-1">Suka artikel ini?</h4>
              <p class="font-body-sm text-on-surface-variant">Bagikan informasi ini kepada keluarga dan kerabat Anda.</p>
            </div>
            <div class="flex items-center gap-3">
              <button @click="shareWhatsApp" class="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white font-label-md hover:opacity-90 transition-opacity">
                <span class="material-symbols-outlined text-lg">share</span> WhatsApp
              </button>
              <button @click="shareFacebook" class="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1877F2] text-white font-label-md hover:opacity-90 transition-opacity">
                <span class="material-symbols-outlined text-lg">social_leaderboard</span> Facebook
              </button>
              <button @click="copyLink" class="w-11 h-11 flex items-center justify-center rounded-full border border-outline-variant hover:bg-surface-container transition-colors">
                <span class="material-symbols-outlined text-on-surface-variant">link</span>
              </button>
            </div>
          </div>
          <section class="mt-12">
            <h3 class="font-headline-md text-headline-md mb-8">Pertanyaan &amp; Tanggapan</h3>
            <div class="bg-surface-container-low rounded-xl p-6 md:p-8 border border-outline-variant/30">
              <p class="font-body-md text-on-surface-variant mb-6">Punya pertanyaan atau masukan terkait berita ini? Silakan hubungi tim redaksi kami atau isi formulir di bawah.</p>
              <form @submit.prevent="submitForm" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="space-y-1">
                    <label class="font-label-md text-on-surface">Nama Lengkap</label>
                    <input v-model="formData.name" required class="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all" placeholder="Masukkan nama Anda" type="text"/>
                  </div>
                  <div class="space-y-1">
                    <label class="font-label-md text-on-surface">Alamat Email</label>
                    <input v-model="formData.email" required class="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all" placeholder="nama@email.com" type="email"/>
                  </div>
                </div>
                <div class="space-y-1">
                  <label class="font-label-md text-on-surface">Pesan atau Pertanyaan</label>
                  <textarea v-model="formData.message" required class="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all" placeholder="Tuliskan pesan Anda di sini..." rows="4"></textarea>
                </div>
                <button 
                  :disabled="isSubmitting"
                  :class="[
                    'px-8 py-3 rounded-lg font-label-md transition-all',
                    submitStatus === 'success' ? 'bg-primary-container text-on-primary-container' : 'bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container'
                  ]" 
                  type="submit">
                  {{ isSubmitting ? 'Mengirim...' : (submitStatus === 'success' ? 'Pesan Terkirim!' : 'Kirim Pertanyaan') }}
                </button>
              </form>
            </div>
          </section>
        </article>
        <aside class="lg:col-span-4 space-y-xl">
          <div>
            <h3 class="font-headline-sm mb-6 flex items-center gap-2">
              <span class="material-symbols-outlined text-primary">dynamic_feed</span>
              Baca Berita Lainnya
            </h3>
            <div class="space-y-6">
              <router-link v-for="news in relatedNews" :key="news.id" :to="`/berita/${news.id}`" class="group flex gap-4">
                <div class="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-surface-container">
                  <img :alt="news.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" :src="news.image"/>
                </div>
                <div class="flex flex-col justify-between">
                  <h4 class="font-label-md text-on-surface group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                    {{ news.title }}
                  </h4>
                  <span class="font-body-sm text-on-surface-variant">{{ news.date }}</span>
                </div>
              </router-link>
            </div>
          </div>
          <div class="p-6 rounded-xl bg-surface-container-low border border-outline-variant/30">
            <h3 class="font-headline-sm mb-4">Kategori Berita</h3>
            <div class="flex flex-wrap gap-2">
              <router-link v-for="cat in categories" :key="cat" to="/berita" class="px-3 py-1 rounded-full bg-surface-container-highest text-on-surface text-label-sm cursor-pointer hover:bg-primary-container hover:text-on-primary transition-all">{{ cat }}</router-link>
            </div>
          </div>
          
        </aside>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { database } from '@/data/db.js'

const route = useRoute()
const db = ref(database)

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('id-ID', options)
}

const viewsCount = ref('0')

const loadAndIncrementViews = (id) => {
    const storageKey = `news_views_${id}`
    let currentViews = localStorage.getItem(storageKey)
    
    if (!currentViews) {
        const baseNews = db.value.news_posts.find(n => n.id == id) || db.value.news_posts[0]
        const baseViews = baseNews && baseNews.views ? parseInt(baseNews.views.replace(/\./g, '')) : 0
        currentViews = baseViews + 1
    } else {
        currentViews = parseInt(currentViews) + 1
    }
    
    localStorage.setItem(storageKey, currentViews.toString())
    viewsCount.value = currentViews.toLocaleString('id-ID')
}

watch(() => route.params.id, (newId) => {
    if(newId) loadAndIncrementViews(newId)
}, { immediate: true })

const article = computed(() => {
    const p = db.value.news_posts.find(n => n.id == route.params.id) || db.value.news_posts[0]
    return {
        ...p,
        titleShort: p.title.length > 30 ? p.title.substring(0, 30) + '...' : p.title,
        date: formatDate(p.published_at),
        image: p.cover_image_path,
        views: viewsCount.value
    }
})

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

const categories = ref([
    "Pemerintahan", "Pembangunan", "Ekonomi", "Pendidikan", "Kesehatan", "Wisata"
])

const formData = ref({
    name: '',
    email: '',
    message: ''
})

const isSubmitting = ref(false)
const submitStatus = ref('idle')

const targetEmail = ref('bagas.indra.bil@gmail.com') // Tujuan email utama

const submitForm = () => {
    if (isSubmitting.value) return
    isSubmitting.value = true
    submitStatus.value = 'idle'
    const subject = encodeURIComponent(`[Website Desa - Tanggapan Berita] ${article.value.title}`)
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
