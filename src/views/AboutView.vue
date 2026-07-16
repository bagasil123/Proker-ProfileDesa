<template>
  <main>
    <!-- 1. HEADER PROFIL -->
    <section class="relative bg-primary-container py-12 md:py-xl text-on-primary-container overflow-hidden">
      <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10 text-center md:text-left">
        <h1 class="font-display-lg font-bold text-4xl sm:text-5xl md:text-display-lg mb-4 md:mb-sm md:max-w-2xl">
           {{ db.villages.name }}
        </h1>
        <p class="font-body-md md:font-body-lg max-w-xl mx-auto md:mx-0 opacity-90">
           {{ db.villages.tagline }}
        </p>
      </div>
    </section>

    <!-- 2. SEJARAH DESA -->
    <section class="py-12 md:py-xl">
      <div class="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div class="grid md:grid-cols-2 gap-8 md:gap-xl items-center">
          <div class="relative rounded-xl overflow-hidden shadow-sm aspect-[4/3]">
            <img alt="Sejarah Desa" class="w-full h-full object-cover" :src="db.village_profiles.history_image_path">
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>
          <div>
            <div class="flex items-center justify-center md:justify-start gap-2 text-primary font-label-md mb-2">
              <span class="material-symbols-outlined">history_edu</span>
              Sejarah Desa
            </div>
            <h2 class="font-headline-md text-headline-md text-on-surface mb-6 text-center md:text-left">Jejak Langkah {{ db.villages.name }}</h2>
            <div class="space-y-4 text-on-surface-variant font-body-md leading-relaxed text-justify md:text-left">
              <p v-for="(paragraph, index) in db.village_profiles.history.split('\n\n')" :key="index">
                {{ paragraph }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. VISI MISI -->
    <section class="py-12 md:py-xl bg-surface-container-low">
      <div class="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center mb-8 md:mb-12">
        <h2 class="font-headline-md text-headline-md text-on-surface mb-4">Visi &amp; Misi Kami</h2>
        <div class="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
      </div>
      <div class="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto grid md:grid-cols-2 gap-6 md:gap-md">
        <div class="bg-primary text-on-primary p-6 md:p-xl rounded-xl shadow-lg flex flex-col items-center text-center">
          <span class="material-symbols-outlined text-5xl mb-4 md:mb-6">visibility</span>
          <h3 class="font-headline-sm text-headline-sm mb-4">Visi</h3>
          <p class="font-body-lg text-body-md md:text-body-lg italic">"{{ db.village_profiles.vision }}"</p>
        </div>
        <div class="bg-surface-container-lowest p-6 md:p-xl rounded-xl shadow-sm border border-outline-variant">
          <div class="flex items-center gap-4 mb-6 md:mb-8">
            <div class="w-12 h-12 bg-primary-fixed flex items-center justify-center rounded-lg text-primary">
              <span class="material-symbols-outlined">rocket_launch</span>
            </div>
            <h3 class="font-headline-sm text-headline-sm text-on-surface">Misi</h3>
          </div>
          <ul class="space-y-4 md:space-y-6">
            <li v-for="(mission, index) in JSON.parse(db.village_profiles.mission)" :key="index" class="flex gap-4">
              <span class="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex-shrink-0 flex items-center justify-center font-bold text-sm">{{ index + 1 }}</span>
              <p class="text-on-surface-variant font-body-sm md:font-body-md">{{ mission }}</p>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- GALERI DESA CIANTEN -->
    <section class="py-12 md:py-xl" v-if="db.village_profiles.gallery && db.village_profiles.gallery.length > 0">
      <div class="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <!-- Header -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <div class="flex items-center justify-center md:justify-start gap-2 text-primary font-label-md mb-2">
              <span class="material-symbols-outlined">photo_library</span>
              Galeri Desa
            </div>
            <h2 class="font-headline-md text-headline-md text-on-surface mb-2 text-center md:text-left">Galeri Desa {{ db.villages.name }}</h2>
            <p class="font-body-md text-on-surface-variant max-w-2xl text-center md:text-left">
              Potret keindahan alam, keseharian, dan semangat kebersamaan warga.
            </p>
          </div>
          <button
            @click="toggleGalleryMode"
            class="gallery-toggle-btn group flex items-center gap-2 px-5 py-2.5 rounded-full font-label-md font-bold transition-all duration-300 shrink-0 self-center md:self-auto"
            :class="showAllGallery
              ? 'bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary'
              : 'bg-primary text-on-primary hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5'"
          >
            <span class="material-symbols-outlined text-lg transition-transform duration-300" :class="{ 'rotate-180': showAllGallery }">
              {{ showAllGallery ? 'view_carousel' : 'grid_view' }}
            </span>
            {{ showAllGallery ? 'Mode Carousel' : 'Lihat Selengkapnya' }}
          </button>
        </div>

        <!-- CAROUSEL MODE -->
        <div v-if="!showAllGallery" class="gallery-carousel-wrapper">
          <div class="relative">
            <!-- Carousel Container -->
            <div
              ref="carouselRef"
              class="gallery-carousel overflow-hidden rounded-2xl"
              @touchstart="onTouchStart"
              @touchmove="onTouchMove"
              @touchend="onTouchEnd"
              @mousedown="onMouseDown"
              @mousemove="onMouseMove"
              @mouseup="onMouseUp"
              @mouseleave="onMouseUp"
            >
              <div
                class="gallery-carousel-track flex transition-transform duration-500 ease-out"
                :style="{ transform: `translateX(-${currentSlide * (100 / slidesPerView)}%)` }"
              >
                <div
                  v-for="(img, index) in db.village_profiles.gallery"
                  :key="index"
                  class="gallery-slide flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-2"
                >
                  <div
                    @click="openLightbox(img)"
                    class="gallery-card relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer border border-outline-variant/30 shadow-md hover:shadow-xl transition-all duration-500"
                  >
                    <img
                      :src="img.src"
                      :alt="img.alt"
                      class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <!-- Overlay gradient -->
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <!-- Caption -->
                    <div class="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p class="text-white font-label-md drop-shadow-md">{{ img.alt }}</p>
                    </div>
                    <!-- Zoom icon -->
                    <div class="absolute inset-0 flex items-center justify-center">
                      <div class="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                        <span class="material-symbols-outlined text-white text-2xl">zoom_in</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Navigation Buttons -->
            <button
              v-if="currentSlide > 0"
              @click="prevSlide"
              class="absolute left-2 md:-left-5 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center text-on-surface transition-all duration-300 hover:scale-110 z-10 backdrop-blur-sm"
            >
              <span class="material-symbols-outlined">chevron_left</span>
            </button>
            <button
              v-if="currentSlide < maxSlide"
              @click="nextSlide"
              class="absolute right-2 md:-right-5 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center text-on-surface transition-all duration-300 hover:scale-110 z-10 backdrop-blur-sm"
            >
              <span class="material-symbols-outlined">chevron_right</span>
            </button>
          </div>

          <!-- Dot Indicators -->
          <div class="flex items-center justify-center gap-2 mt-6">
            <button
              v-for="dot in maxSlide + 1"
              :key="dot - 1"
              @click="goToSlide(dot - 1)"
              class="gallery-dot rounded-full transition-all duration-300"
              :class="currentSlide === dot - 1
                ? 'w-8 h-2.5 bg-primary'
                : 'w-2.5 h-2.5 bg-outline-variant hover:bg-primary/50'"
            ></button>
          </div>
        </div>

        <!-- GRID MODE (Lihat Selengkapnya) -->
        <div v-else>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            <div
              v-for="(img, index) in db.village_profiles.gallery"
              :key="index"
              @click="openLightbox(img)"
              class="gallery-grid-item relative aspect-square rounded-xl overflow-hidden group border border-outline-variant/30 shadow-sm cursor-pointer"
              :style="{ animationDelay: `${index * 80}ms` }"
            >
              <img
                :src="img.src"
                :alt="img.alt"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p class="text-white font-label-sm drop-shadow-md">{{ img.alt }}</p>
              </div>
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                  <span class="material-symbols-outlined text-white text-xl">zoom_in</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

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

    <!-- 4. STRUKTUR ORGANISASI -->
    <section class="py-12 md:py-xl">
      <div class="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div class="text-center mb-8 md:mb-12">
          <h2 class="font-headline-md text-headline-md text-on-surface mb-2">Struktur Organisasi</h2>
          <p class="text-on-surface-variant">Hierarki Kepengurusan {{ db.villages.name }}</p>
        </div>

        <div class="bg-surface-container-low p-4 md:p-xl rounded-xl border border-outline-variant overflow-hidden">

          <!-- TAMPILAN MOBILE (HP) -->
          <div class="flex flex-col items-center gap-4 lg:hidden w-full py-4">
            <!-- BPD -->
            <div class="w-full max-w-[250px] p-4 bg-surface-container-highest text-on-surface rounded-xl border border-outline-variant text-center shadow-sm" v-if="getOfficial(1)">
              <div class="font-label-md text-on-surface-variant mb-1">BPD</div>
              <div class="font-headline-sm font-bold">{{ getOfficial(1).name }}</div>
            </div>
            <div class="w-px h-6 bg-outline"></div>

            <!-- KETUA RW -->
            <div class="w-full max-w-[280px] p-6 bg-primary text-on-primary rounded-xl shadow-md text-center" v-if="getOfficial(2)">
              <div class="font-label-md opacity-80 mb-1">Ketua RW</div>
              <div class="font-headline-sm font-bold">{{ getOfficial(2).name }}</div>
            </div>

            <!-- Garis Putus-putus -->
            <div class="w-full border-t-2 border-dashed border-outline my-4 relative">
               <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface-container-low px-3 py-1 rounded-full text-xs text-outline font-bold text-center w-max max-w-full">JAJARAN KETUA RT</span>
            </div>

            <!-- 8 RT (Grid 2 Kolom) -->
            <div class="grid grid-cols-2 gap-3 w-full">
              <div v-for="i in [3,4,5,6,7,8,9,10]" :key="i">
                <div class="p-3 bg-white rounded-lg border border-outline-variant text-center shadow-sm h-full flex flex-col justify-center" v-if="getOfficial(i)">
                  <div class="text-[10px] text-primary font-bold uppercase mb-1">{{ getOfficial(i).position }}</div>
                  <div class="font-label-sm font-bold">{{ getOfficial(i).name }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- TAMPILAN DESKTOP (PC/Laptop) -->
          <div class="hidden lg:flex flex-col items-center min-w-[1000px] pb-16 overflow-x-auto">

            <!-- BPD -->
            <div class="flex flex-col items-center z-10">
              <div @click="scrollToSection('perangkat-desa')" class="p-4 bg-surface-container-highest text-on-surface rounded-xl border border-outline-variant w-64 text-center shadow-sm z-10 hover:shadow-md cursor-pointer transition-shadow" v-if="getOfficial(1)">
                <div class="font-label-md text-on-surface-variant mb-1">BPD</div>
                <div class="font-headline-sm font-bold">{{ getOfficial(1).name }}</div>
              </div>
              <div class="w-px h-8 bg-outline"></div>
            </div>

            <!-- KETUA RW -->
            <div class="flex flex-col items-center z-10">
              <div @click="scrollToSection('perangkat-desa')" class="relative p-6 bg-primary text-on-primary rounded-xl shadow-md w-72 text-center z-10 hover:shadow-lg cursor-pointer transition-shadow" v-if="getOfficial(2)">
                <div class="font-label-md opacity-80 mb-1">Ketua RW</div>
                <div class="font-headline-sm font-bold">{{ getOfficial(2).name }}</div>
              </div>
              <div class="w-px h-8 bg-outline"></div>
            </div>

            <!-- 8 KETUA RT SEJAJAR -->
            <div class="relative w-full flex flex-col items-center z-0">
              <!-- Garis Penghubung Horizontal (Diukur presisi 1/16 untuk 8 item) -->
              <div class="absolute top-0 left-[calc(100%/16)] right-[calc(100%/16)] border-t-2 border-outline z-0"></div>
              <div class="absolute top-0 w-px h-full bg-outline z-0"></div> <!-- Garis vertikal tengah -->

              <div class="flex w-full justify-between mt-0">
                <div v-for="i in [3,4,5,6,7,8,9,10]" :key="i" class="relative flex flex-col items-center flex-1">
                  <!-- Garis vertikal pendek ke masing-masing RT -->
                  <div class="w-px h-8 bg-outline z-0"></div>
                  <!-- Kotak RT -->
                  <div @click="scrollToSection('perangkat-desa')" class="p-3 bg-white rounded-lg border border-outline-variant w-[85%] text-center shadow-sm z-10 hover:-translate-y-1 hover:shadow-md transition-all cursor-pointer" v-if="getOfficial(i)">
                    <div class="text-[10px] text-primary font-bold uppercase mb-1">{{ getOfficial(i).position }}</div>
                    <div class="font-label-sm font-bold">{{ getOfficial(i).name }}</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>

    <!-- 5. PERANGKAT DESA -->
    <section id="perangkat-desa" class="py-12 md:py-xl bg-surface-container-lowest">
      <div class="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4">
          <div>
            <h2 class="font-headline-md text-headline-md text-on-surface mb-2">Perangkat Desa</h2>
            <p class="text-on-surface-variant font-body-sm md:font-body-md">Tim Pengabdi Masyarakat {{ db.villages.name }}</p>
          </div>
          <button @click="showAllOfficials = !showAllOfficials" class="text-primary font-label-md flex items-center gap-1 hover:underline w-full md:w-auto justify-end">
            {{ showAllOfficials ? 'Sembunyikan' : 'Lihat Semua' }} <span class="material-symbols-outlined text-sm">{{ showAllOfficials ? 'expand_less' : 'expand_more' }}</span>
          </button>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-md">
          <div v-for="official in getDisplayedOfficials" :key="official.id" class="group bg-white rounded-2xl border border-outline-variant overflow-hidden hover:shadow-lg transition-all duration-300">
            <div class="aspect-square relative overflow-hidden">
              <img :alt="official.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" :src="official.photo_path">
            </div>
            <div class="p-3 md:p-md text-center">
              <h4 class="font-headline-sm text-sm md:text-headline-sm text-on-surface mb-1">{{ official.name }}</h4>
              <p class="text-primary font-label-sm md:font-label-md">{{ official.position }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. STATISTIK WILAYAH -->
    <section class="py-12 md:py-xl">
      <div class="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div class="text-center mb-8 md:mb-12">
          <h2 class="font-headline-md text-headline-md text-on-surface mb-2">Statistik Wilayah</h2>
          <p class="text-on-surface-variant font-body-sm md:font-body-md">Gambaran Umum Demografi &amp; Geografi Desa</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-md">
          <div class="bg-primary-container p-6 md:p-xl rounded-2xl border border-outline-variant flex items-center gap-4 md:gap-6">
            <div class="w-12 h-12 md:w-16 md:h-16 bg-surface-container rounded-full flex items-center justify-center text-primary-container flex-shrink-0">
              <span class="material-symbols-outlined text-2xl md:text-3xl">square_foot</span>
            </div>
            <div>
              <div class="text-on-primary font-label-sm md:font-label-md">Luas Wilayah</div>
              <div class="text-3xl md:text-display-lg font-bold text-on-primary">{{ formatNumber(db.village_statistics.area_ha) }}<span class="text-headline-sm"> Ha</span></div>
            </div>
          </div>
          <div class="bg-primary-container p-6 md:p-xl rounded-2xl border border-outline-variant flex items-center gap-4 md:gap-6">
            <div class="w-12 h-12 md:w-16 md:h-16 bg-surface-container rounded-full flex items-center justify-center text-primary-container flex-shrink-0">
              <span class="material-symbols-outlined text-2xl md:text-3xl">groups</span>
            </div>
            <div>
              <div class="text-on-primary font-label-sm md:font-label-md">Jumlah Dusun</div>
              <div class="text-3xl md:text-display-lg font-bold text-on-primary">{{ db.village_statistics.dusun_count < 10 ? '0' + db.village_statistics.dusun_count : db.village_statistics.dusun_count }}<span class="text-headline-sm"> Dusun</span></div>
            </div>
          </div>
          <div class="bg-primary-container p-6 md:p-xl rounded-2xl border border-outline-variant flex items-center gap-4 md:gap-6">
            <div class="w-12 h-12 md:w-16 md:h-16 bg-surface-container rounded-full flex items-center justify-center text-primary-container flex-shrink-0">
              <span class="material-symbols-outlined text-2xl md:text-3xl">holiday_village</span>
            </div>
            <div>
              <div class="text-on-primary font-label-sm md:font-label-md">Total RT / RW</div>
              <div class="text-3xl md:text-display-lg font-bold text-on-primary">{{ db.village_statistics.rt_count }} / {{ db.village_statistics.rw_count < 10 ? '0' + db.village_statistics.rw_count : db.village_statistics.rw_count }}</div>
            </div>
          </div>
        </div>

        <div class="mt-4 md:mt-md bg-primary-container p-6 md:p-xl rounded-2xl border border-outline-variant shadow-sm flex flex-col md:flex-row items-center gap-6 md:gap-md text-center md:text-left">
          <div class="w-full md:w-1/3">
            <div class="text-4xl md:text-display-lg font-bold text-on-primary mb-1 md:mb-2">{{ formatNumber(db.village_statistics.population_total) }}</div>
            <div class="text-headline-sm text-on-primary mb-1">Total Penduduk</div>
            <p class="text-on-primary font-body-sm">Data kependudukan terbaru.</p>
          </div>
          <div class="flex-1 w-full grid grid-cols-2 gap-3 md:gap-4">
            <div class="p-3 md:p-4 bg-on-primary rounded-xl">
              <div class="flex items-center justify-center md:justify-start gap-1 md:gap-2 mb-2 text-primary-container">
                <span class="material-symbols-outlined text-[18px] md:text-xl">man</span>
                <span class="font-bold text-sm md:text-base">Laki-laki</span>
              </div>
              <div class="text-xl text-primary-container md:text-2xl font-bold">{{ formatNumber(db.village_statistics.population_male) }}</div>
            </div>
            <div class="p-3 md:p-4 bg-on-primary rounded-xl">
              <div class="flex items-center justify-center md:justify-start gap-1 md:gap-2 mb-2 text-primary-container">
                <span class="material-symbols-outlined text-[18px] md:text-xl">woman</span>
                <span class="font-bold text-sm md:text-base">Perempuan</span>
              </div>
              <div class="text-xl text-primary-container md:text-2xl font-bold">{{ formatNumber(db.village_statistics.population_female) }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { database } from '@/data/db.js'

const db = ref(database)
const showAllOfficials = ref(false)

// === GALLERY CAROUSEL ===
const showAllGallery = ref(false)
const currentSlide = ref(0)
const carouselRef = ref(null)
const slidesPerView = ref(3)
let autoplayTimer = null

// Touch/Mouse swipe tracking
const touchStartX = ref(0)
const touchCurrentX = ref(0)
const isDragging = ref(false)
const swipeThreshold = 50

// Calculate slides per view based on screen width
const updateSlidesPerView = () => {
  const width = window.innerWidth
  if (width < 768) slidesPerView.value = 1
  else if (width < 1024) slidesPerView.value = 2
  else slidesPerView.value = 3
}

const maxSlide = computed(() => {
  const gallery = db.value.village_profiles.gallery
  if (!gallery) return 0
  return Math.max(0, gallery.length - slidesPerView.value)
})

const nextSlide = () => {
  if (currentSlide.value < maxSlide.value) {
    currentSlide.value++
  } else {
    currentSlide.value = 0
  }
  resetAutoplay()
}

const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--
  } else {
    currentSlide.value = maxSlide.value
  }
  resetAutoplay()
}

const goToSlide = (index) => {
  currentSlide.value = index
  resetAutoplay()
}

// Touch events
const onTouchStart = (e) => {
  touchStartX.value = e.touches[0].clientX
  isDragging.value = true
  pauseAutoplay()
}

const onTouchMove = (e) => {
  if (!isDragging.value) return
  touchCurrentX.value = e.touches[0].clientX
}

const onTouchEnd = () => {
  if (!isDragging.value) return
  const diff = touchStartX.value - touchCurrentX.value
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) nextSlide()
    else prevSlide()
  }
  isDragging.value = false
  resetAutoplay()
}

