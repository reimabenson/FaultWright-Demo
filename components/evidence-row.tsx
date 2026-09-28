import { CopyButton } from "@/components/copy-button";
import { shortHash } from "@/lib/demo";

type EvidenceRowProps = {
  label: string;
  value: string;
  truncate?: boolean;
};

export function EvidenceRow({
  label,
  value,
  truncate = false,
}: EvidenceRowProps) {
  return (
    <div className="evidence-row">
      <dt>{label}</dt>
      <dd>
        <code title={value}>{truncate ? shortHash(value) : value}</code>
        <CopyButton label={label} value={value} />
      </dd>
    </div>
  );
}
