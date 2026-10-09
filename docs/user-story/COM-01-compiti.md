# COM-01 · Compiti per casa

| | |
| --- | --- |
| **Ruolo** | Docente (scrive), Studente (consulta) |
| **Origine** | Storia aggiunta dal team (board: «compiti per casa»); interviste al Docente (D-11, D-14) |
| **Requisiti collegati** | FR-COM-01, FR-DIR-02, NFR-17 · ASS-10, ASS-25 · VIN-08 |

## Storia

**Come** docente, **voglio** segnalare alla classe i compiti per casa con la scadenza, **così
da** non doverli dettare a fine lezione e farli trovare anche a chi era assente.

## Flusso

1. Il docente sceglie una sua classe e materia.
2. Scrive il testo (per esempio «Esercizi 3-7 a pagina 112») e la data di consegna; può allegare
   un file (ASS-10).
3. In orario di lezione il compito compare subito agli studenti della classe, ordinato per
   scadenza. Preparato fuori orario resta in bozza e si pubblica alle 8:00 del giorno di scuola
   successivo (ASS-25, nota ministeriale del 28/09/2026).
4. Si modifica o si elimina finché non è scaduto, poi resta in sola lettura.

## Scenario principale

Il prof. Bianchi assegna gli esercizi del libro per lunedì; la sera Marco li ritrova dal
telefono nella sezione Compiti.

## Scenari alternativi

- Scadenza nel passato → errore sul campo.
- Studente di un'altra classe → non vede il compito.
- Docente che lo scrive la sera → resta in bozza fino al mattino dopo.

## Criteri di accettazione

- **AC-01** Data una scadenza nel passato, quando il docente salva, allora è rifiutata.
- **AC-02** Dato un compito, quando uno studente di un'altra classe lo cerca, allora non lo vede.
- **AC-03** Dato un compito scaduto, quando il docente prova a modificarlo, allora è rifiutato.
- **AC-04** Dato un compito salvato alle 20:00, quando uno studente apre i compiti la sera stessa,
  allora non lo vede; lo vede dalle 8:00 del giorno di scuola successivo.

## Note

Il compito è un avviso, senza consegna online: il docente non controlla i compiti se non su
richiesta degli studenti (intervista al Docente).
