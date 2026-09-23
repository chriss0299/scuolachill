## Scopo e perimetro

### Perché esiste ScuolaChill

**Dal lato business.** In un istituto tecnico materiale, verifiche, voti, orario e comunicazioni
passano oggi da canali diversi: carta, email personali, chiavette, gruppi di chat. Il Direttore
non ha una vista d'insieme, i docenti ricopiano gli stessi dati più volte e le famiglie vedono i
voti in ritardo. ScuolaChill raccoglie tutto in un unico posto, con tre ruoli e regole chiare
su chi vede cosa.

**Dal lato tecnico.** Serve un sistema unico, usabile dal browser del telefono e del PC, in cui
ogni operazione passa da un solo punto di controllo lato server (VIN-34) e i dati di minori
sono protetti fin dalla progettazione (VIN-05). Deve reggere il picco delle verifiche in
laboratorio (ASS-02) e rimanere entro il budget dei crediti per studenti (VIN-01).

### Cosa è incluso

- **Direttore**: account docente e studente, classi e materie, assegnazione dei docenti a classi
  e materie, cambio classe con consenso della famiglia, orario settimanale, vista d'insieme
  dell'istituto (DIR-01..04, ORA-01).
- **Docente**: materiale didattico, verifiche online con correzione ibrida, voti con bozza e
  pubblicazione, compiti per casa, note disciplinari, risposta ai messaggi (DOC-01..03, COM-01,
  NOT-01, MSG-01).
- **Studente** (account di famiglia): materiale, voti per materia, orario, compiti e note in
  consultazione; svolgimento delle verifiche; messaggi con i docenti della propria classe
  (STU-01..03, MSG-01).
- **Accesso**: login, logout, primo accesso con credenziali inviate per email, reset password
  (AUT-01..03).
- **Gestione completa** di ogni entità: creazione, lettura, modifica ed eliminazione logica
  (soft-delete: il dato sparisce dalle viste ma resta tracciato e recuperabile, FR-DIR-03).

### Cosa non è incluso

Tutte le voci sono **evoluzioni future**, non promesse per la v1.

| Escluso dalla v1 | Perché |
| --- | --- |
| Assenze, presenze, ritardi e giustificazioni | Area a sé con regole proprie; la v1 si concentra su didattica e valutazione |
| Gestione delle aule e prenotazione dei laboratori | Non serve alle user story della traccia |
| Pagamenti (PagoPA) | Richiede l'accreditamento dell'ente e un Partner Tecnologico |
| Modifica dell'orario trascinando le lezioni (drag-and-drop) | La v1 modifica l'orario da form: stesso risultato, meno complessità |
| Correzione automatica di domande aperte e con formule | Un confronto fra testi sbaglia (0,5 contro 1/2); la valutazione simbolica è fuori portata. Le corregge il docente (FR-VER-04) |
| Account separato per il genitore (quarto ruolo) | Decisione di prodotto: credenziale unica di famiglia (FR-AUT-01) |
| Messaggi fra studenti, chat di gruppo, allegati nei messaggi | Minimizzazione dei dati di minori (FR-MSG-01) |
| Consegna online dei compiti per casa | Il compito in v1 è un avviso con scadenza (FR-COM-01) |
| Scrutini, pagelle ufficiali, collegamento ai sistemi ministeriali | Richiedono integrazioni istituzionali |
| Importazione massiva di studenti e docenti da file | ASS-11 |
| Passaggio automatico all'anno successivo (promozioni in blocco) | ASS-12 |
| Supplenze e variazioni giornaliere dell'orario | ASS-17 |
| Notifiche push e app da installare | La v1 è un'applicazione web; gli avvisi si vedono all'accesso |
| Più istituti sulla stessa installazione, lingue diverse dall'italiano | Una sola scuola (ASS-01), solo italiano (ASS-13) |

---
