<template>
  <main>
    <!-- 1. HEADER HERO -->
    <section class="relative bg-primary-container py-12 md:py-xl text-on-primary-container overflow-hidden">
      <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10 text-center">
        <h1 class="font-display-lg font-bold text-4xl md:text-display-lg mb-4 md:mb-base">Hubungi Kami</h1>
        <p class="font-body-md md:font-body-lg max-w-2xl mx-auto px-4 md:px-0 opacity-90">
          Kami hadir untuk melayani kebutuhan administrasi dan informasi masyarakat Desa Pusaka. Sampaikan pertanyaan atau saran Anda melalui saluran resmi kami.
        </p>
      </div>
      <div class="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl pointer-events-none"></div>
    </section>

    <!-- 2. INFO KONTAK & FORMULIR -->
    <section class="py-12 md:py-xl">
      <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-xl items-start">

          <div class="space-y-8 md:space-y-lg">
            <div class="space-y-2 md:space-y-md text-center md:text-left">
              <h2 class="text-2xl font-headline-md md:font-headline-lg font-bold text-primary">Informasi Kontak</h2>
              <p class="font-body-sm md:font-body-md text-on-surface-variant">Silakan kunjungi kantor kami atau hubungi kami melalui media di bawah ini untuk respon yang lebih cepat.</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-md">
              <div class="bg-surface-container-lowest p-4 md:p-md rounded-xl border border-outline-variant/30 flex flex-col gap-3 md:gap-base shadow-sm hover:shadow-md transition-shadow">
                <span class="material-symbols-outlined text-primary text-3xl">location_on</span>
                <h3 class="font-headline-sm font-bold text-on-surface">Alamat Kantor</h3>
                <p class="font-body-sm text-on-surface-variant">{{ db.contact_infos.office_address }}</p>
              </div>
              <div class="bg-surface-container-lowest p-4 md:p-md rounded-xl border border-outline-variant/30 flex flex-col gap-3 md:gap-base shadow-sm hover:shadow-md transition-shadow">
                <span class="material-symbols-outlined text-primary text-3xl">call</span>
                <h3 class="font-headline-sm font-bold text-on-surface">Telepon</h3>
                <p class="font-body-sm text-on-surface-variant">{{ db.contact_infos.phone }}</p>
              </div>
              <div class="bg-surface-container-lowest p-4 md:p-md rounded-xl border border-outline-variant/30 flex flex-col gap-3 md:gap-base shadow-sm hover:shadow-md transition-shadow">
                <span class="material-symbols-outlined text-primary text-3xl">mail</span>
                <h3 class="font-headline-sm font-bold text-on-surface">Email</h3>
                <p class="font-body-sm text-on-surface-variant break-all">{{ db.contact_infos.email }}</p>
              </div>
              <div class="bg-surface-container-lowest p-4 md:p-md rounded-xl border border-outline-variant/30 flex flex-col gap-3 md:gap-base shadow-sm hover:shadow-md transition-shadow">
                <span class="material-symbols-outlined text-primary text-3xl">schedule</span>
                <h3 class="font-headline-sm font-bold text-on-surface">Jam Operasional</h3>
                <p class="font-body-sm text-on-surface-variant">{{ db.contact_infos.operational_hours }}</p>
              </div>
            </div>
          </div>

          <!-- Bagian Kanan: Form Kontak -->
          <div class="bg-surface-container-lowest p-6 md:p-lg rounded-xl border border-outline-variant/20 shadow-sm mt-4 md:mt-0">
            <form @submit.prevent="submitForm" class="space-y-6 md:space-y-md" id="contactForm">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-md">
                <div class="space-y-2">
                  <label class="font-label-md text-on-surface-variant font-bold">Nama Lengkap</label>
                  <input required v-model="formData.name" class="w-full h-12 px-4 md:px-md rounded-lg border border-outline-variant bg-surface-bright font-body-sm md:font-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="Masukkan nama Anda" type="text"/>
                </div>
                <div class="space-y-2">
                  <label class="font-label-md text-on-surface-variant font-bold">Alamat Email</label>
                  <input required v-model="formData.email" class="w-full h-12 px-4 md:px-md rounded-lg border border-outline-variant bg-surface-bright font-body-sm md:font-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="nama@email.com" type="email"/>
                </div>
              </div>
              <div class="space-y-2">
                <label class="font-label-md text-on-surface-variant font-bold">Perihal</label>
                <select v-model="formData.subject" class="w-full h-12 px-4 md:px-md rounded-lg border border-outline-variant bg-surface-bright font-body-sm md:font-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none cursor-pointer">
                  <option>Layanan Administrasi</option>
                  <option>Pengaduan Masyarakat</option>
                  <option>Informasi Desa</option>
                  <option>Lainnya</option>
                </select>
              </div>
              <div class="space-y-2">
                <label class="font-label-md text-on-surface-variant font-bold">Pesan Anda</label>
                <textarea required v-model="formData.message" class="w-full p-4 md:p-md rounded-lg border border-outline-variant bg-surface-bright font-body-sm md:font-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none" placeholder="Tuliskan pesan atau pertanyaan Anda di sini..." rows="4"></textarea>
              </div>
              <button
                :disabled="isSubmitting"
                :class="[
                  'w-full h-12 font-label-md font-bold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2',
                  submitStatus === 'success' ? 'bg-tertiary text-on-tertiary' : 'bg-primary text-on-primary'
                ]"
                type="submit">
                <template v-if="isSubmitting">
                  <span class="material-symbols-outlined text-[20px] animate-spin">sync</span> Mengirim...
                </template>
                <template v-else-if="submitStatus === 'success'">
                  <span class="material-symbols-outlined text-[20px]">check_circle</span> Berhasil Terkirim
                </template>
                <template v-else>
                  Kirim Pesan
                  <span class="material-symbols-outlined text-[20px]">send</span>
                </template>
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>

    <!-- 3. PETA MAPS -->
    <section class="pb-12 md:pb-xl">
      <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div class="w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-sm relative group grayscale-0 md:grayscale hover:grayscale-0 transition-all duration-700">
          <iframe
            class="w-full h-full"
            style="border:0;"
            loading="lazy"
            allowfullscreen
            referrerpolicy="no-referrer-when-downgrade"
            :src="db.contact_infos.maps_embed_url">
          </iframe>
          <div class="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors pointer-events-none"></div>
          <div class="absolute bottom-4 left-4 right-4 md:bottom-md md:left-md md:right-auto bg-surface-container-lowest p-3 md:p-md rounded-lg border border-outline-variant shadow-lg flex items-center gap-3 md:gap-md md:max-w-sm pointer-events-none">
            <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-[20px] md:text-2xl text-primary">pin_drop</span>
            </div>
            <div>
              <p class="font-label-md font-bold text-on-surface">Kantor Desa Pusaka</p>
              <p class="font-body-sm text-on-surface-variant">Navigasi Peta Interaktif</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. FAQ -->
    <section class="py-12 md:py-xl bg-surface-container-low">
      <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div class="text-center mb-8 md:mb-lg">
          <h2 class="text-2xl font-headline-md md:font-headline-lg font-bold text-on-background mb-2">Pertanyaan Populer (FAQ)</h2>
          <p class="font-body-sm md:font-body-md text-on-surface-variant">Mungkin pertanyaan Anda sudah terjawab di sini.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-md max-w-4xl mx-auto">
          <div v-for="(faq, index) in faqs" :key="index" class="bg-primary-container p-5 md:p-md rounded-xl border border-outline-variant/30 shadow-sm hover:shadow-md transition-shadow">
            <h3 class="font-headline-sm font-bold text-on-primary mb-2 md:mb-sm">{{ faq.question }}</h3>
            <p class="font-body-sm md:font-body-md opacity-90 text-on-primary">{{ faq.answer }}</p>
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

