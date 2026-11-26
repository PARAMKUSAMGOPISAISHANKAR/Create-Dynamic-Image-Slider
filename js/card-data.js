/**
 * Curated dataset:
 * - 7 core categories (10 cards each = 70 cards)
 * - 24 specialized technology categories (5 cards each = 120 cards)
 * Total: 190 cards with reliable high-res images and SVG fallback.
 */
(function (global) {
  'use strict';

  const CATEGORIES = [
    'Artificial Intelligence',
    'Software Engineering',
    'Web Development',
    'Technology',
    'Programming',
    'Design',
    'Innovation',
    'Cloud Computing',
    'Cybersecurity',
    'Data Science',
    'Machine Learning',
    'DevOps',
    'Mobile Development',
    'Backend Engineering',
    'Frontend Development',
    'API Development',
    'Databases',
    'System Architecture',
    'Distributed Systems',
    'Blockchain',
    'Internet of Things (IoT)',
    'Edge Computing',
    'Quantum Computing',
    'Augmented Reality (AR)',
    'Virtual Reality (VR)',
    'UI/UX Design',
    'Product Management',
    'Quality Assurance (QA)',
    'Automation',
    'Open Source',
    'Networking',
    'Other'
  ];

  const FALLBACK_IMAGE =
    'data:image/svg+xml;charset=UTF-8,' +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="520" viewBox="0 0 800 520">' +
        '<defs>' +
          '<linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">' +
            '<stop offset="0%" stop-color="#0f172a"/>' +
            '<stop offset="50%" stop-color="#1e293b"/>' +
            '<stop offset="100%" stop-color="#0ea5e9"/>' +
          '</linearGradient>' +
        '</defs>' +
        '<rect width="800" height="520" fill="url(#g)"/>' +
        '<circle cx="400" cy="220" r="64" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.28)" stroke-width="2"/>' +
        '<path d="M368 238l22-26 18 20 14-16 26 22H368z" fill="rgba(255,255,255,0.65)"/>' +
        '<circle cx="386" cy="200" r="9" fill="rgba(255,255,255,0.65)"/>' +
        '<text x="400" y="328" text-anchor="middle" fill="rgba(255,255,255,0.85)" font-family="Poppins,sans-serif" font-size="22" font-weight="600">Dynamic Slider Card</text>' +
      '</svg>'
    );

  const IMAGE_BANK = {
    ai: [
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1655720828018-edd2daec9349?auto=format&fit=crop&w=900&q=80'
    ],
    code: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=900&q=80'
    ],
    web: [
      'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=900&q=80'
    ],
    tech: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=900&q=80'
    ],
    prog: [
      'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?auto=format&fit=crop&w=900&q=80'
    ],
    design: [
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1541462608143-67571c6738dd?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&w=900&q=80'
    ],
    mobile: [
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&w=900&q=80'
    ],
    data: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=900&q=80'
    ],
    xr: [
      'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1478416272538-5f7e51dc5400?auto=format&fit=crop&w=900&q=80'
    ]
  };

  const CATEGORY_POOLS = {
    'Artificial Intelligence': IMAGE_BANK.ai,
    'Software Engineering': IMAGE_BANK.code,
    'Web Development': IMAGE_BANK.web,
    Technology: IMAGE_BANK.tech,
    Programming: IMAGE_BANK.prog,
    Design: IMAGE_BANK.design,
    Innovation: IMAGE_BANK.ai,
    'Cloud Computing': IMAGE_BANK.tech,
    Cybersecurity: IMAGE_BANK.tech,
    'Data Science': IMAGE_BANK.data,
    'Machine Learning': IMAGE_BANK.ai,
    DevOps: IMAGE_BANK.code,
    'Mobile Development': IMAGE_BANK.mobile,
    'Backend Engineering': IMAGE_BANK.code,
    'Frontend Development': IMAGE_BANK.web,
    'API Development': IMAGE_BANK.prog,
    Databases: IMAGE_BANK.data,
    'System Architecture': IMAGE_BANK.code,
    'Distributed Systems': IMAGE_BANK.tech,
    Blockchain: IMAGE_BANK.tech,
    'Internet of Things (IoT)': IMAGE_BANK.tech,
    'Edge Computing': IMAGE_BANK.tech,
    'Quantum Computing': IMAGE_BANK.ai,
    'Augmented Reality (AR)': IMAGE_BANK.xr,
    'Virtual Reality (VR)': IMAGE_BANK.xr,
    'UI/UX Design': IMAGE_BANK.design,
    'Product Management': IMAGE_BANK.data,
    'Quality Assurance (QA)': IMAGE_BANK.code,
    Automation: IMAGE_BANK.ai,
    'Open Source': IMAGE_BANK.prog,
    Networking: IMAGE_BANK.tech
  };

  const CATEGORY_TOPICS = {
    // 7 Core Categories (10 cards each)
    'Artificial Intelligence': [
      ['Neural Networks & Deep Learning', 'Multi-layer neural architectures learn hierarchical representations from images, audio, and structured datasets.', ['Deep Learning', 'Neural Nets', 'AI']],
      ['Large Language Models', 'Transformer-based language models power conversational assistants, code synthesis, and semantic search.', ['LLMs', 'Transformers', 'NLP']],
      ['Computer Vision Systems', 'Real-time object detection, segmentation, and optical recognition transform healthcare and autonomous mobility.', ['Vision', 'Detection', 'CNN']],
      ['Generative AI & Diffusion', 'Latent diffusion models synthesize photorealistic media, 3D assets, and rapid creative prototypes.', ['GenAI', 'Diffusion', 'Synthesis']],
      ['Reinforcement Learning', 'Agents optimize sequential decision-making through reward feedback in robotics and simulation environments.', ['RL', 'Agents', 'Robotics']],
      ['Natural Language Processing', 'Tokenization, embeddings, and sentiment pipelines enable machines to parse human intent accurately.', ['NLP', 'Embeddings', 'Text']],
      ['Edge AI & TinyML', 'Quantized models run directly on mobile and IoT hardware with low latency and strong privacy.', ['Edge AI', 'TinyML', 'IoT']],
      ['AI Ethics & Alignment', 'Fairness auditing, interpretability, and guardrails ensure transparent and responsible automated decisions.', ['Ethics', 'Safety', 'Governance']],
      ['Vector Databases & RAG', 'Retrieval-augmented generation grounds AI responses in verified enterprise knowledge bases.', ['RAG', 'Vectors', 'Search']],
      ['Predictive Analytics', 'Time-series forecasting and anomaly detection uncover actionable patterns across operational telemetry.', ['Forecasting', 'ML', 'Analytics']]
    ],
    'Software Engineering': [
      ['System Architecture & Microservices', 'Decoupled services communicate over well-defined contracts to scale independently with high fault isolation.', ['Architecture', 'Microservices', 'Scale']],
      ['Clean Code & Design Patterns', 'SOLID principles, modular boundaries, and clear abstractions keep large codebases maintainable over time.', ['Clean Code', 'Patterns', 'SOLID']],
      ['CI/CD & DevOps Automation', 'Automated build, test, and deployment pipelines ship reliable releases with zero-downtime rollbacks.', ['CI/CD', 'DevOps', 'Automation']],
      ['Automated Testing & QA', 'Unit, integration, and end-to-end test suites catch regressions early and document expected behavior.', ['Testing', 'QA', 'Reliability']],
      ['Distributed Systems & Consensus', 'Replication, partitioning, and idempotent workflows keep global services consistent under network failures.', ['Distributed', 'Consensus', 'Cloud']],
      ['API Design & GraphQL', 'Versioned REST endpoints and typed GraphQL schemas provide predictable, self-documenting data access.', ['REST', 'GraphQL', 'Contracts']],
      ['Database Indexing & Tuning', 'Query planning, B-tree indexes, and connection pooling deliver sub-millisecond reads at high concurrency.', ['SQL', 'Indexing', 'Performance']],
      ['Observability & Telemetry', 'Structured logs, distributed traces, and real-time metrics pinpoint production bottlenecks rapidly.', ['Tracing', 'Metrics', 'SRE']],
      ['Application Security & Auth', 'Zero-trust validation, OAuth2, and encrypted secrets protect user data across every service boundary.', ['Security', 'OAuth2', 'Zero-Trust']],
      ['Agile Delivery & Code Review', 'Collaborative pull requests, RFCs, and iterative sprints align engineering velocity with product quality.', ['Agile', 'Reviews', 'Engineering']]
    ],
    'Web Development': [
      ['Modern HTML5 & Semantics', 'Semantic landmarks, accessible ARIA attributes, and clean document structure form the foundation of the web.', ['HTML5', 'Semantics', 'A11y']],
      ['CSS3 Grid, Flexbox & Glassmorphism', 'Fluid layouts, backdrop blur, and CSS custom properties create responsive, depth-rich interfaces.', ['CSS3', 'Grid', 'Glassmorphism']],
      ['Interactive JavaScript & DOM', 'Event delegation, async state updates, and modular ES patterns power responsive client experiences.', ['JavaScript', 'DOM', 'Events']],
      ['Progressive Web Apps (PWA)', 'Service workers, offline caching, and installable manifests bring native-like speed to browser apps.', ['PWA', 'Offline', 'Caching']],
      ['Frontend Performance & Core Vitals', 'Lazy loading, asset compression, and minimal layout shifts keep interactions crisp at 60fps.', ['Performance', 'Lazy Load', '60fps']],
      ['Responsive Mobile-First Design', 'Adaptive breakpoints, touch gestures, and fluid typography ensure seamless usability on every screen.', ['Responsive', 'Mobile', 'Touch']],
      ['Browser Storage & State Sync', 'LocalStorage, IndexedDB, and reactive state stores preserve user preferences across sessions.', ['LocalStorage', 'State', 'Sync']],
      ['Web Animations & 3D Transforms', 'Hardware-accelerated CSS transforms and perspective layers deliver smooth, cinema-grade transitions.', ['Animations', '3D', 'Transitions']],
      ['Web Accessibility (WCAG)', 'Keyboard navigation, focus rings, and high-contrast ratios make web applications inclusive for everyone.', ['WCAG', 'Keyboard', 'Contrast']],
      ['Full-Stack Web Integration', 'Connecting responsive frontends with Node.js, Python, and relational or document databases.', ['Full-Stack', 'Backend', 'Web Apps']]
    ],
    Technology: [
      ['Cloud Computing Infrastructure', 'Elastic compute, object storage, and global edge networks power modern on-demand digital platforms.', ['Cloud', 'Infrastructure', 'Edge']],
      ['Cybersecurity & Encryption', 'End-to-end encryption, hardware keys, and threat detection safeguard critical digital infrastructure.', ['Security', 'Encryption', 'Defense']],
      ['5G & High-Speed Connectivity', 'Ultra-low-latency wireless networks unlock real-time telemetry, remote surgery, and smart city grids.', ['5G', 'Networking', 'Latency']],
      ['Internet of Things (IoT)', 'Connected sensors and embedded controllers stream real-world environmental data into cloud dashboards.', ['IoT', 'Sensors', 'Embedded']],
      ['Quantum Computing Frontiers', 'Qubit superposition and quantum algorithms promise breakthroughs in cryptography and molecular simulation.', ['Quantum', 'Qubits', 'Research']],
      ['Edge Computing & CDNs', 'Processing data closer to end users reduces round-trip latency and bandwidth overhead worldwide.', ['Edge', 'CDN', 'Speed']],
      ['Blockchain & Distributed Ledgers', 'Cryptographic consensus and immutable audit trails enable verifiable digital provenance.', ['Ledger', 'Crypto', 'Trust']],
      ['AR & Spatial Computing', 'Mixed-reality headsets blend interactive 3D interfaces seamlessly into physical workspaces.', ['Spatial', 'AR/VR', '3D']],
      ['Green Tech & Sustainable Data Centers', 'Liquid cooling and renewable energy grids reduce the carbon footprint of large-scale computing.', ['GreenTech', 'Energy', 'Cloud']],
      ['Semiconductor & Chip Architecture', 'Next-generation silicon nodes and specialized NPUs accelerate AI and mobile efficiency.', ['Silicon', 'Hardware', 'NPU']]
    ],
    Programming: [
      ['Data Structures & Algorithms', 'Hash maps, trees, graphs, and dynamic programming form the core toolkit for efficient problem solving.', ['Algorithms', 'Structures', 'Big-O']],
      ['Asynchronous Programming', 'Promises, async/await, and event loops keep I/O-heavy applications non-blocking and responsive.', ['Async', 'Promises', 'Concurrency']],
      ['Object-Oriented Design', 'Encapsulation, composition, and polymorphism model complex business domains cleanly.', ['OOP', 'Classes', 'Polymorphism']],
      ['Functional Programming Patterns', 'Pure functions, immutability, and higher-order combinators reduce side effects and bugs.', ['Functional', 'Immutability', 'Pure']],
      ['Type Systems & Static Analysis', 'Strong typing and linters catch contract mismatches at compile time before code reaches production.', ['Types', 'Linting', 'Safety']],
      ['Memory Management & Profiling', 'Understanding heap allocation, garbage collection, and leak detection keeps runtimes lean.', ['Memory', 'Profiling', 'Runtime']],
      ['Python for Automation & Data', 'Readable syntax and rich ecosystems make Python ideal for scripting, APIs, and data science.', ['Python', 'Scripting', 'Data']],
      ['Systems Programming & Rust', 'Zero-cost abstractions and ownership guarantees deliver C-level speed with memory safety.', ['Rust', 'Systems', 'Safety']],
      ['Version Control & Git Workflows', 'Branching strategies, rebasing, and atomic commits keep team collaboration organized and traceable.', ['Git', 'Branching', 'Workflow']],
      ['Debugging & Root-Cause Analysis', 'Breakpoints, network inspectors, and bisecting isolate subtle defects quickly and methodically.', ['Debugging', 'DevTools', 'Fixes']]
    ],
    Design: [
      ['iOS Glassmorphism Aesthetics', 'Translucent frosted layers, subtle specular borders, and ambient glow create tactile digital depth.', ['Glassmorphism', 'iOS', 'Depth']],
      ['Design Systems & Tokens', 'Shared color palettes, spacing scales, and reusable components unify multi-platform products.', ['Design System', 'Tokens', 'UI']],
      ['Typography & Visual Hierarchy', 'Intentional font weights, line heights, and contrast guide user attention effortlessly.', ['Typography', 'Hierarchy', 'Readability']],
      ['Micro-Interactions & Feedback', 'Subtle hover lifts, spring physics, and button press states make interfaces feel alive.', ['Micro-UX', 'Motion', 'Feedback']],
      ['Color Theory & Dark Mode', 'Balanced surface elevation and accessible contrast ratios reduce eye strain in dark interfaces.', ['Color', 'Dark Mode', 'Contrast']],
      ['Wireframing & Rapid Prototyping', 'Interactive prototypes validate user flows and layout ergonomics before writing production code.', ['Prototyping', 'Wireframes', 'UX']],
      ['3D Spatial UI & Perspective', 'Layered Z-depth, parallax tilt, and soft shadows bring physical realism to screen cards.', ['3D UI', 'Perspective', 'Cards']],
      ['Iconography & Visual Language', 'Crisp vector icons with consistent stroke weights communicate actions faster than text alone.', ['Icons', 'SVG', 'Clarity']],
      ['User Research & Usability Testing', 'Observing real users uncovers friction points and validates intuitive navigation paths.', ['UX Research', 'Usability', 'Flows']],
      ['Motion Choreography', 'Staggered entrances and eased transitions connect screen states into a cohesive visual story.', ['Choreography', 'Easing', 'Motion']]
    ],
    Innovation: [
      ['Autonomous Robotics', 'Sensor fusion and adaptive motion planning enable robots to collaborate safely in dynamic spaces.', ['Robotics', 'Autonomy', 'Sensors']],
      ['Clean Energy Storage', 'Solid-state batteries and smart microgrids accelerate the global transition to renewable power.', ['Energy', 'Batteries', 'Grid']],
      ['Biotech & Digital Health', 'Wearable diagnostics and computational biology personalize preventive medicine at scale.', ['BioTech', 'Health', 'Wearables']],
      ['Smart Cities & Mobility', 'Connected transit, adaptive traffic lights, and EV ecosystems make urban centers cleaner and faster.', ['Smart City', 'Mobility', 'EV']],
      ['Aerospace & Satellite Networks', 'Reusable launch vehicles and low-Earth-orbit constellations bring broadband to every corner of Earth.', ['SpaceTech', 'Satellites', 'Orbit']],
      ['Human-Computer Interaction', 'Voice, gesture, and adaptive interfaces remove friction between human creativity and software.', ['HCI', 'Interfaces', 'Future']],
      ['Digital Twins & Simulation', 'Real-time virtual replicas let engineers stress-test factories and infrastructure before building.', ['Digital Twin', 'Simulation', '3D']],
      ['EdTech & Interactive Learning', 'Adaptive simulations and visual sandboxes make complex STEM concepts accessible worldwide.', ['EdTech', 'Learning', 'Interactive']],
      ['FinTech & Instant Payments', 'Real-time settlement rails and fraud-scoring models modernize global commerce.', ['FinTech', 'Payments', 'Scale']],
      ['Open-Source Ecosystems', 'Global developer communities collaborate openly to build the foundational tools of modern software.', ['Open Source', 'Community', 'Tools']]
    ],

    // 24 Specialized Technologies (5 cards each = 120 cards)
    'Cloud Computing': [
      ['Serverless Compute & FaaS', 'Event-driven functions scale automatically from zero to thousands of concurrent executions without server management.', ['Serverless', 'FaaS', 'Auto-Scale']],
      ['Multi-Region Cloud Architecture', 'Active-active deployments across availability zones deliver high uptime and low global latency.', ['Multi-Region', 'Availability', 'Cloud']],
      ['Infrastructure as Code (IaC)', 'Declarative Terraform and CloudFormation templates version-control every network, cluster, and bucket.', ['Terraform', 'IaC', 'Provisioning']],
      ['Cloud Object & Block Storage', 'Durable, geo-replicated storage tiers balance instant hot access with cost-efficient archival.', ['Storage', 'S3', 'Durability']],
      ['FinOps & Cloud Cost Optimization', 'Right-sizing instances, spot capacity, and usage telemetry keep cloud spending predictable.', ['FinOps', 'Cost', 'Optimization']]
    ],
    Cybersecurity: [
      ['Zero-Trust Network Access', 'Continuous identity verification and least-privilege policies eliminate implicit trust inside networks.', ['Zero-Trust', 'IAM', 'Identity']],
      ['Penetration Testing & Red Teaming', 'Simulated adversarial attacks uncover exploitable weaknesses before malicious actors find them.', ['PenTest', 'Red Team', 'Audit']],
      ['SIEM & Threat Intelligence', 'Correlating security logs in real time detects lateral movement, anomalies, and intrusion attempts.', ['SIEM', 'SOC', 'Detection']],
      ['Public Key Infrastructure (PKI)', 'TLS certificates, asymmetric encryption, and hardware security modules protect data in transit.', ['PKI', 'TLS', 'Cryptography']],
      ['OWASP Web Security', 'Defending applications against XSS, CSRF, SQL injection, and broken access control vulnerabilities.', ['OWASP', 'AppSec', 'Defense']]
    ],
    'Data Science': [
      ['Exploratory Data Analysis', 'Statistical summaries, distributions, and correlation matrices reveal hidden structure in raw datasets.', ['EDA', 'Statistics', 'Insights']],
      ['Feature Engineering Pipelines', 'Transforming raw signals into informative model features boosts predictive accuracy dramatically.', ['Features', 'Pipelines', 'ETL']],
      ['Interactive Data Visualization', 'Clear charts, heatmaps, and dashboards translate complex metrics into executive decisions.', ['Dashboards', 'Charts', 'BI']],
      ['A/B Testing & Experimentation', 'Controlled hypothesis tests measure causal product impact with statistical confidence.', ['A/B Testing', 'Causal', 'Metrics']],
      ['Big Data Warehousing', 'Columnar storage and distributed SQL engines query petabyte-scale analytical tables in seconds.', ['Warehouse', 'Big Data', 'SQL']]
    ],
    'Machine Learning': [
      ['Supervised Learning & Regression', 'Labeled training datasets teach models to classify outcomes and forecast continuous values.', ['Supervised', 'Classification', 'Regression']],
      ['Unsupervised Clustering', 'K-means, DBSCAN, and dimensionality reduction discover natural groupings without labels.', ['Clustering', 'PCA', 'Unsupervised']],
      ['Gradient Boosted Trees', 'XGBoost and LightGBM excel on tabular datasets with fast training and strong generalization.', ['XGBoost', 'Tabular', 'Ensembles']],
      ['Hyperparameter Tuning & AutoML', 'Bayesian optimization and cross-validation systematically find optimal model configurations.', ['AutoML', 'Tuning', 'CV']],
      ['MLOps & Model Monitoring', 'Automated retraining, drift detection, and model registries keep production ML accurate over time.', ['MLOps', 'Drift', 'Registry']]
    ],
    DevOps: [
      ['Docker & Containerization', 'Immutable container images package code and dependencies identically across dev and production.', ['Docker', 'Containers', 'Portability']],
      ['Kubernetes Orchestration', 'Automated scheduling, self-healing pods, and rolling updates manage large container fleets.', ['Kubernetes', 'K8s', 'Orchestration']],
      ['GitOps Continuous Delivery', 'Git repositories act as the single source of truth for declarative cluster state.', ['GitOps', 'CD', 'Automation']],
      ['Site Reliability Engineering', 'SLOs, error budgets, and blameless postmortems balance release speed with system stability.', ['SRE', 'SLOs', 'Uptime']],
      ['Artifact & Secrets Management', 'Signed container registries and encrypted vaults secure build artifacts and runtime credentials.', ['Vault', 'Registry', 'Security']]
    ],
    'Mobile Development': [
      ['Cross-Platform Frameworks', 'Shared codebases in Flutter and React Native ship native-feel iOS and Android apps faster.', ['Flutter', 'React Native', 'Cross-Platform']],
      ['Native iOS & SwiftUI', 'Declarative SwiftUI views and Metal graphics deliver fluid 120Hz experiences on Apple devices.', ['SwiftUI', 'iOS', 'Native']],
      ['Native Android & Jetpack Compose', 'Kotlin coroutines and Compose UI create responsive Material interfaces across Android hardware.', ['Kotlin', 'Compose', 'Android']],
      ['Offline-First Mobile Sync', 'Local SQLite caching and background sync queues keep mobile apps responsive without signal.', ['Offline', 'SQLite', 'Sync']],
      ['Mobile Performance & Battery', 'Profiling memory, cold-start time, and network batching preserves battery life and smoothness.', ['Battery', 'Startup', 'Profiling']]
    ],
    'Backend Engineering': [
      ['Node.js & Event-Driven APIs', 'Non-blocking I/O handles thousands of concurrent connections with lightweight JavaScript services.', ['Node.js', 'Event Loop', 'APIs']],
      ['Python FastAPI & Django', 'Async type-safe endpoints and batteries-included ORMs accelerate backend service delivery.', ['FastAPI', 'Django', 'Python']],
      ['Caching with Redis', 'In-memory key-value stores cut database load and deliver sub-millisecond response times.', ['Redis', 'Caching', 'Speed']],
      ['Message Queues & Brokers', 'Kafka and RabbitMQ decouple heavy background jobs with durable, ordered event streams.', ['Kafka', 'Queues', 'Events']],
      ['Authentication & Session Design', 'JWT tokens, refresh rotation, and HTTP-only cookies secure user sessions reliably.', ['JWT', 'Sessions', 'Auth']]
    ],
    'Frontend Development': [
      ['Component-Driven Architecture', 'Reusable, encapsulated UI components speed up feature development and visual consistency.', ['Components', 'UI', 'Modular']],
      ['State Management Patterns', 'Predictable stores, signals, and unidirectional data flow keep complex interfaces synchronized.', ['State', 'Stores', 'Reactive']],
      ['CSS Architecture & Utility Systems', 'Scoped styles, custom properties, and design tokens prevent cascade conflicts at scale.', ['CSS', 'Tokens', 'Styling']],
      ['Client-Side Routing & Code Splitting', 'Dynamic imports load route bundles on demand for instant initial page rendering.', ['Routing', 'Splitting', 'Speed']],
      ['Browser DevTools & Debugging', 'Flamegraphs, network waterfalls, and DOM inspectors diagnose layout and script bottlenecks.', ['DevTools', 'Profiling', 'Web']]
    ],
    'API Development': [
      ['RESTful Resource Modeling', 'Clean URIs, HTTP status codes, and idempotent methods make APIs intuitive for every consumer.', ['REST', 'HTTP', 'Resources']],
      ['OpenAPI & Swagger Docs', 'Machine-readable specifications generate interactive docs, client SDKs, and contract tests.', ['OpenAPI', 'Swagger', 'Docs']],
      ['Rate Limiting & Throttling', 'Token buckets and sliding windows protect backend services from abuse and traffic spikes.', ['Rate Limit', 'Gateway', 'Protection']],
      ['Webhooks & Event Callbacks', 'Signed HTTP callbacks notify external integrations immediately when domain events occur.', ['Webhooks', 'Events', 'HMAC']],
      ['gRPC & Protocol Buffers', 'Binary serialization and HTTP/2 multiplexing deliver ultra-fast service-to-service RPCs.', ['gRPC', 'Protobuf', 'HTTP/2']]
    ],
    Databases: [
      ['Relational Modeling & PostgreSQL', 'ACID transactions, foreign keys, and JSONB columns combine strict integrity with flexibility.', ['PostgreSQL', 'ACID', 'SQL']],
      ['NoSQL Document Stores', 'Schema-flexible document collections scale horizontally for rapidly evolving data models.', ['MongoDB', 'NoSQL', 'Documents']],
      ['Time-Series & Analytics DBs', 'Optimized compression and window functions ingest millions of IoT and financial ticks per second.', ['Time-Series', 'Metrics', 'Analytics']],
      ['Graph Databases & Relationships', 'Native edge traversal answers multi-hop social, fraud, and knowledge graph queries instantly.', ['Graph DB', 'Neo4j', 'Nodes']],
      ['Sharding & Read Replicas', 'Horizontal partitioning and replica routing scale database throughput across global regions.', ['Sharding', 'Replicas', 'Scale']]
    ],
    'System Architecture': [
      ['Event-Driven Architecture', 'Producers and consumers react asynchronously to domain events for loose coupling and resilience.', ['Events', 'EDA', 'Decoupled']],
      ['CQRS & Event Sourcing', 'Separating read and write models enables auditability and independent query optimization.', ['CQRS', 'Event Sourcing', 'Scale']],
      ['API Gateways & BFF Pattern', 'Centralized routing, auth termination, and backend-for-frontend aggregation simplify clients.', ['Gateway', 'BFF', 'Routing']],
      ['Load Balancing & High Availability', 'Health-checked reverse proxies distribute traffic evenly and route around unhealthy nodes.', ['Load Balancer', 'HA', 'Failover']],
      ['Domain-Driven Design (DDD)', 'Bounded contexts and ubiquitous language align software modules closely with business domains.', ['DDD', 'Bounded Context', 'Design']]
    ],
    'Distributed Systems': [
      ['CAP Theorem & Consistency', 'Balancing consistency, availability, and partition tolerance guides distributed data trade-offs.', ['CAP', 'Consistency', 'Trade-offs']],
      ['Raft & Paxos Consensus', 'Leader election and replicated state machines keep cluster metadata synchronized safely.', ['Raft', 'Consensus', 'Clusters']],
      ['Circuit Breakers & Retries', 'Exponential backoff with jitter and circuit breakers prevent cascading service failures.', ['Resilience', 'Retries', 'Fault Tolerance']],
      ['Idempotency & Exactly-Once', 'Idempotency keys ensure retried network requests never duplicate payments or mutations.', ['Idempotency', 'Reliability', 'APIs']],
      ['Service Mesh & mTLS', 'Sidecar proxies handle mutual TLS encryption, traffic splitting, and observability transparently.', ['Service Mesh', 'mTLS', 'Istio']]
    ],
    Blockchain: [
      ['Smart Contracts & Solidity', 'Self-executing on-chain programs enforce transparent business rules without intermediaries.', ['Smart Contracts', 'Solidity', 'Web3']],
      ['Consensus Mechanisms (PoS)', 'Proof-of-Stake validators secure decentralized networks with minimal energy consumption.', ['Proof of Stake', 'Validators', 'Consensus']],
      ['Zero-Knowledge Proofs', 'zk-SNARKs verify computation validity mathematically without revealing underlying private data.', ['ZK Proofs', 'Privacy', 'Crypto']],
      ['Layer-2 Rollup Scaling', 'Optimistic and zero-knowledge rollups batch thousands of transactions for low-fee finality.', ['Layer 2', 'Rollups', 'Scaling']],
      ['Decentralized Identity (DID)', 'Self-sovereign cryptographic credentials give users portable control over digital identity.', ['DID', 'Identity', 'Web3']]
    ],
    'Internet of Things (IoT)': [
      ['MQTT & Lightweight Protocols', 'Publish-subscribe messaging connects constrained sensors reliably over intermittent networks.', ['MQTT', 'Telemetry', 'IoT']],
      ['Embedded Firmware & RTOS', 'Real-time operating systems manage deterministic sensor sampling and low-power sleep cycles.', ['Firmware', 'RTOS', 'Embedded']],
      ['Industrial IoT & Predictive Maintenance', 'Vibration and thermal sensors forecast equipment wear before costly factory downtime occurs.', ['IIoT', 'Maintenance', 'Sensors']],
      ['Smart Home & Matter Standard', 'Interoperable local wireless protocols unify lighting, climate, and security ecosystems.', ['Matter', 'Smart Home', 'Devices']],
      ['OTA Firmware Updates', 'Cryptographically signed over-the-air updates patch deployed IoT fleets safely at scale.', ['OTA', 'Updates', 'Fleet']]
    ],
    'Edge Computing': [
      ['Edge AI Inference', 'Running vision and audio models at the network edge eliminates cloud round-trip delays.', ['Edge AI', 'Inference', 'Low Latency']],
      ['WebAssembly at the Edge', 'Lightweight sandboxed Wasm workers execute custom routing and personalization near users.', ['Wasm', 'Edge Workers', 'CDN']],
      ['Local Data Aggregation', 'Filtering and compressing sensor streams locally reduces upstream bandwidth costs.', ['Aggregation', 'Bandwidth', 'Edge']],
      ['Autonomous Edge Nodes', 'Disconnected retail, farm, and maritime sites continue operating during WAN outages.', ['Offline', 'Resilience', 'Edge']],
      ['5G Multi-Access Edge (MEC)', 'Telecom-hosted compute brings sub-10ms responsiveness to mobile AR and connected vehicles.', ['MEC', '5G', 'Latency']]
    ],
    'Quantum Computing': [
      ['Qubits & Superposition', 'Quantum bits represent linear combinations of states to explore vast solution spaces simultaneously.', ['Qubits', 'Superposition', 'Physics']],
      ['Quantum Entanglement & Gates', 'Entangled qubit pairs and unitary logic gates form the building blocks of quantum circuits.', ['Entanglement', 'Gates', 'Circuits']],
      ['Quantum Error Correction', 'Logical qubit encoding mitigates decoherence and hardware noise during deep computations.', ['Error Correction', 'Noise', 'Stability']],
      ['Post-Quantum Cryptography', 'Lattice-based algorithms protect sensitive data against future quantum decryption attacks.', ['PQC', 'Cryptography', 'Security']],
      ['Quantum Simulation & Chemistry', 'Modeling molecular interactions accurately accelerates battery, catalyst, and drug discovery.', ['Simulation', 'Chemistry', 'Research']]
    ],
    'Augmented Reality (AR)': [
      ['SLAM & Spatial Tracking', 'Simultaneous localization and mapping anchors 3D digital objects firmly to physical surfaces.', ['SLAM', 'Tracking', 'Spatial']],
      ['WebXR & Mobile AR', 'Browser and smartphone AR experiences overlay interactive 3D previews directly into real rooms.', ['WebXR', 'Mobile AR', '3D']],
      ['Occlusion & Light Estimation', 'Depth sensors and ambient lighting probes blend virtual meshes realistically behind real objects.', ['Occlusion', 'Lighting', 'Realism']],
      ['Industrial AR Assistance', 'Hands-free smart glasses display step-by-step schematics during complex field repairs.', ['Smart Glasses', 'Field Ops', 'AR']],
      ['Gesture & Gaze Interaction', 'Hand tracking and eye-gaze targeting enable natural spatial controls without controllers.', ['Gestures', 'Gaze', 'HCI']]
    ],
    'Virtual Reality (VR)': [
      ['6DoF Head & Hand Tracking', 'Six-degrees-of-freedom tracking translates natural leaning, walking, and reaching into VR.', ['6DoF', 'Tracking', 'Immersion']],
      ['Foveated Rendering', 'Eye-tracked rendering concentrates GPU shading on the viewer’s focal point for crisp 90Hz+ frames.', ['Foveated', 'GPU', '90Hz']],
      ['Spatial Audio & Acoustics', 'HRTF 3D soundscapes simulate realistic distance, direction, and room reflections.', ['Spatial Audio', 'HRTF', 'Sound']],
      ['VR Training & Simulators', 'Risk-free virtual environments train surgeons, pilots, and emergency responders effectively.', ['Simulation', 'Training', 'VR']],
      ['Haptic Feedback Controllers', 'Adaptive triggers and tactile actuators simulate texture, weight, and physical resistance.', ['Haptics', 'Controllers', 'Touch']]
    ],
    'UI/UX Design': [
      ['User Journey Mapping', 'Visualizing end-to-end touchpoints reveals emotional highs, pain points, and drop-off moments.', ['Journey Map', 'UX', 'Flows']],
      ['Information Architecture', 'Clear navigation hierarchies and mental models help users find what they need effortlessly.', ['IA', 'Navigation', 'Structure']],
      ['Accessible Contrast & Focus', 'WCAG AA/AAA color contrast and visible keyboard focus states ensure inclusive usability.', ['Accessibility', 'WCAG', 'Contrast']],
      ['Responsive Grid Systems', '12-column fluid grids and consistent spacing scales adapt layouts gracefully across viewports.', ['Grids', 'Spacing', 'Responsive']],
      ['Heuristic Usability Evaluation', 'Reviewing interfaces against visibility, feedback, and error-prevention principles polishes UX.', ['Heuristics', 'Usability', 'Audit']]
    ],
    'Product Management': [
      ['Product Strategy & Roadmaps', 'Outcome-driven roadmaps align engineering priorities with measurable customer and business value.', ['Roadmap', 'Strategy', 'Outcomes']],
      ['Customer Discovery Interviews', 'Structured user interviews uncover real-world workflows before committing to solutions.', ['Discovery', 'Interviews', 'PM']],
      ['Prioritization Frameworks', 'RICE and impact-effort scoring bring objective clarity to backlog trade-offs.', ['RICE', 'Prioritization', 'Backlog']],
      ['North Star & Funnel Metrics', 'Tracking activation, retention, and cohort engagement measures true product-market fit.', ['Metrics', 'Retention', 'Analytics']],
      ['Go-to-Market & Launch Readiness', 'Cross-functional launch checklists coordinate docs, pricing, support, and rollout telemetry.', ['GTM', 'Launch', 'Alignment']]
    ],
    'Quality Assurance (QA)': [
      ['End-to-End Browser Testing', 'Playwright and Cypress simulate real user clicks and assertions across modern browsers.', ['Playwright', 'E2E', 'Automation']],
      ['Unit & Integration Testing', 'Isolated unit tests and service contract checks verify business logic rapidly on every commit.', ['Unit Tests', 'Mocks', 'Coverage']],
      ['Load & Stress Testing', 'Simulating thousands of concurrent virtual users exposes throughput ceilings and memory leaks.', ['Load Test', 'Performance', 'Scale']],
      ['Visual Regression Testing', 'Automated pixel-diff snapshots catch unintended CSS layout shifts across breakpoints.', ['Visual Diff', 'CSS', 'Snapshots']],
      ['Shift-Left Quality Culture', 'Integrating testability reviews and static checks early in design prevents costly late defects.', ['Shift-Left', 'Quality', 'CI']]
    ],
    Automation: [
      ['Workflow & Task Orchestration', 'Connecting triggers, webhooks, and scheduled jobs eliminates repetitive manual operations.', ['Orchestration', 'Triggers', 'Workflows']],
      ['Robotic Process Automation', 'Software bots automate structured data entry, invoice parsing, and legacy system bridges.', ['RPA', 'Bots', 'Operations']],
      ['Intelligent Document Processing', 'OCR and language models extract structured fields from PDFs, receipts, and forms automatically.', ['OCR', 'IDP', 'Extraction']],
      ['Browser & Script Automation', 'Headless scripts automate health checks, report generation, and multi-step QA verification.', ['Headless', 'Scripting', 'Checks']],
      ['Self-Healing Runbooks', 'Automated remediation scripts restart stalled workers and scale capacity on alert thresholds.', ['Runbooks', 'Auto-Heal', 'Ops']]
    ],
    'Open Source': [
      ['Permissive & Copyleft Licensing', 'MIT, Apache 2.0, and GPL licenses define clear rights for commercial and community reuse.', ['Licenses', 'MIT', 'Apache']],
      ['Community Governance & RFCs', 'Transparent issue triage, contributor guides, and RFCs sustain healthy open-source projects.', ['Governance', 'RFCs', 'Community']],
      ['Supply Chain Security & SBOM', 'Software bills of materials and signed releases protect downstream users from tampered packages.', ['SBOM', 'Security', 'Packages']],
      ['Documentation & Developer DX', 'Clear READMEs, runnable examples, and changelogs lower the barrier for new contributors.', ['Docs', 'DX', 'Guides']],
      ['InnerSource Collaboration', 'Applying open-source pull-request culture inside organizations accelerates shared platform reuse.', ['InnerSource', 'Teams', 'Reuse']]
    ],
    Networking: [
      ['TCP/IP, DNS & Routing', 'Packet switching, BGP routing, and hierarchical DNS resolution connect every host on the internet.', ['TCP/IP', 'DNS', 'BGP']],
      ['HTTP/3 & QUIC Protocol', 'UDP-based multiplexed streams eliminate head-of-line blocking for faster mobile web loads.', ['HTTP/3', 'QUIC', 'Speed']],
      ['Software-Defined Networking', 'Programmable control planes dynamically segment traffic and enforce firewall policies in code.', ['SDN', 'Virtual', 'Policy']],
      ['VPNs, WireGuard & Mesh Tunnels', 'Modern cryptographic tunnels connect distributed teams and hybrid clouds securely.', ['WireGuard', 'VPN', 'Tunnels']],
      ['CDN Anycast & Edge Routing', 'Anycast BGP routes user requests automatically to the nearest healthy edge point of presence.', ['Anycast', 'CDN', 'Routing']]
    ]
  };

  function buildInitialCards() {
    const cards = [];
    let counter = 1;

    Object.keys(CATEGORY_TOPICS).forEach((category) => {
      const topics = CATEGORY_TOPICS[category];
      const images = CATEGORY_POOLS[category] || IMAGE_BANK.tech;
      topics.forEach(([title, description, tags], idx) => {
        cards.push({
          id: `card-${counter}`,
          title,
          description,
          image: images[idx % images.length] || FALLBACK_IMAGE,
          category,
          tags,
          featured:
            (category === 'Artificial Intelligence' ||
              category === 'Software Engineering' ||
              category === 'Web Development') &&
            idx < 2,
          isDefault: true
        });
        counter += 1;
      });
    });

    return cards;
  }

  const INITIAL_CARDS = buildInitialCards();

  global.CardData = {
    CATEGORIES,
    FALLBACK_IMAGE,
    INITIAL_CARDS
  };
})(window);
