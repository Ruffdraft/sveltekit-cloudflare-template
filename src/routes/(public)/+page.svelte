<script>
  import { WEBSITE_NAME, WEBSITE_DESCRIPTION } from "$config";

  const features = [
    {
      name: "OT-Aware Packet Analysis",
      description:
        "Upload Wireshark or TShark data to visualize network flows, identify industrial protocols, and highlight suspicious OT traffic.",
      link: "/upload",
      link_text: "Upload PCAP",
      new_page: false,
      svg_content: `<path d=\"M4 4L20 20\" stroke=\"currentColor\" stroke-width=\"1.5\"/>`
    },
    {
      name: "Access Segmentation",
      description:
        "Identity-based VPN access to individual systems or IPs. Securely separate third parties or business units.",
      link: "/services/vpn",
      link_text: "Learn More",
      new_page: false,
      svg_content: `<circle cx=\"12\" cy=\"12\" r=\"6\" stroke=\"currentColor\" stroke-width=\"1.5\"/>`
    },
    {
      name: "Cloud-Edge Architecture",
      description:
        "Globally distributed infrastructure using Cloudflare Pages, KV, R2, and Workers. Built for resilience.",
      link: "https://developers.cloudflare.com",
      link_text: "Cloudflare Stack",
      new_page: true,
      svg_content: `<rect x=\"4\" y=\"4\" width=\"16\" height=\"16\" stroke=\"currentColor\" stroke-width=\"1.5\"/>`
    },
    {
      name: "Discovery Pack",
      description:
        "Kickstart visibility and audit your network in 48 hours. Includes PCAP analysis, risk map, and actionable report.",
      link: "/discovery",
      link_text: "Get Started",
      new_page: false,
      svg_content: `<path d=\"M2 12L12 2L22 12L12 22L2 12Z\" stroke=\"currentColor\" stroke-width=\"1.5\"/>`
    },
    {
      name: "Secure User Auth",
      description:
        "Integrated sign-in with MFA, magic links, and session control. Azure AD and enterprise-ready options available.",
      link: "/sign-in",
      link_text: "Try Auth",
      new_page: false,
      svg_content: `<path d=\"M12 2C15.866 2 19 5.13401 19 9C19 14 12 22 12 22C12 22 5 14 5 9C5 5.13401 8.13401 2 12 2Z\" stroke=\"currentColor\" stroke-width=\"1.5\"/>`
    }
  ];
</script>

<svelte:head>
  <title>{WEBSITE_NAME || "Tentrait Ltd – IT & OT Security"}</title>
  <meta name="description" content={WEBSITE_DESCRIPTION || "Tentrait bridges IT and OT environments with intelligent, secure infrastructure. Built on the Cloudflare stack with real-time packet analysis and segmentation."} />
</svelte:head>

<nav class="w-full px-6 py-4 flex justify-between items-center bg-base-100 shadow-sm sticky top-0 z-50">
  <div class="text-xl font-bold text-primary">Tentrait Ltd</div>
  <div class="flex gap-6 text-sm">
    <a href="/" class="link">Home</a>
    <a href="/upload" class="link">Upload</a>
    <a href="/discovery" class="link">Discovery Pack</a>
    <a href="/contact-us" class="link">Contact</a>
  </div>
</nav>

<div class="hero min-h-[60vh]">
  <div class="hero-content text-center py-12">
    <div class="max-w-xl">
      <div class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-warning to-accent mb-4">
        Infrastructure. Insight. Integrity.
      </div>
      <div class="text-4xl md:text-6xl font-bold px-2" style="line-height: 1.2;">
        Bridging
        <span class="underline decoration-secondary decoration-4 md:decoration-[6px]">IT</span>
        and
        <span class="underline decoration-secondary decoration-4 md:decoration-[6px]">OT</span>
        with
        <span class="underline decoration-secondary decoration-4 md:decoration-[6px]">Security</span>
        and
        <span class="underline decoration-secondary decoration-4 md:decoration-[6px]">Clarity</span>
      </div>
      <div class="mt-6 text-sm md:text-lg">
        Tentrait delivers secure, scalable infrastructure for businesses operating across complex digital and operational landscapes.
      </div>
      <div class="mt-6 md:mt-2">
        <a href="/upload">
          <button class="btn btn-primary btn-sm px-6">Try Discovery Pack</button>
        </a>
        <a href="/contact-us">
          <button class="btn btn-outline btn-primary btn-sm px-6 mt-3 mx-2">Contact Us</button>
        </a>
      </div>
    </div>
  </div>
</div>

<div class="min-h-[60vh] px-6 py-12">
  <div class="text-center max-w-4xl mx-auto">
    <h2 class="text-3xl md:text-4xl font-bold mb-6">About Tentrait Ltd</h2>
    <p class="text-lg text-base-content/80">
      Tentrait Ltd is a UK-based infrastructure and cybersecurity consultancy focused on bridging IT and OT environments without disrupting operations. We offer visibility, real-time monitoring, and access segmentation using modern, scalable, cloud-native technologies.
    </p>
  </div>
</div>

<div class="bg-base-200 px-6 py-20">
  <div class="text-center max-w-6xl mx-auto">
    <h2 class="text-3xl md:text-4xl font-bold mb-10">Use Cases</h2>
    <div class="grid md:grid-cols-3 gap-8 text-left">
      <div class="p-6 bg-white shadow rounded-lg">
        <h3 class="text-xl font-bold mb-2">3rd Party Access Control</h3>
        <p class="text-base-content/80">
          Allow vendors to access only specific IPs over VPN using identity-based rules with full audit tracking.
        </p>
      </div>
      <div class="p-6 bg-white shadow rounded-lg">
        <h3 class="text-xl font-bold mb-2">OT Device Monitoring</h3>
        <p class="text-base-content/80">
          Upload packet captures from HMIs, PLCs, and SCADA to detect protocol misuse and rogue traffic.
        </p>
      </div>
      <div class="p-6 bg-white shadow rounded-lg">
        <h3 class="text-xl font-bold mb-2">Infrastructure Audit</h3>
        <p class="text-base-content/80">
          Use the Tentrait Discovery Pack to get a detailed asset inventory and security gap analysis in days—not weeks.
        </p>
      </div>
    </div>
  </div>
</div>

<div class="bg-base-100 px-6 py-16">
  <div class="max-w-3xl mx-auto text-center">
    <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto mb-4" width="50" height="50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h.01M15 12h.01M7.5 19.5a9 9 0 109-9 9 9 0 00-9 9z"/>
    </svg>
    <blockquote class="text-xl font-semibold text-base-content/80">
      “Tentrait gave us immediate insight into our OT network. We uncovered hidden risks and had practical actions by the end of the week.”
    </blockquote>
    <p class="mt-4 text-sm text-base-content/60">— CISO, UK Manufacturing Company</p>
  </div>
</div>

<div class="bg-gradient-to-r from-warning to-accent text-white py-16">
  <div class="max-w-4xl mx-auto text-center">
    <h2 class="text-3xl md:text-4xl font-bold mb-4">Start Your Discovery Journey Today</h2>
    <p class="text-lg mb-6">Upload a PCAP, get an audit, or speak to our team. It’s fast, easy, and secure.</p>
    <a href="/upload">
      <button class="btn btn-white btn-lg text-primary">Upload Packet</button>
    </a>
    <a href="/contact-us" class="ml-4">
      <button class="btn btn-outline btn-white btn-lg">Contact Sales</button>
    </a>
  </div>
</div>

<footer class="mt-20 text-center text-sm text-base-content/50">
  © {new Date().getFullYear()} Tentrait Ltd. All rights reserved.
</footer>
