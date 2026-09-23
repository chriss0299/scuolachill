## Le API

### Le risorse

Tutte le API stanno sul Worker, `https://api.<dominio>/v1` (ASS-31). Il browser non chiama
nient'altro, salvo il trasferimento dei file su URL firmati (VIN-34). Convenzioni:
- versione nel percorso (`/v1`), perché resta visibile in log e Postman; la versione
  nell'intestazione è scartata;
- nomi del glossario al plurale in `kebab-case`, JSON `camelCase`, ID UUID, date ISO 8601 UTC;
- le azioni che non sono CRUD sono sotto-risorse chiamate con POST (`/pubblicazioni`, `/consegna`,
  `/ripristino`); i verbi in stile RPC sono scartati;
- `DELETE` è un soft-delete (FR-DIR-03);
- ogni ruolo riceve il proprio DTO (per esempio `VerificaStudenteDto` non contiene la chiave di
  correzione).

| Area | Risorse |
| --- | --- |
| Accesso | `/v1/auth/sessione`, `/primo-accesso`, `/reset-password` |
| Anagrafiche | `/v1/docenti`, `/v1/studenti` (+ `/trasferimenti`, `/credenziali`), `/v1/classi`, `/v1/materie`, `/v1/anni-scolastici`, `/v1/insegnamenti`, `/v1/orari` |
| Didattica | `/v1/materiali`, `/v1/verifiche` (+ `/svolgimenti`), `/v1/voti`, `/v1/compiti`, `/v1/note` |
| Comunicazione | `/v1/messaggi`, `/v1/conversazioni` |
| Letture aggregate e servizio | `/v1/dashboard/contatori`, `/v1/dashboard/statistiche-voti`, `/v1/studenti/{id}/voti-per-materia`, `/v1/stato` |

**File su R2.** Il file non passa dal Worker (VIN-30). Il Worker restituisce un URL firmato di
5 minuti per il `PUT` (ASS-33) e, dopo `POST …/conferma`, ricontrolla tipo e dimensione. Il
download avviene con un GET firmato, emesso solo a chi può vedere il materiale.

### Il contratto delle API principali

Tutte le route con sessione possono rispondere 401, 403, 404, 422, 429, 500 e 503. Ogni `PUT`,
`PATCH` o `DELETE` porta la `versione` nel corpo e può rispondere 409 `conflitto-versione`.
**Docente (perimetro)** indica le sole coppie classe-materia assegnate al docente (FR-DIR-02).
Il contratto completo sarà nell'OpenAPI.

| Verbo | Route | Chi può chiamarla | Payload | Risposte |
| --- | --- | --- | --- | --- |
| POST | `/v1/auth/sessione` | Pubblica | `{"identificativo":"marco.verdi","password":"…"}` | 200 `ProfiloDto` + cookie · 401 `credenziali-non-valide` (AUT-01 · AC-01) · 429 `troppi-tentativi` + `Retry-After` (ASS-52) |
| POST | `/v1/docenti` | Direttore | `{"nome":"Anna","cognome":"Rossi","email":"…"}` | 201 · 422 per campo (DIR-01 · AC-11) · 409 `email-gia-usata` |
| PUT | `/v1/docenti/{id}` | Direttore | `{…,"versione":3}` | 200 · 409 `conflitto-versione` |
| DELETE | `/v1/docenti/{id}` | Direttore | `{"versione":3}` | 204, account disattivato (DIR-01 · AC-12) |
| POST | `/v1/studenti` | Direttore | `{"nome":"Marco","classeId":"…","tutore":{…}}` | 201 · 409 `studente-gia-iscritto` (DIR-02 · AC-10) |
| POST | `/v1/studenti/{id}/trasferimenti` | Direttore | `{"classeDestinazioneId":"…"}` | 201 `eseguito` o `in_attesa_consenso` (FR-DIR-01) · 409 `verifica-in-corso` |
| POST | `/v1/classi` | Direttore | `{"annoCorso":1,"sezione":"A","insegnamenti":[…]}` | 201 · 409 `classe-esistente` (DIR-03 · AC-10) |
| GET | `/v1/dashboard/contatori` | Direttore | — | 200 · 403 agli altri ruoli (DIR-04 · AC-12) |
| POST | `/v1/materiali` | Docente (perimetro) | `{"titolo":"…","insegnamentoIds":[…],"file":{…}}` | 201 + URL di caricamento · 422 `file-troppo-grande` (DOC-01 · AC-10) |
| GET | `/v1/materiali/{id}/download` | Docente · Studente (sua classe) · Direttore | — | 200 `{url, scadeIl}` · 404 se eliminato (STU-01 · AC-10) |
| POST | `/v1/verifiche/{id}/apertura` | Docente autore | — | 200 · 409 `domanda-senza-risposta-corretta` (DOC-02 · AC-12) |
| POST | `/v1/voti` | Docente (perimetro) | `{"studenteId":"…","valore":7.5,"tipo":"orale"}` | 201 in `bozza` · 422 `voto-fuori-scala` (DOC-03 · AC-10) · 403 `fuori-perimetro` |
| PATCH | `/v1/voti/{id}` | Docente autore | `{"valore":8,"motivo":"…","versione":2}` | 200 · 422 `motivo-obbligatorio` (DOC-03 · AC-12) |
| POST | `/v1/voti/pubblicazioni` | Docente autore | `{"voti":[{"id":"…","versione":1}]}` | 200 · 409 `pubblicazione-non-possibile`: tutto o niente |
| POST | `/v1/verifiche/{id}/svolgimenti` | Studente (sua classe) | `{}` | 201 avvio · 200 ripresa · 409 `verifica-non-aperta` |
| PATCH | `/v1/verifiche/{id}/svolgimenti/{svolgimentoId}` | Studente (sé) | `{"sessioneId":"…","sequenza":42,"risposte":{"d3":"B"}}` | 200 `{sequenza, salvatoIl}` · 409 (vedi sotto) |
| POST | `…/svolgimenti/{svolgimentoId}/consegna` | Studente (sé) | `{"sessioneId":"…","sequenza":43}` | 200 ricevuta, idempotente (STU-02) |
| GET | `/v1/studenti/{id}/voti-per-materia` | Studente (sé) · Direttore | — | 200 solo voti pubblicati · 404 per un altro studente (STU-03 · AC-11) |
| POST | `/v1/messaggi` | Studente · Docente | `{"docenteId":"…","testo":"…"}` | 201 · 403 `destinatario-non-ammesso` (MSG-01 · AC-01) |
| GET | `/v1/stato` | Pubblica | — | 200 `{"stato":"ok"}` · 503 se il database non risponde |

