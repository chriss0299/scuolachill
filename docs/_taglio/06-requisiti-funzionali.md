## Requisiti funzionali

### Le user story della traccia

Gli AC della traccia restano validi e non si ripetono. Quelli aggiunti dal team partono da
**AC-10** per non collidere con la numerazione della traccia; le storie nuove (AUT, ORA, COM,
NOT, MSG) partono da AC-01. Formato: *Dato che / Quando / Allora*.

| ID | Storia | AC aggiunti dal team | Note |
| --- | --- | --- | --- |
| DIR-01 | Creare account docente | **AC-10** Dato che l'utente è Docente o Studente, quando tenta di creare un docente, allora l'operazione è rifiutata e nessun account nasce.<br>**AC-11** Dato un campo obbligatorio vuoto o un'email già usata, quando il Direttore salva, allora il sistema indica il campo e il motivo e conserva gli altri dati.<br>**AC-12** Dato un docente disattivato, quando prova ad accedere, allora è respinto, mentre i suoi voti e materiali restano consultabili.<br>**AC-13** Dato un invio email fallito, quando il Direttore apre la scheda, allora vede «invio fallito» e può rigenerare le credenziali. | Board frame 2; CRUD completo; FR-EXT-01 |
| DIR-02 | Creare account studente | **AC-10** Dato uno studente già iscritto, quando il Direttore lo assegna a un'altra classe, allora il sistema propone il cambio classe e non crea un duplicato.<br>**AC-11** Dato un genitore con due figli, quando il Direttore crea il secondo account con la stessa email, allora nascono due credenziali distinte.<br>**AC-12** Data una classe inesistente o disattivata, quando il Direttore salva, allora riceve un errore sul campo classe.<br>**AC-13** Dato uno studente disattivato, quando la famiglia prova ad accedere, allora è respinta e lo storico resta. | Board frame 3; FR-AUT-01 |
| DIR-03 | Creare classi e comporle | **AC-10** Data una classe con lo stesso anno di corso e sezione nello stesso anno scolastico, quando il Direttore la salva, allora è rifiutata.<br>**AC-11** Dato uno studente non al primo anno, o un anno già iniziato, quando il Direttore avvia il trasferimento, allora la classe non cambia finché non è registrato il consenso.<br>**AC-12** Dato un consenso negato, quando il Direttore lo registra, allora la classe resta invariata e lo stato diventa «colloquio richiesto».<br>**AC-13** Dato un trasferimento eseguito, quando lo studente apre i voti, allora vede anche quelli precedenti con la classe di origine.<br>**AC-14** Data una classe con studenti attivi, quando il Direttore la elimina, allora l'operazione è rifiutata. | Board frame 4 e 5; FR-DIR-01, FR-DIR-02 |
| DIR-04 | Vedere tutto | **AC-10** Dato il Direttore, quando filtra per classe e materia, allora vede media e distribuzione dei soli voti pubblicati entro i tempi di NFR-10.<br>**AC-11** Dato un voto in bozza, quando il Direttore apre la dashboard, allora quel voto non compare in nessun dato.<br>**AC-12** Dato un Docente o uno Studente, quando chiede la dashboard, allora è respinto. | Sola lettura; messaggi esclusi (FR-MSG-01) |
| DOC-01 | Caricare materiale didattico | **AC-10** Dato un file oltre il limite o di tipo non ammesso, quando il docente lo carica, allora è rifiutato con il limite indicato e non resta alcun materiale parziale.<br>**AC-11** Dato un materiale eliminato, quando uno studente lo cerca o usa un vecchio link, allora non lo trova; il docente lo può ripristinare.<br>**AC-12** Data una classe non assegnata al docente, quando vi carica materiale, allora è rifiutato. | ASS-10 |
| DOC-02 | Creare le proprie verifiche | **AC-10** Data una verifica con almeno uno svolgimento, quando il docente la modifica, allora sono ammessi solo correzione della chiave, annullamento di una domanda ed estensione della finestra (FR-VER-01).<br>**AC-11** Data una correzione della chiave, quando il docente la salva, allora i punteggi di tutti gli svolgimenti sono ricalcolati e i voti già pubblicati coinvolti gli vengono segnalati.<br>**AC-12** Data una domanda automatica senza risposta corretta, quando il docente apre la verifica, allora l'apertura è rifiutata.<br>**AC-13** Data una finestra chiusa, quando uno studente prova ad avviare la verifica, allora è respinto. | FR-VER-01..04 |
| DOC-03 | Assegnare i voti | **AC-10** Dato un valore fuori scala o con passo diverso da 0,5 (11, 0, 6,3, «6+»), quando il docente salva, allora è rifiutato con errore sul campo.<br>**AC-11** Dato un voto in bozza, quando lo studente apre i voti, allora non lo vede; dopo la pubblicazione sì.<br>**AC-12** Dato un voto pubblicato, quando il docente lo corregge senza motivo, allora è rifiutato; con il motivo, il valore precedente resta tracciato.<br>**AC-13** Dato un docente non assegnato a classe e materia, quando inserisce un voto, allora è rifiutato. | AC-01 della traccia letto come «visibile dopo la pubblicazione»; FR-VOT-01, FR-VOT-02 |
| STU-01 | Consultare il materiale | **AC-10** Dato un materiale di un'altra classe, quando lo studente lo richiede anche conoscendone il link, allora è respinto.<br>**AC-11** Dato un telefono in rete mobile, quando lo studente apre il materiale di una materia, allora l'elenco compare entro i tempi di NFR-10. | NFR-05 |
| STU-02 | Svolgere una verifica | **AC-10** Dati 90 studenti che la aprono nello stesso minuto, quando la aprono, allora il 95% la vede entro 2 s (NFR-01).<br>**AC-11** Data una connessione caduta, quando lo studente rientra con la finestra aperta, allora ritrova tutte le risposte salvate.<br>**AC-12** Dato il tempo scaduto o la finestra chiusa, quando lo studente non ha consegnato, allora viene consegnato l'ultimo salvataggio e non sono possibili modifiche.<br>**AC-13** Data la verifica aperta in una seconda scheda, quando lo studente risponde lì, allora la prima passa in sola lettura ed esiste un solo svolgimento. | FR-VER-02, FR-VER-03 |
| STU-03 | Consultare i propri voti | **AC-10** Dato uno studente, quando apre i voti, allora li vede raggruppati per materia con data, tipo e media indicativa.<br>**AC-11** Dato uno studente, quando chiede i voti di un altro studente, allora è respinto.<br>**AC-12** Dato un voto corretto dopo la pubblicazione, quando lo studente lo apre, allora vede «modificato il …». | ASS-07 |
| AUT-01 | Login e logout | **AC-01** Date credenziali errate, quando l'utente accede, allora il messaggio non rivela quale campo è sbagliato.<br>**AC-02** Dato un utente di un ruolo, quando apre l'area di un altro ruolo, allora è respinto.<br>**AC-03** Dato un logout, quando si riusa la sessione chiusa, allora è respinta. | Soglie in «Autenticazione e token» |
| AUT-02 | Primo accesso | **AC-01** Dato un primo accesso, quando l'utente entra, allora deve cambiare password prima di qualsiasi altra funzione.<br>**AC-02** Date credenziali temporanee scadute, quando l'utente le usa, allora è respinto e invitato a rivolgersi al Direttore. | FR-EXT-01 |
| AUT-03 | Reset password | **AC-01** Dato un identificativo esistente o no, quando si chiede il reset, allora la risposta è identica.<br>**AC-02** Dato un link già usato o scaduto, quando lo si apre, allora è respinto.<br>**AC-03** Dato un reset completato, quando si usano sessioni aperte altrove, allora sono respinte. | FR-EXT-01 |
| ORA-01 | Consultare e gestire l'orario | **AC-01** Dato un docente già impegnato a quell'ora, quando il Direttore lo inserisce in un'altra classe, allora è rifiutato.<br>**AC-02** Dato uno studente, quando apre l'orario, allora vede solo quello della sua classe. | FR-ORA-01 |
| COM-01 | Compiti per casa | **AC-01** Data una scadenza nel passato, quando il docente salva, allora è rifiutata.<br>**AC-02** Dato un compito, quando uno studente di un'altra classe lo cerca, allora non lo vede. | FR-COM-01 |
| NOT-01 | Note disciplinari | **AC-01** Data una nota, quando la cerca un altro studente, allora non la vede.<br>**AC-02** Data una nota di oltre 24 ore, quando l'autore la modifica, allora è rifiutato; può solo annullarla con motivo.<br>**AC-03** Data una nota, quando la famiglia ne prende visione, allora data e ora sono registrate. | FR-NOT-01, ASS-09 |
| MSG-01 | Messaggi studente ↔ docente | **AC-01** Dato un docente che non insegna nella classe, quando lo studente gli scrive, allora è respinto.<br>**AC-02** Dato un messaggio inviato, quando il mittente prova a modificarlo, allora è respinto.<br>**AC-03** Dato un messaggio segnalato, quando il Direttore apre le segnalazioni, allora vede solo quel messaggio. | FR-MSG-01, ASS-08 |

