export function parse_pcap(buffer) {
  const dv = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  let offset = 0;
  if (buffer.length < 24) {
    throw new Error('Invalid pcap file');
  }
  // check magic number
  const magic = dv.getUint32(0, true);
  let little = true;
  if (magic === 0xa1b2c3d4) {
    little = false;
  } else if (magic === 0xd4c3b2a1) {
    little = true;
  } else {
    throw new Error('Unknown pcap format');
  }
  offset = 24; // skip global header
  const nodes = new Set();
  const edges = new Map();

  while (offset + 16 <= buffer.length) {
    const incl_len = dv.getUint32(offset + 8, little);
    offset += 16;
    if (offset + incl_len > buffer.length) break;
    if (incl_len >= 34) {
      const ethType = dv.getUint16(offset + 12, false); // network byte order
      if (ethType === 0x0800) {
        const ipOffset = offset + 14;
        const ihl = (dv.getUint8(ipOffset) & 0x0f) * 4;
        if (ipOffset + ihl <= buffer.length) {
          const src = [dv.getUint8(ipOffset + 12), dv.getUint8(ipOffset + 13), dv.getUint8(ipOffset + 14), dv.getUint8(ipOffset + 15)].join('.');
          const dst = [dv.getUint8(ipOffset + 16), dv.getUint8(ipOffset + 17), dv.getUint8(ipOffset + 18), dv.getUint8(ipOffset + 19)].join('.');
          nodes.add(src);
          nodes.add(dst);
          const key = `${src}->${dst}`;
          edges.set(key, (edges.get(key) || 0) + 1);
        }
      }
    }
    offset += incl_len;
  }
  return {
    nodes: Array.from(nodes).map((id) => ({ id })),
    edges: Array.from(edges).map(([k, v]) => {
      const [from, to] = k.split('->');
      return { from, to, count: v };
    }),
  };
}

