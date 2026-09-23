## Stima del carico

### Utenti concorrenti

I numeri di partenza sono quelli della scuola (ASS-01, ASS-02); ASS-60 e ASS-61 li trasformano
in richieste. Metodo: **utenti concorrenti = sessioni nell'ora × durata media della sessione /
60 min**. Una sessione da telefono dura ~8 min e fa ~15 chiamate API, una sessione docente ~20
min e ~40 chiamate; uno studente in verifica resta collegato per tutta l'ora.

| Scenario | Da dove viene il numero | Utenti attivi nell'ora | Utenti concorrenti | Richieste/s (media → picco) |
| --- | --- | --- | --- | --- |
| Uso normale (ora senza verifiche, pomeriggio) | ~1.000 sessioni al giorno (600 account × 1,5 + 50 docenti × 2, ASS-60), il 15% nell'ora più carica | ~150 | 135 × 8/60 + 15 × 20/60 ≈ **25** | 0,7 → 2 |
| Picco delle 9:00 (verifiche) | ASS-02: 4 classi × ~22 = 90 studenti in verifica per l'intera ora, più 160 altri utenti fino ai 250 dell'ora di punta | ~250 | 90 + 160 × 8/60 ≈ **115** | 3,8 → **40** |
| Fine quadrimestre (sera) | l'80% delle 600 famiglie consulta i voti fra le 20 e le 23, metà nell'ora più carica | ~240 | 240 × 8/60 ≈ **32** | 1 → 3 |

Il picco delle 9:00, passo per passo:

- **Apertura**: ~5 chiamate per studente (login, profilo, verifiche disponibili, avvio dello
  Svolgimento, testo della Verifica) → 90 × 5 = 450 richieste. Su un minuto sono 7,5 req/s; se
  la classe parte tutta al segnale del docente e le richieste si concentrano in 15 s, 30 req/s.
- **Salvataggio progressivo**: in media uno ogni 30 s per studente (ASS-61) → 90 / 30 = 3 req/s
  per tutta l'ora. Quando il Wi-Fi del laboratorio torna dopo una caduta, le postazioni
  reinviano insieme: ~90 richieste in 2-3 s, cioè 30-45 req/s.
- **Consegna**: 2 chiamate (consegna e ricevuta) × 90 nello stesso minuto (NFR-11) = 3 req/s,
  18 req/s se concentrate in 10 s.
- **Ora intera**: 90 × (5 + 120 + 2) + 160 × 15 ≈ 13.800 richieste, 3,8 req/s in media.

Il **picco di progetto** è quindi di ~40 req/s per pochi secondi; il carico doppio di NFR-09 lo
porta a ~80 req/s. A fine quadrimestre i docenti pubblicano in blocco nel pomeriggio (50
docenti × ~5 coppie classe-materia ≈ 250 pubblicazioni, una transazione su ~22 voti ciascuna,
distribuite su una settimana) e la sera le famiglie fanno letture leggere: è un picco inferiore a
quello delle 9:00. **Lo scenario che dimensiona il sistema è il picco delle verifiche.**

Volume giornaliero e mensile, base dei costi (stima prudente: le sessioni degli studenti in
verifica sono contate anche fra le sessioni da telefono):

| Voce | Giorno tipico | Giorno di picco |
| --- | --- | --- |
| Studenti e famiglie: 900 sessioni × 15 chiamate | 13.500 | 13.500 |
| Docenti: 50 × 2 sessioni × 40 chiamate | 4.000 | 4.000 |
| Direttore | ~150 | ~150 (a settembre ~1.000) |
| Studenti in verifica × 127 chiamate | 4 classi: 88 × 127 ≈ 11.200 | 8 classi in due turni: 176 × 127 ≈ 22.400 |
| **Richieste API al Worker** | **~29.000** | **~40.000** |
| Istruzioni SQL via Hyperdrive (× 4, ASS-62) | ~116.000 | ~160.000 |

