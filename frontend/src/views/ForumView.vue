<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Variabile fondamentale: Sei loggato?
const isLoggedIn = ref(false);

// Variabili per il forum
const newReview = ref({ bookTitle: '', text: '', mood: 'Felice' });
const reviews = ref([]); 
const moods = ['Tutti', 'Felice', 'Carico', 'Triste', 'Arrabbiato', 'Divertito', 'Annoiato', 'Ansioso', 'Innamorato'];
const selectedMood = ref('Tutti');
const showWriteInput = ref(false);

// Funzione per andare al login
const goToLogin = () => {
  router.push('/login');
};

// --- CONTROLLO LOGIN E CARICAMENTO ---
onMounted(() => {
  // 1. Cerchiamo l'utente salvato dal LoginView
  const userStored = localStorage.getItem('user');
  
  if (userStored) {
    // Se c'è, sblocchiamo tutto!
    isLoggedIn.value = true;
    fetchReviews(); // Scarichiamo le recensioni
  } else {
    // Se non c'è, blocchiamo tutto
    isLoggedIn.value = false;
    // (Opzionale) Scarichiamo comunque le recensioni per farle vedere sfocate sullo sfondo
    fetchReviews(); 
  }
});

// --- API FETCH RECENSIONI ---
const fetchReviews = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/reviews');
    const data = await response.json();
    reviews.value = data.map((r: any) => ({
      id: r.id,
      bookTitle: r.book_title,
      user: r.username,
      text: r.comment,
      mood: r.mood
    }));
  } catch (error) {
    console.error("Errore caricamento recensioni:", error);
  }
};

// --- API INVIA RECENSIONE ---
const submitReview = async () => {
  let currentUser = "Anonimo";
  const storedUser = localStorage.getItem('user');
  
  if (storedUser) {
    const parsed = JSON.parse(storedUser);
    currentUser = parsed.username;
  }

  if (!newReview.value.bookTitle || !newReview.value.text) {
    alert("Scrivi almeno il titolo e il commento!");
    return;
  }

  try {
    const res = await fetch('http://localhost:3000/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: currentUser,
        bookTitle: newReview.value.bookTitle,
        mood: newReview.value.mood,
        text: newReview.value.text
      })
    });

    if (res.ok) {
      alert("Recensione pubblicata! 🎉");
      newReview.value.bookTitle = '';
      newReview.value.text = '';
      showWriteInput.value = false;
      fetchReviews();
    } else {
      alert("Errore nel salvataggio");
    }
  } catch (e) {
    console.error(e);
  }
};

const filteredReviews = computed(() => {
  if (selectedMood.value === 'Tutti') return reviews.value;
  return reviews.value.filter((r: any) => r.mood === selectedMood.value);
});
</script>

<template>
  <div class="pt-24 min-h-screen bg-white px-4 pb-20 relative">
    
    <div v-if="!isLoggedIn" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div class="bg-white p-10 rounded-[2rem] shadow-2xl text-center max-w-md mx-4 animate-fade-in border-4 border-mood-dark">
            <div class="text-6xl mb-4">🔒</div>
            <h2 class="font-display text-4xl text-mood-dark mb-4">Area Riservata</h2>
            <p class="font-body text-gray-600 text-lg mb-8">
                Per leggere e scrivere nel Forum devi essere un utente registrato.
            </p>
            <div class="flex flex-col gap-3">
                <button @click="goToLogin" class="bg-mood-dark text-white font-display text-2xl px-8 py-3 rounded-full hover:scale-105 transition shadow-lg">
                    Accedi ora
                </button>
                <button @click="router.push('/')" class="text-gray-500 font-body hover:underline mt-2">
                    Torna alla Home
                </button>
            </div>
        </div>
    </div>

    <div :class="{ 'blur-md pointer-events-none select-none': !isLoggedIn }">
      
        <div class="text-center mb-16">
           <h1 class="font-display text-5xl text-mood-dark">Forum recensioni</h1>
        </div>

        <div class="max-w-5xl mx-auto mb-10">
          <div class="border-2 border-mood-dark rounded-full p-2 flex items-center justify-between shadow-sm bg-white">
            
            <div class="flex gap-2 overflow-x-auto scrollbar-hide px-2 items-center flex-1">
              <button 
                v-for="mood in moods" 
                :key="mood"
                @click="selectedMood = mood"
                class="whitespace-nowrap px-4 py-1 rounded-full font-display text-xl transition-colors"
                :class="selectedMood === mood ? 'bg-mood-dark text-white' : 'text-mood-dark hover:bg-mood-light/20'"
              >
                {{ mood }}
              </button>
            </div>

            <button @click="showWriteInput = !showWriteInput" class="bg-mood-light/20 text-mood-dark px-6 py-1 rounded-full font-display text-2xl flex items-center gap-2 hover:bg-mood-dark hover:text-white transition-colors border-l-2 border-mood-dark ml-2">
              Scrivi ✏️
            </button>
          </div>

          <div v-if="showWriteInput" class="mt-4 bg-white border-2 border-mood-dark rounded-xl p-4 shadow-lg animate-fade-in relative z-10">
              <div class="mb-2 flex gap-4">
                  <input v-model="newReview.bookTitle" type="text" placeholder="Titolo del libro..." class="w-full font-display text-2xl border-b border-gray-300 outline-none focus:border-mood-dark text-mood-dark placeholder-mood-dark/50">
                  <select v-model="newReview.mood" class="font-display text-xl text-mood-dark border-b border-gray-300 outline-none bg-white">
                    <option v-for="m in moods.filter(x => x !== 'Tutti')" :key="m" :value="m">{{ m }}</option>
                  </select>
              </div>
              <textarea v-model="newReview.text" placeholder="Scrivi la tua recensione qui..." class="w-full font-body p-2 outline-none text-gray-700 h-24 resize-none"></textarea>
              <div class="flex justify-end">
                  <button @click="submitReview" class="bg-mood-dark text-white font-display text-xl px-6 py-1 rounded-full hover:scale-105 transition">Invia</button>
              </div>
          </div>
        </div>

        <div class="max-w-4xl mx-auto flex flex-col gap-8">
          <div v-for="review in filteredReviews" :key="review.id" class="relative group">
            <div class="bg-mood-dark rounded-[2.5rem] p-6 pt-12 pb-8 shadow-xl relative mt-6">
              <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4 px-2">
                 <div class="bg-white/20 px-4 py-1 rounded-full">
                     <span class="text-white font-display text-xl">su "{{ review.bookTitle }}"</span>
                 </div>
                 <div class="flex items-center gap-2">
                    <span class="text-white/80 font-display text-sm uppercase mr-2">{{ review.mood }}</span>
                    <div class="bg-white/20 px-4 py-1 rounded-full self-end md:self-auto">
                        <span class="text-white font-display text-xl">@{{ review.user }}</span>
                    </div>
                 </div>
              </div>
              <div class="bg-white rounded-2xl p-6 min-h-[100px] flex items-center shadow-inner">
                <p class="font-display text-2xl text-mood-dark leading-relaxed w-full text-left">
                  {{ review.text }}
                </p>
              </div>
            </div>
          </div>
          <div v-if="filteredReviews.length === 0" class="text-center text-gray-500 font-display text-xl mt-10">
              Nessuna recensione trovata per questo mood. Scrivine una tu!
          </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>