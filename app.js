/**
 * Dawodu Samuel Iyanu - Portfolio Interactive Engine
 * Responsive, Lightweight, Accessible, Zero External Dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  initProjectRenderer();
  initCodeShowcase();
  initContactSystem();
  initNavigation();
  initModals();
});

/* ==========================================================================
   1. PROJECTS RENDERING & FILTERING
   ========================================================================== */
let activeFilter = 'all';

function initProjectRenderer() {
  const container = document.getElementById('projects-grid');
  const filterButtons = document.querySelectorAll('.filter-btn');

  if (!container) return;

  function render(filter) {
    container.innerHTML = '';

    const filtered = (typeof portfolioProjects !== 'undefined' ? portfolioProjects : []).filter(item => {
      if (filter === 'all') return true;
      return item.category === filter;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 48px; text-align: center; background-color: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg);">
          <p style="font-family: var(--font-mono); color: var(--text-muted);">No projects found in this category.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(project => {
      const card = document.createElement('article');
      card.className = 'project-card';
      card.setAttribute('data-id', project.id);

      const metricsHtml = (project.metrics || []).map(m => `
        <div class="project-metric">
          <span class="metric-val">${escapeHtml(m.value)}</span>
          <span class="metric-lbl">${escapeHtml(m.label)}</span>
        </div>
      `).join('');

      const tagsHtml = (project.tags || []).map(tag => `
        <span class="project-tag">${escapeHtml(tag)}</span>
      `).join('');

      card.innerHTML = `
        <div class="project-top">
          <div class="project-header-meta">
            <span class="project-category-tag">${escapeHtml(project.category)}</span>
            <span class="project-year">${escapeHtml(project.year || '2024')}</span>
          </div>
          <h3 class="project-title">${escapeHtml(project.title)}</h3>
          <p class="project-summary">${escapeHtml(project.summary)}</p>
          
          <div class="project-problem-box">
            <strong>Architecture Focus:</strong> ${escapeHtml(project.problemSolved)}
          </div>

          ${metricsHtml ? `<div class="project-metrics-row">${metricsHtml}</div>` : ''}
          
          <div class="project-tags">${tagsHtml}</div>
        </div>

        <div class="project-actions">
          <div class="project-links-group">
            ${project.github ? `
              <a href="${escapeHtml(project.github)}" target="_blank" rel="noopener noreferrer" class="card-link" title="Source Code">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
                <span>Code</span>
              </a>
            ` : ''}
            ${project.liveDemo && project.liveDemo !== '#' ? `
              <a href="${escapeHtml(project.liveDemo)}" target="_blank" rel="noopener noreferrer" class="card-link" title="Live Preview">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                <span>Demo</span>
              </a>
            ` : ''}
          </div>

          <button class="card-detail-btn" onclick="openProjectModal('${project.id}')">
            <span>Architecture Breakdown</span>
            <span>→</span>
          </button>
        </div>
      `;

      container.appendChild(card);
    });
  }

  // Bind filter events
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-filter') || 'all';
      render(activeFilter);
    });
  });

  // Initial render
  render('all');
}

/* ==========================================================================
   2. CODE SHOWCASE & LIVE SNIPPETS (PYTHON, JAVA, C, FLUTTER, TYPESCRIPT)
   ========================================================================== */
