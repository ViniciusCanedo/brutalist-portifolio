<template>
  <section class="contact-section-container border-t-0 border-b-0 bg-neoBg relative z-10 overflow-hidden">
    <!-- Split Column Grid -->
    <div class="max-w-7xl mx-auto px-4 md:px-8 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
      
      <!-- Column 1: Metadata / CTA -->
      <div class="space-y-8 lg:sticky lg:top-24">
        <div class="space-y-4">
          <p class="text-xs md:text-sm font-mono tracking-widest text-neoMuted uppercase">
            // LOCATION STATUS //
          </p>
          <h2 class="text-3xl md:text-5xl lg:text-6xl font-bold font-display leading-tight text-neoPrimary uppercase">
            Sorocaba - SP,<br />Brazil
          </h2>
        </div>

        <p class="text-sm md:text-base font-mono text-neoDark max-w-md">
          Available for contract opportunities, consulting, and full-stack system optimization. Secure telemetry dispatch initialized below.
        </p>

        <div>
          <a
            href="/CV_Vinicius_Canedo.pdf"
            download
            class="inline-block px-8 py-4 bg-neoAccent text-white border-3 border-neoPrimary font-bold font-display uppercase shadow-brutal hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_var(--neo-primary)] active:translate-x-0 active:translate-y-0 active:shadow-brutal transition-all duration-150 ease-brutal-snappy"
          >
            DOWNLOAD CV
          </a>
        </div>
      </div>

      <!-- Column 2: The Form -->
      <div class="bg-white border-3 border-neoPrimary p-6 md:p-8 shadow-brutal relative">
        <h3 class="text-xl md:text-2xl font-bold font-display uppercase tracking-tight text-neoPrimary mb-6 pb-4 border-b-3 border-neoPrimary">
          Secure Message Transmission
        </h3>

        <!-- Alerts -->
        <div 
          v-if="successMsg" 
          class="mb-6 p-4 bg-[#E6F4EA] border-3 border-neoPrimary text-neoPrimary font-mono text-sm shadow-brutal relative"
        >
          <span class="font-bold">✓ SYSTEM ONLINE:</span> {{ successMsg }}
        </div>

        <div 
          v-if="errorMsg" 
          class="mb-6 p-4 bg-[#FCE8E6] border-3 border-neoPrimary text-neoPrimary font-mono text-sm shadow-brutal relative"
        >
          <span class="font-bold">⚠ ERROR DETECTED:</span> {{ errorMsg }}
        </div>

        <form @submit.prevent="submitForm" class="space-y-6">
          <div class="space-y-2">
            <label for="name" class="block text-xs font-mono font-bold uppercase text-neoPrimary">// SENDER_NAME</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              :disabled="loading"
              placeholder="YOUR NAME"
              class="w-full bg-white text-neoPrimary border-3 border-neoPrimary px-4 py-3 focus:outline-none focus:border-neoAccent focus:shadow-brutal-accent shadow-brutal transition-all duration-150 placeholder:text-neoMuted"
            />
          </div>

          <div class="space-y-2">
            <label for="email" class="block text-xs font-mono font-bold uppercase text-neoPrimary">// SENDER_EMAIL</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              :disabled="loading"
              placeholder="YOUR@EMAIL.COM"
              class="w-full bg-white text-neoPrimary border-3 border-neoPrimary px-4 py-3 focus:outline-none focus:border-neoAccent focus:shadow-brutal-accent shadow-brutal transition-all duration-150 placeholder:text-neoMuted"
            />
          </div>

          <div class="space-y-2">
            <label for="whatsapp" class="block text-xs font-mono font-bold uppercase text-neoPrimary">// SENDER_WHATSAPP (OPTIONAL)</label>
            <input
              id="whatsapp"
              v-model="form.whatsapp"
              type="text"
              :disabled="loading"
              placeholder="+55 (15) 99999-9999"
              class="w-full bg-white text-neoPrimary border-3 border-neoPrimary px-4 py-3 focus:outline-none focus:border-neoAccent focus:shadow-brutal-accent shadow-brutal transition-all duration-150 placeholder:text-neoMuted"
            />
          </div>

          <div class="space-y-2">
            <label for="message" class="block text-xs font-mono font-bold uppercase text-neoPrimary">// SECURE_TRANSMISSION_PAYLOAD</label>
            <textarea
              id="message"
              v-model="form.message"
              required
              rows="4"
              :disabled="loading"
              placeholder="ENTER MESSAGE..."
              class="w-full bg-white text-neoPrimary border-3 border-neoPrimary px-4 py-3 focus:outline-none focus:border-neoAccent focus:shadow-brutal-accent shadow-brutal transition-all duration-150 placeholder:text-neoMuted"
            ></textarea>
          </div>

          <!-- Turnstile widget -->
          <div class="py-2">
            <NuxtTurnstile
              v-model="form.token"
              :disabled="loading"
            />
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full py-4 bg-neoAccent text-white border-3 border-neoPrimary font-bold font-display uppercase shadow-brutal hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_var(--neo-primary)] active:translate-x-0 active:translate-y-0 active:shadow-brutal disabled:opacity-50 disabled:pointer-events-none transition-all duration-150 ease-brutal-snappy"
          >
            <span v-if="loading">// DISPATCHING...</span>
            <span v-else>SEND MESSAGE</span>
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const form = reactive({
  name: '',
  email: '',
  whatsapp: '',
  message: '',
  token: '',
})

const loading = ref(false)
const successMsg = ref('')
const errorMsg = ref('')

async function submitForm() {
  successMsg.value = ''
  errorMsg.value = ''

  if (!form.token) {
    errorMsg.value = 'Security challenge must be completed before dispatch.'
    return
  }

  loading.value = true

  try {
    const response = await $fetch<{ success: boolean }>('/api/contact', {
      method: 'POST',
      body: {
        name: form.name,
        email: form.email,
        whatsapp: form.whatsapp || undefined,
        message: form.message,
        token: form.token,
      },
    })

    if (response && response.success) {
      successMsg.value = 'Message transmission completed successfully. Channel secured.'
      form.name = ''
      form.email = ''
      form.whatsapp = ''
      form.message = ''
      form.token = ''
    } else {
      errorMsg.value = 'Failed to transmit message payload. Unknown error.'
    }
  } catch (err: any) {
    console.error('Error submitting form:', err)
    errorMsg.value = err.data?.statusMessage || 'System failure processing message transmission.'
  } finally {
    loading.value = false
  }
}
</script>
