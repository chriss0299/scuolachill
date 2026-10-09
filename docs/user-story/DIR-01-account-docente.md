# DIR-01 · Creare e gestire gli account docente

| | |
| --- | --- |
| **Ruolo** | Direttore |
| **Origine** | Traccia; board Miro, frame 2; intervista al Direttore (B-01) |
| **Requisiti collegati** | FR-DIR-02, FR-DIR-03, FR-EXT-01, NFR-02, NFR-06, NFR-15 · ASS-11, ASS-19, ASS-22 |

## Storia

**Come** Direttore, **voglio** creare, modificare e disattivare gli account dei docenti e
assegnarli a classi e materie, **così da** dare a ciascuno accesso solo alle proprie classi.

## Flusso

1. Il Direttore apre la sezione Docenti; qualsiasi altro ruolo viene respinto.
2. Apre il form e inserisce nome, cognome ed email.
3. Il sistema controlla, in quest'ordine: campi obbligatori; docente già esistente (stessa
   email, ASS-19); formato di email e nomi; ogni altro problema → errore generico. In tutti i
   casi si torna al form con i dati inseriti.
4. Dati validi: l'account nasce e parte l'invio del codice di primo accesso (AUT-01).
5. Dalla scheda del docente il Direttore ne legge e modifica i dati e gli assegna classi e
   materie (FR-DIR-02).
6. Disattivazione: il docente non accede più; voti, materiali e verifiche restano a suo nome e
   consultabili. Il Direttore può riattivarlo.

## Scenario principale

Il 5 settembre arriva la prof.ssa Rossi, Matematica. Il Direttore la crea in un minuto e la
assegna alla 1A e alla 2B; lei riceve l'email mentre è ancora in segreteria.

## Scenari alternativi

- Email già usata da un docente disattivato → il sistema propone la riattivazione invece di un
  duplicato.
- Invio email fallito → stato «invio fallito» nella scheda e credenziali rigenerabili
  (FR-EXT-01).
- Disattivazione di un docente con verifiche aperte → richiesta di conferma; le verifiche si
  chiudono.
- Cambio di docente in corso d'anno → la vecchia assegnazione si chiude e se ne apre una nuova
  (ASS-22).

## Criteri di accettazione

Gli AC della traccia restano validi e non sono ripetuti qui. Aggiunti dal team:

- **AC-10** Dato un utente Docente o Studente, quando tenta di creare un docente, allora
  l'operazione è rifiutata e nessun account nasce.
- **AC-11** Dato un campo obbligatorio vuoto o un'email già usata, quando il Direttore salva,
  allora il sistema indica il campo e il motivo e conserva gli altri dati.
- **AC-12** Dato un docente disattivato, quando prova ad accedere, allora è respinto, mentre i
  suoi voti e materiali restano consultabili.
- **AC-13** Dato un invio email fallito, quando il Direttore apre la scheda, allora vede «invio
  fallito» e può rigenerare le credenziali.

## Aperto o fuori da questa storia

- Supplenti con permessi diversi per supplenza breve e lunga (intervista, B-05): fuori dalla v1;
  un supplente lungo si gestisce come cambio di docente (ASS-22).
- Ruolo Segreteria che carica i dati (B-09): fuori dalla v1, i ruoli sono tre (VIN-03).
