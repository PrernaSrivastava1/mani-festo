import React, { useState, useEffect, useRef } from 'react';
import {
  Compass,
  Heart,
  Sparkles,
  Activity,
  BookOpen,
  Award,
  Flame,
  User,
  Moon,
  Sun,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Plus,
  Trash2,
  Calendar,
  ChevronRight,
  X,
  Check,
  CheckCircle,
  Trophy,
  HelpCircle,
  Clock,
  Briefcase,
  Smile,
  Shield,
  Zap,
  TrendingUp,
  Image as ImageIcon
} from 'lucide-react';

// Preset Templates matching PRD
const GOAL_TEMPLATES = [
  {
    name: "Get Placement Ready",
    category: "career",
    description: "Prepare core skills for top tier product company placements in 90 days.",
    visionImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80",
    milestones: [
      { id: 101, name: "Master DSA basics & Arrays/Trees", completed: true },
      { id: 102, name: "Complete 5 portfolio projects (React/Node/ML)", completed: false },
      { id: 103, name: "Pass 15 mock technical interviews", completed: false }
    ],
    tasks: [
      { id: 201, name: "DSA & Problem Solving", targetHours: 3, loggedHours: 3 },
      { id: 202, name: "AI/ML Development", targetHours: 2, loggedHours: 1 },
      { id: 203, name: "Core Projects Dev", targetHours: 3, loggedHours: 0.5 },
      { id: 204, name: "Mock practice & Core Subs", targetHours: 2, loggedHours: 1 }
    ]
  },
  {
    name: "Build Muscle & Get Fit (Aman)",
    category: "fitness",
    description: "Build target strength and get lean in 90 days.",
    visionImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80",
    milestones: [
      { id: 501, name: "Consistently hit daily macros for 30 days", completed: true },
      { id: 502, name: "Increase bench press baseline by 20%", completed: false },
      { id: 503, name: "Hit target body fat percentage goal", completed: false }
    ],
    tasks: [
      { id: 601, name: "Gym Workout Flow", targetHours: 1, loggedHours: 1 },
      { id: 602, name: "Nutrition & Meal Log", targetHours: 0.25, loggedHours: 0.25 },
      { id: 603, name: "Cold Shower & Rest", targetHours: 0.1, loggedHours: 0 },
      { id: 604, name: "Sleep & Recovery tracking", targetHours: 0.1, loggedHours: 0.1 }
    ]
  },
  {
    name: "Emotional Strength & Resilience (Priya)",
    category: "mindset",
    description: "Build core confidence and resilience in 90 days.",
    visionImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400&q=80",
    milestones: [
      { id: 701, name: "Complete a 15-day daily journaling streak", completed: true },
      { id: 702, name: "Learn 5 emotional coping mechanisms", completed: false },
      { id: 703, name: "Conduct a 30-day confidence meditation block", completed: false }
    ],
    tasks: [
      { id: 801, name: "Guided Meditation Hub", targetHours: 0.5, loggedHours: 0.5 },
      { id: 802, name: "Intention Affirmations", targetHours: 0.2, loggedHours: 0.2 },
      { id: 803, name: "Guided Reflection Journal", targetHours: 0.25, loggedHours: 0 },
      { id: 804, name: "Therapy & Mindset Reading", targetHours: 0.3, loggedHours: 0.3 }
    ]
  },
  {
    name: "Deeper Faith & Prayer (Lakshmi)",
    category: "spiritual",
    description: "Build deeper faith, calm, and connection through mantras.",
    visionImage: "https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=400&q=80",
    milestones: [
      { id: 901, name: "Memorize the core abundance mantras", completed: true },
      { id: 902, name: "Complete a 21-day Ho'oponopono block", completed: false }
    ],
    tasks: [
      { id: 1001, name: "Morning Prayers & Mantras", targetHours: 0.35, loggedHours: 0.35 },
      { id: 1002, name: "Ho'oponopono Cleansing Guide", targetHours: 0.2, loggedHours: 0.2 },
      { id: 1003, name: "Gratitude list reflection", targetHours: 0.2, loggedHours: 0.2 }
    ]
  },
  {
    name: "Abundance & Abundant Manifestation (Dev)",
    category: "career",
    description: "Align intention and secure Google dream job placement.",
    visionImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80",
    milestones: [
      { id: 1101, name: "Create high-fidelity vision board canvas", completed: true },
      { id: 1102, name: "Solve 150 LeetCode coding questions", completed: false }
    ],
    tasks: [
      { id: 1201, name: "Vision Board Viewing", targetHours: 0.1, loggedHours: 0.1 },
      { id: 1202, name: "Focus Subliminals Audios", targetHours: 0.35, loggedHours: 0.35 },
      { id: 1203, name: "Power Affirmations Loops", targetHours: 0.2, loggedHours: 0.2 },
      { id: 1204, name: "Career Prep Readings", targetHours: 0.2, loggedHours: 0.2 }
    ]
  },
  {
    name: "360° Holistic Life Upgrade (Sarah)",
    category: "lifestyle",
    description: "Transform your body, mind, career, and routine simultaneously.",
    visionImage: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=400&q=80",
    milestones: [
      { id: 1301, name: "Complete 10 days of the holistic challenge", completed: true },
      { id: 1302, name: "Hit target goals across 3 distinct slots", completed: false }
    ],
    tasks: [
      { id: 1401, name: "Physical Exercise Block", targetHours: 0.75, loggedHours: 0.75 },
      { id: 1402, name: "Quiet Mind Meditation", targetHours: 0.5, loggedHours: 0.5 },
      { id: 1403, name: "Self Growth Book Summaries", targetHours: 0.5, loggedHours: 0.5 },
      { id: 1404, name: "Gratitude journal reflections", targetHours: 0.2, loggedHours: 0.2 }
    ]
  }
];

// Helper: Custom Calming Web Audio synthesizer bell
const playBellSynth = (frequency = 523.25) => {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 1.4);
  } catch (e) {
    console.warn("Audio bell deferred until user interacts with document.");
  }
};

