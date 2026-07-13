<template>
  <div class="border-3 border-neoPrimary bg-neoSurface p-6 md:p-8 shadow-brutal flex flex-col space-y-6">
    <!-- Component Header -->
    <div class="border-b-3 border-neoPrimary pb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h3 class="text-xl font-display font-black uppercase text-neoPrimary">
          // Distortion_Sandbox
        </h3>
        <p class="text-xs font-mono text-neoPrimary opacity-70">
          TRAE-STYLE FONT DISTORTION & REVEAL ENGINE
        </p>
      </div>
      <!-- Replay Action Button (US2) -->
      <div>
        <button
          id="btn-replay"
          type="button"
          class="bg-neoAccent text-white font-mono font-bold uppercase py-2 px-5 border-3 border-neoPrimary shadow-brutal hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_var(--neo-shadow)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_var(--neo-shadow)] transition-all cursor-pointer select-none"
          @click="replay"
        >
          REPLAY_GLITCH
        </button>
      </div>
    </div>

    <!-- Animation Render Area (US1) -->
    <div class="flex-1 flex items-center justify-center min-h-[280px] bg-neoBg border-3 border-neoPrimary p-6 relative overflow-hidden shadow-inner select-none">
      
      <!-- Animated Text Container with Ref scoping -->
      <div
        ref="textContainer"
        class="flex flex-wrap items-center justify-center font-display font-black text-6xl md:text-8xl tracking-tighter text-neoPrimary text-center"
      >
        <!-- Letter container (overflow is always visible since lettering is fixed) -->
        <div
          v-for="(char, index) in characters"
          :key="index"
          class="relative inline-block select-none overflow-visible"
          @mouseenter="onCharMouseEnter(index)"
        >
          <!-- Unique Inline SVG Filter per character to allow independent hover distortion -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="absolute pointer-events-none"
            width="0"
            height="0"
            aria-hidden="true"
            style="position: absolute; width: 0; height: 0; pointer-events: none;"
          >
            <defs>
              <filter :id="'trae-reveal-noise-' + index" x="-100%" y="-100%" width="300%" height="300%">
                <feTurbulence
                  type="fractalNoise"
                  :baseFrequency="baseFrequency"
                  numOctaves="3"
                  result="noise"
                />
                <feDisplacementMap
                  :id="'disp-' + index"
                  in="SourceGraphic"
                  in2="noise"
                  scale="0"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>
            </defs>
          </svg>

          <!-- Character span referencing its unique filter (Fixed opacity:1 and y:0 by default) -->
          <span
            :id="'char-' + index"
            class="distort-char inline-block"
            :style="{
              filter: `url(#trae-reveal-noise-${index})`,
              transformOrigin: 'center bottom',
              willChange: 'transform'
            }"
          >
            {{ char === ' ' ? '\u00A0' : char }}
          </span>
        </div>
      </div>
    </div>

    <!-- Controls Panel (US3) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-neoBg p-4 border-3 border-neoPrimary shadow-[2px_2px_0px_0px_var(--neo-shadow)]">
      <!-- Text input -->
      <div class="flex flex-col space-y-2">
        <label for="input-text" class="text-xs font-mono font-black uppercase text-neoPrimary">
          [Text String]
        </label>
        <input
          id="input-text"
          v-model="textInput"
          type="text"
          placeholder="VINICIUS"
          maxlength="24"
          class="border-3 border-neoPrimary p-2 text-sm font-mono text-neoPrimary focus:outline-none bg-neoSurface shadow-[2px_2px_0px_0px_var(--neo-shadow)] focus:shadow-[4px_4px_0px_0px_var(--neo-shadow)] transition-all"
        />
      </div>

      <!-- Max Scale (Displacement) slider -->
      <div class="flex flex-col space-y-2">
        <div class="flex justify-between items-center text-xs font-mono font-black uppercase text-neoPrimary">
          <label for="input-scale">[Max Scale]</label>
          <span class="text-[10px] text-neoAccent">{{ maxScale }}px</span>
        </div>
        <input
          id="input-scale"
          v-model.number="maxScale"
          type="range"
          min="0"
          max="400"
          step="10"
          class="w-full accent-neoAccent cursor-pointer border-3 border-neoPrimary p-1 bg-neoSurface shadow-[2px_2px_0px_0px_var(--neo-shadow)]"
        />
      </div>

      <!-- Duration slider -->
      <div class="flex flex-col space-y-2">
        <div class="flex justify-between items-center text-xs font-mono font-black uppercase text-neoPrimary">
          <label for="input-duration">[Duration]</label>
          <span class="text-[10px] text-neoAccent">{{ duration.toFixed(1) }}s</span>
        </div>
        <input
          id="input-duration"
          v-model.number="duration"
          type="range"
          min="0.2"
          max="3.0"
          step="0.1"
          class="w-full accent-neoAccent cursor-pointer border-3 border-neoPrimary p-1 bg-neoSurface shadow-[2px_2px_0px_0px_var(--neo-shadow)]"
        />
      </div>

      <!-- Stagger slider -->
      <div class="flex flex-col space-y-2">
        <div class="flex justify-between items-center text-xs font-mono font-black uppercase text-neoPrimary">
          <label for="input-stagger">[Stagger Delay]</label>
          <span class="text-[10px] text-neoAccent">{{ stagger.toFixed(3) }}s</span>
        </div>
        <input
          id="input-stagger"
          v-model.number="stagger"
          type="range"
          min="0.000"
          max="0.200"
          step="0.005"
          class="w-full accent-neoAccent cursor-pointer border-3 border-neoPrimary p-1 bg-neoSurface shadow-[2px_2px_0px_0px_var(--neo-shadow)]"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { gsap } from 'gsap'

