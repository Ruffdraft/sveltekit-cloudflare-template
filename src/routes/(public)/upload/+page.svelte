<script>
  import { parse_pcap } from '$lib/tools/pcap';
  import { onMount, tick } from 'svelte';
  let file;
  let topology = null;

  async function handleFile(event) {
    const f = event.target.files[0];
    if (!f) return;
    const arrayBuffer = await f.arrayBuffer();
    topology = parse_pcap(new Uint8Array(arrayBuffer));
    await tick();
    drawGraph();
  }

  let svg;
  let width = 600;
  let height = 400;

  function drawGraph() {
    if (!topology) return;
    const d3 = window.d3;
    if (!d3) return;
    svg.innerHTML = '';
    const nodes = topology.nodes.map((d) => Object.assign({}, d));
    const links = topology.edges.map((e) => ({ source: e.from, target: e.to }));
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(80))
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2));
    const link = d3.select(svg)
      .append('g')
      .selectAll('line')
      .data(links)
      .enter().append('line')
      .attr('stroke', '#999');
    const node = d3.select(svg)
      .append('g')
      .selectAll('circle')
      .data(nodes)
      .enter().append('circle')
      .attr('r', 5)
      .attr('fill', '#007acc')
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));
    const text = d3.select(svg)
      .append('g')
      .selectAll('text')
      .data(nodes)
      .enter().append('text')
      .text(d => d.id)
      .attr('font-size', 10);

    simulation.on('tick', () => {
      link.attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y);
      node.attr('cx', d => d.x)
          .attr('cy', d => d.y);
      text.attr('x', d => d.x + 8)
          .attr('y', d => d.y + 4);
    });

    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }
  }

  onMount(async () => {
    if (!window.d3) {
      await import('https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js');
    }
  });
</script>

<svelte:head>
  <title>Packet Upload - Tentrait ltd</title>
</svelte:head>

<div class="max-w-2xl mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4">Wireshark Packet Analysis</h1>
  <p class="mb-2">Upload packet captures to quickly map device interactions and uncover gaps against UK IT/OT security objectives.</p>
  <input type="file" accept=".pcap" on:change={handleFile} class="file-input file-input-bordered" />
  {#if topology}
    <div class="mt-4">
      <svg bind:this={svg} {width} {height}></svg>
    </div>
  {/if}
</div>
