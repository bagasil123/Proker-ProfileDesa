<template>
  <main>
    <!-- 1. HEADER PROFIL -->
    <section class="relative bg-primary-container py-12 md:py-xl text-on-primary-container overflow-hidden">
      <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10 text-center md:text-left">
        <h1 class="font-display-lg font-bold text-4xl sm:text-5xl md:text-display-lg mb-4 md:mb-sm md:max-w-2xl">
          Profil Desa {{ db.villages.name }}
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

    <!-- 4. STRUKTUR ORGANISASI -->
    <section class="py-12 md:py-xl">
      <div class="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div class="text-center mb-8 md:mb-12">
          <h2 class="font-headline-md text-headline-md text-on-surface mb-2">Struktur Organisasi</h2>
          <p class="text-on-surface-variant">Hierarki Pemerintahan Desa {{ db.villages.name }}</p>
        </div>
        <div class="bg-surface-container-low p-4 md:p-xl rounded-xl border border-outline-variant overflow-hidden">
          <div class="flex flex-col items-center gap-4 lg:hidden w-full py-4">
            <!-- BPD -->
            <div class="w-full max-w-[250px] p-4 bg-surface-container-highest text-on-surface rounded-xl border border-outline-variant text-center shadow-sm" v-if="getOfficial(2)">
              <div class="font-label-md text-on-surface-variant mb-1">Ketua BPD</div>
              <div class="font-headline-sm">{{ getOfficial(2).name }}</div>
            </div>
            <div class="w-px h-6 bg-outline"></div>

            <!-- KADES -->
            <div class="w-full max-w-[280px] p-6 bg-primary text-on-primary rounded-xl shadow-md text-center" v-if="getOfficial(1)">
              <div class="font-label-md opacity-80 mb-1">Kepala Desa</div>
              <div class="font-headline-sm">{{ getOfficial(1).name }}</div>
            </div>
            <div class="w-px h-6 bg-outline"></div>

            <!-- SEKDES -->
            <div class="w-full max-w-[250px] p-4 bg-secondary-container text-on-secondary-container rounded-xl shadow-sm text-center" v-if="getOfficial(3)">
              <div class="font-label-md opacity-80 mb-1">Sekretaris Desa</div>
              <div class="font-headline-sm">{{ getOfficial(3).name }}</div>
            </div>

            <div class="w-full border-t-2 border-dashed border-outline my-4 relative">
               <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface-container-low px-2 text-xs text-outline font-bold text-center w-max max-w-full">JAJARAN PERANGKAT</span>
            </div>

            <!-- KAUR / KASI (Grid 2 Kolom) -->
            <div class="grid grid-cols-2 gap-3 w-full">
              <div v-for="i in [4,5,6,7,8,9]" :key="i">
                <div class="p-3 bg-white rounded-lg border border-outline-variant text-center shadow-sm h-full flex flex-col justify-center" v-if="getOfficial(i)">
                  <div class="text-[10px] text-primary font-bold uppercase mb-1">{{ getOfficial(i).position }}</div>
                  <div class="font-label-sm">{{ getOfficial(i).name }}</div>
                </div>
              </div>
            </div>

            <!-- KADUS (Grid 2 Kolom) -->
            <div class="grid grid-cols-2 gap-3 w-full mt-2">
              <div v-for="i in [10,11]" :key="i">
                <div class="p-3 bg-surface-container-highest rounded-lg border border-outline-variant text-center shadow-sm h-full flex flex-col justify-center" v-if="getOfficial(i)">
                  <div class="text-xs text-on-surface-variant font-bold uppercase mb-1">{{ getOfficial(i).position }}</div>
                  <div class="font-label-md">{{ getOfficial(i).name }}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="hidden lg:flex flex-col items-center min-w-[1000px] pb-16 overflow-x-auto">
            <div class="flex items-center justify-center w-full">
              <div class="flex items-center mb-8">
                <div @click="scrollToSection('perangkat-desa')" class="p-4 bg-surface-container-highest text-on-surface rounded-xl border border-outline-variant w-56 text-center shadow-sm z-10 hover:shadow-md cursor-pointer transition-shadow" v-if="getOfficial(2)">
                  <div class="font-label-md text-on-surface-variant mb-1">Ketua BPD</div>
                  <div class="font-headline-sm">{{ getOfficial(2).name }}</div>
                </div>
                <div class="w-12 h-px border-t-2 border-dashed border-outline"></div>
              </div>
              <div class="flex flex-col items-center z-10">
                <div @click="scrollToSection('perangkat-desa')" class="relative p-6 bg-primary text-on-primary rounded-xl shadow-md w-72 text-center z-10 hover:shadow-lg cursor-pointer transition-shadow" v-if="getOfficial(1)">
                  <div class="font-label-md opacity-80 mb-1">Kepala Desa</div>
                  <div class="font-headline-sm">{{ getOfficial(1).name }}</div>
                </div>
                <div class="w-px h-8 bg-outline"></div>
              </div>
              <div style="width: 272px;" class="invisible mb-8"></div>
            </div>
            <div class="flex flex-col items-center w-full z-10 relative">
              <div @click="scrollToSection('perangkat-desa')" class="relative p-4 bg-secondary-container text-on-secondary-container rounded-xl shadow-md w-64 text-center z-10 hover:shadow-lg cursor-pointer transition-shadow" v-if="getOfficial(3)">
                <div class="font-label-md opacity-80 mb-1">Sekretaris Desa</div>
                <div class="font-headline-sm">{{ getOfficial(3).name }}</div>
              </div>
              <div class="w-px h-8 bg-outline"></div>
            </div>
            <div class="relative w-full flex flex-col items-center z-0">
              <div class="absolute top-0 left-[calc(100%/12)] right-[calc(100%/12)] border-t-2 border-outline z-0"></div>
              <div class="absolute top-0 w-px h-full bg-outline z-0"></div>
              <div class="flex w-full">
                <div v-for="i in [4,5,6,7,8,9]" :key="i" class="relative flex flex-col items-center flex-1">
                  <div class="w-px h-8 bg-outline z-0"></div>
                  <div @click="scrollToSection('perangkat-desa')" class="p-3 bg-white rounded-lg border border-outline-variant w-[90%] text-center shadow-sm z-10 hover:shadow-md transition-shadow cursor-pointer" v-if="getOfficial(i)">
                    <div class="text-[10px] text-primary font-bold uppercase mb-1">{{ getOfficial(i).position }}</div>
                    <div class="font-label-sm">{{ getOfficial(i).name }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-px h-12 bg-outline z-0"></div>
            <div class="relative w-full flex flex-col items-center z-0">
              <div class="flex w-[50%] justify-between relative">
                 <div class="absolute top-0 left-[25%] right-[25%] border-t-2 border-outline z-0"></div>
                 <div v-for="i in [10,11]" :key="i" class="relative flex flex-col items-center flex-1">
                    <div class="w-px h-8 bg-outline z-0"></div>
                    <div @click="scrollToSection('perangkat-desa')" class="p-3 bg-surface-container-low rounded-lg border border-outline-variant w-[80%] text-center shadow-sm z-10 hover:shadow-md transition-shadow cursor-pointer" v-if="getOfficial(i)">
                      <div class="text-xs text-on-surface-variant font-bold uppercase mb-1">{{ getOfficial(i).position }}</div>
                      <div class="font-label-md">{{ getOfficial(i).name }}</div>
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
import { ref, computed } from 'vue'
import { database } from '@/data/db.js'

const db = ref(database)
const showAllOfficials = ref(false)

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
</style>
