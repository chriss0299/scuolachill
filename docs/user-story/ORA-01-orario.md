# ORA-01 · Comporre e consultare l'orario

| | |
| --- | --- |
| **Ruolo** | Direttore (compone), Docente e Studente (consultano) |
| **Origine** | Storia aggiunta dal team (board: «le classi hanno orari delle lezioni»); intervista al Direttore (B-04) |
| **Requisiti collegati** | FR-ORA-01, FR-DIR-02, NFR-17 · ASS-17 |

## Storia

**Come** Direttore, **voglio** comporre l'orario settimanale di ogni classe con il sistema che
mi segnala i conflitti, **così da** non controllare più a mano su Excel che un docente non sia
in due classi alla stessa ora.

## Flusso

1. Il Direttore apre l'orario di una classe: griglia di 5 giorni × 6 ore (ASS-17).
2. Per ogni casella sceglie da form la materia e il docente.
3. Il sistema rifiuta un docente già impegnato in un'altra classe alla stessa ora e un docente
   che non insegna quella materia in quella classe.
4. Studenti e famiglie vedono l'orario della propria classe; il docente il proprio orario
   settimanale. Le modifiche sono visibili subito.

## Scenario principale

A settembre il Direttore compone l'orario della 1A; quando prova a mettere la prof.ssa Rossi il
martedì alla seconda ora, il sistema segnala che è già in 2B.

## Scenari alternativi

- Docente non assegnato a quella materia nella classe → errore.
- Docente già impegnato a quell'ora → errore con la classe in conflitto.

## Criteri di accettazione

- **AC-01** Dato un docente già impegnato a quell'ora, quando il Direttore lo inserisce in
  un'altra classe, allora è rifiutato.
- **AC-02** Dato uno studente, quando apre l'orario, allora vede solo quello della sua classe.

## Aperto o fuori da questa storia

- Laboratori nell'orario e controllo del monte ore del piano di studi (B-04): oggi fuori dalla v1.
- Modifica trascinando le lezioni, supplenze e variazioni giornaliere: evoluzioni future.
