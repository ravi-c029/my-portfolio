"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, Variants } from 'framer-motion';
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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

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
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
    }
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
    "Data & Cloud": ["Pandas", "NumPy", "Power BI", "Tableau", "Excel (Advanced)", "Chart.js", "Matplotlib", "AWS S3", "Vercel"]
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
          className="fixed inset-0 z-[100] overflow-y-auto bg-[#030712] text-slate-100"
        >
          {/* Universe Background - Now fixed and outside potential scroll containers */}
          <UniverseBackground />

          {/* Download Button - Moved outside the content container to prevent flex/grid stretching */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            onClick={handleDownload}
            className="fixed top-20 md:top-24 right-24 md:right-28 z-[160] group bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-2.5 rounded-full font-semibold shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-xl border border-cyan-400/30 w-fit h-fit whitespace-nowrap"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 50px rgba(6, 182, 212, 0.6)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-4 h-4" />
            <span className="text-sm">Download PDF</span>
          </motion.button>

          {/* Close Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={closeUniverse}
            className="fixed top-20 md:top-24 right-6 md:right-10 z-[160] p-3 rounded-full bg-slate-800/80 backdrop-blur-md border border-cyan-500/30 text-cyan-400 hover:text-white hover:border-cyan-400 transition-all shadow-lg"
          >
            <X className="w-6 h-6" />
          </motion.button>

          {/* Fluid Animated Gradient Orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-20 left-10 w-[600px] h-[600px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
              animate={{
                x: [0, 100, 0],
                y: [0, 50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute top-60 right-20 w-[700px] h-[700px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
                filter: 'blur(80px)',
              }}
              animate={{
                x: [0, -80, 0],
                y: [0, 100, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-40 left-1/3 w-[500px] h-[500px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, transparent 70%)',
                filter: 'blur(70px)',
              }}
              animate={{
                x: [0, 50, 0],
                y: [0, -50, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="relative z-10 max-w-6xl mx-auto px-6 py-24 min-h-screen"
          >
            {/* Hero Section */}
            <motion.div variants={itemVariants} className="mb-20 relative">
              <div className="absolute -left-4 top-0 w-1 h-32 bg-gradient-to-b from-cyan-400 to-transparent" />
              <motion.h1 
                className="text-7xl md:text-8xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400"
                style={{ fontFamily: "'Archivo Black', sans-serif" }}
              >
                RAVI KUMAR
                <br />
                <span className="text-6xl md:text-7xl">KESHARI</span>
              </motion.h1>
              <motion.p 
                className="text-2xl text-cyan-400 font-light mb-6"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                Full Stack Developer | CS & Data Analytics | IIT Patna
              </motion.p>
              <motion.div className="flex items-center gap-2 text-lg text-slate-300 mb-6">
                <span className="px-4 py-2 bg-slate-800/50 backdrop-blur-sm rounded-full border border-cyan-500/20">
                  CPI: <span className="text-cyan-400 font-semibold">9.53</span>
                </span>
              </motion.div>

              {/* Contact Info */}
              <motion.div className="flex flex-wrap gap-4 text-slate-400">
                <a href="mailto:ravi.keshari029@gmail.com" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                  <Mail className="w-4 h-4" />
                  ravi.keshari029@gmail.com
                </a>
                <a href="tel:+918210345567" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                  <Phone className="w-4 h-4" />
                  +91-8210345567
                </a>
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Kochas, Bihar
                </span>
                <a href="https://www.linkedin.com/in/ravi-kumar-keshari-a37828347/" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
                <a href="https://github.com/ravi-c029" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </motion.div>
            </motion.div>

            {/* Professional Summary */}
            <motion.div variants={itemVariants} className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-cyan-400 flex items-center gap-3">
                <div className="w-12 h-[2px] bg-gradient-to-r from-cyan-400 to-transparent" />
                PROFESSIONAL SUMMARY
              </h2>
              <p className="text-lg text-slate-200 leading-relaxed bg-slate-900/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 shadow-2xl shadow-cyan-500/10">
                Full Stack Developer and Computer Science & Data Analytics student at IIT Patna (CPI: 9.53) with proven experience 
                building production-grade web applications using React.js, Next.js 14, Django REST Framework, Node.js, and Supabase. 
                Delivered 3 live projects serving real users. Strong foundation in data analytics, REST API design, PostgreSQL, and 
                cloud deployment. Seeking a software engineering or data analyst role to drive measurable business impact.
              </p>
            </motion.div>

            {/* Work Experience */}
            <motion.div variants={itemVariants} className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-cyan-400 flex items-center gap-3">
                <div className="w-12 h-[2px] bg-gradient-to-r from-cyan-400 to-transparent" />
                WORK EXPERIENCE
              </h2>
              
              <div className="space-y-6">
                <motion.div 
                  className="relative group"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-blue-500 group-hover:w-2 transition-all" />
                  <div className="bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-400/40 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all">
                    <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">Full Stack & IoT/AI Intern</h3>
                        <p className="text-cyan-400 font-medium">Ticky Tech Pvt. Ltd. (Incubation Centre, IIT Patna)</p>
                      </div>
                      <span className="text-slate-300 bg-slate-800/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm border border-cyan-500/20">DEC 2025 – FEB 2026</span>
                    </div>
                    <ul className="space-y-3 text-slate-200">
                      <li className="flex gap-3">
                        <span className="text-cyan-400 mt-1">▪</span>
                        <span>Completed 45-day intensive internship program focused on Full-Stack Development, IoT systems, and Artificial Intelligence</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-cyan-400 mt-1">▪</span>
                        <span>Gained hands-on experience building and integrating full-stack applications alongside IoT and AI modules in startup environment</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>

                <motion.div 
                  className="relative group"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 group-hover:w-2 transition-all" />
                  <div className="bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-400/40 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all">
                    <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">Frontend Development Intern</h3>
                        <p className="text-cyan-400 font-medium">ProDesk IT & Engineering Services</p>
                      </div>
                      <span className="text-slate-300 bg-slate-800/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm border border-cyan-500/20">June 2025 – Sept 2025</span>
                    </div>
                    <ul className="space-y-3 text-slate-200">
                      <li className="flex gap-3">
                        <span className="text-cyan-400 mt-1">▪</span>
                        <span>Built 10+ responsive UI components in React.js from Figma wireframes, achieving pixel-perfect implementation</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-cyan-400 mt-1">▪</span>
                        <span>Integrated RESTful APIs with error handling, cutting frontend-reported bugs by 40% in QA cycles</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-cyan-400 mt-1">▪</span>
                        <span>Participated in Agile sprints, code reviews, and Git-based version control workflows</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Projects */}
            <motion.div variants={itemVariants} className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-cyan-400 flex items-center gap-3">
                <div className="w-12 h-[2px] bg-gradient-to-r from-cyan-400 to-transparent" />
                FEATURED PROJECTS
              </h2>
              
              <div className="grid md:grid-cols-1 gap-6">
                {projects.map((project, index) => (
                  <motion.div
                    key={index}
                    className="group relative"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
                    <div className="relative bg-slate-900/60 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/30 transition-all">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl text-white shadow-lg shadow-cyan-500/50">
                          {project.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-white mb-1">{project.title}</h3>
                          <p className="text-cyan-400 font-medium mb-3">{project.subtitle}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.stack.split(', ').map((tech, i) => (
                              <span key={i} className="text-xs bg-slate-800/80 backdrop-blur-sm text-slate-200 px-3 py-1 rounded-full border border-cyan-500/30">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <ul className="space-y-2 text-slate-200">
                        {project.points.map((point, i) => (
                          <li key={i} className="flex gap-3">
                            <span className="text-cyan-400 mt-1">→</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Technical Skills */}
            <motion.div variants={itemVariants} className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-cyan-400 flex items-center gap-3">
                <div className="w-12 h-[2px] bg-gradient-to-r from-cyan-400 to-transparent" />
                TECHNICAL SKILLS
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(skills).map(([category, items], index) => (
                  <motion.div
                    key={category}
                    className="bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-400/40 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all"
                    whileHover={{ y: -5 }}
                  >
                    <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                      {category === "Languages" && <Code className="w-5 h-5" />}
                      {category === "Frontend" && <Zap className="w-5 h-5" />}
                      {category === "Backend & DB" && <Database className="w-5 h-5" />}
                      {category === "Data & Cloud" && <Cloud className="w-5 h-5" />}
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {items.map((skill, i) => (
                        <span 
                          key={i} 
                          className="bg-slate-800/80 backdrop-blur-sm text-slate-200 px-3 py-1.5 rounded-lg text-sm border border-cyan-500/30 hover:border-cyan-400/60 hover:text-cyan-300 hover:shadow-lg hover:shadow-cyan-500/20 transition-all cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div variants={itemVariants} className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-cyan-400 flex items-center gap-3">
                <div className="w-12 h-[2px] bg-gradient-to-r from-cyan-400 to-transparent" />
                ACHIEVEMENTS & CERTIFICATIONS
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <motion.div 
                  className="bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6 hover:border-yellow-400/40 hover:shadow-2xl hover:shadow-yellow-500/20 transition-all"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center gap-3">
                    <Award className="w-6 h-6 text-yellow-400" />
                    <span className="text-white font-semibold">School Topper (94.6%, BSEB 2022)</span>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/40 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-6 h-6 text-cyan-400" />
                    <span className="text-white font-semibold">Executive Director – Own Startup (2025)</span>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/40 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all col-span-full"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-slate-200">
                    <p className="mb-2">📜 Advanced Diploma in Computer Applications (1 Year) — MS Office, Advanced Excel, Python</p>
                    <p>📜 Flipkart × SCOA Data Entry Operator Certificate (2025)</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Footer CTA */}
            <motion.div 
              variants={itemVariants}
              className="text-center py-12 border-t border-cyan-500/20"
            >
              <motion.button
                onClick={handleDownload}
                className="group bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-12 py-4 rounded-full text-lg font-semibold shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all duration-300 flex items-center gap-3 mx-auto"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 50px rgba(6, 182, 212, 0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-6 h-6 group-hover:animate-bounce" href="Ravi_Kumar_Keshari_Resume_2026.pdf"/>
                Download Complete Resume
              </motion.button>
              <p className="mt-6 text-slate-300">
                Let's build something amazing together
              </p>
            </motion.div>
          </motion.div>

          <style jsx global>{`
            @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Mono:wght@400;700&display=swap');
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
