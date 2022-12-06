import type { NextApiRequest, NextApiResponse } from "next";

const endpoint = process.env.GPT_ENDPOINT || "";
const apikey = process.env.GPT_API_KEY || "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return;
  }

  console.log("req :", req.body);

  const prompt = req.body.prompt;
  const chatRquestData = {
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 1000,
  };
  try {
    const response: any = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${apikey}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(chatRquestData),
    });
    const answer = await response.json();

    const message = answer.choices[0].text;
    console.log("text :", answer.choices[0].text);

    res.status(200).json({ message });
  } catch (error) {
    throw new Error();
  }
}
