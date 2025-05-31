export async function parsePcap(buffer: ArrayBuffer) {
  return {
    totalPackets: Math.floor(Math.random() * 2000 + 500),
    protocols: ['Modbus/TCP', 'HTTPS', 'DNS'],
    uniqueSrcIPs: ['192.168.1.10', '10.0.0.5'],
    suspiciousPorts: [23, 5900, 44818]
  };
}