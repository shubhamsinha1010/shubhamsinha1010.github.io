// All visible copy and project data lives here. Nothing is invented: every number comes from
// the previous site, the case studies or the resume.

export const site = {
  name: 'Shubham Sinha',
  role: 'Python backend & AI engineer',
  url: 'https://shubhamsinha1010.github.io',
  description:
    'Shubham Sinha is a Python backend and AI engineer with five years of experience in search, data pipelines and machine learning features.',
  email: 'sinhashubham1911@gmail.com',
  phone: { display: '+91 89051 69414', raw: '+918905169414' },
  location: 'Remote, India',
  status: 'Open to backend and AI engineer roles',
  resume: '/assets/Shubham_Resume.pdf',
  socials: [
    { label: 'GitHub', href: 'https://github.com/shubhamsinha1010' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/shubham010/' },
    { label: 'LeetCode', href: 'https://leetcode.com/u/sinhashubham1911/' },
  ],
};

export const nav = [
  { label: 'Work', href: '/#work' },
  { label: 'Experience', href: '/#experience' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '#contact' },
];

export const stackStrip = ['Python', 'Django', 'FastAPI', 'Elasticsearch', 'Kafka', 'Debezium', 'Celery', 'LangGraph', 'Hugging Face', 'AWS', 'Terraform', 'Kubernetes', 'PostgreSQL', 'Grafana'];

export const statement = {
  text: 'Search that used to update overnight now updates in under a minute. Reports on a billion rows that took minutes now load in seconds. I like the parts of a product people only notice when they break: search that finds the right thing, data that stays fresh, and services that stay fast under load.',
};

export const facts = [
  { num: '50%', label: 'more throughput on billion-row reporting queries' },
  { num: '<60 s', label: 'for a database change to reach search, down from overnight' },
  { num: '19M+', label: 'users on the UPI payment flows I built' },
  { num: '+23%', label: 'more accurate brand and category tagging' },
  { num: '−40%', label: 'time to fix payment incidents, after new dashboards' },
];

export type Job = {
  company: string;
  role: string;
  dates: string;
  place: string;
  records: string[]; // HTML
  stack: string[];
};

export const jobs: Job[] = [
  {
    company: 'Numerator',
    role: 'Software Engineer I',
    dates: 'Jan 2024 to now',
    place: 'Remote, India',
    records: [
      'Sped up reporting queries on a <strong>billion-row</strong> MySQL database. Heavy reads now take seconds instead of minutes, and throughput went up <strong>50%</strong>.',
      'Built a <strong>Django REST</strong> service on top of <strong>Elasticsearch</strong>, with business APIs, search and data loading in separate layers. Median response time dropped by <strong>150 ms</strong>.',
      'Replaced the nightly search rebuild with a live <strong>change data capture</strong> pipeline from MySQL to Elasticsearch, using pub/sub and <strong>Celery</strong>. Changes now reach search in under <strong>60 s</strong>.',
      'Set up EC2, RDS, S3 and Lambda with <strong>Terraform</strong>. A new environment now takes minutes instead of hours.',
      'Fine-tuned <strong>Hugging Face</strong> models, with <strong>spaCy</strong> for text cleanup, on US, Canadian and German product catalogs. Brand and category tagging became <strong>23%</strong> more accurate.',
    ],
    stack: ['Python', 'Django REST', 'Elasticsearch', 'Celery', 'Terraform', 'AWS'],
  },
  {
    company: 'Inexture Solutions',
    role: 'Python Developer',
    dates: 'Dec 2020 to Dec 2023',
    place: 'Ahmedabad, India',
    records: [
      'Built <strong>UPI</strong> deposit flows for a crypto platform with <strong>19M+</strong> users, so people could add money to their wallets without a card.',
      'Built <strong>Grafana</strong> and <strong>ELK</strong> payment dashboards with the on-call teams. Problems were spotted sooner, and the time to fix incidents (<strong>MTTR</strong>) dropped by <strong>40%</strong>.',
      'Wrote <strong>RabbitMQ</strong> producers and consumers for a national employment platform, so its microservices no longer had to wait on each other.',
      'Moved builds and deployments to <strong>Jenkins CI/CD</strong>, which removed most of the manual release steps.',
    ],
    stack: ['Python', 'RabbitMQ', 'Grafana', 'ELK', 'Jenkins'],
  },
];

export const education = {
  degree: 'B.Tech, Information Technology',
  school: 'Dharmsinh Desai University',
  dates: 'Aug 2017 to May 2021',
  place: 'Nadiad, Gujarat',
};

export const about = {
  bio: [
    'I work at <strong>Numerator</strong>. I speed up reporting queries on a billion-row database, run a Django REST and Elasticsearch service, and stream database changes into search as they happen. Before that, at <strong>Inexture</strong>, I built UPI deposits for a platform with 19M+ users, plus the dashboards that helped the team fix incidents faster.',
    'I care about code that stays correct when many things happen at once, clear types, and systems you can still understand at 2 a.m. Outside work I build things like <a class="link" href="/work/criclot.html">CricLot</a>, a live auction app where the <span class="nowrap">server decides</span> everything, and <a class="link" href="/work/incident-commander.html">Incident Commander</a>, an on-call assistant that asks before it acts.',
  ],
  skills: [
    { key: 'Languages', value: 'Python, SQL, Go' },
    { key: 'Backend', value: 'Django, DRF, FastAPI, MySQL, PostgreSQL, Celery' },
    { key: 'Search and streaming', value: 'Elasticsearch, Kafka, Debezium, RabbitMQ' },
    { key: 'Cloud and delivery', value: 'AWS, Terraform, Docker, Kubernetes, Jenkins, GitHub Actions' },
    { key: 'Observability', value: 'Grafana, ELK, Prometheus' },
    { key: 'AI and NLP', value: 'LangGraph, LangChain, Hugging Face, spaCy, Transformers, RAG' },
  ],
};

export type Shot = { src: string; alt: string; width: number; height: number; caption: string };
export type Result = { num: string; label: string };
export type Block = { heading: string; lead?: string; html: string };

export type Project = {
  slug: string;
  title: string;
  kind: string; // "Personal project" or the employer
  oneLine: string; // index row
  pipeline: string[]; // index preview + case hero
  stackShort: string[];
  href: string; // case page or repo
  external?: boolean;
  case?: CaseStudy;
};

export type CaseStudy = {
  metaTitle: string;
  description: string;
  summary: string; // HTML
  role: string;
  type: string;
  links: { label: string; href: string }[];
  sections: Block[]; // problem, approach
  diagramCaption: string;
  shots?: Shot[];
  decisionsHeading: string;
  decisions: { heading: string; html: string }[];
  extra?: Block[];
  outcomeHeading?: string; // defaults to "Outcome"; use when the numbers are design properties, not measurements
  outcomeLead?: string;
  results: Result[];
  stack: string[];
};

export const projects: Project[] = [
  {
    slug: 'incident-commander',
    title: 'Incident Commander',
    kind: 'Personal project',
    oneLine: 'An on-call assistant built on LangGraph that stops and asks before doing anything risky.',
    pipeline: ['Alert', 'Agents', 'Approve', 'Execute'],
    stackShort: ['LangGraph', 'FastAPI', 'Postgres'],
    href: '/work/incident-commander.html',
    case: {
      metaTitle: 'Incident Commander, an AI on-call assistant',
      description:
        'Case study: an on-call assistant on LangGraph 1.0. Agents investigate in parallel, a planner suggests fixes, and nothing risky runs without approval.',
      summary:
        'A production alert comes in. Four specialist agents look into it at the same time. A planner writes a diagnosis and a ranked list of fixes. Before any risky step, the workflow <strong>pauses</strong> and waits for an engineer. Once they approve, it picks up exactly where it stopped. Built on <strong>LangGraph 1.0</strong> from start to finish.',
      role: 'Solo, design and build',
      type: 'Multi-agent assistant for on-call teams',
      links: [
        { label: 'View source', href: 'https://github.com/shubhamsinha1010/Incident-Commander' },
        { label: 'Architecture wiki', href: 'https://deepwiki.com/shubhamsinha1010/Incident-Commander' },
      ],
      sections: [
        {
          heading: 'The problem',
          lead: 'On-call work means making decisions with half the facts. An AI agent that can roll back production without asking a human is a risk, not a feature.',
          html: `<p>When a critical alert fires, an engineer has to pull together logs, metrics, recent deploys and runbooks, fast. A simple "one LLM call" assistant either guesses the cause, or worse, gets tools that can change production with no safe way to stop. Calling an LLM is the easy part. The real problem is <strong>coordinating several specialist agents, combining what they find, and stopping before anything risky</strong>, in a way that survives restarts and leaves an audit trail.</p>
<p>I wanted to use the parts of LangGraph that matter in production (subgraphs, custom reducers, pause and resume, saved checkpoints for each incident, streaming) in one real incident workflow, not a toy chat loop.</p>`,
        },
        {
          heading: 'The approach',
          html: `<p>Incident Commander uses a <strong>supervisor and workers</strong> design. An alert arrives through the FastAPI API or a PagerDuty or Datadog webhook. The supervisor hands it to a group of agents that investigate in parallel. A planner then writes a diagnosis and ranked fixes. If the top fix is risky, an engineer has to approve it before anything runs.</p>
<ul>
<li><strong>Parallel investigation.</strong> Four agents check logs, metrics, recent changes and runbooks at the same time. A custom reducer merges their findings, so no result overwrites another.</li>
<li><strong>Plan first, then ask.</strong> The planner returns a diagnosis, a confidence score and ranked fixes. If the top fix is risky (a rollback or a restart), the graph stops at <code>interrupt_before</code> on <code>human_approval</code> and waits.</li>
<li><strong>Resume, don't start over.</strong> <code>PATCH /approve</code> (or edit-plan) saves the approved fix with <code>update_state</code> and runs the graph again. The checkpointer brings it back to exactly where it stopped.</li>
<li><strong>Two ways in.</strong> People using the UI see live progress over SSE (<code>astream</code>). Webhooks run in the background with <code>ainvoke</code>, because no browser is watching.</li>
<li><strong>Easy to swap tools.</strong> Logs, metrics, changes, runbooks and rollback all sit behind interfaces, with predictable fakes for tests. Datadog, Prometheus, ArgoCD or kubectl can plug in without changing any agent code.</li>
</ul>`,
        },
      ],
      diagramCaption: 'An alert comes in, specialists investigate in parallel, the planner proposes a fix, an engineer approves, and the fix runs. Checkpoints and traces are kept even if the process restarts.',
      decisionsHeading: 'Key decisions',
      decisions: [
        { heading: 'Ask before changing anything', html: '<p>Risky tools never run until an engineer says yes. The graph is built with <code>interrupt_before=["human_approval"]</code>. It saves its full state to the checkpointer and hands control back to the API. That is what separates a demo chatbot from something you could trust near production.</p>' },
        { heading: 'Safe merging when agents run in parallel', html: '<p>Four agents write their findings at the same moment. A typed state with an explicit merge function keeps every result, instead of letting the last write win. Any LangGraph graph needs this when subgraphs write to shared lists.</p>' },
        { heading: 'Checkpoints that survive restarts', html: '<p>Development uses <code>MemorySaver</code>. Production uses <code>AsyncPostgresSaver</code> through the same factory. Every run is tied to a <code>thread_id</code>, so an approval that comes after a restart still resumes the right incident.</p>' },
        { heading: 'Live updates for people, background runs for machines', html: '<p>The UI and the interactive API stream each step over SSE, so the on-call engineer can watch the investigation as it happens. Webhooks start <code>ainvoke</code> as a background task, so no connection is left waiting.</p>' },
        { heading: 'Agents never talk to vendors directly', html: '<p>Agents call LangChain tools that use interfaces, not vendor SDKs. Fakes keep unit and approval tests fast and fully offline. Moving to real infrastructure means changing one lookup, not rewriting prompts or the graph.</p>' },
      ],
      extra: [
        {
          heading: 'Engineering',
          html: '<p>The code is split into layers for the same reason the graph is. A shared core handles config, typed errors and logging with structlog. Agent nodes share prompt loading and JSON parsing. Graphs only connect nodes and edges. A FastAPI layer handles CRUD, approve, edit-plan, the SSE stream and webhooks. Unit tests cover supervisor routing, the planner and the executor with a mocked LLM, plus the fakes. Integration tests run the whole graph, including the pause, <code>update_state</code> and the resume. Pre-commit runs Ruff, and Docker Compose starts the API with Postgres checkpoints so you can test restarts.</p>',
        },
      ],
      outcomeHeading: 'By design',
      results: [
        { num: '4', label: 'specialist agents investigating at the same time' },
        { num: 'Human', label: 'approval before every risky action' },
        { num: '0', label: 'steps repeated after approval: it resumes from the checkpoint' },
      ],
      stack: ['LangGraph 1.0', 'LangChain', 'FastAPI', 'SSE', 'Postgres checkpoints', 'LangSmith', 'Pydantic', 'structlog', 'Docker Compose', 'pytest', 'Ruff'],
    },
  },
  {
    slug: 'pulsesearch',
    title: 'PulseSearch',
    kind: 'Personal project',
    oneLine: 'Live search that updates in about a second, with an AI assistant that cites its sources.',
    pipeline: ['Live feed', 'CDC', 'Index', 'RAG'],
    stackShort: ['Kafka', 'Debezium', 'Elasticsearch'],
    href: '/work/pulsesearch.html',
    case: {
      metaTitle: 'PulseSearch, live search and RAG over streaming data',
      description:
        'Case study: MySQL changes stream through Debezium and Kafka into Elasticsearch, with hybrid search and an AI assistant that answers from live data.',
      summary:
        'Search over data that never stops changing. Every write to MySQL streams into Elasticsearch through change data capture. Elasticsearch serves keyword and vector search together, plus an AI assistant on <strong>Groq</strong> that answers only from what search finds. The whole pipeline starts with <code>docker compose up</code>. The app also ships as <strong>Kubernetes</strong> manifests, and <strong>GitHub Actions</strong> lints, tests, scans and publishes the images. Embeddings run locally, so there are no paid cloud services.',
      role: 'Solo, design and build',
      type: 'Live search and RAG platform',
      links: [
        { label: 'View source', href: 'https://github.com/shubhamsinha1010/pulsesearch-cdc-rag' },
        { label: 'Architecture wiki', href: 'https://deepwiki.com/shubhamsinha1010/pulsesearch-cdc-rag' },
      ],
      sections: [
        {
          heading: 'The problem',
          lead: 'Most "AI search" demos sit on top of data that never changes. Real products don\'t work that way.',
          html: `<p>In production, data keeps changing and the search index has to keep up. Writes land in the main database, and search should show them within seconds, not the next morning. It also has to stay <strong>correct</strong> when messages are retried, services restart or events arrive out of order. On top of that, people expect results that understand meaning, and an assistant that answers from <strong>the latest data</strong> instead of making things up.</p>
<p>I wanted to build the whole system myself (streaming ingestion, change data capture, ranking, live updates and retrieval-augmented generation) as one pipeline I could monitor, and prove it works with real numbers.</p>`,
        },
        {
          heading: 'The approach',
          html: `<p>PulseSearch treats <strong>MySQL as the source of truth</strong>. Every row change streams into Elasticsearch, which serves hybrid search and the AI assistant on top of that live index. The input is real: Wikipedia's live edit stream. Data flows all the time instead of coming from a fixed demo set.</p>
<ul>
<li><strong>Change data capture, not polling.</strong> Debezium reads the MySQL binlog and publishes each change, in order, to Kafka (Redpanda). A worker creates an embedding for each change and writes it to Elasticsearch. Wikipedia summaries are fetched <strong>after</strong> indexing, so they don't slow down how fast a change becomes searchable.</li>
<li><strong>Hybrid search with RRF.</strong> Keyword results (BM25) and vector results (kNN) are combined in code with Reciprocal Rank Fusion. This avoids paid Elastic features and keeps the ranking easy to see and adjust. A labelled test script measures search quality on live data.</li>
<li><strong>An assistant that sticks to the facts.</strong> Groq's free <code>llama-3.1-8b-instant</code> answers only from the documents search returns. It cites sources with timestamps, says which one is newest, and refuses to answer when nothing is found. If the API is down, a simpler fallback pulls the answer straight from the documents.</li>
<li><strong>Easy to monitor.</strong> Time from database commit to searchable, throughput and the failed-message rate are all Prometheus metrics, shown as p50, p95 and p99 in Grafana.</li>
<li><strong>Ready to deploy.</strong> Docker Compose is still the one-command demo. The app services also run on Kubernetes with health checks, a ServiceAccount and Ingress. CI runs Ruff, Bandit, unit tests, an Elasticsearch smoke test, the web build and kubeconform, then publishes images to GHCR from <code>main</code>.</li>
</ul>`,
        },
      ],
      diagramCaption: 'One path from live data to search. Kafka also feeds the live dashboard, and FastAPI serves hybrid search and the AI assistant.',
      shots: [
        {
          src: '/assets/img/work/pulsesearch-ui.png',
          alt: 'PulseSearch UI: hybrid RRF search for "Science" with BM25 and kNN ranks per hit, a live Wikimedia change stream and 18,627 indexed documents',
          width: 1024,
          height: 472,
          caption: '<strong>Product UI.</strong> Hybrid search shows each result with its keyword and vector rank (here, 10 results in about 264&nbsp;ms). The panel on the right shows database changes as they stream in.',
        },
        {
          src: '/assets/img/work/pulsesearch-grafana-slo.png',
          alt: 'Grafana pipeline dashboard: end-to-end sync latency p95, documents indexed per second, active WebSocket clients, latency percentiles, ingest versus index throughput',
          width: 1024,
          height: 475,
          caption: '<strong>Pipeline health.</strong> Time from commit to searchable at p50, p95 and p99, data coming in versus data indexed, and live WebSocket clients. Spikes during a backfill stay visible instead of hiding inside an average.',
        },
        {
          src: '/assets/img/work/pulsesearch-grafana-ops.png',
          alt: 'Grafana panels: CDC events by operation type, search latency p95 by mode, dead-letter queue rate at zero, embedding latency p95',
          width: 1024,
          height: 476,
          caption: '<strong>Operations.</strong> Change events by type (create, read and update), search p95 by mode, embedding p95, and a failed-message rate that stays flat. Bad messages are set aside without blocking the rest.',
        },
      ],
      decisionsHeading: 'The hard parts',
      decisions: [
        { heading: 'Each change applied once, even when messages repeat', html: '<p>Kafka offsets are saved only after a batch is safely written to Elasticsearch. Each write is <strong>version-checked</strong> using Debezium\'s <code>ts_ms</code> timestamp (<code>version_type=external_gte</code>). So a repeated or late message can never replace a document with an older version.</p>' },
        { heading: 'Rebuild from the log, set bad messages aside', html: '<p>Kafka keeps the full change history, so rebuilding the index is a <strong>replay</strong> of the log, not a full reindex that hits the database hard. Messages that can\'t be read, or keep failing, go to a <strong>dead-letter topic</strong> so they don\'t block the stream.</p>' },
        { heading: 'Ranking that is free and easy to inspect', html: '<p>Elastic\'s built-in RRF needs a paid plan, so I combine the keyword and vector lists in code (<code>k = 60</code>). Every result shows both ranks, so it\'s clear why it ranked where it did, and it\'s easy to tune.</p>' },
        { heading: 'Keeping the main path fast', html: '<p>Fetching Wikipedia summaries before indexing slowed everything down. Now they are fetched <strong>after</strong> the document is searchable. Changes reach search quickly, and the summaries still arrive a moment later.</p>' },
        { heading: 'Keeping the assistant honest', html: '<p>The assistant answers only from what search returns. It cites sources with timestamps, and returns <code>grounded: false</code> when nothing was found. The model sits behind an <code>LLMClient</code> interface with a simple fallback, so the demo still works when the API is down.</p>' },
      ],
      extra: [
        {
          heading: 'Engineering',
          html: '<p>The code is split into layers so each part can be swapped and tested on its own. A shared core handles config, models, embeddings, Elasticsearch access and metrics. Data sources, embeddings and the LLM client sit behind <code>Protocol</code> interfaces (the <strong>Strategy</strong> pattern). A <strong>Repository</strong> layer keeps SQL and search queries out of the business logic. An <strong>anti-corruption layer</strong> turns raw Debezium messages into clean events. Unit tests cover the core, the Debezium adapter and the RRF ranking without any external services. CI adds a live Elasticsearch smoke test, plus Ruff and Bandit on every pull request.</p>',
        },
        {
          heading: 'CI/CD and Kubernetes',
          html: `<ul>
<li><strong>GitHub Actions.</strong> Ruff lint and format, Bandit (medium severity and up), pip-audit (advisory only), unit tests, the Elasticsearch smoke test, Next.js lint and build, kustomize and kubeconform, then Docker Buildx for the api, worker, ingest and web images.</li>
<li><strong>Deploys from <code>main</code>.</strong> The same images are published to <code>ghcr.io/shubhamsinha1010/pulsesearch-cdc-rag/{api,worker,ingest,web}</code>, tagged <code>:latest</code> and <code>:sha-&lt;short&gt;</code>.</li>
<li><strong>Kubernetes.</strong> Deployments with resource limits, HTTP health checks (the API's <code>/health/ready</code> returns 503 when Elasticsearch is down), a ServiceAccount that doesn't mount its token automatically, and host-based Ingress. A kustomize overlay points at the published images.</li>
</ul>`,
        },
      ],
      outcomeLead: 'Measured on my laptop with Docker and about 38k Wikipedia change documents, not in a cloud production setup. Keyword-only search is much cheaper (p50 about 27&nbsp;ms). Most of the hybrid search time goes into creating the query embedding.',
      results: [
        { num: '1.1 / 2.0 s', label: 'from a database change to search, p50 / p95' },
        { num: '310 ms', label: 'hybrid search p50 (warm); p95 1.6&nbsp;s' },
        { num: '~5/s', label: 'documents indexed (peak ~6/s); AI answers in 0.8 to 1.0&nbsp;s; almost no failed messages' },
      ],
      stack: ['FastAPI', 'Debezium', 'Kafka / Redpanda', 'MySQL', 'Elasticsearch', 'sentence-transformers', 'Groq', 'Next.js', 'Prometheus', 'Grafana', 'Docker Compose', 'Kubernetes', 'GitHub Actions', 'GHCR', 'Ruff', 'Bandit'],
    },
  },
  {
    slug: 'criclot',
    title: 'CricLot',
    kind: 'Personal project',
    oneLine: 'A live cricket auction app where the server controls the clock, the budgets and the squads.',
    pipeline: ['Host', 'WS hub', 'Engine', 'Teams'],
    stackShort: ['FastAPI', 'WebSockets', 'Next.js'],
    href: '/work/criclot.html',
    case: {
      metaTitle: 'CricLot, a live cricket auction app',
      description:
        'Case study: private IPL-style cricket auctions with live bidding. The server makes every decision and updates every screen in 16 ms (p95).',
      summary:
        'Run private IPL-style cricket auctions with team budgets, live bidding, and separate screens for the host, the teams and a big display. The server is the only source of truth, and it pushes every update to every screen over WebSockets. End-to-end tests in CI cover the tricky rules, and it deploys with one command.',
      role: 'Solo, design and build',
      type: 'Real-time web app',
      links: [
        { label: 'View source', href: 'https://github.com/shubhamsinha1010/CricLot' },
        { label: 'Architecture wiki', href: 'https://deepwiki.com/shubhamsinha1010/CricLot' },
      ],
      sections: [
        {
          heading: 'The problem',
          lead: 'A live auction is only fun if everyone sees the same thing at the same moment.',
          html: `<p>In a private cricket auction, a host runs the room and each team bids for players with a fixed budget. The UI is not the hard part. <strong>Keeping everyone in sync</strong> is. Several people bid on the same player within milliseconds, a countdown is running, and three kinds of screen (host controls, team bidding and the big display) all have to agree on the current player, the top bid, each team's remaining budget and each squad's size.</p>
<p>Simple approaches break quickly. Timers in the browser drift apart, polling shows old data, and letting the browser decide anything leads to double bids, overspending and squads that are too big.</p>`,
        },
        {
          heading: 'The approach',
          html: `<p>I made the <strong>server the single source of truth</strong>. Browsers never make important decisions. They send requests ("place bid", "start next player") and show whatever the server sends back. One process owns the timer, the current player, every budget and every squad.</p>
<ul>
<li><strong>The server runs the auction.</strong> A state machine moves each player through the auction. The countdown resets on every valid bid, and only the server decides when a player is sold.</li>
<li><strong>Bids that can't clash.</strong> Every bid is checked against the team's budget, the minimum raise and the squad limit before it's accepted and saved. Two bids at almost the same moment can't break anything.</li>
<li><strong>Instant updates.</strong> A WebSocket hub pushes every change to every connected screen at once, so the host, team and display screens always match without a refresh.</li>
</ul>`,
        },
      ],
      diagramCaption: 'Screens send requests, the server decides, and the hub sends the new state back to every screen.',
      decisionsHeading: 'Key decisions',
      decisions: [
        { heading: 'The timer lives on the server', html: '<p>Browsers only <em>show</em> the countdown the server sends. The real timer resets on every accepted bid, so last-second bids work the way players expect, and no two screens ever show a different time.</p>' },
        { heading: 'Check first, then broadcast', html: '<p>A bid is checked against budget, minimum raise and squad limit <strong>before</strong> it counts. Only accepted bids are saved and sent out, so an invalid bid never flashes up on other screens.</p>' },
        { heading: 'One message format for every screen', html: '<p>Host, team and display screens all listen to the same stream of updates and show the part they need. The protocol stays small, and adding a new kind of screen only needs front-end work.</p>' },
        { heading: 'The server decides who can do what', html: '<p>The server works out whether you are the <strong>host, a team or the display</strong> from a JWT or an access key. A read-only display can join without logging in, and host-only actions return <code>403</code> for a team key. The front end just hides buttons you could never use anyway.</p>' },
        { heading: 'One instance, on purpose', html: '<p>The timer and the WebSocket hub run <strong>inside one process</strong>. A second worker would split one live auction into two versions that disagree, so the deploy configs pin one instance and one worker. Scaling out would first need a shared timer and a message broker. I wrote that trade-off down instead of hiding it behind an autoscaler.</p>' },
        { heading: 'Tests that pass every time, not most of the time', html: '<p>Ending an auction used to cancel its timer tasks without waiting for them. A timer caught in the middle of a database query was still cleaning up when the event loop closed, and the end-to-end tests froze about half the time. Now the code waits for cancellation, shuts the test database down while its loop is still running, and reads WebSocket messages through a <strong>bounded queue</strong>. A missing message now <em>fails</em> the test instead of hanging it.</p>' },
      ],
      extra: [
        {
          heading: 'Delivery and testing',
          html: `<p>You can only trust a real-time system if its rules are tested, so the tricky parts are covered end to end:</p>
<ul>
<li><strong>End-to-end tests.</strong> The full host flow, updates to many clients at once, timer resets and automatic selling, the budget, minimum raise and squad limit rules, and who is allowed to do what as host, team or display.</li>
<li><strong>WebSocket load test.</strong> 50 connections stay open, and each one gets every bid within about 5&nbsp;ms (p50) and 16&nbsp;ms (p95) of the first.</li>
<li><strong>CI on every push and pull request.</strong> The tests run on GitHub Actions, so timer and update bugs show up before merging.</li>
<li><strong>Easy to host.</strong> A Dockerfile, Fly and Railway configs for the API, and Vercel for the front end. Or run it on your home network or through a Cloudflare Tunnel for an auction in the living room.</li>
</ul>`,
        },
      ],
      outcomeLead: 'Measured with the included load test on a single instance, which is how the deploy configs run it.',
      results: [
        { num: '5 / 16 ms', label: 'to update 50 screens, p50 / p95' },
        { num: '3', label: 'roles (host, team, display) checked on the server' },
        { num: '0', label: 'page refreshes needed, and money is stored in whole lakhs' },
      ],
      stack: ['FastAPI', 'Next.js 15', 'WebSockets', 'SQLAlchemy', 'TypeScript', 'JWT', 'SQLite / Postgres', 'Docker', 'Fly / Railway', 'Vercel', 'GitHub Actions', 'pytest'],
    },
  },
  {
    slug: 'catalog-search',
    title: 'Catalog search platform',
    kind: 'Numerator',
    oneLine: 'Smarter product search, plus a model that tags every new product with the right brand and category.',
    pipeline: ['Product', 'Classify', 'Index', 'Query'],
    stackShort: ['FastAPI', 'Elasticsearch', 'Hugging Face'],
    href: '/work/catalog-search.html',
    case: {
      metaTitle: 'Catalog search platform at Numerator',
      description:
        'Case study: combined keyword and vector search on Elasticsearch, plus a Hugging Face model that tags products as they arrive. Brand and category accuracy up 23%.',
      summary:
        'Keyword search kept missing different spellings of brands and categories, and new products were often filed in the wrong place. I added hybrid search on Elasticsearch, and a model that tags every product correctly as soon as it is added.',
      role: 'Backend and ML engineer',
      type: 'Product catalogs in several countries',
      links: [{ label: 'Download resume', href: '/assets/Shubham_Resume.pdf' }],
      sections: [
        {
          heading: 'The problem',
          lead: 'Good products were hard to find because they were tagged wrong and matched wrong.',
          html: `<p>Product search used plain keyword matching, which doesn't handle how people really type. Different brand spellings, short forms and category synonyms meant a search could miss products that were clearly relevant. It got worse when new products arrived: many were tagged with the <strong>wrong brand or category</strong>, so even a perfect search couldn't find them.</p>
<p>Two different problems, one result: people never saw relevant products.</p>`,
        },
        {
          heading: 'The approach',
          html: `<p>I fixed the search side and the data-loading side together, because fixing only one still leaves bad results.</p>
<ul>
<li><strong>Hybrid search.</strong> Keyword scoring (<strong>BM25</strong>) combined with <strong>vector</strong> similarity, so related brand and category names show up even when the exact words don't match.</li>
<li><strong>Tagging on arrival.</strong> A fine-tuned <strong>Hugging Face</strong> model, with <strong>spaCy</strong> for text cleanup, sets the brand and category as each product is added to the index.</li>
<li><strong>Tested across countries.</strong> The model was tuned on US, Canadian and German catalogs, so it works across markets instead of fitting just one.</li>
</ul>`,
        },
      ],
      diagramCaption: 'One index, two paths: products are tagged before they are indexed, and searches combine keyword and vector matching.',
      decisionsHeading: 'Key decisions',
      decisions: [
        { heading: 'Fix search and tagging together', html: '<p>Better search only helps if products are tagged correctly, and correct tags only help if search can reach them. Treating both as <strong>one problem</strong> is what improved the results.</p>' },
        { heading: 'Tag products when they arrive, not when people search', html: '<p>Setting tags when a product is added keeps searches fast. And every time the model improves, the whole catalog gets better on the next reindex, without running the model on every search.</p>' },
        { heading: 'Test across countries', html: '<p>Checking results on US, Canadian and German catalogs kept the model honest. The gains were real improvements, not quirks of one market.</p>' },
      ],
      results: [
        { num: '+23%', label: 'more accurate brand and category tagging' },
        { num: 'Hybrid', label: 'keyword plus vector search finds variants that keyword search missed' },
        { num: 'Auto', label: 'new products get the right brand and category as they arrive' },
      ],
      stack: ['FastAPI', 'Elasticsearch', 'Hugging Face', 'spaCy', 'Transformers', 'Python'],
    },
  },
  {
    slug: 'cdc-search-sync',
    title: 'Near real-time search sync',
    kind: 'Numerator',
    oneLine: 'Replaced the nightly search rebuild with a live stream of database changes that reach search in under a minute.',
    pipeline: ['MySQL', 'Debezium', 'Kafka', 'Search'],
    stackShort: ['Debezium', 'Kafka', 'Elasticsearch'],
    href: '/work/cdc-search-sync.html',
    case: {
      metaTitle: 'Near real-time search sync at Numerator',
      description:
        'Case study: replacing nightly full reindexes with a Debezium and Kafka change data capture pipeline that syncs MySQL to Elasticsearch in under 60 seconds.',
      summary:
        'Search was rebuilt once a night, so results could be up to a day old. I replaced that with a change data capture pipeline that streams MySQL changes into Elasticsearch in under a minute. It runs all the time, handles duplicate messages safely, and can replay history when needed.',
      role: 'Backend engineer',
      type: 'Search over billions of rows',
      links: [{ label: 'Download resume', href: '/assets/Shubham_Resume.pdf' }],
      sections: [
        {
          heading: 'The problem',
          lead: 'Search was only as fresh as last night\'s rebuild.',
          html: `<p>The product ran search over a very large MySQL database, and the search index was rebuilt from scratch <strong>every night</strong>. A price change, a new product or a fixed attribute could take hours, sometimes most of a day, to show up in results. The rebuild was also expensive. It put heavy load on the database and took a long time, and fixing something during the day meant waiting or paying for another rebuild.</p>
<p>The platform needed <strong>continuous</strong> updates: when a row changes in MySQL, search should show it seconds later, without reprocessing everything else.</p>`,
        },
        {
          heading: 'The approach',
          html: `<p>I replaced the nightly batch with a streaming <strong>change data capture</strong> pipeline. Instead of querying or dumping tables, it reads the database's binary log, turns each saved change into an event, and applies it to Elasticsearch.</p>
<ul>
<li><strong>Debezium</strong> reads the MySQL binlog and sends out every insert, update and delete in order, without adding load to the app's own queries.</li>
<li><strong>Kafka</strong> holds those events for each table. Capturing changes and indexing them can run at different speeds, and the log is kept so it can be replayed.</li>
<li><strong>Consumers that handle repeats safely</strong> write to Elasticsearch by document id, so getting the same event twice does no harm. That is what makes retries safe.</li>
<li><strong>Retries and a dead-letter topic</strong> stop one bad message from blocking the stream, and a <strong>replay</strong> from the log can rebuild any part of the index.</li>
</ul>`,
        },
      ],
      diagramCaption: 'Saved row changes go from the binlog to search in seconds. Because the log is kept, a backfill is a replay, not a full rebuild.',
      decisionsHeading: 'Key decisions',
      decisions: [
        { heading: 'Read the log, don\'t query the tables', html: '<p>Reading the binlog with Debezium gives an <strong>ordered, lightweight</strong> stream of exactly what changed, in the order it was saved. Polling would have added load to the database and still missed deletes and quick back-to-back updates.</p>' },
        { heading: 'Make every write safe to repeat', html: '<p>Every consumer writes by document id, so when a message is delivered twice (and with this kind of messaging, it <em>will</em> be), the result is the same. That one rule makes retries, restarts and backfills safe instead of scary.</p>' },
        { heading: 'Use the log to recover', html: '<p>Kafka keeps the stream of changes, so rebuilding part of the index means a <strong>replay</strong> from a point in the log, not another full reindex.</p>' },
      ],
      results: [
        { num: '<60 s', label: 'from a MySQL change to search, down from a nightly rebuild' },
        { num: 'Continuous', label: 'live updates replaced the scheduled full rebuilds' },
        { num: 'Replayable', label: 'writes that are safe to repeat make retries and backfills safe' },
      ],
      stack: ['Debezium', 'Kafka', 'Elasticsearch', 'MySQL', 'Python', 'Celery'],
    },
  },
  {
    slug: 'stock-analysis-crew-ai',
    title: 'Stock analysis crew',
    kind: 'Personal project',
    oneLine: 'A team of AI agents that collects stock data, analyses it and writes a short, readable report.',
    pipeline: ['Gather', 'Analyse', 'Summarise', 'Brief'],
    stackShort: ['Python', 'CrewAI', 'LLMs'],
    href: 'https://github.com/shubhamsinha1010/stock-analysis-crew-ai',
    external: true,
  },
  {
    slug: 'medical-chatbot',
    title: 'Medical chatbot',
    kind: 'Personal project',
    oneLine: 'A chatbot that answers health questions using only a trusted set of documents.',
    pipeline: ['Question', 'Retrieve', 'Ground', 'Answer'],
    stackShort: ['Python', 'RAG', 'NLP'],
    href: 'https://github.com/shubhamsinha1010/medical-chatbot',
    external: true,
  },
];

export const caseProjects = projects.filter((p) => p.case);
