<script>
	import { WEBSITE_NAME } from "$config";
</script>

<main class="max-w-3xl mx-auto px-6 py-10">
	<h1 class="text-4xl font-bold text-gray-800 mb-4">Access-Segmented VPN</h1>
	<p class="text-gray-600 text-lg mb-6">
		Tentrait’s VPN solution is built for modern OT/IT environments where **least-privilege access** and **operational continuity** matter.
	</p>

	<section class="bg-white shadow rounded-lg border border-gray-200 p-6 mb-10">
		<h2 class="text-2xl font-semibold text-gray-800 mb-2">What It Does</h2>
		<ul class="list-disc list-inside text-gray-700 space-y-2">
			<li>Grant VPN access per user, per device, or per vendor group</li>
			<li>Restrict access to **specific IPs, subnets, or ports**</li>
			<li>Real-time logging and **identity-level audit trails**</li>
			<li>Multi-site deployments via Meraki, Azure, or site-to-site tunnels</li>
			<li>Optional time-restricted or one-time-use credentials</li>
		</ul>
	</section>

	<section class="mb-10">
		<h2 class="text-2xl font-semibold text-gray-800 mb-3">Use Cases</h2>
		<div class="grid gap-6 sm:grid-cols-2">
			<div class="bg-gray-50 p-4 rounded border border-gray-200">
				<h3 class="font-semibold text-gray-700 mb-1">Third-Party Vendor Access</h3>
				<p class="text-sm text-gray-600">Grant a contractor access to only one PLC on port 502, without exposing other assets.</p>
			</div>
			<div class="bg-gray-50 p-4 rounded border border-gray-200">
				<h3 class="font-semibold text-gray-700 mb-1">Departmental Segmentation</h3>
				<p class="text-sm text-gray-600">Allow your OT engineering team access to HMI systems, while finance is restricted to ERP APIs.</p>
			</div>
			<div class="bg-gray-50 p-4 rounded border border-gray-200">
				<h3 class="font-semibold text-gray-700 mb-1">Per-Site Isolation</h3>
				<p class="text-sm text-gray-600">Users can be locked to one manufacturing site, even across shared VPN infrastructure.</p>
			</div>
			<div class="bg-gray-50 p-4 rounded border border-gray-200">
				<h3 class="font-semibold text-gray-700 mb-1">Audit + Compliance</h3>
				<p class="text-sm text-gray-600">Detailed logs help you prove access boundaries for ISO 27001 or NIS2 compliance.</p>
			</div>
		</div>
	</section>

	<section class="bg-blue-50 border-l-4 border-blue-400 p-6 rounded mb-10">
		<h2 class="text-xl font-semibold text-blue-900 mb-2">Zero Trust, Minimal Disruption</h2>
		<p class="text-blue-800 text-sm">
			Unlike traditional VPNs that grant full internal access, Tentrait’s approach aligns with Zero Trust principles and operational constraints — with no need to rip and replace your existing systems.
		</p>
	</section>

	<div class="text-center">
		<a href="/contact" class="inline-block bg-blue-600 text-white font-medium py-3 px-6 rounded hover:bg-blue-700 transition">
			Request a Demo
		</a>
	</div>
</main>
