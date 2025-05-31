import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  // Placeholder: in production, you would list keys from KV or store file listing separately
  return {
    data: [
      "1717182023502-example.pcap",
      "1717182154005-plantA.pcap",
      "1717182321009-vpn-user-test.pcap"
    ]
  };
};