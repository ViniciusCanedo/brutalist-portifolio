<template>
  <component
    :is="componentTag"
    v-bind="componentProps"
    :class="classes"
    class="base-button"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, resolveComponent } from 'vue'

interface Props {
  variant?: 'accent' | 'light'
  to?: string
  href?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'light',
  type: 'button',
  disabled: false
})

const componentTag = computed(() => {
  if (props.to) return resolveComponent('NuxtLink')
  if (props.href) return 'a'
  return 'button'
})

const componentProps = computed(() => {
  if (props.to) {
    return { to: props.to }
  }
  if (props.href) {
    return {
      href: props.href,
      target: '_blank',
      rel: 'noopener noreferrer'
    }
  }
  return {
    type: props.type,
    disabled: props.disabled
  }
})

const classes = computed(() => {
  const base = 'inline-block border-3 border-neoPrimary font-bold font-display uppercase tracking-wide text-center transition-all duration-100 ease-brutal-snappy select-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none'
  
  const shadow = 'shadow-brutal hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_var(--neo-shadow)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none'
  
  const colors = props.variant === 'accent'
    ? 'bg-neoAccent text-white'
    : 'bg-neoSurface text-neoPrimary hover:bg-neoBg'
    
  return `${base} ${shadow} ${colors}`
})
</script>

<style scoped>
.base-button {
  /* Safeguard to ensure smooth hardware acceleration during fast snap hover/active transformations */
  will-change: transform, box-shadow;
}
</style>
