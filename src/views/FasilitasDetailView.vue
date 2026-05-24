<template>
  <main class="pb-xl">
    <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
      <nav class="flex items-center gap-xs mb-md text-on-surface-variant font-body-sm text-body-sm mt-6">
        <!-- <router-link to="/" class="hover:text-primary">Beranda</router-link>
        <span class="material-symbols-outlined text-[16px]">chevron_right</span> -->
        <router-link to="/fasilitas" class="hover:text-primary">Fasilitas</router-link>
        <span class="material-symbols-outlined text-[16px]">chevron_right</span>
        <span class="text-primary font-medium">{{ facility.name }}</span>
      </nav>
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-md items-start">
        <div class="lg:col-span-8 space-y-lg">
          <div class="relative group overflow-hidden rounded-xl bg-surface-container shadow-sm border border-outline-variant">
            <img :alt="facility.name" class="w-full aspect-[16/9] object-cover transition-transform duration-700 group-hover:scale-105" :src="facility.image_path"/>
            <div class="absolute top-4 left-4">
              <span class="bg-secondary-container text-on-secondary-container px-md py-1 rounded-full font-label-sm text-label-sm flex items-center gap-1">
                <span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">health_and_safety</span>
                {{ facility.category }}
              </span>
            </div>
          </div>
          <section class="space-y-md">
            <div class="space-y-xs">
              <h1 class="font-headline-lg text-headline-lg md:text-headline-lg text-on-surface">{{ facility.name }}</h1>
              <p class="text-on-surface-variant font-body-lg text-body-lg leading-relaxed">
                {{ facility.description }}
              </p>
            </div>

            <div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-md">
              <h2 class="font-headline-sm text-headline-sm text-primary mb-sm">Layanan Utama</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-sm">
                <div v-for="(service, index) in facility.mainServices" :key="index" class="flex items-start gap-sm p-sm rounded-lg bg-surface-container-low">
                  <div class="p-2 bg-primary-container text-on-primary-container rounded-lg">
                    <span class="material-symbols-outlined">{{ service.icon }}</span>
                  </div>
                  <div>
                    <p class="font-label-md text-label-md text-on-surface">{{ service.name }}</p>
                    <p class="font-body-sm text-body-sm text-on-surface-variant">{{ service.desc }}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section class="space-y-md">
            <div class="flex justify-between items-end">
              <h2 class="font-headline-sm text-headline-sm text-on-surface">Galeri Fasilitas</h2>
              <button class="text-primary font-label-md text-label-md hover:underline">Lihat Semua</button>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-sm">
              <div v-for="(img, index) in (facility.gallery || [])" :key="index" class="aspect-square rounded-lg overflow-hidden border border-outline-variant">
                <img :alt="img.alt" class="w-full h-full object-cover hover:scale-110 transition-transform duration-500" :src="img.src"/>
              </div>
            </div>
          </section>
          <section class="space-y-md">
            <h2 class="font-headline-sm text-headline-sm text-on-surface">Pertanyaan Umum (FAQ)</h2>
            <div class="space-y-sm">
              <div v-for="(faq, index) in facility.faqs" :key="index" class="bg-surface-container-low rounded-xl p-md border border-outline-variant">
                <button class="flex w-full justify-between items-center text-left" @click="toggleFaq(index)">
                  <span class="font-label-md text-label-md text-on-surface">{{ faq.question }}</span>
                  <span class="material-symbols-outlined transition-transform duration-300" :class="{ 'rotate-180': openFaq === index }">expand_more</span>
                </button>
                <div v-show="openFaq === index" class="mt-sm font-body-sm text-body-sm text-on-surface-variant">
                  {{ faq.answer }}
                </div>
              </div>
            </div>
          </section>
        </div>
        <aside class="lg:col-span-4 space-y-md mt-6 lg:mt-0">
          <div class="sticky top-24 space-y-md">
            <div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm">
              <h3 class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-md">Informasi Penting</h3>
              <div class="space-y-md">
                <div class="flex gap-md">
                  <span class="material-symbols-outlined text-primary">location_on</span>
                  <div>
                    <p class="font-label-md text-label-md text-on-surface">Alamat</p>
                    <p class="font-body-sm text-body-sm text-on-surface-variant">{{ facility.address }}</p>
                  </div>
                </div>
                <div class="flex gap-md">
                  <span class="material-symbols-outlined text-primary">schedule</span>
                  <div>
                    <p class="font-label-md text-label-md text-on-surface">Jam Operasional</p>
                    <p class="font-body-sm text-body-sm text-on-surface-variant">{{ facility.schedule }}</p>
                  </div>
                </div>
                <div class="flex gap-md">
                  <span class="material-symbols-outlined text-primary">person</span>
                  <div>
                    <p class="font-label-md text-label-md text-on-surface">Kontak Person</p>
                    <p class="font-body-sm text-body-sm text-on-surface-variant">{{ facility.contactName }}</p>
                    <p class="font-body-sm text-body-sm text-primary font-medium">{{ facility.contactPhone }}</p>
                  </div>
                </div>
              </div>
              <div class="mt-xl space-y-sm">
                <a :href="facility.maps_url" target="_blank" class="w-full flex items-center justify-center gap-2 bg-primary text-on-primary h-12 rounded-full font-label-md text-label-md hover:shadow-lg transition-all">
                  <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">directions</span>
                  Petunjuk Arah
                </a>
                <a :href="`tel:${facility.contactPhone.replace(/[^0-9+]/g, '')}`" class="w-full flex items-center justify-center gap-2 border border-primary text-primary h-12 rounded-full font-label-md text-label-md hover:bg-primary-container/10 transition-all">
                  <span class="material-symbols-outlined">call</span>
                  Hubungi Sekarang
                </a>
              </div>
            </div>
            <div class="bg-surface-container rounded-xl overflow-hidden border border-outline-variant relative group w-full h-[300px]">
              <iframe
                :src="facility.maps_embed_url"
                class="w-full h-full border-0"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade">
              </iframe>
              <a :href="facility.maps_url" target="_blank" class="absolute bottom-4 left-4 right-4 bg-surface/90 backdrop-blur-sm p-2 rounded-lg text-center font-label-sm text-label-sm hover:bg-surface transition-colors cursor-pointer block text-on-surface">
                Buka di Google Maps
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
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

const facility = computed(() => {
    return db.value.facilities.find(f => f.id == route.params.id) || db.value.facilities[1]
})
</script>

<style scoped>
</style>
