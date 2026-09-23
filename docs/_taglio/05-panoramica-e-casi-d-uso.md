## Panoramica e casi d'uso

### ScuolaChill in poche righe

ScuolaChill è il posto unico della scuola per la didattica. Lei, Direttore, crea gli account
di docenti e studenti, forma le classi, decide chi insegna cosa e compone l'orario; da una
sola schermata vede come vanno classi e materie. I docenti caricano il materiale, fanno svolgere
le verifiche al computer in laboratorio, dove le domande a crocette si correggono da sole, e
decidono loro quando i voti diventano visibili. Le famiglie, con un solo accesso per figlio,
vedono dal telefono voti, compiti, note e orario, e possono scrivere ai docenti della classe.
Nessuno vede quello che non lo riguarda.

### User flow e scenari

Regole comuni a tutte le storie: ogni sezione controlla il ruolo lato server prima di mostrare
qualsiasi dato (chi non ha il ruolo torna alla propria area); ogni errore di compilazione indica
il campo e il motivo e conserva i dati già inseriti; ogni elenco è paginato e ricercabile
(NFR-13); se due persone modificano lo stesso dato, il secondo salvataggio viene rifiutato con
l'invito a ricaricare.

#### Accesso (AUT-01..03)

**Storia: AUT-01 · Login e logout**

1. L'utente apre ScuolaChill e inserisce identificativo e password.
2. Il sistema verifica le credenziali e porta l'utente nell'area del suo ruolo.
3. Con il logout la sessione su quel dispositivo si chiude e si torna alla pagina di accesso.

*Scenario principale:* la prof.ssa Rossi accede dal PC della sala docenti e arriva direttamente
alle sue classi. *Scenari alternativi:* credenziali errate → messaggio generico che non dice
quale campo è sbagliato; troppi tentativi → blocco temporaneo; account disattivato → «account
non attivo, rivolgiti alla segreteria»; sessione scaduta → nuovo login e ritorno alla pagina
di partenza.

**Storia: AUT-02 · Primo accesso**

1. Alla creazione dell'account (DIR-01, DIR-02) il sistema invia all'email registrata le
   credenziali temporanee.
2. L'utente accede con le credenziali temporanee.
3. Il sistema impone la scelta di una nuova password; per l'account Studente il genitore/tutore
   prende visione dell'informativa sul trattamento dei dati.
4. L'utente entra nella propria area.

*Scenario principale:* la madre di Marco riceve l'email, accede dal telefono, sceglie la
password, legge l'informativa e passa l'accesso al figlio. *Scenari alternativi:* email non
arrivata o credenziali scadute → il Direttore le rigenera (FR-EXT-01).

**Storia: AUT-03 · Reset password**

1. Dalla pagina di accesso l'utente chiede il reset indicando il proprio identificativo.
2. Il sistema risponde sempre con lo stesso messaggio, che l'account esista o no, e invia
   all'email registrata un link valido per un tempo limitato e usabile una sola volta.
3. L'utente sceglie la nuova password; le sessioni aperte su altri dispositivi si chiudono.

*Scenario principale:* Luca ha dimenticato la password la sera prima di una verifica e la
reimposta da solo in due minuti. *Scenari alternativi:* link scaduto o già usato → nuova
richiesta; servizio email non disponibile → reset dal Direttore (FR-EXT-01).

> Dipendenza: security-privacy (R-09) — identificativo di accesso, durata della sessione,
> soglia di blocco, validità di credenziali temporanee e link di reset.

#### Direttore

**Storia: DIR-01 · Creare e gestire gli account docente**

*User flow* (board, frame 2, esteso al CRUD):

1. Il Direttore apre la sezione Docenti; qualsiasi altro ruolo viene respinto.
2. Apre il form e inserisce nome, cognome ed email.
3. Il sistema controlla, in quest'ordine: campi obbligatori mancanti → errore sul campo; docente
   già esistente (stessa email, ASS-19) → errore specifico; formato non rispettato (email,
   caratteri ammessi nei nomi) → errore specifico; ogni altro problema → errore generico di
   compilazione. In tutti i casi si torna al form con i dati inseriti.
4. Dati validi: il sistema crea l'account e invia le credenziali di primo accesso (AUT-02).
5. Dall'elenco il Direttore apre la scheda del docente, ne legge e modifica i dati e gli
   assegna classi e materie (DIR-03).
6. Disattivazione (soft-delete): il docente non accede più; voti, materiali e verifiche restano
   a suo nome e consultabili. Il Direttore può riattivarlo.

