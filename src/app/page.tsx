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
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/10 rounded-full filter blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full filter blur-3xl"></div>
        </div>
        
        {/* GitHub Button */}
        <div className="absolute top-4 right-4 z-20">
          <a 
            href="https://github.com/aliasgarsogiawala/last-3-commits" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gray-800/80 hover:bg-gray-700/80 text-white px-4 py-2 rounded-full transition-all duration-200 border border-gray-700/50 shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            View on GitHub
          </a>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 px-6 py-16 md:py-24 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              GitHub Last 3 Commits
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              A beautiful way to showcase your latest GitHub activity directly in your README or website.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 mb-8 w-full max-w-md mx-auto">
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
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-3 rounded-lg font-medium shadow-lg transition-all duration-200 flex items-center justify-center hover:scale-105 active:scale-95"
              disabled={loading}
            >
              {loading ? (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              {loading ? "Loading..." : "Fetch Commits"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="px-6 pb-16">
        <div className="w-full max-w-4xl mx-auto opacity-0 translate-y-[-80px] animate-fadeIn">
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
            <div className="mt-10 bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-lg p-6 text-sm text-white w-full max-w-2xl mx-auto shadow-xl">
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-300 font-semibold">📎 Embed in your GitHub README:</p>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(`![Last 3 Commits](https://last-3-commits.vercel.app/api/commit-graph?user=${username})`);
                  }}
                  className="text-xs bg-gray-800 hover:bg-gray-700 px-2 py-1 rounded text-blue-400 transition-colors"
                >
                  Copy
                </button>
              </div>
              <pre className="bg-gray-800 rounded p-3 overflow-auto text-green-400 text-xs">
                <code>
                ![Last 3 Commits](https://last-3-commits.vercel.app/api/commit-graph?user={username})
                </code>
              </pre>
            </div>
          )}

          <div className="w-full max-w-2xl mx-auto mt-8">
            {commits.length > 0 && (
              <div className="animate-fadeIn">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-200">Recent Commits</h2>
                  {username && (
                    <a 
                      href={`https://github.com/${username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      View Profile
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  )}
                </div>
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
              <div className="text-center p-10 text-gray-400 animate-fadeIn">
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
      </div>
    </main>
  );
}

