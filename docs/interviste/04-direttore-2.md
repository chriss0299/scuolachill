# Verbale · Seconda intervista al Direttore

- **Data**: 09/10/2026
- **Intervistato**: **dirigente scolastico simulato** (istituto tecnico di circa 600 studenti),
  impersonato da Claude
- **Fonti usate per la simulazione**: indagine ANP-LUMSA sullo stress dei dirigenti scolastici
  (1.798 dirigenti), indicazioni e sanzioni del Garante privacy sul registro elettronico,
  materiali sul monitoraggio della dispersione scolastica (elenco in fondo)
- **Stato**: **simulata, non è un'intervista reale**. Completa la prima intervista
  ([01-direttore.md](01-direttore.md)) su temi che lì non erano emersi: tempo, responsabilità
  privacy, monitoraggio degli studenti a rischio. Va validata con un dirigente vero.

Nelle risposte, **[fonte]** indica un'opinione documentata dalle fonti; **[supposizione]** è
un'ipotesi della simulazione, da verificare.

## Il tempo

- «Non ho mai tempo di finire tutto: il lavoro arriva a ondate e si accumula.» **[fonte: oltre
  l'80% dei dirigenti dice di non avere il tempo per completare i compiti, l'85% che il lavoro
  si accumula]**
- «Se un programma mi chiede di configurare cose o di leggere un manuale, lo abbandono o lo
  delego.» **[supposizione, coerente con il dato sul tempo]**
- «Delego molto alla segreteria, ma non sempre il personale è pratico di strumenti digitali.»
  **[fonte: secondo ANP il personale di segreteria spesso non ha competenze digitali adeguate]**

## La responsabilità sui dati

- «Il titolare del trattamento è la scuola, ma chi risponde sono io. Se qualcosa va storto
  devo avvisare il Garante entro 72 ore.» **[fonte]**
- «I voti devono vederli solo lo studente e la sua famiglia, con le loro credenziali. Mai
  pubblicati da nessuna parte.» **[fonte: indicazioni del Garante; sanzioni a scuole che hanno
  pubblicato esiti online]**
- «Se c'è un problema devo poter ricostruire in fretta chi ha visto o cambiato cosa: oggi non
  saprei da dove partire.» **[supposizione, conseguenza diretta dell'obbligo delle 72 ore]**
- «Non voglio che nel sistema finiscano dati che non servono, nemmeno sugli orari dei docenti
  visibili a tutti.» **[fonte: sanzione del Garante a una scuola per orari e turni dei docenti
  visibili a tutti nel registro]**

## Gli studenti da seguire

- «Oltre alle medie per materia, vorrei accorgermi presto degli studenti che stanno
  accumulando insufficienze, prima degli scrutini.» **[fonte: il monitoraggio della
  dispersione e degli insuccessi è un compito delle scuole, con indicatori come le non
  ammissioni per gravi carenze]**
- «Non mi serve un'analisi sofisticata: una lista breve, da guardare una volta alla settimana.»
  **[supposizione, coerente con il dato sul tempo]**

## Bisogni emersi

| # | Bisogno | Già nel perimetro v1? |
| --- | --- | --- |
| B-10 | Usare il sistema senza configurazione né manuale; delegare ai collaboratori di segreteria | sì in parte: ARC-001, NFR-06 (guida di una pagina), delegati con il ruolo Direttore (ASS-04) |
| B-11 | Voti visibili solo allo studente e alla famiglia, mai pubblicati | sì (NFR-02, matrice dei permessi) |
| B-12 | Ricostruire in fretta chi ha visto o modificato dati sensibili, per una possibile violazione da notificare entro 72 ore | **in parte**: sono registrate solo letture delle note e rigenerazioni delle credenziali; nuovo requisito NFR-18 |
| B-13 | Orari dei docenti visibili solo a chi serve | sì: lo studente vede l'orario della sua classe, il docente il proprio (FR-ORA-01); da tenere così |
| B-14 | Elenco degli studenti che accumulano insufficienze nel quadrimestre | **no**: nuovo criterio DIR-04 · AC-14 |

## Fonti

- [Tecnica della Scuola: carichi di lavoro, richieste emotive e burocrazia, i fattori di stress dei dirigenti scolastici](https://www.tecnicadellascuola.it/carichi-di-lavoro-richieste-emotive-e-burocrazia-i-fattori-di-stress-dei-dirigenti-scolastici) (indagine ANP-LUMSA, 1.798 dirigenti)
- [Tecnica della Scuola: stress lavoro correlato, l'indagine ANP sui dirigenti](https://www.tecnicadellascuola.it/stress-lavoro-correlato-anp-ha-pronti-i-dati-di-una-indagine-sui-dirigenti-scolastici)
- [Orizzonte Scuola: cosa deve fare la scuola quando il registro elettronico viene violato](https://www.orizzontescuola.it/cosa-deve-fare-la-scuola-quando-il-registro-elettronico-viene-violato-quali-sanzioni-si-rischiano/)
- [Orizzonte Scuola: orari e turni dei docenti visibili a tutti nel registro, multa del Garante](https://www.orizzontescuola.it/il-registro-elettronico-diventa-una-piazza-pubblica-orari-e-turni-dei-docenti-visibili-a-tutti-dal-garante-2mila-euro-di-multa-alla-scuola-privacy-violata/)
- [Tecnica della Scuola: voti ed esiti degli esami, cosa si può pubblicare secondo il Garante](https://www.tecnicadellascuola.it/voti-ed-esiti-degli-esami-cosa-si-puo-pubblicare-le-regole-del-garante-privacy)
- [Orizzonte Scuola: dispersione scolastica, come si sta agendo](https://www.orizzontescuola.it/dispersione-scolastica-ogni-giorno-banchi-vuoti-nelle-nostre-aule-sicilia-e-piemonte-come-si-sta-agendo/)
