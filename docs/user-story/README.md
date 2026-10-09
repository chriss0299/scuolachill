# User story di ScuolaChill

Ogni user story ha il proprio file, con storia («Come / voglio / così da»), flusso, scenario
principale, scenari alternativi, criteri di accettazione (*Dato che / Quando / Allora*) e punti
aperti. Il PRD ne riporta per esteso solo tre, una per ruolo (DIR-03, DOC-02, STU-02), e rimanda
qui per le altre. Requisiti (FR, NFR) e assunzioni (ASS) citati sono definiti nel PRD.

Gli AC della traccia restano validi e non sono ripetuti: quelli aggiunti dal team partono da
AC-10 per le storie della traccia e da AC-01 per le storie nuove.

| ID | Storia | Ruolo | Origine | Nel PRD |
| --- | --- | --- | --- | --- |
| [AUT-01](AUT-01-accesso.md) | Accesso: login, logout, primo accesso, reset | Tutti | Team | — |
| [DIR-01](DIR-01-account-docente.md) | Creare e gestire gli account docente | Direttore | Traccia | — |
| [DIR-02](DIR-02-account-studente.md) | Creare e gestire gli account studente | Direttore | Traccia | — |
| [DIR-03](DIR-03-classi-e-trasferimenti.md) | Creare le classi, comporle e trasferire gli studenti | Direttore | Traccia | ✅ |
| [DIR-04](DIR-04-vedere-tutto.md) | Vedere tutto | Direttore | Traccia | — |
| [DOC-01](DOC-01-materiale.md) | Caricare e gestire il materiale didattico | Docente | Traccia | — |
| [DOC-02](DOC-02-verifiche.md) | Creare, far svolgere e correggere le verifiche | Docente | Traccia | ✅ |
| [DOC-03](DOC-03-voti.md) | Assegnare, pubblicare e correggere i voti | Docente | Traccia | — |
| [STU-01](STU-01-materiale.md) | Consultare il materiale didattico | Studente | Traccia | — |
| [STU-02](STU-02-svolgere-verifica.md) | Svolgere una verifica | Studente | Traccia | ✅ |
| [STU-03](STU-03-voti.md) | Consultare i propri voti | Studente | Traccia | — |
| [ORA-01](ORA-01-orario.md) | Comporre e consultare l'orario | Direttore, tutti | Team | — |
| [COM-01](COM-01-compiti.md) | Compiti per casa | Docente, Studente | Team | — |
| [NOT-01](NOT-01-note-disciplinari.md) | Note disciplinari | Docente, Studente, Direttore | Team | — |
| [MSG-01](MSG-01-messaggi.md) | Messaggi fra studente e docente (**fuori dalla v1**) | Studente, Docente | Team | — |

## Regole

- Si aggiorna prima la scheda, poi il PRD se la storia è una delle tre riportate.
- Niente codice, come nel PRD (`docs/team/convenzioni.md`).
- Le fonti sono la traccia, la board Miro (`docs/board-miro.md`) e le interviste
  (`docs/interviste/`).
