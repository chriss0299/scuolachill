# ScuolaChill — decisioni consolidate e piano per il PRD

**Ultimo aggiornamento**: 18 settembre 2026

## Context

Gestionale scolastico **ScuolaChill**, tre ruoli (Direttore, Docente, Studente), collaudato da
utenti reali (ragazzi del primo anno, direttore, un docente) e deployato su cloud pubblico.
La prima consegna è il **PRD**, non il codice: la traccia chiede che ogni scelta sia motivata
confrontando almeno un'alternativa, e che le assunzioni siano scritte e coerenti fra loro.

Materiale di partenza: board Miro `https://miro.com/app/board/uXjVHlP3Rww=/` (5 frame). La board
copre bene i flussi del Direttore e lascia scoperto tutto il resto. Questo file registra le
decisioni prese e il lavoro che resta.

## Assunzioni sulla scuola

~600 studenti, ~50 docenti, ~28 classi (istituto tecnico medio). Picco da stimare nel PRD
partendo da 3-4 classi in verifica simultanea e ~250 utenti attivi nell'ora di punta.

## Stack deciso

| Strato | Scelta |
|---|---|
| Frontend | React + Vite, **MUI** (DataGrid per gli elenchi paginati) |
| Rotte e dati | React Router · TanStack Query · React Hook Form + Zod |
| Moduli specifici | SurveyJS (`survey-react-ui`) · FullCalendar (orario) · Recharts (dashboard) · KaTeX (formule) |
| Hosting frontend | Cloudflare Pages (build statica) |
| Backend | Node su **Cloudflare Workers**, sottodominio `api.` |
| Auth + DB | Supabase |
| File | Cloudflare R2, bucket privato, URL firmati dal Worker |

Scartati con motivazione da scrivere nel PRD: Angular (DI e guard rispecchiavano i livelli del
backend, ma familiarità minore), Nuxt/Vue (massima familiarità, architettura a livelli non
imposta), Next.js (duplicherebbe il ruolo del Worker), TanStack Table e AG Grid (ridondanti con
DataGrid; AG Grid ha a pagamento le funzioni interessanti), Formik (in manutenzione).

**Regola architetturale portante**: ogni operazione passa dal Worker. Supabase non è mai
raggiunto direttamente dal browser, la RLS è difesa in profondità e non la barriera primaria.
È ciò che tiene in piedi il requisito trasversale della traccia.

## Decisioni di prodotto

- **Account Studente = credenziale unica di famiglia**, intestata al genitore/tutore, che è
  quindi titolare del consenso al cambio classe. Nessun quarto ruolo. Rischio dichiarato
  apertamente: la stessa identità può svolgere le verifiche. Mitigazione: svolgimento
  consentito solo nella finestra temporale aperta dal docente, in classe.
- **Correzione ibrida**: scelta multipla e vero/falso automatiche; domande aperte e con formule
  sempre al docente. math.js/Algebrite fuori dalla v1; KaTeX dentro, per visualizzare le formule.
- **Voti con stato bozza/pubblicato**: il docente registra e poi pubblica in blocco.
  DOC-03 · AC-01 si legge come "visibile dopo pubblicazione".
- **Scala voti**: interi e mezzi voti da 1 a 10; fuori scala → 422 con errore puntuale.
- **Navigazione**: tre aree con layout dedicati (`/direttore`, `/docente`, `/studente`),
  protette da route guard. Il frontend nasconde, non autorizza.
- **Dispositivi**: verifiche su PC/tablet della scuola, tutto il resto da telefono. Solo
  l'area `/studente` richiede responsive serio.
- **API esterna chiamata dal backend**: servizio email per credenziali di primo accesso e
  reset password, con fallimento gestito (retry + credenziali recuperabili dal Direttore).

## Identità visiva

Direzione **Indaco & Ambra**, tema **chiaro + scuro** (MUI lo supporta nativamente; i ragazzi
usano il telefono anche la sera). Un solo colore di brand, un accento diverso per area così si
capisce al volo dove si è.

| Token | Chiaro | Scuro |
|---|---|---|
| Brand | `#4F46E5` | `#818CF8` |
| Accento | `#F59E0B` | `#FBBF24` |
| Sfondo | `#F8FAFC` | `#0F172A` |
| Superficie | `#FFFFFF` | `#1E293B` |
| Testo | `#0F172A` | `#E2E8F0` |
| Area Direttore | `#4F46E5` | `#818CF8` |
| Area Docente | `#0D9488` | `#2DD4BF` |
| Area Studente | `#7C3AED` | `#A78BFA` |