Il **salvataggio progressivo** (FR-VER-03, ASS-61) invia solo le risposte cambiate, con una
`sequenza` crescente. Ha tre 409 distinti: `sessione-sostituita` (il client passa in sola
lettura), `tempo-scaduto` (il client mostra la consegna automatica) e `salvataggio-superato`
(il client lo ignora).

### Errori, validazione e paginazione

Ogni errore è un **Problem Details** RFC 9457 (`application/problem+json`) con tre estensioni:
`codice`, `idRichiesta` ed `errori` per campo (NFR-15). Un formato inventato è scartato perché
andrebbe documentato da zero.

```json
{
  "type": "https://api.<dominio>/problemi/validazione",
  "title": "Dati non validi",
  "status": 422,
  "instance": "/v1/voti",
  "codice": "validazione",
  "idRichiesta": "01J9Z6Q4X8T2M5",
  "errori": [{ "campo": "valore", "codice": "voto-fuori-scala",
               "messaggio": "Il voto va da 1 a 10 a passi di mezzo voto." }]
}
```

Due criteri stabiliscono il codice di risposta:
- **422 o 409**: 422 se chi chiama deve correggere la richiesta; 409 se la richiesta è corretta
  ma lo stato attuale dei dati la impedisce;
- **404 o 403**: 404 se la risorsa non esiste o chi chiama non la vede, così non ne scopre
  l'esistenza; 403 se il ruolo non è ammesso o se la risorsa è visibile ma l'azione no.

**Validazione.** Gli schemi Zod in `shared/schemi/` sono l'unica definizione delle regole.
Il form li usa con `zodResolver` per comodità dell'utente, mentre la barriera vera è il Worker:
valida corpo e query e rifiuta con 422 i campi sconosciuti. I service controllano le regole che
dipendono dai dati, come appartenenza, stati e scadenze. I tipi dei DTO si ricavano con
`z.infer`.

**Paginazione** (NFR-13):
- parametri `pagina` (da 1), `perPagina` (default 25, massimo 100), `ordina` (`-data,cognome`,
  solo campi ammessi) e `cerca`, più filtri con nome come `classeId`;
- la risposta ha la forma `{"dati":[…],"paginazione":{"pagina":2,"perPagina":25,"totale":612,"pagine":25}}`;
- si usa l'offset perché la DataGrid vuole il totale; il cursore vale solo per i messaggi.

**OpenAPI e Postman** (NFR-14). Le route sono dichiarate con `@hono/zod-openapi`: gli stessi
schemi validano le richieste e generano l'OpenAPI 3.1, esposta con Swagger UI solo in
Development. Una specifica scritta a mano è scartata perché divergerebbe dal codice. La
collezione Postman si genera da `openapi.json` con `openapi-to-postmanv2`, poi si arricchisce
con i test. Newman la esegue in CI e un test fallito blocca il rilascio.

---
