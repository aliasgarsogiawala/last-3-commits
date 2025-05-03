import type { NextApiRequest, NextApiResponse } from "next";

type CommitData = {
  message: string;
  url: string;
  repo: string;
  author: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user } = req.query;

  if (!user || typeof user !== "string") {
    return res.status(400).json({ error: "Missing or invalid user parameter" });
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${user}/events/public`,
      {
        headers: {
          "User-Agent": "github-user-commits-widget",
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch GitHub events" });
    }

    const events = await response.json();
    const commits: CommitData[] = [];

    for (const event of events) {
      if (event.type === "PushEvent") {
        const repo = event.repo.name;

        for (const commit of event.payload.commits) {
          if (commits.length >= 3) break;
          commits.push({
            message: commit.message,
            url: `https://github.com/${repo}/commit/${commit.sha}`,
            repo,
            author: commit.author.name,
          });
        }
      }

      if (commits.length >= 3) break;
    }

    return res.status(200).json(commits);
  } catch {
    // Using underscore prefix to indicate intentionally unused variable
    res.status(500).json({ error: "Failed to fetch commits" });
  }
}