// Mouse drag events
const onMouseDown = (e) => {
  touchStartX.value = e.clientX
  isDragging.value = true
  pauseAutoplay()
}

const onMouseMove = (e) => {
  if (!isDragging.value) return
  touchCurrentX.value = e.clientX
}

const onMouseUp = () => {
  if (!isDragging.value) return
  const diff = touchStartX.value - touchCurrentX.value
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) nextSlide()
    else prevSlide()
  }
  isDragging.value = false
  resetAutoplay()
}

// Toggle gallery mode
const toggleGalleryMode = () => {
  showAllGallery.value = !showAllGallery.value
  if (!showAllGallery.value) {
    currentSlide.value = 0
    startAutoplay()
  } else {
    pauseAutoplay()
  }
}

// Autoplay
const startAutoplay = () => {
  pauseAutoplay()
  autoplayTimer = setInterval(() => {
    if (currentSlide.value < maxSlide.value) {
      currentSlide.value++
    } else {
      currentSlide.value = 0
    }
  }, 4000)
}

const pauseAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

const resetAutoplay = () => {
  pauseAutoplay()
  startAutoplay()
}

onMounted(() => {
  updateSlidesPerView()
  window.addEventListener('resize', updateSlidesPerView)
  startAutoplay()
})

onUnmounted(() => {
  window.removeEventListener('resize', updateSlidesPerView)
  pauseAutoplay()
})

