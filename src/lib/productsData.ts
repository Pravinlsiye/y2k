/** Single source of truth for all Y2kSaaS product metadata */

export interface ProductMeta {
  id: string;
  name: string;
  category: string;
  tagline: string;
  desc: string;
  status: "available" | "development";
  route: string;
  capabilities: string[];
}

export const productsData: ProductMeta[] = [
  {
    id: "prism",
    name: "Prism",
    category: "Cloud Infrastructure",
    tagline: "One API. Every cloud.",
    desc: "A unified infrastructure layer wrapping AWS, GCP, Azure, and other providers. Deploy, migrate, and optimize across clouds from one config file.",
    status: "available",
    route: "/products/prism",
    capabilities: ["Unified Cloud API", "Instant migration", "Multi-cloud routing", "Function Mesh", "App Platform"],
  },
  {
    id: "anvil",
    name: "Anvil",
    category: "VM Orchestration",
    tagline: "Any hardware. Any cloud.",
    desc: "Provision and orchestrate virtual machines across cloud providers and on-premises infrastructure. Specify exact hardware combinations via config. Container runtime included.",
    status: "available",
    route: "/products/anvil",
    capabilities: ["Multi-cloud VMs", "On-premises support", "Hardware specification", "Container runtime", "YAML configuration"],
  },
  {
    id: "vault",
    name: "Vault",
    category: "File Storage",
    tagline: "One storage API. Every cloud.",
    desc: "A cross-cloud file storage API with ACL-based access control, folder organization, and metadata management. 99.98% SLA at a fraction of standard provider cost.",
    status: "available",
    route: "/products/vault",
    capabilities: ["Unified storage API", "ACL roles", "Cross-cloud replication", "99.98% SLA", "Cost optimization"],
  },
  {
    id: "signal",
    name: "Signal",
    category: "IoT Platform",
    tagline: "Field to cloud. Securely.",
    desc: "Secure bi-directional communication between field devices and applications. AWS and Azure IoT support, x509 certificate security, and self-service device provisioning.",
    status: "available",
    route: "/products/signal",
    capabilities: ["Bi-directional messaging", "AWS and Azure support", "x509 security", "Device provisioning API", "Message routing"],
  },
];

export function getProduct(id: string): ProductMeta | undefined {
  return productsData.find((p) => p.id === id);
}
