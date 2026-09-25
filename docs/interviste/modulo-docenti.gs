/**
 * ScuolaChill — questionario per docenti (elicitazione dei requisiti).
 *
 * Come si usa:
 *   1. Apri https://script.google.com e crea un nuovo progetto.
 *   2. Cancella il codice di esempio e incolla tutto questo file.
 *   3. Salva, scegli la funzione `creaModuloDocenti` e premi "Esegui".
 *   4. Autorizza l'accesso a Google Moduli quando richiesto.
 *   5. In "Esecuzione" (log) trovi due link: quello da mandare ai docenti e quello per modificare.
 *
 * Il modulo viene creato nel tuo Google Drive. Le risposte sono anonime: non raccoglie l'email.
 */
function creaModuloDocenti() {
  var modulo = FormApp.create('ScuolaChill · Come lavori oggi? (docenti)');
  modulo.setDescription(
    'Ciao! Stiamo progettando ScuolaChill, un gestionale scolastico, come progetto di scuola. ' +
    'Prima di decidere cosa deve fare vogliamo capire come lavori oggi e cosa ti fa perdere tempo.\n\n' +
    'Ci vogliono circa 5 minuti. Le risposte sono anonime.\n' +
    'Per favore non scrivere nomi di studenti o altri dati personali.'
  );
  modulo.setCollectEmail(false);
  modulo.setProgressBar(true);
  modulo.setConfirmationMessage('Grazie mille! Le tue risposte ci aiutano a costruire qualcosa di utile davvero.');

  // --- Chi sei ---------------------------------------------------------------
  modulo.addPageBreakItem().setTitle('Chi sei');

  modulo.addMultipleChoiceItem()
    .setTitle('In che tipo di scuola insegni?')
    .setChoiceValues(['Primaria', 'Secondaria di primo grado', 'Liceo', 'Istituto tecnico', 'Istituto professionale'])
    .showOtherOption(true)
    .setRequired(true);

  modulo.addTextItem()
    .setTitle('Che materia o materie insegni?')
    .setRequired(true);

  modulo.addMultipleChoiceItem()
    .setTitle('Da quanti anni insegni?')
    .setChoiceValues(['Meno di 3', 'Da 3 a 10', 'Da 11 a 20', 'Più di 20'])
    .setRequired(true);

  modulo.addCheckboxItem()
    .setTitle('Quali strumenti usi oggi per il tuo lavoro con le classi?')
    .setHelpText('Puoi sceglierne più di uno.')
    .setChoiceValues([
      'Registro elettronico (ClasseViva, Argo, Axios, Nuvola…)',
      'Google Classroom',
      'Microsoft Teams',
      'Email',
      'WhatsApp o altre chat',
      'Carta e quaderno',
    ])
    .showOtherOption(true)
    .setRequired(true);

  modulo.addMultipleChoiceItem()
    .setTitle('Da quale dispositivo fai la maggior parte di questo lavoro?')
    .setChoiceValues(['PC della scuola', 'Mio PC o portatile', 'Tablet', 'Telefono'])
    .setRequired(true);

  // --- Materiale e verifiche -------------------------------------------------
  modulo.addPageBreakItem().setTitle('Materiale e verifiche');

  modulo.addParagraphTextItem()
    .setTitle('Come fai arrivare oggi il materiale didattico agli studenti? C\'è qualcosa che non funziona?')
    .setHelpText('Per esempio: dispense, slide, esercizi, link. Dove li metti, chi li perde, cosa ti chiedono.');

  modulo.addParagraphTextItem()
    .setTitle('Raccontaci com\'è andata l\'ultima verifica che hai preparato: dalla preparazione alla correzione.')
    .setHelpText('Su carta o al computer, quanto tempo ti ha preso, cosa è stato più faticoso.');

  modulo.addCheckboxItem()
    .setTitle('Che tipo di domande usi di più nelle verifiche?')
    .setChoiceValues(['Scelta multipla', 'Vero/falso', 'Risposta aperta', 'Esercizi con formule o calcoli', 'Disegni o schemi'])
    .showOtherOption(true);

  modulo.addParagraphTextItem()
    .setTitle('Hai mai fatto svolgere una verifica al computer? Se sì, cosa è andato bene e cosa storto?');

  // --- Voti e comunicazione --------------------------------------------------
  modulo.addPageBreakItem().setTitle('Voti e comunicazione');

  modulo.addCheckboxItem()
    .setTitle('Come esprimi i voti?')
    .setChoiceValues(['Solo voti interi', 'Mezzi voti (6½)', 'Segni + e − (6+, 7−)', 'Giudizi a parole'])
    .showOtherOption(true);

  modulo.addParagraphTextItem()
    .setTitle('Oggi, da quando dai un voto a quando lo studente e la famiglia lo vedono, cosa succede? È mai stato un problema?');

  modulo.addParagraphTextItem()
    .setTitle('Come ti contattano oggi studenti e famiglie? Cosa funziona e cosa no?');

  modulo.addScaleItem()
    .setTitle('Quanto ti pesa oggi la parte "burocratica" e digitale del lavoro (registro, voti, comunicazioni)?')
    .setBounds(1, 5)
    .setLabels('Per niente', 'Moltissimo');

  // --- Per finire ------------------------------------------------------------
  modulo.addPageBreakItem().setTitle('Per finire');

  modulo.addParagraphTextItem()
    .setTitle('Una cosa che un\'app per la scuola dovrebbe fare SEMPRE, e una che non dovrebbe fare MAI.');

  modulo.addParagraphTextItem()
    .setTitle('C\'è qualcos\'altro che vorresti dirci?');

  Logger.log('Link da mandare ai docenti: ' + modulo.getPublishedUrl());
  Logger.log('Link per modificare il modulo: ' + modulo.getEditUrl());
}
