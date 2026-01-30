<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const form = ref({
  nome: '',
  cognome: '',
  birthdate: '',
  email: '',    
  username: '',
  password: ''
});

const notification = ref({ show: false, message: '', type: 'success' });

const showNotification = (msg: string, type: string) => {
  notification.value = { show: true, message: msg, type: type };
  setTimeout(() => { notification.value.show = false }, 3000);
};

const handleRegister = async () => {
  if (!form.value.username || !form.value.password || !form.value.nome) {
    showNotification('Compila i campi obbligatori (Nome, User, Pass)', 'error');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    });

    const data = await response.json();

    if (response.ok) {
      showNotification('Registrazione riuscita! Reindirizzamento...', 'success');
      setTimeout(() => { router.push('/login'); }, 2000);
    } else {
      showNotification(data.message || 'Errore durante la registrazione', 'error');
    }

  } catch (error) {
    showNotification('Errore di connessione al server', 'error');
  }
};
</script>

<template>
  <div class="min-h-screen bg-white flex flex-col items-center justify-center py-10 px-4 relative">
    
    <transition name="fade">
      <div v-if="notification.show" 
           class="fixed top-6 right-6 z-50 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 border-l-4 bg-white"
           :class="notification.type === 'success' ? 'border-green-500 text-green-700' : 'border-red-500 text-red-700'">
        <span class="text-2xl">{{ notification.type === 'success' ? '✅' : '⚠️' }}</span>
        <div>
          <h4 class="font-bold font-display text-lg">{{ notification.type === 'success' ? 'Ottimo!' : 'Errore' }}</h4>
          <p class="text-sm font-body">{{ notification.message }}</p>
        </div>
      </div>
    </transition>

    <h1 class="text-mood-dark font-display text-5xl mb-6">Registrati</h1>

    <div class="bg-mood-dark w-full max-w-md p-8 rounded-[3rem] relative shadow-2xl">
      
      <div class="absolute -top-2 right-12 w-10 h-14 bg-white shadow-md z-10 flex items-end justify-center">
          <div class="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[15px] border-b-mood-dark absolute bottom-0"></div>
      </div>

      <form class="flex flex-col gap-4 mt-4">
        
        <div class="flex flex-col md:flex-row gap-4">
            <div class="bg-white/20 rounded-2xl p-3 flex flex-col flex-1">
                <label class="text-white font-display text-xl ml-1">Nome</label>
                <input v-model="form.nome" type="text" class="bg-transparent border-none outline-none text-white font-body px-1 text-lg w-full" />
            </div>
            <div class="bg-white/20 rounded-2xl p-3 flex flex-col flex-1">
                <label class="text-white font-display text-xl ml-1">Cognome</label>
                <input v-model="form.cognome" type="text" class="bg-transparent border-none outline-none text-white font-body px-1 text-lg w-full" />
            </div>
        </div>

        <div class="bg-white/20 rounded-2xl p-3 flex flex-col">
          <label class="text-white font-display text-xl ml-1">Data di Nascita</label>
          <input v-model="form.birthdate" type="date" class="bg-transparent border-none outline-none text-white font-body px-1 text-lg w-full placeholder-white" />
        </div>

        <div class="bg-white/20 rounded-2xl p-3 flex flex-col">
          <label class="text-white font-display text-xl ml-1">Email <span class="text-sm text-white/70">(facoltativa)</span></label>
          <input v-model="form.email" type="email" class="bg-transparent border-none outline-none text-white font-body px-1 text-lg w-full" placeholder="esempio@mail.com" />
        </div>

        <div class="bg-white/20 rounded-2xl p-3 flex flex-col">
          <label class="text-white font-display text-xl ml-1">Username</label>
          <input v-model="form.username" type="text" class="bg-transparent border-none outline-none text-white font-body px-1 text-lg w-full" />
        </div>

        <div class="bg-white/20 rounded-2xl p-3 flex flex-col">
          <label class="text-white font-display text-xl ml-1">Password</label>
          <input v-model="form.password" type="password" class="bg-transparent border-none outline-none text-white font-body px-1 text-lg w-full" />
        </div>

        <div class="flex justify-center mt-6">
          <button type="button" @click="handleRegister" class="bg-white text-mood-dark font-display text-2xl uppercase px-12 py-2 rounded-full shadow hover:scale-105 transition">
            crea account
          </button>
        </div>

        <div class="mt-4 text-center">
            <p class="text-white font-display text-xl">
                Hai già un account? 
                <router-link to="/login" class="underline hover:text-white/80 ml-1">ACCEDI</router-link>
            </p>
        </div>

      </form>
    </div>
  </div>
</template>

<style scoped>
input[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(1);
    cursor: pointer;
}
::placeholder { 
  color: rgba(255, 255, 255, 0.5);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
