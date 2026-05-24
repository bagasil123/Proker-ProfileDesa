<template>
  <main>
    <section class="relative bg-primary-container py-xl text-on-primary-container overflow-hidden">
      <div class="absolute inset-0 opacity-10 pointer-events-none">
        <div class="grid grid-cols-6 h-full">
          <div class="border-r border-on-primary-container"></div>
          <div class="border-r border-on-primary-container"></div>
          <div class="border-r border-on-primary-container"></div>
          <div class="border-r border-on-primary-container"></div>
          <div class="border-r border-on-primary-container"></div>
        </div>
      </div>
      <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        <h1 class="font-display-lg text-display-lg mb-sm md:max-w-2xl">Fasilitas &amp; Layanan Masyarakat</h1>
        <p class="font-body-lg text-body-lg max-w-xl opacity-90">
          Menyediakan sarana prasarana terbaik dan pelayanan publik yang transparan untuk kesejahteraan seluruh warga Desa {{ db.villages.name }}.
        </p>
      </div>
    </section>
    <section class="py-xl bg-surface">
      <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div class="mb-lg">
          <h2 class="font-headline-lg text-headline-lg text-on-surface mb-xs">Fasilitas Desa</h2>
          <p class="font-body-md text-body-md text-on-surface-variant">Sarana publik yang tersedia untuk menunjang aktivitas warga desa.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
          <div v-for="facility in db.facilities" :key="facility.id" class="group facility-card bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden hover:shadow-lg transition-all duration-300">
            <div class="h-56 relative overflow-hidden">
              <img :class="['w-full h-full object-cover group-hover:scale-105 transition-transform duration-500']" :alt="facility.name" :src="facility.image_path"/>
              <div :class="['absolute top-4 left-4 px-sm py-1 rounded-full text-label-sm', facility.color_class]">
                {{ facility.category }}
              </div>
            </div>
            <div class="p-md">
              <h3 class="font-headline-sm text-headline-sm text-on-surface mb-sm">{{ facility.name }}</h3>
              <div class="space-y-sm mb-lg">
                <div class="flex items-start gap-sm">
                  <span :class="['material-symbols-outlined text-[20px]', facility.text_color_class]">location_on</span>
                  <span class="font-body-sm text-body-sm text-on-surface-variant">{{ facility.address }}</span>
                </div>
                <div class="flex items-center gap-sm">
                  <span :class="['material-symbols-outlined text-[20px]', facility.text_color_class]">schedule</span>
                  <span class="font-body-sm text-body-sm text-on-surface-variant">{{ facility.schedule }}</span>
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <router-link :to="`/fasilitas/${facility.id}`" class="flex items-center justify-center gap-xs w-full py-sm bg-surface-container-high text-on-surface font-label-md rounded-lg transition-colors border border-outline-variant hover:bg-surface-container-highest">
                  <span class="material-symbols-outlined">info</span> Lihat Detail
                </router-link>
                <a :class="['flex items-center justify-center gap-xs w-full py-sm bg-surface-container-high font-label-md rounded-lg transition-colors', facility.text_color_class, facility.hover_class]" :href="facility.maps_url" target="_blank">
                  <span class="material-symbols-outlined">map</span> Petunjuk Lokasi
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="py-xl bg-surface-container-low">
      <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div class="flex flex-col lg:flex-row gap-xl items-center">
          <div class="lg:w-1/2">
            <h2 class="font-headline-lg text-headline-lg text-on-surface mb-md">Layanan Administrasi Desa</h2>
            <p class="font-body-lg text-body-lg text-on-surface-variant mb-lg">
              Kami berkomitmen memberikan pelayanan administrasi yang cepat, tepat, dan tanpa pungutan liar. Simak panduan pengurusan dokumen berikut:
            </p>
            <div class="space-y-md">
              <div v-for="service in db.administrative_services" :key="service.id" class="flex gap-md p-md bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm">
                <div :class="['w-12 h-12 flex items-center justify-center rounded-lg shrink-0', service.color_class]">
                  <span class="material-symbols-outlined">{{ service.icon }}</span>
                </div>
                <div>
                  <h4 class="font-headline-sm text-headline-sm text-on-surface mb-xs">{{ service.title }}</h4>
                  <p class="font-body-sm text-body-sm text-on-surface-variant">{{ service.description }}</p>
                </div>
              </div>
            </div>
            <div class="mt-lg">
              <button class="bg-primary text-on-primary px-lg py-sm rounded-lg font-label-md hover:shadow-lg transition-all">
                Pelajari Selengkapnya
              </button>
            </div>
          </div>
          <div class="lg:w-1/2 w-full">
            <div class="relative rounded-2xl overflow-hidden shadow-xl aspect-square md:aspect-video lg:aspect-square">
              <img class="w-full h-full object-cover" alt="Pelayanan Administrasi" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3zjAQDhx4-rZgtD-RYPzAj9fn5UMpnnCrg43pPnNd6S13x9nvwDP05OUGfLLJ0m7237XYwWRtDwthKCyAIajVjThDN9UxZbWMkDxZRp1m94lGbWEssKluoR2BEmQv70_3EaF3x5GhO68nd_uY46QlOgKVNKErXCOkpe_8c2g9QrzfoVvZU6yXUoOV_QzluYcsJHDoHYP6xNy280p_p_QHAsDQCFKtA5iaTPh1b7Ky5_1P0F9nNU65rGrtJXO7AS6YC1IjTCisfL8"/>
              <div class="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
              <div class="absolute bottom-6 left-6 text-on-primary">
                <p class="font-headline-sm text-headline-sm mb-1 italic">"Melayani dengan Hati, Membangun dengan Dedikasi"</p>
                <p class="text-label-sm opacity-80">Pelayanan Terpadu Satu Pintu {{ db.villages.name }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="py-xl">
      <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div class="bg-primary rounded-[2rem] p-lg md:p-xl text-center text-on-primary relative overflow-hidden">
          <div class="absolute -top-12 -right-12 w-48 h-48 bg-on-primary/10 rounded-full blur-3xl"></div>
          <div class="absolute -bottom-12 -left-12 w-48 h-48 bg-on-primary/10 rounded-full blur-3xl"></div>
          <div class="relative z-10">
            <h2 class="font-headline-lg text-headline-lg mb-md">Ada Kendala Terkait Fasilitas &amp; Layanan?</h2>
            <p class="font-body-lg text-body-lg max-w-2xl mx-auto mb-lg opacity-90">
              Silakan hubungi layanan bantuan kami atau datang langsung ke Balai Desa. Kami siap membantu kebutuhan Anda.
            </p>
            <div class="flex flex-col sm:flex-row justify-center gap-md">
              <router-link class="bg-on-primary text-primary px-lg py-sm rounded-full font-label-md hover:bg-surface transition-all inline-flex items-center justify-center gap-xs" to="/kontak">
                <span class="material-symbols-outlined">call</span> Hubungi Kami
              </router-link>
              <a class="border border-on-primary text-on-primary px-lg py-sm rounded-full font-label-md hover:bg-on-primary/10 transition-all inline-flex items-center justify-center gap-xs" target="_blank" :href="'https://wa.me/' + db.contact_infos.phone.replace(/[^0-9]/g, '')">
                <span class="material-symbols-outlined">chat</span> WhatsApp Pengaduan
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { database } from '@/data/db.js'

const db = ref(database)
</script>

<style scoped>
.facility-card:hover .map-overlay {
    opacity: 1;
}
</style>
