import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Cloud, Shield, Zap, ArrowRight, FileText, Image as ImageIcon, Video, Folder } from 'lucide-react';

const Landing = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] selection:bg-rose-100 selection:text-rose-600 overflow-hidden font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-rose-500/20">
              <Cloud className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#0F172A]">SyncScribe</span>
          </div>
          <div className="flex items-center gap-6">
            {user ? (
              <Link to="/dashboard" className="px-6 py-2.5 bg-[#0F172A] text-white font-semibold rounded-full hover:bg-black transition-all active:scale-95 shadow-lg shadow-black/10">
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="text-[#64748B] hover:text-[#0F172A] transition-colors font-semibold">Login</Link>
                <Link to="/signup" className="px-6 py-2.5 bg-gradient-to-r from-rose-500 to-orange-500 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-rose-500/30 transition-all active:scale-95">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-6">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-rose-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-100 text-rose-500 text-sm font-bold mb-8 animate-fade-in">
            <Zap className="w-4 h-4 fill-rose-500" />
            <span>Premium Cloud Experience</span>
          </div>
          <h1 className="text-7xl md:text-8xl font-extrabold tracking-tight mb-8 text-[#0F172A] leading-[1.05]">
            Store, sync and <br /> 
            <span className="bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">scribe with ease.</span>
          </h1>
          <p className="text-xl text-[#64748B] mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            The most beautiful way to manage your digital life. Lightning fast syncing, military-grade security, and a stunning interface.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={user ? "/dashboard" : "/signup"} className="group px-8 py-4 bg-[#0F172A] text-white font-bold rounded-2xl hover:bg-black hover:shadow-2xl hover:shadow-black/20 transition-all flex items-center gap-2 text-lg active:scale-95">
              {user ? "Launch Dashboard" : "Start for Free"}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="px-8 py-4 bg-white border border-gray-200 hover:bg-gray-50 transition-all rounded-2xl font-bold text-lg text-[#0F172A] active:scale-95 shadow-sm">
              View Showcase
            </button>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {[
          { icon: Shield, title: 'Total Security', desc: 'Your data is encrypted and protected with industry-leading standards.', color: 'rose' },
          { icon: Zap, title: 'Zero Latency', desc: 'Experience instantaneous uploads and real-time cross-device syncing.', color: 'orange' },
          { icon: Cloud, title: 'Smart Cloud', desc: 'Intelligent organization for all your documents, images, and media.', color: 'blue' }
        ].map((feat, i) => (
          <div key={i} className="group p-10 rounded-[2.5rem] bg-white border border-gray-100 hover:border-rose-200 hover:shadow-xl hover:shadow-black/5 transition-all duration-500">
            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform group-hover:bg-rose-50">
              <feat.icon className={`text-rose-500 w-7 h-7`} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-[#0F172A]">{feat.title}</h3>
            <p className="text-[#64748B] leading-relaxed font-medium text-lg">{feat.desc}</p>
          </div>
        ))}
      </section>

      {/* Visual Component */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="bg-white rounded-[3rem] p-12 shadow-2xl shadow-black/5 border border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: FileText, label: 'Documents', color: 'text-blue-500', bg: 'bg-blue-50' },
              { icon: ImageIcon, label: 'Images', color: 'text-rose-500', bg: 'bg-rose-50' },
              { icon: Video, label: 'Media', color: 'text-purple-500', bg: 'bg-purple-50' },
              { icon: Folder, label: 'Archives', color: 'text-yellow-500', bg: 'bg-yellow-50' }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-4 group cursor-default">
                <div className={`w-20 h-20 ${item.bg} rounded-3xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-sm`}>
                  <item.icon className={`w-10 h-10 ${item.color}`} />
                </div>
                <span className="font-bold text-[#1E293B]">{item.label}</span>
              </div>
            ))}
        </div>
      </section>
      
      <footer className="py-24 text-center border-t border-gray-100 mt-20 bg-white relative z-10">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center">
            <Cloud className="text-white w-5 h-5" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-[#0F172A]">SyncScribe</span>
        </div>
        <p className="text-[#64748B] font-medium max-w-md mx-auto">© 2026 SyncScribe Cloud. The future of digital storage is here. Elegance meets performance.</p>
      </footer>
    </div>
  );
};

export default Landing;
