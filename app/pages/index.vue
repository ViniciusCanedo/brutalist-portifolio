<template>
  <div class="min-h-screen flex flex-col bg-neoBg transition-colors">
    <!-- Navbar -->
    <Navbar current-page="landing" />

    <!-- Main Content -->
    <main class="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full space-y-12">
      <!-- HERO SECTION -->
      <HeroSection />

      <!-- Token Verification Sandbox -->
      <section class="space-y-4">
        <h2 class="text-xl font-black uppercase font-mono tracking-tight border-b-3 border-neoPrimary pb-2 text-neoPrimary">
          // Design_System_Token_Verifier
        </h2>
        <TokenVerifier />
      </section>
    </main>

    <footer class="bg-neoDark text-neoBg border-t-3 border-neoPrimary p-8 font-mono text-xs text-center">
      &copy; 2026 STARK_DEV // ALL TELEMETRY SECURED.
    </footer>
  </div>
</template>
