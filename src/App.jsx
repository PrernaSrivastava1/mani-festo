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
// Preset Templates matching PRD
const GOAL_TEMPLATES = [
  {
    name: "Get Placement Ready",
    category: "career",
    description: "Prepare core skills for top tier product company placements in 90 days.",
    visionImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80",
    isActive: true,
    frequency: "432",
    activeTechniques: ["music", "affirmation", "scripting"],
    affirmations: [
      "I attract top-tier placement offers.",
      "My mind is highly logical, calm, and focused.",
      "I solve complex engineering challenges with ease.",
      "Every coding problem makes me a stronger engineer."
    ],
    scriptingLetters: [],
    drawingData: "",
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
    isActive: true,
    frequency: "528",
    activeTechniques: ["music", "water", "affirmation"],
    affirmations: [
      "My body is a temple of strength and healing.",
      "I feed my muscles clean macros and fuel.",
      "I hit my weight gain and fitness milestones easily.",
      "I grow stronger and more energetic every day."
    ],
    scriptingLetters: [],
    drawingData: "",
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
    isActive: true,
    frequency: "432",
    activeTechniques: ["hooponopono", "music", "scripting"],
    affirmations: [
      "I release all negative attachments and emotions.",
      "I choose confidence over fear, and focus over clutter.",
      "I am grounded, resilient, and at peace.",
      "My inner calm is my ultimate strength."
    ],
    scriptingLetters: [],
    drawingData: "",
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
    isActive: true,
    frequency: "888",
    activeTechniques: ["hooponopono", "music", "affirmation"],
    affirmations: [
      "I am connected to the source of divine peace.",
      "I receive guidance and clarity in all my endeavors.",
      "I walk in faith, trust, and absolute abundance.",
      "I cleanse my spirit and invite light."
    ],
    scriptingLetters: [],
    drawingData: "",
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
    isActive: true,
    frequency: "888",
    activeTechniques: ["music", "affirmation", "water", "drawing"],
    affirmations: [
      "I attract divine alignment and abundance.",
      "My dream company values my unique contributions.",
      "I am secure, wealthy, and fulfilled in my career.",
      "My goals are manifesting in perfect divine timing."
    ],
    scriptingLetters: [],
    drawingData: "",
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
    isActive: true,
    frequency: "432",
    activeTechniques: ["music", "affirmation", "scripting", "drawing", "hooponopono", "water"],
    affirmations: [
      "I am upgrading every aspect of my life simultaneously.",
      "My mind, body, and career are in perfect alignment.",
      "I am active, intentional, and fully awake.",
      "I manifest my dreams through focused daily action."
    ],
    scriptingLetters: [],
    drawingData: "",
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
  const [mousePos, setMousePos] = useState({ x: -400, y: -400 });

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleGlobalMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);

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
  const [showTour, setShowTour] = useState(() => {
    return !localStorage.getItem('manifestor_tour_completed');
  });
  const [tourStep, setTourStep] = useState(0);

  // --- GUIDED DAILY SESSION STATE ---
  const [isGuidedSessionActive, setIsGuidedSessionActive] = useState(false);
  const [guidedStepIndex, setGuidedStepIndex] = useState(0);
  const [guidedGoalIndex, setGuidedGoalIndex] = useState(0);
  const [guidedCalibrationTime, setGuidedCalibrationTime] = useState(15);
  const [guidedBreathingTime, setGuidedBreathingTime] = useState(16);
  const [guidedBreathingPhase, setGuidedBreathingPhase] = useState('Inhale');
  const [guidedWaterPhase, setGuidedWaterPhase] = useState('idle');
  const [guidedWaterTime, setGuidedWaterTime] = useState(15);
  const [guidedAffTime, setGuidedAffTime] = useState(10);

  const getGuidedSteps = (goal) => {
    if (!goal) return [];
    const steps = [
      { key: 'intro', label: 'Mind Calibration', icon: '🪐' },
      { key: 'breathing', label: 'Box Breathing', icon: '💨' },
      { key: 'affirmations', label: 'Subconscious Loops', icon: '⚡' }
    ];
    
    const techs = goal.activeTechniques || [];
    if (techs.includes('water')) {
      steps.push({ key: 'water', label: 'Water Charger', icon: '💧' });
    }
    if (techs.includes('hooponopono')) {
      steps.push({ key: 'hooponopono', label: 'Ho\'oponopono Cleansing', icon: '💖' });
    }
    if (techs.includes('scripting')) {
      steps.push({ key: 'scripting', label: 'Future-Self Scripting', icon: '📜' });
    }
    if (techs.includes('drawing')) {
      steps.push({ key: 'drawing', label: 'Vision Canvas', icon: '🎨' });
    }
    
    steps.push({ key: 'tasks', label: 'Log Daily Schedule', icon: '📅' });
    steps.push({ key: 'complete', label: 'Alignment Complete', icon: '✨' });
    
    return steps;
  };

  const advanceGuidedStep = () => {
    const steps = getGuidedSteps(goals[guidedGoalIndex]);
    if (guidedStepIndex < steps.length - 1) {
      const nextIdx = guidedStepIndex + 1;
      setGuidedStepIndex(nextIdx);
      
      const nextStep = steps[nextIdx];
      if (nextStep.key === 'intro') {
        setGuidedCalibrationTime(15);
      } else if (nextStep.key === 'breathing') {
        setGuidedBreathingTime(16);
        setGuidedBreathingPhase('Inhale');
      } else if (nextStep.key === 'affirmations') {
        setGuidedAffTime(10);
      } else if (nextStep.key === 'water') {
        setGuidedWaterPhase('idle');
        setGuidedWaterTime(15);
      } else if (nextStep.key === 'complete') {
        triggerConfettiAnimation();
        setStreak(prev => prev + 1);
      }
    }
  };

  const startGuidedWaterCharging = () => {
    if (guidedWaterPhase !== 'idle') return;
    setGuidedWaterPhase('charging');
    setGuidedWaterTime(15);
    
    if (soundEnabled) {
      const currentGoal = goals[guidedGoalIndex];
      const targetFreq = Number(currentGoal.frequency) || 432;
      playBellSynth(targetFreq);
    }
    
    const interval = setInterval(() => {
      setGuidedWaterTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setGuidedWaterPhase('charged');
          triggerConfettiAnimation();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const TOUR_STEPS = [
    {
      title: "Welcome to Manifestor 🌟",
      text: "A premium dashboard to align daily performance with manifestation intentions. Let's take a quick 1-minute step-by-step tour.",
      tab: "dashboard"
    },
    {
      title: "1. Concurrent Daily Tracking 📊",
      text: "Instead of tracking a single goal, you can now log focus hours across ALL goals concurrently! Grouped scheduler logs keep you focused.",
      tab: "dashboard"
    },
    {
      title: "2. Customizable Goals Center 🎯",
      text: "Build custom frameworks. Select specific frequencies (432Hz focus, 528Hz healing, 888Hz abundance) and checklists of manifestation techniques.",
      tab: "goals"
    },
    {
      title: "3. Sound Engine Frequency Tuning 🪐",
      text: "In the Manifest Space, the acoustic generators dynamically tune to your active goal's frequency. Play droning waves, binaural Alpha, or Tibetan bowls.",
      tab: "manifest",
      techTab: "music"
    },
    {
      title: "4. Intention Technique Chambers ⚡",
      text: "Execute custom chambers built for your goal: Charge water acoustically, chant Ho'oponopono mantras, write scripting letters, or draw visual boards.",
      tab: "manifest",
      techTab: "water"
    },
    {
      title: "5. AI Coaches & Badges Profile 🧠",
      text: "Chat with the Coach to analyze streaks and routines, and celebrate milestones by unlocking consistency status achievements.",
      tab: "coach"
    }
  ];

  const [activeGoalIndex, setActiveGoalIndex] = useState(0);
  const [activeTechniqueTab, setActiveTechniqueTab] = useState('music');
  const [chartView, setChartView] = useState('weekly');
  const [hoveredPoint, setHoveredPoint] = useState(null);

  useEffect(() => {
    const currentGoal = goals[activeGoalIndex] || goals[0];
    if (currentGoal) {
      const techniques = currentGoal.activeTechniques || ['music', 'affirmation'];
      if (techniques.length > 0) {
        if (!techniques.includes(activeTechniqueTab)) {
          setActiveTechniqueTab(techniques[0]);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeGoalIndex, goals]);

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
  const [newGoalFreq, setNewGoalFreq] = useState('432');
  const [newGoalTechniques, setNewGoalTechniques] = useState(['music', 'affirmation']);
  const [newGoalAffsText, setNewGoalAffsText] = useState('');

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

  // --- SOUNDSCAPES MIXER STATE & REFS ---
  const [soundscapeRain, setSoundscapeRain] = useState(false);
  const [soundscapeBell, setSoundscapeBell] = useState(false);
  const [soundscapeBirds, setSoundscapeBirds] = useState(false);
  const [soundscapeNight, setSoundscapeNight] = useState(false);

  const rainSourceNodeRef = useRef(null);
  const rainGainNodeRef = useRef(null);
  const bellIntervalRef = useRef(null);
  const birdsIntervalRef = useRef(null);
  const nightIntervalRef = useRef(null);

  // --- WATER CHARGING STATE ---
  const [waterPhase, setWaterPhase] = useState('idle'); // idle, charging, charged
  const [waterTimer, setWaterTimer] = useState(15);
  const waterIntervalRef = useRef(null);

  // --- HOOPONOPONO STATE ---
  const [hoopIndex, setHoopIndex] = useState(0);

  // --- FUTURE SELF SCRIPTING STATE ---
  const [scriptingText, setScriptingText] = useState('');

  // --- DRAWING CANVAS STATE ---
  const drawingCanvasRef = useRef(null);
  const guidedDrawingCanvasRef = useRef(null);
  const [brushColor, setBrushColor] = useState('#fde047');
  const [brushSize, setBrushSize] = useState(4);
  const isDrawing = useRef(false);

  const handleCanvasMouseDown = (e) => {
    const canvas = isGuidedSessionActive ? guidedDrawingCanvasRef.current : drawingCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    isDrawing.current = true;
  };

  const handleCanvasMouseMove = (e) => {
    if (!isDrawing.current) return;
    const canvas = isGuidedSessionActive ? guidedDrawingCanvasRef.current : drawingCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  };

  const handleCanvasMouseUp = () => {
    isDrawing.current = false;
  };

  const handleCanvasTouchStart = (e) => {
    if (e.touches.length === 0) return;
    const touch = e.touches[0];
    const canvas = isGuidedSessionActive ? guidedDrawingCanvasRef.current : drawingCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
    isDrawing.current = true;
  };

  const handleCanvasTouchMove = (e) => {
    if (!isDrawing.current || e.touches.length === 0) return;
    const touch = e.touches[0];
    const canvas = isGuidedSessionActive ? guidedDrawingCanvasRef.current : drawingCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  };

  const handleClearCanvas = () => {
    const canvas = isGuidedSessionActive ? guidedDrawingCanvasRef.current : drawingCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSaveCanvas = () => {
    const canvas = isGuidedSessionActive ? guidedDrawingCanvasRef.current : drawingCanvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL();
    const targetIdx = isGuidedSessionActive ? guidedGoalIndex : activeGoalIndex;
    const updated = goals.map((goal, gIdx) => {
      if (gIdx === targetIdx) {
        return { ...goal, drawingData: dataUrl };
      }
      return goal;
    });
    setGoals(updated);
    triggerConfettiAnimation();
  };

  const handleSaveScriptingLetter = () => {
    if (!scriptingText.trim()) return;
    const newLetter = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      text: scriptingText
    };
    const updated = goals.map((goal, gIdx) => {
      if (gIdx === activeGoalIndex) {
        return { ...goal, scriptingLetters: [newLetter, ...(goal.scriptingLetters || [])] };
      }
      return goal;
    });
    setGoals(updated);
    setScriptingText('');
    triggerConfettiAnimation();
  };

  const startWaterCharging = () => {
    if (waterPhase !== 'idle') return;
    setWaterPhase('charging');
    setWaterTimer(15);
    
    if (soundEnabled) {
      const currentGoal = goals[activeGoalIndex] || goals[0] || GOAL_TEMPLATES[0];
      const targetFreq = Number(currentGoal.frequency) || 432;
      playBellSynth(targetFreq);
    }
    
    waterIntervalRef.current = setInterval(() => {
      setWaterTimer((prev) => {
        if (prev <= 1) {
          clearInterval(waterIntervalRef.current);
          waterIntervalRef.current = null;
          setWaterPhase('charged');
          triggerConfettiAnimation();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // --- AFFIRMATIONS & SUBLIMINALS STATE ---
  const [affirmationCategory, setAffirmationCategory] = useState('career');
  const [affirmationsList, setAffirmationsList] = useState([
    "I am highly competent, focused, and ready for any challenge.",
    "My code is elegant, bug-free, and highly performant.",
    "I am securing placement at my dream technology company.",
    "Each coding problem I solve makes me a stronger developer."
  ]);
  const [customAffirmation, setCustomAffirmation] = useState('');
  const [affirmationPlaying, setAffirmationPlaying] = useState(false);
  const [activeAffirmationIdx, setActiveAffirmationIdx] = useState(0);
  const [subliminalActive, setSubliminalActive] = useState(false);
  const [whisperActive, setWhisperActive] = useState(false);

  // --- COHERENCE BREATHING STATE ---
  const [breathingPhase, setBreathingPhase] = useState('Inhale'); // Inhale, Hold, Exhale, Hold
  const [breathingCounter, setBreathingCounter] = useState(4);

  const PRESET_AFFIRMATIONS = {
    abundance: [
      "I attract limitless wealth and career prosperity.",
      "Every day, in every way, I am growing more abundant.",
      "My mind is aligned with the frequency of success.",
      "Opportunities flow into my life effortlessly."
    ],
    career: [
      "I am highly competent, focused, and ready for any challenge.",
      "My code is elegant, bug-free, and highly performant.",
      "I am securing placement at my dream technology company.",
      "Each coding problem I solve makes me a stronger developer."
    ],
    fitness: [
      "My body is strong, resilient, and full of vitality.",
      "I hit my daily health and physical objectives consistently.",
      "I nourish my body with clean inputs and rest.",
      "Every workout builds the best version of myself."
    ],
    mindset: [
      "I am calm, centered, and completely at peace.",
      "I choose confidence over fear, and focus over distraction.",
      "I control my response to external situations.",
      "I am growing stronger, wiser, and more mindful every day."
    ]
  };

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

  // Floating Canvas 3D Constellation & Sacred Merkaba Crystal Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // 3D Particles
    const particles = [];
    const particleCount = 40;
    const d = 320; // Perspective focal length

    class Particle3D {
      constructor() {
        this.x = (Math.random() - 0.5) * width * 1.5;
        this.y = (Math.random() - 0.5) * height * 1.5;
        this.z = (Math.random() - 0.5) * 400;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.vz = (Math.random() - 0.5) * 0.3;
        this.baseRadius = Math.random() * 2 + 1.2;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.z += this.vz;

        // Wrap boundaries
        if (Math.abs(this.x) > width) this.vx *= -1;
        if (Math.abs(this.y) > height) this.vy *= -1;
        if (Math.abs(this.z) > 300) this.vz *= -1;
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle3D());
    }

    // Sacred Merkaba Star Tetrahedron Vertices (8 vertices)
    const crystalVertices = [
      { x: 1, y: 1, z: 1 },
      { x: 1, y: -1, z: -1 },
      { x: -1, y: 1, z: -1 },
      { x: -1, y: -1, z: 1 },
      { x: -1, y: -1, z: -1 },
      { x: -1, y: 1, z: 1 },
      { x: 1, y: -1, z: 1 },
      { x: 1, y: 1, z: -1 }
    ];

    // Merkaba Wireframe Edges
    const crystalEdges = [
      [0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3], // Tetrahedron 1
      [4, 5], [4, 6], [4, 7], [5, 6], [5, 7], [6, 7]  // Tetrahedron 2
    ];

    // Interaction Parameters
    let rx = 0;
    let ry = 0;
    let rz = 0;
    let scrollSpeed = 0;
    let lastScrollY = window.scrollY;
    let mouseX = 0, mouseY = 0;
    let targetMouseX = 0, targetMouseY = 0;

    const handleScroll = () => {
      const current = window.scrollY;
      scrollSpeed += Math.abs(current - lastScrollY) * 0.08;
      lastScrollY = current;
    };

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX - window.innerWidth / 2) * 0.0015;
      targetMouseY = (e.clientY - window.innerHeight / 2) * 0.0015;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Decay scroll multiplier & interpolate mouse offset
      scrollSpeed *= 0.94;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Update rotation angles
      rx += 0.003 + scrollSpeed * 0.04 + mouseY * 0.02;
      ry += 0.005 + scrollSpeed * 0.03 + mouseX * 0.02;
      rz += 0.002;

      // 1. Draw 3D Space Particles
      particles.forEach(p => {
        p.update();

        // 3D rotation of background particles
        const cosY = Math.cos(ry * 0.2);
        const sinY = Math.sin(ry * 0.2);

        const rotX = p.x * cosY - p.z * sinY;
        const rotZ = p.x * sinY + p.z * cosY;

        const scaleVal = d / (d + rotZ);
        const screenX = rotX * scaleVal + cx;
        const screenY = p.y * scaleVal + cy;

        if (screenX >= 0 && screenX <= width && screenY >= 0 && screenY <= height) {
          const depthRadius = p.baseRadius * scaleVal;
          const depthOpacity = Math.max(0.1, Math.min(0.8, scaleVal * 0.6));

          ctx.beginPath();
          ctx.arc(screenX, screenY, depthRadius, 0, Math.PI * 2);
          ctx.fillStyle = theme === 'light' 
            ? `rgba(180, 83, 9, ${depthOpacity})`
            : `rgba(253, 224, 71, ${depthOpacity})`;
          ctx.fill();
        }
      });

      // 1.5. Project & Draw 3D Cyber Energy Grid Ground Plane (Cyber Meadow)
      const gridY = 140; // Plane vertical placement
      const colCount = 14;
      const rowCount = 14;
      const colSpacing = 80;
      const rowSpacing = 40;
      
      // Calculate dynamic scrolling offset and time-based wave offset
      const time = Date.now() * 0.001;
      const gridZOffset = ((Date.now() * 0.02) % rowSpacing) + (window.scrollY * 0.35) % rowSpacing;

      // Render grid lines
      ctx.save();
      ctx.strokeStyle = theme === 'light' ? 'rgba(180, 83, 9, 0.06)' : 'rgba(253, 224, 71, 0.05)';
      ctx.lineWidth = 0.8;

      // Create a grid of points
      const gridPoints = [];
      for (let r = 0; r < rowCount; r++) {
        gridPoints[r] = [];
        const z = 50 + r * rowSpacing - gridZOffset;
        for (let c = 0; c < colCount; c++) {
          const x = (c - colCount / 2) * colSpacing;
          
          // Apply a gentle flowing energy wave deformation on height
          const distFromCenter = Math.abs(c - colCount / 2);
          const waveHeight = Math.sin(c * 0.4 + time) * Math.cos(r * 0.3) * (20 - distFromCenter * 1.5);
          
          const scaleVal = d / (d + z);
          gridPoints[r][c] = {
            x: x * scaleVal + cx,
            y: (gridY + waveHeight) * scaleVal + cy + 80,
            scale: scaleVal
          };
        }
      }

      // Draw longitudinal grid lines (back to front)
      for (let c = 0; c < colCount; c++) {
        ctx.beginPath();
        ctx.moveTo(gridPoints[0][c].x, gridPoints[0][c].y);
        for (let r = 1; r < rowCount; r++) {
          ctx.lineTo(gridPoints[r][c].x, gridPoints[r][c].y);
        }
        ctx.stroke();
      }

      // Draw latitudinal grid lines (left to right)
      for (let r = 0; r < rowCount; r++) {
        ctx.beginPath();
        ctx.moveTo(gridPoints[r][0].x, gridPoints[r][0].y);
        for (let c = 1; c < colCount; c++) {
          ctx.lineTo(gridPoints[r][c].x, gridPoints[r][c].y);
        }
        ctx.stroke();
      }
      ctx.restore();

      // 2. Draw connections for close particles in 3D Space
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dz = particles[i].z - particles[j].z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < 130) {
            const cosY = Math.cos(ry * 0.2);
            const sinY = Math.sin(ry * 0.2);

            const rotX1 = particles[i].x * cosY - particles[i].z * sinY;
            const rotZ1 = particles[i].x * sinY + particles[i].z * cosY;
            const rotX2 = particles[j].x * cosY - particles[j].z * sinY;
            const rotZ2 = particles[j].x * sinY + particles[j].z * cosY;

            const scale1 = d / (d + rotZ1);
            const scale2 = d / (d + rotZ2);

            const x1 = rotX1 * scale1 + cx;
            const y1 = particles[i].y * scale1 + cy;
            const x2 = rotX2 * scale2 + cx;
            const y2 = particles[j].y * scale2 + cy;

            if (x1 >= 0 && x1 <= width && y1 >= 0 && y1 <= height && x2 >= 0 && x2 <= width && y2 >= 0 && y2 <= height) {
              const opacity = (1 - dist / 130) * 0.15;
              ctx.beginPath();
              ctx.moveTo(x1, y1);
              ctx.lineTo(x2, y2);
              ctx.strokeStyle = theme === 'light'
                ? `rgba(180, 83, 9, ${opacity})`
                : `rgba(253, 224, 71, ${opacity})`;
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }
        }
      }

      // 3. Project & Draw Rotating 3D Sacred Merkaba Crystal
      const crystalScale = Math.min(width, height) * 0.14 + 10;
      const projected = crystalVertices.map(v => {
        // Rotate X
        const cosX = Math.cos(rx);
        const sinX = Math.sin(rx);
        const y1 = v.y * cosX - v.z * sinX;
        const z1 = v.y * sinX + v.z * cosX;

        // Rotate Y
        const cosY = Math.cos(ry);
        const sinY = Math.sin(ry);
        const x2 = v.x * cosY + z1 * sinY;
        const z2 = -v.x * sinY + z1 * cosY;

        // Rotate Z
        const cosZ = Math.cos(rz);
        const sinZ = Math.sin(rz);
        const x3 = x2 * cosZ - y1 * sinZ;
        const y3 = x2 * sinZ + y1 * cosZ;

        // Project
        const scaleVal = d / (d + z2);
        return {
          x: x3 * crystalScale * scaleVal + cx,
          y: y3 * crystalScale * scaleVal + cy,
          z: z2
        };
      });

      // Draw Edges with glowing shadow filter
      ctx.save();
      ctx.shadowBlur = 18;
      ctx.shadowColor = theme === 'light' ? 'rgba(180, 83, 9, 0.65)' : 'rgba(253, 224, 71, 0.7)';

      crystalEdges.forEach(([p1, p2]) => {
        const pt1 = projected[p1];
        const pt2 = projected[p2];
        ctx.beginPath();
        ctx.moveTo(pt1.x, pt1.y);
        ctx.lineTo(pt2.x, pt2.y);
        ctx.strokeStyle = theme === 'light' 
          ? 'rgba(180, 83, 9, 0.65)' 
          : 'rgba(253, 224, 71, 0.65)';
        ctx.lineWidth = 1.6;
        ctx.stroke();
      });

      // Draw Nodes at vertices
      projected.forEach(pt => {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = theme === 'light' ? '#b45309' : '#fde047';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      });
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
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
      
      // Determine dynamic target frequency from active goal
      const currentGoal = goals[activeGoalIndex] || goals[0] || GOAL_TEMPLATES[0];
      const targetFreq = Number(currentGoal.frequency) || 432;
      
      if (audioMode === 'drone') {
        const oscSub = ctx.createOscillator();
        oscSub.type = 'sine';
        oscSub.frequency.setValueAtTime(targetFreq * 0.25, ctx.currentTime);
        
        const gainSub = ctx.createGain();
        gainSub.gain.setValueAtTime(0.35, ctx.currentTime);
        oscSub.connect(gainSub).connect(lowpassFilter);
        oscSub.start();
        activeOscillators.push(oscSub);
        
        const oscCore = ctx.createOscillator();
        oscCore.type = 'triangle';
        oscCore.frequency.setValueAtTime(targetFreq, ctx.currentTime);
        
        const gainCore = ctx.createGain();
        gainCore.gain.setValueAtTime(0.25, ctx.currentTime);
        oscCore.connect(gainCore).connect(lowpassFilter);
        oscCore.start();
        activeOscillators.push(oscCore);
        
        const oscFifth = ctx.createOscillator();
        oscFifth.type = 'sine';
        oscFifth.frequency.setValueAtTime(targetFreq * 1.5, ctx.currentTime);
        
        const gainFifth = ctx.createGain();
        gainFifth.gain.setValueAtTime(0.12, ctx.currentTime);
        oscFifth.connect(gainFifth).connect(lowpassFilter);
        oscFifth.start();
        activeOscillators.push(oscFifth);
        
        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.08, ctx.currentTime);
        
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(targetFreq * 0.5, ctx.currentTime);
        
        lfo.connect(lfoGain).connect(lowpassFilter.frequency);
        lfo.start();
        activeOscillators.push(lfo);
        lfoNodeRef.current = lfo;
        
      } else if (audioMode === 'binaural') {
        const oscL = ctx.createOscillator();
        oscL.type = 'sine';
        oscL.frequency.setValueAtTime(targetFreq, ctx.currentTime);
        
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
        oscR.frequency.setValueAtTime(targetFreq + 10, ctx.currentTime);
        
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
        oscCenter.frequency.setValueAtTime(targetFreq * 0.25, ctx.currentTime);
        
        const gainCenter = ctx.createGain();
        gainCenter.gain.setValueAtTime(0.2, ctx.currentTime);
        
        oscCenter.connect(gainCenter).connect(masterGain);
        oscCenter.start();
        activeOscillators.push(oscCenter);
        
      } else if (audioMode === 'bowls') {
        const oscBowl1 = ctx.createOscillator();
        oscBowl1.type = 'triangle';
        oscBowl1.frequency.setValueAtTime(targetFreq, ctx.currentTime);
        
        const gainBowl1 = ctx.createGain();
        gainBowl1.gain.setValueAtTime(0.3, ctx.currentTime);
        oscBowl1.connect(gainBowl1).connect(lowpassFilter);
        oscBowl1.start();
        activeOscillators.push(oscBowl1);
        
        const oscBowl2 = ctx.createOscillator();
        oscBowl2.type = 'sine';
        oscBowl2.frequency.setValueAtTime(targetFreq * 1.25, ctx.currentTime);
        
        const gainBowl2 = ctx.createGain();
        gainBowl2.gain.setValueAtTime(0.18, ctx.currentTime);
        oscBowl2.connect(gainBowl2).connect(lowpassFilter);
        oscBowl2.start();
        activeOscillators.push(oscBowl2);
        
        const oscBowl3 = ctx.createOscillator();
        oscBowl3.type = 'sine';
        oscBowl3.frequency.setValueAtTime(targetFreq * 1.5, ctx.currentTime);
        
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
      syncSoundscapeOverlays(ctx, masterGain);
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
      
      // Stop soundscapes
      stopRainSynth();
      if (bellIntervalRef.current) {
        clearInterval(bellIntervalRef.current);
        bellIntervalRef.current = null;
      }
      if (birdsIntervalRef.current) {
        clearInterval(birdsIntervalRef.current);
        birdsIntervalRef.current = null;
      }
      if (nightIntervalRef.current) {
        clearInterval(nightIntervalRef.current);
        nightIntervalRef.current = null;
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

  // --- SOUNDSCAPES SYNTHESIS & TIMERS MANAGEMENT ---
  const startRainSynth = (ctx, masterGain) => {
    try {
      if (rainSourceNodeRef.current) return;
      
      let lastOut = 0.0;
      const bufferSize = 2 * ctx.sampleRate;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5;
      }
      
      const source = ctx.createBufferSource();
      source.buffer = noiseBuffer;
      source.loop = true;
      
      const rainFilter = ctx.createBiquadFilter();
      rainFilter.type = 'lowpass';
      rainFilter.frequency.setValueAtTime(380, ctx.currentTime);
      
      const rainGain = ctx.createGain();
      rainGain.gain.setValueAtTime(0.08, ctx.currentTime);
      
      source.connect(rainFilter).connect(rainGain).connect(masterGain);
      source.start();
      
      rainSourceNodeRef.current = source;
      rainGainNodeRef.current = rainGain;
    } catch (err) {
      void err;
    }
  };

  const stopRainSynth = () => {
    try {
      if (rainSourceNodeRef.current) {
        rainSourceNodeRef.current.stop();
        rainSourceNodeRef.current.disconnect();
        rainSourceNodeRef.current = null;
      }
      if (rainGainNodeRef.current) {
        rainGainNodeRef.current.disconnect();
        rainGainNodeRef.current = null;
      }
    } catch (err) {
      void err;
    }
  };

  const playCalmingBell = (ctx, destination) => {
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      const freqs = [432, 648, 864, 1296];
      const freq = freqs[Math.floor(Math.random() * freqs.length)];
      osc.frequency.setValueAtTime(freq, now);
      
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.06, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 5.0);
      
      const oscOver = ctx.createOscillator();
      const gainOver = ctx.createGain();
      oscOver.type = 'sine';
      oscOver.frequency.setValueAtTime(freq * 1.5, now);
      gainOver.gain.setValueAtTime(0.0001, now);
      gainOver.gain.linearRampToValueAtTime(0.015, now + 0.04);
      gainOver.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);
      
      osc.connect(gain).connect(destination);
      oscOver.connect(gainOver).connect(destination);
      
      osc.start(now);
      oscOver.start(now);
      
      osc.stop(now + 5.5);
      oscOver.stop(now + 3.0);
    } catch (err) {
      void err;
    }
  };

  const playBirdChirp = (ctx, destination) => {
    try {
      const now = ctx.currentTime;
      const chirps = Math.floor(Math.random() * 3) + 2;
      let startTime = now;
      
      for (let i = 0; i < chirps; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'sine';
        const startFreq = 2800 + Math.random() * 800;
        const endFreq = 1800 + Math.random() * 400;
        const duration = 0.07 + Math.random() * 0.06;
        
        osc.frequency.setValueAtTime(startFreq, startTime);
        osc.frequency.exponentialRampToValueAtTime(endFreq, startTime + duration);
        
        gain.gain.setValueAtTime(0.0001, startTime);
        gain.gain.linearRampToValueAtTime(0.015, startTime + duration * 0.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
        
        osc.connect(gain).connect(destination);
        osc.start(startTime);
        osc.stop(startTime + duration + 0.02);
        
        startTime += duration + 0.05 + Math.random() * 0.07;
      }
    } catch (err) {
      void err;
    }
  };

  const playCricketChirp = (ctx, destination) => {
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(4000 + Math.random() * 300, now);
      
      const vibrato = ctx.createOscillator();
      const vibratoGain = ctx.createGain();
      vibrato.type = 'sawtooth';
      vibrato.frequency.setValueAtTime(45, now);
      vibratoGain.gain.setValueAtTime(0.4, now);
      
      vibrato.connect(vibratoGain).connect(gain.gain);
      
      const duration = 1.0;
      gain.gain.setValueAtTime(0, now);
      
      for (let t = 0; t < duration; t += 0.22) {
        const start = now + t;
        const width = 0.10;
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.linearRampToValueAtTime(0.012, start + 0.02);
        gain.gain.setValueAtTime(0.012, start + width - 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + width);
      }
      
      osc.connect(gain).connect(destination);
      
      vibrato.start(now);
      osc.start(now);
      
      vibrato.stop(now + duration + 0.05);
      osc.stop(now + duration + 0.05);
    } catch (err) {
      void err;
    }
  };

  const syncSoundscapeOverlays = (ctx, masterGain) => {
    try {
      if (!ctx || !masterGain || !audioPlaying) {
        stopRainSynth();
        if (bellIntervalRef.current) {
          clearInterval(bellIntervalRef.current);
          bellIntervalRef.current = null;
        }
        if (birdsIntervalRef.current) {
          clearInterval(birdsIntervalRef.current);
          birdsIntervalRef.current = null;
        }
        if (nightIntervalRef.current) {
          clearInterval(nightIntervalRef.current);
          nightIntervalRef.current = null;
        }
        return;
      }
      
      if (soundscapeRain) {
        startRainSynth(ctx, masterGain);
      } else {
        stopRainSynth();
      }
      
      if (soundscapeBell) {
        if (!bellIntervalRef.current) {
          playCalmingBell(ctx, masterGain);
          bellIntervalRef.current = setInterval(() => {
            playCalmingBell(ctx, masterGain);
          }, 11000);
        }
      } else {
        if (bellIntervalRef.current) {
          clearInterval(bellIntervalRef.current);
          bellIntervalRef.current = null;
        }
      }
      
      if (soundscapeBirds) {
        if (!birdsIntervalRef.current) {
          playBirdChirp(ctx, masterGain);
          birdsIntervalRef.current = setInterval(() => {
            playBirdChirp(ctx, masterGain);
          }, 13000);
        }
      } else {
        if (birdsIntervalRef.current) {
          clearInterval(birdsIntervalRef.current);
          birdsIntervalRef.current = null;
        }
      }
      
      if (soundscapeNight) {
        if (!nightIntervalRef.current) {
          playCricketChirp(ctx, masterGain);
          nightIntervalRef.current = setInterval(() => {
            playCricketChirp(ctx, masterGain);
          }, 5500);
        }
      } else {
        if (nightIntervalRef.current) {
          clearInterval(nightIntervalRef.current);
          nightIntervalRef.current = null;
        }
      }
    } catch (err) {
      void err;
    }
  };

  // --- SYNC EFFECTS & EVENT LOOPS ---
  useEffect(() => {
    if (audioPlaying && audioCtxRef.current && gainNodeRef.current) {
      syncSoundscapeOverlays(audioCtxRef.current, gainNodeRef.current);
    } else {
      stopRainSynth();
      if (bellIntervalRef.current) {
        clearInterval(bellIntervalRef.current);
        bellIntervalRef.current = null;
      }
      if (birdsIntervalRef.current) {
        clearInterval(birdsIntervalRef.current);
        birdsIntervalRef.current = null;
      }
      if (nightIntervalRef.current) {
        clearInterval(nightIntervalRef.current);
        nightIntervalRef.current = null;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [soundscapeRain, soundscapeBell, soundscapeBirds, soundscapeNight, audioPlaying]);

  useEffect(() => {
    if (audioPlaying) {
      startManifestingMusic();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioMode, activeGoalIndex]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Coherence breathing visual guide interval
  useEffect(() => {
    if (activeTab !== 'manifest') return;
    
    const interval = setInterval(() => {
      setBreathingCounter((prev) => {
        if (prev <= 1) {
          setBreathingPhase((phase) => {
            if (phase === 'Inhale') return 'Hold (Full)';
            if (phase === 'Hold (Full)') return 'Exhale';
            if (phase === 'Exhale') return 'Hold (Empty)';
            return 'Inhale';
          });
          return 4;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [activeTab]);

  // Ho'oponopono mantras cycling effect
  useEffect(() => {
    if (activeTab !== 'manifest' || activeTechniqueTab !== 'hooponopono') return;
    const interval = setInterval(() => {
      setHoopIndex((prev) => (prev + 1) % 4);
    }, 4500);
    return () => clearInterval(interval);
  }, [activeTab, activeTechniqueTab]);

  // Water technique states reset
  useEffect(() => {
    setWaterPhase('idle');
    setWaterTimer(15);
    if (waterIntervalRef.current) {
      clearInterval(waterIntervalRef.current);
      waterIntervalRef.current = null;
    }
  }, [activeTab, activeGoalIndex, activeTechniqueTab]);

  // Affirmations loop transition timer
  useEffect(() => {
    if (!affirmationPlaying) return;
    
    const intervalTime = subliminalActive ? 80 : 4000;
    
    const interval = setInterval(() => {
      setActiveAffirmationIdx((prev) => (prev + 1) % (isGuidedSessionActive ? (goals[guidedGoalIndex]?.affirmations || []).length || 1 : affirmationsList.length));
    }, intervalTime);
    
    return () => clearInterval(interval);
  }, [affirmationPlaying, subliminalActive, affirmationsList.length, isGuidedSessionActive, guidedGoalIndex]);

  // Guided session step timers
  useEffect(() => {
    if (!isGuidedSessionActive) return;

    const currentStep = getGuidedSteps(goals[guidedGoalIndex])[guidedStepIndex];
    if (!currentStep) return;

    let timer = null;

    if (currentStep.key === 'intro') {
      if (!audioPlaying) {
        startManifestingMusic();
      }
      
      timer = setInterval(() => {
        setGuidedCalibrationTime((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            advanceGuidedStep();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } 
    
    else if (currentStep.key === 'breathing') {
      timer = setInterval(() => {
        setGuidedBreathingTime((prev) => {
          if (prev <= 1) {
            setGuidedBreathingPhase((phase) => {
              if (phase === 'Inhale') return 'Hold (Full)';
              if (phase === 'Hold (Full)') return 'Exhale';
              if (phase === 'Exhale') return 'Hold (Empty)';
              clearInterval(timer);
              advanceGuidedStep();
              return 'Inhale';
            });
            return 4;
          }
          
          if (prev === 13) setGuidedBreathingPhase('Hold (Full)');
          else if (prev === 9) setGuidedBreathingPhase('Exhale');
          else if (prev === 5) setGuidedBreathingPhase('Hold (Empty)');
          
          return prev - 1;
        });
      }, 1000);
    } 
    
    else if (currentStep.key === 'affirmations') {
      setAffirmationPlaying(true);
      
      timer = setInterval(() => {
        setGuidedAffTime((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setAffirmationPlaying(false);
            advanceGuidedStep();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGuidedSessionActive, guidedStepIndex, guidedGoalIndex]);

  // Synchronize Preset Affirmations
  useEffect(() => {
    if (PRESET_AFFIRMATIONS[affirmationCategory]) {
      setAffirmationsList(PRESET_AFFIRMATIONS[affirmationCategory]);
      setActiveAffirmationIdx(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [affirmationCategory]);

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
    const updated = goals.map((goal) => {
      const hasTask = goal.tasks.some(t => t.id === taskId);
      if (hasTask) {
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

    const affirmationsArray = newGoalAffsText.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    const newGoalObj = {
      name: newGoalName,
      category: newGoalCat,
      description: newGoalDesc || `Daily focus schedule for ${newGoalName}`,
      visionImage: newGoalVision || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80",
      isActive: true,
      frequency: newGoalFreq,
      activeTechniques: newGoalTechniques,
      affirmations: affirmationsArray.length > 0 ? affirmationsArray : [
        `I attract divine alignment and success for ${newGoalName}.`,
        "I am focused, calm, and moving towards my target daily."
      ],
      scriptingLetters: [],
      drawingData: "",
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
    setNewGoalFreq('432');
    setNewGoalTechniques(['music', 'affirmation']);
    setNewGoalAffsText('');
    
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

  // Aggregated calculations across ALL active goals (e.g. goal.isActive === true)
  const activeGoalsList = goals.filter(g => g.isActive !== false);
  
  // Calculate daily totals for all active goals
  const dailyTargetTotal = activeGoalsList.reduce((sum, g) => sum + g.tasks.reduce((s, t) => s + t.targetHours, 0), 0);
  const dailyLoggedTotal = activeGoalsList.reduce((sum, g) => sum + g.tasks.reduce((s, t) => s + t.loggedHours, 0), 0);
  const dailyProgressPercent = dailyTargetTotal > 0 ? Math.round((dailyLoggedTotal / dailyTargetTotal) * 100) : 0;

  const daysOfWeekLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const todayLabel = daysOfWeekLabels[new Date().getDay()];

  const getWeekProgressData = () => {
    const defaultData = [
      { day: "Mon", logged: 4.5, target: 6.0 },
      { day: "Tue", logged: 5.8, target: 6.5 },
      { day: "Wed", logged: 6.2, target: 6.0 },
      { day: "Thu", logged: 3.5, target: 6.5 },
      { day: "Fri", logged: 5.0, target: 6.0 },
      { day: "Sat", logged: 7.0, target: 5.5 },
      { day: "Sun", logged: 5.2, target: 6.0 }
    ];

    return defaultData.map(d => {
      if (d.day === todayLabel) {
        return {
          day: todayLabel,
          logged: Number(dailyLoggedTotal.toFixed(1)),
          target: Number(dailyTargetTotal.toFixed(1))
        };
      }
      return d;
    });
  };

  // Milestone completion percentage for all active goals
  const totalMilestones = activeGoalsList.reduce((sum, g) => sum + g.milestones.length, 0);
  const completedMilestones = activeGoalsList.reduce((sum, g) => sum + (g.milestones ? g.milestones.filter(m => m.completed).length : 0), 0);
  const milestonePercent = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;

  return (
    <>
      {/* Dynamic Cursor Spotlight Glow */}
      <div 
        className="cursor-aura"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: theme === 'light' 
            ? 'radial-gradient(circle, rgba(253, 224, 71, 0.1) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(253, 224, 71, 0.13) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: `translate3d(${mousePos.x - 175}px, ${mousePos.y - 175}px, 0)`,
          willChange: 'transform',
          transition: 'transform 80ms ease-out'
        }}
      />

      {/* Global Scroll-Responsive 3D Constellation & Grid Canvas */}
      <canvas 
        ref={canvasRef} 
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100vw', 
          height: '100vh', 
          pointerEvents: 'none', 
          zIndex: 0 
        }} 
      />

      {/* Scroll Line Progress Indicator */}
      <div className="scroll-line-indicator" />



      {/* Confetti Container */}
      <div ref={confettiContainerRef} className="confetti-canvas-container" aria-hidden="true" />

      {/* Ambient glowing backdrops */}
      <div className="ambient-glow" style={{ top: '10%', left: '-10%', background: 'radial-gradient(circle, rgba(255, 215, 0, 0.22) 0%, transparent 70%)' }} />
      <div className="ambient-glow" style={{ top: '50%', right: '-10%', background: 'radial-gradient(circle, rgba(255, 165, 0, 0.16) 0%, transparent 70%)', animationDelay: '-3s' }} />
      <div className="ambient-glow" style={{ top: '25%', right: '20%', background: 'radial-gradient(circle, rgba(255, 235, 150, 0.26) 0%, transparent 70%)', filter: 'blur(130px)', width: '600px', height: '600px', animationDelay: '-6s' }} />
      <div className="ambient-glow" style={{ bottom: '15%', left: '10%', background: 'radial-gradient(circle, rgba(255, 200, 0, 0.26) 0%, transparent 70%)', filter: 'blur(140px)', width: '700px', height: '700px', animationDelay: '-9s' }} />

      {/* Peaceful floating attraction sparkles */}
      <div className="attraction-sparkle" style={{ left: '5%', animationDelay: '0s', animationDuration: '14s' }} />
      <div className="attraction-sparkle" style={{ left: '15%', animationDelay: '3s', animationDuration: '18s', width: '3px', height: '3px' }} />
      <div className="attraction-sparkle" style={{ left: '30%', animationDelay: '6s', animationDuration: '15s', width: '5px', height: '5px' }} />
      <div className="attraction-sparkle" style={{ left: '45%', animationDelay: '1.5s', animationDuration: '20s' }} />
      <div className="attraction-sparkle" style={{ left: '60%', animationDelay: '8s', animationDuration: '16s', width: '3px', height: '3px' }} />
      <div className="attraction-sparkle" style={{ left: '72%', animationDelay: '4s', animationDuration: '14s', width: '5px', height: '5px' }} />
      <div className="attraction-sparkle" style={{ left: '85%', animationDelay: '11s', animationDuration: '22s' }} />
      <div className="attraction-sparkle" style={{ left: '95%', animationDelay: '7s', animationDuration: '17s', width: '4px', height: '4px' }} />

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
      <header className="header-navbar gold-shine">
        <div className="navbar-container">
          <button className="logo-link" onClick={() => setActiveTab('dashboard')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/logo-icon.png" alt="Manifestor Logo" style={{ width: '36px', height: '36px', borderRadius: '50%', filter: 'drop-shadow(0 2px 6px rgba(255, 158, 0, 0.2))' }} />
            <span className="logo-text">
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
            <button className={`nav-link-btn ${activeTab === 'manifest' ? 'active' : ''}`} onClick={() => setActiveTab('manifest')}>
              Manifest Space
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
            {/* Onboarding tour trigger */}
            <button
              onClick={() => {
                setShowTour(true);
                setTourStep(0);
                setActiveTab('dashboard');
              }}
              className="nav-link-btn"
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '6px', 
                padding: '6px 14px', 
                borderRadius: '20px', 
                fontSize: '0.82rem', 
                fontWeight: 700, 
                borderColor: 'var(--border-color)', 
                backgroundColor: 'rgba(255,195,0,0.08)',
                color: 'var(--text-primary)',
                cursor: 'pointer'
              }}
              title="Show interactive wizard guide"
            >
              Tour 🧭
            </button>

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

              {/* 3D background is canvas-rendered globally outside the hero, keeping this video background clean */}
              
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

            {/* Large Glowing Progress Chart at the Top */}
            <div className="reveal scroll-tilt-card glowing-border-card" style={{ width: '100%', marginBottom: '32px' }}>
              <div className="base-card" style={{ textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
                  <h3 style={{ fontSize: '1.35rem', display: 'flex', alignItems: 'center', gap: '10px', margin: 0, fontWeight: 800, textShadow: '0 0 15px rgba(253, 224, 71, 0.5)' }}>
                    <TrendingUp size={22} color="var(--color-amber)" /> Desire Analytics & Progress Trends
                  </h3>
                  
                  {/* Clean Edge style sub-tab toggle buttons */}
                  <div style={{ display: 'flex', gap: '4px', backgroundColor: 'rgba(0,0,0,0.04)', padding: '3px', borderRadius: '8px' }}>
                    <button 
                      onClick={() => setChartView('weekly')} 
                      style={{
                        padding: '6px 16px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        borderRadius: '6px',
                        border: 'none',
                        cursor: 'pointer',
                        backgroundColor: chartView === 'weekly' ? 'var(--bg-secondary)' : 'transparent',
                        color: chartView === 'weekly' ? 'var(--text-primary)' : 'var(--text-secondary)',
                        boxShadow: chartView === 'weekly' ? '0 2px 4px rgba(0,0,0,0.06)' : 'none',
                        transition: 'all 200ms'
                      }}
                    >
                      7-Day History
                    </button>
                    <button 
                      onClick={() => setChartView('daily')} 
                      style={{
                        padding: '6px 16px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        borderRadius: '6px',
                        border: 'none',
                        cursor: 'pointer',
                        backgroundColor: chartView === 'daily' ? 'var(--bg-secondary)' : 'transparent',
                        color: chartView === 'daily' ? 'var(--text-primary)' : 'var(--text-secondary)',
                        boxShadow: chartView === 'daily' ? '0 2px 4px rgba(0,0,0,0.06)' : 'none',
                        transition: 'all 200ms'
                      }}
                    >
                      Today's Target
                    </button>
                  </div>
                </div>

                {chartView === 'weekly' ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', alignItems: 'center' }}>
                    {/* Left: 7-Day History Line Graph (Taller and Larger) */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-tertiary)', fontWeight: 700 }}>
                        Coherence & Focus Trend (Week)
                      </span>
                      
                      <div style={{ overflowX: 'auto', padding: '10px 0' }}>
                        <svg width="100%" height="260" viewBox="0 0 500 220" style={{ minWidth: '420px', overflow: 'visible' }}>
                          <defs>
                            <linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="line-grad" x1="0" y1="0" x2="1" y2="0">
                              <stop offset="0%" stopColor="#10b981" />
                              <stop offset="100%" stopColor="#34d399" />
                            </linearGradient>
                            <radialGradient id="svg-bg-glow" cx="50%" cy="40%" r="60%">
                              <stop offset="0%" stopColor="var(--color-gold)" stopOpacity="0.12" />
                              <stop offset="100%" stopColor="var(--color-gold)" stopOpacity="0" />
                            </radialGradient>
                          </defs>

                          {/* Glowing background aura */}
                          <rect width="100%" height="220" fill="url(#svg-bg-glow)" pointerEvents="none" />

                          {/* Grid Lines */}
                          <line x1="40" y1="20" x2="480" y2="20" stroke="var(--border-color)" strokeWidth="0.75" strokeDasharray="3" />
                          <line x1="40" y1="105" x2="480" y2="105" stroke="var(--border-color)" strokeWidth="0.75" strokeDasharray="3" />
                          <line x1="40" y1="190" x2="480" y2="190" stroke="var(--text-secondary)" strokeWidth="1" />

                          {/* Y Axis Labels */}
                          <text x="30" y="24" fontSize="9" textAnchor="end" fill="var(--text-tertiary)" fontWeight="700">8h</text>
                          <text x="30" y="109" fontSize="9" textAnchor="end" fill="var(--text-tertiary)" fontWeight="700">4h</text>
                          <text x="30" y="194" fontSize="9" textAnchor="end" fill="var(--text-tertiary)" fontWeight="700">0h</text>

                          {/* Smooth Bezier Splines Calculation */}
                          {(() => {
                            const week = getWeekProgressData();
                            const getX = (i) => 40 + i * 70;
                            const getY = (v) => 190 - (Math.min(8, v) / 8) * 170;

                            // 1. Logged focus smooth curve path
                            let loggedD = "";
                            if (week.length > 0) {
                              loggedD = `M ${getX(0)} ${getY(week[0].logged)}`;
                              for (let i = 0; i < week.length - 1; i++) {
                                const cp1x = getX(i) + 35;
                                const cp1y = getY(week[i].logged);
                                const cp2x = getX(i + 1) - 35;
                                const cp2y = getY(week[i + 1].logged);
                                const endX = getX(i + 1);
                                const endY = getY(week[i + 1].logged);
                                loggedD += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`;
                              }
                            }

                            // 2. Target dashed smooth curve path
                            let targetD = "";
                            if (week.length > 0) {
                              targetD = `M ${getX(0)} ${getY(week[0].target)}`;
                              for (let i = 0; i < week.length - 1; i++) {
                                const cp1x = getX(i) + 35;
                                const cp1y = getY(week[i].target);
                                const cp2x = getX(i + 1) - 35;
                                const cp2y = getY(week[i + 1].target);
                                const endX = getX(i + 1);
                                const endY = getY(week[i + 1].target);
                                targetD += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`;
                              }
                            }

                            return (
                              <>
                                {/* Logged Filled Area */}
                                {loggedD && (
                                  <path
                                    d={`${loggedD} L ${getX(week.length - 1)} 190 L ${getX(0)} 190 Z`}
                                    fill="url(#area-grad)"
                                  />
                                )}

                                {/* Target dashed curve */}
                                {targetD && (
                                  <path
                                    d={targetD}
                                    fill="none"
                                    stroke="var(--text-tertiary)"
                                    strokeWidth="1.5"
                                    strokeDasharray="4"
                                  />
                                )}

                                {/* Logged focus curve with Glow */}
                                {loggedD && (
                                  <path
                                    d={loggedD}
                                    fill="none"
                                    stroke="url(#line-grad)"
                                    strokeWidth="3.5"
                                    style={{ filter: 'drop-shadow(0 0 10px rgba(16, 185, 129, 0.75))' }}
                                  />
                                )}

                                {/* Interactivity and Data Points */}
                                {week.map((d, idx) => {
                                  const x = getX(idx);
                                  const y = getY(d.logged);
                                  const isHovered = hoveredPoint === idx;
                                  return (
                                    <g key={idx}>
                                      {/* Visible dot */}
                                      <circle
                                        cx={x}
                                        cy={y}
                                        r={isHovered ? "7" : "5"}
                                        fill="#ffffff"
                                        stroke={isHovered ? "var(--color-amber)" : "#10b981"}
                                        strokeWidth="2.5"
                                        style={{ 
                                          filter: isHovered 
                                            ? 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.8))' 
                                            : 'drop-shadow(0 0 4px rgba(16, 185, 129, 0.5))',
                                          transition: 'all 200ms cubic-bezier(0.16, 1, 0.3, 1)' 
                                        }}
                                      />
                                      {/* Large invisible interactive hover zone */}
                                      <circle
                                        cx={x}
                                        cy={y}
                                        r="18"
                                        fill="transparent"
                                        style={{ cursor: 'pointer' }}
                                        onMouseEnter={() => setHoveredPoint(idx)}
                                        onMouseLeave={() => setHoveredPoint(null)}
                                      />
                                      <text
                                        x={x}
                                        y="210"
                                        fontSize="9"
                                        textAnchor="middle"
                                        fill="var(--text-secondary)"
                                        fontWeight="700"
                                      >
                                        {d.day}
                                      </text>
                                    </g>
                                  );
                                })}

                                {/* Dynamic Interactive Tooltip */}
                                {hoveredPoint !== null && (() => {
                                  const d = week[hoveredPoint];
                                  const x = getX(hoveredPoint);
                                  const y = getY(d.logged);
                                  // Keep tooltip within visible boundaries
                                  const tooltipX = Math.max(55, Math.min(445, x));
                                  return (
                                    <g style={{ pointerEvents: 'none' }}>
                                      {/* Glow backing shadow */}
                                      <rect
                                        x={tooltipX - 55}
                                        y={y - 48}
                                        width="110"
                                        height="38"
                                        rx="8"
                                        fill="var(--bg-primary)"
                                        stroke="var(--color-amber)"
                                        strokeWidth="2"
                                        style={{ filter: 'drop-shadow(0 6px 16px rgba(0, 0, 0, 0.18)) drop-shadow(0 0 8px rgba(253, 224, 71, 0.25))' }}
                                      />
                                      <text x={tooltipX} y={y - 35} fontSize="9" fontWeight="800" textAnchor="middle" fill="var(--text-primary)">
                                        {d.day}: {d.logged}h Focus
                                      </text>
                                      <text x={tooltipX} y={y - 23} fontSize="8" fontWeight="600" textAnchor="middle" fill="var(--text-tertiary)">
                                        Target: {d.target}h
                                      </text>
                                    </g>
                                  );
                                })()}
                              </>
                            );
                          })()}
                        </svg>
                      </div>
                    </div>

                    {/* Right: Key Analytics Data Panel */}
                    <div className="analytics-details" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-tertiary)', fontWeight: 700, marginBottom: '6px' }}>
                        Desire Telemetry
                      </span>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>Total Focus</span>
                          <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>{Number(getWeekProgressData().reduce((s, d) => s + d.logged, 0).toFixed(1))}h</span>
                        </div>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>Avg Coherence</span>
                          <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-sage)' }}>
                            {Math.round((getWeekProgressData().reduce((sum, d) => sum + (d.target > 0 ? Math.min(1, d.logged / d.target) : 1), 0) / 7) * 100)}%
                          </span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>Peak Day</span>
                          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                            {(() => {
                              const peak = [...getWeekProgressData()].sort((a, b) => b.logged - a.logged)[0];
                              return `${peak?.day} (${peak?.logged}h)`;
                            })()}
                          </span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>Current Streak</span>
                          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-amber)', textShadow: '0 0 8px rgba(245, 158, 11, 0.3)' }}>🔥 {streak} Days</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '16px', fontSize: '0.75rem', marginTop: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ width: '8px', height: '8px', border: '1px dashed var(--text-tertiary)', borderRadius: '2px' }} />
                          Target
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '2px' }} />
                          Logged
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-tertiary)', fontWeight: 700 }}>
                      Active Desire Tasks: Daily Targets vs. Logged
                    </span>
                    
                    <div style={{ overflowX: 'auto', padding: '10px 0' }}>
                      <svg width="100%" height="260" viewBox="0 0 500 220" style={{ minWidth: '420px', overflow: 'visible' }}>
                        <line x1="40" y1="20" x2="480" y2="20" stroke="var(--border-color)" strokeWidth="0.75" strokeDasharray="3" />
                        <line x1="40" y1="105" x2="480" y2="105" stroke="var(--border-color)" strokeWidth="0.75" strokeDasharray="3" />
                        <line x1="40" y1="190" x2="480" y2="190" stroke="var(--text-secondary)" strokeWidth="1" />

                        {(() => {
                          const maxHours = Math.max(...(activeGoal.tasks || []).map(t => Math.max(t.targetHours || 0, t.loggedHours || 0, 1)));
                          const maxVal = maxHours > 4 ? maxHours : 4;
                          return (activeGoal.tasks || []).map((task, idx) => {
                            const xOffset = 50 + idx * 100;
                            const targetHeight = Math.min(170, ((task.targetHours || 0) / maxVal) * 170);
                            const loggedHeight = Math.min(170, ((task.loggedHours || 0) / maxVal) * 170);

                            return (
                              <g key={task.id}>
                                <rect
                                  x={xOffset}
                                  y={190 - targetHeight}
                                  width="20"
                                  height={targetHeight}
                                  fill="rgba(255, 158, 0, 0.04)"
                                  stroke="var(--color-amber)"
                                  strokeWidth="1.5"
                                  rx="2"
                                />
                                <rect
                                  x={xOffset + 6}
                                  y={190 - loggedHeight}
                                  width="20"
                                  height={loggedHeight}
                                  fill="url(#bar-grad-success)"
                                  style={{ filter: 'drop-shadow(0 0 6px rgba(16, 185, 129, 0.5))' }}
                                  rx="2"
                                />
                                <text
                                  x={xOffset + 13}
                                  y="208"
                                  textAnchor="middle"
                                  fontSize="9"
                                  fill="var(--text-secondary)"
                                  fontWeight="700"
                                >
                                  {task.name.split(' ')[0]}
                                </text>
                              </g>
                            );
                          });
                        })()}

                        <defs>
                          <linearGradient id="bar-grad-success" x1="0" y1="1" x2="0" y2="0">
                            <stop offset="0%" stopColor="#10b981" />
                            <stop offset="100%" stopColor="#34d399" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>

                    <div style={{ display: 'flex', gap: '16px', fontSize: '0.75rem', justifyContent: 'center', marginTop: '10px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '10px', height: '10px', border: '1px solid var(--color-amber)', backgroundColor: 'rgba(255,158,0,0.05)', borderRadius: '2px' }} />
                        Target Hours
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '10px', height: '10px', backgroundColor: '#10b981', borderRadius: '2px' }} />
                        Logged Hours
                      </span>
                    </div>
                  </div>
                )}
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
                    
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap', marginTop: '8px' }}>
                      <button 
                        className="btn-primary" 
                        style={{ 
                          padding: '10px 22px', 
                          fontSize: '0.9rem', 
                          backgroundColor: 'var(--color-gold)', 
                          color: '#1b1a18', 
                          boxShadow: '0 4px 20px rgba(255, 195, 0, 0.35)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          border: 'none',
                          fontWeight: 800
                        }} 
                        onClick={() => {
                          setGuidedGoalIndex(activeGoalIndex);
                          setGuidedStepIndex(0);
                          setGuidedCalibrationTime(15);
                          setGuidedBreathingTime(16);
                          setGuidedBreathingPhase('Inhale');
                          setGuidedWaterPhase('idle');
                          setGuidedWaterTime(15);
                          setGuidedAffTime(10);
                          setIsGuidedSessionActive(true);
                          if (soundEnabled) playBellSynth(523.25);
                        }}
                        onMouseMove={handleButtonMouseMove}
                        onMouseLeave={handleButtonMouseLeave}
                      >
                        <Sparkles size={16} /> Start Guided Daily Session ⚡
                      </button>

                      <button 
                        className="btn-secondary" 
                        style={{ padding: '8px 18px', fontSize: '0.85rem', borderColor: 'rgba(255,255,255,0.2)', color: 'white' }} 
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
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {goals.map((goal, goalIdx) => {
                      if (goal.isActive === false) return null;
                      if (!goal.tasks || goal.tasks.length === 0) return null;
                      
                      return (
                        <div key={goalIdx} className="dashboard-goal-group" style={{
                          borderLeft: '3px solid var(--color-amber)',
                          paddingLeft: '16px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, color: 'var(--color-amber)', padding: '2px 8px', borderRadius: '4px', backgroundColor: 'rgba(255,195,0,0.08)', width: 'fit-content' }}>
                              Goal: {goal.name}
                            </span>
                            <button className="nav-link-btn" onClick={() => handleAddCustomTask(goalIdx)} style={{ fontSize: '0.75rem', padding: '2px 8px' }}>
                              + Add Task to Goal
                            </button>
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {goal.tasks.map(task => (
                              <div
                                key={task.id}
                                className="base-card"
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  padding: '12px 16px',
                                  flexWrap: 'wrap',
                                  gap: '12px',
                                  border: '1px solid rgba(255,255,255,0.05)'
                                }}
                              >
                                <div style={{ textAlign: 'left', minWidth: '150px' }}>
                                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)' }}>
                                    Slot Goal: {task.targetHours}h
                                  </span>
                                  <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>{task.name}</h4>
                                  <span style={{ fontSize: '0.85rem', color: task.loggedHours >= task.targetHours ? 'var(--color-sage)' : 'var(--text-secondary)', fontWeight: 600 }}>
                                    Logged: {task.loggedHours} hours
                                  </span>
                                </div>

                                {/* Interactive quick logging controls */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <button
                                    className="btn-secondary"
                                    style={{ padding: '4px 10px', fontSize: '0.8rem' }}
                                    onClick={() => handleLogHours(task.id, -0.5)}
                                  >
                                    -30m
                                  </button>
                                  <button
                                    className="btn-secondary"
                                    style={{ padding: '4px 10px', fontSize: '0.8rem' }}
                                    onClick={() => handleLogHours(task.id, 0.5)}
                                  >
                                    +30m
                                  </button>
                                  <button
                                    className="btn-primary"
                                    style={{ padding: '4px 10px', fontSize: '0.8rem', backgroundColor: 'var(--color-sage)', color: 'var(--color-indigo)' }}
                                    onClick={() => handleLogHours(task.id, 1)}
                                  >
                                    +1 Hour
                                  </button>
                                  <button
                                    onClick={() => handleDeleteTask(goalIdx, task.id)}
                                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)', marginLeft: '8px' }}
                                    aria-label={`Delete task ${task.name}`}
                                  >
                                    <Trash2 size={15} />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: Telemetry, Milestones, and Vision Board */}
              <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                
                {/* Telemetry and Pending Actions Card (Things Left to Achieve) */}
                <div className="base-card scroll-tilt-card glowing-border-card" style={{ textAlign: 'left' }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800 }}>
                    <Activity size={20} color="var(--color-amber)" className="led-pulse" /> Things Left to Achieve Desire
                  </h3>
                  
                  {/* Hours Left Today summary */}
                  {(() => {
                    const remainingHours = activeGoal.tasks.reduce((sum, t) => sum + Math.max(0, t.targetHours - t.loggedHours), 0);
                    return (
                      <div style={{ 
                        padding: '14px 16px', 
                        borderRadius: '12px', 
                        backgroundColor: remainingHours > 0 ? 'rgba(245, 158, 11, 0.08)' : 'rgba(16, 185, 129, 0.08)',
                        border: remainingHours > 0 ? '1px solid rgba(245, 158, 11, 0.2)' : '1px solid rgba(16, 185, 129, 0.2)',
                        marginBottom: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}>
                        {remainingHours > 0 ? (
                          <Clock size={20} color="var(--color-amber)" />
                        ) : (
                          <CheckCircle size={20} color="var(--color-sage)" />
                        )}
                        <div>
                          <h4 style={{ fontSize: '0.92rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                            {remainingHours > 0 ? `${remainingHours.toFixed(2)} Hours Left Today` : "Daily Focus Targets Cleared"}
                          </h4>
                          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>
                            {remainingHours > 0 
                              ? "Physical action coordinates alignment for manifestation." 
                              : "You have aligned your action frequency with your goals!"}
                          </p>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Tasks Remaining List */}
                  <div style={{ marginBottom: '20px' }}>
                    <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-tertiary)', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
                      Incomplete Daily Targets
                    </span>
                    {activeGoal.tasks.filter(t => t.loggedHours < t.targetHours).length === 0 ? (
                      <p style={{ fontSize: '0.85rem', color: 'var(--color-sage)', fontStyle: 'italic', margin: 0 }}>
                        All daily tasks are fully logged! ✓
                      </p>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {activeGoal.tasks.filter(t => t.loggedHours < t.targetHours).map(task => {
                          const left = Number((task.targetHours - task.loggedHours).toFixed(2));
                          return (
                            <div key={task.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.88rem', padding: '6px 0', borderBottom: '1px dashed var(--border-color)' }}>
                              <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{task.name}</span>
                              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-amber)' }}>{left}h remaining</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Pending Milestones Checklist */}
                  <div>
                    <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-tertiary)', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
                      Milestones Pending
                    </span>
                    {activeGoal.milestones.filter(m => !m.completed).length === 0 ? (
                      <p style={{ fontSize: '0.85rem', color: 'var(--color-sage)', fontStyle: 'italic', margin: 0 }}>
                        All milestones achieved! Infinite abundance unlocked! 🎉
                      </p>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {activeGoal.milestones.filter(m => !m.completed).map(milestone => (
                          <div
                            key={milestone.id}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              padding: '8px 12px',
                              backgroundColor: 'rgba(253, 224, 71, 0.05)',
                              border: '1px solid rgba(253, 224, 71, 0.15)',
                              borderRadius: '6px'
                            }}
                          >
                            <input
                              type="checkbox"
                              className="habit-checkbox"
                              style={{ width: '18px', height: '18px', borderColor: 'var(--color-amber)', flexShrink: 0 }}
                              checked={false}
                              onChange={() => handleToggleMilestone(milestone.id)}
                              aria-label={`Mark milestone ${milestone.name} completed`}
                            />
                            <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-primary)' }}>{milestone.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Vision Board Card */}
                <div className="base-card scroll-tilt-card" style={{ padding: 0, overflow: 'hidden', textAlign: 'left' }}>
                  <div style={{ position: 'relative', height: '160px', width: '100%', overflow: 'hidden' }}>
                    <img
                      src={activeGoal.visionImage}
                      alt="Vision board aspirational focus"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
                    />
                    {activeGoal.drawingData && (
                      <img
                        src={activeGoal.drawingData}
                        alt="Your custom hand-drawn manifestation"
                        style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'absolute', inset: 0, zIndex: 1, backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(1px)' }}
                      />
                    )}
                  </div>
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

                    {/* Frequency Selection */}
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                        Sonic Manifestation Frequency
                      </label>
                      <select
                        className="text-input"
                        value={newGoalFreq}
                        onChange={(e) => setNewGoalFreq(e.target.value)}
                        aria-label="New goal frequency"
                      >
                        <option value="432">🪐 432 Hz — Deep Mind Focus & Stress Release</option>
                        <option value="528">🧬 528 Hz — Health, Healing & Cellular Energy</option>
                        <option value="888">💎 888 Hz — Wealth, Abundance & Divine Luck</option>
                      </select>
                    </div>

                    {/* Techniques Selection */}
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                        Choose Active Manifestation Techniques
                      </label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        {[
                          { id: 'music', name: '🪐 Audio Tuning Frequency' },
                          { id: 'affirmation', name: '⚡ Subliminal Loops' },
                          { id: 'water', name: '💧 Guided Water Charging' },
                          { id: 'hooponopono', name: '✨ Ho\'oponopono Cleansing' },
                          { id: 'scripting', name: '📜 Future-Self Scripting' },
                          { id: 'drawing', name: '🎨 Vision Board Canvas' }
                        ].map(tech => {
                          const isChecked = newGoalTechniques.includes(tech.id);
                          return (
                            <label key={tech.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', border: '1px solid var(--border-color)', borderRadius: '8px', background: isChecked ? 'rgba(255, 195, 0, 0.08)' : 'transparent', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, transition: 'all 200ms' }}>
                              <input
                                type="checkbox"
                                className="habit-checkbox"
                                style={{ width: '16px', height: '16px', borderColor: 'var(--color-gold)' }}
                                checked={isChecked}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setNewGoalTechniques([...newGoalTechniques, tech.id]);
                                  } else {
                                    setNewGoalTechniques(newGoalTechniques.filter(id => id !== tech.id));
                                  }
                                }}
                              />
                              {tech.name}
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    {/* Affirmations Text Area */}
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                        Daily Goal Affirmations (One per line)
                      </label>
                      <textarea
                        className="text-input"
                        style={{ minHeight: '80px', fontFamily: 'inherit' }}
                        placeholder="I attract abundance and success...&#10;My mind is highly focused..."
                        value={newGoalAffsText}
                        onChange={(e) => setNewGoalAffsText(e.target.value)}
                        aria-label="Goal affirmations"
                      />
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

        {/* TAB 5: MANIFESTATION CHAMBER */}
        {activeTab === 'manifest' && (
          <div className="fade-in" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '24px',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div style={{ textAlign: 'left' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px', margin: 0 }}>
                  <Sparkles size={28} color="var(--color-gold)" className="float" /> Manifestation Space
                </h1>
                <p style={{ color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
                  Interactive chambers to focus energy, tune frequencies, and manifest your goals.
                </p>
              </div>

              <button 
                className="btn-primary" 
                style={{ 
                  padding: '10px 22px', 
                  fontSize: '0.9rem', 
                  backgroundColor: 'var(--color-gold)', 
                  color: '#1b1a18', 
                  boxShadow: '0 4px 20px rgba(255, 195, 0, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: 'none',
                  fontWeight: 800
                }} 
                onClick={() => {
                  setGuidedGoalIndex(activeGoalIndex);
                  setGuidedStepIndex(0);
                  setGuidedCalibrationTime(15);
                  setGuidedBreathingTime(16);
                  setGuidedBreathingPhase('Inhale');
                  setGuidedWaterPhase('idle');
                  setGuidedWaterTime(15);
                  setGuidedAffTime(10);
                  setIsGuidedSessionActive(true);
                  if (soundEnabled) playBellSynth(523.25);
                }}
              >
                <Sparkles size={16} /> Start Guided Daily Session ⚡
              </button>
            </div>

            {/* Goal Selector Header */}
            <div className="base-card" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              padding: '16px 24px', 
              marginBottom: '24px', 
              flexWrap: 'wrap', 
              gap: '16px',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{ textAlign: 'left' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-amber)', fontWeight: 700, letterSpacing: '1px' }}>
                  Target Desire
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{activeGoal.name}</h3>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <label htmlFor="manifest-goal-select" style={{ fontSize: '0.88rem', fontWeight: 600 }}>Switch Desire:</label>
                <select
                  id="manifest-goal-select"
                  className="text-input"
                  style={{ width: '250px', padding: '8px 12px' }}
                  value={activeGoalIndex}
                  onChange={(e) => setActiveGoalIndex(Number(e.target.value))}
                >
                  {goals.map((goal, idx) => (
                    <option key={idx} value={idx}>
                      {goal.category === 'career' ? '💼' : goal.category === 'fitness' ? '💪' : goal.category === 'spiritual' ? '✨' : '🧘'} {goal.name} ({goal.frequency}Hz)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Sub-tab Navigation */}
            <div style={{ 
              display: 'flex', 
              gap: '8px', 
              overflowX: 'auto', 
              paddingBottom: '16px', 
              marginBottom: '24px', 
              borderBottom: '1px solid var(--border-color)' 
            }}>
              {(activeGoal.activeTechniques || ['music', 'affirmation']).map(tech => {
                const isActive = activeTechniqueTab === tech;
                const label = tech === 'music' ? '🪐 Audio Tuning'
                            : tech === 'affirmation' ? '⚡ Subliminal Loops'
                            : tech === 'water' ? '💧 Water Charging'
                            : tech === 'hooponopono' ? '✨ Ho\'oponopono'
                            : tech === 'scripting' ? '📜 Scripting Letters'
                            : '🎨 Vision Drawing';
                return (
                  <button
                    key={tech}
                    onClick={() => setActiveTechniqueTab(tech)}
                    className={`nav-link-btn ${isActive ? 'active' : ''}`}
                    style={{
                      whiteSpace: 'nowrap',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '0.88rem',
                      fontWeight: isActive ? 700 : 500,
                      backgroundColor: isActive ? 'var(--color-amber)' : 'rgba(255,255,255,0.05)',
                      color: isActive ? '#1b1a18' : 'var(--text-primary)',
                      border: '1px solid var(--border-color)',
                      cursor: 'pointer',
                      transition: 'all 200ms'
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Technique Chamber Panels */}
            <div className="reveal-container">
              
              {/* 1. MUSIC & TUNING */}
              {activeTechniqueTab === 'music' && (
                <div className="fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', alignItems: 'start' }}>
                  
                  {/* Frequency Synthesizer */}
                  <div className="base-card" style={{ textAlign: 'left', minHeight: '480px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
                        <Volume2 size={22} color="var(--color-gold)" /> Frequency Engine
                      </h3>
                      <span className={`led-indicator ${audioPlaying ? 'led-sage led-pulse' : 'led-orange'}`}></span>
                    </div>

                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: 1.45 }}>
                      Tune your acoustic environment to the target frequency: <strong style={{ color: 'var(--color-amber)' }}>{activeGoal.frequency}Hz</strong>.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                      {[
                        { id: 'drone', label: '🪐 Cosmic Ambient Drone', desc: `Warm ${activeGoal.frequency}Hz drone with harmonic sweeps.` },
                        { id: 'binaural', label: '🧠 Alpha Binaural Focus', desc: `Stereo differential binaural beat centered on ${activeGoal.frequency}Hz.` },
                        { id: 'bowls', label: '🥣 Resonant Tibetan Bowls', desc: `Tibetan singing bowls tuned to ${activeGoal.frequency}Hz ratios.` }
                      ].map(mode => (
                        <button
                          key={mode.id}
                          onClick={() => setAudioMode(mode.id)}
                          className={`btn-secondary ${audioMode === mode.id ? 'active' : ''}`}
                          style={{
                            justifyContent: 'flex-start',
                            padding: '12px 16px',
                            fontSize: '0.88rem',
                            width: '100%',
                            borderWidth: '1px',
                            borderColor: audioMode === mode.id ? 'var(--color-gold)' : 'var(--border-color)',
                            backgroundColor: audioMode === mode.id ? 'rgba(255, 158, 0, 0.06)' : 'transparent',
                            color: audioMode === mode.id ? 'var(--color-gold)' : 'var(--text-primary)',
                            fontWeight: audioMode === mode.id ? 700 : 500
                          }}
                        >
                          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                            <span style={{ fontSize: '0.92rem', fontWeight: 600 }}>{mode.label}</span>
                            <span style={{ fontSize: '0.75rem', opacity: 0.7, marginTop: '2px', fontWeight: 400 }}>{mode.desc}</span>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                      <button
                        onClick={() => audioPlaying ? stopManifestingMusic() : startManifestingMusic()}
                        className="btn-primary"
                        style={{
                          padding: '12px 24px',
                          fontSize: '0.92rem',
                          backgroundColor: audioPlaying ? 'var(--color-green)' : 'var(--color-gold)',
                          color: audioPlaying ? 'white' : '#1b1a18',
                          boxShadow: audioPlaying ? '0 4px 15px rgba(16, 185, 129, 0.25)' : '0 4px 15px rgba(255, 158, 0, 0.25)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}
                      >
                        {audioPlaying ? <Pause size={18} /> : <Play size={18} />}
                        {audioPlaying ? 'Stop Audio' : `Tune to ${activeGoal.frequency}Hz`}
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
                          style={{ flexGrow: 1, accentColor: 'var(--color-gold)', cursor: 'pointer' }}
                          aria-label="Sound engine volume"
                        />
                        <Volume2 size={16} color="var(--text-secondary)" />
                      </div>
                    </div>

                    <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', marginTop: 'auto' }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '12px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Sparkles size={16} color="var(--color-green)" /> Soothing Nature Mixers
                      </h4>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        {[
                          { id: 'rain', state: soundscapeRain, setter: setSoundscapeRain, label: '🌧️ Soothing Rain', desc: 'Brownian storm noise' },
                          { id: 'bell', state: soundscapeBell, setter: setSoundscapeBell, label: '🔔 Cosmic Bells', desc: 'Tuned harmonic rings' },
                          { id: 'birds', state: soundscapeBirds, setter: setSoundscapeBirds, label: '🐦 Forest Birds', desc: 'FM chirping sweeps' },
                          { id: 'night', state: soundscapeNight, setter: setSoundscapeNight, label: '🌙 Night Crickets', desc: 'Summer night pulses' }
                        ].map(overlay => (
                          <button
                            key={overlay.id}
                            onClick={() => {
                              if (!audioPlaying) {
                                startManifestingMusic();
                              }
                              overlay.setter(!overlay.state);
                            }}
                            className={`btn-secondary ${overlay.state ? 'active' : ''}`}
                            style={{
                              padding: '10px 12px',
                              fontSize: '0.8rem',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'flex-start',
                              textAlign: 'left',
                              borderColor: overlay.state ? 'var(--color-green)' : 'var(--border-color)',
                              backgroundColor: overlay.state ? 'rgba(16, 185, 129, 0.08)' : 'transparent',
                              color: overlay.state ? 'var(--color-green)' : 'var(--text-primary)',
                              fontWeight: overlay.state ? 700 : 500
                            }}
                          >
                            <span style={{ fontSize: '0.88rem' }}>{overlay.label}</span>
                            <span style={{ fontSize: '0.7rem', opacity: 0.7, marginTop: '2px', fontWeight: 400 }}>{overlay.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Coherence Breathing */}
                  <div className="base-card" style={{ textAlign: 'center', minHeight: '480px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', textAlign: 'left' }}>
                      <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
                        <Activity size={22} color="var(--color-lavender)" /> Coherence Breathing
                      </h3>
                      <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', padding: '2px 8px', borderRadius: '10px', backgroundColor: 'rgba(167, 139, 250, 0.15)', color: 'var(--color-lavender)', fontWeight: 700 }}>
                        Box Guide
                      </span>
                    </div>

                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '32px', textAlign: 'left', lineHeight: 1.45 }}>
                      Slow breathing coordinates heart rate and nervous system, immediately clearing stress and inducing focus before you manifest.
                    </p>

                    <div style={{
                      position: 'relative',
                      width: '200px',
                      height: '200px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '32px'
                    }}>
                      <div 
                        className={`breathing-ring phase-${breathingPhase.toLowerCase().replace(/[^a-z]/g, '')}`}
                        style={{
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          borderRadius: '50%',
                          transition: 'all 4000ms cubic-bezier(0.4, 0, 0.2, 1)',
                          zIndex: 0
                        }}
                      />
                      
                      <div style={{
                        position: 'relative',
                        zIndex: 2,
                        width: '130px',
                        height: '130px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--bg-secondary)',
                        border: '2px solid var(--border-color)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                          {breathingPhase.toUpperCase()}
                        </span>
                        <span style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--color-gold)', marginTop: '4px' }}>
                          {breathingCounter}s
                        </span>
                      </div>
                    </div>

                    <div style={{ marginTop: 'auto', textAlign: 'left', width: '100%', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                      <div style={{ display: 'flex', gap: '10px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        <span style={{ fontWeight: 600, color: 'var(--color-gold)' }}>Inhale (4s)</span>
                        <span>→</span>
                        <span style={{ fontWeight: 600, color: 'var(--color-lavender)' }}>Hold (4s)</span>
                        <span>→</span>
                        <span style={{ fontWeight: 600, color: 'var(--color-orange)' }}>Exhale (4s)</span>
                        <span>→</span>
                        <span style={{ fontWeight: 600, color: 'var(--text-tertiary)' }}>Hold (4s)</span>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* 2. SUBLIMINAL LOOPS */}
              {activeTechniqueTab === 'affirmation' && (
                <div className="fade-in base-card" style={{ textAlign: 'left', maxWidth: '750px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
                      <Sparkles size={22} color="var(--color-gold)" /> Subconscious Intention Loops
                    </h3>
                    <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', padding: '2px 8px', borderRadius: '10px', backgroundColor: affirmationPlaying ? 'rgba(255, 158, 0, 0.15)' : 'rgba(255,255,255,0.08)', color: affirmationPlaying ? 'var(--color-gold)' : 'var(--text-secondary)', fontWeight: 700 }}>
                      {affirmationPlaying ? (subliminalActive ? 'Subliminal active' : 'Standard loop') : 'Stopped'}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.45 }}>
                    Inject positive mental scripts. Use Subliminal Mode to flash them rapidly, or Whisper Mode to render them barely visible, bypassing conscious resistance filters.
                  </p>

                  {/* Affirmation Loop Player Window */}
                  <div style={{
                    height: '120px',
                    backgroundColor: 'rgba(0,0,0,0.22)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '16px 20px',
                    textAlign: 'center',
                    border: '1px solid var(--border-color)',
                    marginBottom: '16px',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    {affirmationPlaying && (activeGoal.affirmations || []).length > 0 ? (
                      <span 
                        style={{
                          fontSize: subliminalActive ? '1.4rem' : '1.1rem',
                          fontWeight: 700,
                          color: 'var(--text-primary)',
                          transition: subliminalActive ? 'none' : 'opacity 400ms ease-in-out',
                          opacity: whisperActive ? 0.015 : 1,
                          letterSpacing: subliminalActive ? '1px' : 'normal',
                          textTransform: 'uppercase'
                        }}
                      >
                        {(activeGoal.affirmations || [])[activeAffirmationIdx % (activeGoal.affirmations || []).length]}
                      </span>
                    ) : (
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
                        {(activeGoal.affirmations || []).length === 0 ? "No affirmations configured. Inject some below." : 'Press "Start Intention Loops" to begin'}
                      </span>
                    )}
                  </div>

                  {/* Mode Settings checkbox mixers */}
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '16px' }}>
                    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>
                      <input
                        type="checkbox"
                        className="habit-checkbox"
                        style={{ width: '18px', height: '18px', borderColor: 'var(--color-gold)' }}
                        checked={subliminalActive}
                        onChange={(e) => {
                          setSubliminalActive(e.target.checked);
                          if (e.target.checked) setWhisperActive(false);
                        }}
                      />
                      ⚡ Subliminal Flash Mode
                    </label>

                    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>
                      <input
                        type="checkbox"
                        className="habit-checkbox"
                        style={{ width: '18px', height: '18px', borderColor: 'var(--color-gold)' }}
                        checked={whisperActive}
                        onChange={(e) => {
                          setWhisperActive(e.target.checked);
                          if (e.target.checked) setSubliminalActive(false);
                        }}
                      />
                      👁️ Subconscious Whisper Mode
                    </label>
                  </div>

                  {/* Loops control buttons */}
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                    <button
                      onClick={() => setAffirmationPlaying(!affirmationPlaying)}
                      className="btn-primary"
                      style={{
                        padding: '10px 18px',
                        fontSize: '0.85rem',
                        backgroundColor: affirmationPlaying ? 'var(--color-lavender)' : 'var(--color-amber)',
                        color: 'white',
                        boxShadow: 'none'
                      }}
                      disabled={(activeGoal.affirmations || []).length === 0}
                    >
                      {affirmationPlaying ? 'Pause Loops' : 'Start Intention Loops'}
                    </button>
                    <button
                      className="btn-secondary"
                      style={{ padding: '10px 18px', fontSize: '0.85rem' }}
                      onClick={() => {
                        setActiveAffirmationIdx(0);
                        setAffirmationPlaying(false);
                      }}
                    >
                      Reset
                    </button>
                  </div>

                  {/* Custom Affirmation Addition */}
                  <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                      Inject Custom Intention to this Goal
                    </label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="text"
                        className="text-input"
                        placeholder="e.g. I log aligned progress with joy..."
                        value={customAffirmation}
                        onChange={(e) => setCustomAffirmation(e.target.value)}
                        style={{ padding: '8px 12px', fontSize: '0.85rem', flexGrow: 1 }}
                        aria-label="Custom affirmation loop text input"
                      />
                      <button
                        className="btn-primary"
                        style={{ padding: '8px 16px', fontSize: '0.85rem', whiteSpace: 'nowrap', backgroundColor: 'var(--color-sage)', color: 'white', boxShadow: 'none' }}
                        onClick={() => {
                          if (!customAffirmation.trim()) return;
                          const updated = goals.map((goal, gIdx) => {
                            if (gIdx === activeGoalIndex) {
                              return { ...goal, affirmations: [...(goal.affirmations || []), customAffirmation.trim()] };
                            }
                            return goal;
                          });
                          setGoals(updated);
                          setCustomAffirmation('');
                          triggerConfettiAnimation();
                        }}
                      >
                        Inject +
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. WATER CHARGING TECHNIQUE */}
              {activeTechniqueTab === 'water' && (
                <div className="fade-in base-card" style={{ textAlign: 'left', maxWidth: '650px', margin: '0 auto', padding: '32px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
                      <Sparkles size={22} color="var(--color-gold)" /> Sonic Water Charger
                    </h3>
                    <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', padding: '2px 8px', borderRadius: '10px', backgroundColor: 'rgba(6, 182, 212, 0.15)', color: '#06b6d4', fontWeight: 700 }}>
                      Hydro-Acoustics
                    </span>
                  </div>

                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.45 }}>
                    Acoustic vibrations influence molecular structural ordering. Charge your glass of water with subharmonics of <strong style={{ color: 'var(--color-amber)' }}>{activeGoal.frequency}Hz</strong> before drinking.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '24px 0', gap: '16px' }}>
                    
                    {/* Pulsing glass of water container */}
                    <div style={{
                      position: 'relative',
                      width: '180px',
                      height: '180px',
                      borderRadius: '50%',
                      background: 'rgba(0,0,0,0.1)',
                      border: '2px dashed var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: waterPhase === 'charging' ? '0 0 32px rgba(6, 182, 212, 0.25)' : waterPhase === 'charged' ? '0 0 32px rgba(52, 211, 153, 0.35)' : 'none',
                      transition: 'all 500ms'
                    }}>
                      
                      {/* Subharmonic concentric waves */}
                      {waterPhase === 'charging' && (
                        <div className="water-rippler" style={{
                          position: 'absolute',
                          inset: '10px',
                          border: '2px solid rgba(6, 182, 212, 0.4)',
                          borderRadius: '50%',
                          animation: 'rippleWave 1.8s infinite linear'
                        }} />
                      )}

                      {/* Charged light aura */}
                      {waterPhase === 'charged' && (
                        <div style={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '50%',
                          background: 'radial-gradient(circle, rgba(52, 211, 153, 0.25) 0%, transparent 75%)',
                          animation: 'pulseGlow 2s infinite ease-in-out'
                        }} />
                      )}

                      {/* Glass goblet icon vector */}
                      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <svg width="60" height="75" viewBox="0 0 24 24" fill="none" stroke={waterPhase === 'charged' ? 'var(--color-sage)' : waterPhase === 'charging' ? '#06b6d4' : 'var(--text-primary)'} strokeWidth="1.5" style={{ transition: 'stroke 300ms' }}>
                          <path d="M5 2V8C5 11.87 8.13 15 12 15C15.87 15 19 11.87 19 8V2" fill={waterPhase === 'charging' ? 'rgba(6, 182, 212, 0.2)' : waterPhase === 'charged' ? 'rgba(52, 211, 153, 0.3)' : 'none'} />
                          <path d="M12 15V22M8 22H16" />
                        </svg>
                        {waterPhase === 'charging' && (
                          <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#06b6d4', marginTop: '6px' }}>{waterTimer}s</span>
                        )}
                        {waterPhase === 'charged' && (
                          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-sage)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '6px' }}>Charged ✓</span>
                        )}
                      </div>
                    </div>

                    <div style={{ textAlign: 'center', maxWidth: '380px' }}>
                      {waterPhase === 'idle' && (
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                          Place your glass of water next to your speakers. Play the goal frequency and click below.
                        </p>
                      )}
                      {waterPhase === 'charging' && (
                        <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#06b6d4' }}>
                          Charging with intention: <strong style={{ color: 'var(--text-primary)' }}>"{(activeGoal.affirmations || ["Abundance"])[0]}"</strong>
                        </p>
                      )}
                      {waterPhase === 'charged' && (
                        <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-sage)' }}>
                          Intention structured. Drink slowly while reflecting on your daily scheduler hours.
                        </p>
                      )}
                    </div>

                    <div style={{ display: 'flex', gap: '12px' }}>
                      {waterPhase === 'idle' && (
                        <button className="btn-primary" onClick={startWaterCharging} style={{ backgroundColor: 'var(--color-amber)', color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Play size={16} /> Start Acoustic Charging
                        </button>
                      )}
                      {waterPhase === 'charging' && (
                        <button className="btn-secondary" onClick={() => {
                          if (waterIntervalRef.current) clearInterval(waterIntervalRef.current);
                          setWaterPhase('idle');
                        }} style={{ color: 'red', borderColor: 'rgba(255,0,0,0.2)' }}>
                          Cancel
                        </button>
                      )}
                      {waterPhase === 'charged' && (
                        <button className="btn-primary" onClick={() => setWaterPhase('idle')} style={{ backgroundColor: 'var(--color-sage)', color: 'white' }}>
                          Charge Another Vessel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* 4. HOOPONOPONO MEDITATION */}
              {activeTechniqueTab === 'hooponopono' && (
                <div className="fade-in base-card" style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto', padding: '40px 32px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', textAlign: 'left' }}>
                    <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
                      <Heart size={22} color="var(--color-orange)" /> Ho'oponopono Cleansing Chamber
                    </h3>
                  </div>

                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '32px', textAlign: 'left', lineHeight: 1.45 }}>
                    Cleanse subconscious trauma, doubt, and resistance loops regarding <strong style={{ color: 'var(--color-amber)' }}>{activeGoal.name}</strong>. Repeat these statements internally with deep, rhythmic breaths.
                  </p>

                  {/* Mantra visualization panel */}
                  <div style={{
                    height: '180px',
                    borderRadius: '20px',
                    backgroundColor: 'rgba(0,0,0,0.18)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '32px',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    {/* Glowing background halo */}
                    <div style={{
                      position: 'absolute',
                      width: '120px',
                      height: '120px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(255,158,0,0.18) 0%, transparent 70%)',
                      animation: 'pulseGlow 4.5s infinite ease-in-out'
                    }} />

                    {/* Mantra text transition stack */}
                    <span style={{
                      fontSize: '2.1rem',
                      fontWeight: 800,
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-accent)',
                      letterSpacing: '-1px',
                      animation: 'fadeTextInOut 4.5s infinite ease-in-out'
                    }}>
                      {
                        hoopIndex === 0 ? "I AM SORRY."
                        : hoopIndex === 1 ? "PLEASE FORGIVE ME."
                        : hoopIndex === 2 ? "THANK YOU."
                        : "I LOVE YOU."
                      }
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginTop: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      Statement {hoopIndex + 1} of 4
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                    {[0, 1, 2, 3].map(i => (
                      <div
                        key={i}
                        onClick={() => setHoopIndex(i)}
                        style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: hoopIndex === i ? 'var(--color-amber)' : 'rgba(255,255,255,0.12)',
                          cursor: 'pointer',
                          transition: 'all 300ms'
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* 5. FUTURE-SELF SCRIPTING */}
              {activeTechniqueTab === 'scripting' && (
                <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '750px', margin: '0 auto' }}>
                  
                  {/* Parchment Editor card */}
                  <div className="base-card" style={{ 
                    textAlign: 'left', 
                    background: theme === 'dark' ? 'linear-gradient(135deg, #2b2824 0%, #1c1a17 100%)' : 'linear-gradient(135deg, #fefbf3 0%, #fcf7e8 100%)',
                    borderColor: 'rgba(217, 187, 119, 0.4)',
                    boxShadow: '0 8px 30px rgba(217, 187, 119, 0.15)',
                    padding: '32px'
                  }}>
                    <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-accent)', color: theme === 'dark' ? '#f5efe0' : '#854d0e', marginBottom: '8px', fontWeight: 700 }}>
                      📜 Script Future-Self Letters
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: 1.45 }}>
                      Write a letter dated 1 year in the future. Describe the reality where you've fully completed: <strong style={{ color: 'var(--color-amber)' }}>{activeGoal.name}</strong>. Write in the present tense, as if it is already yours.
                    </p>

                    <textarea
                      value={scriptingText}
                      onChange={(e) => setScriptingText(e.target.value)}
                      className="text-input"
                      placeholder="My Dear Self, I am writing this in absolute gratitude. Today is one year later, and I have completed my goal. Every day on the scheduler built this..."
                      style={{
                        minHeight: '200px',
                        background: 'transparent',
                        borderColor: 'rgba(217, 187, 119, 0.3)',
                        fontFamily: 'serif',
                        fontSize: '1.05rem',
                        lineHeight: 1.6,
                        color: theme === 'dark' ? '#f5efe0' : '#451a03',
                        padding: '16px'
                      }}
                    />

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                      <button
                        className="btn-primary"
                        onClick={handleSaveScriptingLetter}
                        disabled={!scriptingText.trim()}
                        style={{
                          backgroundColor: '#854d0e',
                          color: '#fff',
                          boxShadow: 'none',
                          border: 'none',
                          padding: '10px 20px',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.88rem',
                          fontWeight: 700
                        }}
                      >
                        Fold & Manifest Letter 📜
                      </button>
                    </div>
                  </div>

                  {/* Letters stack history */}
                  {activeGoal.scriptingLetters && activeGoal.scriptingLetters.length > 0 && (
                    <div style={{ textAlign: 'left' }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '12px', color: 'var(--text-primary)' }}>
                        Manifested Letters History ({activeGoal.scriptingLetters.length})
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {activeGoal.scriptingLetters.map((letter) => (
                          <div 
                            key={letter.id} 
                            className="base-card"
                            style={{
                              padding: '16px 20px',
                              background: theme === 'dark' ? 'rgba(30,30,30,0.3)' : 'rgba(255,255,255,0.4)',
                              border: '1px dashed rgba(217, 187, 119, 0.3)'
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-amber)' }}>MANIFESTED PORTAL</span>
                              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{letter.date}</span>
                            </div>
                            <p style={{ fontSize: '0.95rem', fontFamily: 'serif', whiteSpace: 'pre-wrap', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                              {letter.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 6. VISION BOARD CANVAS */}
              {activeTechniqueTab === 'drawing' && (
                <div className="fade-in base-card" style={{ textAlign: 'left', maxWidth: '650px', margin: '0 auto' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
                      <Compass size={22} color="var(--color-green)" /> Vision Drawing Canvas
                    </h3>
                    <button className="nav-link-btn" onClick={handleClearCanvas} style={{ fontSize: '0.78rem' }}>
                      Clear Canvas
                    </button>
                  </div>

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.45 }}>
                    Sketch a physical symbol, target amount, or visual layout of your success. It will immediately show up on your Dashboard vision board card!
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
                    
                    {/* Brush control panel */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: '10px 16px',
                      backgroundColor: 'rgba(0,0,0,0.1)',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      flexWrap: 'wrap',
                      gap: '12px'
                    }}>
                      
                      {/* Color palette presets */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Brush:</span>
                        {[
                          { id: '#fde047', name: 'Gold' },
                          { id: '#34d399', name: 'Sage' },
                          { id: '#a78bfa', name: 'Lavender' },
                          { id: '#06b6d4', name: 'Cyan' },
                          { id: '#ef4444', name: 'Rose' },
                          { id: '#ffffff', name: 'White' },
                          { id: '#0f172a', name: 'Dark' }
                        ].map(c => (
                          <button
                            key={c.id}
                            onClick={() => setBrushColor(c.id)}
                            style={{
                              width: '20px',
                              height: '20px',
                              borderRadius: '50%',
                              backgroundColor: c.id,
                              border: brushColor === c.id ? '2px solid var(--color-amber)' : '1px solid rgba(255,255,255,0.2)',
                              cursor: 'pointer',
                              padding: 0
                            }}
                            title={c.name}
                            aria-label={`Select brush color ${c.name}`}
                          />
                        ))}
                      </div>

                      {/* Size slider */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Size:</span>
                        <input
                          type="range"
                          min="1"
                          max="20"
                          value={brushSize}
                          onChange={(e) => setBrushSize(Number(e.target.value))}
                          style={{ width: '80px', accentColor: 'var(--color-amber)', cursor: 'pointer' }}
                          aria-label="Brush size"
                        />
                        <span style={{ fontSize: '0.75rem', width: '20px' }}>{brushSize}px</span>
                      </div>
                    </div>

                    {/* Canvas Area */}
                    <div style={{ width: '100%', position: 'relative' }}>
                      <canvas
                        ref={drawingCanvasRef}
                        width="500"
                        height="320"
                        style={{
                          backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff',
                          border: '1px solid var(--border-color)',
                          borderRadius: '12px',
                          cursor: 'crosshair',
                          width: '100%',
                          height: '320px',
                          touchAction: 'none'
                        }}
                        onMouseDown={handleCanvasMouseDown}
                        onMouseMove={handleCanvasMouseMove}
                        onMouseUp={handleCanvasMouseUp}
                        onMouseLeave={handleCanvasMouseUp}
                        onTouchStart={handleCanvasTouchStart}
                        onTouchMove={handleCanvasTouchMove}
                        onTouchEnd={handleCanvasMouseUp}
                      />
                    </div>

                    <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end', gap: '10px' }}>
                      <button className="btn-secondary" onClick={handleClearCanvas}>
                        Reset Board
                      </button>
                      <button className="btn-primary" onClick={handleSaveCanvas} style={{ backgroundColor: 'var(--color-sage)', color: 'white' }}>
                        Save to Vision Board 🎨
                      </button>
                    </div>
                  </div>
                </div>
              )}

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
        <button className={`mobile-nav-item ${activeTab === 'manifest' ? 'active' : ''}`} onClick={() => setActiveTab('manifest')}>
          <Sparkles size={20} style={{ color: 'var(--color-gold)' }} />
          <span>Manifest</span>
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

      {/* Interactive Onboarding Tour Overlay */}
      {showTour && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          maxWidth: '380px',
          width: 'calc(100vw - 48px)',
          animation: 'slideUp 350ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          <div className="base-card" style={{
            padding: '24px',
            background: 'var(--bg-secondary)',
            border: '2px solid var(--color-gold)',
            boxShadow: '0 12px 40px rgba(255, 195, 0, 0.25)',
            backdropFilter: 'blur(16px)',
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-amber)', letterSpacing: '1px' }}>
                Manifestor Tour Guide 🧭
              </span>
              <button 
                onClick={() => {
                  setShowTour(false);
                  localStorage.setItem('manifestor_tour_completed', 'true');
                }}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
                aria-label="Skip onboarding tour"
              >
                <X size={16} />
              </button>
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {TOUR_STEPS[tourStep].title}
            </h3>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {TOUR_STEPS[tourStep].text}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>
                Step {tourStep + 1} of {TOUR_STEPS.length}
              </span>
              
              <div style={{ display: 'flex', gap: '8px' }}>
                {tourStep > 0 && (
                  <button
                    className="btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '0.8rem', cursor: 'pointer' }}
                    onClick={() => {
                      const prevStep = tourStep - 1;
                      setTourStep(prevStep);
                      setActiveTab(TOUR_STEPS[prevStep].tab);
                      if (TOUR_STEPS[prevStep].techTab) {
                        setActiveTechniqueTab(TOUR_STEPS[prevStep].techTab);
                      }
                    }}
                  >
                    Back
                  </button>
                )}
                
                <button
                  className="btn-primary"
                  style={{ padding: '6px 16px', fontSize: '0.8rem', backgroundColor: 'var(--color-amber)', color: '#1b1a18', fontWeight: 700, cursor: 'pointer', border: 'none', borderRadius: '4px' }}
                  onClick={() => {
                    if (tourStep < TOUR_STEPS.length - 1) {
                      const nextStep = tourStep + 1;
                      setTourStep(nextStep);
                      setActiveTab(TOUR_STEPS[nextStep].tab);
                      if (TOUR_STEPS[nextStep].techTab) {
                        setActiveTechniqueTab(TOUR_STEPS[nextStep].techTab);
                      }
                    } else {
                      setShowTour(false);
                      localStorage.setItem('manifestor_tour_completed', 'true');
                    }
                  }}
                >
                  {tourStep === TOUR_STEPS.length - 1 ? 'Get Aligned ✨' : 'Next'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ----------------- STEP-BY-STEP GUIDED MANIFESTATION SESSION OVERLAY ----------------- */}
      {isGuidedSessionActive && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: theme === 'dark' ? 'rgba(15, 23, 42, 0.98)' : 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(30px)',
          zIndex: 100000,
          display: 'flex',
          flexDirection: 'column',
          animation: 'fadeIn 300ms ease-out',
          color: 'var(--text-primary)',
          overflowY: 'auto'
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 40px',
            borderBottom: '1px solid var(--border-color)',
            background: 'rgba(0,0,0,0.02)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left' }}>
              <span style={{ fontSize: '1.4rem' }}>⚡</span>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Guided Daily Manifestation Session</h2>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Goal: <strong style={{ color: 'var(--color-amber)' }}>{goals[guidedGoalIndex]?.name}</strong> ({goals[guidedGoalIndex]?.frequency}Hz)</span>
              </div>
            </div>

            <button
              onClick={() => {
                stopManifestingMusic();
                setIsGuidedSessionActive(false);
              }}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.9rem',
                fontWeight: 700
              }}
            >
              Exit Session <X size={20} />
            </button>
          </div>

          {/* Main Workspace Body */}
          <div style={{
            display: 'flex',
            flexGrow: 1,
            flexDirection: 'row',
            width: '100%',
            maxWidth: '1400px',
            margin: '0 auto',
            minHeight: 0
          }} className="guided-session-layout">
            
            {/* Left Sidebar Checklist Tracker */}
            <div style={{
              width: '320px',
              borderRight: '1px solid var(--border-color)',
              padding: '40px 30px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              textAlign: 'left'
            }} className="guided-sidebar">
              <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 800, color: 'var(--text-secondary)', margin: 0 }}>
                Routine Checklist
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {getGuidedSteps(goals[guidedGoalIndex]).map((step, idx) => {
                  const isActive = idx === guidedStepIndex;
                  const isCompleted = idx < guidedStepIndex;
                  
                  return (
                    <div 
                      key={step.key}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        backgroundColor: isActive ? 'rgba(255, 158, 0, 0.08)' : 'transparent',
                        border: isActive ? '1px solid var(--color-amber)' : '1px solid transparent',
                        transition: 'all 200ms'
                      }}
                    >
                      <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: isCompleted ? 'var(--color-sage)' : isActive ? 'var(--color-amber)' : 'rgba(255,255,255,0.06)',
                        color: isCompleted || isActive ? '#1b1a18' : 'var(--text-tertiary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 800
                      }}>
                        {isCompleted ? '✓' : idx + 1}
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ 
                          fontSize: '0.9rem', 
                          fontWeight: isActive ? 700 : 500,
                          color: isActive ? 'var(--text-primary)' : isCompleted ? 'var(--text-secondary)' : 'var(--text-tertiary)'
                        }}>
                          {step.label}
                        </span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>{step.icon} Step</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  <span className="led-indicator led-sage led-pulse"></span>
                  <span>Audio Sync Active ({goals[guidedGoalIndex]?.frequency}Hz)</span>
                </div>
              </div>
            </div>

            {/* Right Pane / Step Chamber Container */}
            <div style={{
              flexGrow: 1,
              padding: '50px 80px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              overflowY: 'auto'
            }} className="guided-main-content">
              
              <div style={{ width: '100%', maxWidth: '700px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
                
                {/* ----------------- STEP: INTRO / CALIBRATION ----------------- */}
                {getGuidedSteps(goals[guidedGoalIndex])[guidedStepIndex]?.key === 'intro' && (
                  <div className="fade-in" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '20px' }} className="float">🪐</div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '12px' }}>Mind & Acoustic Calibration</h2>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '40px' }}>
                      We are automatically starting the synthesized sound generator at the target frequency of <strong>{goals[guidedGoalIndex]?.frequency}Hz</strong>. 
                      Close your eyes, feel the sonic subharmonics, and align your energy state.
                    </p>

                    {/* Progress loader */}
                    <div style={{ position: 'relative', width: '220px', height: '220px', margin: '0 auto 40px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="220" height="220" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                        <circle cx="50" cy="50" r="40" stroke="var(--border-color)" strokeWidth="4" fill="none" />
                        <circle cx="50" cy="50" r="40" stroke="var(--color-amber)" strokeWidth="4" fill="none" strokeDasharray="251.2" strokeDashoffset={251.2 - (guidedCalibrationTime / 15) * 251.2} style={{ transition: 'stroke-dashoffset 1s linear' }} />
                      </svg>
                      <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--color-gold)' }}>{guidedCalibrationTime}s</span>
                        <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.7 }}>Aligning</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                      <button 
                        className="btn-primary" 
                        style={{ padding: '12px 30px', fontSize: '0.95rem', backgroundColor: 'var(--color-amber)', color: '#1b1a18', fontWeight: 800 }}
                        onClick={() => advanceGuidedStep()}
                      >
                        Skip & Breathe →
                      </button>
                    </div>
                  </div>
                )}

                {/* ----------------- STEP: BREATHING ----------------- */}
                {getGuidedSteps(goals[guidedGoalIndex])[guidedStepIndex]?.key === 'breathing' && (
                  <div className="fade-in" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '20px' }}>💨</div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '12px' }}>Heart-Coherence Box Breathing</h2>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '32px' }}>
                      Coordinate your breathing cycles. Synchronize your lungs with the expanding and contracting coherence circle to achieve grounding.
                    </p>

                    <div style={{
                      position: 'relative',
                      width: '200px',
                      height: '200px',
                      margin: '0 auto 40px auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <div 
                        className={`breathing-ring phase-${guidedBreathingPhase.toLowerCase().replace(/[^a-z]/g, '')}`}
                        style={{
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          borderRadius: '50%',
                          transition: 'all 4000ms cubic-bezier(0.4, 0, 0.2, 1)',
                          zIndex: 0
                        }}
                      />
                      
                      <div style={{
                        position: 'relative',
                        zIndex: 2,
                        width: '130px',
                        height: '130px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--bg-secondary)',
                        border: '2px solid var(--border-color)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <span style={{ fontSize: '1rem', fontWeight: 800 }}>{guidedBreathingPhase.toUpperCase()}</span>
                        <span style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--color-gold)', marginTop: '4px' }}>{guidedBreathingTime}s</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                      <button 
                        className="btn-primary" 
                        style={{ padding: '12px 30px', fontSize: '0.95rem', backgroundColor: 'var(--color-amber)', color: '#1b1a18', fontWeight: 800 }}
                        onClick={() => advanceGuidedStep()}
                      >
                        Skip & Loop Affirmations →
                      </button>
                    </div>
                  </div>
                )}

                {/* ----------------- STEP: AFFIRMATIONS ----------------- */}
                {getGuidedSteps(goals[guidedGoalIndex])[guidedStepIndex]?.key === 'affirmations' && (
                  <div className="fade-in" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '20px' }}>⚡</div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '12px' }}>Subconscious Intention Loops</h2>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '32px' }}>
                      Let these positive suggestions sink into your mind. Feel them as absolute, existing truth.
                    </p>

                    <div style={{
                      minHeight: '140px',
                      backgroundColor: 'rgba(0,0,0,0.2)',
                      borderRadius: '20px',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '24px',
                      marginBottom: '32px',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      <span style={{
                        fontSize: subliminalActive ? '1.5rem' : '1.25rem',
                        fontWeight: 800,
                        letterSpacing: subliminalActive ? '1px' : 'normal',
                        textTransform: 'uppercase',
                        opacity: whisperActive ? 0.015 : 1,
                        transition: subliminalActive ? 'none' : 'opacity 400ms ease-in-out'
                      }}>
                        {(goals[guidedGoalIndex]?.affirmations || [])[activeAffirmationIdx % (goals[guidedGoalIndex]?.affirmations || []).length] || 'Aligning Desires'}
                      </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '32px', flexWrap: 'wrap' }}>
                      <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600 }}>
                        <input
                          type="checkbox"
                          className="habit-checkbox"
                          style={{ width: '18px', height: '18px', borderColor: 'var(--color-gold)' }}
                          checked={subliminalActive}
                          onChange={(e) => {
                            setSubliminalActive(e.target.checked);
                            if (e.target.checked) setWhisperActive(false);
                          }}
                        />
                        ⚡ Subliminal Flash
                      </label>
                      <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600 }}>
                        <input
                          type="checkbox"
                          className="habit-checkbox"
                          style={{ width: '18px', height: '18px', borderColor: 'var(--color-gold)' }}
                          checked={whisperActive}
                          onChange={(e) => {
                            setWhisperActive(e.target.checked);
                            if (e.target.checked) setSubliminalActive(false);
                          }}
                        />
                        👁️ Whisper Mode
                      </label>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                      <button 
                        className="btn-primary" 
                        style={{ padding: '12px 30px', fontSize: '0.95rem', backgroundColor: 'var(--color-amber)', color: '#1b1a18', fontWeight: 800 }}
                        onClick={() => advanceGuidedStep()}
                      >
                        Proceed to Techniques →
                      </button>
                    </div>
                  </div>
                )}

                {/* ----------------- STEP: WATER CHARGER ----------------- */}
                {getGuidedSteps(goals[guidedGoalIndex])[guidedStepIndex]?.key === 'water' && (
                  <div className="fade-in" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '20px' }}>💧</div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '12px' }}>Sonic Water Charging</h2>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
                      Place your glass of water nearby. We will structure its molecules using acoustic vibrations at <strong>{goals[guidedGoalIndex]?.frequency}Hz</strong>.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', marginBottom: '32px' }}>
                      <div style={{
                        position: 'relative',
                        width: '160px',
                        height: '160px',
                        borderRadius: '50%',
                        background: 'rgba(0,0,0,0.1)',
                        border: '2px dashed var(--border-color)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: guidedWaterPhase === 'charging' ? '0 0 32px rgba(6, 182, 212, 0.25)' : guidedWaterPhase === 'charged' ? '0 0 32px rgba(52, 211, 153, 0.35)' : 'none',
                        transition: 'all 500ms'
                      }}>
                        {guidedWaterPhase === 'charging' && (
                          <div className="water-rippler" style={{
                            position: 'absolute',
                            inset: '10px',
                            border: '2px solid rgba(6, 182, 212, 0.4)',
                            borderRadius: '50%',
                            animation: 'rippleWave 1.8s infinite linear'
                          }} />
                        )}
                        {guidedWaterPhase === 'charged' && (
                          <div style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(52, 211, 153, 0.25) 0%, transparent 75%)',
                            animation: 'pulseGlow 2s infinite ease-in-out'
                          }} />
                        )}
                        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <svg width="50" height="65" viewBox="0 0 24 24" fill="none" stroke={guidedWaterPhase === 'charged' ? 'var(--color-sage)' : guidedWaterPhase === 'charging' ? '#06b6d4' : 'var(--text-primary)'} strokeWidth="1.5">
                            <path d="M5 2V8C5 11.87 8.13 15 12 15C15.87 15 19 11.87 19 8V2" fill={guidedWaterPhase === 'charging' ? 'rgba(6, 182, 212, 0.2)' : guidedWaterPhase === 'charged' ? 'rgba(52, 211, 153, 0.3)' : 'none'} />
                            <path d="M12 15V22M8 22H16" />
                          </svg>
                          {guidedWaterPhase === 'charging' && <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#06b6d4', marginTop: '6px' }}>{guidedWaterTime}s</span>}
                          {guidedWaterPhase === 'charged' && <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-sage)', textTransform: 'uppercase', marginTop: '6px' }}>Charged ✓</span>}
                        </div>
                      </div>

                      {guidedWaterPhase === 'idle' && (
                        <button className="btn-primary" onClick={startGuidedWaterCharging} style={{ backgroundColor: 'var(--color-amber)', color: '#1a1b18', fontWeight: 800 }}>
                          Start Charging Timer
                        </button>
                      )}
                      {guidedWaterPhase === 'charging' && <p style={{ fontSize: '0.85rem', color: '#06b6d4', fontWeight: 600 }}>Infusing frequency ripples...</p>}
                      {guidedWaterPhase === 'charged' && (
                        <p style={{ fontSize: '0.85rem', color: 'var(--color-sage)', fontWeight: 600 }}>Sonic structuring complete. Drink your structured water!</p>
                      )}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                      <button 
                        className="btn-primary" 
                        style={{ padding: '12px 30px', fontSize: '0.95rem', backgroundColor: 'var(--color-sage)', color: 'white', fontWeight: 800 }}
                        onClick={() => advanceGuidedStep()}
                        disabled={guidedWaterPhase === 'charging'}
                      >
                        Next Step →
                      </button>
                    </div>
                  </div>
                )}

                {/* ----------------- STEP: HO'OPONOPONO ----------------- */}
                {getGuidedSteps(goals[guidedGoalIndex])[guidedStepIndex]?.key === 'hooponopono' && (
                  <div className="fade-in" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '20px' }}>💖</div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '12px' }}>Ho'oponopono Cleansing</h2>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '32px' }}>
                      Release subconscious trauma or doubt about this goal. Repeat each statement internally as they cycle.
                    </p>

                    <div style={{
                      height: '160px',
                      borderRadius: '20px',
                      backgroundColor: 'rgba(0,0,0,0.18)',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '32px',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        position: 'absolute',
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(255,158,0,0.15) 0%, transparent 70%)',
                        animation: 'pulseGlow 4.5s infinite ease-in-out'
                      }} />

                      <span style={{
                        fontSize: '1.8rem',
                        fontWeight: 800,
                        animation: 'fadeTextInOut 4.5s infinite ease-in-out'
                      }}>
                        {
                          hoopIndex === 0 ? "I AM SORRY."
                          : hoopIndex === 1 ? "PLEASE FORGIVE ME."
                          : hoopIndex === 2 ? "THANK YOU."
                          : "I LOVE YOU."
                        }
                      </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                      <button 
                        className="btn-primary" 
                        style={{ padding: '12px 30px', fontSize: '0.95rem', backgroundColor: 'var(--color-amber)', color: '#1b1a18', fontWeight: 800 }}
                        onClick={() => advanceGuidedStep()}
                      >
                        Technique Completed →
                      </button>
                    </div>
                  </div>
                )}

                {/* ----------------- STEP: FUTURE-SELF SCRIPTING ----------------- */}
                {getGuidedSteps(goals[guidedGoalIndex])[guidedStepIndex]?.key === 'scripting' && (
                  <div className="fade-in" style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '16px' }}>📜</div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '8px', textAlign: 'center' }}>Future-Self Scripting Letter</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '24px', textAlign: 'center' }}>
                      Write a brief letter from 1 year in the future. Describe the reality where you've fully completed this desire, in present tense.
                    </p>

                    <textarea
                      value={scriptingText}
                      onChange={(e) => setScriptingText(e.target.value)}
                      className="text-input"
                      placeholder="My Dear Self, I am writing this in absolute gratitude. Today is one year later, and I have completed my goal..."
                      style={{
                        minHeight: '160px',
                        background: theme === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(255, 255, 255, 0.8)',
                        borderColor: 'rgba(217, 187, 119, 0.4)',
                        fontFamily: 'serif',
                        fontSize: '1rem',
                        lineHeight: 1.6,
                        padding: '16px',
                        marginBottom: '20px'
                      }}
                    />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <button className="btn-secondary" style={{ padding: '10px 20px', fontSize: '0.85rem' }} onClick={() => advanceGuidedStep()}>
                        Skip Letter
                      </button>
                      <button 
                        className="btn-primary" 
                        style={{ padding: '10px 24px', fontSize: '0.85rem', backgroundColor: '#854d0e', color: '#fff' }}
                        onClick={() => {
                          handleSaveScriptingLetter();
                          advanceGuidedStep();
                        }}
                        disabled={!scriptingText.trim()}
                      >
                        Fold & Manifest Portal 📜
                      </button>
                    </div>
                  </div>
                )}

                {/* ----------------- STEP: VISION CANVAS DRAWING ----------------- */}
                {getGuidedSteps(goals[guidedGoalIndex])[guidedStepIndex]?.key === 'drawing' && (
                  <div className="fade-in" style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '16px' }}>🎨</div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '8px', textAlign: 'center' }}>Vision Drawing Board</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '20px', textAlign: 'center' }}>
                      Sketch a physical symbol or visual anchor of success. It will blend onto your dashboard card.
                    </p>

                    {/* Simple brushes toolbar */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 16px',
                      backgroundColor: 'rgba(0,0,0,0.1)',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      marginBottom: '16px',
                      flexWrap: 'wrap',
                      gap: '8px'
                    }}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        {['#fde047', '#34d399', '#a78bfa', '#06b6d4', '#ffffff', '#0f172a'].map(c => (
                          <button
                            key={c}
                            onClick={() => setBrushColor(c)}
                            style={{
                              width: '18px',
                              height: '18px',
                              borderRadius: '50%',
                              backgroundColor: c,
                              border: brushColor === c ? '2px solid var(--color-amber)' : '1px solid rgba(255,255,255,0.2)',
                              cursor: 'pointer',
                              padding: 0
                            }}
                          />
                        ))}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '0.72rem' }}>Size:</span>
                        <input
                          type="range"
                          min="1"
                          max="20"
                          value={brushSize}
                          onChange={(e) => setBrushSize(Number(e.target.value))}
                          style={{ width: '60px', accentColor: 'var(--color-amber)' }}
                        />
                      </div>
                    </div>

                    <canvas
                      ref={guidedDrawingCanvasRef}
                      width="500"
                      height="280"
                      style={{
                        backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff',
                        border: '1px solid var(--border-color)',
                        borderRadius: '12px',
                        cursor: 'crosshair',
                        width: '100%',
                        height: '280px',
                        touchAction: 'none',
                        marginBottom: '20px'
                      }}
                      onMouseDown={handleCanvasMouseDown}
                      onMouseMove={handleCanvasMouseMove}
                      onMouseUp={handleCanvasMouseUp}
                      onMouseLeave={handleCanvasMouseUp}
                      onTouchStart={handleCanvasTouchStart}
                      onTouchMove={handleCanvasTouchMove}
                      onTouchEnd={handleCanvasMouseUp}
                    />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }} onClick={() => advanceGuidedStep()}>
                        Skip Sketch
                      </button>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }} onClick={handleClearCanvas}>
                          Clear
                        </button>
                        <button 
                          className="btn-primary" 
                          style={{ padding: '8px 20px', fontSize: '0.85rem', backgroundColor: 'var(--color-sage)', color: 'white' }}
                          onClick={() => {
                            handleSaveCanvas();
                            advanceGuidedStep();
                          }}
                        >
                          Save & Proceed 🎨
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* ----------------- STEP: ACTION SCHEDULER LOGGER ----------------- */}
                {getGuidedSteps(goals[guidedGoalIndex])[guidedStepIndex]?.key === 'tasks' && (
                  <div className="fade-in" style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '3.5rem', textAlign: 'center', marginBottom: '16px' }}>📅</div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '8px', textAlign: 'center' }}>Physical Action Scheduler</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '30px', textAlign: 'center' }}>
                      Alignment without action is incomplete. Log the focused hours you've spent on this goal's daily schedule today.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
                      {goals[guidedGoalIndex]?.tasks.map(task => (
                        <div 
                          key={task.id}
                          className="base-card"
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '14px 20px',
                            border: '1px solid var(--border-color)',
                            background: 'rgba(0,0,0,0.05)'
                          }}
                        >
                          <div>
                            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>{task.name}</h4>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Target: {task.targetHours} hours</span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <button className="nav-link-btn" onClick={() => handleLogHours(task.id, -0.5)} style={{ padding: '4px 10px', fontSize: '0.8rem' }}>-30m</button>
                            <span style={{ fontSize: '0.9rem', fontWeight: 800, minWidth: '40px', textAlign: 'center' }}>{task.loggedHours}h</span>
                            <button className="nav-link-btn" onClick={() => handleLogHours(task.id, 0.5)} style={{ padding: '4px 10px', fontSize: '0.8rem' }}>+30m</button>
                            <button className="nav-link-btn" onClick={() => handleLogHours(task.id, 1)} style={{ padding: '4px 10px', fontSize: '0.8rem', backgroundColor: 'rgba(255,195,0,0.06)' }}>+1h</button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <button 
                        className="btn-primary" 
                        style={{ padding: '12px 36px', fontSize: '0.95rem', backgroundColor: 'var(--color-amber)', color: '#1b1a18', fontWeight: 800 }}
                        onClick={() => advanceGuidedStep()}
                      >
                        Submit Log & Complete ⚡
                      </button>
                    </div>
                  </div>
                )}

                {/* ----------------- STEP: COMPLETE ----------------- */}
                {getGuidedSteps(goals[guidedGoalIndex])[guidedStepIndex]?.key === 'complete' && (
                  <div className="fade-in" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '5rem', marginBottom: '24px' }}>✨</div>
                    <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '12px', color: 'var(--color-gold)' }}>Fully Aligned!</h2>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px', maxWidth: '520px', margin: '0 auto 32px auto' }}>
                      Congratulations! You have completed your daily alignment and physical logging sequence for <strong>{goals[guidedGoalIndex]?.name}</strong>.
                    </p>

                    {/* Streak boost highlight */}
                    <div style={{
                      display: 'inline-flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: '16px 32px',
                      borderRadius: '16px',
                      backgroundColor: 'rgba(16, 185, 129, 0.08)',
                      border: '1px dashed var(--color-green)',
                      marginBottom: '40px'
                    }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-green)', textTransform: 'uppercase', letterSpacing: '1px' }}>Streak Active</span>
                      <span style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-primary)', marginTop: '4px' }}>🔥 {streak} Days</span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Consistency multiplier active</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <button 
                        className="btn-primary" 
                        style={{ padding: '14px 44px', fontSize: '1rem', backgroundColor: 'var(--color-green)', color: 'white', fontWeight: 800 }}
                        onClick={() => {
                          setIsGuidedSessionActive(false);
                          stopManifestingMusic();
                        }}
                      >
                        Done & Close Space ✨
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default App;
