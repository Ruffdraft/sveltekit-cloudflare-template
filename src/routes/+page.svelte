<script>
  import { WEBSITE_NAME, WEBSITE_DESCRIPTION } from "$config";
</script>

<section class="bg-white text-gray-900 min-h-screen flex flex-col">
  <header class="bg-gray-900 text-white p-6 shadow-md">
    <div class="container mx-auto flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">{WEBSITE_NAME}</h1>
      <nav class="space-x-6 text-sm">
        <a href="#features" class="hover:underline">Features</a>
        <a href="#about" class="hover:underline">About</a>
        <a href="#contact" class="hover:underline">Contact</a>
      </nav>
    </div>
  </header>

  <main class="flex-grow">
    <section class="container mx-auto py-20 text-center">
      <h2 class="text-5xl font-extrabold mb-6">{WEBSITE_DESCRIPTION}</h2>
      <p class="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
        Bridging secure IT and OT networks without operational disruption. Built on Cloudflare. Engineered for resilience.
      </p>
      <a href="/upload" class="inline-block bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium px-6 py-3 rounded-full transition">
        Upload PCAP File
      </a>
    </section>

    <section id="features" class="bg-gray-50 py-16">
      <div class="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div class="p-6 bg-white rounded-2xl shadow-md">
          <h3 class="text-xl font-semibold mb-2">OT-Aware Packet Analysis</h3>
          <p class="text-gray-700 mb-4">Visualize industrial protocols and detect suspicious traffic in real time.</p>
          <a href="/upload" class="text-blue-600 hover:underline">Upload PCAP →</a>
        </div>
        <div class="p-6 bg-white rounded-2xl shadow-md">
          <h3 class="text-xl font-semibold mb-2">Access Segmentation</h3>
          <p class="text-gray-700 mb-4">Granular identity-based access to OT assets across VPN boundaries.</p>
          <a href="/services/vpn" class="text-blue-600 hover:underline">Learn More →</a>
        </div>
        <div class="p-6 bg-white rounded-2xl shadow-md">
          <h3 class="text-xl font-semibold mb-2">Cloud-Edge Architecture</h3>
          <p class="text-gray-700 mb-4">Powered by Cloudflare Workers, KV, R2. Redundant, global, and fast.</p>
          <a href="https://developers.cloudflare.com/" target="_blank" class="text-blue-600 hover:underline">View Docs →</a>
        </div>
      </div>
    </section>

    <section id="about" class="container mx-auto py-20 text-center">
      <h2 class="text-4xl font-bold mb-4">Why Tentrait?</h2>
      <p class="text-gray-600 max-w-2xl mx-auto">
        Tentrait bridges IT and OT with zero-trust principles, seamless cloud integration, and unmatched packet visibility—empowering secure, reliable industrial networks.
      </p>
    </section>
  </main>

  <footer class="bg-gray-900 text-gray-400 text-sm p-6 text-center">
    <p>&copy; {new Date().getFullYear()} Tentrait Ltd. All rights reserved.</p>
  </footer>
</section>