### Le decisioni lasciate aperte dalla traccia

#### Obbligatorie per la traccia

> **FR-VOT-01 · Scala dei voti** (collegato a *DOC-03*, *STU-03*)
> Voti da 1 a 10 con passo 0,5: sono ammessi 19 valori (1; 1,5; …; 9,5; 10). I segni «+» e «−»
> non sono ammessi: chi li usa sulla carta registra il mezzo voto (corrispondenza consigliata
> nella guida: «6+» → 6,5; «6−» → 5,5). Qualsiasi altro valore è rifiutato con un errore
> puntuale sul campo.
> *Motivazione:* i segni non hanno un valore numerico condiviso (6+ vale 6,25 o 6,5?), quindi
> renderebbero ambigue medie e dashboard. Il mezzo voto copre lo stesso bisogno senza ambiguità.

> **FR-DIR-01 · Trasferimento fra classi** (collegato a *DIR-02*, *DIR-03*)
> Il trasferimento è consentito. Se lo studente è al primo anno e l'anno scolastico non è
> iniziato, il cambio è immediato; in ogni altro caso serve il consenso del genitore/tutore,
> registrato dal Direttore (ASS-05). Consenso negato → nessun cambio e colloquio richiesto.
> I voti restano allo studente e alla materia, con la classe di origine registrata: lo studente
> li vede tutti, il docente della nuova classe li vede in sola lettura, il docente d'origine può
> ancora pubblicare le proprie bozze ma non inserirne di nuove. Il trasferimento è bloccato
> mentre lo studente ha una verifica in corso.
> *Motivazione:* il voto misura lo studente in una materia, non la classe; spostarlo o
> cancellarlo falserebbe la media del quadrimestre. La regola del consenso viene dalla board.

