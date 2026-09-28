import { EvidenceRow } from "@/components/evidence-row";
import {
  attemptByProfile,
  demo,
  humanizeIdentifier,
  type DemoAttempt,
} from "@/lib/demo";

const needItems = [
  ["01", "Reproducible problem"],
  ["02", "Controlled environment"],
  ["03", "Independently verified result"],
  ["04", "Incorrect solutions rejected"],
  ["05", "Evidence suitable for human review"],
];

const flow = [
  "Same task",
  "Same environment",
  "Independent attempt",
  "AgentLab evaluation",
  "Canonical outcome",
  "Evidence recorded",
];

function AttemptCard({ attempt }: { attempt: DemoAttempt }) {
  const passed = attempt.canonical_outcome === "PASS";

  return (
    <article className={`attempt-card ${passed ? "pass" : "fail"}`}>
      <div className="attempt-card__topline">
        <span className="attempt-index">
          {attempt.profile_id === "replay-known-good" ? "CONTROL 01" : "CONTROL 02"}
        </span>
        <span className="attempt-state">
          <span className="state-dot" aria-hidden="true" />
          {passed ? "Accepted" : "Rejected"}
        </span>
      </div>
      <h3>{attempt.solver_label}</h3>
      <p className="attempt-type">Deterministic reference control</p>
      <dl className="attempt-results">
        <div>
          <dt>Canonical Outcome</dt>
          <dd>{attempt.canonical_outcome}</dd>
        </div>
        <div>
          <dt>Capability Verdict</dt>
          <dd>{attempt.canonical_capability_verdict}</dd>
        </div>
      </dl>
      <div className="attempt-summary">
        <span>{passed ? "✓" : "×"}</span>
        <p>{attempt.human_summary}</p>
      </div>
    </article>
  );
}

