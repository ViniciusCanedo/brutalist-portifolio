<template>
  <nav
    class="sticky top-0 z-50 bg-neoSurface border-b-3 border-neoPrimary text-neoPrimary px-4 py-4 flex items-center justify-between transition-colors"
  >
    <!-- Branding logo -->
    <div class="flex items-center gap-3 select-none">
      <span
        class="bg-neoAccent text-white p-2 border-3 border-neoPrimary font-bold text-lg shadow-brutal flex items-center justify-center w-10 h-10"
      >
        VC
      </span>
      <div>
        <span
          class="font-bold text-sm tracking-tight block uppercase leading-none"
          >VINICIUS CANEDO</span
        >
        <span
          class="font-mono text-[9px] text-neoMuted leading-none uppercase font-bold"
          >Software Engineer</span
        >
      </div>
    </div>

    <!-- Desktop navigation -->
    <div class="hidden md:flex items-center gap-3">
      <BrutalistButton
        to="/"
        :variant="currentPage === 'landing' ? 'accent' : 'light'"
        class="px-4 py-2 text-xs tracking-wide"
      >
        // HOME
      </BrutalistButton>
      <BrutalistButton
        to="/projects"
        :variant="currentPage === 'projects' ? 'accent' : 'light'"
        class="px-4 py-2 text-xs tracking-wide"
      >
        // PROJECTS
      </BrutalistButton>
      <BrutalistButton
        to="/design-system"
        :variant="currentPage === 'design-system' ? 'accent' : 'light'"
        class="px-4 py-2 text-xs tracking-wide"
      >
        // DESIGN_SYSTEM
      </BrutalistButton>

      <!-- Theme Toggle Button -->
      <BrutalistButton
        id="theme-toggle-btn"
        @click="toggleTheme"
        variant="light"
        aria-label="Toggle Theme"
        class="p-2 flex items-center justify-center w-10 h-10"
      >
        <!-- Sun Icon -->
        <svg
          v-if="isDark"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="3"
        >
          <path
            stroke-linecap="square"
            stroke-linejoin="miter"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"
          />
        </svg>
        <!-- Moon Icon -->
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="3"
        >
          <path
            stroke-linecap="square"
            stroke-linejoin="miter"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </BrutalistButton>
    </div>

    <!-- Mobile menu button and theme toggle -->
    <div class="flex md:hidden items-center gap-3">
      <!-- Theme Toggle Button -->
      <BrutalistButton
        id="theme-toggle-btn-mobile"
        @click="toggleTheme"
        variant="light"
        aria-label="Toggle Theme"
        class="p-2 flex items-center justify-center w-10 h-10"
      >
        <!-- Sun Icon -->
        <svg
          v-if="isDark"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="3"
        >
          <path
            stroke-linecap="square"
            stroke-linejoin="miter"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"
          />
        </svg>
        <!-- Moon Icon -->
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="3"
        >
          <path
            stroke-linecap="square"
            stroke-linejoin="miter"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </BrutalistButton>

      <BrutalistButton
        @click="isOpen = !isOpen"
        variant="light"
        aria-label="Toggle Menu"
        class="p-2 flex items-center justify-center w-10 h-10"
      >
        <!-- Custom Neo-Brutalist Hamburger/X Icon -->
        <svg
          v-if="!isOpen"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="3"
        >
          <path
            stroke-linecap="square"
            stroke-linejoin="miter"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="3"
        >
          <path
            stroke-linecap="square"
            stroke-linejoin="miter"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </BrutalistButton>
    </div>

    <!-- Mobile navigation overlay / dropdown -->
    <transition name="menu-slide">
      <div
        v-if="isOpen"
        class="absolute top-full left-0 right-0 bg-neoSurface border-b-3 border-neoPrimary p-4 flex flex-col gap-3 shadow-brutal-lg md:hidden z-40"
      >
        <BrutalistButton
          to="/"
          @click="isOpen = false"
          :variant="currentPage === 'landing' ? 'accent' : 'light'"
          class="w-full text-center px-4 py-3 text-sm tracking-wide"
        >
          // HOME
        </BrutalistButton>
        <BrutalistButton
          to="/projects"
          @click="isOpen = false"
          :variant="currentPage === 'projects' ? 'accent' : 'light'"
          class="w-full text-center px-4 py-3 text-sm tracking-wide"
        >
          // PROJECTS
        </BrutalistButton>
        <BrutalistButton
          to="/design-system"
          @click="isOpen = false"
          :variant="currentPage === 'design-system' ? 'accent' : 'light'"
          class="w-full text-center px-4 py-3 text-sm tracking-wide"
        >
          // DESIGN_SYSTEM
        </BrutalistButton>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useState } from "#imports";

defineProps({
  currentPage: { type: String, default: "landing" },
});

const isOpen = ref(false);
const isDark = useState('theme-dark', () => false);
let mediaQueryList = null;

const handleSystemThemeChange = (e) => {
  const stored = localStorage.getItem("brutalist-portfolio-theme");
  if (!stored) {
    isDark.value = e.matches;
  }
};

onMounted(() => {
  if (typeof window !== "undefined") {
    mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener("change", handleSystemThemeChange);
    } else {
      mediaQueryList.addListener(handleSystemThemeChange);
    }
  }
});

onUnmounted(() => {
  if (mediaQueryList) {
    if (mediaQueryList.removeEventListener) {
      mediaQueryList.removeEventListener("change", handleSystemThemeChange);
    } else {
      mediaQueryList.removeListener(handleSystemThemeChange);
    }
  }
});

const toggleTheme = () => {
  isDark.value = !isDark.value;
  localStorage.setItem("brutalist-portfolio-theme", isDark.value ? "dark" : "light");
};
</script>

<style scoped>
.menu-slide-enter-active,
.menu-slide-leave-active {
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.menu-slide-enter-from,
.menu-slide-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
