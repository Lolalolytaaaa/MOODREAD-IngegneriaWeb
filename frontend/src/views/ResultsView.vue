<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import BookCard from '../components/BookCard.vue';
import axios from 'axios';

const route = useRoute();
const recommendedBooks = ref([]);
const loading = ref(false);
const error = ref('');
const currentMood = ref('');

const fetchBooks = async (mood: string) => {
  if (!mood) return;

  loading.value = true;
  currentMood.value = mood;
  recommendedBooks.value = [];

  try {
    console.log(`Richiedo libri per: ${mood}`);
    const response = await axios.get(`http://localhost:3000/api/books?mood=${mood}`);
    recommendedBooks.value = response.data;
  } catch (err) {
    console.error("Errore nel caricamento:", err);
    error.value = "Impossibile caricare i libri. Controlla il server.";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  const moodIniziale = (route.query.mood as string) || 'felice';
  fetchBooks(moodIniziale);
});

watch(
  () => route.query.mood,
  (newMood) => {
    if (newMood) {
      fetchBooks(newMood as string);
    }
  }
);
</script>

<template>
  <div class="min-h-screen bg-mood-bg overflow-x-hidden">
    
    <div class="pt-24 pb-12">
      
      <div class="text-center mb-20 px-4">
        
        <h1 class="font-display text-5xl text-mood-dark mb-6">
          Il tuo Antidoto Letterario
        </h1>

        <p class="text-xl md:text-2xl text-gray-600 font-light font-body">
          Ecco i libri consigliati per quando ti senti 
          <span class="font-bold text-mood-dark capitalize relative">
            {{ currentMood }}
            <span class="absolute -bottom-1 left-0 w-full h-1 bg-mood-light/50 rounded-full"></span>
          </span>
        </p>
      </div>

      <div v-if="loading" class="text-center py-20">
        <p class="text-xl text-mood-light animate-pulse font-body">Sto cercando i libri giusti per te...</p>
      </div>

      <div v-else-if="error" class="text-center py-20 text-red-500 font-body">
        {{ error }}
      </div>

      <div v-else class="relative w-full mt-12">
        
        <div class="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-mood-bg to-transparent z-10 pointer-events-none"></div>
        <div class="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-mood-bg to-transparent z-10 pointer-events-none"></div>

        <div class="flex w-max animate-scroll hover:[animation-play-state:paused] custom-speed">
          
          <div 
            v-for="book in recommendedBooks" 
            :key="'orig-'+book.id"
            class="w-[350px] flex-shrink-0 mx-8 transform transition-transform duration-500 hover:-translate-y-4"
          >
            <BookCard 
              :title="book.titolo"       
              :author="book.autore"
              :quote="book.citazione || 'Nessuna citazione disponibile'"
              :description="book.descrizione || 'Descrizione non disponibile'"
              :coverImage="book.cover_image || 'https://via.placeholder.com/300x450'"
            />
          </div>

          <div 
            v-for="book in recommendedBooks" 
            :key="'dup-'+book.id"
            class="w-[350px] flex-shrink-0 mx-8 transform transition-transform duration-500 hover:-translate-y-4"
          >
            <BookCard 
              :title="book.titolo"       
              :author="book.autore"
              :quote="book.citazione || 'Nessuna citazione disponibile'"
              :description="book.descrizione || 'Descrizione non disponibile'"
              :coverImage="book.cover_image || 'https://via.placeholder.com/300x450'"
            />
          </div>

        </div>
      </div>
      
      <div v-if="!loading && recommendedBooks.length === 0" class="text-center mt-20">
        <p class="text-gray-500 font-body text-xl">Nessun libro trovato per l'emozione "{{ currentMood }}".</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-speed {
  animation-duration: 65s !important;
}
</style>
