# Template PRD del corso — riferimento (non modificare)

Riassunto fedele delle istruzioni del template fornito dal docente. Lo scheletro vero è `PRD.MD`.

## Indicazioni generali
- Due parti: **cosa** fa ScuolaChill (prima) e **come** lo si costruisce (seconda), più una terza (tempi e valutazione). Chi legge la prima parte deve capire tutto senza sapere cos'è un framework.
- 15-25 pagine. Se di più, si sta descrivendo invece di decidere.
- Lo storico versioni registra ogni modifica con la sua ragione.

## Prima parte
- **Cosa non è incluso**: la lista più preziosa del documento.
- **Stakeholder**: righe minime Direttore, Docenti, Studenti, Docente del corso (valida il PRD; presentazione e domande), Collaudatori del primo anno (usano ScuolaChill come utenti reali; intervista, collaudo), altri (chi approva, chi paga, chi manterrà il sistema).
- **La scuola immaginata**: tipo di istituto, dove, giornata; tabella con numero studenti, docenti, classi, orario scolastico (es. 8:00-14:00 lun-ven), connettività. Numeri usati poi nella stima del carico.
- **Archetipi** ARC-001 Direttore, ARC-002 Docente, ARC-003 Studente: contesto d'uso, competenze digitali, dispositivo principale, frequenza d'uso. I collaudatori veri sono ragazzi del primo anno: smartphone in corridoio o PC in laboratorio?
- **ScuolaChill in poche righe**: come lo spiegheresti al Direttore in un minuto, niente termini tecnici.
- **User flow e scenari**: per ogni ruolo almeno tre storie principali. Per ciascuna: "Storia: ID · titolo", User flow numerato, Scenario principale (personaggio e situazione concreta), Scenari alternativi (connessione che cade, scadenza superata, doppia scheda aperta…).
- **User story della traccia**: tabella ID | Storia | AC aggiunti dal team | Note per DIR-01 Creare account docente, DIR-02 Creare account studente, DIR-03 Creare classi e comporle, DIR-04 Vedere tutto, DOC-01 Caricare materiale didattico, DOC-02 Creare le proprie verifiche, DOC-03 Assegnare i voti, STU-01 Consultare il materiale didattico, STU-02 Svolgere una verifica, STU-03 Consultare i propri voti. Gli AC della traccia sono il minimo: si aggiungono, non si tolgono, in formato *Dato che / Quando / Allora*.
- **Decisioni lasciate aperte**: formato
  > **FR-[AREA]-[NN] · [Titolo]** (collegato a *ID storia*)
  > Cosa avete deciso, in modo verificabile. *Motivazione:* perché.
  Obbligatorie: scala dei voti (DOC-03: da quanto a quanto, passo, segni + e −); trasferimento studente fra classi (DIR-03: si può? cosa succede ai voti?); modifica di una verifica dopo lo svolgimento (DOC-02); connessione che cade durante una verifica (STU-02); fallimento del servizio esterno (es. email credenziali); altre decisioni scoperte dal team.
- **NFR**: tabella ID | Famiglia | Requisito | Soglia e condizione | Come si verifica | Storie collegate. Esempio: NFR-01 Prestazioni, apertura verifica nel picco, <2 s per il 95% delle richieste con 75 utenti nello stesso minuto, test di carico, STU-02. Righe del template: NFR-01 Prestazioni, 02 Sicurezza, 03 Usabilità, 04 Disponibilità, 05 Ambientale, 06 Supporto, 07 Interazione, 08 Conformità. Famiglie da coprire: prestazioni, disponibilità, scalabilità, sicurezza, conformità, usabilità, ambientali, supporto, interazione; se una resta vuota, scrivere perché. I requisiti trasversali della traccia (HTTPS, paginazione, OpenAPI, errori uniformi, Dev e Prod) sono obbligatori: riportarli con il loro ID.
- **Requisiti impliciti**: intervista di 10 minuti a un ragazzo del primo anno: "Cosa daresti per scontato che un'app di questo tipo faccia sempre, o non faccia mai?". Tabella Chi | Cosa ha detto | Requisito ricavato.
- **Assunzioni** (ID | Assunzione | Cosa succede se è falsa), **Vincoli** (ID | Vincolo | Da dove viene; es. budget cloud = crediti studente, dalla traccia), **Dipendenze** (ID | Dipendenza | Serve entro | Chi se ne occupa; es. account attivo sul servizio email).

## Seconda parte
Si parla al docente e al team. Ogni scelta tecnica motivata e confrontata con almeno un'alternativa; "lo conosciamo" è valido ma non può essere l'unico motivo.
- **Stima del carico**: Utenti concorrenti (uso normale, picco delle 9:00 verifiche, fine quadrimestre voti; con da dove viene il numero). Profilo di carico: Login, Apertura verifica, Consegna verifica, Dashboard Direttore, Caricamento materiale × Frequente/Pesante/Critica/Note. Numeri coerenti con la scuola immaginata e con gli NFR.
- **Scelte tecnologiche**: Backend, Frontend, Database, Provider cloud, Servizi cloud, Regione, Servizio esterno × Scelta | Alternativa | Perché.
- **Architettura**: diagramma dei componenti; tabella livelli Presentation/API, Application/Business, Data access (cosa fa, esempio concreto); dipendenze fra livelli (chi conosce chi, accoppiamento, testabilità).
- **API**: risorse REST; contratto (Verbo | Route | Chi può chiamarla | Payload | Risposte, almeno POST/GET/PUT/PATCH/DELETE); formato uniforme errori con esempio; validazione (dove, regole); paginazione (parametri, default, formato); OpenAPI/Swagger e collezione Postman.
- **Persistenza**: ER con cardinalità; identificatori (incrementali, UUID, …, perché); tabella Tre modelli (Entità | DB | Dominio | API | Dove differiscono e perché); normalizzazione e letture aggregate (voti per materia, dashboard Direttore); accesso ai dati e query parametrizzate contro SQL injection.
- **Sicurezza e integrazione**: autenticazione e token (come si ottiene, cosa contiene, come viaggia il profilo); matrice Operazione × Direttore/Docente/Studente e dove viene fatta rispettare (il frontend non basta mai); API esterna (quale, per cosa, cosa succede se non risponde); configurazione e segreti, Dev vs Prod.
- **Qualità architetturale**: organizzazione del codice; dependency inversion e IoC; testabilità (sostituire DB e API esterne nei test); tabella Development vs Production (Database, Segreti, Log, …).
- **Dimensionamento e costi**: Componente | Servizio | Taglia | Istanze | Costo mensile + Totale; strategia di scalabilità (verticale/orizzontale, manuale/automatica); se la stima è sbagliata (utenti doppi? metà?).
- **Piano di deployment**: come arriva sul cloud, passaggio tra versioni, migrazioni dello schema nel tempo.

## Terza parte
- **Milestone**: PRD validato, prima versione in cloud, collaudo con il primo anno, … (Cosa è pronto | Data | Responsabile). Stima come se andasse tutto bene, poi aggiungi margine.
- **Piano di valutazione**: Metrica | Obiettivo | Come la misurate | Quando (es. collaudatori che completano una verifica senza aiuto 90%; voti persi 0).

## Acceptance Criteria del PRD
Tutte le sezioni presenti; decisi tutti i punti aperti; ogni NFR con soglia e condizione e collegato ad almeno una storia; requisiti impliciti da interviste reali; assunzioni/vincoli/dipendenze separati; carico coerente con scuola e dimensionamento; ogni scelta tecnica con alternativa e motivo; prima parte senza scelte tecniche; storico versioni aggiornato.
