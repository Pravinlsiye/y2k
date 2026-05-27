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
    id: "swe-1",
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
    id: "emb-1",
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
    id: "cloud-1",
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
    id: "pm-1",
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
    id: "ai-1",
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
    id: "ux-1",
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
    id: "sales-1",
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
    id: "devrel-1",
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
];

export function getJob(id: string): Job | undefined {
  return jobs.find((j) => j.id === id);
}
