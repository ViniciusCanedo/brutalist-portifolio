<template>
  <div class="border-brutal bg-white text-neoPrimary p-6 shadow-brutal max-w-4xl mx-auto space-y-6">
    <div class="border-b-3 border-neoPrimary pb-3">
      <h2 class="text-2xl font-display font-black uppercase tracking-tight">// Neo-Brutalist Token Verifier</h2>
      <p class="font-mono text-xs text-neoMuted mt-1">TESTING INTEGRITY OF REFERENCES/STYLE.JSON</p>
    </div>

    <!-- Color Palette Row -->
    <div class="space-y-2">
      <h3 class="font-mono text-xs font-bold uppercase tracking-wider text-neoDark">// 1. Colors & Swatches</h3>
      <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div class="bg-neoBg text-neoPrimary border-2 border-neoPrimary p-3 font-mono text-[10px] font-bold">
          neoBg<br>#F1F1F1
        </div>
        <div class="bg-neoPrimary text-white border-2 border-neoPrimary p-3 font-mono text-[10px] font-bold">
          neoPrimary<br>#2E2E2E
        </div>
        <div class="bg-neoAccent text-white border-2 border-neoPrimary p-3 font-mono text-[10px] font-bold">
          neoAccent<br>#FF6F20
        </div>
        <div class="bg-neoMuted text-neoPrimary border-2 border-neoPrimary p-3 font-mono text-[10px] font-bold">
          neoMuted<br>#BEC3C7
        </div>
        <div class="bg-neoDark text-white border-2 border-neoPrimary p-3 font-mono text-[10px] font-bold">
          neoDark<br>#3B3B3B
        </div>
      </div>
    </div>

    <!-- Shadows and Borders Row -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="border-brutal bg-white p-4 shadow-brutal">
        <h4 class="font-display font-bold text-sm uppercase">border-brutal</h4>
        <p class="font-mono text-[10px] text-neoMuted mt-1">shadow-brutal (4px offset)</p>
      </div>
      <div class="border-brutal bg-white p-4 shadow-brutal-accent">
        <h4 class="font-display font-bold text-sm uppercase text-neoAccent">accent-shadow</h4>
        <p class="font-mono text-[10px] text-neoMuted mt-1">shadow-brutal-accent</p>
      </div>
      <div class="border-brutal bg-white p-4 shadow-brutal-lg">
        <h4 class="font-display font-bold text-sm uppercase">large-shadow</h4>
        <p class="font-mono text-[10px] text-neoMuted mt-1">shadow-brutal-lg (8px offset)</p>
      </div>
    </div>

    <!-- Typography check -->
    <div class="border-2 border-neoMuted p-4 bg-neoBg space-y-2">
      <h3 class="font-mono text-xs font-bold uppercase text-neoDark">// 2. Typography Test</h3>
      <p class="font-display text-xl font-bold uppercase">Space Grotesk - Heading Style Font Stack</p>
      <p class="font-mono text-xs leading-relaxed text-neoDark">Space Mono - HUD console logging & telemetry parameters, structured in code blocks.</p>
    </div>

    <!-- Interactive GSAP & Easing Checker -->
    <div class="space-y-4">
      <h3 class="font-mono text-xs font-bold uppercase tracking-wider text-neoDark">// 3. GSAP Timeline Animation & Snappy Easing</h3>
      <div class="border-2 border-neoPrimary p-4 bg-white space-y-4">
        <div class="flex items-center gap-3">
          <button 
            @click="runGsapAnimation" 
            class="bg-neoAccent hover:bg-neoPrimary hover:text-white text-neoPrimary font-bold px-3 py-1.5 border-2 border-neoPrimary shadow-brutal active:shadow-none active:translate-x-0.5 active:translate-y-0.5 font-mono text-[10px] transition-all cursor-pointer"
          >
            TRIGGER GSAP PLAY
          </button>
          <button 
            @click="resetGsapAnimation" 
            class="bg-white hover:bg-neoMuted text-neoPrimary font-bold px-3 py-1.5 border-2 border-neoPrimary shadow-brutal active:shadow-none active:translate-x-0.5 active:translate-y-0.5 font-mono text-[10px] transition-all cursor-pointer"
          >
            RESET
          </button>
          <span class="font-mono text-[10px] text-neoMuted">// Test GSAP client mount safety</span>
        </div>
        
        <div class="h-24 bg-neoBg border-2 border-neoPrimary relative overflow-hidden flex items-center px-4">
          <div 
            ref="testBox" 
            class="w-12 h-12 bg-neoAccent border-2 border-neoPrimary shadow-brutal flex items-center justify-center font-bold text-white text-[10px] select-none"
          >
            BOX
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { gsap } from 'gsap'

const testBox = ref(null)

const runGsapAnimation = () => {
  if (testBox.value) {
    gsap.fromTo(testBox.value, 
      { x: 0, rotation: 0 },
      { 
        x: window.innerWidth > 600 ? 300 : 120, 
        rotation: 360, 
        duration: 0.6, 
        ease: "power3.out" 
      }
    )
  }
}

const resetGsapAnimation = () => {
  if (testBox.value) {
    gsap.to(testBox.value, { x: 0, rotation: 0, duration: 0.4, ease: "power2.in" })
  }
}
</script>
