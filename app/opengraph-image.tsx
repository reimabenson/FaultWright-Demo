import { demo, isAccepted } from "@/lib/demo";
import { shortId } from "@/lib/format";
import { OgChip, renderOgImage } from "@/lib/og";
import { taskPresentation } from "@/lib/presentation";
import { site } from "@/lib/site";

export const alt = `${site.name} Demo V0 — ${taskPresentation(demo.task.task_id).shortTitle} evaluation, frozen record with PASS and FAIL pipeline controls`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const { task, attempts } = demo;
  const presentation = taskPresentation(task.task_id);

  return renderOgImage({
    topRight: "Demo V0 · Frozen record",
    kicker: `${presentation.shortTitle} evaluation`,
    title: task.public_summary.title,
    titleSize: 58,
    footerLeft: attempts.map((attempt) => (
      <OgChip
        key={attempt.profile_id}
        tone={isAccepted(attempt) ? "success" : "failure"}
        label={attempt.solver_label}
        meta={`${attempt.canonical_outcome} · ${attempt.canonical_capability_verdict}`}
      />
    )),
    footerRight: [
      `${task.task_id} · ${task.environment_id} ${task.environment_version}`,
      `run ${shortId(demo.run_id)}`,
    ],
  });
}