> **FR-VER-01 · Modifica di una verifica dopo lo svolgimento** (collegato a *DOC-02*)
> Finché nessuno studente l'ha avviata, la verifica è modificabile liberamente. Dal primo
> svolgimento testo, domande e punteggi sono bloccati; il docente può solo: (a) correggere la
> risposta esatta di una domanda automatica, con ricalcolo dei punteggi di tutti e segnalazione
> dei voti già pubblicati coinvolti; (b) annullare una domanda, esclusa dal punteggio per tutti;
> (c) prolungare la finestra o concedere estensioni individuali. Per altro serve una copia.
> *Motivazione:* tutti gli studenti devono essere valutati sulla stessa prova; le tre eccezioni
> coprono gli errori reali del docente senza svantaggiare nessuno.

> **FR-VER-02 · Finestra e tempo di svolgimento** (collegato a *DOC-02*, *STU-02*)
> Una verifica si svolge solo mentre il docente tiene aperta la finestra. Il tempo di ciascuno
> studente parte dall'avvio, è misurato dal sistema e non si ferma se la connessione cade
> (ASS-15). A tempo scaduto o a finestra chiusa, l'ultimo salvataggio è consegnato in automatico.
> *Motivazione:* la finestra in classe è la mitigazione dichiarata del rischio dell'account di
> famiglia (FR-AUT-01); un tempo misurato sul dispositivo sarebbe aggirabile.

> **FR-VER-03 · Connessione che cade durante una verifica** (collegato a *STU-02*)
> Ogni risposta si salva automaticamente entro pochi secondi dalla modifica e lo studente vede
> sempre lo stato («salvato» / «non salvato, riconnessione»). Se la connessione cade o il PC si
> spegne, lo studente riprende dallo stesso punto, anche da un'altra postazione, finché la
> finestra è aperta. Esiste un solo svolgimento per studente: aprirlo in una seconda scheda o
> dispositivo mette in sola lettura la sessione precedente.
> *Motivazione:* 25 postazioni sullo stesso Wi-Fi rendono probabili cadute brevi; la regola
> «nessuna risposta salvata persa» è misurata (NFR-04). La sessione unica evita due versioni
> diverse delle stesse risposte.

> **FR-EXT-01 · Fallimento del servizio email** (collegato a *DIR-01*, *DIR-02*, *AUT-02*, *AUT-03*)
> La creazione dell'account non dipende dall'email: l'account nasce comunque. L'invio viene
> ritentato automaticamente più volte; lo stato («in coda», «inviata», «fallita») è visibile
> nella scheda e gli invii falliti compaiono nella dashboard del Direttore. Il Direttore può
> rigenerare credenziali temporanee e consegnarle a mano (stampa); il reset password può farlo
> lui al posto dell'utente. Le password non sono mai visibili, si rigenerano.
> *Motivazione:* a settembre un'interruzione del servizio non deve bloccare l'avvio dell'anno;
> il Direttore è l'unico interlocutore che le famiglie già conoscono.
> Dipendenza: security-privacy (R-11) — numero e cadenza dei tentativi, consegna sicura delle credenziali rigenerate.

#### Scoperte dal team

