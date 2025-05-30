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
      svg_content: `<path d="M4 4L20 20" stroke="currentColor" stroke-width="1.5"/>`
    },
    {
      name: "Access Segmentation",
      description:
        "Identity-based VPN access to individual systems or IPs. Securely separate third parties or business units.",
      link: "/services/vpn",
      link_text: "Learn More",
      new_page: false,
      svg_content: `<circle cx="12" cy="12" r="6" stroke="currentColor" stroke-width="1.5"/>`
    },
    {
      name: "Cloud-Edge Architecture",
      description:
        "Globally distributed infrastructure using Cloudflare Pages, KV, R2, and Workers. Built for resilience.",
      link: "https://developers.cloudflare.com",
      link_text: "Cloudflare Stack",
      new_page: true,
      svg_content: `<rect x="4" y="4" width="16" height="16" stroke="currentColor" stroke-width="1.5"/>`
    },
    {
      name: "Discovery Pack",
      description:
        "Kickstart visibility and audit your network in 48 hours. Includes PCAP analysis, risk map, and actionable report.",
      link: "/discovery",
      link_text: "Get Started",
      new_page: false,
      svg_content: `<path d="M2 12L12 2L22 12L12 22L2 12Z" stroke="currentColor" stroke-width="1.5"/>`
    },
    {
      name: "Secure User Auth",
      description:
        "Integrated sign-in with MFA, magic links, and session control. Azure AD and enterprise-ready options available.",
      link: "/sign-in",
      link_text: "Try Auth",
      new_page: false,
      svg_content: `<path d="M12 2C15.866 2 19 5.13401 19 9C19 14 12 22 12 22C12 22 5 14 5 9C5 5.13401 8.13401 2 12 2Z" stroke="currentColor" stroke-width="1.5"/>`
    }
  ];
</script>

<svelte:head>
  <title>{WEBSITE_NAME || "Tentrait Ltd – IT & OT Security"}</title>
  <meta name="description" content={WEBSITE_DESCRIPTION || "Tentrait bridges IT and OT environments with intelligent, secure infrastructure. Built on the Cloudflare stack with real-time packet analysis and segmentation."} />
</svelte:head>

<!-- HERO SECTION -->
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

<!-- FEATURES SECTION -->
<div class="min-h-[60vh]">
  <div class="pt-12 pb-8 px-7">
    <div class="max-w-lg mx-auto text-center">
      <div class="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-warning to-accent">
        Explore the Features
      </div>
      <div class="mt-6 text-xl font-bold">
        Built for
        <span class="underline decoration-secondary decoration-[3px] md:decoration-[4px]">
          real-world infrastructure
        </span>
        visibility and control.
      </div>
    </div>

    <div class="flex gap-6 mt-12 max-w-[1064px] mx-auto place-content-center flex-wrap">
      {#each features as feature}
        <div class="card bg-white w-[270px] min-h-[300px] flex-none shadow-xl">
          <div class="card-body items-center text-center p-[24px] pt-[32px]">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" class="mb-2 mt-1" viewBox="0 0 24 24" fill="none">
                {@html feature.svg_content}
              </svg>
            </div>
            <h2 class="card-title">{feature.name}</h2>
            <p class="text-sm">{feature.description}</p>
            {#if feature.link}
              <a href={feature.link} class="pb-4" target={feature.new_page ? "_blank" : ""}>
                <button class="btn btn-xs btn-outline rounded-full btn-primary min-w-[100px]">
                  {feature.link_text || "Try It"}
                </button>
              </a>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<!-- CLOUDFLARE STACK SECTION -->
<div class="hero min-h-[60vh] mt-2">
  <div class="hero-content text-center pb-16 pt-4 px-4">
    <div class="max-w-lg">
      <div class="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-warning to-accent mt-4">
        Powered by Cloudflare Stack
      </div>
      <div class="flex flex-col lg:flex-row mt-8 gap-6 place-content-center content-center">
        <div class="w-full lg:w-auto">
          <a href="https://developers.cloudflare.com/" target="_blank" class="link">
            <div class="card flex justify-center items-center mx-auto w-[300px]">
              <img src="/images/Cloudflare_Logo.svg" class="aspect-[512/169]" alt="Cloudflare Logo" />
            </div>
          </a>
        </div>
        <div class="min-w-[270px] lg:min-w-[420px] flex mt-6 lg:mt-0">
          <div class="my-auto">
            <div class="px-4 text-lg md:text-xl">
              <a href="https://developers.cloudflare.com/" target="_blank">
                <span class="underline decoration-secondary decoration-[3px]">
                  Cloudflare Pages, Workers, D1, KV, R2 & Queues
                </span>
                power Tentrait's infrastructure, providing speed, security, and global reach.
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- FOOTER -->
<footer class="mt-20 text-center text-sm text-base-content/50">
  © {new Date().getFullYear()} Tentrait Ltd. All rights reserved.
</footer>
