import PageTransitionOverlay from "@/components/ui/PageTransitionOverlay.vue"

export function usePageTransition() {
  const overlay = ref<InstanceType<typeof PageTransitionOverlay> | null>(null)

  const pageTransitionConfig = {
    name: 'wipe',
    mode: 'out-in' as const,
    css: false,
    onLeave(el: Element, done: () => void) {
      overlay.value ? overlay.value.playLeave(done) : done()
    },
    onEnter(el: Element, done: () => void) {
      overlay.value ? overlay.value.playEnter(done) : done()
    }
  }

  return { overlay, pageTransitionConfig }
}