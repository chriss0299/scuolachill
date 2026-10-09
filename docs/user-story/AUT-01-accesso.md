# AUT-01 · Accesso: login, logout, primo accesso, reset password

| | |
| --- | --- |
| **Ruolo** | Tutti (Direttore, Docente, Studente/famiglia) |
| **Origine** | Storia aggiunta dal team; nessuna storia della traccia la copre |
| **Requisiti collegati** | FR-AUT-01, FR-EXT-01, NFR-02, NFR-12 · ASS-50, ASS-51, ASS-52, ASS-53, ASS-55 |

## Storia

**Come** utente di ScuolaChill, **voglio** entrare con le mie credenziali, sceglierne di nuove
al primo accesso e recuperarle da solo se le dimentico, **così da** usare il sistema senza
dipendere dalla segreteria.

## Flusso

**Login e logout**

1. L'utente apre ScuolaChill e inserisce identificativo (nome.cognome, ASS-50) e password.
2. Il sistema verifica le credenziali e porta l'utente nell'area del suo ruolo; il Direttore
   inserisce anche il codice del secondo fattore (ASS-55).
3. Con il logout la sessione su quel dispositivo si chiude; «Esci da tutti i dispositivi»
   chiude anche le altre.

**Primo accesso**

1. Alla creazione dell'account (DIR-01, DIR-02) il sistema invia all'email registrata un codice
   monouso valido 72 ore (ASS-53).
2. L'utente accede con il codice e sceglie la password (almeno 10 caratteri).
3. Per l'account Studente il genitore/tutore prende visione dell'informativa sul trattamento
   dei dati prima di continuare.

**Reset password**

1. Dalla pagina di accesso l'utente indica il proprio identificativo.
2. Il sistema risponde sempre con lo stesso messaggio, che l'account esista o no, e invia un
   link valido 60 minuti e per un solo uso.
3. Scelta la nuova password, le sessioni aperte su altri dispositivi si chiudono.

## Scenario principale

La madre di Marco riceve l'email con il codice, accede dal telefono, sceglie la password, legge
l'informativa e passa l'accesso al figlio. Mesi dopo Luca dimentica la password la sera prima di
una verifica e la reimposta da solo in due minuti.

## Scenari alternativi

- Credenziali errate → messaggio generico che non dice quale campo è sbagliato.
- 5 errori in 15 minuti → blocco temporaneo di 15 minuti (ASS-52); la soglia non deve bloccare
  gli altri studenti del laboratorio, che escono dalla stessa rete.
- Account disattivato → «Account non attivo, rivolgiti alla segreteria».
- Sessione scaduta → nuovo login e ritorno alla pagina di partenza.
- Email non arrivata, codice o link scaduti, servizio email fermo → il Direttore rigenera il
  codice e lo consegna stampato (FR-EXT-01).
- Consegna di una verifica → la sessione si chiude, per proteggere i PC condivisi (ASS-51).

## Criteri di accettazione

- **AC-01** Date credenziali errate, quando l'utente accede, allora il messaggio non rivela quale
  campo è sbagliato.
- **AC-02** Dato un identificativo esistente o inesistente, quando si chiede il reset, allora la
  risposta è identica.
- **AC-03** Dato un link di reset già usato o scaduto, quando lo si apre, allora è respinto.
- **AC-04** Dato un primo accesso, quando l'utente entra, allora deve scegliere la password prima
  di qualsiasi altra funzione.
- **AC-05** Dato un utente di un ruolo, quando apre l'area di un altro ruolo, allora è respinto.
- **AC-06** Dato un logout, quando si riusa la sessione chiusa, allora è respinta.
- **AC-07** Dato un reset completato, quando si usano sessioni aperte altrove, allora sono
  respinte.

## Note

Due fratelli condividono l'email del genitore: per questo si accede con un identificativo
generato e non con l'email (ASS-50).
