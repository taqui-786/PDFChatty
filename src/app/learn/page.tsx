"use client";
import React, { useState } from "react";
import {
  BookOpen,
  FileText,
  MessageCircle,
  Users,
  Key,
  HelpCircle,
  Tag,
  FolderOpen,
  Zap,
  Upload,
  Lock,
  Unlock,
} from "lucide-react";
import { Button } from "@/components/ui/button";

function LearnPage() {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    { id: "overview", title: "Overview", icon: BookOpen },
    { id: "getting-started", title: "Getting Started", icon: Zap },
    { id: "features", title: "Features", icon: FileText },
    { id: "how-it-works", title: "How It Works", icon: MessageCircle },
    { id: "limitations", title: "Limitations", icon: Lock },
    { id: "faq", title: "FAQ", icon: HelpCircle },
  ];

  const features = [
    {
      icon: FileText,
      title: "Document Summarization",
      description:
        "Automatically generate concise summaries of your PDF documents",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Key,
      title: "Key Points Extraction",
      description:
        "Extract and highlight the most important points from your documents",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: HelpCircle,
      title: "Important Questions",
      description: "Generate relevant questions based on your document content",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: Users,
      title: "Named Entities",
      description:
        "Identify people, organizations, locations, and dates in your documents",
      color: "bg-orange-100 text-orange-600",
    },
    {
      icon: Tag,
      title: "Keywords Extraction",
      description:
        "Find the most important keywords and phrases in your content",
      color: "bg-pink-100 text-pink-600",
    },
    {
      icon: FolderOpen,
      title: "Document Classification",
      description:
        "Automatically categorize documents into predefined categories",
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      icon: MessageCircle,
      title: "Interactive Chat",
      description: "Have natural conversations with your PDF documents",
      color: "bg-teal-100 text-teal-600",
    },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Welcome to Chat with PDF
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Transform the way you interact with documents. Our AI-powered
                platform allows you to upload PDF files and have intelligent
                conversations with them, extract key insights, and analyze
                content effortlessly.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Unlock className="mr-2 text-green-500" size={24} />
                Completely Free Platform
              </h3>
              <p className="text-gray-600">
                Enjoy full access to all features without any cost. No hidden
                fees, no premium tiers - everything is available for free to
                help you work smarter with your documents.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Perfect for Students
                </h3>
                <p className="text-gray-600 text-sm">
                  Research papers, textbooks, and study materials
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Business Professionals
                </h3>
                <p className="text-gray-600 text-sm">
                  Reports, contracts, and business documents
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Researchers
                </h3>
                <p className="text-gray-600 text-sm">
                  Academic papers and research documentation
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Legal Professionals
                </h3>
                <p className="text-gray-600 text-sm">
                  Legal documents and case studies
                </p>
              </div>
            </div>
          </div>
        );

      case "getting-started":
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Getting Started
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Follow these simple steps to start chatting with your PDF
                documents in minutes.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Create Your Account
                  </h3>
                  <p className="text-gray-600">
                    Sign up at{" "}
                    <code className="bg-gray-100 px-2 py-1 rounded">
                      /auth/signup
                    </code>{" "}
                    with your email and password. It&apos;s quick and completely
                    free.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Sign In</h3>
                  <p className="text-gray-600">
                    Access your account through{" "}
                    <code className="bg-gray-100 px-2 py-1 rounded">
                      /auth/signin
                    </code>{" "}
                    using your credentials.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Upload Your PDF
                  </h3>
                  <p className="text-gray-600">
                    Navigate to{" "}
                    <code className="bg-gray-100 px-2 py-1 rounded">/chat</code>{" "}
                    and upload your PDF document. Our system will process it
                    automatically.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Start Chatting
                  </h3>
                  <p className="text-gray-600">
                    Begin asking questions about your document. Our AI will
                    analyze the content and provide intelligent responses.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-2 flex items-center">
                <Upload className="mr-2" size={20} />
                Supported File Types
              </h3>
              <p className="text-yellow-700">
                Currently, we support PDF files. Make sure your document is
                readable and not password-protected for optimal results.
              </p>
            </div>
          </div>
        );

      case "features":
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Powerful Features
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Discover the comprehensive set of tools designed to help you
                understand and analyze your documents better.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div
                      className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}
                    >
                      <Icon size={24} />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">
                AI-Powered Analysis
              </h3>
              <p className="text-blue-700">
                All features are powered by advanced AI models that understand
                context, extract meaningful insights, and provide accurate
                responses to your questions.
              </p>
            </div>
          </div>
        );

      case "how-it-works":
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                How It Works
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Understanding the technology behind your document analysis
                experience.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-4">
                Document Processing Pipeline
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">
                    <strong>Upload:</strong> Your PDF is securely uploaded to
                    our platform
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">
                    <strong>Text Extraction:</strong> We extract and structure
                    the text content
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">
                    <strong>AI Analysis:</strong> Our AI models analyze and
                    understand the content
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">
                    <strong>Feature Generation:</strong> All analytical features
                    become available
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">
                    <strong>Interactive Chat:</strong> You can now ask questions
                    and get insights
                  </span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">
                  Privacy & Security
                </h3>
                <p className="text-green-700 text-sm">
                  Your documents are processed securely and are not stored
                  permanently on our servers. We prioritize your data privacy
                  and security.
                </p>
              </div>
              <div className="bg-purple-50 border border-purple-200 p-6 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">
                  Advanced AI
                </h3>
                <p className="text-purple-700 text-sm">
                  We use state-of-the-art natural language processing models to
                  understand context and provide accurate, relevant responses to
                  your queries.
                </p>
              </div>
            </div>
          </div>
        );

      case "limitations":
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Current Limitations
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Understanding the current constraints to help you make the most
                of the platform.
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
              <h3 className="font-semibold text-red-800 mb-4 flex items-center">
                <Lock className="mr-2" size={20} />
                Chat Limit
              </h3>
              <p className="text-red-700 mb-4">
                Each user can create a maximum of{" "}
                <strong>3 chat sessions</strong>. This helps us manage server
                resources while providing free access to everyone.
              </p>
              <div className="bg-red-100 p-4 rounded border">
                <p className="text-red-800 text-sm">
                  <strong>Tip:</strong> Make the most of your chat sessions by
                  preparing thoughtful questions and exploring all available
                  features for each document.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800">
                Other Considerations
              </h3>
              <div className="grid gap-4">
                <div className="bg-gray-50 p-4 rounded border">
                  <h4 className="font-medium text-gray-800 mb-1">
                    File Format
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Currently supports PDF files only. Other formats may be
                    added in future updates.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded border">
                  <h4 className="font-medium text-gray-800 mb-1">File Size</h4>
                  <p className="text-gray-600 text-sm">
                    Large files may take longer to process. Optimal performance
                    with files under 50MB.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded border">
                  <h4 className="font-medium text-gray-800 mb-1">
                    Language Support
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Best results with English documents. Other languages may
                    have varying accuracy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case "faq":
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Find answers to common questions about using Chat with PDF.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Is the platform really free?
                </h3>
                <p className="text-gray-600">
                  Yes, completely free with no hidden costs. All features are
                  available without any payment requirements.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Why is there a 3-chat limit?
                </h3>
                <p className="text-gray-600">
                  This limit helps us manage server resources and ensure stable
                  performance for all users while keeping the service free.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-2">
                  What happens to my uploaded documents?
                </h3>
                <p className="text-gray-600">
                  Documents are processed for analysis but not permanently
                  stored. We prioritize your privacy and data security.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Can I upload password-protected PDFs?
                </h3>
                <p className="text-gray-600">
                  Currently, password-protected PDFs are not supported. Please
                  remove the password before uploading.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-2">
                  How accurate are the AI responses?
                </h3>
                <p className="text-gray-600">
                  Our AI provides high-accuracy responses based on document
                  content, but always verify important information
                  independently.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Can I delete my chat sessions to create new ones?
                </h3>
                <p className="text-gray-600">
                  Contact support for assistance with managing your chat
                  sessions and account settings.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <main className="flex-1 bg-background ">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-8">
              <h3 className="font-semibold text-gray-800 mb-4">
                Documentation
              </h3>
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <Button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      variant={activeSection === section.id ? "default" : "ghost"}
                    
                    >
                      <Icon size={18} />
                      <span className="text-sm font-medium">
                        {section.title}
                      </span>
                    </Button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default LearnPage;
