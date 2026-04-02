"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  Download, Mail, Phone, MapPin, Linkedin, Github, 
  Award, Briefcase, Code, Database, Cloud, Zap, X
} from 'lucide-react';
import { useUniverseStore } from "@/store/useUniverseStore";

// Particle System Component
const UniverseBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size (viewport only for fixed background)
    const setCanvasSize = () => {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      life: number;
      maxLife: number;
      hue: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.life = 0;
        this.maxLife = Math.random() * 300 + 200;
        this.hue = Math.random() * 60 + 180; // Blue to cyan range
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life++;

        // Fade in and out
        if (this.life < 50) {
          this.opacity = (this.life / 50) * 0.8;
        } else if (this.life > this.maxLife - 50) {
          this.opacity = ((this.maxLife - this.life) / 50) * 0.8;
        }

        // Wrap around screen
        if (this.x < 0) this.x = canvas!.width;
        if (this.x > canvas!.width) this.x = 0;
        if (this.y < 0) this.y = canvas!.height;
        if (this.y > canvas!.height) this.y = 0;

        return this.life < this.maxLife;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = `hsl(${this.hue}, 100%, 70%)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Glow effect
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);
        gradient.addColorStop(0, `hsla(${this.hue}, 100%, 70%, ${this.opacity * 0.3})`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Shooting star class
    class ShootingStar {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      opacity: number;
      life: number;
      maxLife: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height * 0.5; // Top half
        this.length = Math.random() * 80 + 40;
        this.speed = Math.random() * 10 + 10;
        this.angle = Math.PI / 4; // 45 degrees
        this.opacity = 1;
        this.life = 0;
        this.maxLife = 100;
      }

      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.life++;
        this.opacity = 1 - (this.life / this.maxLife);
        return this.life < this.maxLife;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        
        const gradient = ctx.createLinearGradient(
          this.x,
          this.y,
          this.x - Math.cos(this.angle) * this.length,
          this.y - Math.sin(this.angle) * this.length
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.5, 'rgba(100, 200, 255, 0.5)');
        gradient.addColorStop(1, 'transparent');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
          this.x - Math.cos(this.angle) * this.length,
          this.y - Math.sin(this.angle) * this.length
        );
        ctx.stroke();
        ctx.restore();
      }
    }

    const particles: Particle[] = [];
    const shootingStars: ShootingStar[] = [];
    const maxParticles = 150;

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(new Particle());
    }

    let lastShootingStar = 0;

    // Animation loop
    const animate = (timestamp: number) => {
      ctx.fillStyle = 'rgba(3, 7, 18, 0.1)';
      ctx.fillRect(0, 0, canvas!.width, canvas!.height);

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        if (!particle.update()) {
          particles.splice(i, 1);
          particles.push(new Particle());
        }
        particle.draw(ctx);
      }

      // Add shooting stars randomly
      if (timestamp - lastShootingStar > 3000 && Math.random() < 0.02) {
        shootingStars.push(new ShootingStar());
        lastShootingStar = timestamp;
      }

      // Update and draw shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];
        if (!star.update()) {
          shootingStars.splice(i, 1);
        } else {
          star.draw(ctx);
        }
      }

      requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
      style={{ background: 'linear-gradient(to bottom, #030712, #0c1428, #1a1f3a)' }}
    />
  );
};

export default function PortfolioUniverse() {
  const { isOpen, closeUniverse, isExiting } = useUniverseStore();

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Ravi_Kumar_Keshari_Resume_2026.pdf';
    link.download = 'Ravi_Kumar_Keshari_Resume_2026.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const sciFiItemVariants: Variants = {
    hidden: { y: 40, opacity: 0, filter: "blur(10px)", scale: 0.95, rotateX: -10 },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      rotateX: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  const slideInLeft: Variants = {
    hidden: { x: -60, opacity: 0, filter: "blur(10px)" },
    visible: { x: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 0.7, ease: "easeOut" } }
  };

  const slideInRight: Variants = {
    hidden: { x: 60, opacity: 0, filter: "blur(10px)" },
    visible: { x: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 0.7, ease: "easeOut" } }
  };

  const popIn: Variants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 15 } }
  };

  const projects = [
    {
      title: "Ravi Medical Agency",
      subtitle: "Medical Inventory Management Platform",
      stack: "React.js, Node.js, Express, PostgreSQL, JWT Auth, REST API, AWS",
      points: [
        "Engineered full-stack platform managing 1,000+ SKUs with real-time tracking",
        "Implemented JWT-based authentication and admin dashboard",
        "Reduced manual inventory errors by 70%"
      ],
      icon: <Database className="w-6 h-6" />
    },
    {
      title: "CivicRise India v1.0.4",
      subtitle: "Civic Engagement PWA",
      stack: "Next.js 14, TypeScript, Tailwind CSS, Supabase, Google Maps API",
      points: [
        "Built Next.js 14 PWA with geo-tagged civic issue reporting",
        "Supported 500+ submissions with Lighthouse score 90+",
        "Integrated Supabase for real-time data with row-level security"
      ],
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: "Chemical Equipment Visualizer",
      subtitle: "Hybrid Web & Desktop App",
      stack: "Django REST Framework, React.js, PyQt5, Pandas, SQLite",
      points: [
        "Designed Django REST backend serving both web and desktop frontends",
        "Processing data with Pandas, reducing analysis time by 80%",
        "Hybrid architecture for maximum flexibility"
      ],
      icon: <Code className="w-6 h-6" />
    }
  ];

  const skills = {
    "Languages": ["C", "C++", "Python", "JavaScript (ES6+)", "TypeScript", "SQL"],
    "Frontend": ["React.js", "Next.js 14", "React Native", "HTML5", "CSS3", "Tailwind CSS", "Framer Motion"],
    "Backend & DB": ["Node.js", "Express.js", "Django", "Django REST Framework", "PostgreSQL", "MySQL", "SQLite", "Supabase"],
    "Data & Cloud": ["Pandas", "NumPy", "Power BI", "Tableau", "Excel", "Chart.js", "Matplotlib", "AWS S3", "Vercel"]
  };

  if (!isOpen && !isExiting) return null;

  return (
    <AnimatePresence>
      {(isOpen || isExiting) && (
        <motion.div
          key="universe-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] overflow-y-auto overflow-x-hidden bg-[#030712] text-slate-100 font-sans"
        >
          {/* Sci-Fi Scanline Overlay */}
          <div 
            className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" 
            style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #06b6d4 2px, #06b6d4 4px)', backgroundSize: '100% 4px' }} 
          />

          {/* Universe Background - Now fixed and outside potential scroll containers */}
          <UniverseBackground />

          {/* Download Button - Responsive positioned */}
          <motion.button
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
            onClick={handleDownload}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 md:translate-x-0 md:bottom-auto md:top-24 md:left-auto md:right-28 z-[160] group bg-gradient-to-r from-cyan-600/80 to-blue-700/80 text-white px-6 py-3 md:px-5 md:py-2.5 rounded-full font-bold shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:shadow-[0_0_40px_rgba(6,182,212,0.8)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-xl border border-cyan-400/50 w-max"
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-5 h-5 md:w-4 md:h-4 group-hover:animate-bounce text-cyan-200" />
            <span className="text-sm md:text-sm tracking-wide uppercase font-mono">Download Resume</span>
          </motion.button>

          {/* Close Button - Responsive positioned */}
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            onClick={closeUniverse}
            className="fixed top-24 right-4 md:top-24 md:right-10 z-[160] p-3 rounded-full bg-slate-900/80 backdrop-blur-xl border border-cyan-500/50 text-cyan-400 hover:text-white hover:border-cyan-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all group overflow-hidden"
          >
            <div className="absolute inset-0 bg-cyan-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <X className="w-6 h-6 md:w-6 md:h-6 relative z-10 group-hover:rotate-90 transition-transform duration-300" />
          </motion.button>

          {/* Fluid Animated Gradient Orbs */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            <motion.div
              className="absolute top-20 left-10 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
              animate={{
                x: [0, 50, 0],
                y: [0, 50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-1/2 right-0 w-[400px] md:w-[700px] h-[400px] md:h-[700px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
                filter: 'blur(80px)',
              }}
              animate={{
                x: [0, -50, 0],
                y: [0, 80, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-24 min-h-screen pb-32 md:pb-24">
            
            {/* Hero Section */}
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: false, amount: 0.3 }}
              variants={containerVariants} 
              className="mb-20 md:mb-32 relative pt-8 md:pt-0"
            >
              <div className="absolute -left-4 md:-left-6 top-0 w-1 md:w-2 h-full bg-gradient-to-b from-cyan-400 to-transparent shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
              <motion.h1 
                variants={sciFiItemVariants}
                className="text-5xl sm:text-7xl md:text-8xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 leading-tight"
                style={{ fontFamily: "'Archivo Black', sans-serif" }}
              >
                RAVI KUMAR
                <br />
                <span className="text-4xl sm:text-6xl md:text-7xl">KESHARI</span>
              </motion.h1>
              <motion.p 
                variants={slideInLeft}
                className="text-lg sm:text-xl md:text-2xl text-cyan-400 font-light mb-6 flex items-center gap-3 overflow-hidden whitespace-nowrap text-ellipsis"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                <Database className="w-5 h-5 shrink-0 animate-pulse" />
                <span className="truncate">Full Stack Developer | CS & Data Analytics</span>
              </motion.p>
              
              <motion.div variants={sciFiItemVariants} className="flex flex-wrap items-center gap-4 text-sm sm:text-base md:text-lg text-slate-300 mb-8">
                <span className="px-5 py-2 bg-slate-900/80 backdrop-blur-md rounded-sm border-l-2 border-r-2 border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                  SYSTEM STATUS: <span className="text-cyan-400 font-semibold animate-pulse">ONLINE</span>
                </span>
                <span className="px-5 py-2 bg-slate-900/80 backdrop-blur-md rounded-sm border-l-2 border-r-2 border-purple-500/50 shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                  CPI: <span className="text-purple-400 font-semibold">9.53</span>
                </span>
              </motion.div>

              {/* Contact Info */}
              <motion.div variants={containerVariants} className="flex flex-wrap gap-4 text-slate-400">
                {[
                  { icon: <Mail className="w-4 h-4" />, text: "ravi.keshari029@gmail.com", href: "mailto:ravi.keshari029@gmail.com" },
                  { icon: <Phone className="w-4 h-4" />, text: "+91-8210345567", href: "tel:+918210345567" },
                  { icon: <MapPin className="w-4 h-4" />, text: "Kochas, Bihar", href: "#" },
                  { icon: <Linkedin className="w-4 h-4" />, text: "LinkedIn", href: "https://www.linkedin.com/in/ravi-kumar-keshari-a37828347/" },
                  { icon: <Github className="w-4 h-4" />, text: "GitHub", href: "https://github.com/ravi-c029" }
                ].map((contact, idx) => (
                  <motion.a 
                    key={idx}
                    variants={popIn}
                    href={contact.href} 
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800/40 border border-slate-700/50 hover:border-cyan-400/50 hover:bg-cyan-900/20 rounded-lg hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
                  >
                    {contact.icon}
                    <span className="text-sm md:text-base font-mono">{contact.text}</span>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Professional Summary */}
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: false, amount: 0.3 }}
              variants={sciFiItemVariants} 
              className="mb-20 md:mb-32 relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
              <div className="relative bg-slate-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6 sm:p-8 md:p-10">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-cyan-400 flex items-center gap-3 font-mono tracking-wider">
                  <span className="text-blue-500">{'>'}</span> INIT_SUMMARY
                  <motion.div 
                    animate={{ opacity: [1, 0, 1] }} 
                    transition={{ repeat: Infinity, duration: 1 }} 
                    className="w-3 h-8 bg-cyan-400 ml-1"
                  />
                </h2>
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
                  Full Stack Developer and Computer Science & Data Analytics student at IIT Patna (CPI: 9.53) with proven experience 
                  building production-grade web applications using <span className="text-cyan-300 font-semibold">React.js, Next.js 14, Django REST Framework, Node.js, and Supabase</span>. 
                  Delivered 3 live projects serving real users. Strong foundation in data analytics, REST API design, PostgreSQL, and 
                  cloud deployment. Seeking a software engineering or data analyst role to drive measurable business impact.
                </p>
              </div>
            </motion.div>

            {/* Work Experience */}
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: false, amount: 0.1 }}
              variants={containerVariants} 
              className="mb-20 md:mb-32"
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-cyan-400 flex items-center gap-4 uppercase font-mono tracking-widest pl-4 border-l-4 border-cyan-500 shadow-[-10px_0_15px_-10px_rgba(6,182,212,0.8)]">
                Experience_Logs
              </h2>
              
              <div className="space-y-8 md:space-y-12">
                {[
                  {
                    title: "Full Stack & IoT/AI Intern",
                    company: "Ticky Tech Pvt. Ltd. (Incubation Centre, IIT Patna)",
                    date: "DEC 2025 – FEB 2026",
                    color: "cyan",
                    points: [
                      "Completed 45-day intensive internship program focused on Full-Stack Development, IoT systems, and Artificial Intelligence",
                      "Gained hands-on experience building and integrating full-stack applications alongside IoT and AI modules in startup environment"
                    ]
                  },
                  {
                    title: "Frontend Development Intern",
                    company: "ProDesk IT & Engineering Services",
                    date: "June 2025 – Sept 2025",
                    color: "purple",
                    points: [
                      "Built 10+ responsive UI components in React.js from Figma wireframes, achieving pixel-perfect implementation",
                      "Integrated RESTful APIs with error handling, cutting frontend-reported bugs by 40% in QA cycles",
                      "Participated in Agile sprints, code reviews, and Git-based version control workflows"
                    ]
                  }
                ].map((job, idx) => (
                  <motion.div 
                    key={idx}
                    variants={slideInLeft}
                    className="relative group no-underline"
                  >
                    <div className={`absolute -left-4 top-0 w-1 h-full bg-gradient-to-b ${job.color === 'cyan' ? 'from-cyan-500 to-blue-500' : 'from-blue-500 to-purple-500'} group-hover:w-2 transition-all shadow-[0_0_10px_currentColor] text-${job.color}-500`} />
                    <div className="overflow-hidden bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 sm:p-8 hover:border-cyan-400/50 hover:bg-slate-800/80 transition-all relative">
                      {/* Scanning Line Effect */}
                      <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400/50 shadow-[0_0_10px_rgba(6,182,212,0.8)] transform -translate-y-full group-hover:animate-[scan_2s_ease-in-out_infinite]" />
                      
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 gap-4">
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{job.title}</h3>
                          <p className={`text-${job.color}-400 font-medium font-mono text-sm sm:text-base`}>{job.company}</p>
                        </div>
                        <span className="text-slate-300 bg-slate-950/80 border border-slate-700 font-mono px-4 py-2 rounded-sm text-xs sm:text-sm self-start whitespace-nowrap shadow-inner">
                          {job.date}
                        </span>
                      </div>
                      <ul className="space-y-4 text-slate-300 text-sm sm:text-base">
                        {job.points.map((pt, pIdx) => (
                          <li key={pIdx} className="flex gap-4">
                            <span className={`text-${job.color}-400 mt-1 font-bold`}>{'>'}</span>
                            <span className="leading-relaxed">{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Projects */}
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: false, amount: 0.1 }}
              variants={containerVariants} 
              className="mb-20 md:mb-32"
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-cyan-400 flex items-center gap-4 uppercase font-mono tracking-widest pl-4 border-l-4 border-blue-500 shadow-[-10px_0_15px_-10px_rgba(59,130,246,0.8)]">
                System_Modules
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
                {projects.map((project, index) => (
                  <motion.div
                    key={index}
                    variants={popIn}
                    whileHover={{ scale: 1.02 }}
                    className="group relative"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl opacity-20 group-hover:opacity-100 transition duration-500 blur-md group-hover:blur-lg" />
                    <div className="relative h-full bg-slate-900/90 backdrop-blur-2xl border border-slate-700/50 rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row gap-6 items-start">
                      <div className="p-4 bg-slate-950 border border-cyan-500/30 rounded-xl text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] group-hover:scale-110 transition-all duration-300">
                        {project.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide">{project.title}</h3>
                          <span className="text-xs font-mono text-cyan-300 bg-cyan-900/30 px-3 py-1 rounded-sm border border-cyan-500/20 uppercase w-max">Active</span>
                        </div>
                        <p className="text-slate-400 font-mono text-sm mb-4">{project.subtitle}</p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.stack.split(', ').map((tech, i) => (
                            <span key={i} className="text-xs font-mono bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700 group-hover:border-cyan-500/40 transition-colors">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <ul className="space-y-3 text-slate-300 text-sm sm:text-base">
                          {project.points.map((point, i) => (
                            <li key={i} className="flex gap-3">
                              <span className="text-cyan-400 mt-1 font-bold">~</span>
                              <span className="leading-relaxed">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Corner Accents */}
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400 rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Technical Skills */}
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: false, amount: 0.1 }}
              variants={containerVariants} 
              className="mb-20 md:mb-32"
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-cyan-400 flex items-center gap-4 uppercase font-mono tracking-widest pl-4 border-l-4 border-purple-500 shadow-[-10px_0_15px_-10px_rgba(168,85,247,0.8)]">
                Core_Competencies
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
                {Object.entries(skills).map(([category, items], index) => (
                  <motion.div
                    key={category}
                    variants={slideInRight}
                    className="bg-slate-900/70 backdrop-blur-md border border-slate-700/50 rounded-xl p-6 sm:p-8 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all relative overflow-hidden group"
                  >
                    {/* Hover Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-6 flex items-center gap-3 relative z-10">
                      <div className="p-2 bg-slate-800 rounded-lg text-cyan-400 border border-slate-700">
                        {category === "Languages" && <Code className="w-5 h-5" />}
                        {category === "Frontend" && <Zap className="w-5 h-5" />}
                        {category === "Backend & DB" && <Database className="w-5 h-5" />}
                        {category === "Data & Cloud" && <Cloud className="w-5 h-5" />}
                      </div>
                      <span className="font-mono">{category}</span>
                    </h3>
                    <div className="flex flex-wrap gap-2 md:gap-3 relative z-10">
                      {items.map((skill, i) => (
                        <motion.span 
                          key={i} 
                          whileHover={{ scale: 1.1, backgroundColor: "#0891b2", color: "#fff", borderColor: "#22d3ee" }}
                          className="bg-slate-950 text-slate-300 font-mono text-xs sm:text-sm px-3 py-1.5 rounded-md border border-slate-700 hover:border-cyan-400 cursor-default shadow-sm transition-colors"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: false, amount: 0.2 }}
              variants={containerVariants} 
              className="mb-16"
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-cyan-400 flex items-center gap-4 uppercase font-mono tracking-widest pl-4 border-l-4 border-yellow-500 shadow-[-10px_0_15px_-10px_rgba(234,179,8,0.8)]">
                Milestones & Accolades
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <motion.div 
                  variants={popIn}
                  className="bg-gradient-to-br from-slate-900 to-slate-800 backdrop-blur-xl border border-yellow-500/30 rounded-xl p-6 sm:p-8 hover:border-yellow-400 hover:shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/10 rounded-bl-full -z-0" />
                  <div className="flex items-start gap-4 relative z-10">
                    <div className="p-3 bg-yellow-500/20 text-yellow-500 rounded-lg group-hover:scale-110 transition-transform">
                      <Award className="w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-white mb-1">School Topper</h4>
                      <p className="text-slate-400 font-mono text-sm">(94.6%, BSEB 2022)</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  variants={popIn}
                  className="bg-gradient-to-br from-slate-900 to-slate-800 backdrop-blur-xl border border-cyan-500/30 rounded-xl p-6 sm:p-8 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-bl-full -z-0" />
                  <div className="flex items-start gap-4 relative z-10">
                    <div className="p-3 bg-cyan-500/20 text-cyan-400 rounded-lg group-hover:scale-110 transition-transform">
                      <Briefcase className="w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-white mb-1">Executive Director</h4>
                      <p className="text-slate-400 font-mono text-sm">Own Startup (2025)</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  variants={popIn}
                  className="bg-slate-900/70 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 sm:p-8 hover:border-cyan-500/50 col-span-full"
                >
                  <div className="space-y-4 text-slate-300 font-mono text-sm sm:text-base">
                    <p className="flex gap-3 hover:text-white transition-colors duration-300">
                      <span className="text-cyan-400">[*]</span> Advanced Diploma in Computer Applications (1 Year) — MS Office, Advanced Excel, Python
                    </p>
                    <p className="flex gap-3 hover:text-white transition-colors duration-300">
                      <span className="text-purple-400">[*]</span> Flipkart × SCOA Data Entry Operator Certificate (2025)
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Footer CTA */}
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: false }}
              variants={sciFiItemVariants}
              className="text-center py-16 mt-10 md:mt-20 border-t border-cyan-500/20 relative"
            >
              {/* Decorative line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
              
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8 font-mono">READY_FOR_DEPLOYMENT?</h3>
              
              <motion.button
                onClick={handleDownload}
                className="group relative inline-flex items-center justify-center bg-transparent text-cyan-400 px-8 py-4 sm:px-12 sm:py-5 text-base sm:text-lg font-bold font-mono uppercase tracking-widest overflow-hidden border border-cyan-500/50 rounded-sm hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Glitch/Hover Background */}
                <div className="absolute inset-0 bg-cyan-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
                <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 delay-75 transition-transform duration-300 ease-out z-0" />
                
                <span className="relative z-10 flex items-center gap-3">
                  <Download className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-bounce" />
                  INITIATE_DOWNLOAD
                </span>

                {/* Cyberpunk corner details */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white opacity-0 group-hover:opacity-100 transition-opacity z-10" />
              </motion.button>
              <p className="mt-8 text-slate-500 font-mono text-sm tracking-widest uppercase">
                End of Transmission
              </p>
            </motion.div>
          </div>

          <style jsx global>{`
            @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Mono:wght@400;700&display=swap');
            
            @keyframes scan {
              0% { transform: translateY(-100%); opacity: 0; }
              10% { opacity: 1; }
              90% { opacity: 1; }
              100% { transform: translateY(1000%); opacity: 0; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
