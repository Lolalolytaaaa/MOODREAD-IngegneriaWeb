<template>
  <div class="min-h-screen bg-white text-mood-dark flex flex-col items-center justify-center p-4 relative">
    <h2 class="font-display text-6xl uppercase md:text-6xl text-center mb-8">apri un libro, apri te stesso</h2>
    <div class="bg-mood-dark text-white backdrop-blur-sm rounded-3xl p-8 md:p-12 max-w-3xl text-center shadow-lg mb-10">
      <p class="font-display text-2xl  tracking-widest leading-relaxed">
        Vedi la lettura come ponte verso la comprensione e la guarigione interiore.
        Ogni pagina letta è un passo in un viaggio di trasformazione.
      </p>
    </div>
    <router-link to="/mood-select" class="bg-mood-dark text-white font-display text-2xl uppercase px-12 py-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-300">
      biblioterapia
    </router-link>
  </div>
</template>