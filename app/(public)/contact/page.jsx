import HeroSection from "../../../components/Hero/HeroSection";
import Navbar from '../../../components/Navbar/navbar';
import Footer from '../../../components/Footer/footer';
import ContactForm from '../../../components/Contact/ContactForm'; // Example contact form component

export default function ContactPage() {
  return (
    <div className="w-full bg-white min-h-screen font-sans text-foreground">

      {/* Navbar */}
      <Navbar />

      <main className="pt-15">

        {/* Hero Section - text customized for Contact page */}
        <HeroSection
          title="Get in Touch"
          subtitle="Have questions or need support? Reach out and we'll help you promptly."
        />

        {/* Contact Form Section */}
        <section className="py-24 bg-[var(--selago)]">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl font-bold text-[var(--port-gore)] mb-8 text-center">
              Contact Us
            </h2>
            <p className="text-gray-600 text-center mb-12">
              Fill out the form below and our team will get back to you as soon as possible.
            </p>

            {/* Contact Form Component */}
            <ContactForm />
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
