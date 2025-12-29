import Navbar from '@/components/common/navbar/Navbar';
import Footer from '@/components/home/Footer';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-37rem)] flex flex-col grow">
        {children}
      </div>
      <Footer />
    </>
  );
}
