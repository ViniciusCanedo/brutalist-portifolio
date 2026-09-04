<template>
  <div>
    <!-- The Unified Brutalist Footer Wrapper -->
    <footer
      class="relative z-10 bg-neoDark border-t-3 border-neoPrimary px-6 py-16 md:px-12 md:py-24"
    >
      <div
        class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start"
      >
        <!-- Column 1: Brand & Identity -->
        <div class="flex flex-col gap-8 order-1">
          <!-- Duplicated Brand Logo from Navbar.vue -->
          <NuxtLink
            to="/"
            class="flex items-center gap-3 select-none w-fit focus:outline-none"
            aria-label="Return Home"
          >
            <span
              class="bg-neoAccent text-white p-2 border-3 border-neoPrimary font-bold text-lg shadow-brutal flex items-center justify-center w-10 h-10 hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_var(--neo-shadow)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all duration-100 ease-brutal-snappy"
            >
              VC
            </span>
            <div>
              <span
                class="font-bold text-sm tracking-tight block uppercase leading-none text-white"
                >VINICIUS CANEDO</span
              >
              <span
                class="font-mono text-[9px] text-neoMuted leading-none uppercase font-bold"
                >Software Engineer</span
              >
            </div>
          </NuxtLink>

          <!-- Location Info -->
          <div class="space-y-2">
            <p
              class="text-xs font-mono tracking-widest text-neoMuted uppercase"
            >
              // LOCATION STATUS //
            </p>
            <p
              class="text-xl md:text-2xl font-bold font-display uppercase text-white leading-none"
            >
              Sorocaba - SP,<br />Brazil
            </p>
          </div>

          <!-- Download Resume/CV Button -->
          <div>
            <BrutalistButton
              href="/CV_Vinicius_Canedo.pdf"
              variant="accent"
              download
              class="px-6 py-3.5"
            >
              DOWNLOAD CV
            </BrutalistButton>
          </div>
        </div>

        <!-- Column 2: Navigation Links -->
        <div class="flex flex-col gap-6 md:pl-8 order-3 md:order-2">
          <p class="text-xs font-mono tracking-widest text-neoMuted uppercase">
            // DIRECTORY //
          </p>
          <div class="flex flex-col gap-4 items-start">
            <NuxtLink
              to="/"
              class="text-base font-bold font-display uppercase text-white hover:bg-neoAccent hover:text-white px-2 py-1.5 border-3 border-transparent hover:border-neoPrimary hover:shadow-brutal transition-all duration-100 ease-brutal-snappy"
            >
              // HOME
            </NuxtLink>
            <NuxtLink
              to="/projects"
              class="text-base font-bold font-display uppercase text-white hover:bg-neoAccent hover:text-white px-2 py-1.5 border-3 border-transparent hover:border-neoPrimary hover:shadow-brutal transition-all duration-100 ease-brutal-snappy"
            >
              // PROJECTS
            </NuxtLink>
            <a
              href="https://github.com/viniciuscanedo"
              target="_blank"
              rel="noopener noreferrer"
              class="text-base font-bold font-display uppercase text-white hover:bg-neoAccent hover:text-white px-2 py-1.5 border-3 border-transparent hover:border-neoPrimary hover:shadow-brutal transition-all duration-100 ease-brutal-snappy"
            >
              // GITHUB
            </a>
            <a
              href="https://linkedin.com/in/viniciuscanedo"
              target="_blank"
              rel="noopener noreferrer"
              class="text-base font-bold font-display uppercase text-white hover:bg-neoAccent hover:text-white px-2 py-1.5 border-3 border-transparent hover:border-neoPrimary hover:shadow-brutal transition-all duration-100 ease-brutal-snappy"
            >
              // LINKEDIN
            </a>
          </div>
        </div>

        <!-- Column 3: Secure Contact Form (Extracted Component) -->
        <ContactForm />
      </div>
    </footer>

    <!-- Fixed Marquee Background Layer (Extracted Component) -->
    <FooterMarquee :tech-list="allTech" />
  </div>
</template>

<script setup lang="ts">
const { allTech } = useTechStack();
</script>
