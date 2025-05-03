export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('user');

  if (!username) {
    return new Response("Missing 'user' parameter", { status: 400 });
  }

  const res = await fetch(`https://api.github.com/users/${username}/events/public`);
  const events = await res.json();

  const commits: { message: string; repo: string }[] = [];

  for (const event of events) {
    if (event.type === "PushEvent") {
      const repoName = event.repo.name;
      for (const commit of event.payload.commits) {
        if (commits.length >= 3) break;
        commits.push({ message: commit.message, repo: repoName });
      }
    }
    if (commits.length >= 3) break;
  }

  const height = commits.length * 65 + 100;

  const svg = `
  <svg width="600" height="${height}" viewBox="0 0 600 ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#0f2027" />
        <stop offset="50%" stop-color="#203a43" />
        <stop offset="100%" stop-color="#2c5364" />
      </linearGradient>
      <filter id="shadow">
        <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.3" />
      </filter>
    </defs>

    <rect width="100%" height="100%" fill="url(#bgGradient)" rx="20" />

    <text x="50%" y="45" text-anchor="middle" class="title">🚀 ${username}'s Last 3 Commits</text>

    ${commits
      .map((commit, i) => {
        const safeMsg = commit.message
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .slice(0, 60);
        const safeRepo = commit.repo.replace(/&/g, "&amp;");

        return `
        <g>
          <rect x="30" y="${70 + i * 65}" width="540" height="55" rx="12" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5" />
          <text x="45" y="${92 + i * 65}" class="commit">• ${safeMsg}</text>
          <text x="45" y="${110 + i * 65}" class="repo">📁 ${safeRepo}</text>
        </g>`;
      })
      .join("")}

    <style>
      .title {
        font: bold 22px 'Segoe UI', sans-serif;
        fill: #ffffff;
        filter: url(#shadow);
      }

      .commit {
        font: 14px monospace;
        fill: #93c5fd;
      }

      .repo {
        font: 12px monospace;
        fill: #38bdf8;
      }
    </style>
  </svg>
  `;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "s-maxage=600, stale-while-revalidate=300",
    },
  });
}
