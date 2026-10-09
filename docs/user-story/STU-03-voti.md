# STU-03 · Consultare i propri voti

| | |
| --- | --- |
| **Ruolo** | Studente (account di famiglia) |
| **Origine** | Traccia; intervista al Docente (D-07) |
| **Requisiti collegati** | FR-VOT-01, FR-VOT-02, FR-DIR-01, NFR-03, NFR-10 · ASS-07, ASS-23 |

## Storia

**Come** studente (o genitore), **voglio** vedere i miei voti divisi per materia con la media,
**così da** sapere come sto andando senza aspettare i colloqui.

## Flusso

1. Lo studente apre Voti: i voti pubblicati raggruppati per materia, con la media indicativa del
   quadrimestre (ASS-07; «+» e «−» valgono ±0,25, ASS-06).
2. Apre un voto: data, tipo, commento, docente, classe di origine se diversa dall'attuale.
3. Per i voti da verifica vede le proprie risposte, i punteggi e le correzioni.

## Scenario principale

Uscito da scuola, Luca controlla dal telefono che il 7 di Storia sia stato pubblicato; la sera
la madre vede lo stesso voto con lo stesso accesso.

## Scenari alternativi

- Nessun voto nella materia → stato vuoto.
- Voto corretto dal docente → indicazione «modificato il …».
- Studente trasferito → vede anche i voti della classe precedente, marcati con la classe di
  origine (FR-DIR-01).

## Criteri di accettazione

Gli AC della traccia restano validi. Aggiunti dal team:

- **AC-10** Dato uno studente, quando apre i voti, allora li vede raggruppati per materia con
  data, tipo e media indicativa.
- **AC-11** Dato uno studente, quando chiede i voti di un altro studente, allora è respinto.
- **AC-12** Dato un voto corretto dopo la pubblicazione, quando lo studente lo apre, allora vede
  «modificato il …».
