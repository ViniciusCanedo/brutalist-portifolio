<template>
  <!-- LAYOUT 2: Mobile - Mechanical Drawers -->
  <div
    ref="mobileAccordion"
    class="border-3 border-neoPrimary bg-neoSurface shadow-brutal divide-y-3 divide-neoPrimary"
  >
    <div
      v-for="category in categories"
      :key="'mobile-category-' + category.id"
      class="mobile-drawer-item flex flex-col"
    >
      <!-- Header Button -->
      <button
        @click="toggleDrawer(category.id)"
        class="w-full flex justify-between items-center px-6 py-6 active:bg-neoAccent active:text-white transition-colors duration-200 text-left group select-none"
        :class="
          activeDrawer === category.id
            ? 'bg-neoAccent text-white'
            : 'bg-neoSurface text-neoPrimary'
        "
      >
        <h3 class="text-2xl font-black uppercase tracking-tight">
          {{ category.title }}
        </h3>
        <!-- Toggle Indicator Icon with bold, thick border -->
        <span
          class="w-10 h-10 flex items-center justify-center border-3 border-neoPrimary bg-neoSurface text-neoPrimary shadow-brutal transition-all duration-200 transform group-active:translate-x-[4px] group-active:translate-y-[4px] group-active:shadow-none"
        >
          <span
            class="font-black text-2xl font-mono inline-block transition-transform duration-200"
            :class="activeDrawer === category.id ? 'rotate-180' : ''"
          >
            {{ activeDrawer === category.id ? '−' : '＋' }}
          </span>
        </span>
      </button>

      <!-- Drawer Content -->
      <div
        :ref="(el) => setDrawerRef(el, category.id)"
        class="overflow-hidden h-0 bg-neoBg"
      >
        <div class="p-6 border-t-3 border-neoPrimary">
          <div class="flex flex-wrap gap-3">
            <span
              v-for="item in category.items"
              :key="'mobile-item-' + item.name"
              class="px-4 py-2 bg-neoSurface border-2 border-neoPrimary font-bold text-sm shadow-brutal uppercase text-neoPrimary cursor-default select-none"
            >
              {{ item.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface TechItem {
  name: string;
}

export interface TechCategory {
  id: string;
  title: string;
  items: TechItem[];
}

defineProps<{
  categories: TechCategory[];
}>();

let ctx: gsap.Context | null = null;
const mobileAccordion = ref<HTMLElement | null>(null);

// Accordion Logic for Mobile
const activeDrawer = ref<string | null>(null);
const drawerRefs = ref<{ [key: string]: HTMLElement }>({});

const setDrawerRef = (el: any, categoryId: string) => {
  if (el) drawerRefs.value[categoryId] = el;
};

const toggleDrawer = (categoryId: string) => {
  const content = drawerRefs.value[categoryId];
  if (!content) return;

  if (activeDrawer.value === categoryId) {
    // Close current
    gsap.to(content, { height: 0, duration: 0.35, ease: "power2.out" });
    activeDrawer.value = null;
  } else {
    // Close previous
    if (activeDrawer.value && drawerRefs.value[activeDrawer.value]) {
      gsap.to(drawerRefs.value[activeDrawer.value], {
        height: 0,
        duration: 0.35,
        ease: "power2.out",
      });
    }
    // Open new
    gsap.set(content, { height: "auto" });
    const targetHeight = content.offsetHeight;
    gsap.fromTo(
      content,
      { height: 0 },
      { height: targetHeight, duration: 0.4, ease: "power2.out" }
    );
    activeDrawer.value = categoryId;
  }
};

onMounted(async () => {
  await nextTick();
  gsap.registerPlugin(ScrollTrigger);

  ctx = gsap.context(() => {
    // Mobile: ScrollTrigger staggered fade-in for headers
    if (mobileAccordion.value) {
      gsap.fromTo(
        ".mobile-drawer-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: mobileAccordion.value,
            start: "top 90%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }
  });
});

onUnmounted(() => {
  if (ctx) {
    ctx.revert();
  }
});
</script>