*Scenario principale:* il 5 settembre arriva la prof.ssa Rossi, Matematica. Il Direttore la
crea in un minuto e la assegna alla 1A e alla 2B; lei riceve l'email mentre è ancora in
segreteria.

*Scenari alternativi:* email già usata da un docente disattivato → il sistema propone la
riattivazione invece di un duplicato; invio email fallito → stato «invio fallito» nella scheda
e credenziali rigenerabili (FR-EXT-01); disattivazione di un docente con verifiche aperte →
richiesta di conferma, le verifiche si chiudono.

**Storia: DIR-02 · Creare e gestire gli account studente**

*User flow* (board, frame 3):

1-3. Come DIR-01, con i dati dello studente (nome, cognome, data di nascita), la classe e i
dati del genitore/tutore intestatario (nome, cognome, email). Duplicato = stesso nome, cognome
e data di nascita (ASS-19).
4. La classe indicata esiste ed è attiva nell'anno in corso? No → errore specifico sul campo.
5. Lo studente è già iscritto a una classe? Sì → il sistema lo segnala e chiede «Continuare con
   la procedura di cambio classe?». Sì → trasferimento (DIR-03). No → errore specifico, form.
6. Dati validi: account creato, credenziali inviate all'email del genitore/tutore (AUT-02).
7. Lettura e modifica dei dati anagrafici e dell'email del genitore; la classe cambia solo con
   il trasferimento. Disattivazione (ritiro, fine percorso): accesso bloccato, storico conservato.

*Scenario principale:* Marco, 14 anni, si iscrive in 1C. Il Direttore lo crea con l'email
della madre, che riceve le credenziali.

*Scenari alternativi:* fratelli con la stessa email del genitore → due account distinti
(FR-AUT-01); omonimo con stessa data di nascita → il Direttore conferma che è un'altra persona;
classe piena oltre la soglia indicativa di 30 → avviso, non blocco.

**Storia: DIR-03 · Creare le classi, comporle e trasferire gli studenti**

*User flow, creazione* (board, frame 4):

1. Il Direttore crea una classe: anno di corso (1-5), sezione, anno scolastico, e per ogni
   materia il docente che la insegna.
2. Il sistema controlla: dati mancanti; classe già esistente (stesso anno di corso e sezione
   nello stesso anno scolastico); docenti inseriti correttamente (docente attivo, materia
   esistente, un solo docente titolare per materia); nomenclatura (es. «1A»: cifra 1-5 e
   lettera). Ogni errore è specifico; poi errore generico come in DIR-01.
3. Classe creata; gli studenti entrano da DIR-02 o per trasferimento.
4. Lettura della scheda (studenti, docenti per materia, orario); modifica di sezione e docenti;
   soft-delete solo se la classe non ha studenti attivi. Le materie sono gestite dal Direttore
   con lo stesso schema (FR-DIR-02).

*User flow, trasferimento* (board, frame 5; regole in FR-DIR-01):

1. Dalla scheda dello studente il Direttore avvia il cambio classe e sceglie la destinazione.
2. Studente al primo anno e anno scolastico non ancora iniziato → cambio immediato.
3. In tutti gli altri casi il trasferimento resta «in attesa di consenso» e la famiglia lo vede
   nella propria area. Il Direttore registra l'esito del consenso del genitore/tutore (ASS-05).
4. Consenso dato → cambio eseguito con data; i voti restano allo studente (FR-DIR-01); lo
   studente vede subito orario, materiale e docenti della nuova classe.
5. Consenso negato → nessun cambio, stato «colloquio richiesto» con promemoria al Direttore.

*Scenario principale:* a novembre Giulia chiede di passare dalla 2B alla 2D. Il Direttore avvia
il trasferimento, il padre firma il modulo in segreteria, il Direttore registra il consenso. Da
quel momento Giulia vede l'orario della 2D e i suoi voti di Matematica restano, marcati «2B».

*Scenari alternativi:* destinazione uguale all'origine o disattivata → errore; studente con una
verifica in corso → trasferimento bloccato fino alla consegna; secondo trasferimento mentre uno
è in attesa → rifiutato; eliminazione di una classe con studenti → rifiutata con l'invito a
trasferirli prima.

**Storia: DIR-04 · Vedere tutto**

1. Il Direttore apre la dashboard: studenti, docenti e classi attivi; verifiche aperte oggi;
   trasferimenti in attesa; invii di credenziali falliti; note dell'ultima settimana.
