import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Cloud, Shield, Zap, ArrowRight, FileText, Image as ImageIcon, Video, Folder, Lock, Share2, Search } from 'lucide-react';

const Landing = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-rose-100 selection:text-rose-600 overflow-x-hidden font-sans">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-rose-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full animate-pulse [animation-delay:2s]" />
        <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[30%] h-[30%] bg-purple-500/5 blur-[100px] rounded-full" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-rose-500/20 group-hover:rotate-12 transition-transform">
              <Cloud className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">SyncScribe</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
            <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
            <a href="#preview" className="hover:text-slate-900 transition-colors">Preview</a>
            <a href="#security" className="hover:text-slate-900 transition-colors">Security</a>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <Link to="/dashboard" className="px-6 py-2 bg-slate-900 text-white font-bold rounded-xl hover:bg-black transition-all active:scale-95 shadow-lg shadow-black/5">
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="text-slate-600 hover:text-slate-900 transition-colors font-semibold">Login</Link>
                <Link to="/signup" className="px-6 py-2.5 bg-gradient-to-r from-rose-500 to-orange-500 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-rose-500/30 transition-all active:scale-95">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 z-10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 border border-rose-100 text-rose-500 text-xs font-bold mb-8 uppercase tracking-widest animate-bounce">
            <Zap className="w-4 h-4 fill-rose-500" />
            <span>Next-Gen Cloud Storage</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-none text-slate-900">
            Store. Sync. <br />
            <span className="bg-gradient-to-r from-rose-500 via-orange-400 to-rose-500 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">
              Scribe Forever.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            Elevate your digital workflow with SyncScribe. Lightning-fast syncing, 
            impenetrable security, and a stunning interface designed for humans.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Link to={user ? "/dashboard" : "/signup"} className="group px-10 py-4 bg-slate-900 text-white font-black rounded-2xl hover:scale-105 transition-all flex items-center gap-2 text-lg shadow-2xl shadow-black/10">
              {user ? "Launch App" : "Start Free Trial"}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="px-10 py-4 bg-white border border-slate-200 hover:bg-slate-50 transition-all rounded-2xl font-bold text-lg text-slate-900 shadow-sm">
              Watch Demo
            </button>
          </div>

          {/* Hero Preview */}
          <div id="preview" className="relative max-w-5xl mx-auto group">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent z-10" />
            <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 to-orange-500 rounded-[2.5rem] blur opacity-10 group-hover:opacity-20 transition duration-1000" />
            <div className="relative rounded-[2.5rem] overflow-hidden border border-white/50 shadow-2xl">
              <img 
                src="/hero-preview-light.png" 
                alt="SyncScribe Interface" 
                className="w-full object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-32 px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Shield, title: 'Military Grade', desc: 'End-to-end encryption ensures your data remains yours and yours alone.', color: 'rose' },
            { icon: Zap, title: 'Instant Sync', desc: 'Real-time synchronization across all your devices. No lag, no waiting.', color: 'orange' },
            { icon: Share2, title: 'Easy Sharing', desc: 'Collaborate effortlessly with secure sharing links and permissions.', color: 'blue' }
          ].map((feat, i) => (
            <div key={i} className="group p-8 rounded-3xl bg-white border border-slate-100 hover:border-rose-100 hover:shadow-xl hover:shadow-rose-500/5 transition-all duration-300">
              <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feat.icon className="text-rose-500 w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-slate-900">{feat.title}</h3>
              <p className="text-slate-500 leading-relaxed font-medium">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-slate-100 bg-white z-10 relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: 'Files Secured', value: '10M+' },
            { label: 'Uptime', value: '99.9%' },
            { label: 'Active Users', value: '500K' },
            { label: 'Data Centers', value: '24' }
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-4xl font-black text-slate-900 mb-2">{stat.value}</div>
              <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-6 py-32 z-10 relative">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4 text-slate-900">Everything in its place</h2>
          <p className="text-slate-500 font-medium">Smart categorization for every type of file you own.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: FileText, label: 'Documents', color: 'text-blue-500', bg: 'bg-blue-50' },
              { icon: ImageIcon, label: 'Images', color: 'text-rose-500', bg: 'bg-rose-50' },
              { icon: Video, label: 'Media', color: 'text-purple-500', bg: 'bg-purple-50' },
              { icon: Folder, label: 'Projects', color: 'text-orange-500', bg: 'bg-orange-50' }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-6 p-8 rounded-[2rem] bg-white border border-slate-100 group cursor-default hover:border-rose-100 hover:shadow-lg transition-all">
                <div className={`w-20 h-20 ${item.bg} rounded-3xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-sm`}>
                  <item.icon className={`w-10 h-10 ${item.color}`} />
                </div>
                <span className="font-bold text-slate-900 text-lg">{item.label}</span>
              </div>
            ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-white border-t border-slate-100 z-10 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-rose-500 rounded-xl flex items-center justify-center shadow-lg shadow-rose-500/20">
                <Cloud className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-slate-900">SyncScribe</span>
            </div>
            <div className="flex gap-8 text-slate-500 font-medium">
              <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Twitter</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Support</a>
            </div>
          </div>
          <div className="text-center text-slate-400 text-sm font-medium">
            © 2026 SyncScribe Cloud Storage. All rights reserved. Built for the modern web.
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 6s linear infinite;
        }
      `}} />
    </div>
  );
};

export default Landing;


