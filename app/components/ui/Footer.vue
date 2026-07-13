<template>
  <div>
    <!-- The Unified Brutalist Footer Wrapper -->
    <footer
      class="relative z-10 bg-neoDark border-t-3 border-neoPrimary px-6 py-16 md:px-12 md:py-24"
    >
      <div
        class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start"
      >
        <!-- Column 1: Brand & Identity -->
        <div class="flex flex-col gap-8 order-1">
          <!-- Duplicated Brand Logo from Navbar.vue -->
          <NuxtLink
            to="/"
            class="flex items-center gap-3 select-none w-fit focus:outline-none"
            aria-label="Return Home"
          >
            <span
              class="bg-neoAccent text-white p-2 border-3 border-neoPrimary font-bold text-lg shadow-brutal flex items-center justify-center w-10 h-10 hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_var(--neo-shadow)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all duration-100 ease-brutal-snappy"
            >
              VC
            </span>
            <div>
              <span
                class="font-bold text-sm tracking-tight block uppercase leading-none text-white"
                >VINICIUS CANEDO</span
              >
              <span
                class="font-mono text-[9px] text-neoMuted leading-none uppercase font-bold"
                >Software Engineer</span
              >
            </div>
          </NuxtLink>

          <!-- Location Info -->
          <div class="space-y-2">
            <p
              class="text-xs font-mono tracking-widest text-neoMuted uppercase"
            >
              // LOCATION STATUS //
            </p>
            <p
              class="text-xl md:text-2xl font-bold font-display uppercase text-white leading-none"
            >
              Sorocaba - SP,<br />Brazil
            </p>
          </div>

          <!-- Download Resume/CV Button -->
          <div>
            <BrutalistButton
              href="/CV_Vinicius_Canedo.pdf"
              variant="accent"
              download
              class="px-6 py-3.5"
            >
              DOWNLOAD CV
            </BrutalistButton>
          </div>
        </div>

        <!-- Column 2: Navigation Links -->
        <div class="flex flex-col gap-6 md:pl-8 order-3 md:order-2">
          <p class="text-xs font-mono tracking-widest text-neoMuted uppercase">
            // DIRECTORY //
          </p>
          <div class="flex flex-col gap-4 items-start">
            <NuxtLink
              to="/"
              class="text-base font-bold font-display uppercase text-white hover:bg-neoAccent hover:text-white px-2 py-1.5 border-3 border-transparent hover:border-neoPrimary hover:shadow-brutal transition-all duration-100 ease-brutal-snappy"
            >
              // HOME
            </NuxtLink>
            <NuxtLink
              to="/projects"
              class="text-base font-bold font-display uppercase text-white hover:bg-neoAccent hover:text-white px-2 py-1.5 border-3 border-transparent hover:border-neoPrimary hover:shadow-brutal transition-all duration-100 ease-brutal-snappy"
            >
              // PROJECTS
            </NuxtLink>
            <a
              href="https://github.com/viniciuscanedo"
              target="_blank"
              rel="noopener noreferrer"
              class="text-base font-bold font-display uppercase text-white hover:bg-neoAccent hover:text-white px-2 py-1.5 border-3 border-transparent hover:border-neoPrimary hover:shadow-brutal transition-all duration-100 ease-brutal-snappy"
            >
              // GITHUB
            </a>
            <a
              href="https://linkedin.com/in/viniciuscanedo"
              target="_blank"
              rel="noopener noreferrer"
              class="text-base font-bold font-display uppercase text-white hover:bg-neoAccent hover:text-white px-2 py-1.5 border-3 border-transparent hover:border-neoPrimary hover:shadow-brutal transition-all duration-100 ease-brutal-snappy"
            >
              // LINKEDIN
            </a>
          </div>
        </div>

        <!-- Column 3: Secure Contact Form -->
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
      </div>
    </footer>

    <!-- Fixed Marquee Background Layer (Parallax curtain reveal) -->
    <div
      class="fixed bottom-0 left-0 w-full h-48 bg-neoAccent border-t-3 border-neoPrimary flex items-center overflow-hidden z-[-10]"
    >
      <div ref="marqueeRef" class="flex whitespace-nowrap items-center">
        <!-- Three identical tracks for seamless looping with xPercent: -33.33 -->
        <div
          v-for="i in 3"
          :key="'footer-marquee-' + i"
          class="flex items-center whitespace-nowrap"
        >
          <span
            v-for="tech in allTech"
            :key="'footer-tech-' + tech + '-' + i"
            class="text-neoSurface text-4xl font-black uppercase tracking-widest px-8"
          >
            {{ tech }} <span class="text-neoDark ml-8">✦</span>
          </span>
        </div>
      </div>
    </div>

    <!-- Transparent Page Spacer to expose the background reveal layer -->
    <div class="h-48 pointer-events-none bg-transparent"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";

const allTech = [
  "Laravel",
  "PHP",
  "Go",
  "Node.js",
  "PostgreSQL",
  "Vue.js",
  "Nuxt 3",
  "Tailwind CSS",
  "GSAP",
  "TypeScript",
  "Docker",
  "AWS",
  "GitHub Actions",
  "Vercel",
  "Linux",
];

// Marquee GSAP variables
const marqueeRef = ref<HTMLElement | null>(null);
let ctx: gsap.Context | null = null;

// Form reactive states
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

// Message dispatch handler
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

onMounted(() => {
  // GSAP context initialization for timeline/tween safety & memory leak prevention
  ctx = gsap.context(() => {
    if (marqueeRef.value) {
      gsap.to(marqueeRef.value, {
        xPercent: -33.33,
        repeat: -1,
        duration: 20,
        ease: "none",
      });
    }
  });
});

onUnmounted(() => {
  if (ctx) {
    ctx.revert();
  }
});
</script>

<style scoped>
.marquee-wrapper {
  display: flex;
}
</style>