2. Filtra per anno scolastico, quadrimestre, classe, materia.
3. Vede media e distribuzione dei **voti pubblicati** per classe e materia (le bozze non contano).
4. Scende nel dettaglio: classe → studente (voti, note, verifiche svolte); docente → classi,
   materiali, verifiche. Tutto in sola lettura; le modifiche passano dalle sezioni di gestione.

*Scenario principale:* prima dei consigli di dicembre il Direttore filtra la 3A, vede Fisica a
5,1 contro 6,4 d'istituto e apre l'elenco delle verifiche di Fisica.

*Scenari alternativi:* inizio anno senza dati → stato vuoto esplicito; i messaggi non sono
visibili, salvo quelli segnalati (FR-MSG-01).

> Dipendenza: data-modeler (R-08) — letture aggregate per la dashboard.

#### Docente

**Storia: DOC-01 · Caricare e gestire il materiale didattico**

1. Il docente sceglie una delle sue classi e materie (solo quelle assegnate).
2. Carica un file oppure scrive un contenuto, con titolo e descrizione; le formule si vedono
   correttamente.
3. Il sistema controlla tipo e dimensione (ASS-10) e rende il materiale visibile agli studenti
   della classe. Lo stesso materiale si può pubblicare su più classi in un passo.
4. Il docente modifica titolo e descrizione, sostituisce il file, lo elimina (soft-delete:
   sparisce per gli studenti, il docente lo può ripristinare).

*Scenario principale:* il prof. Bianchi carica le slide di Elettrotecnica per la 3A e la 3B.

*Scenari alternativi:* file troppo grande o tipo non ammesso → errore con il limite; caricamento
interrotto → nessun materiale a metà, si riprova; classe non assegnata → rifiuto.

**Storia: DOC-02 · Creare e gestire le verifiche**

1. Il docente crea una verifica per una sua classe e materia: titolo, istruzioni, durata
   (ASS-15), domande di quattro tipi (scelta multipla, vero/falso, aperta, con formule) con
   punteggio e, per le prime due, la risposta corretta.
2. La vede in anteprima come lo studente; la salva in bozza, modificabile liberamente.
3. In laboratorio apre la finestra di svolgimento; solo gli studenti di quella classe la vedono.
4. Durante lo svolgimento vede chi ha iniziato e chi ha consegnato, concede estensioni
   individuali, chiude la finestra.
5. Alla chiusura le domande automatiche sono già corrette; il docente corregge aperte e formule;
   il sistema propone il voto (FR-VER-04), il docente lo conferma o lo cambia: nascono voti in
   bozza (DOC-03).
6. Dopo il primo svolgimento la verifica si modifica solo come previsto da FR-VER-01. Si può
   duplicare per un'altra classe; si elimina (soft-delete) solo se non ha svolgimenti,
   altrimenti si archivia.

*Scenario principale:* la prof.ssa Rossi prepara 10 domande a crocette e 2 esercizi con
formule, alle 9:00 apre la verifica alla 1A in laboratorio, alle 10:00 la chiude; le crocette
sono corrette, lei corregge i due esercizi nel pomeriggio.

*Scenari alternativi:* domanda automatica senza risposta corretta o verifica senza domande →
non si può aprire; errore nella chiave scoperto dopo la consegna → FR-VER-01; studente assente
→ nessuno svolgimento, nessun voto automatico.

**Storia: DOC-03 · Assegnare, pubblicare e correggere i voti**

1. Il docente sceglie classe e materia e vede l'elenco degli studenti.
2. Inserisce i voti: proposti da una verifica oppure manuali (orale, pratico, scritto su carta),
   con data, tipo e commento facoltativo. Valori ammessi: FR-VOT-01.
3. I voti nascono in **bozza**, visibili solo a lui (FR-VOT-02).
4. Pubblica in blocco (tutti i voti di una verifica o una selezione); da quel momento li vedono
   lo studente e la dashboard del Direttore.
5. Può correggere un voto pubblicato indicando il motivo; il valore precedente resta tracciato
   e lo studente vede «modificato il …». L'eliminazione è un soft-delete con motivo.

*Scenario principale:* finita la correzione, la prof.ssa Rossi controlla i 22 voti proposti,
alza di mezzo voto quello di Sara e pubblica tutto con un clic.

*Scenari alternativi:* voto 11, 0, 6,3 o «6+» → rifiutato con errore sul campo (FR-VOT-01);
studente trasferito → i voti già dati restano (FR-DIR-01); studente disattivato → non più
valutabile.

