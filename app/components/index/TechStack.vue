<template>
  <div class="max-w-7xl mx-auto px-4 py-12 md:py-20 select-none">
    <!-- Section Header (Uppercase bold typography, Neo-Brutalist styling) -->
    <div class="text-center mb-12 md:mb-16">
      <span
        class="bg-neoAccent text-white px-3 py-1.5 border-3 border-neoPrimary font-mono text-xs font-bold uppercase tracking-wider shadow-brutal inline-block mb-4"
      >
        // PORTFOLIO_CORE_COMPETENCIES
      </span>
      <h2
        class="text-4xl md:text-6xl font-black uppercase text-neoPrimary tracking-tight"
      >
        Tech <span class="text-neoAccent">Stack</span>
      </h2>
      <p
        class="font-mono text-sm text-neoPrimary mt-2 uppercase font-bold tracking-widest"
      >
        Skills, Frameworks & Toolsets
      </p>
    </div>

    <!-- Desktop layout (Hidden on mobile) -->
    <TechStickerBoard :stickers="allStickers" class="hidden md:block" />

    <!-- Mobile layout (Hidden on desktop) -->
    <TechAccordion :categories="categories" class="block md:hidden" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const { categories } = useTechStack();

// Flatten all items for the desktop sticker pack
const allStickers = computed(() => {
  return categories.flatMap((cat) =>
    cat.items.map((item) => ({
      name: item.name,
      categoryId: cat.id,
    }))
  );
});
</script>