const formData = ref({
    name: '',
    email: '',
    subject: 'Layanan Administrasi',
    message: ''
})

const isSubmitting = ref(false)
const submitStatus = ref('idle')

const targetEmail = ref('bagas.indra.bil@gmail.com') // Tujuan email utama

const submitForm = () => {
    if (isSubmitting.value) return

    isSubmitting.value = true
    submitStatus.value = 'idle'
    const subject = encodeURIComponent(`[Website Desa - Kontak] ${formData.value.subject} - ${formData.value.name}`)
    const body = encodeURIComponent(`Nama Pengirim: ${formData.value.name}\nEmail Pengirim: ${formData.value.email}\nPerihal: ${formData.value.subject}\n\nPesan:\n${formData.value.message}`)
    window.location.href = `mailto:${targetEmail.value}?subject=${subject}&body=${body}`
    setTimeout(() => {
        isSubmitting.value = false
        submitStatus.value = 'success'

        setTimeout(() => {
            submitStatus.value = 'idle'
            formData.value = {
                name: '',
                email: '',
                subject: 'Layanan Administrasi',
                message: ''
            }
        }, 3000)
    }, 800)
}

const faqs = ref([
    {
        question: "Bagaimana cara mengurus Surat Pengantar?",
        answer: "Anda dapat membawa KTP dan KK asli ke loket pelayanan pada jam operasional, atau menggunakan fitur Layanan Mandiri di website ini."
    },
    {
        question: "Berapa lama proses pembuatan KTP?",
        answer: "Proses verifikasi desa memakan waktu 1 hari kerja sebelum diteruskan ke Dinas Kependudukan dan Catatan Sipil Kabupaten."
    },
    {
        question: "Apakah ada biaya administrasi?",
        answer: "Sesuai peraturan desa terbaru, seluruh layanan administrasi kependudukan di kantor desa tidak dipungut biaya (Gratis)."
    },
    {
        question: "Siapa yang bisa saya hubungi saat darurat?",
        answer: "Untuk keadaan darurat di luar jam operasional, silakan hubungi hotline Satgas Desa di nomor 0812-3456-7890."
    }
])
</script>

<style scoped>
</style>
