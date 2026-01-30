# Mood Read

## Introduzione
Mood Read è un'applicazione web client-server progettata per esplorare il concetto di **biblioterapia digitale**. A differenza dei tradizionali cataloghi online che categorizzano i volumi per genere letterario, Mood Read pone al centro l'esperienza emotiva dell'utente.

Lo scopo principale del progetto è fornire uno strumento empatico in grado di suggerire un "Antidoto Letterario": una selezione di libri curati per rispecchiare, elaborare o migliorare una specifica condizione emotiva. L'architettura prevede una netta separazione tra Backend (API REST) e Frontend (SPA), garantendo modularità e accessibilità.

## Features per utenti
* **Home Page (Input Emotivo):** Il cuore dell'applicazione. L'utente compila tabelle interattive per selezionare le emozioni predominanti e descriverne la causa, avviando l'algoritmo di filtraggio.
* **Antidoto Letterario:** Pagina dinamica che mostra i risultati. Ogni libro suggerito include copertina, citazione significativa e una **motivazione terapeutica** personalizzata.
* **Forum e Community:** Spazio sociale per leggere recensioni e condividere le proprie esperienze emotive legate alla lettura.
* **I Più Amati:** Una vetrina visibile a tutti con i titoli più popolari.
* **UX Inclusiva:** Navigazione gestita tramite navbar "ad hamburger" animata (libro che si apre/chiude) e interfaccia ad alto contrasto verificata per l'accessibilità (WebAim Contrast Checker e simulazione daltonismo con Color Oracle).

## Features per amministratori
* **Dashboard Admin:** Accesso protetto all'area riservata.
* **Gestione Libri (CRUD):** Possibilità di aggiungere, modificare o eliminare libri dal database. Funzionalità chiave: associazione dei **tag emotivi (Mood)** ai libri, essenziali per l'algoritmo.
* **Gestione Utenti:** Visualizzazione e gestione degli iscritti alla piattaforma.

## Tecnologie utilizzate
### Frontend (Client)
* **Vue.js 3 (Composition API) & TypeScript:** Framework principale per un codice robusto.
* **Vite:** Build tool per lo sviluppo rapido.
* **Pinia & Vue Router:** Gestione dello stato globale e della navigazione (SPA).
* **Tailwind CSS & Headless UI:** Per il design responsive e utility-first.
* **Axios:** Per le chiamate HTTP verso il server.
* **Librerie UI:** AOS (animazioni allo scroll), SweetAlert2 (popup), Heroicons.

### Backend (Server)
* **Node.js & Express.js:** Architettura REST API.
* **MySQL2:** Database relazionale.
* **Sicurezza:** Bcrypt (hashing password) e CORS (sicurezza chiamate frontend-backend).
* **Dotenv:** Gestione variabili d'ambiente.

### Design & Prototipazione
* **Canva & Pinterest:** Prototipazione layout, palette cromatica e moodboard.
* **WebAim & Color Oracle:** Test di accessibilità e contrasto colori.

## Guida all'installazione
Per eseguire il progetto in locale, segui questi passaggi:
