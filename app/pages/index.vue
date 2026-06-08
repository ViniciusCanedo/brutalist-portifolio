<template>
  <div class="min-h-screen flex flex-col bg-neoBg transition-colors">
    <!-- Navbar -->
    <Navbar current-page="landing" />

    <!-- Main Content -->
    <main class="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full space-y-12">
      <!-- HERO SECTION -->
      <header class="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
        <div class="lg:col-span-8 flex flex-col justify-center space-y-6">
          <div class="bg-white border-brutal p-6 shadow-brutal-lg relative text-neoPrimary">
            <div class="absolute top-0 right-0 bg-neoAccent text-white font-mono text-[10px] px-2.5 py-1 border-b-3 border-l-3 border-neoPrimary font-bold">
              ROLE // FRONTEND_ARCHITECT
            </div>
            <div class="font-mono text-xs text-neoAccent font-bold mb-2">// INIT_CORE_METRICS</div>
            <h1 class="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight leading-tight select-none">
              CREATING RESILIENT <br>
              <span class="text-white bg-neoPrimary px-2 py-1 inline-block my-1 transform -rotate-1">INTERFACE SYSTEMS</span>
            </h1>
            <p class="mt-4 font-mono text-neoDark text-xs sm:text-sm max-w-xl">
              Specializing in Nuxt 3 architectures, optimized compile pipelines, deterministic micro-interactions, and GSAP curves. Visual cleanliness driven by logic.
            </p>
          </div>

          <!-- Quick Actions -->
          <div class="flex flex-wrap gap-4">
            <NuxtLink to="/projects">
              <BrutalistButton>
                EXPLORE CURATED WORK <span>→</span>
              </BrutalistButton>
            </NuxtLink>
          </div>
        </div>

        <!-- Terminal Diagnostics Simulator -->
        <aside class="lg:col-span-4">
          <div class="bg-white border-brutal shadow-brutal-lg flex flex-col h-full min-h-[250px]">
            <div class="bg-neoPrimary text-white px-4 py-3 border-b-3 border-neoPrimary flex items-center justify-between font-mono text-xs">
              <span>TERMINAL // DIAGNOSTICS</span>
              <div class="flex gap-1.5">
                <span class="w-3.5 h-3.5 border-2 border-white rounded-full bg-red-500"></span>
                <span class="w-3.5 h-3.5 border-2 border-white rounded-full bg-yellow-400"></span>
                <span class="w-3.5 h-3.5 border-2 border-white rounded-full bg-green-400"></span>
              </div>
            </div>
            <div class="p-4 bg-white flex-1 font-mono text-xs text-neoPrimary space-y-3">
              <p class="text-neoAccent font-bold">// STARK METRICS PORTAL LOADED.</p>
              <div class="border-l-2 border-neoPrimary pl-2 space-y-1 text-[11px]">
                <p class="font-bold">STATUS: <span class="bg-green-100 text-green-800 px-1 border border-green-300">ONLINE</span></p>
                <p>ENGINE: NUXT 3 COMPOSITION PIPELINE</p>
                <p>ANIMATION EASE: <span class="bg-orange-100 text-neoAccent px-1 font-bold">Snappy</span></p>
                <p>SPEED CURVE: 0.3s</p>
              </div>
            </div>
          </div>
        </aside>
      </header>

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
