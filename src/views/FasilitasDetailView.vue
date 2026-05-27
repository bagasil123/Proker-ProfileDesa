<template>
  <main class="pb-12 md:pb-xl relative">
    <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">

      <nav class="flex items-center gap-1 md:gap-xs mb-6 md:mb-md text-on-surface-variant font-body-sm text-sm md:text-body-sm mt-6">
        <router-link to="/fasilitas" class="hover:text-primary transition-colors">Fasilitas</router-link>
        <span class="material-symbols-outlined text-[16px]">chevron_right</span>
        <span class="text-primary font-bold">{{ facility.name }}</span>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-md items-start">

        <div class="lg:col-span-8 space-y-8 md:space-y-lg">

          <div class="relative group overflow-hidden rounded-xl bg-surface-container shadow-sm border border-outline-variant">
            <img :alt="facility.name" class="w-full aspect-[4/3] md:aspect-[16/9] object-cover transition-transform duration-700 group-hover:scale-105" :src="facility.image_path"/>
            <div class="absolute top-4 left-4">
              <span class="bg-secondary-container text-on-secondary-container px-3 md:px-md py-1 rounded-full font-label-sm font-bold flex items-center gap-1 shadow-sm">
                <span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">health_and_safety</span>
                {{ facility.category }}
              </span>
            </div>
          </div>

          <section class="space-y-4 md:space-y-md">
            <div class="space-y-2">
              <h1 class="font-headline-md md:font-headline-lg font-bold text-on-surface">{{ facility.name }}</h1>
              <p class="text-on-surface-variant font-body-md md:font-body-lg leading-relaxed text-justify md:text-left">
                {{ facility.description }}
              </p>
            </div>

            <div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 md:p-md shadow-sm">
              <h2 class="font-headline-sm font-bold text-primary mb-4 md:mb-sm">Layanan Utama</h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-sm">
                <div v-for="(service, index) in facility.mainServices" :key="index" class="flex items-start gap-3 p-3 rounded-lg bg-surface-container-low border border-outline-variant/50">
                  <div class="p-2 bg-primary-container text-on-primary-container rounded-lg shrink-0">
                    <span class="material-symbols-outlined text-[20px]">{{ service.icon }}</span>
                  </div>
                  <div>
                    <p class="font-label-md font-bold text-on-surface">{{ service.name }}</p>
                    <p class="font-body-sm text-on-surface-variant line-clamp-2">{{ service.desc }}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="space-y-4 md:space-y-md" v-if="facility.gallery && facility.gallery.length > 0">
            <div class="flex justify-between items-end">
              <h2 class="font-headline-sm font-bold text-on-surface">Galeri Fasilitas</h2>
              <button
                v-if="facility.gallery.length > 4"
                @click="showAllGallery = !showAllGallery"
                class="text-primary font-label-md font-bold flex items-center gap-1 hover:underline cursor-pointer"
              >
                {{ showAllGallery ? 'Sembunyikan' : 'Lihat Semua' }}
                <span class="material-symbols-outlined text-sm">
                  {{ showAllGallery ? 'expand_less' : 'expand_more' }}
                </span>
              </button>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-sm">
              <div v-for="(img, index) in displayedGallery" :key="index"
                   @click="openLightbox(img)"
                   class="aspect-square rounded-lg overflow-hidden border border-outline-variant relative group cursor-pointer shadow-sm animate-fade-in">
                <img :alt="img.alt" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" :src="img.src"/>
                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                   <span class="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 transition-opacity text-3xl drop-shadow-md">zoom_in</span>
                </div>
              </div>
            </div>
          </section>

          <section class="space-y-4 md:space-y-md" v-if="facility.faqs && facility.faqs.length > 0">
            <h2 class="font-headline-sm font-bold text-on-surface">Pertanyaan Umum (FAQ)</h2>
            <div class="space-y-3">
              <div v-for="(faq, index) in facility.faqs" :key="index" class="bg-surface-container-low rounded-xl p-4 md:p-md border border-outline-variant transition-colors hover:bg-surface-container">
                <button class="flex w-full justify-between items-center text-left" @click="toggleFaq(index)">
                  <span class="font-label-md font-bold text-on-surface pr-4">{{ faq.question }}</span>
                  <span class="material-symbols-outlined text-primary transition-transform duration-300 shrink-0" :class="{ 'rotate-180': openFaq === index }">expand_more</span>
                </button>
                <div v-show="openFaq === index" class="mt-3 pt-3 border-t border-outline-variant font-body-sm text-on-surface-variant">
                  {{ faq.answer }}
                </div>
              </div>
            </div>
          </section>
        </div>

        <aside class="lg:col-span-4 space-y-6 md:space-y-md mt-4 lg:mt-0">
          <div class="sticky top-24 space-y-6 md:space-y-md">
            <div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 md:p-md shadow-sm">
              <h3 class="font-label-md font-bold text-on-surface-variant uppercase tracking-wider mb-6 md:mb-md">Informasi Penting</h3>
              <div class="space-y-4 md:space-y-md">
                <div class="flex gap-4 md:gap-md">
                  <span class="material-symbols-outlined text-primary text-[24px]">location_on</span>
                  <div>
                    <p class="font-label-md font-bold text-on-surface">Alamat</p>
                    <p class="font-body-sm text-on-surface-variant">{{ facility.address }}</p>
                  </div>
                </div>
                <div class="flex gap-4 md:gap-md">
                  <span class="material-symbols-outlined text-primary text-[24px]">schedule</span>
                  <div>
                    <p class="font-label-md font-bold text-on-surface">Jam Operasional</p>
                    <p class="font-body-sm text-on-surface-variant">{{ facility.schedule }}</p>
                  </div>
                </div>
                <div class="flex gap-4 md:gap-md">
                  <span class="material-symbols-outlined text-primary text-[24px]">person</span>
                  <div>
                    <p class="font-label-md font-bold text-on-surface">Kontak Person</p>
                    <p class="font-body-sm text-on-surface-variant">{{ facility.contactName }}</p>
                    <p class="font-body-sm text-primary font-bold">{{ facility.contactPhone }}</p>
                  </div>
                </div>
              </div>
              <div class="mt-8 md:mt-xl space-y-3 md:space-y-sm">
                <a :href="facility.maps_url" target="_blank" class="w-full flex items-center justify-center gap-2 bg-primary text-on-primary h-12 rounded-full font-label-md font-bold hover:shadow-lg transition-all">
                  <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">directions</span>
                  Petunjuk Arah
                </a>
                <a :href="`tel:${facility.contactPhone?.replace(/[^0-9+]/g, '')}`" class="w-full flex items-center justify-center gap-2 border-2 border-primary text-primary h-12 rounded-full font-label-md font-bold hover:bg-primary/10 transition-all">
                  <span class="material-symbols-outlined text-[20px]">call</span>
                  Hubungi Sekarang
                </a>
              </div>
            </div>

            <div class="bg-surface-container rounded-xl overflow-hidden border border-outline-variant relative group w-full h-[250px] md:h-[300px]">
              <iframe
                :src="facility.maps_embed_url"
                class="w-full h-full border-0 grayscale md:grayscale-0"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade">
              </iframe>
              <a :href="facility.maps_url" target="_blank" class="absolute bottom-4 left-4 right-4 bg-surface/90 backdrop-blur-sm p-3 rounded-lg text-center font-label-sm font-bold hover:bg-surface transition-colors cursor-pointer block text-on-surface shadow-md">
                Buka di Google Maps
              </a>
            </div>
          </div>
        </aside>

      </div>
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

const openFaq = ref(0)
const toggleFaq = (index) => {
    openFaq.value = openFaq.value === index ? null : index
}

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

const showAllGallery = ref(false)

const displayedGallery = computed(() => {
    if (!facility.value.gallery) return []
    return showAllGallery.value
        ? facility.value.gallery
        : facility.value.gallery.slice(0, 4)
})

const facility = computed(() => {
    return db.value.facilities.find(f => f.id == route.params.id) || db.value.facilities[0]
})
</script>

<style scoped>
body {
  padding-right: var(--scrollbar-width, 0px);
}
</style>
