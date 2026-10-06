/**
 * Dawodu Samuel Iyanu - Portfolio Projects Data
 * 
 * You can easily add, edit, or remove projects here!
 * Simply add a new object to the `portfolioProjects` array below.
 */

const portfolioProjects = [
  {
    id: "project-1",
    title: "ApexPulse - High-Throughput Distributed Event Engine",
    category: "backend",
    featured: true,
    year: "2024",
    summary: "Distributed asynchronous event processing and message routing system designed with Python FastAPI and Redis Streams, handling 25,000+ events per second with sub-5ms p99 latency.",
    problemSolved: "Engineered to overcome synchronous bottlenecks in high-frequency event ingestion by decoupling producers and consumers with backpressure management and partitioned consumer groups.",
    tags: ["Python", "FastAPI", "Redis", "Docker", "PostgreSQL"],
    metrics: [
      { label: "Throughput", value: "25k req/s" },
      { label: "p99 Latency", value: "< 4.8ms" },
      { label: "Uptime", value: "99.98%" }
    ],
    github: "https://github.com/samdav",
    liveDemo: "#",
    architectureHighlights: [
      "Asynchronous non-blocking I/O using AsyncIO and uvloop in FastAPI",
      "Dead-letter queues (DLQ) and exponential backoff retry policies",
      "Containerized microservice architecture with health probes and Prometheus metrics"
    ]
  },
  {
    id: "project-2",
    title: "OmniPay - Resilient Multi-Tenant Banking Core",
    category: "backend",
    featured: true,
    year: "2024",
    summary: "Production-grade financial transaction processing service built in Java and Spring Boot with double-entry ledger verification, idempotent REST endpoints, and strict ACID guarantees.",
    problemSolved: "Eliminated race conditions during concurrent financial balance updates using pessimistic locking and isolated ledger audit logs.",
    tags: ["Java", "Spring Boot", "PostgreSQL", "Docker", "REST API"],
    metrics: [
      { label: "Transaction Vol", value: "$1.2M+ simulated" },
      { label: "Data Integrity", value: "100% ACID" },
      { label: "Response Time", value: "18ms avg" }
    ],
    github: "https://github.com/samdav",
    liveDemo: "#",
    architectureHighlights: [
      "Double-entry bookkeeping engine with cryptographic hash chain verification",
      "Pessimistic locking mechanisms for multi-currency wallet balance isolation",
      "Automated database migrations and zero-downtime schema evolution"
    ]
  },
  {
    id: "project-3",
    title: "ChronosDB - Low-Latency In-Memory Key-Value Store",
    category: "systems",
    featured: true,
    year: "2023",
    summary: "Lightweight, persistent in-memory caching engine written from scratch in C with custom hash table collision resolution, LRU eviction, and append-only file (AOF) logging.",
    problemSolved: "Built to study low-level memory allocations, cache-line alignment, and minimal overhead network socket multiplexing using epoll.",
    tags: ["C", "Linux Sockets", "Systems Programming", "Data Structures"],
    metrics: [
      { label: "Memory Footprint", value: "< 14MB base" },
      { label: "Operations", value: "80k ops/sec" },
      { label: "Eviction", value: "O(1) LRU" }
    ],
    github: "https://github.com/samdav",
    liveDemo: "#",
    architectureHighlights: [
      "Custom slab allocator to mitigate memory fragmentation under heavy churn",
      "Zero-copy socket reads using Linux epoll event notification",
      "Deterministic crash recovery from append-only write-ahead log files"
    ]
  },
  {
    id: "project-4",
    title: "FleetControl - Cross-Platform Logistics Management App",
    category: "mobile",
    featured: false,
    year: "2024",
    summary: "Offline-first mobile dispatch application built with Flutter and Dart, backed by a FastAPI sync server with WebSocket real-time telemetry updates.",
    problemSolved: "Allowed warehouse operators and field drivers to continue logging consignments without network connection, automatically resolving conflicts on reconnect.",
    tags: ["Flutter", "Dart", "FastAPI", "WebSockets", "SQLite"],
    metrics: [
      { label: "Offline Sync", value: "100% reliable" },
      { label: "Platforms", value: "Android & iOS" },
      { label: "FPS", value: "60 FPS locked" }
    ],
    github: "https://github.com/samdav",
    liveDemo: "#",
    architectureHighlights: [
      "BLoC state management architecture for predictable reactive state updates",
      "Local SQLite caching with vector clocks for optimistic offline conflict resolution",
      "Bidirectional WebSocket telemetry streaming with reconnection backoff"
    ]
  },
  {
    id: "project-5",
    title: "DevMetrics - Cloud Observability & Telemetry Dashboard",
    category: "fullstack",
    featured: false,
    year: "2024",
    summary: "Fullstack system monitoring suite featuring a React & TypeScript frontend interface communicating with high-performance Python FastAPI and TimescaleDB backends.",
    problemSolved: "Consolidated system health, container statuses, and endpoint latencies into an interactive real-time dashboard with zero polling lag.",
    tags: ["React", "TypeScript", "Python", "FastAPI", "TimescaleDB"],
    metrics: [
      { label: "Live Telemetry", value: "Sub-second" },
      { label: "Queries", value: "Optimized SQL" },
      { label: "Type Safety", value: "100% TS Strict" }
    ],
    github: "https://github.com/samdav",
    liveDemo: "#",
    architectureHighlights: [
      "Server-Sent Events (SSE) feed for live streaming metric feeds",
      "Modular TypeScript architecture with strict domain-driven component separation",
      "Materialized views in PostgreSQL for blazing fast time-series analytical queries"
    ]
  },
  {
    id: "project-6",
    title: "AuthGate - Multi-Protocol Identity & Access Management",
    category: "backend",
    featured: false,
    year: "2023",
    summary: "Secure authentication and authorization service implementing OAuth 2.0, OpenID Connect, and Role-Based Access Control (RBAC) with token rotation and Redis rate-limiting.",
    problemSolved: "Provided unified single sign-on and granular permission scoping for distributed internal microservices.",
    tags: ["Python", "FastAPI", "Java", "OAuth2", "Redis", "JWT"],
    metrics: [
      { label: "Auth Latency", value: "< 3ms verify" },
      { label: "Rate Limiter", value: "Token Bucket" },
      { label: "Security", value: "OWASP Hardened" }
    ],
    github: "https://github.com/samdav",
    liveDemo: "#",
    architectureHighlights: [
      "Asymmetric RSA key rotation with JWKS endpoint support",
      "Sliding window rate-limiting script executed atomically inside Redis",
      "Role and permission matrix with hierarchal permission inheritance"
    ]
  }
];

// Helper to provide an empty template for Samuel when he wants to add another project
const projectTemplateGuide = `
// HOW TO ADD A NEW PROJECT:
// Copy and paste this block into the portfolioProjects array above:
{
  id: "project-unique-id",
  title: "Your Project Name",
  category: "backend", // Options: "backend", "fullstack", "systems", "mobile"
  featured: true, // or false
  year: "2024",
  summary: "A concise 1-2 sentence description of what the project does.",
  problemSolved: "The core engineering challenge or bottleneck you tackled.",
  tags: ["Python", "FastAPI", "PostgreSQL", "Docker"],
  metrics: [
    { label: "Speed", value: "99.9%" },
    { label: "Throughput", value: "10k rps" }
  ],
  github: "https://github.com/your-username/repo-name",
  liveDemo: "https://your-demo-url.com",
  architectureHighlights: [
    "Highlight point 1",
    "Highlight point 2",
    "Highlight point 3"
  ]
}
`;

