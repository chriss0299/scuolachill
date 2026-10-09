# DIR-04 · Vedere tutto

| | |
| --- | --- |
| **Ruolo** | Direttore |
| **Origine** | Traccia; interviste al Direttore (B-07, B-08, B-14) |
| **Requisiti collegati** | FR-VOT-02, NFR-10, NFR-18 · ASS-07, ASS-23 |

## Storia

**Come** Direttore, **voglio** una vista d'insieme dell'istituto con medie e situazioni da
seguire, **così da** accorgermi presto di classi e materie in difficoltà.

## Flusso

1. Il Direttore apre la vista d'insieme: studenti, docenti e classi attivi; verifiche aperte
   oggi; trasferimenti in attesa; invii di credenziali falliti; note dell'ultima settimana.
2. Filtra per anno scolastico, quadrimestre, classe e materia.
3. Vede media e distribuzione dei **voti pubblicati** per classe e materia; le bozze non contano.
   Vede anche le classi ordinate per numero di note disciplinari dell'ultimo mese e l'elenco
   degli studenti con media sotto il 6 in almeno tre materie nel quadrimestre.
4. Scende nel dettaglio: classe → studente (voti, note, verifiche svolte); docente → classi,
   materiali, verifiche. Tutto in sola lettura: le modifiche passano dalle sezioni di gestione.
5. Se serve ricostruire un accesso ai dati, estrae il registro delle operazioni sensibili di un
   periodo (NFR-18).

## Scenario principale

Prima dei consigli di dicembre il Direttore filtra la 3A, vede Fisica a 5,1 contro 6,4
d'istituto e apre l'elenco delle verifiche di Fisica.

## Scenari alternativi

- Inizio anno senza dati → stato vuoto esplicito.

## Criteri di accettazione

Gli AC della traccia restano validi. Aggiunti dal team:

- **AC-10** Dato un voto in bozza, quando il Direttore apre la vista d'insieme, allora quel voto
  non compare in nessun dato.
- **AC-11** Dato un Docente o uno Studente, quando chiede la vista d'insieme, allora è respinto.
- **AC-12** Dato il Direttore, quando apre la vista d'insieme, allora vede le classi ordinate per
  numero di note disciplinari dell'ultimo mese.
- **AC-13** Dato il Direttore, quando filtra per classe e materia, allora vede media e
  distribuzione entro i tempi di NFR-10.
- **AC-14** Dato il quadrimestre in corso, quando il Direttore apre la vista d'insieme, allora
  vede l'elenco degli studenti con media sotto il 6 in almeno tre materie, calcolata sui soli
  voti pubblicati.

## Note

La vista delle classi con più note (AC-12) viene dall'intervista al Direttore (B-08), che durante
l'anno vuole seguire soprattutto il comportamento. L'elenco degli studenti con più insufficienze
(AC-14) e il registro delle operazioni sensibili (NFR-18) vengono dalla seconda intervista,
simulata su fonti online ([04-direttore-2.md](../interviste/04-direttore-2.md)).
