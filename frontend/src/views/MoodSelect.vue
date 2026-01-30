<script setup lang="ts">
import { ref, watch } from 'vue';

const moods = [
  { 
    name: 'felice', 
    path: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' 
  },
  { 
    name: 'triste', 
    path: 'M9 10h.01M15 10h.01M9.5 16a3.5 3.5 0 015 0M21 12a9 9 0 11-18 0 9 9 0 0118 0z' 
  },
  { 
    name: 'arrabbiato', 
    path: 'M21 12a9 9 0 11-18 0 9 9 0 0118 0z M15 9l-2 2 M9 9l2 2 M9 15a4 4 0 016 0' 
  },
  { 
    name: 'divertito', 
    path: 'M21 12a9 9 0 11-18 0 9 9 0 0118 0z M8 9l2 2m0-2l-2 2 M14 9l2 2m0-2l-2 2 M9 15a4 4 0 006 0' 
  },
  { 
    name: 'annoiato', 
    path: 'M9 10h.01M15 10h.01M8 15h8M21 12a9 9 0 11-18 0 9 9 0 0118 0z' 
  },
  { 
    name: 'ansioso', 
    path: 'M9 10h.01M15 10h.01M9 15c.5 1 1.5 1 2 0s1.5-1 2 0 1.5 1 2 0M21 12a9 9 0 11-18 0 9 9 0 0118 0z' 
  },
  { 
    name: 'innamorato', 
    path: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' 
  },
  { 
    name: 'carico', 
    path: 'M13 10V3L4 14h7v7l9-11h-7z' 
  },
];

const causes = [
  { name: 'lavoro', path: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { name: 'studio', path: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z' },
  { name: 'famiglia', path: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
  { name: 'amore', path: 'M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z' },
  { name: 'sport', path: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { 
    name: 'salute', 
    path: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z M6.5 12h2l2-3 2 6 2-3h2.5' 
  },
  { name: 'malumore', path: 'M19 11a7.002 7.002 0 00-13.846-1.157A4.965 4.965 0 007.03 20H19a5 5 0 00.027-9.998z' },
];

const selectedMood = ref('');
const selectedCause = ref('');
const customCause = ref('');
const isInputFocused = ref(false);

watch(customCause, (newVal) => {
  if (newVal.length > 0) {
    selectedCause.value = '';
  }
});

const selectCauseIcon = (name: string) => {
  selectedCause.value = name;
  customCause.value = '';
  isInputFocused.value = false;
};
</script>

<template>
  <div class="pt-6 pb-10 px-4 min-h-screen bg-white">
    
    <div class="bg-mood-dark rounded-[3rem] p-8 shadow-xl relative mb-12">
        <div 
          class="absolute -top-2 right-12 w-8 h-14 bg-white drop-shadow-md z-10"
          style="clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 70%, 0 100%);"
        ></div>

        <div class="mb-6 border-b border-white/20 pb-2">
             <h2 class="text-white font-body text-2xl ml-2">Come mi sento oggi?</h2>
        </div>

        <div class="flex flex-wrap justify-center gap-6 md:gap-10 py-4">
            <button 
                v-for="mood in moods" 
                :key="mood.name"
                @click="selectedMood = mood.name"
                class="flex flex-col items-center group transition-all duration-300"
                :class="selectedMood === mood.name ? 'scale-110' : 'hover:scale-105 opacity-80 hover:opacity-100'"
            >
                <div 
                    class="w-16 h-16 rounded-full border-2 flex items-center justify-center mb-2 transition-all duration-300"
                    :class="selectedMood === mood.name ? 'bg-white border-white text-mood-dark' : 'border-white text-white bg-transparent'"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                        <path stroke-linecap="round" stroke-linejoin="round" :d="mood.path" />
                    </svg>
                </div>
                <div class="bg-white rounded-full px-4 py-0.5 text-lg font-body text-mood-dark tracking-wide">
                    {{ mood.name }}
                </div>
            </button>
        </div>
    </div>

    <div class="bg-mood-dark rounded-[3rem] p-8 shadow-xl relative mb-8">
        <div 
          class="absolute -top-2 right-12 w-8 h-14 bg-white drop-shadow-md z-10"
          style="clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 70%, 0 100%);"
        ></div>

        <div class="mb-6 border-b border-white/20 pb-2">
            <h2 class="text-white font-body text-2xl ml-2">Cosa mi ha fatto sentire così?</h2>
        </div>

        <div class="flex flex-wrap justify-center gap-6 md:gap-10 py-4">
            <button 
                v-for="cause in causes" 
                :key="cause.name"
                @click="selectCauseIcon(cause.name)"
                class="flex flex-col items-center group transition-all duration-300"
                :class="selectedCause === cause.name ? 'opacity-100 scale-105' : 'opacity-60 hover:opacity-100'"
            >
                <div class="text-white mb-2 transform transition-transform group-hover:scale-110">
                     <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                        <path stroke-linecap="round" stroke-linejoin="round" :d="cause.path" />
                    </svg>
                </div>
                <div class="bg-white rounded-full px-4 py-0.5 text-lg font-body text-mood-dark min-w-[90px] text-center">
                    {{ cause.name }}
                </div>
            </button>
        </div>
        
        <div class="mt-8 bg-white/10 border border-white/30 rounded-full flex items-center px-6 py-3 max-w-xl mx-auto backdrop-blur-sm relative z-20 cursor-text group focus-within:bg-white/20 transition-colors">
            <span 
                v-show="!isInputFocused && customCause === ''" 
                class="text-white font-display text-2xl pt-1 absolute left-6 pointer-events-none"
            >
                altro...
            </span>

            <input 
              v-model="customCause"
              @focus="isInputFocused = true"
              @blur="isInputFocused = false"
              type="text" 
              class="bg-transparent border-none outline-none text-white w-full focus:ring-0 font-body text-xl h-full pl-1 z-10"
            >
            <span class="text-white text-xl ml-2">✏️</span>
        </div>
    </div>

    <div class="flex justify-center mt-12 mb-10">
      <router-link 
        :to="{ path: '/results', query: { mood: selectedMood } }"
        :class="[
          'bg-mood-dark text-white font-display text-2xl uppercase px-16 py-4 rounded-full shadow-2xl transition-all duration-300',
          selectedMood ? 'hover:scale-105 hover:bg-mood-dark/90' : 'opacity-50 cursor-not-allowed pointer-events-none'
        ]"
      >
        leggi il tuo mood
      </router-link>
    </div>

  </div>
</template>