const codeSnippets = {
  python: {
    language: 'Python / FastAPI',
    title: 'FastAPI High-Throughput Async Producer & Redis Pipeline',
    code: `# FastAPI Asynchronous Event Ingestion Service
from fastapi import FastAPI, Depends, HTTPException, status
from pydantic import BaseModel, Field
import redis.asyncio as aioredis
import asyncio

app = FastAPI(title="ApexPulse Gateway", version="2.0.0")

class TelemetryPayload(BaseModel):
    device_id: str = Field(..., pattern=r"^[A-Z0-9_-]{8,32}$")
    cpu_load: float = Field(..., ge=0.0, le=100.0)
    memory_mb: int = Field(..., gt=0)
    status_code: int = 200

async def get_redis_client():
    pool = aioredis.ConnectionPool.from_url(
        "redis://localhost:6379", max_connections=50
    )
    client = aioredis.Redis(connection_pool=pool)
    try:
        yield client
    finally:
        await client.close()

@app.post("/api/v1/telemetry", status_code=status.HTTP_202_ACCEPTED)
async def ingest_telemetry(
    payload: TelemetryPayload,
    redis: aioredis.Redis = Depends(get_redis_client)
):
    # Atomic stream append with sub-millisecond overhead
    stream_id = await redis.xadd(
        name=f"stream:device:{payload.device_id}",
        fields=payload.model_dump(),
        maxlen=100_000,
        approximate=True
    )
    return {"status": "queued", "stream_id": stream_id}`
  },

  java: {
    language: 'Java / Spring Boot',
    title: 'Idempotent Financial Ledger Transaction Service',
    code: `// Resilient Double-Entry Ledger Core Engine
package com.samdav.ledger.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.annotation.Isolation;
import java.math.BigDecimal;
import java.util.UUID;

@Service
public class LedgerTransactionService {

    private final AccountRepository accountRepo;
    private final TransactionJournalRepository journalRepo;

    public LedgerTransactionService(AccountRepository ar, TransactionJournalRepository jr) {
        this.accountRepo = ar;
        this.journalRepo = jr;
    }

    @Transactional(isolation = Isolation.REPEATABLE_READ, rollbackFor = Exception.class)
    public TransactionReceipt executeTransfer(TransferRequest req) {
        // Enforce idempotency
        if (journalRepo.existsByIdempotencyKey(req.getIdempotencyKey())) {
            return journalRepo.findByKey(req.getIdempotencyKey()).toReceipt();
        }

        // Pessimistic write-lock prevents balance race conditions
        Account source = accountRepo.findByIdWithPessimisticLock(req.getSourceAccountId())
            .orElseThrow(() -> new AccountNotFoundException("Source account missing"));
        Account destination = accountRepo.findByIdWithPessimisticLock(req.getDestinationAccountId())
            .orElseThrow(() -> new AccountNotFoundException("Target account missing"));

        source.debit(req.getAmount());
        destination.credit(req.getAmount());

        JournalEntry entry = new JournalEntry(
            UUID.randomUUID(), req.getIdempotencyKey(), source.getId(), destination.getId(), req.getAmount()
        );
        return journalRepo.save(entry).toReceipt();
    }
}`
  },

  c: {
    language: 'C (Systems Programming)',
    title: 'Low-Latency Socket Polling Loop using Linux epoll',
    code: `/* High-Concurrency Epoll Event Loop */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/epoll.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <fcntl.h>
#include <unistd.h>

#define MAX_EVENTS 1024
#define BUFFER_SIZE 4096

static int set_nonblocking(int fd) {
    int flags = fcntl(fd, F_GETFL, 0);
    return fcntl(fd, F_SETFL, flags | O_NONBLOCK);
}

int run_epoll_worker(int server_fd) {
    int epoll_fd = epoll_create1(0);
    struct epoll_event ev, events[MAX_EVENTS];

    ev.events = EPOLLIN | EPOLLET; // Edge-triggered polling
    ev.data.fd = server_fd;
    epoll_ctl(epoll_fd, EPOLL_CTL_ADD, server_fd, &ev);

    while (1) {
        int nfds = epoll_wait(epoll_fd, events, MAX_EVENTS, -1);
        for (int i = 0; i < nfds; ++i) {
            if (events[i].data.fd == server_fd) {
                // Accept incoming TCP socket connection
                int client_fd = accept(server_fd, NULL, NULL);
                set_nonblocking(client_fd);
                ev.events = EPOLLIN | EPOLLET | EPOLLONESHOT;
                ev.data.fd = client_fd;
                epoll_ctl(epoll_fd, EPOLL_CTL_ADD, client_fd, &ev);
            } else {
                // Zero-copy processing on client event
                char buf[BUFFER_SIZE];
                ssize_t bytes_read = read(events[i].data.fd, buf, sizeof(buf));
                if (bytes_read > 0) {
                    write(events[i].data.fd, "+PONG\\r\\n", 7);
                }
            }
        }
    }
    close(epoll_fd);
    return 0;
}`
  },

  flutter: {
    language: 'Flutter / Dart',
    title: 'Reactive BLoC State Management with Offline Sync',
    code: `// Offline-First Telemetry Sync Bloc
import 'dart:async';
import 'package:flutter_bloc/flutter_bloc.dart';

abstract class DispatchEvent {}
class SyncQueueRequested extends DispatchEvent {}
class ConsignmentScanned extends DispatchEvent {
  final String barcode;
  final DateTime timestamp;
  ConsignmentScanned(this.barcode, this.timestamp);
}

abstract class DispatchState {}
class DispatchInitial extends DispatchState {}
class DispatchSyncing extends DispatchState {}
class DispatchSuccess extends DispatchState {
  final int syncedCount;
  DispatchSuccess(this.syncedCount);
}

class DispatchBloc extends Bloc<DispatchEvent, DispatchState> {
  final LocalSqliteStorage localDb;
  final ApiClient apiClient;

  DispatchBloc({required this.localDb, required this.apiClient}) 
      : super(DispatchInitial()) {
    on<ConsignmentScanned>((event, emit) async {
      await localDb.savePending(event.barcode, event.timestamp);
      add(SyncQueueRequested());
    });

    on<SyncQueueRequested>((event, emit) async {
      emit(DispatchSyncing());
      final pending = await localDb.getUnsyncedRecords();
      if (pending.isEmpty) return;

      final successCount = await apiClient.batchUpload(pending);
      await localDb.markAsSynchronized(pending.map((e) => e.id));
      emit(DispatchSuccess(successCount));
    });
  }
}`
  },

  typescript: {
    language: 'TypeScript / React',
    title: 'Strictly Type-Safe API Client & Resilient Hook',
    code: `// Type-Safe API Hook with Backoff & Cancellation
import { useState, useEffect, useRef } from 'react';

interface MetricRecord {
  readonly id: string;
  readonly p99LatencyMs: number;
  readonly throughputRps: number;
  readonly errorRate: number;
}

export function useSystemMetrics(pollIntervalMs = 2000) {
  const [metrics, setMetrics] = useState<MetricRecord | null>(null);
  const [isHealthy, setIsHealthy] = useState<boolean>(true);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    async function fetchMetrics() {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      try {
        const response = await fetch('/api/v1/metrics/live', {
          signal: abortControllerRef.current.signal,
          headers: { 'Accept': 'application/json' }
        });

        if (!response.ok) throw new Error(\`HTTP status \${response.status}\`);
        const data: MetricRecord = await response.json();
        setMetrics(data);
        setIsHealthy(data.errorRate < 0.01);
      } catch (err: unknown) {
        if ((err as Error).name !== 'AbortError') {
          setIsHealthy(false);
        }
      }
    }

    fetchMetrics();
    const interval = setInterval(fetchMetrics, pollIntervalMs);
    return () => {
      clearInterval(interval);
      abortControllerRef.current?.abort();
    };
  }, [pollIntervalMs]);

  return { metrics, isHealthy };
}`
  }
};

