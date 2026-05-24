<template>
  <main>
    <header class="hero-gradient py-xl border-b border-outline-variant">
      <div class="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <nav class="flex items-center gap-2 mb-4 text-on-surface-variant font-label-sm">
          <router-link to="/" class="hover:text-primary">Beranda</router-link>
          <span class="material-symbols-outlined text-sm">chevron_right</span>
          <span class="text-primary font-bold">Tentang Kami</span>
        </nav>
        <h1 class="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2">Profil Desa {{ db.villages.name }}</h1>
        <p class="text-body-lg text-on-surface-variant max-w-2xl">{{ db.villages.tagline }}</p>
      </div>
    </header>
    <section class="py-xl">
      <div class="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div class="grid md:grid-cols-2 gap-xl items-center">
          <div class="relative rounded-xl overflow-hidden shadow-sm aspect-[4/3]">
            <img alt="Sejarah Desa" class="w-full h-full object-cover" :src="db.village_profiles.history_image_path">
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>
          <div>
            <div class="flex items-center gap-2 text-primary font-label-md mb-2">
              <span class="material-symbols-outlined">history_edu</span>
              Sejarah Desa
            </div>
            <h2 class="font-headline-md text-headline-md text-on-surface mb-6">Jejak Langkah {{ db.villages.name }}</h2>
            <div class="space-y-4 text-on-surface-variant font-body-md leading-relaxed">
              <p v-for="(paragraph, index) in db.village_profiles.history.split('\n\n')" :key="index">
                {{ paragraph }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="py-xl bg-surface-container-low">
      <div class="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center mb-12">
        <h2 class="font-headline-md text-headline-md text-on-surface mb-4">Visi &amp; Misi Kami</h2>
        <div class="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
      </div>
      <div class="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto grid md:grid-cols-2 gap-md">
        <div class="bg-primary text-on-primary p-xl rounded-xl shadow-lg flex flex-col items-center text-center">
          <span class="material-symbols-outlined text-5xl mb-6">visibility</span>
          <h3 class="font-headline-sm text-headline-sm mb-4">Visi</h3>
          <p class="font-body-lg text-body-lg italic">"{{ db.village_profiles.vision }}"</p>
        </div>
        <div class="bg-surface-container-lowest p-xl rounded-xl shadow-sm border border-outline-variant">
          <div class="flex items-center gap-4 mb-8">
            <div class="w-12 h-12 bg-primary-fixed flex items-center justify-center rounded-lg text-primary">
              <span class="material-symbols-outlined">rocket_launch</span>
            </div>
            <h3 class="font-headline-sm text-headline-sm text-on-surface">Misi</h3>
          </div>
          <ul class="space-y-6">
            <li v-for="(mission, index) in JSON.parse(db.village_profiles.mission)" :key="index" class="flex gap-4">
              <span class="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex-shrink-0 flex items-center justify-center font-bold text-sm">{{ index + 1 }}</span>
              <p class="text-on-surface-variant font-body-md">{{ mission }}</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section class="py-xl">
      <div class="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div class="text-center mb-12">
          <h2 class="font-headline-md text-headline-md text-on-surface mb-2">Struktur Organisasi</h2>
          <p class="text-on-surface-variant">Hierarki Pemerintahan Desa {{ db.villages.name }}</p>
        </div>
        <div class="bg-surface-container-low p-md md:p-xl rounded-xl border border-outline-variant overflow-x-auto pb-16">
          <div class="min-w-[1000px] flex flex-col items-center">
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
    <section id="perangkat-desa" class="py-xl bg-surface-container-lowest">
      <div class="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div class="flex justify-between items-end mb-12">
          <div>
            <h2 class="font-headline-md text-headline-md text-on-surface mb-2">Perangkat Desa</h2>
            <p class="text-on-surface-variant">Tim Pengabdi Masyarakat {{ db.villages.name }}</p>
          </div>
          <button @click="showAllOfficials = !showAllOfficials" class="text-primary font-label-md flex items-center gap-1 hover:underline">
            {{ showAllOfficials ? 'Sembunyikan' : 'Lihat Semua' }} <span class="material-symbols-outlined text-sm">{{ showAllOfficials ? 'expand_less' : 'expand_more' }}</span>
          </button>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md">
          <div v-for="official in getDisplayedOfficials" :key="official.id" class="group bg-white rounded-2xl border border-outline-variant overflow-hidden hover:shadow-lg transition-all duration-300">
            <div class="aspect-square relative overflow-hidden">
              <img :alt="official.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" :src="official.photo_path">
            </div>
            <div class="p-md text-center">
              <h4 class="font-headline-sm text-headline-sm text-on-surface mb-1">{{ official.name }}</h4>
              <p class="text-primary font-label-md">{{ official.position }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="py-xl">
      <div class="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div class="text-center mb-12">
          <h2 class="font-headline-md text-headline-md text-on-surface mb-2">Statistik Wilayah</h2>
          <p class="text-on-surface-variant">Gambaran Umum Demografi &amp; Geografi Desa</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-md">
          <div class="bg-surface-container p-xl rounded-2xl border border-outline-variant flex items-center gap-6">
            <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-on-primary">
              <span class="material-symbols-outlined text-3xl">square_foot</span>
            </div>
            <div>
              <div class="text-on-surface-variant font-label-md">Luas Wilayah</div>
              <div class="text-display-lg font-bold text-primary">{{ formatNumber(db.village_statistics.area_ha) }}<span class="text-headline-sm"> Ha</span></div>
            </div>
          </div>
          <div class="bg-surface-container p-xl rounded-2xl border border-outline-variant flex items-center gap-6">
            <div class="w-16 h-16 bg-secondary-container rounded-full flex items-center justify-center text-on-secondary-container">
              <span class="material-symbols-outlined text-3xl">groups</span>
            </div>
            <div>
              <div class="text-on-surface-variant font-label-md">Jumlah Dusun</div>
              <div class="text-display-lg font-bold text-secondary">{{ db.village_statistics.dusun_count < 10 ? '0' + db.village_statistics.dusun_count : db.village_statistics.dusun_count }}<span class="text-headline-sm"> Dusun</span></div>
            </div>
          </div>
          <div class="bg-surface-container p-xl rounded-2xl border border-outline-variant flex items-center gap-6">
            <div class="w-16 h-16 bg-tertiary-container rounded-full flex items-center justify-center text-on-tertiary-container">
              <span class="material-symbols-outlined text-3xl">holiday_village</span>
            </div>
            <div>
              <div class="text-on-surface-variant font-label-md">Total RT / RW</div>
              <div class="text-display-lg font-bold text-tertiary">{{ db.village_statistics.rt_count }} / {{ db.village_statistics.rw_count < 10 ? '0' + db.village_statistics.rw_count : db.village_statistics.rw_count }}</div>
            </div>
          </div>
        </div>
        <div class="mt-md bg-white p-xl rounded-2xl border border-outline-variant shadow-sm flex flex-col md:flex-row items-center gap-md">
          <div class="w-full md:w-1/3">
            <div class="text-display-lg font-bold text-primary mb-2">{{ formatNumber(db.village_statistics.population_total) }}</div>
            <div class="text-headline-sm text-on-surface mb-1">Total Penduduk</div>
            <p class="text-on-surface-variant font-body-sm">Data kependudukan terbaru.</p>
          </div>
          <div class="flex-1 w-full grid grid-cols-2 gap-4">
            <div class="p-4 bg-primary-fixed-dim rounded-xl">
              <div class="flex items-center gap-2 mb-2 text-on-primary-fixed">
                <span class="material-symbols-outlined text-xl">man</span>
                <span class="font-bold">Laki-laki</span>
              </div>
              <div class="text-2xl font-bold">{{ formatNumber(db.village_statistics.population_male) }}</div>
            </div>
            <div class="p-4 bg-secondary-fixed-dim rounded-xl">
              <div class="flex items-center gap-2 mb-2 text-on-secondary-fixed">
                <span class="material-symbols-outlined text-xl">woman</span>
                <span class="font-bold">Perempuan</span>
              </div>
              <div class="text-2xl font-bold">{{ formatNumber(db.village_statistics.population_female) }}</div>
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