> **FR-VOT-02 · Voti in bozza e pubblicati** (collegato a *DOC-03*, *STU-03*, *DIR-04*)
> Ogni voto nasce in bozza, visibile solo al docente autore; diventa visibile a studente e
> Direttore solo con la pubblicazione, anche in blocco. Un voto pubblicato si corregge o si
> elimina (soft-delete) solo con un motivo; valore precedente, autore e data restano tracciati.
> *Motivazione:* il docente rivede i voti prima che le famiglie li vedano; la tracciabilità
> tutela docente e famiglia in caso di contestazione.

> **FR-VER-04 · Correzione ibrida** (collegato a *DOC-02*, *STU-02*)
> Scelta multipla e vero/falso sono corrette dal sistema; domande aperte e con formule sempre
> dal docente. A correzione completa il sistema propone il voto dal punteggio (ASS-06), che il
> docente conferma o cambia prima che diventi una bozza.
> *Motivazione:* la correzione automatica delle formule sbaglia su risposte equivalenti (0,5
> contro 1/2); meglio affidabile che automatica.

> **FR-AUT-01 · Account Studente = credenziale di famiglia** (collegato a *DIR-02*, *AUT-02*)
> Ogni studente ha un solo account, intestato al genitore/tutore, usato sia dallo studente sia
> dalla famiglia; non esiste un ruolo Genitore. Due fratelli hanno due account distinti anche con
> la stessa email del genitore. Il genitore/tutore è titolare del consenso al cambio classe.
> Rischio dichiarato: chi conosce la credenziale può svolgere le verifiche; mitigazione
> FR-VER-02 e ASS-03.
> *Motivazione:* tre ruoli come da traccia (VIN-03), un solo accesso da gestire per famiglia.
> Dipendenza: security-privacy (R-09) — identificativo di accesso unico per fratelli con la stessa email.

> **FR-DIR-02 · Materie e assegnazione dei docenti** (collegato a *DIR-03*, *DOC-01..03*)
> Il Direttore gestisce l'elenco delle materie (CRUD con soft-delete) e, per ogni classe, quale
> docente insegna quale materia. Un docente opera solo sulle coppie classe-materia assegnate:
> materiale, verifiche, voti, compiti e note escono da questo perimetro.
> *Motivazione:* è l'unico modo di dire «le sue classi» in modo verificabile.
> Dipendenza: data-modeler (R-08) — nuova entità per l'assegnazione docente-classe-materia.

> **FR-DIR-03 · Soft-delete ovunque** (collegato a tutte le storie con CRUD)
> Nessun dato gestito si cancella fisicamente dalle funzioni dell'applicazione: l'eliminazione
> lo nasconde dalle viste, registra chi e quando, ed è reversibile da chi ne ha il permesso.
> La cancellazione definitiva avviene solo per scadenza dei tempi di conservazione (NFR-08).
> *Motivazione:* voti, note e verifiche hanno valore di prova; un errore di clic non deve
> distruggerli.

> **FR-MSG-01 · Chi scrive a chi** (collegato a *MSG-01*)
> Lo studente (account di famiglia) scrive solo ai docenti che insegnano nella sua classe; il
> docente solo agli studenti delle sue classi. Mai fra studenti, niente gruppi, solo testo
> (ASS-16). I messaggi non si modificano né si cancellano dopo l'invio. Il Direttore non li
> legge, salvo quelli segnalati da docente o studente (ASS-08).
> *Motivazione:* minimizzazione e tutela dei minori; la segnalazione dà una via d'uscita senza
> sorveglianza generalizzata.
> Dipendenza: security-privacy (R-10) — conservazione e accesso ai messaggi.

> **FR-NOT-01 · Visibilità delle note disciplinari** (collegato a *NOT-01*)
> Una nota è sempre individuale e la vedono solo lo studente interessato (famiglia), i docenti
> della sua classe e il Direttore. L'autore la modifica entro 24 ore, poi può solo annullarla
> con un motivo (ASS-09). La famiglia registra la presa visione.
> *Motivazione:* la nota è un dato sensibile di un minore; la presa visione sostituisce la firma
> sul libretto.
> Dipendenza: security-privacy (R-10) — conservazione delle note.

> **FR-ORA-01 · Orario settimanale** (collegato a *ORA-01*)
> Un solo orario per classe e per anno, composto da form dal Direttore (giorno, ora, materia,
> docente, ASS-17). Un docente non può stare in due classi alla stessa ora; la materia deve
> essere assegnata a quel docente in quella classe.
> *Motivazione:* copre la board («classi hanno orari delle lezioni») senza il drag-and-drop.

> **FR-COM-01 · Compiti per casa** (collegato a *COM-01*)
> Il compito è un avviso con testo, scadenza e allegato facoltativo, legato a classe e materia;
> nessuna consegna online. Modificabile finché non scade, poi in sola lettura.
> *Motivazione:* copre la board («compiti per casa» visibili allo studente) con il minimo.

---