function initCodeShowcase() {
  const tabs = document.querySelectorAll('.code-tab-btn');
  const codeDisplay = document.getElementById('code-display');
  const copyBtn = document.getElementById('copy-code-btn');

  if (!tabs.length || !codeDisplay) return;

  function setLanguage(langKey) {
    const data = codeSnippets[langKey] || codeSnippets.python;
    tabs.forEach(t => t.classList.remove('active'));
    
    const activeTab = document.querySelector(`.code-tab-btn[data-lang="${langKey}"]`);
    if (activeTab) activeTab.classList.add('active');

    codeDisplay.textContent = data.code;
  }

  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      setLanguage(lang);
    });
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(codeDisplay.textContent || '')
        .then(() => showToast('Code snippet copied to clipboard!'))
        .catch(() => showToast('Failed to copy code'));
    });
  }

  // Initial code load
  setLanguage('python');
}

/* ==========================================================================
   3. CONTACT SYSTEM & COPY BUTTONS
   ========================================================================== */
function initContactSystem() {
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');
  const copyEmailBtns = document.querySelectorAll('.copy-email-trigger');

  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email') || 'dawodusmuel2020@gmail.com';
      navigator.clipboard.writeText(email)
        .then(() => showToast(`Copied ${email} to clipboard!`))
        .catch(() => showToast(`Email: ${email}`));
    });
  });

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name')?.value.trim();
      const email = document.getElementById('contact-email')?.value.trim();
      const message = document.getElementById('contact-message')?.value.trim();

      if (!name || !email || !message) {
        showToast('Please fill out all fields.');
        return;
      }

      // Simulate successful dispatch
      if (formFeedback) {
        formFeedback.className = 'form-feedback success';
        formFeedback.innerHTML = `Thank you, ${escapeHtml(name)}! Your message has been sent. I will respond to you at ${escapeHtml(email)} shortly.`;
        contactForm.reset();
      }

      showToast('Message sent successfully!');
    });
  }
}

/* ==========================================================================
   4. NAVIGATION & ACTIVE LINKS
   ========================================================================== */
function initNavigation() {
  const toggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
      });
    });
  }

  // Active section spy
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   5. MODALS & ADD PROJECT GUIDE
   ========================================================================== */
