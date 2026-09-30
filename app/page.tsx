import { ArtifactIntegrity } from "@/components/demo/artifact-integrity";
import { Challenge } from "@/components/demo/challenge";
import { ControlComparison } from "@/components/demo/control-comparison";
import { DemoTransition } from "@/components/demo/demo-transition";
import { EvaluationFlow } from "@/components/demo/evaluation-flow";
import { EvidenceLedger } from "@/components/demo/evidence-ledger";
import { Hero } from "@/components/demo/hero";
import { Scope } from "@/components/demo/scope";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { CapabilityLoop } from "@/components/product/capability-loop";
import { NearTermRoadmap } from "@/components/product/near-term-roadmap";
import { ProvingGround } from "@/components/product/proving-ground";
import { SystemFlow } from "@/components/product/system-flow";

export default function Home() {
  return (
    <>
      <SiteHeader variant="demo" />
      <main id="content">
        <Hero />
        <SystemFlow />
        <ProvingGround />
        <CapabilityLoop />
        <NearTermRoadmap />
        <DemoTransition />
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
