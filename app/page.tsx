import { ArtifactIntegrity } from "@/components/demo/artifact-integrity";
import { Challenge } from "@/components/demo/challenge";
import { ControlComparison } from "@/components/demo/control-comparison";
import { EvaluationFlow } from "@/components/demo/evaluation-flow";
import { EvidenceLedger } from "@/components/demo/evidence-ledger";
import { Hero } from "@/components/demo/hero";
import { Scope } from "@/components/demo/scope";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader variant="demo" />
      <main id="content">
        <Hero />
        <EvaluationFlow />
        <Challenge />
        <ControlComparison />
        <EvidenceLedger />
        <ArtifactIntegrity />
        <Scope />
      </main>
      <SiteFooter variant="demo" />
    </>
  );
}
