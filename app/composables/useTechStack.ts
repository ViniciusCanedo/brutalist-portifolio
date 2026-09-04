import { computed } from "vue";

export interface TechItem {
  name: string;
}

export interface TechCategory {
  id: string;
  title: string;
  items: TechItem[];
}

export function useTechStack() {
  const categories: TechCategory[] = [
    {
      id: "backend",
      title: "Backend",
      items: [
        { name: "Laravel" },
        { name: "PHP" },
        { name: "Go" },
        { name: "Node.js" },
        { name: "PostgreSQL" },
        { name: "MySQL" },
      ],
    },
    {
      id: "frontend",
      title: "Frontend",
      items: [
        { name: "Vue.js" },
        { name: "Nuxt.js" },
        { name: "Tailwind CSS" },
        { name: "GSAP" },
        { name: "TypeScript" },
        { name: "JavaScript" },
      ],
    },
    {
      id: "devops",
      title: "DevOps",
      items: [
        { name: "Docker" },
        { name: "AWS" },
        { name: "CI/CD" },
        { name: "Nginx" },
        { name: "Git" },
        { name: "Linux" },
        { name: "Vercel" },
      ],
    },
  ];

  // Flatten categories into a unique list for the marquee dynamically
  const allTech = computed(() => {
    return categories.flatMap((cat) => cat.items.map((item) => item.name));
  });

  return {
    categories,
    allTech,
  };
}
