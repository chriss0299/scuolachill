## Dimensionamento e costi

#### Fabbisogno e limiti dei piani

Fabbisogno ricavato da «Stima del carico», limiti dalle pagine ufficiali (verificate il
23/09/2026, fonti in fondo alla sezione).

| Risorsa | Fabbisogno (tipico / picco) | Piano Free | Piano scelto | Esito |
| --- | --- | --- | --- | --- |
| Richieste al Worker | 29.000 / 40.000 al giorno; 0,65-0,8 M al mese | 100.000 al giorno (VIN-30) | Workers Paid: 10 M al mese inclusi | Free basterebbe; Paid con margine di 12× |
| CPU del Worker | 2-6 ms per richiesta, ~8 ms per la consegna con correzione | 10 ms per richiesta: consegna e testi lunghi al limite, e oltre la richiesta fallisce | 30 M ms al mese inclusi; 0,8 M × 4 ms ≈ 3,2 M ms | Free rischioso proprio su NFR-11 |
| Istruzioni SQL via Hyperdrive | 116.000 / 160.000 al giorno (ASS-62) | 100.000 al giorno (VIN-61) | Illimitate | **Free insufficiente: è il primo limite superato** |
| Connessioni al DB | ~0,1 s di transazione × 40 req/s ≈ 4 occupate; 8 a 2× | Hyperdrive ~20, Postgres 60 | Hyperdrive ~100, Postgres Micro 60 (VIN-62) | Ampio margine |
| Spazio del DB | ~150 MB l'anno (ASS-21) | 500 MB (VIN-33) | 8 GB | Free sufficiente per ~3 anni |
| Traffico in uscita dal DB | 0,8 M × ~3 KB ≈ 2,5 GB al mese | 5 GB | 250 GB | Free al 50% |
| Backup e pausa | Copia giornaliera, ripristino ≤ 4 h (NFR-04); vacanze oltre 7 giorni | Nessun backup, pausa dopo 7 giorni (VIN-33) | Backup giornalieri conservati 7 giorni, nessuna pausa | **Free incompatibile con NFR-04** |
| Utenti di Supabase Auth | ~650 | 50.000 al mese | 100.000 al mese | Ok |
| File su R2 | ~10 GB a fine anno 1, ~20 GB a fine anno 2 (ASS-10) | 10 GB-mese gratuiti | Oltre: 0,015 $ per GB-mese | Anno 1 gratuito; anno 2 < 0,20 $ al mese |
| Operazioni R2 | ~200 caricamenti e ~25.000 scaricamenti al mese | 1 M classe A, 10 M classe B | Idem | Gratuito; nessun costo di uscita |
| Email | ~650 a settembre (≤ 300 al giorno), poi 30-50 al mese | Brevo 300 al giorno (ASS-30) | Free | Sufficiente con la coda di FR-EXT-01 |
| Asset della SPA | ~1 MB × 650 utenti × 2 dispositivi × 4 rilasci ≈ 5 GB al mese (ASS-66) | Pages: nessun limite di banda indicato, 500 build al mese | Free | Ok |

Latenza: il Worker gira nel data center vicino all'utente (Milano), il DB è a Francoforte;
ogni istruzione SQL è un'andata e ritorno di ~15-25 ms, quindi una richiesta con 4 istruzioni
costa ~100 ms di DB e ~150-250 ms in tutto. L'apertura della verifica (5 chiamate) resta sotto
1 s, con margine su NFR-01 (2 s), purché il codice della SPA sia già in cache (ASS-66).

#### Costi mensili

