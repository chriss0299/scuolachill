# Verbale · Intervista al Direttore

- **Data**: 25/09/2026
- **Intervistato**: l'utente nel ruolo di Direttore (intervista simulata)
- **Intervistatore**: Claude
- **Stato**: validato dall'intervistato il 25/09/2026, con i chiarimenti in fondo

## Cosa fa oggi

### Inizio dell'anno

Segue sempre lo stesso ordine:

1. parte dalla lista dei **corsi**, cioè gli indirizzi di studio (per esempio Informatica);
2. assegna i docenti ai corsi in base alle materie che insegnano;
3. crea le **classi**: un corso può avere più classi nello stesso anno scolastico;
4. assegna i docenti alle classi;
5. inserisce gli studenti nelle classi.

I dati degli studenti arrivano dai **moduli di iscrizione, elaborati dalla segreteria**.

Le classi si formano **su Excel, con un riempimento casuale** e alcune regole:

- una classe ha **da 15 a 25 studenti**;
- i **gemelli** vanno, se possibile, in classi diverse;
- se all'iscrizione la famiglia chiede **esplicitamente** che lo studente stia in classe con un
  compagno preciso, la richiesta si accoglie.

### Orario delle lezioni

- Ogni corso ha un **piano di studi** con le ore settimanali di ciascuna materia.
- Il Direttore dispone le ore in modo da:
  - coprire il monte ore settimanale del corso;
  - non mettere lo stesso docente in due classi alla stessa ora;
  - non assegnare lo stesso **laboratorio** a due classi alla stessa ora;
  - variare la giornata, perché non diventi monotona per gli studenti.
- Il numero e il tipo di laboratori dipendono dall'istituto e dal corso, ma **restano fissi
  per tutto l'anno**.
- Il controllo dei conflitti si fa oggi **a mano su Excel**, con le sue funzioni.

### Supplenze

Quando un docente è assente a lungo arriva un **supplente** che copre le sue classi:

- **supplenza breve**: il supplente non fa verifiche e non dà voti;
- **supplenza lunga**, di mesi: il supplente fa tutto, e il docente titolare **non può
  modificare** i voti dati dal supplente.

### Chi lo cerca e per cosa

- **Docenti**: decisioni didattiche (uscite didattiche), **richieste di materiale nuovo**,
  aiuto nelle situazioni difficili con gli studenti.
- **Famiglie**: non lo cercano quasi mai direttamente; solo per problemi con un docente e per
  consulenza sul cambio di classe o di scuola.

## Cosa gli pesa

1. **Le richieste di materiale si perdono.** Arrivano su carta o a voce. Esempio reale: il
   docente responsabile del laboratorio di informatica ha chiesto su carta 25 sedie da
   ufficio. Se una richiesta si perde resta in sospeso finché chi l'ha fatta non torna a
   chiedere, o finché il Direttore non si accorge da solo che manca qualcosa. Le richieste non
   riguardano solo il materiale didattico ma anche gli arredi.
2. **La gestione dei docenti e degli orari** assegnati a ciascuno.

## Cosa vuole vedere durante l'anno

- La **media generale dei voti, divisa per materia**.
- Più ancora, il **comportamento**: una segnalazione delle **classi con più note
  disciplinari**.

## Bisogni emersi

| # | Bisogno | Da dove | Già nel perimetro v1? |
|---|---|---|---|
| B-01 | Creare corsi, classi, docenti e studenti in quest'ordine | inizio anno | sì (DIR-01..03); il **corso** come entità è nuovo |
| B-02 | Distribuire gli studenti nelle classi rispettando 15-25 per classe, gemelli separati, richieste esplicite di stare con un compagno | formazione classi | **no**: oggi la v1 prevede solo l'inserimento manuale |
| B-03 | Caricare gli studenti partendo dai dati della segreteria invece di inserirli uno per uno | dati dalle iscrizioni | **no**: collegato alla domanda aperta sull'importazione massiva |
| B-04 | Comporre l'orario con il sistema che segnala i conflitti di docente e di laboratorio e controlla il monte ore del piano di studi | orario | in parte: orario sì, ma **laboratori/aule sono fuori scope** e il piano di studi non esiste nel modello |
| B-05 | Assegnare un supplente a un docente assente, con permessi diversi per supplenza breve e lunga | supplenze | **no** |
| B-06 | Tracciare le richieste dei docenti (materiale, arredi) con uno stato, così non si perdono | cosa gli pesa, punto 1 | **no** |
| B-07 | Vedere la media dei voti per materia | durante l'anno | sì (DIR-04) |
| B-08 | Vedere quali classi hanno più note disciplinari | durante l'anno | in parte: le note ci sono, questa vista no |

## Chiarimenti (risposte alle domande di fine intervista)

- **Durata della supplenza**: dipende dal periodo di assenza del docente e dalla disponibilità
  del supplente, che può coprire tutto il periodo o solo una parte. Quindi una stessa assenza
  può essere coperta da più supplenti uno dopo l'altro, ciascuno per un periodo.
- **Voti del supplente**: sono voti dello studente nella materia, quindi il docente titolare
  li **vede** (ma, per una supplenza lunga, non li modifica).
- **Segreteria**: carica i dati degli studenti con un **profilo amministrativo apposito**.
- **Formazione delle classi**: il sistema **compone le classi** in automatico rispettando le
  regole; il Direttore può poi **modificarle a mano**, e a ogni modifica il sistema
  **segnala gli errori** (classe fuori da 15-25, gemelli nella stessa classe, richiesta di
  stare con un compagno non rispettata).

Ne seguono due correzioni ai bisogni:

| # | Bisogno (aggiornato) | Già nel perimetro v1? |
|---|---|---|
| B-02 | Il sistema **compone le classi** rispettando le regole (15-25 studenti, gemelli separati, richieste di stare con un compagno); il Direttore le **ritocca a mano** e il sistema **segnala** ogni regola che la modifica viola | **no** |
| B-09 | Un profilo **Segreteria** che carica i dati degli studenti dalle iscrizioni | **no**: sarebbe un **quarto ruolo**, e oggi `decisioni.md` ne prevede tre |

## Da chiarire

- Supplenza **breve o lunga**: sopra quale durata il supplente può fare verifiche e dare voti?
  (serve un numero, per esempio «oltre 30 giorni»)
