import OpenAI from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function similarityScore(a, b) {
  const res = await client.embeddings.create({
    model: "text-embedding-3-small",
    input: [a, b]
  });

  const [v1, v2] = res.data.map(d => d.embedding);

  const dot = v1.reduce((s, v, i) => s + v * v2[i], 0);
  const mag1 = Math.sqrt(v1.reduce((s, v) => s + v * v, 0));
  const mag2 = Math.sqrt(v2.reduce((s, v) => s + v * v, 0));

  return Math.round((dot / (mag1 * mag2)) * 100);
}
