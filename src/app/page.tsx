'use client';

import { useState } from "react";

// Define a proper type for commits
interface Commit {
  message: string;
  repo: string;
  url: string;
}

export default function Home() {
  const [username, setUsername] = useState("");
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCommits = async () => {
    if (!username) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/user-commits?user=${username}`);
      const data = await res.json();
      if (res.ok) {
        setCommits(data);
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch  {
      // Using underscore prefix to indicate intentionally unused variable
      setError("Failed to fetch commits.");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-6 flex flex-col items-center">
      <div 
        className="w-full max-w-4xl mx-auto opacity-0 translate-y-[-5px] animate-fadeIn"
      >
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          GitHub User - Last 3 Commits
        </h1>

        <div className="flex gap-3 mb-8 w-full max-w-md mx-auto">
          <input
            type="text"
            placeholder="Enter GitHub username"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-none transition-all duration-200 hover:scale-[1.01] focus:scale-[1.02]"
            onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && fetchCommits()}
          />
          <button
            onClick={fetchCommits}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-3 rounded-lg font-medium shadow-lg transition-all duration-200 flex items-center hover:scale-105 active:scale-95"
            disabled={loading}
          >
            {loading ? (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            {loading ? "Loading..." : "Fetch"}
          </button>
        </div>

        {error && (
          <div
            className="bg-red-500/20 border border-red-500/50 text-red-300 p-4 rounded-lg mb-6 w-full max-w-xl mx-auto animate-fadeIn"
          >
            <p className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </p>
          </div>
        )}

{username && commits.length > 0 && (
  <div className="mt-10 bg-gray-900 border border-gray-700 rounded-lg p-4 text-sm text-white w-full max-w-2xl mx-auto">
    <p className="mb-2 text-gray-300 font-semibold">📎 Embed in your GitHub README:</p>
    <pre className="bg-gray-800 rounded p-3 overflow-auto text-green-400 text-xs">
      <code>
      ![Last 3 Commits](https://last-3-commits.vercel.app/api/commit-graph?user={username})
      </code>
    </pre>
  </div>
)}
<br></br>

        <div className="w-full max-w-2xl mx-auto">
          {commits.length > 0 && (
            <div
              className="animate-fadeIn"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-300">Recent Commits</h2>
              <ul className="space-y-4">
                {commits.map((commit, index) => (
                  <li
                    key={index}
                    className="bg-gray-800/50 backdrop-blur-sm p-5 rounded-lg border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/10 opacity-0 animate-slideIn"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <p className="text-lg font-semibold mb-2">{commit.message}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-400 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm8 8v2h1v1H4v-1h1v-2a1 1 0 011-1h8a1 1 0 011 1z" clipRule="evenodd" />
                        </svg>
                        {commit.repo}
                      </p>
                      <a
                        href={commit.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center text-sm font-medium"
                      >
                        View Commit
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!loading && !error && commits.length === 0 && username && (
            <div
              className="text-center p-10 text-gray-400 animate-fadeIn"
            >
              <p>No commits found for this user.</p>
            </div>
          )}

          {!username && !loading && !error && (
            <div
              className="text-center p-10 text-gray-400 animate-fadeIn"
            >
              <p>Enter a GitHub username to see their recent commits</p>
            </div>
            
          )}
          <div className="mt-16 text-center text-gray-400">
  <p className="text-2xl font-medium">
    ⚡ Built with ❤️ by{" "}
    <a 
      href="https://github.com/aliasgarsogiawala" 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
    >
      Aliasgar Sogiawala
    </a>
  </p>
</div>
        </div>
      </div>
    </main>
  );
}


// Add the built by line at the bottom