function App() {
  // --- STATE ---
  const [activeTab, setActiveTab] = useState('dashboard');
  const [theme, setTheme] = useState('light');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [streak, setStreak] = useState(27); // Standard user starts with momentum
  const [streakGoal, setStreakGoal] = useState(30);

  // Goals List State
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem('manifestor_goals');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].tasks && parsed[0].milestones) {
          return parsed;
        }
      } catch(e) { }
    }
    return GOAL_TEMPLATES;
  });
  const [activeGoalIndex, setActiveGoalIndex] = useState(0);

  // Create Goal Modal Form State
  const [isCreatingGoal, setIsCreatingGoal] = useState(false);
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalCat, setNewGoalCat] = useState('career');
  const [newGoalDesc, setNewGoalDesc] = useState('');
  const [newGoalVision, setNewGoalVision] = useState('');
  const [newGoalDays, setNewGoalDays] = useState(90);
  // Milestones & Daily Tasks inputs
  const [inputMilestones, setInputMilestones] = useState(["", ""]);
  const [inputTasks, setInputTasks] = useState([
    { name: "DSA Practice", targetHours: 3 },
    { name: "Project Coding", targetHours: 3 }
  ]);

  // AI Coach Logs
  const [coachLog, setCoachLog] = useState([
    {
      sender: 'coach',
      text: "Hey Arjun! Welcome back. Your 27-day streak is looking incredible. Today let's secure that Projects progress. You've logged 5.5 hours so far. Tap into the breathing hub if you feel fatigued.",
      time: "8:00 AM"
    }
  ]);
  const [coachInput, setCoachInput] = useState('');
  const [coachThinking, setCoachThinking] = useState(false);

  const confettiContainerRef = useRef(null);

  // --- 432HZ AUDIO ENGINE STATE & REFS ---
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioMode, setAudioMode] = useState('drone');
  const [audioVolume, setAudioVolume] = useState(0.3);

  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const oscillatorsRef = useRef([]);
  const lfoNodeRef = useRef(null);
  const filterNodeRef = useRef(null);

  // Remove scrollProgress state to prevent React re-renders on scroll
  const canvasRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      document.documentElement.style.setProperty('--scroll-y', `${scrollY}px`);
      
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        document.documentElement.style.setProperty('--scroll-progress', `${(scrollY / totalHeight) * 100}%`);
      }
    };
    
    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Init
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Floating Canvas Constellation Particle Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = canvas.offsetWidth || canvas.parentElement.offsetWidth || 800;
    let height = canvas.offsetHeight || canvas.parentElement.offsetHeight || 400;
    canvas.width = width;
    canvas.height = height;

    const particles = [];
    const particleCount = 35;

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 2 + 1.5;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = theme === 'light' ? 'rgba(255, 96, 0, 0.7)' : 'rgba(255, 195, 0, 0.7)';
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = theme === 'light'
              ? `rgba(255, 96, 0, ${0.22 * (1 - dist/110)})`
              : `rgba(255, 195, 0, ${0.18 * (1 - dist/110)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      drawLines();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.offsetWidth || canvas.parentElement.offsetWidth || 800;
      height = canvas.offsetHeight || canvas.parentElement.offsetHeight || 400;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeTab, theme]);

  // Cache goals to LocalStorage
  useEffect(() => {
    localStorage.setItem('manifestor_goals', JSON.stringify(goals));
  }, [goals]);

  // Sync Dark/Light theme class on documentElement
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Scroll reveal Intersection Observer setup
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
        }
      });
    }, { threshold: 0.05 });

    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));

    // Re-check elements after a slight delay to trigger immediately visible items
    const timer = setTimeout(() => {
      const activeElements = document.querySelectorAll('.reveal');
      activeElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('reveal-active');
        }
      });
    }, 100);

    return () => {
      elements.forEach(el => observer.unobserve(el));
      clearTimeout(timer);
    };
  }, [activeTab]);

  // 3D Scroll Tilt effect removed: It was causing significant scroll jank and UX issues.
  // We will rely on pure CSS hover interactions and simplified scroll reveals instead.

  // --- CONFETTI EMITTER ---
  const triggerConfettiAnimation = () => {
    if (soundEnabled) playBellSynth(587.33); // high D bell
    
    const container = confettiContainerRef.current;
    if (!container) return;

    for (let i = 0; i < 40; i++) {
      const p = document.createElement('div');
      p.className = 'confetti-particle';
      p.style.left = Math.random() * 100 + 'vw';
      p.style.backgroundColor = [
        '#f59e0b', // Amber
        '#10b981', // Sage Green
        '#a78bfa', // Lavender
        '#ef4444', // Red
        '#06b6d4'  // Cyan
      ][Math.floor(Math.random() * 5)];
      
      const size = Math.random() * 8 + 6;
      p.style.width = size + 'px';
      p.style.height = (Math.random() * 12 + 6) + 'px';
      
      const duration = Math.random() * 1.6 + 1.2;
      p.style.animation = `confettiFall ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`;
      p.style.animationDelay = (Math.random() * 0.3) + 's';
      
      container.appendChild(p);

      setTimeout(() => p.remove(), (duration + 0.4) * 1000);
    }
  };

  // --- 432HZ AUDIO ENGINE FUNCTIONS ---
  const startManifestingMusic = () => {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      
      let ctx = audioCtxRef.current;
      if (!ctx || ctx.state === 'closed') {
        ctx = new AudioContextClass();
        audioCtxRef.current = ctx;
      }
      
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      
      stopManifestingMusic();
      
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(audioVolume, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;
      
      const lowpassFilter = ctx.createBiquadFilter();
      lowpassFilter.type = 'lowpass';
      lowpassFilter.frequency.setValueAtTime(800, ctx.currentTime);
      lowpassFilter.connect(masterGain);
      filterNodeRef.current = lowpassFilter;
      
      const activeOscillators = [];
      
      if (audioMode === 'drone') {
        const oscSub = ctx.createOscillator();
        oscSub.type = 'sine';
        oscSub.frequency.setValueAtTime(108, ctx.currentTime);
        
        const gainSub = ctx.createGain();
        gainSub.gain.setValueAtTime(0.35, ctx.currentTime);
        oscSub.connect(gainSub).connect(lowpassFilter);
        oscSub.start();
        activeOscillators.push(oscSub);
        
        const oscCore = ctx.createOscillator();
        oscCore.type = 'triangle';
        oscCore.frequency.setValueAtTime(432, ctx.currentTime);
        
        const gainCore = ctx.createGain();
        gainCore.gain.setValueAtTime(0.25, ctx.currentTime);
        oscCore.connect(gainCore).connect(lowpassFilter);
        oscCore.start();
        activeOscillators.push(oscCore);
        
        const oscFifth = ctx.createOscillator();
        oscFifth.type = 'sine';
        oscFifth.frequency.setValueAtTime(648, ctx.currentTime);
        
        const gainFifth = ctx.createGain();
        gainFifth.gain.setValueAtTime(0.12, ctx.currentTime);
        oscFifth.connect(gainFifth).connect(lowpassFilter);
        oscFifth.start();
        activeOscillators.push(oscFifth);
        
        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.08, ctx.currentTime);
        
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(250, ctx.currentTime);
        
        lfo.connect(lfoGain).connect(lowpassFilter.frequency);
        lfo.start();
        activeOscillators.push(lfo);
        lfoNodeRef.current = lfo;
        
      } else if (audioMode === 'binaural') {
        const oscL = ctx.createOscillator();
        oscL.type = 'sine';
        oscL.frequency.setValueAtTime(432, ctx.currentTime);
        
        const gainL = ctx.createGain();
        gainL.gain.setValueAtTime(0.3, ctx.currentTime);
        
        if (ctx.createStereoPanner) {
          const pannerL = ctx.createStereoPanner();
          pannerL.pan.setValueAtTime(-1, ctx.currentTime);
          oscL.connect(gainL).connect(pannerL).connect(masterGain);
        } else {
          oscL.connect(gainL).connect(masterGain);
        }
        oscL.start();
        activeOscillators.push(oscL);
        
        const oscR = ctx.createOscillator();
        oscR.type = 'sine';
        oscR.frequency.setValueAtTime(442, ctx.currentTime);
        
        const gainR = ctx.createGain();
        gainR.gain.setValueAtTime(0.3, ctx.currentTime);
        
        if (ctx.createStereoPanner) {
          const pannerR = ctx.createStereoPanner();
          pannerR.pan.setValueAtTime(1, ctx.currentTime);
          oscR.connect(gainR).connect(pannerR).connect(masterGain);
        } else {
          oscR.connect(gainR).connect(masterGain);
        }
        oscR.start();
        activeOscillators.push(oscR);
        
        const oscCenter = ctx.createOscillator();
        oscCenter.type = 'sine';
        oscCenter.frequency.setValueAtTime(108, ctx.currentTime);
        
        const gainCenter = ctx.createGain();
        gainCenter.gain.setValueAtTime(0.2, ctx.currentTime);
        
        oscCenter.connect(gainCenter).connect(masterGain);
        oscCenter.start();
        activeOscillators.push(oscCenter);
        
      } else if (audioMode === 'bowls') {
        const oscBowl1 = ctx.createOscillator();
        oscBowl1.type = 'triangle';
        oscBowl1.frequency.setValueAtTime(432, ctx.currentTime);
        
        const gainBowl1 = ctx.createGain();
        gainBowl1.gain.setValueAtTime(0.3, ctx.currentTime);
        oscBowl1.connect(gainBowl1).connect(lowpassFilter);
        oscBowl1.start();
        activeOscillators.push(oscBowl1);
        
        const oscBowl2 = ctx.createOscillator();
        oscBowl2.type = 'sine';
        oscBowl2.frequency.setValueAtTime(540, ctx.currentTime);
        
        const gainBowl2 = ctx.createGain();
        gainBowl2.gain.setValueAtTime(0.18, ctx.currentTime);
        oscBowl2.connect(gainBowl2).connect(lowpassFilter);
        oscBowl2.start();
        activeOscillators.push(oscBowl2);
        
        const oscBowl3 = ctx.createOscillator();
        oscBowl3.type = 'sine';
        oscBowl3.frequency.setValueAtTime(648, ctx.currentTime);
        
        const gainBowl3 = ctx.createGain();
        gainBowl3.gain.setValueAtTime(0.12, ctx.currentTime);
        oscBowl3.connect(gainBowl3).connect(lowpassFilter);
        oscBowl3.start();
        activeOscillators.push(oscBowl3);
        
        const lfoBowl = ctx.createOscillator();
        lfoBowl.type = 'sine';
        lfoBowl.frequency.setValueAtTime(0.15, ctx.currentTime);
        
        const lfoBowlGain = ctx.createGain();
        lfoBowlGain.gain.setValueAtTime(0.08, ctx.currentTime);
        
        lfoBowl.connect(lfoBowlGain).connect(gainBowl1.gain);
        lfoBowlGain.connect(gainBowl2.gain);
        lfoBowl.start();
        activeOscillators.push(lfoBowl);
        lfoNodeRef.current = lfoBowl;
      }
      
      oscillatorsRef.current = activeOscillators;
      setAudioPlaying(true);
    } catch (e) {
      console.error("Failed to start Web Audio generator:", e);
    }
  };

  const stopManifestingMusic = () => {
    try {
      if (oscillatorsRef.current && oscillatorsRef.current.length > 0) {
        oscillatorsRef.current.forEach(osc => {
          try {
            osc.stop();
            osc.disconnect();
          } catch (err) {
            void err;
          }
        });
        oscillatorsRef.current = [];
      }
      if (lfoNodeRef.current) {
        try {
          lfoNodeRef.current.stop();
          lfoNodeRef.current.disconnect();
        } catch (err) {
          void err;
        }
        lfoNodeRef.current = null;
      }
      if (filterNodeRef.current) {
        try {
          filterNodeRef.current.disconnect();
        } catch (err) {
          void err;
        }
        filterNodeRef.current = null;
      }
      if (gainNodeRef.current) {
        try {
          gainNodeRef.current.disconnect();
        } catch (err) {
          void err;
        }
          gainNodeRef.current = null;
      }
      setAudioPlaying(false);
    } catch (e) {
      console.error("Failed to stop Web Audio generator:", e);
    }
  };

  const handleVolumeChange = (newVol) => {
    setAudioVolume(newVol);
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(newVol, audioCtxRef.current.currentTime);
    }
  };

  useEffect(() => {
    if (audioPlaying) {
      startManifestingMusic();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioMode]);

  useEffect(() => {
    return () => {
      stopManifestingMusic();
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch (err) {
          void err;
        }
      }
    };
  }, []);

  // --- HANDLERS ---
  const handleButtonMouseMove = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px) scale(1.03)`;
    btn.style.boxShadow = `0 10px 25px rgba(255, 158, 0, 0.35)`;
  };

  const handleButtonMouseLeave = (e) => {
    const btn = e.currentTarget;
    btn.style.transform = '';
    btn.style.boxShadow = '';
  };

  const handleToggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Quick logging hours
  const handleLogHours = (taskId, amount) => {
    const updated = goals.map((goal, gIdx) => {
      if (gIdx === activeGoalIndex) {
        const updatedTasks = goal.tasks.map(task => {
          if (task.id === taskId) {
            const nextHours = Math.max(0, Math.min(24, Number((task.loggedHours + amount).toFixed(2))));
            return { ...task, loggedHours: nextHours };
          }
          return task;
        });
        return { ...goal, tasks: updatedTasks };
      }
      return goal;
    });
    setGoals(updated);
    
    if (soundEnabled && amount > 0) {
      playBellSynth(659.25); // high E chord bell
    }
  };

  // Toggle milestone completion
  const handleToggleMilestone = (milestoneId) => {
    const updated = goals.map((goal, gIdx) => {
      if (gIdx === activeGoalIndex) {
        const updatedMilestones = goal.milestones.map(m => {
          if (m.id === milestoneId) {
            const nextVal = !m.completed;
            if (nextVal) triggerConfettiAnimation();
            return { ...m, completed: nextVal };
          }
          return m;
        });
        return { ...goal, milestones: updatedMilestones };
      }
      return goal;
    });
    setGoals(updated);
  };

  // Add Custom Task on the fly
  const handleAddCustomTask = (goalIndex) => {
    const taskName = prompt("Enter custom daily task name:");
    if (!taskName) return;
    const hours = parseFloat(prompt("Enter target daily hours (e.g. 2):") || "1");
    if (isNaN(hours) || hours <= 0) return;

    const newTask = {
      id: Date.now(),
      name: taskName,
      targetHours: hours,
      loggedHours: 0
    };

    const updated = goals.map((goal, gIdx) => {
      if (gIdx === goalIndex) {
        return { ...goal, tasks: [...goal.tasks, newTask] };
      }
      return goal;
    });
    setGoals(updated);
    triggerConfettiAnimation();
  };

  // Delete specific task
  const handleDeleteTask = (goalIndex, taskId) => {
    const updated = goals.map((goal, gIdx) => {
      if (gIdx === goalIndex) {
        return { ...goal, tasks: goal.tasks.filter(t => t.id !== taskId) };
      }
      return goal;
    });
    setGoals(updated);
  };

  // Create Goal Submission
  const handleCreateGoalSubmit = (e) => {
    e.preventDefault();
    if (!newGoalName.trim()) return;

    const milestonesList = inputMilestones
      .filter(m => m.trim())
      .map((m, idx) => ({ id: Date.now() + idx, name: m, completed: false }));

    const tasksList = inputTasks
      .filter(t => t.name.trim())
      .map((t, idx) => ({
        id: Date.now() + 100 + idx,
        name: t.name,
        targetHours: Number(t.targetHours) || 1,
        loggedHours: 0
      }));

    const newGoalObj = {
      name: newGoalName,
      category: newGoalCat,
      description: newGoalDesc || `Daily focus schedule for ${newGoalName}`,
      visionImage: newGoalVision || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80",
      milestones: milestonesList,
      tasks: tasksList,
      daysTotal: newGoalDays
    };

    setGoals([...goals, newGoalObj]);
    setIsCreatingGoal(false);
    // Reset inputs
    setNewGoalName('');
    setNewGoalDesc('');
    setNewGoalVision('');
    setInputMilestones(["", ""]);
    setInputTasks([{ name: "Study Routine", targetHours: 2 }]);
    
    // Switch to newly created goal
    setActiveGoalIndex(goals.length);
    triggerConfettiAnimation();
  };

  // Handle dynamic milestone addition in form
  const addMilestoneField = () => setInputMilestones([...inputMilestones, ""]);
  const addTaskField = () => setInputTasks([...inputTasks, { name: "", targetHours: 1 }]);

  // Interactive AI Coach Chat
  const handleSendCoachMsg = async (e) => {
    e.preventDefault();
    if (!coachInput.trim()) return;

    const userText = coachInput;
    setCoachLog(prev => [...prev, { sender: 'user', text: userText, time: 'Just Now' }]);
    setCoachInput('');
    setCoachThinking(true);

    // Simulate AI Coaching Response contextually
    setTimeout(() => {
      let reply = "";
      const currentGoal = goals[activeGoalIndex];
      const hoursLoggedToday = currentGoal.tasks.reduce((sum, t) => sum + t.loggedHours, 0);
      const targetHoursToday = currentGoal.tasks.reduce((sum, t) => sum + t.targetHours, 0);

      if (userText.toLowerCase().includes('placement') || userText.toLowerCase().includes('dsa')) {
        reply = `To secure your placement goal, stay consistent with DSA. You've completed ${currentGoal.tasks[0]?.loggedHours || 0} hours of DSA today. Try to keep this streak alive to unlock your 'Consistency Champion' status!`;
      } else if (userText.toLowerCase().includes('streak') || userText.toLowerCase().includes('fire')) {
        reply = `You have a robust ${streak}-day streak going! Miss today and the heat resets. Try to log at least another hour to extend it safely.`;
      } else if (hoursLoggedToday < targetHoursToday) {
        reply = `You are currently at ${hoursLoggedToday} logged hours out of your ${targetHoursToday}h daily target. Let's make an effort to hit at least 80% completion by logging another practice block!`;
      } else {
        reply = `Terrific momentum! You've crossed your target threshold of ${targetHoursToday} hours today. Celebrate this win, share your progress, and get a good night's rest!`;
      }

      setCoachLog(prev => [...prev, { sender: 'coach', text: reply, time: 'Now' }]);
      setCoachThinking(false);
      if (soundEnabled) playBellSynth(392.00); // pleasant note G4
    }, 1200);
  };

  // Current active goal calculations
  const activeGoal = goals[activeGoalIndex] || goals[0] || GOAL_TEMPLATES[0];
  
  // Calculate daily totals for active goal
  const dailyTargetTotal = activeGoal.tasks.reduce((sum, t) => sum + t.targetHours, 0);
  const dailyLoggedTotal = activeGoal.tasks.reduce((sum, t) => sum + t.loggedHours, 0);
  const dailyProgressPercent = dailyTargetTotal > 0 ? Math.round((dailyLoggedTotal / dailyTargetTotal) * 100) : 0;

  // Milestone completion percentage
  const totalMilestones = activeGoal.milestones.length;
  const completedMilestones = activeGoal.milestones.filter(m => m.completed).length;
  const milestonePercent = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;

  return (
    <>
      {/* Scroll Line Progress Indicator */}
      <div className="scroll-line-indicator" />



      {/* Confetti Container */}
      <div ref={confettiContainerRef} className="confetti-canvas-container" aria-hidden="true" />

      {/* Ambient glowing backdrops */}
      <div className="ambient-glow" style={{ top: '10%', left: '-10%', background: 'radial-gradient(circle, rgba(255, 215, 0, 0.22) 0%, transparent 70%)' }} />
      <div className="ambient-glow" style={{ top: '50%', right: '-10%', background: 'radial-gradient(circle, rgba(255, 165, 0, 0.16) 0%, transparent 70%)', animationDelay: '-3s' }} />
      <div className="ambient-glow" style={{ top: '25%', right: '20%', background: 'radial-gradient(circle, rgba(255, 235, 150, 0.26) 0%, transparent 70%)', filter: 'blur(130px)', width: '600px', height: '600px', animationDelay: '-6s' }} />
      <div className="ambient-glow" style={{ bottom: '15%', left: '10%', background: 'radial-gradient(circle, rgba(255, 200, 0, 0.26) 0%, transparent 70%)', filter: 'blur(140px)', width: '700px', height: '700px', animationDelay: '-9s' }} />

      {/* Floating Parallax Accents (Magical Sparkles/Orbs) */}
      <div 
        className="parallax-item"
        style={{
          position: 'fixed',
          top: '22%',
          left: '4%',
          transform: `translateY(calc(var(--scroll-y, 0px) * -0.15)) rotate(calc(var(--scroll-y, 0px) * 0.05deg))`,
          opacity: 0.3,
          pointerEvents: 'none',
          zIndex: 1
        }}
      >
        <svg width="44" height="44" viewBox="0 0 24 24" fill="var(--color-gold)" stroke="none">
          <path d="M12 2L13 9L20 10L13 11L12 18L11 11L4 10L11 9Z" />
        </svg>
      </div>

      <div 
        className="parallax-item"
        style={{
          position: 'fixed',
          bottom: '28%',
          right: '6%',
          transform: `translateY(calc(var(--scroll-y, 0px) * -0.2)) rotate(calc(var(--scroll-y, 0px) * -0.05deg))`,
          opacity: 0.2,
          pointerEvents: 'none',
          zIndex: 1
        }}
      >
        <svg width="34" height="34" viewBox="0 0 24 24" fill="var(--color-green)" stroke="none">
          <circle cx="12" cy="12" r="8" opacity="0.6" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      </div>

      <div 
        className="parallax-item"
        style={{
          position: 'fixed',
          top: '65%',
          left: '6%',
          transform: `translateY(calc(var(--scroll-y, 0px) * 0.1))`,
          opacity: 0.2,
          pointerEvents: 'none',
          zIndex: 1
        }}
      >
        <svg width="55" height="55" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" stroke="var(--color-gold)" strokeWidth="2" strokeDasharray="4 10" fill="none" />
        </svg>
      </div>

      {/* Header Sticky Navbar */}
      <header className="header-navbar">
        <div className="navbar-container">
          <button className="logo-link" onClick={() => setActiveTab('dashboard')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/logo-icon.png" alt="Manifestor Logo" style={{ width: '36px', height: '36px', borderRadius: '50%', filter: 'drop-shadow(0 2px 6px rgba(255, 158, 0, 0.2))' }} />
            <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: '1.3rem', letterSpacing: '-0.5px', color: 'var(--text-primary)' }}>
              MANIFESTOR
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="nav-links">
            <button className={`nav-link-btn ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
              Dashboard
            </button>
            <button className={`nav-link-btn ${activeTab === 'goals' ? 'active' : ''}`} onClick={() => setActiveTab('goals')}>
              Goals Center
            </button>
            <button className={`nav-link-btn ${activeTab === 'coach' ? 'active' : ''}`} onClick={() => setActiveTab('coach')}>
              AI Coach
            </button>
            <button className={`nav-link-btn ${activeTab === 'badges' ? 'active' : ''}`} onClick={() => setActiveTab('badges')}>
              Achievements
            </button>
          </nav>

          {/* User controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Audio Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="nav-link-btn"
              style={{ padding: '8px', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              aria-label={soundEnabled ? "Mute audio bell guidelines" : "Unmute audio bell guidelines"}
            >
              {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>

            {/* Light/Dark Toggle */}
            <button
              onClick={handleToggleTheme}
              className="nav-link-btn"
              style={{ padding: '8px', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              aria-label={theme === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content View */}
      <main className="container reveal-container" style={{ flexGrow: 1, paddingBottom: '100px', paddingTop: activeTab === 'dashboard' ? '0' : '100px' }}>
        
        {/* TAB 1: MAIN DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="fade-in">
            {/* Cinematic Hero Header */}
            <div className="reveal cinematic-hero" style={{ 
              background: 'transparent',
              padding: '160px 24px 180px 24px',
              minHeight: '100vh',
              marginBottom: '0',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              color: 'white',
              width: '100vw',
              left: '50%',
              right: '50%',
              marginLeft: '-50vw',
              marginRight: '-50vw',
              border: 'none',
              borderRadius: '0'
            }}>
              {/* Premium Cinematic Background inside Hero */}
              <div className="video-background-container">
                <div className="bg-video" aria-hidden="true"></div>
                <div className="video-overlay"></div>
              </div>

              {/* Interactive HTML5 Canvas Constellation */}
              <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2 }} />
              
              {/* Decorative Shine Overlay */}
              <div className="gold-shine" style={{ position: 'absolute', inset: 0, opacity: 0.05, pointerEvents: 'none', zIndex: 3 }} />
              
              <div style={{ position: 'relative', zIndex: 10, display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(253, 224, 71, 0.25)', borderRadius: '20px', border: '1px solid rgba(253, 224, 71, 0.4)', marginBottom: '16px', backdropFilter: 'blur(8px)' }}>
                <Sparkles size={14} style={{ color: 'var(--color-gold)' }} />
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#fff', letterSpacing: '2px', textTransform: 'uppercase' }}>Flow State Active ✨</span>
              </div>
              
              <h1 style={{ 
                position: 'relative', zIndex: 10,
                fontSize: 'clamp(3rem, 8vw, 5rem)', 
                fontWeight: 900, 
                letterSpacing: '-2px', 
                marginBottom: '20px', 
                lineHeight: 1.1,
                fontFamily: 'var(--font-accent)',
                color: '#fff',
                textShadow: '0 4px 24px rgba(0,0,0,0.6)'
              }}>
                MANIFEST YOUR DREAMS
              </h1>
              
              <p style={{ position: 'relative', zIndex: 10, maxWidth: '700px', fontSize: '1.25rem', color: '#fff', textShadow: '0 2px 12px rgba(0,0,0,0.5)', marginBottom: '36px', lineHeight: 1.6, fontWeight: 500 }}>
                A premium space designed to track your daily milestones, optimize focus blocks, and manifest your highest self. Align intention with daily performance.
              </p>
              
              <div style={{ position: 'relative', zIndex: 10, display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button 
                  className="btn-primary" 
                  onClick={() => {
                    const el = document.getElementById('workspace-panel');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  onMouseMove={handleButtonMouseMove}
                  onMouseLeave={handleButtonMouseLeave}
                >
                  Enter Workspace <ChevronRight size={18} />
                </button>
                <button 
                  className="btn-secondary" 
                  onClick={() => setIsCreatingGoal(true)}
                  onMouseMove={handleButtonMouseMove}
                  onMouseLeave={handleButtonMouseLeave}
                >
                  Create Custom Goal 🎯
                </button>
              </div>
            </div>

            {/* Sporty Instrument Cluster Row */}
            <div id="workspace-panel" className="reveal base-card scroll-tilt-card" style={{ 
              marginTop: '-120px',
              position: 'relative',
              zIndex: 20,
              marginBottom: '32px', 
              padding: '24px', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '20px',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-secondary)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="led-indicator led-sage led-pulse"></span>
                <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700, color: 'var(--color-green)' }}>
                  Growth & Journey Tracking
                </h3>
              </div>
              <div className="gauge-cluster">
                {/* Gauge 1: Daily Logged Hours vs Target */}
                <div className="gauge-item" title="Telemetry tracking daily logged focus hours vs target hours">
                  <div className="gauge-container" style={{ cursor: 'help' }}>
                    <svg className="gauge-svg" viewBox="0 0 100 100">
                      <defs>
                        <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="var(--color-green)" />
                          <stop offset="100%" stopColor="var(--color-gold)" />
                        </linearGradient>
                      </defs>
                      <circle cx="50" cy="50" r="36" className="gauge-circle-bg" />
                      <circle cx="50" cy="50" r="36" className="gauge-circle-fill" strokeDasharray={`${(Math.min(100, dailyProgressPercent) / 100) * 226.2} 226.2`} />
                    </svg>
                    <span className="gauge-text" style={{ textShadow: '0 0 8px rgba(255,195,0,0.4)' }}>{dailyProgressPercent}%</span>
                  </div>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    <span className="led-indicator led-sage led-pulse"></span>
                    Daily Target
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{dailyLoggedTotal} / {dailyTargetTotal} Hours</span>
                </div>

                {/* Gauge 2: Current Streak */}
                <div className="gauge-item" title="Consistently logged daily routine streak">
                  <div className="gauge-container" style={{ cursor: 'help' }}>
                    <svg className="gauge-svg" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="36" className="gauge-circle-bg" />
                      <circle cx="50" cy="50" r="36" className="gauge-circle-fill" strokeDasharray={`${(Math.min(streak, streakGoal) / streakGoal) * 226.2} 226.2`} />
                    </svg>
                    <span className="gauge-text" style={{ textShadow: '0 0 8px rgba(255,96,0,0.4)' }}>🔥{streak}</span>
                  </div>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    <span className="led-indicator led-orange led-pulse"></span>
                    Current Streak
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Goal: {streakGoal} Days</span>
                </div>

                {/* Gauge 3: Milestone Progress */}
                <div className="gauge-item" title="Unlocked milestones and objectives progress">
                  <div className="gauge-container" style={{ cursor: 'help' }}>
                    <svg className="gauge-svg" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="36" className="gauge-circle-bg" />
                      <circle cx="50" cy="50" r="36" className="gauge-circle-fill" strokeDasharray={`${(Math.min(100, milestonePercent) / 100) * 226.2} 226.2`} />
                    </svg>
                    <span className="gauge-text" style={{ textShadow: '0 0 8px rgba(255,195,0,0.4)' }}>{milestonePercent}%</span>
                  </div>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    <span className="led-indicator led-amber led-pulse"></span>
                    Milestones
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{completedMilestones} / {totalMilestones} Unlocked</span>
                </div>
              </div>
            </div>

            {/* Netflix-Style Desires Carousel */}
            <div style={{ marginBottom: '40px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <span className="led-indicator led-orange led-pulse"></span>
                <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700, color: 'var(--color-orange)' }}>
                  Active Desires & Manifestations
                </h3>
              </div>
              
              <div className="netflix-carousel" style={{ 
                display: 'flex', 
                gap: '20px', 
                overflowX: 'auto', 
                padding: '10px 4px 20px 4px', 
                scrollSnapType: 'x mandatory',
                cursor: 'grab'
              }}>
                {goals.map((goal, idx) => {
                  const isActive = idx === activeGoalIndex;
                  const totalGoalHours = goal.tasks.reduce((sum, t) => sum + t.targetHours, 0);
                  const loggedGoalHours = goal.tasks.reduce((sum, t) => sum + t.loggedHours, 0);
                  const goalProgress = totalGoalHours > 0 ? Math.round((loggedGoalHours / totalGoalHours) * 100) : 0;
                  
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        setActiveGoalIndex(idx);
                        if (soundEnabled) playBellSynth(523.25);
                      }}
                      className={`base-card scroll-tilt-card interactive ${isActive ? 'active-netflix-card' : ''}`}
                      style={{
                        flex: '0 0 250px',
                        height: '150px',
                        padding: 0,
                        overflow: 'hidden',
                        position: 'relative',
                        borderRadius: '16px',
                        border: isActive ? '3px solid var(--color-orange)' : '1px solid var(--border-color)',
                        transform: isActive ? 'scale(1.02)' : 'none',
                        boxShadow: isActive ? '0 12px 30px rgba(255, 96, 0, 0.22)' : 'var(--card-shadow)',
                        scrollSnapAlign: 'start',
                        transition: 'all 350ms cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    >
                      {/* Vision poster backdrop */}
                      <img 
                        src={goal.visionImage} 
                        alt="" 
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover', 
                          opacity: isActive ? 0.95 : 0.65, 
                          transition: 'opacity 350ms' 
                        }} 
                      />
                      
                      {/* Black Gradient Vignette */}
                      <div style={{ 
                        position: 'absolute', 
                        inset: 0, 
                        background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.85) 100%)',
                        zIndex: 1
                      }} />
                      
                      {/* Details overlay */}
                      <div style={{ 
                        position: 'absolute', 
                        bottom: 0, 
                        left: 0, 
                        right: 0, 
                        padding: '14px', 
                        zIndex: 2, 
                        textAlign: 'left' 
                      }}>
                        <span style={{ 
                          fontSize: '0.62rem', 
                          textTransform: 'uppercase', 
                          color: 'var(--color-gold)', 
                          fontWeight: 700, 
                          letterSpacing: '1.2px' 
                        }}>
                          {goal.category}
                        </span>
                        
                        <h4 style={{ 
                          fontSize: '0.95rem', 
                          fontWeight: 700, 
                          color: 'white', 
                          marginTop: '2px',
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap'
                        }}>
                          {goal.name}
                        </h4>
                        
                        {/* Progress meter */}
                        <div style={{ 
                          width: '100%', 
                          height: '4px', 
                          backgroundColor: 'rgba(255,255,255,0.22)', 
                          borderRadius: '2px', 
                          marginTop: '8px', 
                          overflow: 'hidden' 
                        }}>
                          <div style={{ 
                            width: `${goalProgress}%`, 
                            height: '100%', 
                            background: 'linear-gradient(90deg, var(--color-gold) 0%, var(--color-orange) 100%)' 
                          }} />
                        </div>
                      </div>
                      
                      {/* Gold shine swipe */}
                      <div className="gold-shine" style={{ position: 'absolute', inset: 0, opacity: 0.08, pointerEvents: 'none', zIndex: 3 }} />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dashboard Workspace Layout */}
            <div className="dashboard-grid">
              
              {/* Left Column: Tasks Logging center */}
              <div className="reveal scroll-tilt-card" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                
                {/* Cinematic Spotlight Banner Card (Netflix style) */}
                <div style={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '22px',
                  padding: '40px 32px',
                  color: 'white',
                  textAlign: 'left',
                  background: 'linear-gradient(135deg, rgba(27,26,24,0.96) 0%, rgba(27,26,24,0.7) 100%)',
                  border: '1px solid rgba(255,158,0,0.2)',
                  boxShadow: 'var(--card-shadow)'
                }}>
                  {/* Blurred Vision Backdrop */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${activeGoal.visionImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(25px) brightness(0.35)',
                    opacity: 0.5,
                    zIndex: 0,
                    transform: 'scale(1.15)',
                    pointerEvents: 'none'
                  }} />
                  
                  <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '580px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', background: 'rgba(255, 158, 0, 0.16)', borderRadius: '30px', border: '1px solid rgba(255, 158, 0, 0.3)', width: 'fit-content' }}>
                      <span className="led-indicator led-orange led-pulse"></span>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-gold)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                        Spotlight Focus Desire
                      </span>
                    </div>
                    
                    <h2 style={{ fontSize: 'clamp(1.4rem, 4.5vw, 2.1rem)', fontWeight: 800, color: 'white', lineHeight: 1.15, fontFamily: 'var(--font-accent)' }}>
                      {activeGoal.name}
                    </h2>
                    
                    <p style={{ fontSize: '0.98rem', color: 'rgba(255,255,255,0.76)', lineHeight: 1.45, margin: '2px 0 10px 0' }}>
                      {activeGoal.description}
                    </p>
                    
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <button 
                        className="btn-primary" 
                        style={{ padding: '8px 20px', fontSize: '0.88rem', boxShadow: 'none' }} 
                        onClick={() => handleAddCustomTask(activeGoalIndex)}
                        onMouseMove={handleButtonMouseMove}
                        onMouseLeave={handleButtonMouseLeave}
                      >
                        Add Task Slot +
                      </button>
                      <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', fontWeight: 600 }}>
                        Category: <strong style={{ color: 'var(--color-gold)' }}>{activeGoal.category.toUpperCase()}</strong>
                      </span>
                    </div>
                  </div>
                  
                  {/* Subtle technical corner marks inside spotlight card */}
                  <div style={{ position: 'absolute', top: '10px', left: '10px', width: '8px', height: '8px', borderTop: '2px solid rgba(255,158,0,0.4)', borderLeft: '2px solid rgba(255,158,0,0.4)' }} />
                  <div style={{ position: 'absolute', bottom: '10px', right: '10px', width: '8px', height: '8px', borderBottom: '2px solid rgba(255,158,0,0.4)', borderRight: '2px solid rgba(255,158,0,0.4)' }} />
                </div>

                {/* Daily hour logging list */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Clock size={20} color="var(--color-amber)" /> Daily Target Hour Logger
                    </h2>
                    <button className="nav-link-btn" onClick={() => handleAddCustomTask(activeGoalIndex)} style={{ fontSize: '0.85rem' }}>
                      + Add Task
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {activeGoal.tasks.map(task => (
                      <div
                        key={task.id}
                        className="base-card"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '16px 20px',
                          flexWrap: 'wrap',
                          gap: '16px'
                        }}
                      >
                        <div style={{ textAlign: 'left', minWidth: '150px' }}>
                          <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)' }}>
                            Slot Goal: {task.targetHours}h
                          </span>
                          <h4 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{task.name}</h4>
                          <span style={{ fontSize: '0.9rem', color: task.loggedHours >= task.targetHours ? 'var(--color-sage)' : 'var(--text-secondary)', fontWeight: 600 }}>
                            Logged: {task.loggedHours} hours
                          </span>
                        </div>

                        {/* Interactive quick logging controls */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <button
                            className="btn-secondary"
                            style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                            onClick={() => handleLogHours(task.id, -0.5)}
                          >
                            -30m
                          </button>
                          <button
                            className="btn-secondary"
                            style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                            onClick={() => handleLogHours(task.id, 0.5)}
                          >
                            +30m
                          </button>
                          <button
                            className="btn-primary"
                            style={{ padding: '6px 12px', fontSize: '0.85rem', backgroundColor: 'var(--color-sage)', color: 'white' }}
                            onClick={() => handleLogHours(task.id, 1)}
                          >
                            +1 Hour
                          </button>
                          <button
                            onClick={() => handleDeleteTask(activeGoalIndex, task.id)}
                            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)', marginLeft: '12px' }}
                            aria-label={`Delete task ${task.name}`}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SVG Visual Comparison Chart */}
                <div className="base-card scroll-tilt-card" style={{ textAlign: 'left' }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <TrendingUp size={20} color="var(--color-sage)" /> Daily Hours vs. Target Chart
                  </h3>
                  
                  {/* SVG Chart logic */}
                  <div style={{ overflowX: 'auto' }}>
                    <svg width="100%" height="200" viewBox="0 0 500 200" style={{ minWidth: '400px' }}>
                      {/* Grid Lines */}
                      <line x1="40" y1="20" x2="480" y2="20" stroke="var(--border-color)" strokeDasharray="4" />
                      <line x1="40" y1="80" x2="480" y2="80" stroke="var(--border-color)" strokeDasharray="4" />
                      <line x1="40" y1="140" x2="480" y2="140" stroke="var(--border-color)" strokeDasharray="4" />
                      <line x1="40" y1="170" x2="480" y2="170" stroke="var(--text-secondary)" />

                      {/* Render Bars for each Task */}
                      {activeGoal.tasks.map((task, idx) => {
                        const xOffset = 50 + idx * 100;
                        // Max scaling factor: 4 hours = height 120px
                        const maxVal = 4;
                        const targetHeight = Math.min(150, (task.targetHours / maxVal) * 150);
                        const loggedHeight = Math.min(150, (task.loggedHours / maxVal) * 150);

                        return (
                          <g key={task.id}>
                            {/* Target Bar (Outline / Translucent) */}
                            <rect
                              x={xOffset}
                              y={170 - targetHeight}
                              width="25"
                              height={targetHeight}
                              fill="rgba(30, 27, 75, 0.06)"
                              stroke="var(--color-indigo)"
                              strokeWidth="1.5"
                              rx="3"
                            />
                            {/* Logged Bar (Solid Gradient color) */}
                            <rect
                              x={xOffset + 8}
                              y={170 - loggedHeight}
                              width="25"
                              height={loggedHeight}
                              fill="url(#bar-grad-success)"
                              rx="3"
                            />
                            {/* Label */}
                            <text
                              x={xOffset + 16}
                              y="188"
                              textAnchor="middle"
                              fontSize="9"
                              fill="var(--text-secondary)"
                              fontWeight="600"
                            >
                              {task.name.split(' ')[0]}
                            </text>
                          </g>
                        );
                      })}

                      {/* Gradients */}
                      <defs>
                        <linearGradient id="bar-grad-success" x1="0" y1="1" x2="0" y2="0">
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="100%" stopColor="#34d399" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem', marginTop: '12px', justifyContent: 'center' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '12px', height: '12px', border: '1px solid var(--color-indigo)', backgroundColor: 'rgba(30,27,75,0.06)', borderRadius: '2px' }} />
                      Target Hours
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '12px', height: '12px', backgroundColor: '#10b981', borderRadius: '2px' }} />
                      Logged Hours
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Milestones and Vision Board */}
              <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                
                {/* Vision Board Card */}
                <div className="base-card scroll-tilt-card" style={{ padding: 0, overflow: 'hidden', textAlign: 'left' }}>
                  <img
                    src={activeGoal.visionImage}
                    alt="Vision board aspirational focus"
                    style={{ width: '100%', height: '160px', objectFit: 'cover' }}
                  />
                  <div style={{ padding: '20px' }}>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, color: 'var(--color-amber)' }}>
                      Manifestation Vision Board
                    </span>
                    <h3 style={{ fontSize: '1.25rem', marginTop: '4px', marginBottom: '8px' }}>Become That Version of Yourself</h3>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                      Focus daily on this visual desire. Complete your milestone blocks to transition into the version of yourself who has achieved it.
                    </p>
                  </div>
                </div>

                {/* 432Hz Sound Manifestation Engine Card */}
                <div className="base-card scroll-tilt-card" style={{ textAlign: 'left', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Sparkles size={20} color="var(--color-gold)" className={audioPlaying ? 'spin' : ''} /> 432Hz Focus Ambient Engine
                    </h3>
                    <span style={{ 
                      fontSize: '0.7rem', 
                      textTransform: 'uppercase', 
                      padding: '2px 8px', 
                      borderRadius: '10px', 
                      backgroundColor: audioPlaying ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255,255,255,0.08)',
                      color: audioPlaying ? 'var(--color-sage)' : 'var(--text-secondary)', 
                      fontWeight: 700 
                    }}>
                      {audioPlaying ? 'Active Signal' : 'Off-Line'}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.4 }}>
                    432Hz is the natural frequency of harmonic resonance. Listen while working to align brain waves for focus & accelerated manifestation.
                  </p>

                  {/* Audio Visualizer Simulator */}
                  <div style={{ 
                    height: '60px', 
                    backgroundColor: 'rgba(0,0,0,0.15)', 
                    borderRadius: '12px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '3px',
                    marginBottom: '20px',
                    border: '1px solid var(--border-color)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    {audioPlaying ? (
                      Array.from({ length: 28 }).map((_, i) => {
                        const delay = (i * 0.08).toFixed(2);
                        const height = Math.floor(Math.random() * 25) + 15;
                        return (
                          <div 
                            key={i} 
                            className="audio-wave-bar"
                            style={{
                              width: '3px',
                              height: `${height}px`,
                              backgroundColor: 'var(--color-gold)',
                              borderRadius: '2px',
                              animation: `soundWavePulse 1.2s ease-in-out infinite alternate`,
                              animationDelay: `${delay}s`
                            }}
                          />
                        );
                      })
                    ) : (
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>
                        Signal Stopped - Tuned to 432Hz
                      </span>
                    )}
                  </div>

                  {/* Mode Selection */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '16px' }}>
                    {[
                      { id: 'drone', label: 'Cosmic Drone', desc: 'Warm ambient harmonic drone' },
                      { id: 'binaural', label: 'Binaural Focus', desc: '10Hz Alpha focus beats' },
                      { id: 'bowls', label: 'Singing Bowls', desc: 'Resonant Tibetan bowls' }
                    ].map(mode => (
                      <button
                        key={mode.id}
                        className={`btn-secondary ${audioMode === mode.id ? 'active' : ''}`}
                        style={{ 
                          padding: '8px 4px', 
                          fontSize: '0.78rem', 
                          borderColor: audioMode === mode.id ? 'var(--color-gold)' : 'var(--border-color)',
                          backgroundColor: audioMode === mode.id ? 'rgba(255, 158, 0, 0.08)' : 'transparent',
                          color: audioMode === mode.id ? 'var(--color-gold)' : 'var(--text-primary)',
                          fontWeight: audioMode === mode.id ? 700 : 500
                        }}
                        title={mode.desc}
                        onClick={() => setAudioMode(mode.id)}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>

                  {/* Controls Slider & Play Button */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <button
                      onClick={() => {
                        if (audioPlaying) {
                          stopManifestingMusic();
                        } else {
                          startManifestingMusic();
                        }
                      }}
                      className="btn-primary"
                      style={{ 
                        padding: '10px 20px', 
                        fontSize: '0.88rem',
                        backgroundColor: audioPlaying ? 'var(--color-green)' : 'var(--color-gold)',
                        color: audioPlaying ? 'white' : '#1b1a18',
                        boxShadow: audioPlaying ? '0 4px 15px rgba(16, 185, 129, 0.3)' : '0 4px 15px rgba(255, 158, 0, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                      onMouseMove={handleButtonMouseMove}
                      onMouseLeave={handleButtonMouseLeave}
                    >
                      {audioPlaying ? <Pause size={16} /> : <Play size={16} />}
                      {audioPlaying ? 'Mute' : 'Play Ambient'}
                    </button>

                    <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <VolumeX size={16} color="var(--text-secondary)" />
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={audioVolume}
                        onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                        style={{
                          flexGrow: 1,
                          accentColor: 'var(--color-gold)',
                          height: '4px',
                          borderRadius: '2px',
                          cursor: 'pointer'
                        }}
                        aria-label="Engine volume control slider"
                      />
                      <Volume2 size={16} color="var(--text-secondary)" />
                    </div>
                  </div>
                </div>

                {/* Milestone Checklist */}
                <div className="base-card scroll-tilt-card" style={{ textAlign: 'left' }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Award size={20} color="var(--color-lavender)" /> Milestone Breakdown
                  </h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {activeGoal.milestones.map(milestone => (
                      <div
                        key={milestone.id}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '12px',
                          padding: '12px 14px',
                          backgroundColor: 'rgba(167, 139, 250, 0.04)',
                          border: '1px solid rgba(167, 139, 250, 0.1)',
                          borderRadius: '8px',
                          transition: 'all var(--transition-fast)'
                        }}
                      >
                        <input
                          type="checkbox"
                          className="habit-checkbox"
                          style={{ borderColor: 'var(--color-lavender)', marginTop: '2px' }}
                          checked={milestone.completed}
                          onChange={() => handleToggleMilestone(milestone.id)}
                          aria-label={`Toggle milestone ${milestone.name}`}
                        />
                        <div>
                          <h4 style={{
                            fontSize: '0.98rem',
                            fontWeight: 600,
                            textDecoration: milestone.completed ? 'line-through' : 'none',
                            color: milestone.completed ? 'var(--text-tertiary)' : 'var(--text-primary)'
                          }}>
                            {milestone.name}
                          </h4>
                          <span style={{ fontSize: '0.75rem', color: milestone.completed ? 'var(--color-sage)' : 'var(--text-secondary)' }}>
                            {milestone.completed ? "Unlocked ✓" : "Targeting Milestone"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: GOALS CENTER */}
        {activeTab === 'goals' && (
          <div className="fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>Your Goals Library</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Organize, view, and construct daily schedules for all your desires.</p>
              </div>
              <button className="btn-primary" onClick={() => setIsCreatingGoal(true)}>
                <Plus size={18} /> Create Custom Goal
              </button>
            </div>

            {/* List all goals */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
              {goals.map((goal, idx) => (
                <div
                  key={idx}
                  className="base-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '24px',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    textAlign: 'left'
                  }}
                >
                  <img
                    src={goal.visionImage}
                    alt=""
                    style={{ width: '120px', height: '120px', borderRadius: '8px', objectFit: 'cover' }}
                  />
                  <div style={{ flexGrow: 1, minWidth: '240px' }}>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', padding: '2px 8px', borderRadius: '10px', backgroundColor: 'rgba(245,158,11,0.1)', color: 'var(--color-amber)', fontWeight: 600 }}>
                      {goal.category}
                    </span>
                    <h3 style={{ fontSize: '1.35rem', marginTop: '6px', marginBottom: '4px' }}>{goal.name}</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>{goal.description}</p>
                    
                    <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      <span>Tasks: <strong>{goal.tasks.length} Slots</strong></span>
                      <span>Milestones: <strong>{goal.milestones.length} Blocks</strong></span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <button
                      className="btn-primary"
                      style={{ padding: '8px 16px', fontSize: '0.9rem' }}
                      onClick={() => {
                        setActiveGoalIndex(idx);
                        setActiveTab('dashboard');
                      }}
                    >
                      Track Now <ChevronRight size={16} />
                    </button>
                    <button
                      className="btn-secondary"
                      style={{ padding: '8px 16px', fontSize: '0.9rem', color: 'red', borderColor: 'rgba(255,0,0,0.15)' }}
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete goal: "${goal.name}"?`)) {
                          setGoals(goals.filter((_, gIdx) => gIdx !== idx));
                          if (activeGoalIndex >= goals.length - 1) {
                            setActiveGoalIndex(Math.max(0, goals.length - 2));
                          }
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* CREATE GOAL MODAL FORM OVERLAY */}
            {isCreatingGoal && (
              <div className="modal-overlay">
                <div className="modal-card" style={{ maxWidth: '600px', textAlign: 'left', maxHeight: '90vh', overflowY: 'auto' }}>
                  <button className="modal-close-btn" onClick={() => setIsCreatingGoal(false)} aria-label="Close form">
                    <X size={18} />
                  </button>

                  <h2 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>Create New Manifestation Goal</h2>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                    Design a custom framework, select category parameters, and split goals into daily task hours.
                  </p>

                  <form onSubmit={handleCreateGoalSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                        Goal Target Name
                      </label>
                      <input
                        type="text"
                        className="text-input"
                        placeholder="e.g. Pass System Design & DSA Interviews"
                        value={newGoalName}
                        onChange={(e) => setNewGoalName(e.target.value)}
                        required
                        aria-label="New goal target name"
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                          Category
                        </label>
                        <select
                          className="text-input"
                          value={newGoalCat}
                          onChange={(e) => setNewGoalCat(e.target.value)}
                          aria-label="New goal category"
                        >
                          <option value="career">💼 Career Development</option>
                          <option value="learning">📚 Knowledge & Learning</option>
                          <option value="fitness">💪 Fitness & Body</option>
                          <option value="lifestyle">🧘 Mindset & Routine</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                          Timeline Days Target
                        </label>
                        <input
                          type="number"
                          className="text-input"
                          min="1"
                          max="365"
                          value={newGoalDays}
                          onChange={(e) => setNewGoalDays(Number(e.target.value))}
                          aria-label="New goal days timeline target"
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                        Short Description
                      </label>
                      <textarea
                        className="text-input"
                        style={{ minHeight: '60px' }}
                        placeholder="Brief summary of motivation..."
                        value={newGoalDesc}
                        onChange={(e) => setNewGoalDesc(e.target.value)}
                        aria-label="New goal short description"
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                        Vision Board Image URL (Optional)
                      </label>
                      <input
                        type="text"
                        className="text-input"
                        placeholder="https://example.com/image.jpg"
                        value={newGoalVision}
                        onChange={(e) => setNewGoalVision(e.target.value)}
                        aria-label="New goal vision image URL"
                      />
                    </div>

                    {/* Milestones dynamic creation fields */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>
                          Target Milestones List
                        </label>
                        <button type="button" className="nav-link-btn" onClick={addMilestoneField} style={{ fontSize: '0.75rem', padding: '2px 8px' }}>
                          + Add Milestone
                        </button>
                      </div>
                      {inputMilestones.map((m, idx) => (
                        <input
                          key={idx}
                          type="text"
                          className="text-input"
                          style={{ marginBottom: '8px' }}
                          placeholder={`Milestone #${idx + 1} description`}
                          value={m}
                          onChange={(e) => {
                            const updated = [...inputMilestones];
                            updated[idx] = e.target.value;
                            setInputMilestones(updated);
                          }}
                          aria-label={`Milestone #${idx + 1} input`}
                        />
                      ))}
                    </div>

                    {/* Daily tasks target hours fields */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>
                          Daily Schedule Tasks
                        </label>
                        <button type="button" className="nav-link-btn" onClick={addTaskField} style={{ fontSize: '0.75rem', padding: '2px 8px' }}>
                          + Add Task Slot
                        </button>
                      </div>
                      {inputTasks.map((t, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                          <input
                            type="text"
                            className="text-input"
                            style={{ flexGrow: 1 }}
                            placeholder={`e.g. Study DSA Algorithms`}
                            value={t.name}
                            onChange={(e) => {
                              const updated = [...inputTasks];
                              updated[idx].name = e.target.value;
                              setInputTasks(updated);
                            }}
                            aria-label={`Task name #${idx + 1}`}
                          />
                          <input
                            type="number"
                            className="text-input"
                            style={{ width: '90px' }}
                            min="0.5"
                            max="24"
                            step="0.5"
                            value={t.targetHours}
                            onChange={(e) => {
                              const updated = [...inputTasks];
                              updated[idx].targetHours = Number(e.target.value);
                              setInputTasks(updated);
                            }}
                            aria-label={`Task hours #${idx + 1}`}
                          />
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
                      <button type="button" className="btn-secondary" onClick={() => setIsCreatingGoal(false)}>
                        Cancel
                      </button>
                      <button type="submit" className="btn-primary" style={{ backgroundColor: 'var(--color-sage)', color: 'white' }}>
                        Start Manifestation Goal
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: AI COACH PANEL */}
        {activeTab === 'coach' && (
          <div className="fade-in" style={{ maxWidth: '700px', margin: '0 auto' }}>
            <div className="base-card" style={{ padding: '32px 24px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-indigo)'
                  }}
                >
                  <Briefcase size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.35rem' }}>AI Manifestor Coach</h2>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Claude-powered habits analyzer and productivity recommendations engine</p>
                </div>
              </div>

              {/* Chat log dialogue rendering */}
              <div
                style={{
                  height: '320px',
                  overflowY: 'auto',
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  padding: '20px',
                  backgroundColor: 'rgba(30, 27, 75, 0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  marginBottom: '20px'
                }}
              >
                {coachLog.map((msg, idx) => (
                  <div
                    key={idx}
                    style={{
                      alignSelf: msg.sender === 'coach' ? 'flex-start' : 'flex-end',
                      maxWidth: '85%',
                      backgroundColor: msg.sender === 'coach' ? 'var(--bg-secondary)' : 'var(--color-indigo)',
                      color: msg.sender === 'coach' ? 'var(--text-primary)' : 'white',
                      padding: '12px 16px',
                      borderRadius: msg.sender === 'coach' ? '12px 12px 12px 0' : '12px 12px 0 12px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
                      border: msg.sender === 'coach' ? '1px solid var(--border-color)' : 'none'
                    }}
                  >
                    <p style={{ fontSize: '0.95rem', lineHeight: 1.5 }}>{msg.text}</p>
                    <span style={{ fontSize: '0.72rem', opacity: 0.6, display: 'block', marginTop: '4px', textAlign: 'right' }}>
                      {msg.time}
                    </span>
                  </div>
                ))}
                
                {coachThinking && (
                  <div style={{ alignSelf: 'flex-start', padding: '12px 16px', backgroundColor: 'var(--bg-secondary)', borderRadius: '12px 12px 12px 0', border: '1px solid var(--border-color)' }}>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }} className="pulse">Coach is thinking...</span>
                  </div>
                )}
              </div>

              {/* Chat Form submission */}
              <form onSubmit={handleSendCoachMsg} style={{ display: 'flex', gap: '12px' }}>
                <input
                  type="text"
                  className="text-input"
                  style={{ flexGrow: 1 }}
                  placeholder="Ask about placement metrics, streaks advice, or habits recovery..."
                  value={coachInput}
                  onChange={(e) => setCoachInput(e.target.value)}
                  aria-label="Coach chat message input"
                />
                <button type="submit" className="btn-primary" style={{ backgroundColor: 'var(--color-indigo)', color: 'white' }}>
                  Send Msg
                </button>
              </form>

              {/* Example questions widgets */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '16px' }}>
                <button
                  type="button"
                  className="nav-link-btn"
                  style={{ fontSize: '0.8rem' }}
                  onClick={() => setCoachInput("How is my 27-day streak doing?")}
                >
                  Analyze current streak 🔥
                </button>
                <button
                  type="button"
                  className="nav-link-btn"
                  style={{ fontSize: '0.8rem' }}
                  onClick={() => setCoachInput("Give me DSA placement schedule tips.")}
                >
                  DSA placement tips 💼
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ACHIEVEMENTS CENTER */}
        {activeTab === 'badges' && (
          <div className="fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'left', marginBottom: '24px' }}>
              <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>Legendary Status Achievements</h1>
              <p style={{ color: 'var(--text-secondary)' }}>Log daily slots and unlock custom badges for your consistency profile.</p>
            </div>

            {/* Grid display of achievements */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              
              {/* Badge 1: 7-Day streak */}
              <div
                className="base-card reveal"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '24px',
                  opacity: streak >= 7 ? 1 : 0.45
                }}
              >
                <div
                  className={streak >= 7 ? "float" : ""}
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-amber)',
                    marginBottom: '16px'
                  }}
                >
                  <Flame size={36} fill={streak >= 7 ? "var(--color-amber)" : "none"} />
                </div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>7-Day Streak Badge</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                  Complete daily tasks consecutively for 7 days.
                </p>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: streak >= 7 ? 'var(--color-sage)' : 'var(--text-tertiary)', marginTop: '8px' }}>
                  {streak >= 7 ? "Unlocked ✓" : "Locked"}
                </span>
              </div>

              {/* Badge 2: 30-Day streak */}
              <div
                className="base-card reveal delay-100"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '24px',
                  opacity: streak >= 30 ? 1 : 0.45
                }}
              >
                <div
                  className={streak >= 30 ? "float" : ""}
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-sage)',
                    marginBottom: '16px'
                  }}
                >
                  <Trophy size={36} />
                </div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>Consistency King</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                  Maintain a streak of 30 days to build solid routine patterns.
                </p>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: streak >= 30 ? 'var(--color-sage)' : 'var(--text-tertiary)', marginTop: '8px' }}>
                  {streak >= 30 ? "Unlocked ✓" : "Locked"}
                </span>
              </div>

              {/* Badge 3: Perfect Day completion */}
              <div
                className="base-card reveal delay-200"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '24px',
                  opacity: dailyProgressPercent >= 100 ? 1 : 0.45
                }}
              >
                <div
                  className={dailyProgressPercent >= 100 ? "float" : ""}
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(6, 182, 212, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#06b6d4',
                    marginBottom: '16px'
                  }}
                >
                  <Zap size={36} fill={dailyProgressPercent >= 100 ? "#06b6d4" : "none"} />
                </div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>Daily Perfect Badge</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                  Log 100% of assigned daily task hours today.
                </p>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: dailyProgressPercent >= 100 ? 'var(--color-sage)' : 'var(--text-tertiary)', marginTop: '8px' }}>
                  {dailyProgressPercent >= 100 ? "Unlocked ✓" : "Locked"}
                </span>
              </div>

              {/* Badge 4: Milestone Victory */}
              <div
                className="base-card reveal delay-300"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '24px',
                  opacity: completedMilestones >= 1 ? 1 : 0.45
                }}
              >
                <div
                  className={completedMilestones >= 1 ? "float" : ""}
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-lavender)',
                    marginBottom: '16px'
                  }}
                >
                  <Award size={36} />
                </div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>First Victory Milestone</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                  Complete milestone #1 on your active path.
                </p>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: completedMilestones >= 1 ? 'var(--color-sage)' : 'var(--text-tertiary)', marginTop: '8px' }}>
                  {completedMilestones >= 1 ? "Unlocked ✓" : "Locked"}
                </span>
              </div>

            </div>
          </div>
        )}
      </main>

      {/* Navigation Mobile Bottom Navbar */}
      <footer className="mobile-bottom-nav">
        <button className={`mobile-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
          <Compass size={20} />
          <span>Home</span>
        </button>
        <button className={`mobile-nav-item ${activeTab === 'goals' ? 'active' : ''}`} onClick={() => setActiveTab('goals')}>
          <Trophy size={20} style={{ color: 'var(--color-amber)' }} />
          <span>Goals</span>
        </button>
        <button className={`mobile-nav-item ${activeTab === 'coach' ? 'active' : ''}`} onClick={() => setActiveTab('coach')}>
          <Briefcase size={20} style={{ color: 'var(--color-indigo)' }} />
          <span>AI Coach</span>
        </button>
        <button className={`mobile-nav-item ${activeTab === 'badges' ? 'active' : ''}`} onClick={() => setActiveTab('badges')}>
          <Award size={20} style={{ color: 'var(--color-lavender)' }} />
          <span>Badges</span>
        </button>
      </footer>
    </>
  );
}

export default App;
