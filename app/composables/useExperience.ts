import { computed } from "vue";

export function useExperience() {
  const startYear = 2021;
  const yearsOfExperience = computed(() => {
    return new Date().getFullYear() - startYear;
  });

  return {
    startYear,
    yearsOfExperience,
  };
}
