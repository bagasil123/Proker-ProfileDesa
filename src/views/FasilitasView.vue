<template>
  <main>
    <!-- 1. HEADER FASILITAS -->
    <section class="relative bg-primary-container py-12 md:py-xl text-on-primary-container overflow-hidden">
      <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10 text-center md:text-left">
        <h1 class="font-display-lg font-bold text-4xl md:text-display-lg mb-4 md:mb-sm md:max-w-2xl">
          Fasilitas &amp; Layanan Masyarakat
        </h1>
        <p class="font-body-md md:font-body-lg max-w-xl mx-auto md:mx-0 opacity-90">
          Menyediakan sarana prasarana terbaik dan pelayanan publik yang transparan untuk kesejahteraan seluruh warga Desa {{ db.villages.name }}.
        </p>
      </div>
    </section>

    <!-- 2. GRID FASILITAS -->
    <section class="py-12 md:py-xl bg-surface">
      <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div class="mb-8 md:mb-lg text-center md:text-left">
          <h2 class="text-2xl font-headline-md md:font-headline-lg font-bold text-on-surface mb-2 md:mb-xs">Fasilitas Desa</h2>
          <p class="font-body-sm md:font-body-md text-on-surface-variant">Sarana publik yang tersedia untuk menunjang aktivitas warga desa.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-md">
          <div v-for="facility in paginatedFacilities" :key="facility.id" class="group facility-card bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
            <div class="h-48 md:h-56 relative overflow-hidden flex-shrink-0">
              <img :class="['w-full h-full object-cover group-hover:scale-105 transition-transform duration-500']" :alt="facility.name" :src="facility.image_path"/>
              <div :class="['absolute top-4 left-4 px-3 py-1 rounded-full text-label-sm font-bold shadow-sm', facility.color_class]">
                {{ facility.category }}
              </div>
            </div>
            <div class="p-4 md:p-md flex flex-col flex-grow">
              <h3 class="font-headline-sm font-bold text-on-surface mb-3 md:mb-sm">{{ facility.name }}</h3>
              <div class="space-y-2 md:space-y-sm mb-4 md:mb-lg">
                <div class="flex items-start gap-2 md:gap-sm">
                  <span :class="['material-symbols-outlined text-[18px] md:text-[20px]', facility.text_color_class]">location_on</span>
                  <span class="font-body-sm text-on-surface-variant">{{ facility.address }}</span>
                </div>
                <div class="flex items-center gap-2 md:gap-sm">
                  <span :class="['material-symbols-outlined text-[18px] md:text-[20px]', facility.text_color_class]">schedule</span>
                  <span class="font-body-sm text-on-surface-variant">{{ facility.schedule }}</span>
                </div>
              </div>

              <div class="flex flex-col gap-2 mt-auto pt-4 border-t border-outline-variant/50">
                <router-link :to="`/fasilitas/${facility.id}`" class="flex items-center justify-center gap-2 py-3 bg-surface-container-high text-on-surface font-label-md rounded-lg transition-all border border-outline-variant hover:bg-surface-container-highest w-full group-hover:bg-primary group-hover:text-on-primary group-hover:border-primary font-bold">
                  <span class="material-symbols-outlined text-[18px]">visibility</span> Lihat Fasilitas
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- PAGINATION -->
        <div class="mt-8 md:mt-xl flex flex-col md:flex-row items-center justify-between gap-4 md:gap-md" v-if="filteredFacilities.length > 0">
          <span class="font-body-sm text-on-surface-variant text-center md:text-left">
            Menampilkan {{ (currentPage - 1) * itemsPerPage + 1 }}-{{ Math.min(currentPage * itemsPerPage, filteredFacilities.length) }} dari {{ filteredFacilities.length }} fasilitas
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
                'w-10 h-10 flex items-center justify-center rounded-full font-label-md transition-colors font-bold',
                currentPage === page ? 'bg-primary text-on-primary' : 'border border-outline-variant text-on-surface-variant hover:bg-surface-container-high'
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
      </div>
    </section>

    <!-- 3. LAYANAN ADMINISTRASI -->
    <section class="py-12 md:py-xl bg-surface-container-low">
      <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div class="flex flex-col lg:flex-row gap-8 lg:gap-xl items-center">
          <div class="lg:w-1/2 text-center md:text-left">
            <h2 class="text-2xl font-headline-md md:font-headline-lg font-bold text-on-surface mb-3 md:mb-md">Layanan Administrasi Desa</h2>
            <p class="font-body-sm md:font-body-lg text-on-surface-variant mb-6 md:mb-lg">
              Kami berkomitmen memberikan pelayanan administrasi yang cepat, tepat, dan tanpa pungutan liar. Simak panduan pengurusan dokumen berikut:
            </p>
            <div class="space-y-3 md:space-y-md text-left">
              <div v-for="service in db.administrative_services" :key="service.id" class="flex gap-4 md:gap-md p-4 md:p-md bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow">
                <div :class="['w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-lg shrink-0', service.color_class]">
                  <span class="material-symbols-outlined text-[20px] md:text-[24px]">{{ service.icon }}</span>
                </div>
                <div>
                  <h4 class="font-headline-sm text-sm md:text-headline-sm font-bold text-on-surface mb-1">{{ service.title }}</h4>
                  <p class="font-body-sm text-on-surface-variant">{{ service.description }}</p>
                </div>
              </div>
            </div>
            <div class="mt-6 md:mt-lg">
              <button class="bg-primary text-on-primary w-full md:w-auto px-6 py-3 md:py-sm rounded-lg font-label-md font-bold hover:opacity-90 transition-opacity">
                Pelajari Selengkapnya
              </button>
            </div>
          </div>
          <div class="lg:w-1/2 w-full mt-4 md:mt-0">
            <div class="relative rounded-2xl overflow-hidden shadow-xl aspect-square md:aspect-video lg:aspect-square">
              <img class="w-full h-full object-cover" alt="Pelayanan Administrasi" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3zjAQDhx4-rZgtD-RYPzAj9fn5UMpnnCrg43pPnNd6S13x9nvwDP05OUGfLLJ0m7237XYwWRtDwthKCyAIajVjThDN9UxZbWMkDxZRp1m94lGbWEssKluoR2BEmQv70_3EaF3x5GhO68nd_uY46QlOgKVNKErXCOkpe_8c2g9QrzfoVvZU6yXUoOV_QzluYcsJHDoHYP6xNy280p_p_QHAsDQCFKtA5iaTPh1b7Ky5_1P0F9nNU65rGrtJXO7AS6YC1IjTCisfL8"/>
              <div class="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
              <div class="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-on-primary">
                <p class="font-headline-sm text-base md:text-headline-sm font-bold mb-1 italic">"Melayani dengan Hati, Membangun dengan Dedikasi"</p>
                <p class="text-label-sm opacity-80">Pelayanan Terpadu Satu Pintu {{ db.villages.name }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. CALL TO ACTION PENGADUAN -->
    <section class="py-12 md:py-xl">
      <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div class="bg-primary rounded-[2rem] p-6 md:p-xl text-center text-on-primary relative overflow-hidden shadow-lg">
          <div class="absolute -top-12 -right-12 w-32 h-32 md:w-48 md:h-48 bg-on-primary/10 rounded-full blur-2xl md:blur-3xl"></div>
          <div class="absolute -bottom-12 -left-12 w-32 h-32 md:w-48 md:h-48 bg-on-primary/10 rounded-full blur-2xl md:blur-3xl"></div>
          <div class="relative z-10">
            <h2 class="font-headline-md md:font-headline-lg font-bold mb-3 md:mb-md">Ada Kendala Terkait Fasilitas &amp; Layanan?</h2>
            <p class="font-body-sm md:font-body-lg max-w-2xl mx-auto mb-6 md:mb-lg opacity-90">
              Silakan hubungi layanan bantuan kami atau datang langsung ke Balai Desa. Kami siap membantu kebutuhan Anda.
            </p>
            <div class="flex flex-col sm:flex-row justify-center gap-3 md:gap-md">
              <router-link class="w-full sm:w-auto bg-on-primary text-primary px-6 py-3 md:py-sm rounded-full font-label-md font-bold hover:bg-surface transition-all inline-flex items-center justify-center gap-2" to="/kontak">
                <span class="material-symbols-outlined text-[20px]">call</span> Hubungi Kami
              </router-link>
              <a class="w-full sm:w-auto border border-on-primary text-on-primary px-6 py-3 md:py-sm rounded-full font-label-md font-bold hover:bg-on-primary/10 transition-all inline-flex items-center justify-center gap-2" target="_blank" :href="'https://wa.me/' + db.contact_infos.phone.replace(/[^0-9]/g, '')">
                <span class="material-symbols-outlined text-[20px]">chat</span> WhatsApp Pengaduan
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { database } from '@/data/db.js'

const db = ref(database)

const currentPage = ref(1)
const itemsPerPage = 6

const filteredFacilities = computed(() => {
    return db.value.facilities
})

const totalPages = computed(() => {
    return Math.max(1, Math.ceil(filteredFacilities.value.length / itemsPerPage))
})

const paginatedFacilities = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return filteredFacilities.value.slice(start, end)
})

const changePage = (page) => {
    currentPage.value = page
    window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.facility-card:hover .map-overlay {
    opacity: 1;
}
</style>
