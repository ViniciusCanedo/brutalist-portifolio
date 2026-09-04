import { ref, computed } from "vue";
import type { Project } from "~/components/ui/ProjectCard.vue";

export function useProjects() {
  const activeFilter = ref("ALL");

  const projects = ref<Project[]>([
    {
      id: "telemetry-engine",
      title: "Telemetry HUD Engine",
      tag: "SYSTEMS",
      metric: "< 12ms",
      role: "Lead Architect",
      desc: "Developed a high-performance web dashboard displaying real-time server and network hardware telemetry in a low-latency layout.",
      metrics: [
        "LATENCY: < 12ms active render loop",
        "THROUGHPUT: 15,000 updates/sec",
        "SSR_COMPILATION: Zero warnings",
        "DYNAMICS: WebSockets integrations",
      ],
      stack: ["nuxt3", "bun", "tailwind", "typescript"],
      githubUrl: "https://github.com/stark-dev/telemetry-hud",
      previewUrl: "https://telemetry.stark-dev.example.com",
      imageUrl: "/img/telemetry_hud_thumbnail.png",
    },
    {
      id: "performance-optimizer",
      title: "Workbench Bundler",
      tag: "PERFORMANCE",
      metric: "100%",
      role: "Core Specialist",
      desc: "Re-engineered the compilation pipeline by swapping standard execution engines with Bun and custom treeshaking configurations.",
      metrics: [
        "BUNDLE_SIZE: Reduced by 48%",
        "HMR_TIMING: < 50ms hot reload",
        "LIGHTHOUSE_SCORE: 100% flat performance",
        "MEMORY_USAGE: < 80MB execution limit",
      ],
      stack: ["bun", "postcss", "esbuild", "javascript"],
      githubUrl: "https://github.com/stark-dev/workbench-bundler",
      previewUrl: "https://bundler.stark-dev.example.com",
      imageUrl: "/img/workbench_bundler_thumbnail.png",
    },
    {
      id: "dynamic-sandbox",
      title: "GSAP Motion Engine",
      tag: "DYNAMIC_UI",
      metric: "60 fps",
      role: "Interactive Developer",
      desc: "Created an animation testing workbench with live easing modifications, speed parameters sliders, and visual timeline debug maps.",
      metrics: [
        "TIMELINE_SAFETY: Memory leak-free mounts",
        "EASINGS: Snappy cubic-bezier curves",
        "FRAME_RATE: Lock 60fps rendering",
        "RELOADS: Hot update configurations",
      ],
      stack: ["gsap3", "vue3", "tailwind", "html5"],
      githubUrl: "https://github.com/stark-dev/gsap-motion-engine",
      previewUrl: "https://motion.stark-dev.example.com",
      imageUrl: "/img/gsap_motion_engine_thumbnail.png",
    },
  ]);

  const filteredProjects = computed(() => {
    if (activeFilter.value === "ALL") {
      return projects.value;
    }
    return projects.value.filter((proj) => proj.tag === activeFilter.value);
  });

  const featuredProjects = computed(() => {
    return projects.value.slice(0, 3);
  });

  return {
    projects,
    activeFilter,
    filteredProjects,
    featuredProjects,
  };
}
