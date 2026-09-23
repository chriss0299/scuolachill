## Qualità architetturale

### Organizzazione del codice

Un solo repository con workspace npm: `frontend/` (SPA), `worker/` (API), `shared/` (schemi Zod e
DTO comuni), `supabase/` (migration e dati di prova). Il Worker è diviso **prima per livello, poi
per risorsa** (`api/`, `applicazione/`, `dominio/`, `infrastruttura/`), così il livello si legge
dal percorso e la regola sugli import si applica per cartella. Il frontend è diviso per area e
funzionalità, perché lì il confine che conta è il ruolo.

Pattern principali: **Repository** (il SQL sta in un solo posto), **Service layer** (regole
indipendenti da HTTP), **Adapter** per R2, Auth ed email (fornitore sostituibile), **Unit of
Work** (pubblicazione e consegna tutto o niente), **Strategy** per la correzione per tipo di
domanda.

### Dependency inversion e IoC

I service dipendono da interfacce definite nel livello Application; le classi concrete le sceglie
un'unica **composition root**, che costruisce il grafo degli oggetti.

- **Iniezione nel costruttore, senza container.** InversifyJS o tsyringe richiedono decoratori e
  metadati di riflessione; con una ventina di service il cablaggio a mano resta leggibile e
  controllato dal compilatore.
- **Una composizione per richiesta.** Nel Worker segreti e binding arrivano con ogni richiesta e
  una connessione al DB non si riusa fra richieste: un middleware costruisce i service e li mette
  nel contesto.

### Testabilità

| Dipendenza | Produzione | Test unitari | Test di integrazione |
| --- | --- | --- | --- |
| Database | Postgres via Hyperdrive | Repository in memoria | Postgres locale della Supabase CLI |
| Autenticazione | Supabase Auth | Finta, utenti per ruolo | Supabase Auth locale |
| File | R2 | Finto, URL prevedibili | R2 simulato nel runtime Workers |
| Email | Brevo | Registra i messaggi; variante che fallisce sempre | Registra, nessun invio |
| Tempo | Orologio di sistema | Orologio fisso | Orologio fisso |

Gli unitari coprono le regole (voto fuori scala respinto, pubblicazione con un voto altrui che non
pubblica nulla, email fallita con account comunque creato); l'integrazione verifica query,
transazioni e policy RLS; la collezione Postman gira in CI; pochi end-to-end coprono login,
verifica e voti. Un test rosso blocca il deploy.

### Development e Production

Due ambienti (ASS-34), stesso codice: cambiano configurazione e binding.

| Aspetto | Development | Production |
| --- | --- | --- |
| Frontend e Worker | Vite e `wrangler dev` in locale | Pages su `app.<dominio>`, Worker su `api.<dominio>` (ASS-31), solo HTTPS |
| Database e Auth | Supabase CLI in locale (Docker) | Progetto Supabase `eu-central-1` via Hyperdrive |
| File | R2 simulato | Bucket R2 privato, giurisdizione `eu` |
| Email | Nessun invio, messaggio nel log | Brevo, mittente sul dominio verificato (DIP-32) |
| Segreti | `.dev.vars` e `.env.local`, mai committati | Segreti del Worker e variabili di Pages («Configurazione e segreti») |
| Log | `debug`, con stack | `info`, JSON con ID richiesta; **nessun dato personale** |
| Errori | Dettaglio tecnico | Messaggio generico + ID richiesta |
| CORS | `localhost` | Solo `app.<dominio>` |
| Dati | Scuola sintetica di prova | Dati reali, **mai copiati** in Development |

#### Migration del database

Ogni modifica allo schema (tabelle, indici, policy RLS) è un file SQL versionato in
`supabase/migrations/`, mai una modifica a mano dalla console. Le migration vanno **solo in
avanti** e sono **compatibili all'indietro**: in produzione la pipeline le applica **prima** del
deploy del Worker, così la versione precedente funziona anche con lo schema nuovo (passi in
«Piano di deployment»).

---
