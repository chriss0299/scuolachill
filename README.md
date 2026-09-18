# ScuolaChill

Gestionale scolastico full stack con tre ruoli: Direttore, Docente, Studente.
Progetto scolastico, collaudato da utenti reali (ragazzi del primo anno, il direttore
dell'istituto e un docente) e deployato su cloud pubblico.

La prima consegna del progetto e il **PRD**, non il codice: stack, infrastruttura e
dimensionamento sono scelte del team e vanno motivate confrontando le alternative.

## Stato

| Cosa | Stato |
|---|---|
| Board Miro con i flussi | fatta (Direttore) |
| Decisioni di stack, prodotto, scope, palette | prese, vedi `docs/decisioni.md` |
| PRD | da scrivere |
| Codice | non iniziato |

## Dove sta cosa

- `docs/decisioni.md` — tutte le decisioni prese, con le alternative scartate e
  l'elenco di cosa manca ancora. **E il file da leggere per ripartire.**
- Board Miro: https://miro.com/app/board/uXjVHlP3Rww=/
  Cinque frame con i flussi del Direttore, piu quattro schede con le decisioni.

## Stack scelto

React con Vite e MUI su Cloudflare Pages · backend Node su Cloudflare Workers ·
Supabase per auth e database · Cloudflare R2 per i file.

Regola architetturale portante: ogni operazione passa dal Worker, Supabase non e mai
raggiunto direttamente dal browser.
