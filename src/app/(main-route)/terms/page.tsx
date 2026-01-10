import PageLayout from "@/tools/PageLayout";
import CustomBreadcrumb from "@/tools/CustomBreadcrumb";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar } from "lucide-react";

export default async function TermsPage() {
  // TODO: Fetch from API when dashboard is ready
  // const termsContent = await fetchTermsContent();
  
  const termsContent = {
    title: "Terms & Conditions",
    lastUpdated: "January 10, 2026",
    content: `
      <h2>1. Acceptance of Terms</h2>
      <p>By accessing and using Recycle Mart, you accept and agree to be bound by the terms and provision of this agreement.</p>
      
      <h2>2. Use License</h2>
      <p>Permission is granted to temporarily access the materials on Recycle Mart's website for personal, non-commercial transitory viewing only.</p>
      
      <h3>2.1 This license shall automatically terminate if you violate any of these restrictions:</h3>
      <ul>
        <li>Modify or copy the materials</li>
        <li>Use the materials for any commercial purpose</li>
        <li>Attempt to decompile or reverse engineer any software</li>
        <li>Remove any copyright or proprietary notations</li>
      </ul>
      
      <h2>3. User Accounts</h2>
      <p>When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms.</p>
      
      <h2>4. Posting Ads</h2>
      <p>Users are responsible for the content they post. All ads must comply with our community guidelines and local laws.</p>
      
      <h3>4.1 Prohibited Items</h3>
      <ul>
        <li>Illegal or stolen goods</li>
        <li>Counterfeit products</li>
        <li>Weapons and explosives</li>
        <li>Adult content</li>
      </ul>
      
      <h2>5. Payment and Fees</h2>
      <p>Certain services may require payment. You agree to provide current, complete, and accurate purchase and account information.</p>
      
      <h2>6. Limitation of Liability</h2>
      <p>Recycle Mart shall not be held liable for any damages arising from the use or inability to use our services.</p>
      
      <h2>7. Governing Law</h2>
      <p>These Terms shall be governed by the laws of Bangladesh without regard to its conflict of law provisions.</p>
      
      <h2>8. Changes to Terms</h2>
      <p>We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.</p>
      
      <h2>9. Contact Information</h2>
      <p>If you have any questions about these Terms, please contact us at support@recyclemart.com</p>
    `
  };

  return (
    <PageLayout paddingSize="small">
      <div className="relative">
         {/* Background Decorative Elements */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-64 w-full max-w-4xl bg-linear-to-b from-primary/5 to-transparent blur-3xl opacity-50" />

        <CustomBreadcrumb
          links={[
            { name: "Home", href: "/" },
            { name: "Terms & Conditions", href: "/terms" },
          ]}
        />

        <div className="mt-8 sm:mt-16 max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 space-y-4">
             <Badge variant="outline" className="px-3 py-1 border-primary/20 text-primary bg-primary/5 rounded-full text-xs font-medium uppercase tracking-widest">
              Legal Document
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              {termsContent.title}
            </h1>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>Last updated: {termsContent.lastUpdated}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-8 pb-4 border-b border-border/40">
            <FileText className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Read carefully before using our services</span>
          </div>

          <div 
            className="prose prose-slate dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: termsContent.content }}
          />
        </div>
      </div>
    </PageLayout>
  );
}
