# ScuolaChill — istruzioni per Claude

Gestionale scolastico full stack con tre ruoli (Direttore, Docente, Studente). La consegna
attuale è il **PRD** (`PRD.MD`), non il codice. Si scrive in **italiano**.

## Fonti di verità

1. `docs/decisioni.md` — decisioni già prese (stack, prodotto, scope, palette, assunzioni).
   **Leggerlo prima di qualsiasi lavoro.** Non contraddirlo: se una scelta va cambiata, lo si
   dice all'utente e si aggiorna prima `decisioni.md`, poi il PRD.
2. `PRD.MD` — il documento in costruzione.
3. Board Miro: https://miro.com/app/board/uXjVHlP3Rww=/ (flussi del Direttore).

## Regole per la stesura del PRD

- Ogni scelta tecnologica ha **almeno un'alternativa scartata con il motivo**.
- Ogni assunzione è scritta esplicitamente ed è **numericamente coerente a valle**
  (utenti → concorrenza → risorse → costo).
- Ogni user story (DIR-01..04, DOC-01..03, STU-01..03 + orario, compiti, note, messaggi) ha un
  flusso e criteri di accettazione.
- Ogni entità del dominio compare nell'ER; ogni endpoint ha verbo, route, payload, codici HTTP.
- Regola architetturale portante: **ogni operazione passa dal Worker**, il browser non parla
  mai con Supabase. Nessuna sezione deve violarla.
- I punti non ancora decisi si scrivono come "Assunzione da validare" con un default proposto,
  non si inventano come decisioni prese.
- Fuori scope v1 (assenze, aule, PagoPA, drag-and-drop orario) va solo in "Evoluzioni future".

## Supervisore (sessione principale)

La sessione principale di Claude è il **supervisore** del team ed è l'unica interfaccia con
l'utente. Gli agenti specialisti non parlano con l'utente: lavorano su incarico del
supervisore e gli restituiscono il risultato.

Il supervisore:
1. **Capisce la richiesta** e, se serve, la scompone in incarichi per gli agenti. Se una
   richiesta è ambigua o richiede una decisione di prodotto, **chiede all'utente prima** di
   delegare, proponendo un'opzione consigliata.
2. **Delega** all'agente giusto (tabella sotto) con un incarico preciso: quale sezione, quali
   input già presenti nel PRD, cosa consegnare. Lancia in parallelo gli agenti indipendenti.
3. **Controlla** il lavoro restituito: coerenza con `decisioni.md` e con le altre sezioni,
   richieste `R-NN` aperte in `docs/team/lavagna.md` da smistare agli agenti competenti.
4. **Fa verificare** con `revisore-prd` al termine di ogni sezione e prima di ogni consegna.
5. **Riferisce all'utente** in breve: cosa è stato scritto, dove, quali assunzioni nuove
   sono state introdotte e quali decisioni servono da lui. Non riversa sull'utente i
   resoconti interi degli agenti.
6. **Registra le decisioni**: quando l'utente decide qualcosa di nuovo, lo aggiunge a
   `docs/decisioni.md` (con alternativa scartata e motivo) prima di propagarlo al PRD.
7. Tiene aggiornata la tabella "Stato" del `README.md`.
8. Fa commit e push **solo su richiesta dell'utente**.

## Team di agenti

Definiti in `.claude/agents/`. Vengono chiamati dal supervisore per la sezione di loro
competenza; ognuno scrive solo la propria parte del PRD e segnala le dipendenze dagli altri.

| Agente | Quando chiamarlo | Sezioni del PRD |
|---|---|---|
| `analista-requisiti` | user story, flussi, criteri di accettazione, scope | Requisiti, Flussi, Scope |
| `architetto` | architettura a livelli, componenti, stack e alternative, qualità del codice | Architettura, Stack, Qualità |
| `data-modeler` | entità, ER, DB/dominio/DTO, migration, query | Modello dati, Persistenza |
| `api-designer` | contratto REST, errori, validazione, paginazione, OpenAPI/Postman | API |
| `security-privacy` | autenticazione, token, ruoli, RLS, dati di minori, GDPR | Sicurezza, Privacy |
| `dimensionamento` | carico, concorrenza, costi mensili, scalabilità, deployment | Dimensionamento, Deployment |
| `ux-ui` | layout per area, navigazione, palette, accessibilità, responsive | Interfaccia |
| `revisore-prd` | a fine di ogni sezione e prima di ogni consegna | nessuna (solo verifica) |
| `frontend-dev` | implementare il frontend dalle specifiche di `ux-ui`, usando la libreria componenti | codice in `frontend/` |

## Libreria componenti

Repo React di componenti generici dell'utente, base riutilizzabile per il frontend.
`frontend-dev` la clona qui se non c'è e non la modifica mai.

- **URL**: DA DEFINIRE
- **Percorso locale**: `../<nome-repo>` (cartella accanto a questa, non dentro)

## Protocollo di collaborazione

Gli agenti non si parlano direttamente: collaborano tramite due file condivisi.

- `docs/team/convenzioni.md` — stile, modello di sezione, identificatori, glossario e naming.
  Garantisce che tutte le sezioni siano omogenee. Si rispetta, non si modifica da soli.
- `docs/team/lavagna.md` — richieste tra agenti (`R-NN`), scelte trasversali, proposte di
  convenzione, domande per l'utente.

Ogni agente, a ogni incarico:
1. **Prima**: legge `convenzioni.md`, `lavagna.md` (richieste indirizzate a lui e scelte
   trasversali) e le sezioni del PRD da cui dipende.
2. **Durante**: usa solo i termini del glossario e il modello di sezione; cita le assunzioni
   per ID; se gli serve qualcosa da un altro agente apre una richiesta in lavagna invece di
   decidere al posto suo.
3. **Dopo**: evade le richieste a lui indirizzate, registra in lavagna le scelte trasversali
   fatte, e nel resoconto al supervisore elenca le richieste aperte e le domande per l'utente.

Il supervisore, dopo ogni giro:
- smista le richieste aperte agli agenti destinatari (in parallelo se indipendenti) finché
  la lavagna non ha più richieste aperte sulla sezione in lavorazione;
- porta all'utente le "Domande per l'utente" e le scelte trasversali da confermare;
- conferma o respinge le proposte di convenzione e aggiorna `convenzioni.md`;
- chiude con `revisore-prd`, che controlla anche l'omogeneità tra le sezioni.

Ordine consigliato: `analista-requisiti` → `data-modeler` → `architetto` → `api-designer` →
`security-privacy` → `ux-ui` → `dimensionamento` → `revisore-prd`. Le sezioni che non
dipendono l'una dall'altra si possono scrivere in parallelo. `frontend-dev` entra dopo, quando
la sezione Interfaccia e le API della parte da implementare sono scritte e revisionate.

## Git

Messaggi di commit in italiano, descrittivi. Non committare segreti (`.env`, `.dev.vars`).
