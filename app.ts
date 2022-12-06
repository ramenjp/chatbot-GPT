import express from "express";
import fetch from "node-fetch";

const app = express();
const port = 3000;

const endpoint = process.env.GPT_ENDPOINT || "";

const callChatGPT = async (text: string) => {
  const requestData = {
    model: "text-davinci-003",
    prompt: "web3について簡潔に教えてください",
    max_tokens: 1000,
  };

  const response = await fetch(endpoint, {
    headers: {
      Authorization: `bearer ${process.env.GPT_API_KEY}`,
      ContentType: "application/json",
    },
    method: "POST",
    body: JSON.stringify(requestData),
  });

  const answer = await response.json();

  return answer;
};

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Welcome to chatbot AI on LINE");
});

app.post("/chat", (req: express.Request, res: express.Response) => {
  console.log("req.body", req);
  const message = callChatGPT(req.body.message);
  return message;
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
