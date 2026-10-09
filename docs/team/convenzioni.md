# Convenzioni comuni del PRD

Regole che **tutti** gli agenti rispettano, perché il PRD sembri scritto da una sola mano.
Se un agente ha bisogno di una convenzione che qui manca, la propone in `lavagna.md`
(sezione "Proposte di convenzione") e non la inventa da solo; il supervisore la conferma e
la sposta qui.

## Stile

- Italiano, registro tecnico ma leggibile. Frasi brevi, niente marketing.
- Si scrive al presente ("il Worker verifica il token"), non al futuro.
- I nomi tecnici restano in inglese quando è convenzione (token, endpoint, soft-delete, DTO).
- Tabelle per confronti ed elenchi strutturati; diagrammi in **Mermaid**.
- Nessuna sezione ripete contenuti di un'altra: si rimanda per titolo o per ID.

## Modello di sezione

Il PRD segue **il template del corso** (titoli, ordine e tabelle come nello scheletro di
`PRD.MD`). Regole:

- Non si rinominano, riordinano o saltano i titoli del template; si possono aggiungere
  sottosezioni `####` dentro la propria parte.
- I callout 💡 del template non vanno nel PRD. Nessuna riga "Responsabile" nel testo.
- **User story**: una scheda per storia in `docs/user-story/`; il PRD ne riporta per esteso solo
  DIR-03, DOC-02 e STU-02. Si aggiorna prima la scheda, poi il PRD.
- **Niente codice nel PRD**: niente JSON, nomi di file, funzioni, tabelle, colonne o comandi in
  formato codice. Le route restano come percorsi in testo semplice (il template chiede la colonna Route); i
  payload si scrivono a parole. Unica eccezione: i diagrammi
  Mermaid.
- Ogni agente sostituisce **solo** i blocchi `<!-- TODO: nome-agente ... -->` a lui assegnati.
- **La prima parte non contiene scelte tecniche**: niente nomi di framework, DB, cloud,
  endpoint o tabelle. Si parla di cosa fa il sistema, non di come.
- Nella seconda parte ogni scelta tecnica ha almeno un'alternativa scartata e il motivo.
- Rimandi: per titolo di sezione (`vedi «Le API»`) o per ID.
- Lunghezza totale obiettivo 15-25 pagine: decidere, non descrivere.
- Un punto non deciso si scrive come assunzione `ASS-NN` con "Da validare" e un default
  proposto, mai come decisione presa. Dati che solo il team può fornire (nomi, interviste,
  date) restano come segnaposto `[DA COMPILARE: ...]`, mai inventati.

## Identificatori

| Cosa | Formato | Esempio |
|---|---|---|
| User story della traccia | `RUOLO-NN` | `DOC-02` |
| Criterio di accettazione | `RUOLO-NN · AC-NN` | `DOC-02 · AC-01` |
| Nuove user story (v1) | `ORA-NN`, `COM-NN`, `NOT-NN`, `MSG-NN`, `AUT-NN` (accesso) | `MSG-01` |
| Requisito funzionale deciso dal team | `FR-AREA-NN` (AREA: DIR, DOC, STU, VOT, VER, AUT, EXT, …) | `FR-VOT-01` |
| Requisito non funzionale | `NFR-NN` | `NFR-04` |
| Archetipo | `ARC-NNN` | `ARC-002` |
| Assunzione | `ASS-NN` | `ASS-07` |
| Vincolo | `VIN-NN` | `VIN-01` |
| Dipendenza esterna | `DIP-NN` | `DIP-01` |
| Rischio | `RIS-NN` | `RIS-01` |
| Richiesta tra agenti (solo lavagna) | `R-NN` | `R-03` |

Assunzioni, vincoli e dipendenze stanno **una sola volta** nel PRD: quelli di scuola e
prodotto nella sezione «Assunzioni, vincoli e dipendenze» (prima parte), quelli che nominano
scelte tecniche (fornitori, piani, tabelle, configurazione) nella tabella «Assunzioni, vincoli e
dipendenze tecniche» in fondo a «Scelte tecnologiche», perché la prima parte non contiene scelte
tecniche. Le altre sezioni li citano per ID. Chi ne introduce uno
nuovo lo aggiunge lì con il numero successivo libero. Numerazione riservata per evitare
collisioni tra agenti in parallelo: analista-requisiti ASS-01..19, data-modeler ASS-20..29,
architetto ASS-30..39, api-designer ASS-40..49, security-privacy ASS-50..59,
dimensionamento ASS-60..69 (stesse fasce per VIN e DIP; NFR-01..08 del template, poi
analista NFR-09..19, altri agenti NFR-20+ con richiesta in lavagna).

## Glossario (nomi canonici)

Usare **sempre** questi nomi, nel testo, nell'ER e nelle API.

| Termine | Significato | Tabella DB | Risorsa API |
|---|---|---|---|
| Direttore | ruolo amministrativo dell'istituto | `utenti` (ruolo) | — |
| Docente | insegnante | `docenti` | `/v1/docenti` |
| Studente | account di famiglia intestato al genitore/tutore | `studenti` | `/v1/studenti` |
| Classe | gruppo di studenti in un anno scolastico | `classi` | `/v1/classi` |
| Materia | disciplina insegnata | `materie` | `/v1/materie` |
| AnnoScolastico | periodo scolastico di riferimento | `anni_scolastici` | `/v1/anni-scolastici` |
| Materiale | file o contenuto didattico caricato dal docente | `materiali` | `/v1/materiali` |
| Verifica | prova con domande, svolta online | `verifiche` | `/v1/verifiche` |
| Svolgimento | tentativo di una verifica da parte di uno studente, dall'avvio alla consegna | `svolgimenti` | `/v1/verifiche/{id}/svolgimenti` |
| Voto | valutazione 1-10 con mezzi voti e segni + e −, stato bozza/pubblicato | `voti` | `/v1/voti` |
| TabellaConversione | tabella personale del docente da percentuale di punteggio a voto | `tabelle_conversione` | `/v1/tabelle-conversione` |
| Orario | griglia settimanale delle lezioni | `orari` | `/v1/orari` |
| Compito | compito per casa | `compiti` | `/v1/compiti` |
| Nota | nota disciplinare | `note_disciplinari` | `/v1/note` |
| Messaggio | messaggio studente ↔ docente (**fuori dalla v1**, evoluzione futura) | `messaggi` | `/v1/messaggi` |

Nuovi termini: proposti in lavagna, poi aggiunti qui.

## Naming tecnico

- Entità di dominio e DTO: `PascalCase` al singolare (`Verifica`, `VotoDto`).
- Tabelle e colonne: `snake_case`, tabelle al plurale.
- Route: `kebab-case`, risorse al plurale, prefisso `/v1`.
- Campi JSON: `camelCase`.
- Date: ISO 8601 in UTC nelle API, fuso `Europe/Rome` nella UI.
