# DOC-03 · Assegnare, pubblicare e correggere i voti

| | |
| --- | --- |
| **Ruolo** | Docente |
| **Origine** | Traccia; intervista al Docente (D-06, D-07, D-08, D-10) |
| **Requisiti collegati** | FR-VOT-01, FR-VOT-02, FR-DIR-01, FR-DIR-02, NFR-04 · ASS-06, ASS-07 |

## Storia

**Come** docente, **voglio** registrare i voti delle verifiche e delle interrogazioni e
pubblicarli quando ho finito di controllarli, **così da** far vedere i voti a tutti gli
studenti nello stesso momento.

## Flusso

1. Il docente sceglie classe e materia e vede l'elenco degli studenti.
2. Inserisce i voti: proposti da una verifica oppure manuali (orale, pratico, scritto su carta),
   con data, tipo e commento facoltativo. Valori ammessi: da 1 a 10 con mezzi voti e segni «+»
   e «−» (FR-VOT-01).
3. I voti nascono in **bozza**, visibili solo a lui (FR-VOT-02).
4. Li pubblica in blocco (tutti i voti di una verifica o una selezione); da quel momento li
   vedono lo studente e il Direttore.
5. Può correggere un voto pubblicato indicando il motivo: il valore precedente resta tracciato e
   lo studente vede «modificato il …». L'eliminazione richiede anch'essa un motivo.

## Scenario principale

Finita la correzione, la prof.ssa Rossi controlla i 22 voti proposti, porta da 6 a 6+ quello di
Sara e pubblica tutto con un clic: la classe vede i voti nello stesso momento.

## Scenari alternativi

- Voto 11, 0, 6,3 o «10+» → rifiutato con errore sul campo; «6+» e «7−» sono ammessi.
- Studente trasferito → i voti già dati restano allo studente con la classe di origine; il
  docente d'origine può pubblicare le proprie bozze ma non inserirne di nuove (FR-DIR-01).
- Studente disattivato → non più valutabile.
- Studente che contesta la correzione → se ne parla a voce in classe; se il docente cambia idea
  corregge il voto con un motivo.

## Criteri di accettazione

Gli AC della traccia restano validi; AC-01 della traccia si legge come «visibile dopo la
pubblicazione». Aggiunti dal team:

- **AC-10** Dato un valore fuori scala o non previsto da FR-VOT-01 (11, 0, 6,3, «10+»), quando il
  docente salva, allora è rifiutato sul campo; «6+» e «7−» sono accettati.
- **AC-11** Dato un voto in bozza, quando lo studente apre i voti, allora non lo vede; dopo la
  pubblicazione sì.
- **AC-12** Dato un voto pubblicato, quando il docente lo corregge senza motivo, allora è
  rifiutato; con il motivo, il valore precedente resta tracciato.
- **AC-13** Dato un docente non assegnato a classe e materia, quando inserisce un voto, allora è
  rifiutato.

## Aperto o fuori da questa storia

- Valore di «+» e «−» nelle medie: proposto ±0,25, da confermare con il docente (ASS-06).
- Contestazione scritta nel sistema (D-08): fuori dalla v1.
