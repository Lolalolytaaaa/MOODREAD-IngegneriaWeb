<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const username = ref('');
const password = ref('');

// Gestione Notifiche
const notification = ref({ show: false, message: '', type: 'success' });

const showNotification = (msg: string, type: string) => {
  notification.value = { show: true, message: msg, type: type };
  setTimeout(() => { notification.value.show = false }, 3000);
};

// --- QUESTA È LA FUNZIONE CHE ORA CHIAMA DAVVERO IL SERVER ---
const handleLogin = async () => {
  // 1. Controlli base (client-side)
  if (!username.value || !password.value) {
    showNotification('Inserisci username e password', 'error');
    return;
  }

  try {
    // 2. Chiamata al Server (Backend)
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        username: username.value, 
        password: password.value 
      })
    });

    const data = await response.json();

    if (response.ok) {
      // 3. FONDAMENTALE: Salviamo l'utente nel LocalStorage del browser!
      // Senza questa riga, le altre pagine non sapranno mai che sei loggato.
      localStorage.setItem('user', JSON.stringify(data.user)); 
      
      showNotification('Bentornato! Accesso effettuato.', 'success');

      // 4. Reindirizzamento al Forum dopo 1.5 secondi
      setTimeout(() => {
        router.push('/forum'); 
      }, 1500);
    } else {
      showNotification(data.message || 'Credenziali errate', 'error');
    }

  } catch (error) {
    console.error(error);
    showNotification('Errore di connessione al server', 'error');
  }
};
</script>

<template>
  <div class="min-h-screen bg-white flex flex-col items-center justify-center relative">
    
    <transition name="fade">
      <div v-if="notification.show" 
           class="fixed top-6 right-6 z-50 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 border-l-4 bg-white"
           :class="notification.type === 'success' ? 'border-green-500 text-green-700' : 'border-red-500 text-red-700'">
        <span class="text-2xl">{{ notification.type === 'success' ? '✅' : '⚠️' }}</span>
        <div>
          <h4 class="font-bold font-display text-lg">{{ notification.type === 'success' ? 'Successo' : 'Attenzione' }}</h4>
          <p class="text-sm font-body">{{ notification.message }}</p>
        </div>
      </div>
    </transition>

    <h1 class="text-mood-dark font-display text-5xl mb-6">Login</h1>

    <div class="bg-mood-dark w-full max-w-md p-8 rounded-[3rem] relative shadow-2xl">
      
      <div class="absolute -top-2 right-12 w-10 h-14 bg-white shadow-md z-10 flex items-end justify-center">
          <div class="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[15px] border-b-mood-dark absolute bottom-0"></div>
      </div>

      <form @submit.prevent="handleLogin" class="flex flex-col gap-6 mt-4">
        <div class="bg-white/20 rounded-2xl p-4 flex flex-col">
          <label class="text-white font-display text-2xl ml-1">Username</label>
          <input v-model="username" type="text" class="bg-transparent border-none outline-none text-white font-body px-1 text-lg w-full" />
        </div>

        <div class="bg-white/20 rounded-2xl p-4 flex flex-col">
          <label class="text-white font-display text-2xl ml-1">Password</label>
          <input v-model="password" type="password" class="bg-transparent border-none outline-none text-white font-body px-1 text-lg w-full" />
        </div>

        <div class="flex justify-center mt-4">
          <button type="submit" class="bg-white text-mood-dark font-display text-2xl uppercase px-12 py-2 rounded-full shadow hover:scale-105 transition">
            Login
          </button>
        </div>

        <div class="mt-2 text-center">
            <p class="text-white font-display text-xl">
                Non hai un account? 
                <router-link to="/register" class="underline hover:text-white/80 ml-1">
                 REGISTRATI
                </router-link>
            </p>
        </div>

      </form>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>