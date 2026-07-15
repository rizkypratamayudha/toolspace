import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.name}`,
  description: `Privacy Policy for ${siteConfig.name}. Learn how we handle your data and protect your privacy.`,
  openGraph: {
    title: `Privacy Policy | ${siteConfig.name}`,
    description: `Privacy Policy for ${siteConfig.name}.`,
    url: `${siteConfig.url}/privacy-policy`,
    siteName: siteConfig.name,
    type: "website",
  },
  alternates: {
    canonical: `${siteConfig.url}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />

      <div className="mt-8 mb-10">
        <div className="flex items-center gap-5">
          <div className="clay-coral flex h-16 w-16 items-center justify-center text-white shrink-0">
            <Shield className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
            <p className="mt-2 text-base md:text-lg text-[#6B7280] dark:text-[#9CA3AF] font-medium">
              Last updated: July 15, 2026
            </p>
          </div>
        </div>
      </div>

      <div className="clay-card p-8 space-y-8">
        <section>
          <h2 className="text-xl font-extrabold mb-3">1. Introduction</h2>
          <p className="text-[#6B7280] dark:text-[#9CA3AF] font-medium leading-relaxed">
            Welcome to {siteConfig.name} (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard information when you visit our website {siteConfig.url}.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-extrabold mb-3">2. Information We Collect</h2>
          <div className="text-[#6B7280] dark:text-[#9CA3AF] font-medium leading-relaxed space-y-2">
            <p><strong className="text-[#2D3557] dark:text-[#F0F4FF]">No Personal Data Collection:</strong> {siteConfig.name} is designed with privacy in mind. We do not collect, store, or process any personal information from our users.</p>
            <p><strong className="text-[#2D3557] dark:text-[#F0F4FF]">Local Processing:</strong> All file processing (PDF, image, text, and developer tools) happens entirely in your browser. Your files are never uploaded to our servers.</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-extrabold mb-3">3. Cookies and Third-Party Services</h2>
          <div className="text-[#6B7280] dark:text-[#9CA3AF] font-medium leading-relaxed space-y-2">
            <p><strong className="text-[#2D3557] dark:text-[#F0F4FF]">Google AdSense:</strong> We use Google AdSense to display advertisements on our website. Google AdSense uses cookies to serve ads based on your prior visits to our website or other websites on the internet.</p>
            <p><strong className="text-[#2D3557] dark:text-[#F0F4FF]">Google&apos;s Use of Advertising Cookies:</strong> Google uses advertising cookies to enable it and its partners to serve ads based on your visit to our site and/or other sites on the internet. You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-[#62CDFF] hover:underline">Google Ads Settings</a>.</p>
            <p><strong className="text-[#2D3557] dark:text-[#F0F4FF]">Other Cookies:</strong> We may use essential cookies for website functionality. These cookies do not collect personal information.</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-extrabold mb-3">4. How We Use Information</h2>
          <p className="text-[#6B7280] dark:text-[#9CA3AF] font-medium leading-relaxed">
            Since we do not collect personal data, we do not use your information for any purpose. All file processing is done locally in your browser, and we have no access to the files you process using our tools.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-extrabold mb-3">5. Data Security</h2>
          <p className="text-[#6B7280] dark:text-[#9CA3AF] font-medium leading-relaxed">
            We implement appropriate security measures to protect our website. However, since all file processing occurs locally in your browser, your files never leave your device, ensuring maximum security and privacy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-extrabold mb-3">6. Third-Party Links</h2>
          <p className="text-[#6B7280] dark:text-[#9CA3AF] font-medium leading-relaxed">
            Our website may contain links to third-party websites (such as advertisers). We are not responsible for the privacy practices or content of these external sites. We encourage you to read the privacy policies of any third-party sites you visit.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-extrabold mb-3">7. Children&apos;s Privacy</h2>
          <p className="text-[#6B7280] dark:text-[#9CA3AF] font-medium leading-relaxed">
            Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-extrabold mb-3">8. Changes to This Privacy Policy</h2>
          <p className="text-[#6B7280] dark:text-[#9CA3AF] font-medium leading-relaxed">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this Privacy Policy periodically.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-extrabold mb-3">9. Contact Us</h2>
          <p className="text-[#6B7280] dark:text-[#9CA3AF] font-medium leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p className="mt-2 text-[#62CDFF] font-bold">
            masrizki87@gmail.com
          </p>
        </section>
      </div>
    </div>
  );
}