// State variables (US3)
const textInput = ref('VINICIUS')
const maxScale = ref(150)
const duration = ref(1.4)
const stagger = ref(0.05)
const baseFrequency = ref(0.02)

const textContainer = ref<HTMLElement | null>(null)
const animationComplete = ref(false)
let tl: gsap.core.Timeline | null = null

// Split computed characters (US1)
const characters = computed(() => {
  const val = textInput.value.trim() === '' ? 'TRAE' : textInput.value.toUpperCase()
  return val.split('')
})

// Trigger entry animation (US1)
const runAnimation = () => {
  animationComplete.value = false

  // Kill running timeline (safety cleanup)
  if (tl) {
    tl.kill()
  }

  // Scoped select all displacement maps
  const dispMaps = textContainer.value?.querySelectorAll('feDisplacementMap') || []
  if (dispMaps.length === 0) return

  // Force reset initial scale attributes manually in the DOM
  dispMaps.forEach(map => {
    map.setAttribute('scale', maxScale.value.toString())
  })

  // Create GSAP animation timeline for distortion resolution only (lettering stays fixed)
  tl = gsap.timeline({
    onComplete: () => {
      animationComplete.value = true
      // Reset all scales to 0 to ensure clean text
      dispMaps.forEach(map => {
        map.setAttribute('scale', '0')
      })
    }
  })

  // Animate scale attribute of all feDisplacementMaps to 0 with stagger (US1)
  tl.to(dispMaps, {
    attr: { scale: 0 },
    duration: duration.value,
    stagger: stagger.value,
    ease: 'power4.out'
  }, 0)
}

// Hover micro-interaction per character
const onCharMouseEnter = (index: number) => {
  // Only trigger hover distortion if the entry animation has fully settled
  if (!animationComplete.value) return

  const dispMap = document.getElementById(`disp-${index}`)
  const charSpan = document.getElementById(`char-${index}`)
  if (!dispMap || !charSpan) return

  // Create dynamic independent hover timeline
  const tlHover = gsap.timeline()

  // Animate SVG filter scale (glitch effect)
  tlHover.to(dispMap, {
    attr: { scale: 60 },
    duration: 0.15,
    ease: 'power1.out'
  }, 0)
  tlHover.to(dispMap, {
    attr: { scale: 0 },
    duration: 0.45,
    ease: 'power2.out'
  }, 0.15)

  // Translate character up slightly with a snappy bounce back (Tactile Feedback)
  tlHover.to(charSpan, {
    y: -10,
    duration: 0.12,
    ease: 'power1.out'
  }, 0)
  tlHover.to(charSpan, {
    y: 0,
    duration: 0.35,
    ease: 'bounce.out'
  }, 0.12)
}

// Replay function (US2)
const replay = () => {
  runAnimation()
}

// Watch config changes to auto-run preview (US3)
watch([textInput, maxScale, duration, stagger], () => {
  nextTick(() => {
    runAnimation()
  })
})

onMounted(() => {
  nextTick(() => {
    runAnimation()
  })
})

// Cleanup on unmount (T018)
onUnmounted(() => {
  if (tl) {
    tl.kill()
  }
})
</script>

<style scoped>
/* Slider styling reset to maintain neo-brutalist theme */
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 14px;
  height: 14px;
  background: var(--neo-accent, #820ad1);
  border: 2px solid var(--neo-primary, #2E2E2E);
  cursor: pointer;
  border-radius: 0;
}

input[type="range"]::-moz-range-thumb {
  width: 14px;
  height: 14px;
  background: var(--neo-accent, #820ad1);
  border: 2px solid var(--neo-primary, #2E2E2E);
  cursor: pointer;
  border-radius: 0;
}
</style>
