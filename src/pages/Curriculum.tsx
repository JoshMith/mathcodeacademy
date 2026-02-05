import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Code2, 
  Brain, 
  Shield, 
  Network,
  ChevronRight,
  Clock,
  CheckCircle2,
  Server,
  Cpu
} from "lucide-react";
import { Link } from "react-router-dom";
import { useProgress } from "@/hooks/useProgress";
import { allLessons } from "@/data/lessons";

// Build tracks from lesson data - modules must match allLessons moduleId values exactly
const tracks = [
  {
    id: "foundation",
    title: "Foundation Track",
    description: "Build your mathematical foundation with essential concepts for programming.",
    icon: BookOpen,
    color: "bg-primary",
    textColor: "text-primary",
    borderColor: "border-primary/30",
    level: "Beginner",
    modules: [
      {
        id: "number-systems",
        title: "Number Systems & Binary",
        lessons: allLessons.filter(l => l.trackId === "foundation" && l.moduleId === "number-systems"),
      },
      {
        id: "boolean-algebra",
        title: "Boolean Algebra & Logic",
        lessons: allLessons.filter(l => l.trackId === "foundation" && l.moduleId === "boolean-algebra"),
      },
      {
        id: "set-theory",
        title: "Set Theory & Relations",
        lessons: allLessons.filter(l => l.trackId === "foundation" && l.moduleId === "set-theory"),
      },
    ],
  },
  {
    id: "core",
    title: "Core Programming Math",
    description: "Essential mathematics for algorithm design and software development.",
    icon: Code2,
    color: "bg-accent",
    textColor: "text-accent",
    borderColor: "border-accent/30",
    level: "Intermediate",
    modules: [
      {
        id: "linear-algebra",
        title: "Linear Algebra",
        lessons: allLessons.filter(l => l.trackId === "core" && l.moduleId === "linear-algebra"),
      },
      {
        id: "calculus",
        title: "Calculus for Programming",
        lessons: allLessons.filter(l => l.trackId === "core" && l.moduleId === "calculus"),
      },
      {
        id: "probability",
        title: "Probability & Statistics",
        lessons: allLessons.filter(l => l.trackId === "core" && l.moduleId === "probability"),
      },
    ],
  },
  {
    id: "ml-ai",
    title: "Machine Learning & AI",
    description: "Advanced mathematics powering modern AI and machine learning systems.",
    icon: Brain,
    color: "bg-[hsl(330,85%,60%)]",
    textColor: "text-[hsl(330,85%,60%)]",
    borderColor: "border-[hsl(330,85%,60%)]/30",
    level: "Advanced",
    modules: [
      {
        id: "fundamentals",
        title: "ML Fundamentals",
        lessons: allLessons.filter(l => l.trackId === "ml-ai" && l.moduleId === "fundamentals"),
      },
      {
        id: "neural-networks",
        title: "Neural Networks",
        lessons: allLessons.filter(l => l.trackId === "ml-ai" && l.moduleId === "neural-networks"),
      },
      {
        id: "advanced",
        title: "Advanced Topics",
        lessons: allLessons.filter(l => l.trackId === "ml-ai" && l.moduleId === "advanced"),
      },
    ],
  },
  {
    id: "algorithms",
    title: "Algorithms & Data Structures",
    description: "Master algorithm design and analysis for efficient problem solving.",
    icon: Cpu,
    color: "bg-success",
    textColor: "text-success",
    borderColor: "border-success/30",
    level: "Advanced",
    modules: [
      {
        id: "complexity",
        title: "Complexity Analysis",
        lessons: allLessons.filter(l => l.trackId === "algorithms" && l.moduleId === "complexity"),
      },
      {
        id: "searching",
        title: "Searching Algorithms",
        lessons: allLessons.filter(l => l.trackId === "algorithms" && l.moduleId === "searching"),
      },
      {
        id: "sorting",
        title: "Sorting Algorithms",
        lessons: allLessons.filter(l => l.trackId === "algorithms" && l.moduleId === "sorting"),
      },
    ],
  },
  {
    id: "networking",
    title: "Networking & IoT",
    description: "Network protocols, communication, and IoT fundamentals.",
    icon: Network,
    color: "bg-warning",
    textColor: "text-warning",
    borderColor: "border-warning/30",
    level: "Advanced",
    modules: [
      {
        id: "protocols",
        title: "Network Protocols",
        lessons: allLessons.filter(l => l.trackId === "networking" && l.moduleId === "protocols"),
      },
      {
        id: "security",
        title: "Network Security",
        lessons: allLessons.filter(l => l.trackId === "networking" && l.moduleId === "security"),
      },
      {
        id: "iot",
        title: "IoT Communication",
        lessons: allLessons.filter(l => l.trackId === "networking" && l.moduleId === "iot"),
      },
    ],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    description: "Security principles, authentication, and secure coding practices.",
    icon: Shield,
    color: "bg-destructive",
    textColor: "text-destructive",
    borderColor: "border-destructive/30",
    level: "Advanced",
    modules: [
      {
        id: "fundamentals",
        title: "Security Fundamentals",
        lessons: allLessons.filter(l => l.trackId === "cybersecurity" && l.moduleId === "fundamentals"),
      },
      {
        id: "web",
        title: "Web Security",
        lessons: allLessons.filter(l => l.trackId === "cybersecurity" && l.moduleId === "web"),
      },
    ],
  },
  {
    id: "systems",
    title: "System Architecture",
    description: "Design scalable, reliable, and maintainable systems.",
    icon: Server,
    color: "bg-[hsl(280,85%,60%)]",
    textColor: "text-[hsl(280,85%,60%)]",
    borderColor: "border-[hsl(280,85%,60%)]/30",
    level: "Advanced",
    modules: [
      {
        id: "architecture",
        title: "Architecture Patterns",
        lessons: allLessons.filter(l => l.trackId === "systems" && l.moduleId === "architecture"),
      },
    ],
  },
];

