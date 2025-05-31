import { parsePcap } from './src/lib/server/parsePcap';

export default {
  async queue(batch, env, ctx) {
    for (const message of batch.messages) {
      try {
        const { filename, uploadedAt, ip } = message.body;
        const object = await env.TENTRAIT_UPLOADS.get(filename);
        if (!object) continue;

        const buffer = await object.arrayBuffer();
        const parsed = await parsePcap(buffer);

        const summary = {
          filename,
          uploadedAt,
          ip,
          analysisTime: Date.now(),
          results: parsed
        };

        await env.TENTRAIT_KV.put(`analysis:${filename}`, JSON.stringify(summary), {
          expirationTtl: 604800 // 7 days
        });

        message.ack();
      } catch (err) {
        console.error('Worker error:', err);
        message.retry();
      }
    }
  }
};
