# Verbale · Intervista allo Studente

- **Data**: 09/10/2026
- **Intervistato**: **studente simulato** (14 anni, primo anno di un istituto tecnico), impersonato
  da Claude
- **Fonti usate per la simulazione**: sondaggi Skuola.net su registro elettronico e voti,
  articoli di stampa sullo stress da registro elettronico, recensioni delle app di registro
  elettronico più diffuse (elenco in fondo)
- **Stato**: **simulata, non è un'intervista reale**. Va ripetuta con un ragazzo vero del primo
  anno prima della consegna (DIP-04); le risposte reali sostituiscono queste.

Domanda del template, posta per prima: *«Cosa daresti per scontato che un'app di questo tipo
faccia sempre, o non faccia mai?»*

Nelle risposte, **[fonte]** indica un'opinione documentata dalle fonti; **[supposizione]** è
un'ipotesi della simulazione, da verificare.

## Cosa fa oggi

- Usa il telefono per tutto; il PC solo in laboratorio. **[fonte: il 58% degli studenti usa lo
  smartphone per la didattica]**
- Guarda il registro elettronico soprattutto per **voti**, **compiti per domani** e
  **orario**, di solito la sera o prima di entrare. **[supposizione]**
- L'app del registro a volte non lo fa entrare o si blocca, e deve rifare il login.
  **[fonte: recensioni negative su login, crash e lentezza]**
- Le notifiche arrivano per qualsiasi cosa, anche per gli avvisi della scuola, e non si capisce
  cosa è importante. **[fonte]**

## Cosa darebbe per scontato (sempre)

1. «Che le risposte della verifica non si perdano se cade il Wi-Fi.» **[supposizione, coerente
   con il contesto del laboratorio]**
2. «Che si apra subito e non mi butti fuori ogni volta: entro una volta e basta.» **[fonte:
   lamentele sul login]**
3. «Che appena apro veda i compiti per domani e l'orario di oggi, senza cercarli.»
   **[supposizione]**
4. «Che il voto sia giusto e uguale a quello che mi ha detto il prof.» **[fonte: segnalazioni di
   voti errati o non sincronizzati]**
5. «Che si possa usare col tema scuro la sera.» **[supposizione]**

## Cosa non dovrebbe fare mai

1. «Far vedere il voto a mia madre prima che il prof ce lo abbia detto in classe: voglio
   spiegarglielo io.» **[fonte: il 51% degli studenti vorrebbe che il registro non si aggiornasse
   in tempo reale, per spiegare di persona i brutti voti]**
2. «Far vedere ai compagni i miei voti o le mie note.» **[supposizione]**
3. «Riempirmi di notifiche.» **[fonte: notifiche percepite come ansiogene da studenti e genitori]**
4. «Farmi vedere la media che cambia a ogni voto come se fosse una classifica.» **[fonte: ansia
   legata alla media sempre aggiornata]**

## Messaggi ai docenti

«Al prof lo chiedo a voce, in classe o in corridoio. Forse mia madre gli scriverebbe, se non
potesse venire ai colloqui.» **[supposizione]**: le fonti non dicono nulla di specifico, quindi
la domanda resta aperta per l'intervista reale.

## Bisogni emersi

| # | Bisogno | Già nel perimetro v1? |
| --- | --- | --- |
| S-01 | Nessuna risposta persa in verifica se cade la connessione | sì (FR-VER-03, NFR-04) |
| S-02 | Login che regge e sessione che non scade di continuo sul proprio telefono | sì (ASS-51 «Ricordami», NFR-05) |
| S-03 | Compiti per domani e orario di oggi subito visibili all'apertura | **no**: nuovo requisito (NFR-17) |
| S-04 | Voti corretti e coerenti con quanto detto in classe | sì (FR-VOT-02, voti tracciati) |
| S-05 | Il voto visibile alla famiglia solo dopo che il docente lo ha comunicato in classe | sì in parte: il voto è visibile solo dopo la pubblicazione del docente (FR-VOT-02); da dire esplicitamente |
| S-06 | Voti e note invisibili ai compagni | sì (NFR-02, FR-NOT-01) |
| S-07 | Niente valanga di notifiche | sì: la v1 non ha notifiche push |
| S-08 | Media presentata come indicativa, non come classifica | sì (ASS-07); nessun confronto con i compagni |
| S-09 | Tema scuro | sì (NFR-07) |
| S-10 | Messaggi al docente | **incerto**: lo studente preferisce parlare a voce; forse utile al genitore |

## Fonti

- [Tecnica della Scuola: «Registro elettronico, per il 51% degli alunni non va aggiornato in tempo reale»](https://www.tecnicadellascuola.it/registro-elettronico-per-il-51-degli-alunni-non-va-aggiornato-in-tempo-reale-per-poter-spiegare-di-persona-i-brutti-voti-ai-genitori) (sondaggio Skuola.net su 2.500 studenti delle superiori)
- [Panorama: registro elettronico, studenti e stress da voti](https://www.panorama.it/attualita/registro-elettronico-studenti-stress-voti)
- [Tecnica della Scuola: l'ansia del registro elettronico](https://www.tecnicadellascuola.it/lansia-del-registro-elettronico-quando-il-controllo-uccide-la-fiducia)
- [Unstar: le app educative peggio recensite in Italia](https://unstar.app/th/worst-apps/education/in/italy) (recensioni negative di ClasseViva Studenti e Famiglia)
- [CorCom: il 58% degli studenti usa lo smartphone per la didattica](https://www.corrierecomunicazioni.it/digital-economy/scuola-il-58-degli-studenti-usa-lo-smartphone-per-la-didattica)
