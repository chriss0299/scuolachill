# STU-02 · Svolgere una verifica

| | |
| --- | --- |
| **Ruolo** | Studente (account di famiglia) |
| **Origine** | Traccia; intervista al Docente (D-09) |
| **Requisiti collegati** | FR-VER-02, FR-VER-03, FR-VER-06, FR-AUT-01, NFR-07, NFR-01, NFR-04, NFR-05, NFR-11 · ASS-02, ASS-03, ASS-15, ASS-56 |

## Storia

**Come** studente, **voglio** svolgere la verifica al computer del laboratorio senza perdere
le risposte se qualcosa si interrompe, **così da** essere valutato su quello che ho scritto
davvero.

## Flusso

1. In laboratorio lo studente accede e vede «Verifiche disponibili»: solo quelle con la
   finestra aperta per la sua classe.
2. Avvia la verifica: domande, nell'ordine scelto per lui se il docente le ha mescolate, e tempo
   residuo, misurato dal sistema e già allungato se ha un piano personalizzato (FR-VER-02,
   FR-VER-06). Il testo si ingrandisce e funziona con la sintesi vocale (NFR-07).
3. Ogni risposta si salva da sola pochi secondi dopo la modifica, con l'indicatore «salvato»
   (FR-VER-03).
4. Consegna: riepilogo delle domande senza risposta, conferma, ricevuta con l'orario.
5. Dopo la consegna non può più modificare; vede correzione e voto quando il docente pubblica.

## Scenario principale

Alle 9:05 Sara della 1C apre la verifica di Scienze insieme a 21 compagni, mentre altre tre
classi fanno lo stesso: la vede in meno di 2 secondi (NFR-01). A metà il Wi-Fi cade per un
minuto; l'indicatore segna «non salvato, riconnessione», poi torna «salvato» e Sara non ha
perso nulla.

## Scenari alternativi

- Connessione che cade o PC che si spegne → ripresa dallo stesso punto, anche da un'altra
  postazione, finché la finestra è aperta (FR-VER-03).
- Tempo scaduto o finestra chiusa → consegna automatica dell'ultimo salvataggio (FR-VER-02).
- Verifica aperta in una seconda scheda o su un altro dispositivo → la sessione precedente passa
  in sola lettura; lo svolgimento resta uno solo.
- Verifica non ancora aperta → non visibile.
- Studente con tempo aggiuntivo → il tempo è già allungato e continua anche se il docente chiude
  la finestra per gli altri; i compagni non vedono la differenza.
- Rete della scuola con indirizzi fissi → la verifica si accetta solo da lì (ASS-56).

## Criteri di accettazione

Gli AC della traccia restano validi. Aggiunti dal team:

- **AC-10** Dati 90 studenti che la aprono nello stesso minuto, quando la aprono, allora il 95%
  la vede entro 2 s (NFR-01).
- **AC-11** Data una connessione caduta, quando lo studente rientra con la finestra aperta,
  allora ritrova tutte le risposte salvate.
- **AC-12** Dato il tempo scaduto o la finestra chiusa, quando lo studente non ha consegnato,
  allora è consegnato l'ultimo salvataggio e non sono possibili modifiche.
- **AC-13** Data la verifica aperta in una seconda scheda o su un altro dispositivo, quando lo
  studente risponde lì, allora la prima sessione passa in sola lettura ed esiste un solo
  svolgimento.
- **AC-14** Dato uno studente con tempo aggiuntivo del 30% e una verifica da 60 minuti, quando la
  avvia, allora ha 78 minuti, anche se il docente chiude la finestra dopo 60, e nessun compagno
  vede la differenza.

## Note

Con la credenziale di famiglia chiunque la conosca potrebbe svolgere la verifica al posto dello
studente: la finestra aperta dal docente in laboratorio è la mitigazione principale (FR-AUT-01).
