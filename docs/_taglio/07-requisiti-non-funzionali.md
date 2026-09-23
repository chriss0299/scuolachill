## Requisiti non funzionali

Tutte le famiglie del template sono coperte. I requisiti trasversali della traccia sono
NFR-12..16. Le soglie si basano su ASS-01 e ASS-02.

| ID | Famiglia | Requisito | Soglia e condizione | Come si verifica | Storie collegate |
| --- | --- | --- | --- | --- | --- |
| NFR-01 | Prestazioni | Apertura della verifica nel picco | < 2 s per il 95% delle richieste, con 90 studenti che la aprono nello stesso minuto | Test di carico che simula 4 classi in verifica | STU-02 |
| NFR-02 | Sicurezza | Ogni operazione controlla identità e ruolo lato server; nessuno vede dati che non lo riguardano | 100% dei casi della matrice ruoli × operazioni superati; 0 accessi a dati di altri studenti, anche manipolando le richieste | Test automatici per ogni operazione e ruolo; prova manuale di manomissione | tutte |
| NFR-03 | Usabilità | Le operazioni chiave si completano senza aiuto | ≥ 90% dei collaudatori completa una verifica senza aiuto; ≥ 90% trova il voto di una materia entro 30 s | Osservazione durante il collaudo | STU-02, STU-03 |
| NFR-04 | Disponibilità | Servizio disponibile in orario scolastico, nessuna perdita di risposte e voti | ≥ 99,5% al mese nella fascia 7:30-14:30 lun-ven (≈ 45 min di fermo al mese); 0 risposte salvate e 0 voti persi; copia dei dati almeno giornaliera, ripristino entro 4 h | Monitoraggio esterno; prova di ripristino prima del collaudo | STU-02, DOC-03 |
| NFR-05 | Ambientale | Funziona nelle condizioni reali: telefono in rete mobile, laboratorio su Wi-Fi condiviso | Area Studente usabile da 360 px di larghezza; prima schermata < 3 s su rete mobile 4G; 25 postazioni sullo stesso Wi-Fi senza violare NFR-01 | Prova su telefono reale con rete limitata; prova in laboratorio (DIP-05) | STU-01, STU-02, STU-03 |
| NFR-06 | Supporto | Le operazioni ricorrenti non richiedono il team | Il Direttore rigenera credenziali e riattiva account da solo; ogni errore ha un messaggio comprensibile e un codice citabile; guida di una pagina per ruolo; segnalazioni in collaudo prese in carico entro 1 giorno lavorativo | Revisione dei messaggi di errore; registro delle segnalazioni | DIR-01, DIR-02, AUT-02, AUT-03 |
| NFR-07 | Interazione | Interfaccia accessibile e coerente nelle tre aree | Livello AA delle linee guida WCAG 2.1 sulle schermate principali; il colore non porta mai da solo l'informazione (il voto ha sempre il numero); tema chiaro e scuro; tutte le azioni raggiungibili da tastiera su PC | Controllo automatico di accessibilità e prova manuale | tutte |
| NFR-08 | Conformità | Trattamento dei dati personali, anche di minori, conforme al GDPR | Solo i dati necessari a ogni funzione; tempi di conservazione definiti per note, messaggi e svolgimenti; informativa al primo accesso; dati conservati nello Spazio Economico Europeo; consultazioni delle note tracciate | Checklist di conformità revisionata con il referente protezione dati | NOT-01, MSG-01, DIR-02, AUT-02 |
| NFR-09 | Scalabilità | Regge un carico doppio senza cambiare architettura | Con 180 studenti nello stesso minuto e 500 utenti attivi: apertura verifica < 3 s per il 95%, nessun errore; l'aumento si ottiene solo con la configurazione | Test di carico a 2× | STU-02, DIR-04 |
| NFR-10 | Prestazioni | Operazioni correnti reattive nell'ora di punta | Con 250 utenti attivi: letture (elenchi, voti, materiale) < 1 s per il 95%; dashboard < 3 s per il 95%, con dati aggiornati entro 5 min dalla pubblicazione di un voto | Test di carico sul profilo dell'ora di punta | DIR-04, STU-01, STU-03 |
| NFR-11 | Prestazioni | Salvataggio e consegna delle risposte | Salvataggio di una risposta < 1 s e consegna < 3 s, per il 95%, con 90 studenti che consegnano nello stesso minuto | Test di carico | STU-02 |
| NFR-12 | Sicurezza (traccia: HTTPS) | Comunicazioni sempre cifrate | 100% del traffico cifrato; richieste in chiaro rifiutate o reindirizzate | Scansione dell'indirizzo pubblico | tutte |
| NFR-13 | Prestazioni (traccia: paginazione) | Elenchi sempre paginati | Nessun elenco restituisce tutti gli elementi in una volta; dimensione di pagina con default e massimo (valori in «Errori, validazione e paginazione») | Test su ogni elenco con 600 studenti | DIR-01..04, DOC-03, STU-01 |
| NFR-14 | Supporto (traccia: OpenAPI e Postman) | Interfaccia del sistema documentata e provabile | 100% delle operazioni descritte in una specifica standard; collezione di richieste di prova eseguita con esito positivo prima di ogni rilascio | Controllo automatico prima del rilascio | tutte |
| NFR-15 | Interazione (traccia: errori uniformi) | Errori in formato unico | Ogni errore ha lo stesso formato con codice, messaggio e campo coinvolto; mai dettagli interni esposti | Test sui casi di errore di ogni operazione | DIR-01..03, DOC-03 |
| NFR-16 | Supporto (traccia: Dev e Prod) | Ambienti separati | Sviluppo e Produzione con dati, configurazione e segreti separati; dati reali mai in sviluppo; si passa dall'uno all'altro senza modificare il codice | Checklist di rilascio | tutte |

> Dipendenza: dimensionamento (R-12) — verifica che NFR-01, 04, 09, 10, 11 siano sostenibili nel budget (VIN-01).

### Requisiti impliciti

Domanda posta a un ragazzo del primo anno (10 minuti): «Cosa daresti per scontato che un'app
di questo tipo faccia sempre, o non faccia mai?».

| Chi | Cosa ha detto | Requisito ricavato |
| --- | --- | --- |
| [DA COMPILARE: nome, classe] | [DA COMPILARE: risposta testuale] | [DA COMPILARE: FR/NFR ricavato o esistente] |
| [DA COMPILARE] | [DA COMPILARE] | [DA COMPILARE] |
| [DA COMPILARE] | [DA COMPILARE] | [DA COMPILARE] |

> Nota: la tabella va compilata dopo l'intervista reale (DIP-04); nessuna risposta è stata
> inventata. I requisiti ricavati si aggiungono come FR o NFR con il numero libero successivo.

---
