# 🧠 GitHub Last 3 Commits Widget

A slick, SVG-based GitHub widget that shows the **last 3 public commits** made by any user — embeddable in your GitHub profile README or website.  
Built using **Next.js App Router**, **Edge API routes**, and pure **SVG magic** ✨

---

## 📸 Preview

<p align="center">
  <img src="/Screenshot 2025-05-04 at 12.36.45.png" width="600" alt="GitHub Last 3 Commits SVG Example" />
</p>

---

## 🚀 Live Example

Paste this directly into your README to show your latest commits:

```md
![Last 3 Commits](https://last-3-commits.vercel.app/api/commit-graph?user=aliasgarsogiawala)
````

🔗 Replace `aliasgarsogiawala` with your GitHub username.

---

## 🔌 Features

* 🎯 Real-time GitHub activity
* 🎨 Fully custom-designed SVG (no libraries)
* 📁 Repo name + 📝 commit message
* 🧵 Clean Tailwind-powered frontend
* ☁️ Deploy-ready for Vercel Edge Functions

---

## 🛠️ How It Works

* Uses GitHub’s [`/users/:username/events/public`](https://docs.github.com/en/rest/activity/events) API
* Filters `PushEvent` types to grab real commit messages
* Renders them beautifully as an SVG
* Served via Edge API route: `/api/commit-graph`


---

## 🧠 Use Cases

* Add to your GitHub profile
* Embed in dev portfolios
* Show team activity in dashboards
* Visual commit badge for OSS projects

---

## 📎 Embed It in Your README

```md
[![Recent Commits](https://last-3-commits.vercel.app/api/commit-graph?user=yourusername)](https://github.com/yourusername)
```

---

## 🧑‍🎨 Author

<p align="center">
  ⚡ Designed & built with ❤️ by <a href="https://github.com/aliasgarsogiawala">aliasgarsogiawala</a>
</p>

---

## 🧪 Want More?

* Light/Dark theme toggles?
* PNG image export?
* Repo links or SHA preview?

→ [Open an issue](https://github.com/aliasgarsogiawala) or fork this project 🔥

```

