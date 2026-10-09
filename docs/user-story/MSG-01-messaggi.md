# MSG-01 · Messaggi fra studente e docente

> **Fuori dalla v1 (decisione del 09/10/2026)**: evoluzione futura. Nessuno degli intervistati
> l'ha chiesta. La scheda resta come riferimento se la si riprende.

| | |
| --- | --- |
| **Ruolo** | Studente/famiglia e Docente; Direttore solo per i segnalati |
| **Origine** | Storia aggiunta dal team (decisioni del 18/09/2026) |
| **Requisiti collegati** | NFR-08 (il requisito FR-MSG-01 e le assunzioni ASS-08, ASS-16 sono stati tolti dal PRD con la storia) |

## Storia

**Come** studente o genitore, **voglio** scrivere un messaggio a un docente della mia classe,
**così da** chiedere un chiarimento senza aspettare la lezione o il colloquio.

## Flusso

1. Lo studente (o il genitore) sceglie uno dei docenti della sua classe.
2. Scrive un messaggio di solo testo, al massimo 2.000 caratteri (ASS-16).
3. Il docente lo vede fra le conversazioni della classe e risponde.
4. Docente o studente possono segnalare un messaggio al Direttore, che vede solo quello (ASS-08).

## Scenario principale

La madre di Marco chiede alla prof.ssa Rossi se la verifica di venerdì comprende anche il
capitolo 4; la docente risponde in serata.

## Scenari alternativi

- Docente non più nella classe → conversazione in sola lettura.
- Tentativo di scrivere a un altro studente → impossibile per costruzione.
- Messaggio inviato → non si modifica né si cancella.

## Criteri di accettazione

- **AC-01** Dato un docente che non insegna nella classe, quando lo studente gli scrive, allora è
  respinto.
- **AC-02** Dato un messaggio inviato, quando il mittente prova a modificarlo, allora è respinto.
- **AC-03** Dato un messaggio segnalato, quando il Direttore apre le segnalazioni, allora vede
  solo quel messaggio.

## Aperto

Nessuno degli intervistati ha chiesto la messaggistica (anche lo studente simulato preferisce parlare a voce; forse servirebbe al genitore): il docente oggi comunica a voce, con il
libretto e ai colloqui. Per questo è stata tolta dalla v1; si può rivalutare con le risposte del
questionario ai docenti.