// === LIGHTBOX ===
const isLightboxOpen = ref(false)
const selectedImage = ref(null)

const openLightbox = (img) => {
    selectedImage.value = img
    isLightboxOpen.value = true
    document.body.style.overflow = 'hidden'
    pauseAutoplay()
}

const closeLightbox = () => {
    isLightboxOpen.value = false
    document.body.style.overflow = 'auto'
    setTimeout(() => { selectedImage.value = null }, 300)
    if (!showAllGallery.value) startAutoplay()
}

// === UTILITIES ===
const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const formatNumber = (num) => {
    return new Intl.NumberFormat('id-ID').format(num)
}

const getOfficial = (sortOrder) => {
    return db.value.village_officials.find(o => o.sort_order === sortOrder)
}

const getDisplayedOfficials = computed(() => {
    if (showAllOfficials.value) {
        return db.value.village_officials
    }
    return db.value.village_officials.slice(0, 4)
})

</script>

<style scoped>
.hero-gradient {
    background: linear-gradient(135deg, rgba(13, 99, 27, 0.05) 0%, rgba(255, 255, 255, 0) 100%);
}

/* Gallery Carousel */
.gallery-carousel {
  user-select: none;
  -webkit-user-select: none;
}

.gallery-carousel-track {
  will-change: transform;
}

.gallery-slide {
  width: 100%;
}

@media (min-width: 768px) {
  .gallery-slide {
    width: 50%;
  }
}

@media (min-width: 1024px) {
  .gallery-slide {
    width: 33.3333%;
  }
}

.gallery-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  pointer-events: none;
}

/* Grid animation */
.gallery-grid-item {
  animation: galleryFadeIn 0.5s ease-out both;
}

@keyframes galleryFadeIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Gallery toggle button */
.gallery-toggle-btn {
  position: relative;
  overflow: hidden;
}

.gallery-toggle-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%);
  pointer-events: none;
}

/* Dot indicator */
.gallery-dot {
  cursor: pointer;
}

.gallery-dot:hover {
  transform: scale(1.3);
}
</style>
