# Board Miro "ScuolaChill Organization" — trascrizione

Fonte: https://miro.com/app/board/uXjVHlP3Rww=/ · trascritta il 23/09/2026 dal supervisore.
Gli agenti non hanno accesso a Miro: questo file è la fonte per il PRD. Testo originale
riportato fedelmente (refusi inclusi tra virgolette), struttura dei flussi ricostruita dai
connettori.

## Frame 1 · Generale / gerarchia

- **Direttore** "può supervisionare tutto quello che avviene sotto di lui".
  Crea: classi/corsi, profilo docente, profilo studente.
  - Classi/corsi → hanno **orari delle lezioni** e **lista docenti**.
- **Docente** (profilo creato dal Direttore): carica materiale didattico delle sue materie,
  crea o carica le verifiche, assegna voti.
- **Studente** (profilo creato dal Direttore): visiona "nella totalità tutto quello che lo
  riguarda" (voti, verifiche, note, compiti per casa, orario scolastico) ed entra in contatto
  con i docenti.

## Frame 2 · Creazione profilo docente (DIR-01)

1. Accesso da profilo Direttore.
2. Il profilo ha accesso a questa sezione? **No** → torna all'accesso. **Sì** → form di creazione.
3. I dati inseriti sono validi? **Sì** → **creo il profilo** (fine).
4. **No** → ci sono dati mancanti? **Sì** → segnalo l'errore specifico → torna al form.
5. **No** → è un profilo già esistente? **Sì** → errore specifico → form.
6. **No** → i dati rispettano la nomenclatura (formato)? **No** → errore specifico → form.
   **Sì** (ma comunque non valido) → segnalo errore di compilazione generico → form.

## Frame 3 · Creazione profilo studente (DIR-02)

Come il frame 2 (accesso, form, dati mancanti, già esistente, nomenclatura, errore generico),
con in più il controllo sulla classe dopo "profilo non già esistente":
- La classe assegnata allo studente è valida? **No** → errore specifico → form.
- **Sì** → lo studente è già assegnato a una classe? **Sì** → notifica problema →
  "continuare con procedura di cambio classe?" **Sì** → passa al form di cambio classe
  (frame 5). **No** → errore specifico → form.

## Frame 4 · Creazione classe/corso (DIR-03)

Come il frame 2, con questi controlli dopo "dati mancanti = no":
- Classe/corso già esistente? **Sì** → errore specifico.
- **No** → docenti del corso inseriti correttamente? **No** → errore specifico.
- **Sì** → rispetta la nomenclatura? **No** → errore specifico; **Sì** → errore generico → form.
- Dati validi → **creo classe/corso**.

## Frame 5 · Cambio classe all'alunno (DIR-03, trasferimento)

1. Accesso da profilo Direttore; controllo di accesso alla sezione come sopra.
2. Form di migrazione.
3. L'alunno è al primo anno?
   - **No** → serve la conferma dell'alunno/responsabile del cambio classe.
   - **Sì** → l'anno scolastico è già iniziato? **No** → cambio la classe direttamente.
     **Sì** → serve la conferma dell'alunno/responsabile.
4. Conferma: l'alunno (genitore/tutore) acconsente? **Sì** → **cambio la classe**.
   **No** → **richiesta di colloquio con alunno e genitori** (fine, nessun cambio).

## Frame 6 · Stack e architettura

Nessun testo leggibile (solo elementi grafici).

## Frame 7 · Decisioni, seconda tornata (18/09/2026)

- Supabase → login, utenti, database dei metadati e delle condivisioni.
  Cloudflare R2 → i file, bucket privato. Backend Node → verifica i permessi e firma gli URL.
- Verifiche con **SurveyJS Form Library**.
- Formule: **KaTeX** (veloce, rendering sincrono) scelto; **MathJax** scartato (più lento,
  sintassi più ampia). Valutazione della correttezza: un confronto fra stringhe fallisce
  (0.5 vs 1/2); **math.js** (valutazione numerica) e **Algebrite** (CAS simbolico) valutati e
  lasciati fuori dalla v1 → domande con formule corrette dal docente.

## Cosa la board non copre

Login/logout/primo accesso/reset password, DIR-04, tutti i flussi Docente e Studente, orario,
compiti, note, messaggi, CRUD oltre la creazione.
