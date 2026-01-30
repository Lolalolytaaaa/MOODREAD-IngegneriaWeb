<template>
  <div class="relative group w-full h-[540px] bg-mood-dark rounded-3xl p-6 text-white shadow-2xl transition-transform transform flex flex-col justify-between border border-mood-accent">
    
    <div class="absolute -top-6 left-1/2 transform -translate-x-1/2 w-[90%] bg-white text-mood-dark px-4 py-3 rounded-2xl shadow-lg z-20 border-2 border-green-50 flex items-center justify-center min-h-[3.5rem]">
      <h3 class="font-display font-bold text-base md:text-lg tracking-wide text-center leading-tight break-words">
        {{ title }}
      </h3>
    </div>
    <div class="mt-8"></div>

    <div class="relative bg-white/10 backdrop-blur-md rounded-2xl p-5 flex items-center justify-center text-center border border-white/20 shadow-inner h-[160px]">
      <span class="absolute top-2 left-3 text-4xl text-mood-accent opacity-50 font-display">“</span>
      <p class="text-md font-display italic leading-relaxed text-green-50 overflow-y-auto max-h-full scrollbar-hide">
        {{ quote }}
      </p>
      <span class="absolute bottom-[-10px] right-4 text-4xl text-mood-accent opacity-50 font-display">”</span>
    </div>

    <div class="flex flex-row items-start space-x-3 mt-2 bg-black/20 p-3 rounded-2xl border border-white/5 h-[200px]">
      
      <div class="flex-shrink-0 flex flex-col items-center w-24">
        <img 
          :src="coverImage" 
          :alt="title"
          class="w-20 h-20 object-cover rounded-full border-2 border-white/80 shadow-lg bg-gray-200"
          @error="handleImageError"
        />
        <p class="text-[9px] text-center text-green-100 mt-2 font-bold uppercase tracking-wider leading-tight font-display">
          {{ author }}
        </p>
      </div>

      <div class="flex flex-col overflow-hidden h-full w-full">
        <span class="text-[9px] font-bold text-mood-accent uppercase mb-1 tracking-widest border-b border-white/10 pb-1">
          La Trama
        </span>
        <p class="text-[11px] text-gray-200 leading-snug font-body overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-mood-light scrollbar-track-transparent h-full">
          {{ description }}
        </p>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: 'Titolo Sconosciuto'
  },
  author: {
    type: String,
    default: 'Autore'
  },
  quote: {
    type: String,
    default: 'Nessuna citazione disponibile'
  },
  description: {
    type: String,
    default: 'Descrizione non disponibile'
  },
  coverImage: {
    type: String,
    default: 'https://via.placeholder.com/300x450'
  }
});

const handleImageError = (e: Event) => {
  const target = e.target as HTMLImageElement;
  target.src = "https://via.placeholder.com/300x450?text=No+Cover";
};
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>
