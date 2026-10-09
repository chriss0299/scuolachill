# ScuolaChill — decisioni consolidate e piano per il PRD

**Ultimo aggiornamento**: 9 ottobre 2026

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
- **Scala voti** (aggiornata il 9/10/2026 dopo l'intervista al Docente): da 1 a 10 con interi,
  mezzi voti e segni «+» e «−», cioè passo 0,25; fuori scala → 422 con errore puntuale.
  Alternativa scartata: vietare i segni (era la proposta iniziale), perché i docenti li usano.
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
scolastico + compiti per casa + note disciplinari. La messaggistica studente↔docente è stata
tolta il 9/10/2026 (vedi sotto).

**Fuori, in "evoluzioni future"**: assenze e presenze, aule, pagamenti/PagoPA (richiede
accreditamento dell'ente e un Partner Tecnologico), drag-and-drop dell'orario (la v1 lo
modifica da form).

Le note disciplinari trattano dati di minori: il PRD dedica un paragrafo a visibilità,
conservazione e minimizzazione. La messaggistica è stata tolta dalla v1 il 9/10/2026; la sua
scheda (studente ↔ docenti della classe, mai fra studenti) resta come evoluzione futura.

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

**Revisione del 24 settembre 2026 (v1.1).** Il PRD è stato allineato al template: le
assunzioni, i vincoli e le dipendenze che nominano scelte tecniche sono passati dalla prima
parte a «Scelte tecnologiche» (tabella «Assunzioni, vincoli e dipendenze tecniche»), con gli
stessi ID. Il testo è stato ridotto da ~33.000 a ~18.000 parole. Alternativa scartata: lasciare
tutte le assunzioni nella prima parte, come diceva la convenzione, perché violava il criterio
«la prima parte non contiene scelte tecniche».

**Revisione del 9 ottobre 2026 (v1.2).** Testo ridotto a ~11.000 parole (~20 pagine) per
rispettare le 15-25 pagine del template. Nessuna decisione cambiata. AUT-02 (primo accesso) e
AUT-03 (reset password) sono confluiti in un'unica storia AUT-01 «Accesso». Le storie DIR-01 e
DIR-02 condividono un solo flusso. Alternativa scartata: tagliare sezioni intere del template.

## Team (9 ottobre 2026)

Il progetto è svolto da **Christian Colonna da solo**: è il team, l'autore del PRD e il
responsabile di ogni milestone e dipendenza. Conseguenze nel PRD: nessuna approvazione di un
secondo membro prima del rilascio, sostituita da un'approvazione manuale dopo i controlli
automatici (ASS-67); milestone in sequenza, senza attività in parallelo. Alternativa scartata:
lasciare i responsabili come segnaposto.

**Niente codice nel PRD (9 ottobre 2026).** Il PRD non contiene codice: niente JSON, nomi di file,
funzioni, colonne o comandi. Le route delle API restano come percorsi in testo semplice, perché il template chiede la
colonna «Route»; i payload sono scritti a parole. Restano solo i
diagrammi Mermaid (componenti, ER, pipeline), che si vedono come immagini.

**Niente storico delle versioni (9 ottobre 2026).** Per scelta dell'autore il PRD non ha la
riga «Versione» né la tabella «Storico delle versioni»: le modifiche si ricostruiscono dalla
storia di git. Rischio accettato: il template la richiede, e il criterio di accettazione
corrispondente resta non spuntato.

## Decisioni dall'intervista al Docente (9 ottobre 2026)

- **Segni + e −** (D-06): ammessi, come li usa il docente. Nelle medie «+» vale +0,25 e «−»
  vale −0,25 (6+ = 6,25; 7− = 6,75): valore da confermare con il docente (ASS-06).
- **Tabella di conversione punteggio → voto** (D-05): personale, una per docente. Il docente la
  **crea** nel sistema o la **importa** da un foglio di calcolo; finché non ne ha una, parte da
  una tabella predefinita lineare che può modificare. Alternativa scartata: una tabella unica
  per la scuola decisa dal Direttore, perché ogni docente oggi usa la propria (minimo 3,
  sufficienza al 55%).
- **Contestazione della correzione** (D-08): fuori dalla v1. Avviene a voce in classe; se il
  docente cambia idea corregge il voto con un motivo (FR-VOT-02). Alternativa scartata: una
  richiesta di contestazione scritta nel sistema, che aggiunge un flusso e dati di minori.

**User story in una cartella dedicata (9 ottobre 2026).** Ogni user story ha il proprio file in
`docs/user-story/` (storia, flusso, scenari, criteri di accettazione, punti aperti). Il PRD ne
riporta per esteso solo tre, una per ruolo (DIR-03, DOC-02, STU-02), e nella tabella dei
requisiti funzionali solo le dieci storie della traccia. Rischio accettato: il template chiede
almeno tre storie per ruolo nel documento.

**Intervista allo studente simulata (9 ottobre 2026).** In attesa di un'intervista reale a un
ragazzo del primo anno, Claude ha simulato lo studente sulla base di sondaggi Skuola.net e
recensioni delle app di registro elettronico (`docs/interviste/03-studente.md`). Ne nasce
NFR-17 (orario di oggi e compiti di domani subito visibili allo studente). Nel PRD l'intervista
è dichiarata come simulata; il criterio del template sui requisiti impliciti resta aperto
finché non c'è quella reale.

**Bisogni del Direttore fuori dalla v1 (9 ottobre 2026).** Dall'intervista: composizione
automatica delle classi (B-02), ruolo Segreteria (B-09, i delegati usano il ruolo Direttore),
supplenti con permessi diversi (B-05, il supplente lungo è un cambio di docente), richieste di
materiale (B-06), laboratori e monte ore nell'orario (B-04), corsi e piani di studio (B-01).
Entra invece nella v1 la vista delle classi con più note disciplinari (B-08, DIR-04 · AC-12),
perché costa poco. Alternativa scartata: allargare la v1, che con uno sviluppatore solo non
arriverebbe al collaudo di aprile.

**Messaggistica fuori dalla v1 (9 ottobre 2026).** MSG-01 diventa evoluzione futura: nessuno
degli intervistati l'ha chiesta (il docente comunica a voce, con libretto e colloqui; lo studente
simulato preferisce parlare in classe). Toglierla riduce i dati di minori da proteggere e il
lavoro per uno sviluppatore solo. Alternative scartate: tenerla com'era; tenerla solo dal genitore
al docente. Si può rivalutare con le risposte del questionario ai docenti.

**Seconda intervista al Direttore, simulata (9 ottobre 2026).** Claude ha simulato un dirigente
sulla base dell'indagine ANP-LUMSA (1.798 dirigenti), delle indicazioni del Garante privacy e
dei materiali sulla dispersione scolastica (`docs/interviste/04-direttore-2.md`). Ne nascono
NFR-18 (registro delle operazioni sensibili, estraibile in 5 minuti per le 72 ore di notifica di
una violazione) e DIR-04 · AC-14 (studenti con media sotto il 6 in almeno tre materie).
Alternativa scartata per AC-14: un indicatore di rischio più sofisticato, che il dirigente,
senza tempo, non userebbe.

**Seconda intervista al Docente, simulata (9 ottobre 2026).** Claude ha simulato un docente
sulla base della nota ministeriale del 28/09/2026, delle indagini sul carico di lavoro, della
legge 170/2010 sui DSA e dei materiali sulle verifiche online (`docs/interviste/05-docente-2.md`).
Ne nascono: VIN-08 (compiti solo in orario di lezione, verifiche programmate collegialmente);
ASS-25 (compito preparato fuori orario in bozza fino alle 8:00); FR-VER-06 (ordine di domande e
risposte mescolato; tempo aggiuntivo personale registrato dal Direttore come sola percentuale,
mai la diagnosi); FR-VER-07 (data prevista della verifica e avviso se la classe ne ha già una);
NFR-07 esteso a testo ingrandibile e sintesi vocale. Alternative scartate: bloccare la seconda
verifica nello stesso giorno (i recuperi possono richiederla); versioni ridotte della verifica
per singoli studenti (fuori dalla v1).

**Revisione del 9 ottobre 2026 (revisore-prd, 24 punti).** Correzioni principali: chi ha tempo
aggiuntivo continua anche dopo la chiusura della finestra (FR-VER-02); NFR-18 portato in modello
dati, API, matrice, conservazione e piano di valutazione; matrice dei permessi completata; voto
salvato come intero, mezzo o segno, con il valore numerico calcolato nelle viste (così cambiare il
valore dei segni non cambia i voti registrati); contratto API per le verifiche programmate e il
registro; Cron Trigger motivato fra le scelte tecnologiche, con pg_cron e GitHub Actions
scartati; «Svolgimento» ridefinito come tentativo dall'avvio alla consegna.

**Storico delle versioni ripristinato (9 ottobre 2026).** Torna nel PRD in forma breve, una riga
per versione, perché il template lo richiede. Sostituisce la decisione precedente di toglierlo.
L'intervista a uno studente reale non è stata fatta per mancanza di tempo: nel PRD resta quella
simulata, dichiarata come tale.
