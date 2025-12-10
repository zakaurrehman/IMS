 import HeroSection from "../../../components/Hero/HeroSection";
  import Navbar from '../../../components/Navbar/navbar';
   import Footer from '../../../components/Footer/footer';
    import Pricing from '../../../components/Pricing/pricing';
 export default function PricingPage() {
  return (


      <div className="w-full bg-white min-h-screen font-sans text-foreground">
           {/* Navbar Placeholder if needed - assuming layout handles it or user adds it */}
            <Navbar />
           <main className="pt-15">
     <HeroSection
  title="Pricing & Plans"
  subtitle="Choose a plan that matches your business growth."
/>

        <Pricing />
      </main>
        <Footer />
      </div>

   


     );
}
