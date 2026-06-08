<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center py-8 md:py-16 max-w-7xl mx-auto w-full px-4 select-none">
    <!-- Left Details Column -->
    <div class="lg:col-span-7 flex flex-col justify-center space-y-6">
      <div class="space-y-4">
        <!-- Badge -->
        <div class="hero-animate inline-block">
          <span class="bg-neoAccent text-white px-3 py-1.5 border-3 border-neoPrimary font-mono text-xs font-bold uppercase tracking-wider shadow-brutal">
            // INTRODUCING_CORE
          </span>
        </div>
        
        <!-- Main Heading -->
        <h1 class="hero-animate text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-neoPrimary tracking-tight leading-none">
          Vinicius Canedo
        </h1>
        
        <!-- Role Title -->
        <div class="hero-animate">
          <span class="bg-neoPrimary text-white px-4 py-2 border-3 border-neoPrimary font-mono text-sm sm:text-base font-bold inline-block transform -rotate-1 shadow-brutal-accent">
            Role: Software Engineer
          </span>
        </div>
      </div>

      <!-- Experience Counter & Description -->
      <div class="hero-animate space-y-4">
        <p class="font-mono text-sm sm:text-base text-neoPrimary leading-relaxed border-l-4 border-neoAccent pl-3">
          Developing software for <span class="font-black text-neoAccent">{{ yearsOfExperience > 0 ? yearsOfExperience : '...' }}</span> years. 
          Specializing in scalable backend APIs, responsive composition layouts, and optimized build architectures.
        </p>
      </div>

      <!-- Tech Stack typing HUD console -->
      <div class="hero-animate border-3 border-neoPrimary bg-white p-4 shadow-brutal max-w-lg">
        <div class="flex items-center justify-between border-b-2 border-neoPrimary pb-2 mb-3">
          <span class="font-mono text-[10px] font-bold text-neoMuted uppercase tracking-wider">Console // Tech_Stack</span>
          <div class="flex gap-1">
            <span class="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-neoPrimary"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-neoPrimary"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-neoPrimary"></span>
          </div>
        </div>
        
        <!-- Typing dynamic display -->
        <div class="font-mono text-base sm:text-lg font-bold flex items-center gap-1 min-h-[32px]">
          <span class="text-neoMuted select-none">$&nbsp;TECH_STACK:</span>
          <span ref="typingText" class="text-neoAccent font-black uppercase"></span>
          <span ref="cursor" class="text-neoPrimary font-black">|</span>
        </div>
      </div>
    </div>

    <!-- Right Profile Photo Column -->
    <div class="lg:col-span-5 flex justify-center">
      <div class="hero-animate border-3 border-neoPrimary bg-white p-3 shadow-brutal-lg max-w-md w-full relative">
        <!-- Authentic beard photo wrapper -->
        <div class="border-3 border-neoPrimary overflow-hidden bg-neoBg aspect-square relative">
          <!-- Grayscale Neo-Brutalist filter applied without beard feature alteration -->
          <img 
            src="/img/hero-photo-purple.png" 
            alt="Vinicius Canedo Profile" 
            class="w-full h-full object-contain contrast-110 brightness-95"
          />
        </div>
        
        <!-- Mini Telemetry HUD Tag -->
        <div class="absolute -bottom-3 -right-3 bg-neoAccent text-white font-mono text-[9px] font-bold px-2 py-1 border-3 border-neoPrimary shadow-brutal">
          BEARD_PROTECTION // DETECTED
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'

const yearsOfExperience = ref(0)
const typingText = ref(null)
const cursor = ref(null)

onMounted(() => {
  // 1. Dynamic Experience Calculator
  yearsOfExperience.value = new Date().getFullYear() - 2021

  // 2. Register GSAP TextPlugin
  gsap.registerPlugin(TextPlugin)

  // 3. Stagger Entrance Animation
  gsap.from(".hero-animate", {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "back.out(1.5)",
    stagger: 0.15
  })

  // 4. Cursor Blink Animation
  gsap.to(cursor.value, {
    opacity: 0,
    ease: "power2.inOut",
    repeat: -1,
    yoyo: true,
    duration: 0.5
  })

  // 5. Tech Stack Typing Loops
  const words = ['Laravel', 'PHP', 'GOLANG', 'Vue.JS', 'Nuxt.JS']
  const mainTimeline = gsap.timeline({ repeat: -1 })

  words.forEach((word) => {
    // Type Out Word
    mainTimeline.to(typingText.value, {
      duration: Math.max(word.length * 0.08, 0.4),
      text: word,
      ease: "none"
    })
    // Hold/Pause
    mainTimeline.to({}, { duration: 1.5 })
    // Delete Word
    mainTimeline.to(typingText.value, {
      duration: Math.max(word.length * 0.05, 0.3),
      text: "",
      ease: "none"
    })
    // Pause before next keyword
    mainTimeline.to({}, { duration: 0.3 })
  })
})
</script>
