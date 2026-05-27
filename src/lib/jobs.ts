export interface Job {
  id: string;
  title: string;
  dept: string;
  location: string;
  type: string;
  tag: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  nice: string[];
}

export const jobs: Job[] = [
  {
    id: "SWE552601",
    title: "Senior Software Engineer",
    dept: "Engineering",
    location: "Remote",
    type: "Full-time",
    tag: "Engineering",
    summary:
      "Build and maintain the core platform services that underpin our SaaS products and connected-hardware integrations. You will own subsystems end-to-end, from API design to deployment and on-call operations.",
    responsibilities: [
      "Design, implement, and ship production backend services and APIs",
      "Define system boundaries and data contracts across hardware-software interfaces",
      "Own reliability, performance, and observability for your services",
      "Participate in architecture discussions and technical decisions",
      "Review code and raise engineering standards across the team",
      "Contribute to on-call rotations and incident response",
    ],
    requirements: [
      "5+ years of professional software engineering experience",
      "Strong proficiency in one or more of: Go, Rust, TypeScript, Python",
      "Experience designing and operating distributed systems in production",
      "Sound understanding of networking, databases, and infrastructure",
      "Track record of shipping reliable software at scale",
    ],
    nice: [
      "Experience with embedded systems or hardware-software integration",
      "Prior work in industrial, infrastructure, or operational technology domains",
      "Familiarity with MQTT, gRPC, or real-time data pipelines",
    ],
  },
  {
    id: "EMB402601",
    title: "Embedded Systems Engineer",
    dept: "Hardware",
    location: "Hybrid",
    type: "Full-time",
    tag: "Hardware",
    summary:
      "Design and develop firmware and embedded software for connected hardware products. You will work across the full embedded stack — from bare-metal MCU programming to RTOS integration and cloud connectivity.",
    responsibilities: [
      "Write and maintain firmware for ARM-based microcontrollers",
      "Develop device drivers, communication stacks, and bootloaders",
      "Integrate hardware with cloud platforms via MQTT, CoAP, or custom protocols",
      "Collaborate with hardware engineers on board bring-up and validation",
      "Define and enforce coding standards for embedded software",
      "Support field debugging and remote device diagnostics",
    ],
    requirements: [
      "3+ years developing firmware for embedded systems in production",
      "Proficiency in C and/or C++ for constrained environments",
      "Experience with RTOS platforms (FreeRTOS, Zephyr, or similar)",
      "Understanding of hardware interfaces: UART, SPI, I2C, CAN, Ethernet",
      "Ability to read schematics and work directly with hardware engineers",
    ],
    nice: [
      "Experience with cellular or LoRa connectivity",
      "Familiarity with industrial protocols (Modbus, OPC-UA, PROFIBUS)",
      "Background in safety-critical or certified embedded development",
    ],
  },
  {
    id: "CLD602601",
    title: "Cloud Infrastructure Engineer",
    dept: "Infrastructure",
    location: "Remote",
    type: "Full-time",
    tag: "Infrastructure",
    summary:
      "Build and operate the infrastructure that runs our SaaS platforms and device-cloud integration systems. You will own reliability, security, and scalability for systems that must never fail.",
    responsibilities: [
      "Design and maintain cloud infrastructure across AWS, GCP, or Azure",
      "Build and improve CI/CD pipelines, deployment automation, and release tooling",
      "Define and enforce security baselines across infrastructure and network layers",
      "Implement observability: metrics, tracing, logging, and alerting",
      "Respond to and lead resolution of infrastructure incidents",
      "Evaluate and introduce infrastructure improvements through RFCs",
    ],
    requirements: [
      "4+ years of infrastructure or platform engineering in production environments",
      "Deep experience with Kubernetes and container orchestration",
      "Proficiency in infrastructure-as-code (Terraform, Pulumi, or CDK)",
      "Strong understanding of networking, security, and identity systems",
      "Experience operating systems with SLA requirements",
    ],
    nice: [
      "Experience with IoT device fleet management at scale",
      "Background in operational technology or industrial infrastructure",
      "Certifications in cloud platforms or security (CKA, AWS SAA, etc.)",
    ],
  },
  {
    id: "PMG702601",
    title: "Product Manager",
    dept: "Product",
    location: "Remote",
    type: "Full-time",
    tag: "Product",
    summary:
      "Own product direction for one or more Y2kSaaS products. You will work directly with engineering and customers to identify real operational problems, define focused solutions, and ship products that work in demanding environments.",
    responsibilities: [
      "Define product strategy and roadmap grounded in operational customer needs",
      "Conduct qualitative and quantitative research with engineering and operations teams",
      "Write clear, precise specifications that give engineers the context they need",
      "Work with engineering to scope, prioritize, and ship incrementally",
      "Establish product metrics and monitor outcomes post-launch",
      "Communicate product decisions clearly across the organization",
    ],
    requirements: [
      "4+ years of product management experience in technical B2B products",
      "Ability to understand and communicate technical constraints clearly",
      "Track record of shipping products to engineering or operations audiences",
      "Strong written communication — our product process is document-driven",
      "Comfort with ambiguity and experience working in small, fast teams",
    ],
    nice: [
      "Background in industrial, infrastructure, or hardware-software products",
      "Prior engineering or technical background",
      "Experience with connected device platforms or operational software",
    ],
  },
  {
    id: "AIM502601",
    title: "AI/ML Engineer",
    dept: "Intelligence",
    location: "Remote",
    type: "Full-time",
    tag: "Engineering",
    summary:
      "Build intelligent systems that operate reliably in real-world operational environments. You will design and deploy ML pipelines, anomaly detection systems, and decision-support tooling that connects to hardware and cloud infrastructure.",
    responsibilities: [
      "Design and implement ML models for operational and industrial data",
      "Build and maintain data pipelines from device telemetry to model inference",
      "Evaluate model performance in production and implement continuous improvement",
      "Collaborate with hardware and software engineers on data collection",
      "Define monitoring strategies for deployed models",
      "Contribute to AI tooling and internal infrastructure",
    ],
    requirements: [
      "3+ years building and deploying ML systems in production",
      "Strong Python and familiarity with PyTorch, scikit-learn, or similar",
      "Experience with time-series, sensor, or streaming data",
      "Understanding of MLOps and model lifecycle management",
      "Ability to communicate model decisions and uncertainty clearly to non-ML stakeholders",
    ],
    nice: [
      "Experience with edge inference on embedded or resource-constrained hardware",
      "Background in anomaly detection, predictive maintenance, or industrial ML",
      "Familiarity with operational technology datasets",
    ],
  },
  {
    id: "UXD802601",
    title: "Product Designer (UX)",
    dept: "Design",
    location: "Remote",
    type: "Full-time",
    tag: "Design",
    summary:
      "Design interfaces for complex operational systems that engineers and operators depend on daily. You will own the entire design process from discovery through delivery, and you care as much about system clarity as visual precision.",
    responsibilities: [
      "Own UX for one or more product surfaces from discovery to production",
      "Conduct user research with engineering and operations professionals",
      "Create flows, wireframes, prototypes, and high-fidelity designs",
      "Collaborate closely with engineering — you understand what can be built",
      "Define and maintain design system components and documentation",
      "Evaluate shipped work against design intent and iterate",
    ],
    requirements: [
      "4+ years of product design experience in complex technical software",
      "Strong interaction design skills — motion, state, and edge cases",
      "Proficiency in Figma and ability to prototype interactions",
      "Portfolio demonstrating design for operational, engineering, or data-dense UI",
      "Ability to write clearly about design decisions and rationale",
    ],
    nice: [
      "Experience designing for hardware-connected products",
      "Front-end development skills (HTML, CSS, basic JavaScript)",
      "Background in industrial, infrastructure, or B2B enterprise software",
    ],
  },
  {
    id: "SAE902601",
    title: "Enterprise Account Executive",
    dept: "Sales",
    location: "Remote",
    type: "Full-time",
    tag: "Sales",
    summary:
      "Own new business development for enterprise accounts evaluating Y2kSaaS connected hardware and software solutions. You will sell complex technical systems to engineering leads, CTOs, and infrastructure architects.",
    responsibilities: [
      "Identify and develop enterprise opportunities in target verticals",
      "Lead full sales cycles from qualification through contract close",
      "Work with engineering to conduct technical evaluations and demos",
      "Build and maintain relationships with technical buyers and economic stakeholders",
      "Develop account plans and maintain accurate pipeline in CRM",
      "Provide structured market and customer feedback to product and engineering",
    ],
    requirements: [
      "5+ years of enterprise B2B sales, with 2+ years selling technical products",
      "Track record of closing six-figure technical or infrastructure deals",
      "Ability to understand and articulate complex technical product value",
      "Experience selling to engineering or operations buyers",
      "Disciplined pipeline management and forecasting",
    ],
    nice: [
      "Background selling hardware-software systems, infrastructure, or industrial software",
      "Existing relationships in manufacturing, energy, logistics, or critical infrastructure",
      "Technical background or engineering education",
    ],
  },
  {
    id: "DRE552602",
    title: "Developer Relations Engineer",
    dept: "Engineering",
    location: "Remote",
    type: "Full-time",
    tag: "Engineering",
    summary:
      "Build the developer experience around Y2kSaaS APIs, SDKs, and connected-hardware platforms. You will create technical content, gather developer feedback, and work with engineering to improve the developer experience from the outside in.",
    responsibilities: [
      "Create technical documentation, guides, and reference implementations",
      "Build and maintain example applications and integration libraries",
      "Engage with developer communities through writing, talks, and open source",
      "Collect and synthesize developer feedback into actionable product insights",
      "Support developers integrating with Y2kSaaS platforms",
      "Collaborate with engineering to improve SDKs and API ergonomics",
    ],
    requirements: [
      "3+ years of software engineering experience with production systems",
      "Demonstrated ability to write clear, precise technical content",
      "Experience with REST APIs, SDKs, and developer tooling",
      "Comfort contributing to open-source codebases",
      "Strong communication skills in written and spoken English",
    ],
    nice: [
      "Experience with embedded or IoT systems",
      "Prior developer relations, technical writing, or developer advocacy role",
      "Public technical writing, talks, or open-source contributions",
    ],
  },

  // ── Engineering ──────────────────────────────────────────

  {
    id: "ENG552603",
    title: "Backend Engineer",
    dept: "Engineering",
    location: "Remote",
    type: "Full-time",
    tag: "Engineering",
    summary: "Build reliable backend services and APIs that power our SaaS products and hardware integration pipelines. You will own features end-to-end, from schema design to deployment.",
    responsibilities: [
      "Design and implement backend services in Go, Python, or TypeScript",
      "Define data models and API contracts across services",
      "Build and maintain internal tooling for data ingestion and processing",
      "Participate in on-call rotations and respond to incidents",
      "Write tests, review code, and document systems clearly",
    ],
    requirements: [
      "3+ years building and shipping backend services in production",
      "Proficiency in at least one of: Go, Python, TypeScript/Node",
      "Solid understanding of databases, caching, and messaging systems",
      "Experience with REST or gRPC API design",
      "Track record of shipping reliable software on schedule",
    ],
    nice: [
      "Experience with time-series databases or streaming data",
      "Background in IoT or hardware-connected systems",
      "Contributions to open-source backend tooling",
    ],
  },

  {
    id: "FRE552604",
    title: "Frontend Engineer",
    dept: "Engineering",
    location: "Remote",
    type: "Full-time",
    tag: "Engineering",
    summary: "Build precise, performant frontend interfaces for our SaaS platforms and internal tooling. You care about accessibility, animation, and the details that make software feel right.",
    responsibilities: [
      "Build component systems and page layouts in TypeScript with a modern framework",
      "Collaborate with designers to implement interactions with precision",
      "Optimise for performance: bundle size, Core Web Vitals, perceived speed",
      "Maintain and evolve the shared design system",
      "Write accessible, well-tested frontend code",
    ],
    requirements: [
      "3+ years of professional frontend engineering experience",
      "Deep proficiency in TypeScript, CSS, and a modern component framework",
      "Strong sense of visual correctness and motion quality",
      "Experience implementing design systems and reusable component libraries",
      "Working knowledge of accessibility standards",
    ],
    nice: [
      "Experience with animation libraries (GSAP, Motion, CSS scroll-driven)",
      "Prior work on data-dense or real-time dashboard interfaces",
      "Open-source component or tooling contributions",
    ],
  },

  {
    id: "FSE552605",
    title: "Full Stack Engineer",
    dept: "Engineering",
    location: "Remote",
    type: "Full-time",
    tag: "Engineering",
    summary: "Own features across frontend and backend. You will design and implement complete product surfaces: from database schema to API to UI, shipping independently.",
    responsibilities: [
      "Implement complete product features from database to UI",
      "Design APIs consumed by the frontend and external integrations",
      "Build responsive, accessible user interfaces",
      "Participate in technical decisions on both stack layers",
      "Maintain and monitor services in production",
    ],
    requirements: [
      "4+ years of professional software engineering experience",
      "Strong proficiency in both frontend and backend development",
      "Comfortable making product decisions with limited specification",
      "Experience with relational and non-relational databases",
      "Able to ship features from blank canvas to production independently",
    ],
    nice: [
      "Experience with edge compute or real-time data pipelines",
      "Prior startup or small-team experience shipping product solo",
      "Familiarity with hardware integration or MQTT/WebSocket protocols",
    ],
  },

  {
    id: "SEC552606",
    title: "Security Engineer",
    dept: "Engineering",
    location: "Remote",
    type: "Full-time",
    tag: "Engineering",
    summary: "Own security across our infrastructure, SaaS platforms, and hardware-cloud integration layers. You will define security baselines, run threat modelling, and respond to incidents.",
    responsibilities: [
      "Define and enforce security standards across infrastructure and application layers",
      "Conduct threat modelling for new systems and integrations",
      "Build and maintain security tooling: scanning, alerting, certificate management",
      "Lead security reviews of architectural decisions",
      "Respond to and lead resolution of security incidents",
    ],
    requirements: [
      "4+ years in security engineering or application security",
      "Experience securing cloud infrastructure (AWS, GCP, or Azure)",
      "Understanding of common vulnerability classes and mitigations",
      "Proficiency with IAM, network security, and certificate lifecycle management",
      "Track record of shipping security improvements without blocking engineering velocity",
    ],
    nice: [
      "Experience securing IoT or embedded device fleets",
      "Certifications: OSCP, AWS Security, CKS, or equivalent",
      "Prior work in OT or industrial security contexts",
    ],
  },

  {
    id: "DTE552607",
    title: "Data Engineer",
    dept: "Engineering",
    location: "Remote",
    type: "Full-time",
    tag: "Engineering",
    summary: "Design and build the data infrastructure that moves telemetry from field devices to cloud analytics and ML pipelines. You will own pipelines that run at production scale.",
    responsibilities: [
      "Build and maintain data ingestion pipelines from IoT devices and cloud sources",
      "Design scalable storage schemas for time-series and event data",
      "Implement data quality checks and monitoring across pipelines",
      "Work with ML engineers to prepare feature datasets for model training",
      "Define data contracts between services and downstream consumers",
    ],
    requirements: [
      "3+ years building data pipelines in production",
      "Proficiency in Python, SQL, and a streaming framework (Kafka, Flink, or Spark)",
      "Experience with cloud data warehouses and data lake architectures",
      "Understanding of time-series and event-driven data patterns",
      "Ability to balance pipeline reliability with engineering velocity",
    ],
    nice: [
      "Experience with IoT data streams or MQTT ingestion at scale",
      "Background in operational technology or industrial data",
      "Familiarity with Delta Lake, Iceberg, or similar open table formats",
    ],
  },

  {
    id: "SRE552608",
    title: "Site Reliability Engineer",
    dept: "Engineering",
    location: "Remote",
    type: "Full-time",
    tag: "Engineering",
    summary: "Own the reliability of our production systems. You will define SLOs, build observability tooling, and lead incident response for platforms that cannot afford to fail.",
    responsibilities: [
      "Define and track SLOs across all production services",
      "Build and maintain observability: metrics, tracing, logging, alerting",
      "Lead incident response and post-incident reviews",
      "Automate toil across deployment, scaling, and recovery processes",
      "Partner with engineering teams to bake reliability into design",
    ],
    requirements: [
      "4+ years in site reliability, platform, or DevOps engineering",
      "Deep experience with observability tooling (Prometheus, Grafana, OpenTelemetry)",
      "Strong scripting and automation skills (Python, Go, or Bash)",
      "Experience managing Kubernetes clusters in production",
      "Ability to diagnose and resolve complex distributed system failures",
    ],
    nice: [
      "Experience operating IoT or edge device fleets",
      "Background in OT or industrial monitoring systems",
      "Prior work on multi-region, high-availability deployments",
    ],
  },

  {
    id: "SYS552609",
    title: "Systems Engineer",
    dept: "Engineering",
    location: "Remote",
    type: "Full-time",
    tag: "Engineering",
    summary: "Design the integration layer between hardware and cloud systems. You will define protocols, data contracts, and communication architectures that span device firmware to backend services.",
    responsibilities: [
      "Design and document hardware-software integration architectures",
      "Define communication protocols and data schemas across the stack",
      "Build integration test frameworks for hardware-in-the-loop testing",
      "Collaborate with embedded and backend engineers on interface contracts",
      "Troubleshoot and resolve cross-layer integration failures",
    ],
    requirements: [
      "4+ years in systems, integration, or embedded-cloud engineering",
      "Understanding of embedded communication protocols: MQTT, CoAP, Modbus, CAN",
      "Proficiency in systems programming (C, C++, Go, or Rust)",
      "Experience designing and testing distributed systems with hardware dependencies",
      "Ability to read and write technical specifications and interface contracts",
    ],
    nice: [
      "Background in industrial automation or operational technology",
      "Experience with digital twins or hardware simulation",
      "Prior work defining cross-team API or protocol standards",
    ],
  },

  // ── Hardware ─────────────────────────────────────────────

  {
    id: "HWE402602",
    title: "Hardware Engineer",
    dept: "Hardware",
    location: "Hybrid",
    type: "Full-time",
    tag: "Hardware",
    summary: "Design and validate hardware systems for connected device products. You will work across schematic capture, PCB layout review, bring-up, and production validation.",
    responsibilities: [
      "Design analog and digital circuits for connected device products",
      "Review PCB layouts for signal integrity, thermal, and EMC compliance",
      "Lead hardware bring-up and validation on new designs",
      "Define test coverage for manufacturing and field qualification",
      "Collaborate with firmware engineers on board-level bring-up",
    ],
    requirements: [
      "4+ years of hardware engineering experience on production devices",
      "Proficiency in schematic capture (KiCad, Altium, or equivalent)",
      "Experience with analog design, power electronics, or RF systems",
      "Ability to debug hardware at the signal level with scope and logic analyser",
      "Understanding of EMC, thermal, and reliability design principles",
    ],
    nice: [
      "Experience with industrial or harsh-environment hardware design",
      "Background in low-power or battery-operated device design",
      "Prior work with certifications: CE, FCC, UL, or IEC standards",
    ],
  },

  {
    id: "PCB402603",
    title: "PCB Design Engineer",
    dept: "Hardware",
    location: "Hybrid",
    type: "Full-time",
    tag: "Hardware",
    summary: "Own PCB layout for connected device products from schematic to Gerber. You will design high-density, mixed-signal boards that balance manufacturability, signal integrity, and thermal performance.",
    responsibilities: [
      "Perform PCB layout for complex mixed-signal and RF designs",
      "Optimise for signal integrity, impedance control, and EMC",
      "Manage component placement, thermal design, and DFM reviews",
      "Coordinate with manufacturing partners on fabrication and assembly",
      "Validate layouts against schematic and design rules",
    ],
    requirements: [
      "4+ years of PCB layout experience on production hardware",
      "Proficiency in Altium Designer or KiCad at advanced level",
      "Experience with high-speed digital, RF, and power electronics layout",
      "Understanding of DFM, IPC standards, and manufacturing constraints",
      "Ability to review fabrication quotes and manage BOM revisions",
    ],
    nice: [
      "Experience with HDI or flex-rigid PCB designs",
      "Background in automotive or industrial-grade PCB design",
      "Prior work managing PCB fabrication through certified manufacturers",
    ],
  },

  {
    id: "SIE402604",
    title: "Systems Integration Engineer",
    dept: "Hardware",
    location: "Hybrid",
    type: "Full-time",
    tag: "Hardware",
    summary: "Integrate hardware systems into operational environments. You will own the physical and protocol integration of devices into customer infrastructure, from commissioning to validation.",
    responsibilities: [
      "Lead hardware integration and commissioning in operational environments",
      "Define integration test plans for hardware-software systems",
      "Build tooling for automated hardware validation and diagnostics",
      "Document integration procedures and field troubleshooting guides",
      "Support customer deployments and resolve field integration issues",
    ],
    requirements: [
      "3+ years in systems integration, field engineering, or hardware deployment",
      "Experience with industrial networking and fieldbus protocols",
      "Ability to work on-site in operational technology environments",
      "Strong diagnostics mindset: comfortable with oscilloscopes, protocol analysers, and logs",
      "Clear technical communication for both engineering and operations audiences",
    ],
    nice: [
      "Experience with SCADA, PLC, or DCS integration",
      "Background in industrial or critical infrastructure environments",
      "Familiarity with IEC 61850, OPC-UA, or Modbus TCP",
    ],
  },

  // ── Infrastructure ────────────────────────────────────────

  {
    id: "PLE602602",
    title: "Platform Engineer",
    dept: "Infrastructure",
    location: "Remote",
    type: "Full-time",
    tag: "Infrastructure",
    summary: "Build the internal platform that engineering teams use to develop, test, and deploy services. You will own the developer experience layer: CI/CD, preview environments, and internal tooling.",
    responsibilities: [
      "Build and maintain CI/CD pipelines and deployment automation",
      "Develop internal developer platforms: preview environments, CLI tooling, runbooks",
      "Define standards for container builds, secrets management, and service deployment",
      "Improve developer experience metrics: build times, deployment frequency, MTTR",
      "Collaborate with engineering teams to reduce operational friction",
    ],
    requirements: [
      "3+ years in platform engineering or developer experience",
      "Proficiency with Kubernetes, Helm, and infrastructure-as-code tools",
      "Experience building CI/CD pipelines (GitHub Actions, ArgoCD, or Tekton)",
      "Strong scripting skills in Python, Go, or Bash",
      "Ability to articulate and measure developer experience improvements",
    ],
    nice: [
      "Experience building internal developer portals or self-service tooling",
      "Background in multi-cloud or hybrid cloud environments",
      "Familiarity with eBPF, service mesh, or advanced networking",
    ],
  },

  {
    id: "NET602603",
    title: "Network Engineer",
    dept: "Infrastructure",
    location: "Remote",
    type: "Full-time",
    tag: "Infrastructure",
    summary: "Design and operate the network infrastructure that connects cloud systems to field devices. You will own network architecture, connectivity, and security across cloud and on-premises environments.",
    responsibilities: [
      "Design and implement network architectures for cloud and hybrid environments",
      "Define and enforce network security policies and segmentation",
      "Manage connectivity for IoT device fleets: VPN, TLS, certificate infrastructure",
      "Monitor and diagnose network performance issues across distributed deployments",
      "Collaborate with hardware teams on device connectivity requirements",
    ],
    requirements: [
      "4+ years of network engineering in production environments",
      "Strong understanding of TCP/IP, routing protocols, and network security",
      "Experience with cloud networking (AWS VPC, Azure VNet, or GCP VPC)",
      "Proficiency managing firewalls, load balancers, and VPN infrastructure",
      "Ability to diagnose network issues at packet level",
    ],
    nice: [
      "Experience with IoT or OT network segmentation",
      "Background in industrial networking or SCADA communication networks",
      "Familiarity with SD-WAN or zero-trust network architectures",
    ],
  },

  {
    id: "SOE602604",
    title: "Security Operations Engineer",
    dept: "Infrastructure",
    location: "Remote",
    type: "Full-time",
    tag: "Infrastructure",
    summary: "Operate our security monitoring and response function. You will build detection pipelines, triage alerts, and respond to threats across cloud, application, and device layers.",
    responsibilities: [
      "Build and maintain security detection and alerting pipelines",
      "Triage security alerts and lead incident response investigations",
      "Implement SIEM tooling and threat hunting workflows",
      "Conduct regular vulnerability assessments and penetration tests",
      "Define and track security KPIs and SLAs",
    ],
    requirements: [
      "3+ years in security operations, threat detection, or incident response",
      "Experience with SIEM platforms and log aggregation at scale",
      "Understanding of attack techniques and detection methods",
      "Proficiency with scripting for security automation (Python or Go)",
      "Strong incident communication and documentation skills",
    ],
    nice: [
      "Experience with OT or IoT threat detection",
      "SIEM engineering background (Elastic, Splunk, or Chronicle)",
      "Prior work in incident response for critical infrastructure",
    ],
  },

  // ── Product ───────────────────────────────────────────────

  {
    id: "TPM702602",
    title: "Technical Product Manager",
    dept: "Product",
    location: "Remote",
    type: "Full-time",
    tag: "Product",
    summary: "Own product direction for our developer-facing surfaces: APIs, SDKs, and platform integrations. You will bridge engineering and the developer community, translating operational needs into precise specifications.",
    responsibilities: [
      "Define product strategy and roadmap for APIs, SDKs, and developer tooling",
      "Write precise technical specifications that give engineers the context they need",
      "Conduct developer research and synthesise feedback into actionable insights",
      "Work closely with engineering to scope, prioritise, and ship incrementally",
      "Track adoption metrics and iterate on developer experience",
    ],
    requirements: [
      "3+ years as a technical product manager on developer-facing products",
      "Prior engineering background or equivalent technical depth",
      "Ability to read and write API specifications and technical documentation",
      "Strong written communication in an async, document-driven process",
      "Experience working on platform or infrastructure products",
    ],
    nice: [
      "Background in IoT, hardware-software integration, or operational platforms",
      "Prior developer relations or developer advocacy experience",
      "Experience with OpenAPI, AsyncAPI, or similar specification formats",
    ],
  },

  {
    id: "POM702603",
    title: "Product Operations Manager",
    dept: "Product",
    location: "Remote",
    type: "Full-time",
    tag: "Product",
    summary: "Build the operational infrastructure that makes product development more effective. You will own processes, tooling, and data systems that help engineering and product teams move with clarity.",
    responsibilities: [
      "Design and maintain the product development process: prioritisation, planning, and review",
      "Build tooling and dashboards to track product metrics and team health",
      "Coordinate cross-functional communication between product, engineering, and sales",
      "Manage product documentation and internal knowledge systems",
      "Run retrospectives and identify process improvements",
    ],
    requirements: [
      "3+ years in product operations, program management, or business operations",
      "Strong process design and documentation skills",
      "Comfort with data: able to build dashboards and interpret product metrics",
      "Excellent cross-functional communication across engineering and business teams",
      "Experience with project management and collaboration tooling",
    ],
    nice: [
      "Background in technical product environments",
      "Prior experience at a B2B infrastructure or hardware-software company",
      "Familiarity with OKRs, outcome-based roadmaps, and continuous discovery",
    ],
  },

  {
    id: "GPM702604",
    title: "Growth Product Manager",
    dept: "Product",
    location: "Remote",
    type: "Full-time",
    tag: "Product",
    summary: "Own the activation and retention layer of our SaaS products. You will run experiments, analyse funnels, and build product surfaces that convert qualified users into long-term customers.",
    responsibilities: [
      "Define and execute growth experiments across activation and retention funnels",
      "Analyse product usage data to identify friction points and opportunities",
      "Build and optimise onboarding flows and in-product engagement surfaces",
      "Work with engineering to instrument and iterate on growth features",
      "Report growth metrics and learnings to leadership",
    ],
    requirements: [
      "3+ years in product management with a focus on growth or activation",
      "Quantitative mindset: comfortable with funnel analysis, cohort data, and A/B testing",
      "Experience running structured product experiments with statistical rigour",
      "Clear communication of growth hypotheses and results",
      "Understanding of B2B SaaS acquisition and retention dynamics",
    ],
    nice: [
      "Experience with PLG (product-led growth) models",
      "Background in developer tools or infrastructure products",
      "Prior work with usage-based pricing or self-serve onboarding flows",
    ],
  },

  // ── Design ────────────────────────────────────────────────

  {
    id: "DSE802602",
    title: "Design Systems Engineer",
    dept: "Design",
    location: "Remote",
    type: "Full-time",
    tag: "Design",
    summary: "Build and maintain the component library and design token system that the entire product team uses. You will sit at the intersection of design and engineering, making both faster.",
    responsibilities: [
      "Build and maintain reusable UI components with accessibility and precision",
      "Define and enforce design tokens: color, typography, spacing, motion",
      "Document components with usage guidelines and interactive examples",
      "Collaborate with designers to ensure code matches design intent",
      "Audit existing product surfaces for design system compliance",
    ],
    requirements: [
      "3+ years building production UI component libraries",
      "Strong proficiency in TypeScript and CSS",
      "Deep understanding of accessibility: ARIA, keyboard navigation, contrast",
      "Experience with design token systems and theming",
      "Ability to work fluently in Figma and in code",
    ],
    nice: [
      "Experience building animation systems and motion tokens",
      "Prior work on design systems for data-dense or operational interfaces",
      "Open-source component library contributions",
    ],
  },

  {
    id: "MOD802603",
    title: "Motion Designer",
    dept: "Design",
    location: "Remote",
    type: "Full-time",
    tag: "Design",
    summary: "Own the motion language across Y2kSaaS products. You will design and prototype transitions, micro-interactions, and explanatory animations, then work with engineers to implement them precisely.",
    responsibilities: [
      "Define the motion language for product interactions and marketing surfaces",
      "Prototype animations in Figma, After Effects, or code",
      "Collaborate with frontend engineers to implement animations with precision",
      "Document motion guidelines, timing curves, and easing rationale",
      "Review shipped animations against design intent",
    ],
    requirements: [
      "3+ years of motion design experience in digital products",
      "Proficiency in After Effects, Figma prototyping, or GSAP",
      "Strong understanding of easing, timing, and choreography principles",
      "Portfolio demonstrating purposeful motion in product or marketing contexts",
      "Ability to communicate motion intent clearly to engineering partners",
    ],
    nice: [
      "Experience implementing animations directly in CSS or JavaScript",
      "Background in designing for operational or engineering tool interfaces",
      "Prior work building motion documentation and guidelines",
    ],
  },

  // ── Intelligence ──────────────────────────────────────────

  {
    id: "DTS502602",
    title: "Data Scientist",
    dept: "Intelligence",
    location: "Remote",
    type: "Full-time",
    tag: "Engineering",
    summary: "Extract operational insight from hardware telemetry and platform usage data. You will build models, run experiments, and translate findings into product and engineering decisions.",
    responsibilities: [
      "Analyse device telemetry and platform usage data to surface operational insights",
      "Build predictive models for anomaly detection and maintenance forecasting",
      "Design and evaluate experiments with statistical rigour",
      "Translate analytical findings into clear recommendations for product and engineering",
      "Build reusable data pipelines and feature engineering tooling",
    ],
    requirements: [
      "3+ years of applied data science or machine learning in production",
      "Proficiency in Python, pandas, and scikit-learn or similar ML libraries",
      "Strong understanding of statistical inference, hypothesis testing, and experimental design",
      "Experience working with time-series or sensor data",
      "Ability to communicate findings to both technical and non-technical audiences",
    ],
    nice: [
      "Background in industrial data, predictive maintenance, or operational analytics",
      "Experience with deep learning frameworks (PyTorch or TensorFlow)",
      "Prior work deploying models to production with monitoring",
    ],
  },

  {
    id: "MLP502603",
    title: "ML Platform Engineer",
    dept: "Intelligence",
    location: "Remote",
    type: "Full-time",
    tag: "Engineering",
    summary: "Build the infrastructure that ML engineers and data scientists use to train, evaluate, and deploy models at scale. You will own the MLOps layer from feature stores to serving infrastructure.",
    responsibilities: [
      "Design and operate the ML training and serving infrastructure",
      "Build and maintain feature stores, experiment tracking, and model registries",
      "Define monitoring and alerting for deployed models in production",
      "Collaborate with ML engineers to reduce time from experiment to deployment",
      "Evaluate and adopt ML infrastructure tooling as the field evolves",
    ],
    requirements: [
      "4+ years in ML engineering, MLOps, or platform engineering with ML focus",
      "Experience with MLflow, Kubeflow, SageMaker, or equivalent MLOps platforms",
      "Strong Python and containerisation skills",
      "Understanding of model lifecycle: training, versioning, serving, monitoring",
      "Ability to operate distributed training infrastructure at scale",
    ],
    nice: [
      "Experience with edge model deployment on constrained hardware",
      "Background in streaming feature computation or real-time inference",
      "Prior work in industrial or IoT ML deployment contexts",
    ],
  },

  {
    id: "CVE502604",
    title: "Computer Vision Engineer",
    dept: "Intelligence",
    location: "Remote",
    type: "Full-time",
    tag: "Engineering",
    summary: "Build computer vision systems that extract actionable information from sensor and camera data in operational environments. You will own model development, edge deployment, and production monitoring.",
    responsibilities: [
      "Design and train computer vision models for object detection, classification, and tracking",
      "Optimise models for deployment on constrained hardware (edge devices, embedded SoCs)",
      "Build data labelling and curation pipelines for operational image and video datasets",
      "Monitor deployed models and implement continuous improvement workflows",
      "Collaborate with hardware engineers on sensor selection and integration",
    ],
    requirements: [
      "3+ years building and deploying computer vision systems in production",
      "Proficiency in PyTorch and OpenCV",
      "Experience with model quantisation, pruning, and edge inference (TensorRT, ONNX)",
      "Ability to work with hardware engineers on camera and sensor integration",
      "Understanding of real-time inference constraints and latency budgets",
    ],
    nice: [
      "Experience with thermal imaging, LiDAR, or multi-modal sensor fusion",
      "Background in industrial inspection, monitoring, or safety systems",
      "Prior deployment on NVIDIA Jetson, Coral, or similar edge AI hardware",
    ],
  },

  // ── Sales ─────────────────────────────────────────────────

  {
    id: "SOL902602",
    title: "Solutions Engineer",
    dept: "Sales",
    location: "Remote",
    type: "Full-time",
    tag: "Sales",
    summary: "Bridge technical evaluation and commercial engagement. You will run proof-of-concept deployments, lead technical demos, and support enterprise sales cycles for hardware-software systems.",
    responsibilities: [
      "Lead technical evaluations and proof-of-concept deployments with enterprise customers",
      "Deliver product demos tailored to engineering and operations audiences",
      "Translate customer requirements into technical architecture recommendations",
      "Partner with account executives through complex sales cycles",
      "Provide structured technical feedback to product and engineering",
    ],
    requirements: [
      "3+ years in solutions engineering, technical pre-sales, or a similar role",
      "Ability to understand and communicate complex technical systems clearly",
      "Experience running live technical demonstrations and proof-of-concept engagements",
      "Prior work selling to engineering, infrastructure, or operations buyers",
      "Comfortable working with cloud infrastructure, APIs, and developer tooling",
    ],
    nice: [
      "Background in IoT, connected hardware, or operational technology sales",
      "Prior software engineering or infrastructure engineering experience",
      "Experience with Salesforce or equivalent CRM for technical deal tracking",
    ],
  },

  {
    id: "CSM902603",
    title: "Customer Success Manager",
    dept: "Sales",
    location: "Remote",
    type: "Full-time",
    tag: "Sales",
    summary: "Own the post-sale relationship with enterprise customers. You will drive adoption, reduce churn, and ensure customers extract full operational value from Y2kSaaS products.",
    responsibilities: [
      "Own customer relationships from onboarding through renewal",
      "Build and execute success plans aligned to customer operational objectives",
      "Track product adoption metrics and proactively address friction",
      "Coordinate with engineering and support on escalations",
      "Identify expansion opportunities and partner with account executives on renewals",
    ],
    requirements: [
      "3+ years in customer success for enterprise B2B products",
      "Ability to engage credibly with technical buyers and end users",
      "Experience building and tracking customer health scores and success metrics",
      "Strong written and verbal communication across technical and business stakeholders",
      "Comfort navigating complex enterprise organisations and procurement processes",
    ],
    nice: [
      "Background in infrastructure, IoT, or operational technology products",
      "Experience managing customers with hardware and software components",
      "Prior work with usage-based or consumption pricing models",
    ],
  },

  {
    id: "SDR902604",
    title: "Sales Development Representative",
    dept: "Sales",
    location: "Remote",
    type: "Full-time",
    tag: "Sales",
    summary: "Generate and qualify pipeline for our enterprise sales team. You will research accounts, craft personalised outreach, and identify engineering and operations leaders evaluating connected infrastructure.",
    responsibilities: [
      "Research target accounts and identify engineering, infrastructure, and operations stakeholders",
      "Execute outbound prospecting across email, phone, and LinkedIn",
      "Qualify inbound leads and schedule discovery calls for account executives",
      "Maintain accurate pipeline data in CRM",
      "Provide feedback on messaging quality and target account lists",
    ],
    requirements: [
      "1+ years in a sales development or business development role",
      "Ability to craft technical, relevant outreach to engineering audiences",
      "Disciplined pipeline management and CRM hygiene",
      "Strong written communication and ability to research accounts deeply",
      "Resilience and consistency in high-volume outbound environments",
    ],
    nice: [
      "Prior experience selling into engineering or operations teams",
      "Background in or curiosity about infrastructure, IoT, or hardware-software systems",
      "Experience with sales engagement tooling (Apollo, Outreach, or Salesloft)",
    ],
  },
];

export function getJob(id: string): Job | undefined {
  return jobs.find((j) => j.id === id);
}