**Storie v1 aggiuntive del docente (forma compatta)**

- **COM-01 · Compiti per casa.** 1. Il docente sceglie classe e materia; 2. scrive testo e data
  di consegna, allegato facoltativo (ASS-10); 3. il compito compare agli studenti della classe
  ordinato per scadenza; 4. modifica ed eliminazione (soft-delete) finché non è scaduto, poi
  resta in sola lettura. *Alternativi:* data nel passato → errore.
- **NOT-01 · Note disciplinari.** 1. Il docente sceglie uno studente di una sua classe; 2.
  scrive la nota; 3. la vedono lo studente interessato (famiglia), i docenti della classe e il
  Direttore (FR-NOT-01); 4. la famiglia ne registra la presa visione. *Alternativi:* stessa nota
  per più studenti → una nota per ciascuno, nessuno vede i nomi degli altri; correzione dopo 24
  ore → solo annullamento motivato (ASS-09).

#### Studente

**Storia: STU-01 · Consultare il materiale didattico**

1. Lo studente apre Materiale e vede le materie della sua classe.
2. Sceglie una materia: elenco dei materiali dal più recente, con ricerca.
3. Apre l'anteprima o scarica il file.

*Scenario principale:* sul bus Marco apre le slide di Informatica dal telefono.

*Scenari alternativi:* rete mobile lenta → l'elenco si carica leggero, il file solo su richiesta
(NFR-05); materiale eliminato dal docente → sparisce; link di un file inoltrato a chi non ha
accesso → non funziona.

**Storia: STU-02 · Svolgere una verifica**

1. In laboratorio lo studente accede e vede «Verifiche disponibili»: solo quelle con la finestra
   aperta per la sua classe.
2. Avvia la verifica: domande e tempo residuo.
3. Ogni risposta si salva da sola mentre scrive, con l'indicatore «salvato» (FR-VER-03).
4. Consegna: riepilogo delle domande senza risposta, conferma, ricevuta con l'orario.
5. Dopo la consegna non può più modificare; vede correzione e voto quando il docente pubblica.

*Scenario principale:* alle 9:05 Sara della 1C apre la verifica di Scienze insieme a 21
compagni, mentre altre tre classi fanno lo stesso: la apre in meno di 2 secondi (NFR-01). A
metà il Wi-Fi cade per un minuto; l'indicatore segna «non salvato, riconnessione», poi torna
«salvato» e non ha perso nulla.

*Scenari alternativi:* connessione che cade o PC che si spegne → ripresa, anche da un'altra
postazione, entro la finestra (FR-VER-03); tempo scaduto o finestra chiusa → consegna automatica
dell'ultimo salvataggio (FR-VER-02); verifica aperta in una seconda scheda o su un altro
dispositivo → la sessione precedente passa in sola lettura (FR-VER-03); verifica non ancora
aperta → non visibile.

**Storia: STU-03 · Consultare i propri voti**

1. Lo studente apre Voti: i voti pubblicati raggruppati per materia, con media indicativa del
   quadrimestre (ASS-07).
2. Apre un voto: data, tipo, commento, docente, classe di origine se diversa dall'attuale.
3. Per i voti da verifica vede le proprie risposte, i punteggi e le correzioni.

*Scenario principale:* uscito da scuola, Luca controlla dal telefono che il 7 di Storia sia
stato pubblicato; la sera la madre vede lo stesso voto con lo stesso accesso.

*Scenari alternativi:* nessun voto nella materia → stato vuoto; voto corretto dal docente →
indicazione «modificato il …».

**Storie v1 aggiuntive rivolte allo studente (forma compatta)**

- **ORA-01 · Orario.** 1. Il Direttore compone l'orario di ogni classe da form: per ogni giorno
  e ora, materia e docente (ASS-17); 2. il sistema rifiuta un docente in due classi alla stessa
  ora; 3. studente e famiglia vedono l'orario della propria classe, il docente il proprio orario
  settimanale; 4. modifiche visibili subito. *Alternativi:* docente non assegnato a quella
  materia nella classe → errore.
- **MSG-01 · Messaggi con i docenti.** 1. Lo studente (o il genitore) sceglie uno dei docenti
  della sua classe; 2. scrive un messaggio di solo testo; 3. il docente lo vede fra le
  conversazioni della classe e risponde; 4. docente o studente possono segnalare un messaggio
  al Direttore (FR-MSG-01). *Alternativi:* docente non più nella classe → conversazione in sola
  lettura; tentativo di scrivere a un altro studente → impossibile per costruzione.

---
