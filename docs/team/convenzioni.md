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
- Nessuna sezione ripete contenuti di un'altra: si rimanda con un link (`vedi §4.2`).

## Modello di sezione

Ogni sezione principale del PRD segue questa struttura (le parti che non servono si omettono):

```markdown
## N. Titolo

**Responsabile**: <agente> · **Dipende da**: §x, §y

### N.1 Obiettivo
Cosa copre la sezione, in 2-3 righe.

### N.2 Contenuto
...

### N.3 Alternative considerate
| Opzione | Pro | Contro | Esito |

### N.4 Assunzioni
Rimandi agli ID del registro assunzioni (A-xx), senza riscriverle.
```

## Identificatori

| Cosa | Formato | Esempio |
|---|---|---|
| User story | `RUOLO-NN` | `DOC-02` |
| Criterio di accettazione | `RUOLO-NN · AC-NN` | `DOC-02 · AC-01` |
| Nuove user story (v1) | `ORA-NN`, `COM-NN`, `NOT-NN`, `MSG-NN` | `MSG-01` |
| Assunzione | `A-NN` | `A-07` |
| Richiesta tra agenti | `R-NN` | `R-03` |
| Rischio | `RIS-NN` | `RIS-01` |

Il registro delle assunzioni sta **una sola volta** nel PRD, nella sezione "Assunzioni"; le
altre sezioni lo citano per ID. Chi introduce un'assunzione la aggiunge lì con il numero
successivo libero.

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
| Svolgimento | consegna di una verifica da parte di uno studente | `svolgimenti` | `/v1/verifiche/{id}/svolgimenti` |
| Voto | valutazione 1-10 con mezzi voti, stato bozza/pubblicato | `voti` | `/v1/voti` |
| Orario | griglia settimanale delle lezioni | `orari` | `/v1/orari` |
| Compito | compito per casa | `compiti` | `/v1/compiti` |
| Nota | nota disciplinare | `note_disciplinari` | `/v1/note` |
| Messaggio | messaggio studente ↔ docente | `messaggi` | `/v1/messaggi` |

Nuovi termini: proposti in lavagna, poi aggiunti qui.

## Naming tecnico

- Entità di dominio e DTO: `PascalCase` al singolare (`Verifica`, `VotoDto`).
- Tabelle e colonne: `snake_case`, tabelle al plurale.
- Route: `kebab-case`, risorse al plurale, prefisso `/v1`.
- Campi JSON: `camelCase`.
- Date: ISO 8601 in UTC nelle API, fuso `Europe/Rome` nella UI.
