<template>
  <section
    v-if="projects && projects.length > 0"
    ref="sectionRef"
    class="relative max-w-7xl mx-auto w-full px-4 py-16 md:py-24 select-none overflow-hidden"
  >
    <!-- Header -->
    <div class="text-center mb-16 featured-header">
      <span
        class="bg-neoAccent text-white px-3 py-1.5 border-3 border-neoPrimary font-mono text-xs font-bold uppercase tracking-wider shadow-brutal"
      >
        // CURATED_PRODUCTION_INDEX
      </span>
      <h2
        class="text-3xl md:text-5xl font-black uppercase text-neoPrimary tracking-tight mt-4"
      >
        Featured Projects
      </h2>
    </div>

    <!-- Responsive Projects Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 featured-grid">
      <div
        v-for="proj in featuredProjects"
        :key="proj.id"
        class="featured-card-wrapper h-full"
      >
        <ProjectCard :project="proj" />
      </div>
    </div>

    <!-- CTA Button Container -->
    <div class="text-center featured-cta">
      <BrutalistButton
        to="/projects"
        variant="accent"
        class="px-8 py-4 font-mono text-base tracking-wider"
      >
        VIEW MORE PROJECTS
      </BrutalistButton>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, nextTick } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const { projects, featuredProjects } = useProjects();

const sectionRef = ref<HTMLElement | null>(null);
let ctx: gsap.Context | null = null;

onMounted(async () => {
  await nextTick();
  gsap.registerPlugin(ScrollTrigger);

  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top 80%",
        toggleActions: "play reverse play reverse",
      },
    });

    // Sequenced GSAP animations
    tl.fromTo(
      ".featured-header",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
    )
      .fromTo(
        ".featured-card-wrapper",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: "back.out(1.5)",
        },
        "-=0.3",
      )
      .fromTo(
        ".featured-cta",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.5)" },
        "-=0.2",
      );
  }, sectionRef.value ?? undefined);
});

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(t => t.kill())
  if (ctx) {
    ctx.revert();
  }
});
</script>