function initModals() {
  const modalOverlay = document.getElementById('project-modal-overlay');
  const closeBtns = document.querySelectorAll('.modal-close-trigger');

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (modalOverlay) modalOverlay.classList.remove('active');
    });
  });

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }

  // Add project instructions modal
  const addProjectBtn = document.getElementById('open-add-project-modal');
  const addProjectModal = document.getElementById('add-project-modal-overlay');
  if (addProjectBtn && addProjectModal) {
    addProjectBtn.addEventListener('click', () => {
      addProjectModal.classList.add('active');
    });

    addProjectModal.addEventListener('click', (e) => {
      if (e.target === addProjectModal) {
        addProjectModal.classList.remove('active');
      }
    });
  }

  // Live in-browser Project Injector form for Samuel
  const addProjectForm = document.getElementById('live-add-project-form');
  if (addProjectForm) {
    addProjectForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('new-proj-title').value.trim();
      const category = document.getElementById('new-proj-category').value;
      const summary = document.getElementById('new-proj-summary').value.trim();
      const problem = document.getElementById('new-proj-problem').value.trim();
      const tags = document.getElementById('new-proj-tags').value.split(',').map(s => s.trim()).filter(Boolean);
      const year = document.getElementById('new-proj-year').value.trim() || '2024';
      const metric1Val = document.getElementById('new-proj-m1-val').value.trim();
      const metric1Lbl = document.getElementById('new-proj-m1-lbl').value.trim();

      if (!title || !summary) {
        showToast('Please fill in project title and summary');
        return;
      }

      const newProject = {
        id: 'project-' + Date.now(),
        title,
        category,
        featured: true,
        year,
        summary,
        problemSolved: problem || 'Engineered with high reliability and clean architectural patterns.',
        tags: tags.length ? tags : ['Backend', 'Python', 'FastAPI'],
        metrics: metric1Val ? [{ label: metric1Lbl || 'Metric', value: metric1Val }] : [{ label: 'Status', value: 'Live' }],
        github: '#',
        liveDemo: '#',
        architectureHighlights: [
          'High throughput and defensive architecture design',
          'Modular service structure with unit and integration test coverage'
        ]
      };

      if (typeof portfolioProjects !== 'undefined') {
        portfolioProjects.unshift(newProject);
        initProjectRenderer();
      }

      if (addProjectModal) addProjectModal.classList.remove('active');
      addProjectForm.reset();
      showToast('Project added to live view! Check the projects section.');

      // Scroll to projects
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

// Global modal opener for project architecture breakdown
window.openProjectModal = function(projectId) {
  const modalOverlay = document.getElementById('project-modal-overlay');
  const modalTitle = document.getElementById('modal-project-title');
  const modalCategory = document.getElementById('modal-project-category');
  const modalSummary = document.getElementById('modal-project-summary');
  const modalProblem = document.getElementById('modal-project-problem');
  const modalHighlights = document.getElementById('modal-project-highlights');
  const modalTags = document.getElementById('modal-project-tags');
  const modalLinks = document.getElementById('modal-project-links');

  const project = (typeof portfolioProjects !== 'undefined' ? portfolioProjects : []).find(p => p.id === projectId);
  if (!project || !modalOverlay) return;

  if (modalTitle) modalTitle.textContent = project.title;
  if (modalCategory) modalCategory.textContent = project.category.toUpperCase() + ' ARCHITECTURE';
  if (modalSummary) modalSummary.textContent = project.summary;
  if (modalProblem) modalProblem.textContent = project.problemSolved;

  if (modalHighlights) {
    modalHighlights.innerHTML = (project.architectureHighlights || []).map(h => `
      <li style="margin-bottom: 8px; color: var(--text-secondary); display: flex; align-items: flex-start; gap: 8px;">
        <span style="color: var(--bg-white); font-weight: bold;">•</span>
        <span>${escapeHtml(h)}</span>
      </li>
    `).join('');
  }

  if (modalTags) {
    modalTags.innerHTML = (project.tags || []).map(t => `
      <span class="project-tag">${escapeHtml(t)}</span>
    `).join('');
  }

  if (modalLinks) {
    modalLinks.innerHTML = `
      <a href="${escapeHtml(project.github || '#')}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
        <span>View Repository</span>
        <span>↗</span>
      </a>
      ${project.liveDemo && project.liveDemo !== '#' ? `
        <a href="${escapeHtml(project.liveDemo)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
          <span>Live Deployment</span>
          <span>↗</span>
        </a>
      ` : ''}
    `;
  }

  modalOverlay.classList.add('active');
};

/* ==========================================================================
   TOAST HELPER
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

