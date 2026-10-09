# STU-01 · Consultare il materiale didattico

| | |
| --- | --- |
| **Ruolo** | Studente (account di famiglia) |
| **Origine** | Traccia; intervista al Docente (D-01) |
| **Requisiti collegati** | FR-DIR-03, NFR-05, NFR-10, NFR-13 |

## Storia

**Come** studente, **voglio** trovare dal telefono il materiale delle mie materie, **così da**
ripassare o recuperare una lezione ovunque mi trovi.

## Flusso

1. Lo studente apre Materiale e vede le materie della sua classe.
2. Sceglie una materia: elenco dei materiali dal più recente, con ricerca.
3. Apre l'anteprima o scarica il file.

## Scenario principale

Sul bus Marco apre dal telefono le slide di Informatica caricate la sera prima.

## Scenari alternativi

- Rete mobile lenta → l'elenco si carica leggero e il file solo su richiesta (NFR-05).
- Materiale eliminato dal docente → sparisce dall'elenco.
- Link di un file inoltrato a chi non ha accesso → non funziona.

## Criteri di accettazione

Gli AC della traccia restano validi. Aggiunti dal team:

- **AC-10** Dato un materiale di un'altra classe, quando lo studente lo richiede anche
  conoscendone il link, allora è respinto.
- **AC-11** Dato un telefono in rete mobile, quando lo studente apre il materiale di una
  materia, allora l'elenco compare entro i tempi di NFR-10.
