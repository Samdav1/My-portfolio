# Dawodu Samuel Iyanu — Backend Developer Portfolio

A professional, high-performance portfolio website crafted with a **strict Black & White monochrome aesthetic** and **strictly zero gradients** across the entire design.

Designed specifically for **Dawodu Samuel Iyanu**, featuring:
- **Core Stack**: Python, FastAPI, Java, C, TypeScript, React, Flutter, Dart, PostgreSQL, Redis, Docker.
- **Layout Architecture**: Inspired by clean editorial framing with large card curves, crisp borders, and structured focus pillars (`#01`, `#02`, `#03`, `#04`).
- **Interactive Projects Showcase**: Categorized filtering (`All`, `Backend & APIs`, `Systems (C)`, `Fullstack`, `Mobile (Flutter)`), architecture breakdown modals, and metrics.
- **Under-the-Hood Code Sandbox**: Tabbed code viewer for Python/FastAPI, Java Spring Boot, C epoll sockets, Flutter BLoC, and TypeScript.
- **Interactive Project Adder**: Test adding projects right inside the browser or copy the clean template into `projects-data.js`.

---

## 🚀 How to Run Locally

You can run the portfolio in any of these ways:

### Option 1: Python HTTP Server (Built-in)
```bash
python3 -m http.server 3000
```
Then visit `http://localhost:3000` in your browser.

### Option 2: Node.js Serve
```bash
npx serve .
```

### Option 3: Direct File Open
Simply double-click `index.html` in your file explorer to open it in any modern browser.

---

## 🛠️ How to Add or Edit Projects

All projects are organized in [`projects-data.js`](file:///home/samdav/Projects/samdavweb/projects-data.js).

To add a new project, simply open `projects-data.js` and add an entry to the `portfolioProjects` array:

```javascript
{
  id: "my-new-project",
  title: "Your Project Name",
  category: "backend", // Options: "backend" | "systems" | "fullstack" | "mobile"
  featured: true,
  year: "2024",
  summary: "Brief 1-2 sentence description of what the project does.",
  problemSolved: "The core backend bottleneck or architecture problem you tackled.",
  tags: ["Python", "FastAPI", "PostgreSQL", "Docker"],
  metrics: [
    { label: "Throughput", value: "30k req/s" },
    { label: "p99 Latency", value: "< 5ms" },
    { label: "Reliability", value: "99.99%" }
  ],
  github: "https://github.com/samdav/your-repo",
  liveDemo: "https://your-live-demo.com",
  architectureHighlights: [
    "Asynchronous worker pool using Redis Streams",
    "Pessimistic locking for balance transactions",
    "Zero-downtime database migrations"
  ]
}
```

---

## 🌐 Deploying Online

### GitHub Pages (Free)
1. Commit and push this repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete monochrome zero-gradient portfolio"
   git push origin main
   ```
2. In your GitHub repository: Go to **Settings** > **Pages** > Select `main` branch and `/ (root)` folder > Save.

### Vercel / Netlify
- Drag and drop this folder into the [Netlify Drop](https://app.netlify.com/drop) dashboard or import the repository in [Vercel](https://vercel.com).

# My-portfolio
