import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const username = req.query.user as string;
  const eventsRes = await fetch(`https://api.github.com/users/${username}/events/public`);
  const events = await eventsRes.json();

  const commits = [];
  for (const event of events) {
    if (event.type === "PushEvent") {
      for (const commit of event.payload.commits) {
        if (commits.length >= 3) break;
        commits.push(commit.message);
      }
    }
    if (commits.length >= 3) break;
  }

  const svg = `
    <svg width="500" height="${commits.length * 40 + 50}" xmlns="http://www.w3.org/2000/svg">
      <style>
        .title { font: bold 18px sans-serif; fill: #fff; }
        .commit { font: 14px monospace; fill: #00FFAA; }
        rect { fill: #0d1117; }
      </style>
      <rect width="100%" height="100%"/>
      <text x="20" y="30" class="title">Last 3 GitHub Commits</text>
      ${commits
        .map(
          (msg, i) =>
            `<text x="20" y="${60 + i * 30}" class="commit">• ${msg.replace(/</g, "&lt;").slice(0, 60)}</text>`
        )
        .join("\n")}
    </svg>
  `;

  res.setHeader("Content-Type", "image/svg+xml");
  return res.status(200).send(svg);
}
