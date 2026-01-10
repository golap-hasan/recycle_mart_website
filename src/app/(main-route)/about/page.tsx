import PageLayout from "@/tools/PageLayout";
import CustomBreadcrumb from "@/tools/CustomBreadcrumb";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";

export default async function AboutPage() {
  // TODO: Fetch from API when dashboard is ready
  // const aboutContent = await fetchAboutContent();
  
  const aboutContent = {
    title: "About Recycle Mart",
    content: `
      <h2>Welcome to Recycle Mart</h2>
      <p>Recycle Mart is Bangladesh's leading online marketplace for buying and selling recycled and second-hand goods. Our mission is to promote sustainable living by making it easy for people to give new life to pre-loved items.</p>
      
      <h3>Our Vision</h3>
      <p>We envision a future where every product gets a second chance, reducing waste and promoting a circular economy in Bangladesh.</p>
      
      <h3>What We Offer</h3>
      <ul>
        <li>Wide range of categories from electronics to furniture</li>
        <li>Secure and trusted platform for buyers and sellers</li>
        <li>Easy-to-use interface for posting and browsing ads</li>
        <li>Verified vendors and quality assurance</li>
      </ul>
      
      <h3>Our Commitment</h3>
      <p>We are committed to providing a safe, reliable, and eco-friendly marketplace that benefits both our users and the environment.</p>
    `
  };

  return (
    <PageLayout paddingSize="small">
      <div className="relative">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 -z-10 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 -z-10 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />

        <CustomBreadcrumb
          links={[
            { name: "Home", href: "/" },
            { name: "About Us", href: "/about" },
          ]}
        />

        <div className="mt-8 sm:mt-12">
          {/* Header Section */}
          <div className="mb-12 space-y-6">
            <Badge variant="secondary" className="px-4 py-1.5 text-primary bg-primary/10 hover:bg-primary/20 transition-colors rounded-full text-xs font-semibold uppercase tracking-wider">
              Who We Are
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
              Empowering <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-600">Sustainable Trade</span>
            </h1>
            <p className="max-w-2xl text-muted-foreground text-lg sm:text-xl leading-relaxed">
              Building a community where pre-loved items find new homes, reducing waste, and creating value for everyone in Bangladesh.
            </p>
          </div>

          <div className="flex items-center gap-2 mb-8 pb-4 border-b w-full max-w-3xl">
            <Info className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Our Story & Mission</span>
          </div>

          <div 
            className="prose prose-slate dark:prose-invert max-w-3xl"
            dangerouslySetInnerHTML={{ __html: aboutContent.content }}
          />
        </div>
      </div>
    </PageLayout>
  );
}
