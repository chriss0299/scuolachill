# Interviste e questionari

Materiale di elicitazione dei requisiti: da qui si ricavano le user story e la sezione
«Requisiti impliciti» del PRD.

## Questionario docenti (Google Moduli)

- **Link da mandare ai docenti**: https://docs.google.com/forms/d/e/1FAIpQLScyHh8mWqTZrwx9rd-Pl2CRkaJTa-k7rVcq6V3loiDU4BkkCA/viewform
- **Modifica e risposte**: https://docs.google.com/forms/d/11yEEkoy2AwI9H2xCzws13OuBvzEqglluj33TVINJolQ/edit
  (scheda «Risposte»; accessibile solo al proprietario e ai collaboratori del modulo)
- **Script che l'ha generato**: [modulo-docenti.gs](modulo-docenti.gs)
- **Risposte esportate**: da salvare qui come `risposte-docenti-AAAAMMGG.csv`
  (Risposte → Collega a Fogli → File → Scarica → .csv)

## Interviste simulate

Intervista con l'utente nei tre ruoli, nell'ordine Direttore → Docente → Studente. Verbale
di ciascuna da validare con l'utente prima di ricavarne le storie.

| Ruolo | Stato | Verbale |
|---|---|---|
| Direttore | fatta e validata | [01-direttore.md](01-direttore.md) |
| Docente | fatta, da validare | [02-docente.md](02-docente.md) |
| Studente | da fare | — |

## Per ripartire

1. **Validare** il verbale del Docente e rispondere ai suoi 3 punti «Da chiarire» (valore di
   + e − nelle medie, tabella di conversione personale o unica, contestazione nel sistema o a
   voce).
2. Chiarire il punto rimasto aperto del Direttore: sopra quale durata il supplente fa verifiche
   e dà voti.
3. **Intervista allo Studente** (l'utente risponde come ragazzo del primo anno o come
   genitore). Temi: uso del telefono, voti, compiti, orario, verifiche al computer,
   messaggistica (finora nessuno l'ha chiesta).
4. Raccogliere le risposte reali del questionario docenti (CSV in questa cartella).
5. Mettere in fila tutti i bisogni (B-, D-, poi S-) e **decidere lo scope**. Ogni modifica va
   prima in `docs/decisioni.md`. Nodi già emersi:
   - quarto ruolo **Segreteria** (B-09), mentre la traccia ne ha tre;
   - **laboratori** nell'orario (B-04), oggi fuori scope;
   - composizione automatica delle classi (B-02), supplenti (B-05), richieste di materiale
     (B-06), contestazione della correzione (D-08);
   - voti con **+ e −** e scala **3-10** con tabella non lineare (D-05, D-06), contro le
     proposte del team.
6. Solo dopo, **scrivere le user story** nel PRD (formato in memoria: «Come / voglio / così
   da», AC-01… in Dato che / Quando / Allora) e farle rivedere a `revisore-prd`.