| Componente | Servizio | Taglia | Istanze | Costo mensile |
| --- | --- | --- | --- | --- |
| Frontend | Cloudflare Pages | Free | 1 progetto | 0 $ |
| API e pool di connessioni | Cloudflare Workers Paid (Hyperdrive incluso) | 10 M richieste e 30 M ms di CPU inclusi | 1 Worker, 1 configurazione Hyperdrive | 5 $ |
| Database e autenticazione | Supabase Pro (ASS-65) | Compute Micro (1 GB, CPU condivisa), 8 GB di disco | 1 progetto (Production) | 25 $ (la Micro è coperta dai 10 $ di crediti inclusi) |
| File | Cloudflare R2 Standard, giurisdizione `eu` | ≤ 10 GB nell'anno 1 | 1 bucket | 0 $ (anno 2: < 0,20 $) |
| Email | Brevo Free (ASS-30) | 300 email al giorno | 1 account | 0 $ |
| CI | GitHub Actions (ASS-67) | 2.000 min al mese su repository privato, gratuito se pubblico | 1 repository | 0 $ |
| Dominio | Registrar a scelta (ASS-31) | 1 dominio | 1 | ~1 $ [stima, prezzo da verificare con il registrar] |
| Development | Tutto in locale (Supabase CLI, `wrangler dev`, Vite) | — | — | 0 $ |
| **Totale** | | | | **~31 $ al mese** (~375 $ l'anno), IVA esclusa |

**Perché Supabase Pro e non Free (ASS-65, da validare).** Il Free regge il carico (spazio,
connessioni, traffico) ma fallisce su due punti che contano in produzione: niente backup, contro
la copia giornaliera di NFR-04, e pausa dopo 7 giorni di inattività, che scatta a Natale e in
estate e richiede un riavvio manuale proprio al rientro. Pro costa 25 $ e dà backup giornalieri
per 7 giorni, nessuna pausa e log per 7 giorni invece di 1, utili durante il collaudo.
Proposta: Free durante lo sviluppo, Pro dal primo giorno con dati reali (collaudo, ASS-14).
Ripiego se i crediti (VIN-01) non coprono i 25 $: Free + copia notturna con `supabase db dump`
da GitHub Actions verso R2. Il ripiego lascia però aperta la pausa, e aggirarla con traffico
artificiale va contro le regole del piano.

**Workers Paid (5 $) serve invece in ogni caso.** Il limite di Hyperdrive Free (100.000
istruzioni al giorno, VIN-61) è il primo a saltare. Un'ora di verifica con 90 studenti fa
~10.800 salvataggi (ASS-61), cioè 32.000-54.000 istruzioni con le 3-5 per richiesta di ASS-62:
nel giorno tipico si arriva a ~116.000, in quello di picco a ~160.000. Le alternative esaminate:

| Opzione | Effetto sul conteggio | Perché no (o sì) |
| --- | --- | --- |
| Salvare meno spesso (una volta al minuto) | Giorno tipico ~94.000, picco ~118.000 | Resta al limite nel giorno tipico e lo supera nel picco; raddoppia ciò che si perde in una caduta (FR-VER-03) |
| Salvare solo le risposte cambiate | Meno byte, stesso numero di istruzioni | Si adotta comunque (proposta di «Accesso ai dati»), ma non risolve il limite |
| Accumulare i salvataggi nel Worker o in una coda e scriverli a blocchi | Meno istruzioni | Una risposta confermata come «salvata» non sarebbe ancora nel DB: contro NFR-04 e FR-VER-03, e aggiunge un componente |
| **Workers Paid** | Istruzioni illimitate, CPU fino a 30 s per richiesta | **Scelto**: 5 $ al mese chiudono anche il rischio dei 10 ms di CPU sulla consegna (VIN-30) senza cambiare il prodotto |

La crescita del DB (ASS-21, ~150 MB l'anno) non pesa sulla scelta: con il Free i 500 MB
bastano per circa tre anni, con il Pro (8 GB) il problema non si pone.

**Nota su NFR-04.** Con backup giornalieri, un guasto del DB fa perdere fino a 24 ore di dati.
«0 voti persi» vale contro gli errori dell'applicazione (transazioni), non contro un disastro
del fornitore. Il ripristino a un istante qualsiasi (PITR) costa ~100 $ al mese e richiede la
compute Small: escluso da VIN-01. Mitigazione a costo zero: un dump aggiuntivo alle 14:30 e alle
20:00 dalla CI verso R2 (~150 MB), che riduce la finestra di perdita a poche ore. Nessuno dei
due fornitori offre uno SLA contrattuale su questi piani: il 99,5% di NFR-04 si misura, non si
compra.

#### Strategia di scalabilità

| Componente | Come scala | Automatica o manuale | Limite pratico |
| --- | --- | --- | --- |
| Pages, R2 | Orizzontale, sull'edge di Cloudflare | Automatica | Nessuno a questa scala |
| Worker | Orizzontale: un'istanza per richiesta in ogni data center | Automatica | La CPU per richiesta, non il numero di richieste |
| Hyperdrive | Pool condiviso verso Postgres | Automatica fino a ~100 connessioni | Le connessioni ammesse dal DB |
| Supabase Auth | Limiti per IP configurabili | Manuale (configurazione) | **Primo limite a scattare** alle 9:00 se non alzato (ASS-64) |
| Postgres (Supabase) | Verticale: taglia di compute Micro → Small → Medium | Manuale dal pannello, riavvio di pochi minuti fuori orario | **Primo collo di bottiglia di risorse** |
| Email | Tetto giornaliero | Cambio piano | Solo a settembre |

Il primo collo di bottiglia è il database: CPU condivisa e 1 GB di memoria, sollecitati dalla
raffica delle 9:00 e dalla dashboard del Direttore. Il segnale per scalare è il 95° percentile
della consegna nel test di carico e nel monitoraggio: se supera 3 s (NFR-11) si passa a Small.
Se a pesare è la latenza verso Francoforte e non il DB, si attiva lo Smart Placement del Worker,
che lo esegue vicino al DB.

#### Se la stima è sbagliata

| Scenario | Cosa cambia | Cosa si fa | Costo mensile |
| --- | --- | --- | --- |
| **Metà** (300 studenti, 45 in verifica) | Tutto lontano dai limiti | Nulla: i servizi a consumo non costano meno del minimo; il ripiego Free di ASS-65 solo se lo impone VIN-01 | ~31 $ |
| **Doppio** (NFR-09: 1.200 studenti, 180 in verifica nello stesso minuto, 500 attivi) | 1,3-1,6 M richieste al mese, picco ~80 req/s, ~8 connessioni, ~300 MB di DB e ~20 GB di file l'anno, ~1.300 credenziali | Limiti di Auth già dimensionati per il 2× (ASS-64); test di carico a 2×; Postgres Small se la consegna supera la soglia; credenziali distribuite su 5 giorni | 31-36 $ (Small: +5 $ oltre i crediti) |
| **10×** (rete di scuole, 6.000 studenti) | ~7 M richieste al mese (ancora nei 10 M inclusi), picco ~400 req/s, ~40 connessioni | Fuori dalla v1 (una sola scuola, ASS-01): schema multi-istituto, Postgres Medium o superiore, piano email a pagamento, eventuale replica di lettura per le dashboard | ordine di 100 $ |

Fonti dei prezzi, verificate il 23/09/2026: [Workers Pricing](https://developers.cloudflare.com/workers/platform/pricing/),
[Hyperdrive Pricing](https://developers.cloudflare.com/hyperdrive/platform/pricing/) e
[Limits](https://developers.cloudflare.com/hyperdrive/platform/limits/),
[R2 Pricing](https://developers.cloudflare.com/r2/pricing/),
[Pages Limits](https://developers.cloudflare.com/pages/platform/limits/),
[Supabase Pricing](https://supabase.com/pricing),
[Supabase Compute](https://supabase.com/docs/guides/platform/compute-and-disk),
[Supabase Backups](https://supabase.com/docs/guides/platform/backups),
[Supabase Auth Rate Limits](https://supabase.com/docs/guides/auth/rate-limits),
[GitHub Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions).
La pagina prezzi di Brevo (brevo.com/pricing) non è leggibile in modo automatico: il limite di
300 email al giorno del piano Free va ricontrollato a mano [DA VERIFICARE].

---
