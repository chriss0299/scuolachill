## Scelte tecnologiche

Criterio comune (VIN-34): **ogni operazione passa dal Worker**. Una tecnologia che porta il
browser a interrogare il database, o che introduce un secondo backend, è scartata per questo
prima che per altro.

| Area | Scelta | Alternativa scartata | Perché |
| --- | --- | --- | --- |
| **Backend** | API REST su **Cloudflare Workers** (TypeScript, router **Hono**), sottodominio `api.` | Node + Express su server sempre acceso | Nessun server da gestire, scala da solo nel picco delle verifiche, stessa piattaforma di Pages e R2. Express richiede un processo da dimensionare e pagare anche di notte. Limiti in VIN-30. |
| **Frontend** | SPA **React + Vite** con **MUI**; TanStack Query, React Hook Form + Zod (schemi condivisi con il Worker) | Angular · Nuxt/Vue · Next.js | Angular ha una curva più ripida per i tempi della consegna. Nuxt e Next.js portano un server che fa da secondo backend e invita a leggere il database fuori dal Worker. MUI dà tema chiaro/scuro e DataGrid. |
| Librerie di dominio | **SurveyJS Form Library** (verifiche), **KaTeX** (formule), **FullCalendar** (orario), **Recharts** (dashboard) | Verifica scritta a mano · MathJax · Chart.js | SurveyJS dà tipi di domanda e un modello JSON che il Worker salva e corregge: scriverlo costerebbe settimane. KaTeX è più veloce su telefono. Recharts è fatto di componenti React colorabili dal tema. |
| **Database** | **PostgreSQL gestito da Supabase** | Cloudflare D1 (SQLite) | Dominio relazionale con vincoli e transazioni; Supabase aggiunge autenticazione, RLS e migration. D1 non ha autenticazione né RLS: andrebbero scritte da zero. |
| Accesso al DB | **Hyperdrive** + **Postgres.js**, query parametrizzate | `supabase-js` (PostgREST) | Pubblicazione dei voti e consegna della verifica devono essere atomiche; PostgREST non offre transazioni su più istruzioni senza spostare la logica in funzioni SQL. Hyperdrive tiene il pool di connessioni. |
| Autenticazione | **Supabase Auth**, chiamato **solo dal Worker** | Autenticazione scritta dal team | Hash, reset e token sono il codice più delicato del sistema: meglio un servizio collaudato. |
| Storage file | **Cloudflare R2**, bucket privato UE, URL firmati dal Worker | Supabase Storage | Nessun costo di uscita e il file non transita dal Worker. Supabase Storage costringerebbe il browser a parlare con Supabase o il Worker a fare da proxy. |
| **Provider cloud** | **Cloudflare** + **Supabase** | AWS (Lambda, RDS, S3, Cognito) | Due account con piani gratuiti adatti a 650 utenti (vedi «Dimensionamento e costi»). AWS richiede IAM, VPC e un RDS a costo fisso: troppa configurazione. |
| **Servizi cloud** | Pages (SPA) · Workers (API) · Hyperdrive · R2 · Supabase Postgres + Auth · servizio email | Workers Static Assets al posto di Pages | Pages separa il rilascio della SPA da quello dell'API; unirli non porta vantaggi. |
| **Regione** | Supabase **`eu-central-1` (Francoforte)**; R2 in giurisdizione **`eu`**; Workers e Pages sull'edge (senza dati) | Supabase `eu-central-2` (Zurigo) | Dati di minori: restano nell'UE. Zurigo è fuori dall'UE, sarebbe un trasferimento da motivare. |
| **Servizio esterno** | Email transazionale **Brevo** (credenziali, reset) · *Da validare, ASS-30* | Resend · SMTP predefinito di Supabase | Brevo conserva i dati in UE. Resend tiene i metadati negli USA; l'SMTP di Supabase invia 2 messaggi l'ora (VIN-32). Il fallimento è gestito in «L'API esterna». |
| Migration | **Supabase CLI** (`supabase/migrations/*.sql`) | Drizzle Kit | La CLI avvia in locale Postgres + Auth come in produzione, policy RLS comprese; Drizzle Kit copre male RLS e schema `auth`. |
| Test | **Vitest** + `@cloudflare/vitest-pool-workers` | Jest | Vitest esegue i test nel runtime Workers vero; Jest gira su Node e non ne vede le differenze. |

---
