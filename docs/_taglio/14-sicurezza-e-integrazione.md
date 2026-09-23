## Sicurezza e integrazione

### Autenticazione e token

Il browser non parla mai con Supabase (VIN-34): la SPA chiama solo il Worker, unico client di
Supabase Auth, con la chiave segreta `sb_secret_…` che non esce dal Worker. Si accede con un
**identificativo** generato (`nome.cognome`, con un numero se già in uso), perché due fratelli
hanno la stessa email del genitore: in Supabase Auth c'è un indirizzo tecnico, l'email vera
resta nelle nostre tabelle (ASS-50).

**Come si ottiene.** `POST /v1/auth/sessione` con identificativo e password: il Worker fa il
login su Supabase Auth, inoltrando l'IP del client in `Sb-Forwarded-For` (VIN-51), e riceve
access token (JWT) e refresh token. Credenziali errate e identificativo inesistente ricevono lo
stesso 401. Dopo 5 errori in 15 minuti per la coppia identificativo + IP la risposta è **429
`troppi-tentativi`** con `Retry-After`, anche per identificativi inesistenti (ASS-52). Il
Direttore aggiunge un codice TOTP e ottiene un token `aal2` (ASS-55).

**Cosa contiene.** È il JWT di Supabase, firmato con chiave asimmetrica
([Supabase, JWT Signing Keys](https://supabase.com/docs/guides/auth/signing-keys)): `sub` (ID
utente), `app_metadata.ruolo` (lo scrive solo il Worker; `user_metadata` è modificabile
dall'utente e non autorizza mai,
[Supabase, JWT Claims](https://supabase.com/docs/guides/auth/jwt-fields)), `session_id`, `aal`,
`exp`. Classi e anagrafica non ci sono: il service le legge dal DB. Il Worker verifica firma e
scadenza con la chiave pubblica (JWKS) in cache, senza chiamate di rete. Alternativa scartata:
`auth.getUser()` a ogni richiesta, un viaggio in più verso Supabase contro NFR-01.

**Come viaggia.** In due cookie `HttpOnly; Secure; SameSite=Strict` impostati da
`api.<dominio>`: access token (15 minuti) e refresh token, inviato solo a `/v1/auth/sessione`
(30 giorni con «Ricordami», spento di default; altrimenti fino alla chiusura del browser,
ASS-51). Alternativa scartata: `Authorization: Bearer` con il token in `localStorage`, leggibile
da qualsiasi script iniettato (XSS) in un'app piena di testo scritto dagli utenti. Contro il
CSRF: `SameSite=Strict`, controllo di `Origin` e CORS limitato all'origine `app.` (ASS-31).

**Rinnovo, revoca, logout.** Su 401 «token scaduto» la SPA chiama una volta
`POST /v1/auth/sessione/rinnovo`; Supabase ruota il refresh token. Un JWT non si revoca prima
della scadenza (VIN-50), quindi ogni transazione verifica che la sessione esista e l'utente sia
attivo: logout (`DELETE /v1/auth/sessione`, anche «Esci da tutti i dispositivi»), reset e
disattivazione valgono dalla richiesta successiva (ASS-62).

**Primo accesso e reset.** Nessuna password viaggia per email o su carta: l'utente sceglie la
propria con un codice monouso, salvato solo come hash (ASS-53). Vale 72 ore per il primo accesso
(email, o foglio stampato dal Direttore) e 60 minuti per il reset. La richiesta di reset risponde
sempre allo stesso modo (AUT-03 · AC-01).

### Chi può fare cosa

| Operazione | Direttore | Docente | Studente (famiglia) |
| --- | --- | --- | --- |
| Account, classi, materie, Insegnamenti, orario (DIR-01..03, ORA-01) | Gestisce | Legge i propri | Legge la propria classe |
| Rigenera credenziali (FR-EXT-01) | Sì, registrato | — | — |
| Materiale, compiti, verifiche: crea e modifica (DOC-01, DOC-02, COM-01) | — | Propri Insegnamenti | — |
| Materiale e compiti: legge (STU-01) | Sì | Propri Insegnamenti | Propria classe |
| Svolgimento: avvia e consegna (STU-02) | — | — | Solo il proprio, a finestra aperta |
| Voti: inserisce, pubblica, corregge (DOC-03) | — | Propri Insegnamenti | — |
| Voti: legge | Solo pubblicati | Propri, anche in bozza | Propri pubblicati (STU-03) |
| Note: scrive (NOT-01) | — | Studenti delle sue classi | — |
| Note: legge | Sì, lettura registrata | Sue classi, lettura registrata | Solo le proprie |
| Messaggi (MSG-01) | Solo i segnalati (ASS-08) | Studenti delle sue classi | Docenti della propria classe, mai altri studenti |

«—» = vietato (403). Il Direttore vede in sola lettura (DIR-04).

**Dove si applica.** Nel Worker il middleware `autenticazione` verifica il token (401) e
`richiediRuolo(...)` applica la matrice su ogni route (403). Il service controlla l'appartenenza
sul dato vero (Insegnamento in corso, iscrizione attuale, autore) e risponde 404 per le risorse
fuori perimetro, per non rivelarne l'esistenza. La RLS di Postgres ripete le regole come difesa
in profondità; la SPA nasconde menu e pulsanti ma non autorizza. Ogni cella della matrice è un
test automatico (NFR-02).

### Dati di minori

Il titolare è l'istituto, che tratta i dati per un compito di interesse pubblico (art. 6, par.
1, lett. e [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj); art. 2-ter d.lgs. 196/2003):
per la didattica non serve il consenso delle famiglie
([Garante, «La scuola a prova di privacy»](https://www.garanteprivacy.it/home/docweb/-/docweb-display/docweb/10190259)).
ScuolaChill è responsabile del trattamento (art. 28); Supabase, Cloudflare e Brevo sono
sub-responsabili; i dati restano nell'UE (ASS-30). Prima del collaudo l'istituto fa la
valutazione d'impatto (art. 35, DIP-02). Minimizzazione: niente codice fiscale, foto né
indirizzi (ASS-19); note individuali; messaggi solo testo, senza allegati (ASS-16); ogni lettura
di una nota o di un messaggio segnalato è registrata; i log non contengono dati personali. La
conservazione e la cancellazione automatica seguono ASS-54.

**Rischio della credenziale di famiglia.** Chi la conosce può svolgere una verifica al posto
dello studente (FR-AUT-01). Mitigazioni: la verifica si svolge solo a finestra aperta dal
docente, in laboratorio (FR-VER-02, ASS-03); una sola sessione attiva per svolgimento
(FR-VER-03); solo dalla rete della scuola se l'IP è fisso (ASS-56); sessione chiusa alla
consegna. La presa visione di una nota non equivale alla firma del genitore: rischio accettato.

### L'API esterna

Brevo (ASS-30), chiamata solo dal Worker, invia codice di primo accesso, link di reset e avviso
di rigenerazione delle credenziali. Riceve email, nome, identificativo e link; mai voti, note o
password. Resend è scartato perché conserva i dati negli USA
([Resend, GDPR](https://resend.com/security/gdpr)).

**Se Brevo non risponde (FR-EXT-01).** L'account nasce comunque: l'invio entra in coda nella
stessa transazione. Un Cron Trigger ritenta a intervalli crescenti (5 min, 30 min, 2 h, 6 h);
dopo il quinto tentativo lo stato `fallita` compare nella scheda e nella dashboard (DIR-01 ·
AC-13). Oltre 290 invii al giorno la coda attende il giorno dopo. Il Direttore può sempre
rigenerare le credenziali e stampare il foglio con il codice.

### Configurazione e segreti

| Valore | Production | Development |
| --- | --- | --- |
| `SUPABASE_SECRET_KEY` | Secret del Worker | `.dev.vars`, istanza locale |
| Password del DB | Configurazione di Hyperdrive | `.dev.vars` |
| Chiavi R2 (solo il bucket), `BREVO_API_KEY` | Secret del Worker | Valori finti; email non inviate |
| `VITE_API_URL` (pubblico) | Variabile di Pages | `.env.local` |

Nessuna chiave Supabase arriva al browser o al repository: `.dev.vars` e `.env.local` sono in
`.gitignore` e la CI blocca il merge se trova segreti nel codice o nel bundle. I secret del
Worker sono cifrati ([Cloudflare, Secrets](https://developers.cloudflare.com/workers/configuration/secrets/)).
Dev e Prod hanno progetti e chiavi separati (NFR-16). Il binding
[Rate Limiting](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/)
limita le route della sessione a 300 richieste al minuto per IP. Gli URL firmati di R2 scadono
in 5 minuti (ASS-33) e il Worker li firma solo dopo aver controllato ruolo e appartenenza.

---
