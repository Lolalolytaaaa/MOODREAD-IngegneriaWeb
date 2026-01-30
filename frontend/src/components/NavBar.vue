<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isOpen = ref(false);
const currentUser = ref<any>(null); // Variabile per salvare i dati dell'utente

// Funzione per chiudere il menu
const closeMenu = () => {
  isOpen.value = false;
};

// Funzione per aprire/chiudere il menu
const toggleMenu = () => {
  isOpen.value = !isOpen.value;
  
  // TRUCCO: Ogni volta che apri il menu, controlliamo se l'utente è loggato!
  // Così la navbar è sempre aggiornata anche se hai fatto login da poco.
  if (isOpen.value) {
    checkUserStatus();
  }
};

// Funzione che controlla la memoria del browser
const checkUserStatus = () => {
  const userStored = localStorage.getItem('user');
  if (userStored) {
    try {
      currentUser.value = JSON.parse(userStored);
    } catch (e) {
      currentUser.value = null;
    }
  } else {
    currentUser.value = null;
  }
};

// Funzione LOGOUT
const handleLogout = () => {
  // 1. Cancelliamo la memoria
  localStorage.removeItem('user');
  // 2. Aggiorniamo la variabile locale
  currentUser.value = null;
  // 3. Chiudiamo il menu
  closeMenu();
  // 4. Portiamo l'utente alla home (o al login)
  router.push('/login');
};

// Controlliamo anche appena il sito si carica
onMounted(() => {
  checkUserStatus();
});
</script>

<template>
  <nav class="flex justify-between items-center px-6 py-4 bg-white relative z-50 shadow-sm">
    <div class="text-4xl font-display text-mood-dark tracking-wide z-50">
      <router-link to="/" @click="closeMenu">MoodRead</router-link>
    </div>

    <button @click="toggleMenu" class="focus:outline-none z-50 relative group p-2 transition-transform duration-300 hover:scale-105">
      
      <div v-if="!isOpen" class="text-mood-dark">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
        </svg>
      </div>
      
      <div v-else class="text-mood-dark">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
      </div>

    </button>

    <div 
      class="fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-2xl transform transition-transform duration-500 ease-in-out pt-32 pl-12 z-40 border-l-4 border-mood-dark"
      :class="isOpen ? 'translate-x-0' : 'translate-x-full'"
    >
      <ul class="flex flex-col gap-8 font-display text-4xl text-mood-dark">
        
        <li class="hover:text-mood-light hover:translate-x-2 transition-all cursor-pointer">
          <router-link to="/" @click="closeMenu">Home Biblioterapia</router-link>
        </li>

        <li class="hover:text-mood-light hover:translate-x-2 transition-all cursor-pointer">
          <router-link to="/loved" @click="closeMenu">I Più Amati</router-link>
        </li>
        
        <li class="hover:text-mood-light hover:translate-x-2 transition-all cursor-pointer">
          <router-link to="/forum" @click="closeMenu">Forum Recensioni</router-link>
        </li>

        <hr class="border-mood-dark/20 w-3/4">

        <li v-if="!currentUser" class="hover:text-mood-light hover:translate-x-2 transition-all cursor-pointer">
          <router-link to="/login" @click="closeMenu">Login / Registrati</router-link>
        </li>

        <li v-else class="flex flex-col gap-2">
            <span class="text-xl text-gray-500 font-body">Ciao, {{ currentUser.username }}</span>
            <button @click="handleLogout" class="text-left hover:text-red-500 hover:translate-x-2 transition-all cursor-pointer">
              Logout 🚪
            </button>
        </li>

      </ul>
      
      <div class="absolute bottom-10 left-8 right-8">
        <div class="bg-mood-dark/10 inline-block px-6 py-3 rounded-2xl pointer-events-none backdrop-blur-sm">
            <p class="text-xl font-display text-mood-dark tracking-wide">
                di Scotti Laura e Diarciuc Ana Maria
            </p>
        </div>
      </div>

    </div>
  </nav>
</template>