<template>
  <div
    class="bg-neoSurface border-3 border-neoPrimary p-4 md:p-8 shadow-brutal-lg order-2 md:order-3 w-full"
  >
    <h3
      class="text-lg md:text-xl font-bold font-display uppercase tracking-tight text-neoPrimary mb-6 pb-4 border-b-3 border-neoPrimary"
    >
      Secure Telemetry Ingestion
    </h3>

    <!-- Form Action Feedback Alerts -->
    <div
      v-if="successMsg"
      class="mb-6 p-4 bg-[#E6F4EA] border-3 border-neoPrimary text-neoPrimary font-mono text-xs shadow-brutal"
    >
      <span class="font-bold">✓ SYSTEM ONLINE:</span> {{ successMsg }}
    </div>

    <div
      v-if="errorMsg"
      class="mb-6 p-4 bg-[#FCE8E6] border-3 border-neoPrimary text-neoPrimary font-mono text-xs shadow-brutal"
    >
      <span class="font-bold">⚠ ERROR DETECTED:</span> {{ errorMsg }}
    </div>

    <form @submit.prevent="submitForm" class="space-y-4">
      <!-- Name Input -->
      <div class="space-y-1">
        <label
          for="name"
          class="block text-[10px] font-mono font-bold uppercase text-neoPrimary"
          >// SENDER_NAME</label
        >
        <input
          id="name"
          v-model="form.name"
          type="text"
          required
          :disabled="loading"
          placeholder="YOUR NAME"
          class="w-full bg-neoSurface text-neoPrimary border-3 border-neoPrimary px-3 py-2.5 focus:outline-none focus:border-neoAccent focus:shadow-brutal-accent shadow-brutal transition-all duration-150 placeholder:text-neoMuted font-mono text-xs"
        />
      </div>

      <!-- Email Input -->
      <div class="space-y-1">
        <label
          for="email"
          class="block text-[10px] font-mono font-bold uppercase text-neoPrimary"
          >// SENDER_EMAIL</label
        >
        <input
          id="email"
          v-model="form.email"
          type="email"
          required
          :disabled="loading"
          placeholder="YOUR@EMAIL.COM"
          class="w-full bg-neoSurface text-neoPrimary border-3 border-neoPrimary px-3 py-2.5 focus:outline-none focus:border-neoAccent focus:shadow-brutal-accent shadow-brutal transition-all duration-150 placeholder:text-neoMuted font-mono text-xs"
        />
      </div>

      <!-- WhatsApp Input -->
      <div class="space-y-1">
        <label
          for="whatsapp"
          class="block text-[10px] font-mono font-bold uppercase text-neoPrimary"
          >// SENDER_WHATSAPP (OPTIONAL)</label
        >
        <input
          id="whatsapp"
          v-model="form.whatsapp"
          type="text"
          :disabled="loading"
          placeholder="+55 (15) 99999-9999"
          class="w-full bg-neoSurface text-neoPrimary border-3 border-neoPrimary px-3 py-2.5 focus:outline-none focus:border-neoAccent focus:shadow-brutal-accent shadow-brutal transition-all duration-150 placeholder:text-neoMuted font-mono text-xs"
        />
      </div>

      <!-- Message Textarea -->
      <div class="space-y-1">
        <label
          for="message"
          class="block text-[10px] font-mono font-bold uppercase text-neoPrimary"
          >// TRANSMISSION_PAYLOAD</label
        >
        <textarea
          id="message"
          v-model="form.message"
          required
          rows="3"
          :disabled="loading"
          placeholder="ENTER MESSAGE..."
          class="w-full bg-neoSurface text-neoPrimary border-3 border-neoPrimary px-3 py-2.5 focus:outline-none focus:border-neoAccent focus:shadow-brutal-accent shadow-brutal transition-all duration-150 placeholder:text-neoMuted font-mono text-xs"
        ></textarea>
      </div>

      <!-- Cloudflare Turnstile Verification -->
      <div class="w-full overflow-x-auto py-1">
        <NuxtTurnstile
          v-model="form.token"
          size="flexible"
          :disabled="loading"
        />
      </div>

      <BrutalistButton
        type="submit"
        variant="accent"
        :disabled="loading"
        class="w-full py-3.5"
      >
        <span v-if="loading">// DISPATCHING...</span>
        <span v-else>SEND MESSAGE</span>
      </BrutalistButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

const form = reactive({
  name: "",
  email: "",
  whatsapp: "",
  message: "",
  token: "",
});

const loading = ref(false);
const successMsg = ref("");
const errorMsg = ref("");

async function submitForm() {
  successMsg.value = "";
  errorMsg.value = "";

  if (!form.token) {
    errorMsg.value = "Security challenge must be completed before dispatch.";
    return;
  }

  loading.value = true;

  try {
    const response = await $fetch<{ success: boolean }>("/api/contact", {
      method: "POST",
      body: {
        name: form.name,
        email: form.email,
        whatsapp: form.whatsapp || undefined,
        message: form.message,
        token: form.token,
      },
    });

    if (response && response.success) {
      successMsg.value =
        "Message transmission completed successfully. Channel secured.";
      form.name = "";
      form.email = "";
      form.whatsapp = "";
      form.message = "";
      form.token = "";
    } else {
      errorMsg.value = "Failed to transmit message payload. Unknown error.";
    }
  } catch (err: any) {
    console.error("Error submitting form:", err);
    errorMsg.value =
      err.data?.statusMessage ||
      "System failure processing message transmission.";
  } finally {
    loading.value = false;
  }
}
</script>
