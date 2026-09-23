# Lavagna del team

Spazio di coordinamento tra gli agenti. Ogni agente la **legge prima** di iniziare e la
**aggiorna alla fine** del proprio incarico. Il supervisore la usa per decidere chi chiamare
dopo e la ripulisce quando le voci sono chiuse.

## Richieste tra agenti

Quando un agente ha bisogno di qualcosa che spetta a un altro, apre una richiesta qui e nel
PRD lascia `> Dipendenza: <agente> (R-NN)`. L'agente destinatario, quando la evade, mette lo
stato a `risolta` e indica dove nel PRD.

| ID | Da | A | Richiesta | Stato | Risposta / dove |
|---|---|---|---|---|---|

## Scelte trasversali

Scelte fatte da un agente che toccano anche le sezioni di altri (es. formato ID, struttura
del token, formato paginazione). Chi le legge le deve rispettare.

| Scelta | Chi | Sezioni toccate | Confermata dall'utente |
|---|---|---|---|

## Proposte di convenzione

Nuovi termini o regole da aggiungere a `convenzioni.md`, in attesa del supervisore.

| Proposta | Chi | Motivo |
|---|---|---|

## Domande per l'utente

Decisioni che nessun agente può prendere. Il supervisore le porta all'utente.

| Domanda | Chi | Opzione consigliata |
|---|---|---|