export default function Curriculum() {
  const { isLessonCompleted } = useProgress();

  // Calculate module progress based on completed lessons
  const getModuleProgress = (lessons: typeof allLessons) => {
    if (lessons.length === 0) return 0;
    const completedCount = lessons.filter((lesson) =>
      isLessonCompleted(lesson.id)
    ).length;
    return Math.round((completedCount / lessons.length) * 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mb-12"
          >
            <h1 className="font-display text-4xl font-bold mb-4">
              Curriculum
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore our comprehensive curriculum designed to take you from beginner to expert 
              in programming mathematics.
            </p>
          </motion.div>

          {/* Tracks */}
          <div className="space-y-8">
            {tracks.map((track, trackIndex) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: trackIndex * 0.1 }}
                className={`glass-card rounded-xl overflow-hidden ${track.borderColor}`}
              >
                {/* Track Header */}
                <div className="p-6 border-b border-border/50">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${track.color}`}>
                        <track.icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h2 className="font-display text-xl font-bold">{track.title}</h2>
                          <Badge variant="outline" className={track.textColor}>
                            {track.level}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">{track.description}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modules */}
                <div className="divide-y divide-border/50">
                  {track.modules.map((module) => {
                    const moduleProgress = getModuleProgress(module.lessons);
                    if (module.lessons.length === 0) return null;
                    
                    return (
                      <div key={module.id} className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-display font-semibold text-lg">{module.title}</h3>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-muted-foreground">
                              {moduleProgress}% complete
                            </span>
                            <Progress value={moduleProgress} className="w-24 h-2" />
                          </div>
                        </div>

                        <div className="grid gap-2">
                          {module.lessons.map((lesson) => {
                            const completed = isLessonCompleted(lesson.id);
                            
                            return (
                              <Link
                                key={lesson.id}
                                to={`/lesson/${lesson.id}`}
                                className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors group"
                              >
                                <div className="flex items-center gap-3">
                                  {completed ? (
                                    <CheckCircle2 className="h-5 w-5 text-success" />
                                  ) : (
                                    <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30" />
                                  )}
                                  <span className={completed ? "text-muted-foreground" : ""}>
                                    {lesson.title}
                                  </span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    {lesson.duration}
                                  </span>
                                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
