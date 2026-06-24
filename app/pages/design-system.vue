<template>
  <div class="min-h-screen flex flex-col bg-transparent transition-colors">
    <div class="relative z-10 bg-neoBg flex flex-col w-full flex-1">
      <!-- Navbar -->
      <Navbar current-page="design-system" />

      <!-- Main Content -->
      <main class="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full space-y-12">
        <div class="text-center mb-8">
          <h1
            class="text-4xl md:text-6xl font-black uppercase text-neoPrimary tracking-tight"
          >
            Design <span class="text-neoAccent">System</span>
          </h1>
          <p
            class="font-mono text-neoPrimary mt-4 uppercase font-bold tracking-wider"
          >
            // UI Components & Token Verifier
          </p>
        </div>

        <!-- TECH STACK SHOWCASE -->
        <TechStackShowcase />

        <!-- STICKER PACK MOBILE TEST -->
        <StickerPackMobileTest />

        <!-- Text Distortion Sandbox -->
        <section class="space-y-4 mt-24">
          <h2
            class="text-2xl font-black uppercase font-mono tracking-tight border-b-3 border-neoPrimary pb-2 text-neoPrimary"
          >
            // Font_Distortion_Sandbox
          </h2>
          <TextDistortionSandbox />
        </section>

        <!-- Token Verification Sandbox -->
        <section class="space-y-4 mt-24">
          <h2
            class="text-2xl font-black uppercase font-mono tracking-tight border-b-3 border-neoPrimary pb-2 text-neoPrimary"
          >
            // Design_System_Token_Verifier
          </h2>
          <TokenVerifier />
        </section>
      </main>
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
// Components are auto-imported by Nuxt
</script>
