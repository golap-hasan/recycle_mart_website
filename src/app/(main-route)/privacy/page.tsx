import PageLayout from "@/tools/PageLayout";
import CustomBreadcrumb from "@/tools/CustomBreadcrumb";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Calendar } from "lucide-react";

export default async function PrivacyPage() {
  // TODO: Fetch from API when dashboard is ready
  // const privacyContent = await fetchPrivacyContent();
  
  const privacyContent = {
    title: "Privacy Policy",
    lastUpdated: "January 10, 2026",
    content: `
      <h2>1. Information We Collect</h2>
      <p>We collect information that you provide directly to us when you create an account, post an ad, or communicate with us.</p>
      
      <h3>1.1 Personal Information</h3>
      <ul>
        <li>Name and contact information</li>
        <li>Email address and phone number</li>
        <li>Location and address</li>
        <li>Payment information (for premium services)</li>
      </ul>
      
      <h3>1.2 Automatically Collected Information</h3>
      <ul>
        <li>Device information and IP address</li>
        <li>Browser type and version</li>
        <li>Usage data and browsing patterns</li>
        <li>Cookies and similar technologies</li>
      </ul>
      
      <h2>2. How We Use Your Information</h2>
      <p>We use the information we collect to provide, maintain, and improve our services.</p>
      
      <h3>2.1 Primary Uses</h3>
      <ul>
        <li>To create and manage your account</li>
        <li>To process transactions and send notifications</li>
        <li>To provide customer support</li>
        <li>To detect and prevent fraud</li>
        <li>To improve our services and user experience</li>
      </ul>
      
      <h2>3. Information Sharing</h2>
      <p>We do not sell your personal information. We may share your information in the following circumstances:</p>
      
      <ul>
        <li>With other users when you post an ad</li>
        <li>With service providers who assist in our operations</li>
        <li>When required by law or legal process</li>
        <li>To protect our rights and prevent fraud</li>
      </ul>
      
      <h2>4. Data Security</h2>
      <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.</p>
      
      <h2>5. Your Rights</h2>
      <p>You have the right to:</p>
      
      <ul>
        <li>Access your personal information</li>
        <li>Correct inaccurate data</li>
        <li>Request deletion of your data</li>
        <li>Object to processing of your data</li>
        <li>Withdraw consent at any time</li>
      </ul>
      
      <h2>6. Cookies</h2>
      <p>We use cookies to enhance your experience. You can control cookies through your browser settings.</p>
      
      <h2>7. Children's Privacy</h2>
      <p>Our services are not intended for children under 13. We do not knowingly collect information from children.</p>
      
      <h2>8. Changes to This Policy</h2>
      <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>
      
      <h2>9. Contact Us</h2>
      <p>If you have questions about this Privacy Policy, please contact us at:</p>
      <ul>
        <li>Email: privacy@recyclemart.com</li>
        <li>Phone: +880 1XXX-XXXXXX</li>
        <li>Address: Dhaka, Bangladesh</li>
      </ul>
    `
  };

  return (
    <PageLayout paddingSize="small">
      <div className="relative">
        {/* Background Decorative Elements */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 -z-10 h-96 w-96 rounded-full bg-green-500/5 blur-3xl opacity-50" />
        
        <CustomBreadcrumb
          links={[
            { name: "Home", href: "/" },
            { name: "Privacy Policy", href: "/privacy" },
          ]}
        />

        <div className="mt-8 sm:mt-16 max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            <Badge variant="outline" className="px-3 py-1 border-primary/20 text-primary bg-primary/5 rounded-full text-xs font-medium uppercase tracking-widest">
              Data Protection
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              {privacyContent.title}
            </h1>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>Last updated: {privacyContent.lastUpdated}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-8 pb-4 border-b border-border/40">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Your privacy is important to us</span>
          </div>
          
          <div 
            className="prose prose-slate dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: privacyContent.content }}
          />
        </div>
      </div>
    </PageLayout>
  );
}
