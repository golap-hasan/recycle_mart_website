import PageLayout from "@/tools/PageLayout";
import CustomBreadcrumb from "@/tools/CustomBreadcrumb";
import { Badge } from "@/components/ui/badge";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FaqPage() {
  // TODO: Fetch from API when dashboard is ready
  // const faqs = await fetchFaqs();

  const faqs = [
    {
      question: "How do I sell an item on Recycle Mart?",
      answer: "To sell an item, simply create an account, click on the 'Post Ad' button, uploading clear photos of your item, and provide a detailed description. Once submitted, your ad will be reviewed and published."
    },
    {
      question: "Is there a fee to post an ad?",
      answer: "Posting verified ads for personal items is free. However, we offer premium features and vendor accounts for businesses which may carry a small fee for enhanced visibility."
    },
    {
      question: "How can I contact a seller?",
      answer: "You can use our secure in-app chat feature to message sellers directly. For safety, we recommend keeping all communications within the Recycle Mart platform."
    },
    {
      question: "What items are prohibited?",
      answer: "We do not allow the sale of illegal goods, weapons, hazardous materials, or explicit content. Please refer to our Terms & Conditions for a full list of prohibited items."
    },
    {
      question: "How do I report a suspicious ad?",
      answer: "If you find an ad that violates our policies or looks suspicious, please click the 'Report' button on the ad page. Our team will investigate immediately."
    },
    {
      question: "Can I edit my ad after posting?",
      answer: "Yes, you can edit your ad at any time from your dashboard. Go to 'My Ads', select the item you want to modify, and click 'Edit'."
    }
  ];

  return (
    <PageLayout paddingSize="small">
      <CustomBreadcrumb
        links={[
          { name: "Home", href: "/" },
          { name: "FAQ", href: "/faq" },
        ]}
      />
      <div className="w-full max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="relative mb-8 text-center space-y-8">
          {/* Background Blob */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-full bg-primary/5 blur-3xl rounded-full -z-10" />
           
          <div className="space-y-4">
            <Badge variant="outline" className="px-4 py-1.5 border-primary/20 text-primary bg-background/50 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider">
              Help Center
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
              How can we <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-blue-500 to-purple-600">help you?</span>
            </h1>
            <p className="max-w-xl mx-auto text-muted-foreground text-lg sm:text-xl leading-relaxed">
              Find answers to common questions about buying, selling, and safety on Recycle Mart.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mb-8 pb-4 border-b w-full border-border/40">
          <HelpCircle className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">Common Topics</span>
        </div>

        {/* FAQ Accordion */}
        <div className="w-full max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="border rounded-xl bg-card/50 px-6 border-border/60 hover:border-primary/20 hover:bg-secondary/20 transition-all duration-300 shadow-xs"
              >
                <AccordionTrigger className="text-lg font-semibold text-foreground hover:text-primary hover:no-underline py-5 text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6 pt-1 text-left">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

      </div>
    </PageLayout>
  );
}
