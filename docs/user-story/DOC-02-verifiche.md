# DOC-02 · Creare, far svolgere e correggere le verifiche

| | |
| --- | --- |
| **Ruolo** | Docente |
| **Origine** | Traccia; interviste al Docente (D-02, D-03, D-04, D-05, D-09, D-15, D-16, D-18) |
| **Requisiti collegati** | FR-VER-01, FR-VER-02, FR-VER-03, FR-VER-04, FR-VER-05, FR-VER-06, FR-VER-07, NFR-01, NFR-07, NFR-11 · VIN-08 · ASS-03, ASS-06, ASS-15 |

## Storia

**Come** docente, **voglio** preparare verifiche con domande di più tipi, farle svolgere al
computer in laboratorio e avere già corrette le domande chiuse, **così da** ridurre il tempo
che oggi passo a correggere.

## Flusso

1. Il docente crea una verifica per una sua classe e materia: titolo, istruzioni, data prevista,
   durata fra 10 e 120 minuti (ASS-15), domande a scelta multipla, vero/falso, aperte e con formule. Ogni
   domanda ha un punteggio legato alla difficoltà; le prime due hanno la risposta corretta.
2. Se la classe ha già una verifica programmata quel giorno, il sistema lo avvisa prima di
   salvare; il docente può confermare (FR-VER-07).
3. Sceglie se mescolare l'ordine di domande e risposte per ogni studente (attivo di default,
   FR-VER-06); il tempo aggiuntivo degli studenti con piano personalizzato si applica da solo.
4. La vede in anteprima come lo studente e la salva in bozza, modificabile liberamente.
5. In laboratorio apre la finestra di svolgimento: solo gli studenti di quella classe la vedono.
6. Durante lo svolgimento vede chi ha iniziato e chi ha consegnato, concede estensioni
   individuali e chiude la finestra.
7. Alla chiusura le domande automatiche sono già corrette (FR-VER-04); il docente corregge
   aperte e formule, anche con punteggi parziali.
8. Il sistema trasforma la percentuale di punteggio in voto con la tabella personale del
   docente (FR-VER-05), che lui crea nel sistema o importa da un foglio di calcolo. Il docente
   conferma o cambia ogni voto proposto: nascono voti in bozza (DOC-03).
9. Dopo il primo avvio da parte di uno studente la verifica si modifica solo come previsto da FR-VER-01. Si può
   duplicare per un'altra classe; con svolgimenti non si elimina, si archivia.

## Scenario principale

La prof.ssa Rossi prepara 10 domande a crocette e 2 esercizi con formule. Alle 9:00 apre la
verifica alla 1A in laboratorio, alle 10:00 la chiude: le crocette sono già corrette. Nel
pomeriggio corregge i due esercizi con punteggi parziali e il sistema le propone i voti con la
sua tabella (minimo 3, sufficienza dal 55%).

## Scenari alternativi

- Domanda automatica senza risposta corretta o verifica senza domande → non si può aprire.
- Errore nella chiave scoperto dopo la consegna → correzione della chiave con ricalcolo per
  tutti e segnalazione dei voti già pubblicati coinvolti (FR-VER-01).
- Docente senza tabella di conversione → vale la tabella predefinita (ASS-06).
- Studente assente → nessuno svolgimento, nessun voto automatico.

## Criteri di accettazione

Gli AC della traccia restano validi (DOC-02 · AC-02 è la modifica dopo lo svolgimento, decisa in
FR-VER-01). Aggiunti dal team:

- **AC-10** Data una verifica già avviata da almeno uno studente, quando il docente la modifica, allora
  sono ammessi solo correzione della chiave, annullamento di una domanda ed estensione della
  finestra.
- **AC-11** Data una correzione della chiave, quando il docente la salva, allora i punteggi di
  tutti gli svolgimenti sono ricalcolati e i voti già pubblicati coinvolti gli vengono segnalati.
- **AC-12** Data una domanda automatica senza risposta corretta, quando il docente apre la
  verifica, allora l'apertura è rifiutata.
- **AC-13** Data una tabella di conversione importata con percentuali sovrapposte o scoperte, o
  con voti fuori scala, quando il docente la salva, allora è rifiutata indicando la riga sbagliata.
- **AC-14** Data una finestra di svolgimento chiusa, quando uno studente prova ad avviare la
  verifica, allora è respinto.
- **AC-15** Data una verifica con l'ordine mescolato, quando due studenti la avviano, allora
  vedono domande e risposte in ordine diverso e la correzione è identica.
- **AC-16** Data una classe con già una verifica programmata in un giorno, quando un docente ne
  programma un'altra lo stesso giorno, allora il sistema lo avvisa prima di salvare.

## Aperto o fuori da questa storia

- Versioni ridotte della verifica per singoli studenti con DSA: fuori dalla v1.
- Correzione automatica di domande aperte e formule: fuori dalla v1.
