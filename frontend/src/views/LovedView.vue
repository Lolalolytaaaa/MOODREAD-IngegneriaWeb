<script setup lang="ts">
import { ref, computed } from 'vue';

const recommendedBooks = [
  {
    title: "L'eleganza del riccio",
    author: "Muriel Barbery",
    quote: "Madame Michel ha l'eleganza del riccio: fuori è protetta da aculei, una vera e propria fortezza, ma ho il sospetto che dentro sia semplice e raffinata.",
    description: "Ideale per chi esplora il divario tra l'imposizione sociale e una vita interiore colta e profonda.",
    coverImage: "https://www.libraccio.it/images/9788866320852_0_350_0_75.jpg"
  },
  {
    title: "La campana di vetro",
    author: "Sylvia Plath",
    quote: "Dovunque mi fossi trovata — sul ponte di una nave o in un caffè di Parigi — sarei sempre stata sotto la stessa campana di vetro.",
    description: "Ideale per chi necessita di una rappresentazione lucida, cruda e catartica del disagio psichico.",
    coverImage: "https://giuntialpunto.it/cdn/shop/products/9788804787440.1000.jpg?v=1706483130&width=1445"
  },
  {
    title: "Il barone rampante",
    author: "Italo Calvino",
    quote: "Si conobbero. Lui conobbe lei e se stesso, perché in verità non s'era mai saputo.",
    description: "Consigliato a chi intende la libertà come una posizione morale da difendere con coerenza.",
    coverImage: "https://www.ilpianetalibro.it/wp-content/uploads/2025/05/Recensione-completa-Il-barone-rampante-Italo-Calvino.jpg"
  },
  {
    title: "Norwegian Wood",
    author: "Haruki Murakami",
    quote: "La morte non è l'opposto della vita, ma una sua parte integrante.",
    description: "Suggerito per affrontare il peso della memoria e la malinconia intrinseca della crescita.",
    coverImage: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1691007958i/11297.jpg"
  },
  {
    title: "L'arte della gioia",
    author: "Goliarda Sapienza",
    quote: "L'unico modo per essere liberi è non avere paura di essere soli con la propria verità.",
    description: "Una risorsa per chi ricerca un percorso di emancipazione radicale e affermazione vitale.",
    coverImage: "https://image.anobii.com/anobi/image_book.php?item_id=0171f424d5c99a29a3"
  }
];

const currentIndex = ref(0);

const currentBook = computed(() => recommendedBooks[currentIndex.value]);

const nextBook = () => {
  if (currentIndex.value < recommendedBooks.length - 1) {
    currentIndex.value++;
  } else {
    currentIndex.value = 0;
  }
};

const prevBook = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  } else {
    currentIndex.value = recommendedBooks.length - 1;
  }
};
</script>

<template>
  <div class="min-h-screen bg-white pt-24 pb-24 px-4 flex flex-col items-center">
    
    <h1 class="font-display text-5xl text-mood-dark mb-12 text-center">I più amati</h1>

    <div class="relative w-full max-w-6xl flex items-center justify-center gap-4">

      <button 
        @click="prevBook"
        class="hidden md:flex bg-[#3A6328] text-white p-3 rounded-full hover:scale-110 transition shadow-lg z-10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-8 h-8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <div class="bg-[#2d5a27] rounded-[3rem] p-8 md:p-12 w-full relative shadow-2xl text-white">
        
        <div class="absolute -top-2 right-12">
            <svg width="40" height="60" viewBox="0 0 40 60" fill="none">
                <path d="M0 0H40V60L20 45L0 60V0Z" fill="white"/>
            </svg>
        </div>

        <div class="bg-white text-[#2d5a27] rounded-full py-4 px-8 text-center mb-8 shadow-md mx-auto max-w-3xl transform -translate-y-4">
          <h2 class="font-display text-xl md:text-2xl">
            {{ currentBook.title }} <span class="font-sans text-sm md:text-lg opacity-80">(di {{ currentBook.author }})</span>
          </h2>
        </div>

        <div class="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          
          <div class="flex-shrink-0 relative group">
            <img 
              :src="currentBook.coverImage" 
              :alt="currentBook.title"
              class="w-[200px] md:w-[280px] rounded-lg shadow-2xl transform group-hover:scale-105 transition duration-500 border-l-4 border-white/20"
            />
            <div class="absolute bottom-0 left-2 w-full h-4 bg-white/20 rounded-b-lg -z-10 transform translate-y-2 translate-x-1"></div>
          </div>

          <div class="flex flex-col gap-6 w-full">
            
            <div class="bg-white/20 backdrop-blur-sm rounded-3xl p-6 md:p-8 relative">
                <span class="absolute top-4 left-4 text-4xl opacity-50 font-serif">“</span>
                <p class="font-display text-lg md:text-xl leading-relaxed pl-6 italic">
                  {{ currentBook.quote }}
                </p>
                <span class="absolute bottom-4 right-4 text-4xl opacity-50 font-serif">”</span>
            </div>

            <div class="bg-white/10 rounded-3xl p-6 md:p-8">
              <p class="font-sans text-base md:text-lg leading-relaxed opacity-90">
                {{ currentBook.description }}
              </p>
            </div>

          </div>
        </div>

      </div>

      <button 
        @click="nextBook"
        class="hidden md:flex bg-[#3A6328] text-white p-3 rounded-full hover:scale-110 transition shadow-lg z-10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-8 h-8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

    </div>

    <div class="flex md:hidden gap-8 mt-8">
        <button @click="prevBook" class="bg-[#3A6328] text-white p-4 rounded-full shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
        </button>
        <button @click="nextBook" class="bg-[#3A6328] text-white p-4 rounded-full shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
        </button>
    </div>

  </div>
</template>