export default function Home() {
  const referenceRepair = attemptByProfile("replay-known-good");
  const noRepair = attemptByProfile("noop");
  const task = demo.task;

  return (
    <main>
      <header className="site-header shell">
        <a className="brand" href="#top" aria-label="FaultWright home">
          <span className="brand-mark" aria-hidden="true">FW</span>
          <span>FaultWright</span>
          <span className="brand-alias">FaultFoundry Demo</span>
        </a>
        <div className="header-meta">
          <span className="live-dot" aria-hidden="true" />
          Frozen artifact
        </div>
      </header>

      <section className="hero shell" id="top">
        <div className="eyebrow">VERIFIABLE CODING EVALUATION</div>
        <h1>Software repairs that can be independently verified.</h1>
        <p className="hero-copy">
          FaultFoundry turns reproducible software failures into
          evidence-backed coding-AI evaluation tasks.
        </p>
        <div className="hero-actions">
          <a className="primary-action" href="#evaluation">
            See the evaluation <span aria-hidden="true">↓</span>
          </a>
          <span className="status-pill">
            <span aria-hidden="true">✓</span>
            Demo V0 — Verified reference controls
          </span>
        </div>
        <div className="hero-grid" aria-hidden="true" />
      </section>

      <section className="section shell market-need">
        <div className="section-heading">
          <span className="section-number">01</span>
          <div>
            <p className="section-kicker">THE REQUIREMENT</p>
            <h2>AI-training work needs more than plausible code.</h2>
          </div>
        </div>
        <p className="section-lead">
          A repair that looks right is still only a claim. A rigorous
          coding-evaluation workflow establishes what ran, under which
          conditions, and what the verifier actually decided.
        </p>
        <ol className="need-grid">
          {needItems.map(([number, label]) => (
            <li key={number}>
              <span>{number}</span>
              <p>{label}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section shell" id="evaluation">
        <div className="section-heading">
          <span className="section-number">02</span>
          <div>
            <p className="section-kicker">THE FROZEN CHALLENGE</p>
            <h2>{task.public_summary.title}</h2>
          </div>
        </div>
        <div className="challenge-card">
          <div className="challenge-copy">
            <span className="challenge-label">Webhook Idempotency</span>
            <p>{task.public_summary.problem_statement}</p>
          </div>
          <dl className="challenge-identities">
            <div><dt>Task</dt><dd>{task.task_id}</dd></div>
            <div>
              <dt>Environment</dt>
              <dd>{task.environment_id} {task.environment_version}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd className="verified"><span aria-hidden="true">✓</span> Environment Verified</dd>
            </div>
          </dl>
        </div>

        <div className="comparison-intro">
          <div>
            <p className="section-kicker">SAME TASK. SAME ENVIRONMENT.</p>
            <h2>One evaluator. Two controlled attempts.</h2>
          </div>
          <p>
            The difference is the submitted repair. Everything else remains
            bound to the same frozen identity.
          </p>
        </div>
        <div className="attempt-grid">
          <AttemptCard attempt={referenceRepair} />
          <AttemptCard attempt={noRepair} />
        </div>
        <p className="control-note">
          <span aria-hidden="true">i</span>
          These are deterministic reference controls used to validate the
          FaultFoundry evaluation pipeline. They are not competing AI models.
        </p>
      </section>

      <section className="section flow-section">
        <div className="shell">
          <div className="section-heading compact">
            <span className="section-number">03</span>
            <div>
              <p className="section-kicker">VERIFICATION FLOW</p>
              <h2>Truth stays with the evaluation engine.</h2>
            </div>
          </div>
          <ol className="flow">
            {flow.map((item, index) => (
              <li key={item}>
                <span className="flow-index">{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
                {index < flow.length - 1 && <span className="flow-arrow">→</span>}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section shell">
        <div className="section-heading">
          <span className="section-number">04</span>
          <div>
            <p className="section-kicker">THE DELIVERABLE</p>
            <h2>From software failure to an AI-evaluation deliverable</h2>
          </div>
        </div>
        <div className="deliverable-grid">
          {demo.scenario.expected_deliverables.map((deliverable, index) => (
            <article key={deliverable}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{humanizeIdentifier(deliverable)}</h3>
            </article>
          ))}
        </div>
        <p className="deliverable-note">
          This demonstrates the kind of rigorous workflow used in coding-AI
          training and evaluation work.
        </p>
      </section>

      <section className="section shell evidence-section">
        <details>
          <summary>
            <span>
              <small>05 / TECHNICAL EVIDENCE</small>
              Inspect the frozen public record
            </span>
            <span className="details-icon" aria-hidden="true">+</span>
          </summary>
          <div className="evidence-content">
            <dl className="evidence-list">
              <EvidenceRow label="Run ID" value={demo.run_id} />
              <EvidenceRow label="Task ID" value={task.task_id} />
              <EvidenceRow label="Task fingerprint" value={task.fingerprint} truncate />
              <EvidenceRow label="Environment ID" value={task.environment_id} />
              <EvidenceRow label="Environment version" value={task.environment_version} />
              <EvidenceRow label="Environment digest" value={task.environment_digest} truncate />
            </dl>
            <div className="attempt-evidence-grid">
              {demo.attempts.map((attempt) => (
                <article key={attempt.profile_id}>
                  <h3>{attempt.solver_label}</h3>
                  <EvidenceRow label="Profile" value={attempt.profile_id} />
                  <EvidenceRow label="Solver" value={attempt.solver_id} />
                  <EvidenceRow label="AttemptOutcome" value={attempt.canonical_outcome} />
                  <EvidenceRow
                    label="CapabilityVerdict"
                    value={attempt.canonical_capability_verdict}
                  />
                  <EvidenceRow
                    label="Patch hash"
                    value={attempt.patch_sha256 || "No patch"}
                    truncate={Boolean(attempt.patch_sha256)}
                  />
                </article>
              ))}
            </div>
            <a className="artifact-link" href="/demo/demo-v0.json">
              View sanitized demo artifact <span aria-hidden="true">↗</span>
            </a>
          </div>
        </details>
      </section>

      <section className="section shell future-section">
        <div className="section-heading compact">
          <span className="section-number">06</span>
          <div>
            <p className="section-kicker">CAPABILITY PATH</p>
            <h2>Controlled proof before broader claims.</h2>
          </div>
        </div>
        <div className="future-grid">
          <article className="current">
            <span>Today</span>
            <h3>Reference-controlled evaluation</h3>
            <p>Demonstrated now with deterministic controls.</p>
          </article>
          <article>
            <span>Next</span>
            <h3>Real coding-agent evaluation</h3>
            <p>Evaluate named agents under frozen conditions.</p>
          </article>
          <article>
            <span>Later</span>
            <h3>Repeatable benchmark and regression workflows</h3>
            <p>Compare changes against stable task identities.</p>
          </article>
        </div>
      </section>

      <footer className="site-footer">
        <div className="shell">
          <div>
            <strong>FaultWright <span>/ FaultFoundry</span></strong>
            <p>Evidence over model claims.</p>
          </div>
          <p className="footer-note">
            Demo results are generated by the FaultFoundry evaluation engine
            and presented here as a sanitized public artifact.
          </p>
        </div>
      </footer>
    </main>
  );
}
