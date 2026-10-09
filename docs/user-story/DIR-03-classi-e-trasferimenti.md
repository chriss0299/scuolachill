# DIR-03 · Creare le classi, comporle e trasferire gli studenti

| | |
| --- | --- |
| **Ruolo** | Direttore |
| **Origine** | Traccia; board Miro, frame 4 e 5; intervista al Direttore (B-01, B-02) |
| **Requisiti collegati** | FR-DIR-01, FR-DIR-02, FR-DIR-03 · ASS-05, ASS-12 |

## Storia

**Come** Direttore, **voglio** creare le classi dell'anno, indicare chi insegna ogni materia e
spostare uno studente da una classe all'altra con il consenso della famiglia, **così da**
avere classi corrette senza perdere i voti di nessuno.

## Flusso

**Creazione**

1. Il Direttore crea la classe: anno di corso (1-5), sezione, anno scolastico, e per ogni
   materia il docente titolare.
2. Il sistema controlla: dati mancanti; classe già esistente (stesso anno di corso e sezione
   nello stesso anno scolastico); docente attivo, materia esistente, un solo titolare per
   materia; nome valido («1A»: cifra 1-5 e lettera).
3. Classe creata; gli studenti entrano da DIR-02 o per trasferimento.
4. Si leggono studenti, docenti per materia e orario; si modificano sezione e docenti; la classe
   si elimina solo se non ha studenti attivi. Le materie si gestiscono con lo stesso schema.

**Trasferimento** (regole in FR-DIR-01)

1. Dalla scheda dello studente il Direttore avvia il cambio classe e sceglie la destinazione.
2. Studente al primo anno e anno scolastico non ancora iniziato → cambio immediato.
3. Negli altri casi il trasferimento resta «in attesa di consenso», visibile alla famiglia; il
   Direttore registra esito, data e autore del consenso raccolto per iscritto (ASS-05).
4. Consenso dato → cambio eseguito con data; i voti restano allo studente con la classe di
   origine; lo studente vede subito orario, materiale e docenti della nuova classe.
5. Consenso negato → nessun cambio, stato «colloquio richiesto» con promemoria al Direttore.

## Scenario principale

A novembre Giulia chiede di passare dalla 2B alla 2D. Il Direttore avvia il trasferimento, il
padre firma il modulo in segreteria, il Direttore registra il consenso. Da quel momento Giulia
vede l'orario della 2D e i suoi voti di Matematica restano, marcati «2B».

## Scenari alternativi

- Destinazione uguale all'origine o disattivata → errore.
- Studente con una verifica in corso → trasferimento bloccato fino alla consegna.
- Secondo trasferimento mentre uno è in attesa → rifiutato.
- Eliminazione di una classe con studenti → rifiutata con l'invito a trasferirli prima.

## Criteri di accettazione

Gli AC della traccia restano validi. Aggiunti dal team:

- **AC-10** Data una classe con lo stesso anno di corso e sezione nello stesso anno scolastico,
  quando il Direttore la salva, allora è rifiutata.
- **AC-11** Dato uno studente non al primo anno, o un anno già iniziato, quando il Direttore
  avvia il trasferimento, allora lo studente resta nella classe di origine finché il consenso
  non è registrato.
- **AC-12** Dato un consenso negato, quando il Direttore lo registra, allora la classe resta
  invariata e lo stato diventa «colloquio richiesto».
- **AC-13** Dato un trasferimento eseguito, quando lo studente apre i voti, allora vede anche
  quelli precedenti con la classe di origine.
- **AC-14** Data una classe con studenti attivi, quando il Direttore la elimina, allora
  l'operazione è rifiutata.

## Aperto o fuori da questa storia

- Composizione automatica delle classi (15-25 studenti, gemelli separati, richieste di stare
  con un compagno, B-02): chiesta dal Direttore, fuori dalla v1.
- Corso come indirizzo di studio, con il suo piano di studi (B-01, B-04): fuori dalla v1.
