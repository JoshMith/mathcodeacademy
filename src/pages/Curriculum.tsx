import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
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
  Lock,
  Star
} from "lucide-react";
import { Link } from "react-router-dom";

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
        lessons: [
          { id: "binary-intro", title: "Introduction to Binary", duration: "15 min", completed: true },
          { id: "binary-arithmetic", title: "Binary Arithmetic", duration: "20 min", completed: true },
          { id: "hexadecimal", title: "Hexadecimal & Octal", duration: "18 min", completed: false },
          { id: "floating-point", title: "Floating Point Representation", duration: "25 min", completed: false },
        ],
        progress: 50,
      },
      {
        id: "boolean-algebra",
        title: "Boolean Algebra & Logic",
        lessons: [
          { id: "logic-gates", title: "Logic Gates Fundamentals", duration: "20 min", completed: false },
          { id: "truth-tables", title: "Truth Tables & Expressions", duration: "22 min", completed: false },
          { id: "boolean-laws", title: "Boolean Laws & Simplification", duration: "25 min", completed: false },
          { id: "circuit-design", title: "Digital Circuit Design", duration: "30 min", completed: false },
        ],
        progress: 0,
      },
      {
        id: "set-theory",
        title: "Set Theory & Relations",
        lessons: [
          { id: "sets-intro", title: "Introduction to Sets", duration: "15 min", completed: false },
          { id: "set-operations", title: "Set Operations", duration: "20 min", completed: false },
          { id: "relations", title: "Relations & Functions", duration: "25 min", completed: false },
        ],
        progress: 0,
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
        id: "discrete-math",
        title: "Discrete Mathematics",
        lessons: [
          { id: "counting", title: "Counting Principles", duration: "20 min", completed: false },
          { id: "permutations", title: "Permutations & Combinations", duration: "25 min", completed: false },
          { id: "recurrence", title: "Recurrence Relations", duration: "30 min", completed: false },
        ],
        progress: 0,
      },
      {
        id: "graph-theory",
        title: "Graph Theory",
        lessons: [
          { id: "graphs-intro", title: "Introduction to Graphs", duration: "20 min", completed: false },
          { id: "traversal", title: "Graph Traversal Algorithms", duration: "25 min", completed: false },
          { id: "shortest-path", title: "Shortest Path Algorithms", duration: "30 min", completed: false },
          { id: "trees", title: "Trees & Spanning Trees", duration: "25 min", completed: false },
        ],
        progress: 0,
      },
      {
        id: "complexity",
        title: "Complexity Analysis",
        lessons: [
          { id: "big-o", title: "Big O Notation", duration: "20 min", completed: false },
          { id: "analyzing", title: "Analyzing Algorithms", duration: "25 min", completed: false },
          { id: "space-complexity", title: "Space Complexity", duration: "20 min", completed: false },
        ],
        progress: 0,
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
        id: "linear-algebra-adv",
        title: "Advanced Linear Algebra",
        lessons: [
          { id: "eigenvalues", title: "Eigenvalues & Eigenvectors", duration: "30 min", completed: false },
          { id: "svd", title: "Singular Value Decomposition", duration: "35 min", completed: false },
          { id: "pca", title: "Principal Component Analysis", duration: "30 min", completed: false },
        ],
        progress: 0,
      },
      {
        id: "optimization",
        title: "Optimization",
        lessons: [
          { id: "gradient-descent", title: "Gradient Descent", duration: "25 min", completed: false },
          { id: "convex", title: "Convex Optimization", duration: "30 min", completed: false },
          { id: "backprop", title: "Backpropagation Math", duration: "35 min", completed: false },
        ],
        progress: 0,
      },
    ],
  },
  {
    id: "security",
    title: "Cybersecurity",
    description: "Number theory and cryptographic mathematics for security professionals.",
    icon: Shield,
    color: "bg-destructive",
    textColor: "text-destructive",
    borderColor: "border-destructive/30",
    level: "Advanced",
    modules: [
      {
        id: "number-theory",
        title: "Number Theory",
        lessons: [
          { id: "primes", title: "Prime Numbers & Factorization", duration: "25 min", completed: false },
          { id: "modular", title: "Modular Arithmetic", duration: "30 min", completed: false },
          { id: "gcd", title: "GCD & Extended Euclidean", duration: "25 min", completed: false },
        ],
        progress: 0,
      },
      {
        id: "cryptography",
        title: "Cryptographic Mathematics",
        lessons: [
          { id: "rsa", title: "RSA Algorithm", duration: "35 min", completed: false },
          { id: "ecc", title: "Elliptic Curve Cryptography", duration: "40 min", completed: false },
          { id: "hash", title: "Hash Functions", duration: "25 min", completed: false },
        ],
        progress: 0,
      },
    ],
  },
];

export default function Curriculum() {
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
                  {track.modules.map((module, moduleIndex) => (
                    <div key={module.id} className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-display font-semibold text-lg">{module.title}</h3>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-muted-foreground">
                            {module.progress}% complete
                          </span>
                          <Progress value={module.progress} className="w-24 h-2" />
                        </div>
                      </div>

                      <div className="grid gap-2">
                        {module.lessons.map((lesson) => (
                          <Link
                            key={lesson.id}
                            to={`/lesson/${track.id}/${module.id}/${lesson.id}`}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors group"
                          >
                            <div className="flex items-center gap-3">
                              {lesson.completed ? (
                                <CheckCircle2 className="h-5 w-5 text-success" />
                              ) : (
                                <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30" />
                              )}
                              <span className={lesson.completed ? "text-muted-foreground" : ""}>
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
                        ))}
                      </div>
                    </div>
                  ))}
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
