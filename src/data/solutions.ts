export type Solution = {
  slug: string;
  name: string;
  category: string;
  blurb: string;
  eyebrow: string;
  headline: string[];
  sub: string;
  designedFor: string;
  coreFocus: string;
  challenge: { title: string; body: string };
  capabilities: { icon: string; title: string; body: string }[];
  workflow: { title: string; body: string }[];
  diagram: "signal" | "flight" | "fingerprint" | "transaction";
  audiences: ("law-enforcement" | "corporate-security")[];
};

export const solutions: Solution[] = [
  {
    slug: "strotpragna",
    name: "STROTPRAGNA",
    category: "OSINT PLATFORM",
    blurb: "Find the connections hidden across open sources and the deep web.",
    eyebrow: "OSINT / DEEP WEB INTELLIGENCE",
    headline: ["Surface the signals.", "Connect the intelligence."],
    sub: "An OSINT platform for deep web monitoring and correlation. Bring fragmented open-source information into a clearer investigative context.",
    designedFor: "Law enforcement investigators & corporate security teams",
    coreFocus: "Deep web monitoring · Open-source correlation",
    challenge: {
      title: "Scattered sources can hide the bigger picture.",
      body: "Relevant information rarely lives in one place. Investigators and security teams need to move beyond isolated signals to understand how sources, entities and activity connect.",
    },
    capabilities: [
      {
        icon: "radar",
        title: "Deep web monitoring",
        body: "Explore relevant deep web signals as part of an open-source intelligence workflow.",
      },
      {
        icon: "network",
        title: "Intelligence correlation",
        body: "Connect related information and examine relationships across fragmented source material.",
      },
      {
        icon: "eye",
        title: "Investigative context",
        body: "Turn collected signals into a more coherent view for investigation and threat assessment.",
      },
    ],
    workflow: [
      {
        title: "Define",
        body: "Set the investigative question and relevant scope.",
      },
      {
        title: "Monitor",
        body: "Collect relevant open-source and deep web signals.",
      },
      { title: "Correlate", body: "Examine connected entities and activity." },
      { title: "Review", body: "Assess findings within the investigation." },
    ],
    diagram: "signal",
    audiences: ["law-enforcement", "corporate-security"],
  },
  {
    slug: "dronlyzer",
    name: "Dronlyzer",
    category: "UAV FORENSICS",
    blurb: "Extract drone data and reconstruct the story behind a flight.",
    eyebrow: "DIGITAL FORENSICS / UAV EVIDENCE",
    headline: ["Reconstruct the flight.", "Understand the evidence."],
    sub: "A drone forensics kit for UAV data extraction and flight path reconstruction. Bring the digital traces of a flight into the investigative picture.",
    designedFor: "Police, forensic laboratories & government investigators",
    coreFocus: "UAV data extraction · Flight path reconstruction",
    challenge: {
      title: "A recovered drone is only the starting point.",
      body: "The investigative value lies in its data. Extracting relevant information and reconstructing flight activity helps investigators understand where a UAV has been and how it relates to a case.",
    },
    capabilities: [
      {
        icon: "download",
        title: "UAV data extraction",
        body: "Focus the forensic workflow on recovering relevant digital information from drone evidence.",
      },
      {
        icon: "route",
        title: "Flight reconstruction",
        body: "Reconstruct flight paths to examine movement and understand operational context.",
      },
      {
        icon: "scan",
        title: "Evidence analysis",
        body: "Bring extracted data and reconstructed activity together for investigative review.",
      },
    ],
    workflow: [
      { title: "Assess", body: "Identify the UAV and scope the examination." },
      { title: "Extract", body: "Recover relevant drone data for analysis." },
      {
        title: "Reconstruct",
        body: "Build a view of the recorded flight path.",
      },
      {
        title: "Interpret",
        body: "Review flight activity against the case context.",
      },
    ],
    diagram: "flight",
    audiences: ["law-enforcement"],
  },
  {
    slug: "fingerprint-kit",
    name: "Fingerprint Kit",
    category: "FIELD BIOMETRICS",
    blurb: "Expert-grade biometric capture for field investigation units.",
    eyebrow: "FIELD INVESTIGATION / BIOMETRICS",
    headline: ["Biometric capture, where", "the investigation begins."],
    sub: "Expert-grade biometric capture tools for field investigation units. Equip the point of collection with a focused fingerprint capture workflow.",
    designedFor: "Field investigation units & law enforcement teams",
    coreFocus: "Fingerprint collection · Field biometric capture",
    challenge: {
      title: "Critical evidence starts at the point of capture.",
      body: "Field investigators need specialized tools to collect biometric evidence as part of a structured evidence workflow. The quality and context of collection matter long before analysis begins.",
    },
    capabilities: [
      {
        icon: "fingerprint",
        title: "Biometric capture",
        body: "Specialized tools focused on capturing fingerprint evidence during an investigation.",
      },
      {
        icon: "toolbox",
        title: "Field-focused toolkit",
        body: "An expert-grade kit intended for the practical needs of field investigation units.",
      },
      {
        icon: "clipboard",
        title: "Collection workflow",
        body: "Support a deliberate approach to biometric collection and subsequent investigative review.",
      },
    ],
    workflow: [
      {
        title: "Prepare",
        body: "Establish the collection context and equipment.",
      },
      {
        title: "Capture",
        body: "Collect fingerprint information in the field.",
      },
      { title: "Review", body: "Examine the captured biometric material." },
      {
        title: "Document",
        body: "Place collection findings in the case workflow.",
      },
    ],
    diagram: "fingerprint",
    audiences: ["law-enforcement"],
  },
  {
    slug: "lea-solutions",
    name: "LEA Solutions",
    category: "CUSTOM INTELLIGENCE",
    blurb:
      "Purpose-built intelligence and crypto-tracking modules for law enforcement.",
    eyebrow: "LAW ENFORCEMENT / CUSTOM INTELLIGENCE",
    headline: [
      "Your investigative mandate.",
      "A tailored intelligence workflow.",
    ],
    sub: "Custom intelligence and crypto-tracking modules for law enforcement. Shape the solution around the questions your agency needs to answer.",
    designedFor: "Police, government investigators & forensic laboratories",
    coreFocus: "Custom intelligence modules · Crypto tracking",
    challenge: {
      title: "Specialized cases need more than generic tooling.",
      body: "Different agencies work with different data, priorities and investigative processes. Custom intelligence modules help align technical capability with the operational questions at hand.",
    },
    capabilities: [
      {
        icon: "modules",
        title: "Custom intelligence",
        body: "Scope purpose-built modules around the agency's investigative requirements.",
      },
      {
        icon: "wallet",
        title: "Crypto tracking",
        body: "Explore crypto-tracking modules for investigations involving digital-asset activity.",
      },
      {
        icon: "flow",
        title: "Workflow alignment",
        body: "Define how intelligence capabilities should fit the agency's collection and analysis process.",
      },
    ],
    workflow: [
      {
        title: "Scope",
        body: "Define the agency's use case and requirements.",
      },
      {
        title: "Design",
        body: "Map the intelligence workflow and module scope.",
      },
      {
        title: "Configure",
        body: "Shape capabilities around agreed requirements.",
      },
      {
        title: "Review",
        body: "Evaluate the workflow with your investigative team.",
      },
    ],
    diagram: "transaction",
    audiences: ["law-enforcement"],
  },
];
