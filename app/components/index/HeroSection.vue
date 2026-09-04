<template>
  <div class="relative w-full flex flex-col items-center">
    <div
      class="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center py-8 md:py-16 max-w-7xl mx-auto w-full px-4 select-none"
    >
      <!-- Left Details Column -->
      <div class="lg:col-span-7 flex flex-col justify-center space-y-6">
        <div class="space-y-4">
          <!-- Badge -->
          <div class="hero-animate inline-block">
            <span
              class="bg-neoAccent text-white px-3 py-1.5 border-3 border-neoPrimary font-mono text-xs font-bold uppercase tracking-wider shadow-brutal"
            >
              // INTRODUCING_CORE
            </span>
          </div>

          <!-- Main Heading -->
          <h1
            class="hero-animate text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-neoPrimary tracking-tight leading-none"
          >
            Vinicius Canedo
          </h1>

          <!-- Role Title -->
          <div class="hero-animate">
            <span
              class="bg-neoPrimary dark:bg-[#232627] text-white px-4 py-2 border-3 border-neoPrimary font-mono text-sm sm:text-base font-bold inline-block transform -rotate-1 shadow-brutal-accent"
            >
              Role: Software Engineer
            </span>
          </div>
        </div>

        <!-- Experience Counter & Description -->
        <div class="hero-animate space-y-4">
          <p
            class="font-mono text-sm sm:text-base text-neoPrimary leading-relaxed border-l-4 border-neoAccent pl-3"
          >
            Developing software for
            <span class="font-black text-neoAccent">{{
              yearsOfExperience > 0 ? yearsOfExperience : "..."
            }}</span>
            years. Specializing in scalable backend APIs, responsive composition
            layouts, and optimized build architectures.
          </p>
        </div>

        <!-- Tech Stack typing HUD console (Extracted component) -->
        <TypewriterConsole class="hero-animate" />
      </div>

      <!-- Right Profile Photo Column -->
      <div class="lg:col-span-5 flex justify-center">
        <div
          class="hero-animate border-3 border-neoPrimary bg-neoSurface p-3 shadow-brutal-lg max-w-md w-full relative"
        >
          <!-- Authentic beard photo wrapper -->
          <div
            class="border-3 border-neoPrimary overflow-hidden bg-neoBg aspect-square relative"
          >
            <!-- Grayscale Neo-Brutalist filter applied without beard feature alteration -->
            <img
              src="/img/hero-photo-purple.png"
              alt="Vinicius Canedo Profile"
              class="w-full h-full object-contain contrast-110 brightness-95"
            />
          </div>

          <!-- Mini Telemetry HUD Tag -->
          <div
            class="absolute -bottom-3 -right-3 bg-neoAccent text-white font-mono text-[9px] font-bold px-2 py-1 border-3 border-neoPrimary shadow-brutal"
          >
            BEARD_PROTECTION // DETECTED
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="hero-animate mt-4 mb-2 flex justify-center z-10">
      <div
        class="flex items-center justify-center w-12 h-12 bg-neoAccent text-white border-3 border-neoPrimary shadow-[3px_3px_0px_0px_var(--neo-shadow)] animate-bounce select-none pointer-events-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="3"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19 13l-7 7-7-7m14-6l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { gsap } from "gsap";

const { yearsOfExperience } = useExperience();

onMounted(() => {
  // Stagger Entrance Animation
  gsap.from(".hero-animate", {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "back.out(1.5)",
    stagger: 0.15,
  });
});
</script>