**Scala voti — arancio → blu, mai rosso/verde.** Il rosso-verde è illeggibile per circa un
maschio su dodici: su 600 studenti sono decine di ragazzi che vedrebbero la pagella come una
fila di marroni. Il colore non porta mai l'informazione da solo: il numero c'è sempre.

| Voto | Chiaro | Scuro |
|---|---|---|
| 1-3 | `#C2410C` | `#FB923C` |
| 4-5 | `#F59E0B` | `#FBBF24` |
| 6 | `#64748B` | `#94A3B8` |
| 7-8 | `#0E7490` | `#22D3EE` |
| 9-10 | `#1D4ED8` | `#60A5FA` |

La palette dei grafici Recharts (categorica per le classi, sequenziale per gli andamenti) si
deriva da questi token quando si costruisce la dashboard.

## Scope

**Dentro la v1**: user story della traccia (DIR-01..04, DOC-01..03, STU-01..03) + orario
scolastico + compiti per casa + note disciplinari + messaggistica studente↔docente.

**Fuori, in "evoluzioni future"**: assenze e presenze, aule, pagamenti/PagoPA (richiede
accreditamento dell'ente e un Partner Tecnologico), drag-and-drop dell'orario (la v1 lo
modifica da form).

Note disciplinari e messaggistica trattano dati di minori: il PRD dedica un paragrafo a
visibilità, conservazione e minimizzazione, e la messaggistica ha un modello esplicito su chi
può scrivere a chi (studente ↔ docenti della sua classe, mai fra studenti).

## Cosa manca e che il PRD deve produrre

**Flussi da derivare** (la board copre solo DIR-01/02/03 e il cambio classe): login, logout,
primo accesso e reset password · DIR-04 dashboard · DOC-01 materiale · DOC-02 verifiche ·
DOC-03 voti · STU-01 materiale · STU-02 svolgimento verifica · STU-03 voti per materia.

**CRUD completo**: la board ha solo la *Create*. Servono lettura, modifica e soft-delete su
docenti, studenti, classi, materiali, verifiche e voti.

**Modello dati**: entità **Materia** e **AnnoScolastico** non esistono da nessuna parte e
reggono tutto il resto. Poi ER con cardinalità, identificatori, distinzione modello DB /
dominio / DTO, letture denormalizzate per "voti per materia" e per la dashboard.

**Le cinque aree della traccia**, tutte da scrivere da zero: architettura a livelli e
diagramma a componenti · contratto API REST completo con codici HTTP, formato uniforme degli
errori, validazione, paginazione, OpenAPI e collezione Postman · persistenza e query
parametrizzate · sicurezza (come si ottiene il token, cosa contiene, dove si applica il
controllo dei ruoli) · qualità (organizzazione del codice, design pattern, testabilità con
dipendenze infrastrutturali sostituibili, Development/Production, migration del DB).

**Dimensionamento**: utenti concorrenti normali e di picco, profilo di carico, costi mensili,
strategia di scalabilità, piano di deployment.

## Punti minori: default proposti nel PRD come assunzioni da validare

Materie gestite dal Direttore · destino dei voti al cambio classe · regole di modifica della
verifica dopo lo svolgimento (DOC-02 · AC-02) · soft-delete ovunque · durata e timer della
verifica, salvataggio bozza, caduta di connessione · visibilità delle note · limiti di
dimensione e tipo dei file su R2 · piano Supabase · dominio pubblico · composizione del team.

## Verifica

Il PRD regge quando: ogni user story ha un flusso, ogni entità del dominio compare nell'ER,
ogni endpoint ha verbo/route/payload/codici, ogni assunzione dichiarata ha un numero coerente
a valle (utenti → concorrenza → macchine → costo), e ogni scelta tecnologica ha l'alternativa
scartata con il motivo.

## Formato del PRD (23 settembre 2026)

Il PRD segue **il template del corso** (tre parti: il cosa, il come, tempi e valutazione) con
i suoi identificatori (`FR-AREA-NN`, `NFR-NN`, `ASS-NN`, `VIN-NN`, `DIP-NN`, `ARC-NNN`).
Scartato il modello di sezione interno numerato (`## N. Titolo` con responsabile): è il
docente a valutare il documento sulla struttura del template. Le istruzioni del template sono
riassunte in `docs/template-prd.md`; la board è trascritta in `docs/board-miro.md`.
