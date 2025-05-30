import { parsePcap } from './src/lib/server/parsePcap';

export default {
	async queue(batch, env, ctx) {
		for (const message of batch.messages) {
			try {
				const { filename, uploadedAt, ip } = message.body;

				console.log(`[${filename}] Starting analysis`);

				const object = await env.TENTRAIT_UPLOADS.get(filename);
				if (!object) {
					console.warn(`[${filename}] File not found in R2`);
					continue;
				}

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

				console.log(`[${filename}] Analysis complete and stored`);

				message.ack();
			} catch (err) {
				console.error('Queue processing error:', err);
				message.retry();
			}
		}
	}
};
