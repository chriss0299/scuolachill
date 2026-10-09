# DIR-02 · Creare e gestire gli account studente

| | |
| --- | --- |
| **Ruolo** | Direttore |
| **Origine** | Traccia; board Miro, frame 3; intervista al Direttore (B-01, B-03) |
| **Requisiti collegati** | FR-AUT-01, FR-DIR-01, FR-DIR-03, FR-EXT-01, FR-VER-06, NFR-08 · ASS-11, ASS-19 |

## Storia

**Come** Direttore, **voglio** creare l'account di ogni studente intestato al suo
genitore/tutore e iscriverlo a una classe, **così da** dare a famiglia e studente un solo
accesso ai dati del ragazzo.

## Flusso

1. Il Direttore apre il form: nome, cognome e data di nascita dello studente, classe, e nome,
   cognome ed email del genitore/tutore intestatario.
2. Il sistema controlla campi obbligatori, duplicato (stessi nome, cognome e data di nascita,
   ASS-19) e formato, come in DIR-01.
3. La classe non esiste o non è attiva nell'anno in corso → errore sul campo.
4. Lo studente è già iscritto a una classe → il sistema chiede «Continuare con la procedura di
   cambio classe?». Sì → trasferimento (DIR-03); no → si torna al form.
5. Dati validi: account creato, codice di primo accesso all'email del genitore (AUT-01).
6. Si modificano anagrafica ed email del genitore; la classe cambia solo con il trasferimento.
   Per gli studenti con piano didattico personalizzato il Direttore registra la sola
   percentuale di tempo aggiuntivo nelle verifiche, mai la diagnosi (FR-VER-06).
7. Disattivazione (ritiro, fine percorso): accesso bloccato, storico conservato.

## Scenario principale

Marco, 14 anni, si iscrive in 1C. Il Direttore lo crea con l'email della madre, che riceve il
codice e attiva l'account dal telefono.

## Scenari alternativi

- Fratelli con la stessa email del genitore → due account distinti (FR-AUT-01).
- Omonimo con stessa data di nascita → il Direttore conferma che è un'altra persona.
- Classe oltre i 30 studenti → avviso, non blocco.
- Invio email fallito → come DIR-01 · AC-13.

## Criteri di accettazione

Gli AC della traccia restano validi. Aggiunti dal team:

- **AC-10** Dato uno studente già iscritto, quando il Direttore lo assegna a un'altra classe,
  allora il sistema propone il cambio classe e non crea un duplicato.
- **AC-11** Dato un genitore con due figli, quando il Direttore crea il secondo account con la
  stessa email, allora nascono due credenziali distinte.
- **AC-12** Data una classe inesistente o disattivata, quando il Direttore salva, allora riceve
  un errore sul campo classe.
- **AC-13** Dato uno studente disattivato, quando la famiglia prova ad accedere, allora è
  respinta e lo storico resta.

## Aperto o fuori da questa storia

- Caricamento degli studenti dai dati della segreteria (B-03) e importazione massiva (ASS-11):
  fuori dalla v1; a settembre servono circa 22 ore di inserimento manuale.