In un mese: 21 giorni di scuola × 29.000 + fine settimana (~5.000 al giorno) ≈ **650.000
richieste**, fino a **~800.000** nei mesi con verifiche di fine periodo (circa 10 giorni di picco).

### Profilo di carico

| Operazione | Frequente | Pesante | Critica | Note |
| --- | --- | --- | --- | --- |
| Login | Sì: ~1.000 al giorno; 90 in 1-2 minuti alle 9:00 | No per il Worker: la password la verifica Supabase Auth | Sì | Tutti i login arrivano a Supabase Auth dal Worker, cioè da pochi indirizzi IP: il limite predefinito (VIN-60) va alzato (ASS-64) |
| Apertura verifica | 4-8 classi al giorno | Media: 5 chiamate, testo della verifica di 15-30 KB | **Sì**, NFR-01 | Il codice della SPA è già in cache sui PC del laboratorio (ASS-66): nel minuto critico viaggiano solo i dati |
| Salvataggio progressivo delle risposte | Molto: ~120 per studente all'ora, 3 req/s nel picco | Leggera: aggiornamento di una riga | Sì, NFR-04 (nessuna risposta persa) e NFR-11 | Raffica di 30-45 req/s alla riconnessione del Wi-Fi |
| Consegna verifica | 90 nello stesso minuto | Media: transazione con correzione automatica di scelta multipla e vero/falso | Sì, NFR-11 | La consegna automatica a tempo scaduto (FR-VER-02) esegue la stessa transazione |
| Dashboard Direttore | Poco: 1-3 utenti, qualche volta al giorno | **Sì**: medie e distribuzioni su ~58.000 voti l'anno (ASS-21) | No | Aggregazioni nel DB su letture predisposte (vedi «Normalizzazione e letture aggregate»), mai nel Worker (VIN-30); NFR-10 |
| Caricamento materiale | ~10 al giorno (~2.000 file l'anno, ASS-10) | Pesante in banda (fino a 20 MB), leggera per il Worker | No | Il file va dal browser a R2 con URL firmato; il Worker firma e registra i metadati |
| Consultazione voti la sera (fine quadrimestre) | ~240 sessioni nell'ora più carica | Leggera: lettura indicizzata per studente | No | Da telefono, NFR-10 |
| Invio credenziali iniziali | Una tantum: ~650 a settembre | Leggera | Sì per l'avvio dell'anno (FR-EXT-01) | Coda con tetto di 300 al giorno (ASS-30); la creazione a mano (~22 ore, ASS-11) produce comunque meno di 300 account al giorno |

**Nella giornata.** 7:30-8:00 orario e compiti da telefono; 8:00-14:00 verifiche a inizio ora,
con il massimo alle 9:00 e un secondo turno alle 11:00, più una punta breve da telefono
all'intervallo; 14:00-18:00 i docenti correggono e pubblicano; 20:00-23:00 le famiglie, con il
massimo a fine quadrimestre. Notte e fine settimana sono quasi vuoti: è la finestra dei rilasci.

**Nell'anno.**

| Periodo | Cosa succede | Effetto sul carico |
| --- | --- | --- |
| Settembre | ~650 account, classi e orari creati a mano; ~650 email; primi accessi con cambio password | Scritture amministrative ed email al tetto giornaliero; poche richieste API |
| Ottobre-dicembre, febbraio-aprile | Verifiche regolari | Giorno tipico |
| Metà gennaio, maggio | Verifiche e recuperi prima degli scrutini, fino a 8 classi al giorno | Giorno di picco (~40.000 richieste) |
| Fine gennaio, inizio giugno | Scrutini, pubblicazione in blocco, consultazione serale | Picco serale di letture |
| Natale, Pasqua, luglio-agosto | Quasi nessun accesso | Oltre 7 giorni di inattività un progetto Supabase Free va in pausa (VIN-33) |

> Dipendenza: security-privacy (R-21)

---
