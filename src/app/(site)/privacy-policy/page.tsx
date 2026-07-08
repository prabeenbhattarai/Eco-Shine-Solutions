import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Ecoshine Solution collects, uses and protects your personal information under the Australian Privacy Act 1988.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      />
      <ComingSoon note="Our full privacy policy (compliant with the Australian Privacy Act 1988) is being finalised and will appear here shortly." />
    </>
  );
}
