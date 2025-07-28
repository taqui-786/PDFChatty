import { Button } from "@/components/ui/button";
import { Upload,  Zap, Shield, Clock } from "lucide-react";
import Link from "next/link";
import Logo from '../../public/Logo.png'
import Image from "next/image";
const Page = () => {
  return (
    <section className="h-dvh bg-background flex items-center justify-center relative overflow-hidden">


      <div className="container mx-auto px-6 py-20 max-w-7xl">
 
        <Image src={Logo.src} alt="my logo" height={100} width={200} className="mx-auto scale-150" />

        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Main Headline */}
          <div className="space-y-6">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-gray-900">
              Transform your PDFs into{" "}
              <span className="text-primary">
                conversations
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
              Upload any PDF and chat with it instantly. Get summaries, ask questions, 
              and extract insights using advanced AI — completely free, no signup required.
            </p>
          </div>

          {/* Main CTA */}
          <div className="space-y-4">
            <Button 
              size="lg" 
              className=" text-lg px-10 py-4 rounded-lg cursor-pointer transition-colors duration-200 shadow-sm hover:shadow-md group"
            >
              <Link href='/chat' className="flex items-center gap-3">
                <Upload className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                Start Chatting with Your PDF
              </Link>
            </Button>
            <p className="text-sm text-gray-500 font-medium">
              ✨ No account needed • 🚀 Unlimited uploads • 🔒 Privacy first
            </p>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 mt-16">
            <div className="flex items-center gap-2 bg-gray-50 rounded-full px-5 py-2.5 border border-gray-200 hover:border-gray-300 transition-colors duration-200">
              <Zap className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-medium text-gray-700">Instant AI Analysis</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 rounded-full px-5 py-2.5 border border-gray-200 hover:border-gray-300 transition-colors duration-200">
              <Shield className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-medium text-gray-700">100% Secure</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 rounded-full px-5 py-2.5 border border-gray-200 hover:border-gray-300 transition-colors duration-200">
              <Clock className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-medium text-gray-700">No Time Limits</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;