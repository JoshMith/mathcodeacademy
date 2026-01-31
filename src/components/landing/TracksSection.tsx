import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  BookOpen, 
  Code2, 
  Brain, 
  Shield, 
  Network, 
  Server,
  Lock
} from "lucide-react";

const tracks = [
  {
    id: "foundation",
    title: "Foundation",
    level: "Beginner",
    icon: BookOpen,
    color: "from-primary to-primary/70",
    borderColor: "border-primary/30",
    topics: ["Binary Mathematics", "Boolean Algebra", "Set Theory", "Basic Probability"],
    lessons: 12,
    duration: "4 weeks",
  },
  {
    id: "core",
    title: "Core Programming Math",
    level: "Intermediate",
    icon: Code2,
    color: "from-accent to-accent/70",
    borderColor: "border-accent/30",
    topics: ["Discrete Math", "Graph Theory", "Big O Notation", "Linear Algebra"],
    lessons: 18,
    duration: "6 weeks",
  },
  {
    id: "ml-ai",
    title: "ML & AI",
    level: "Advanced",
    icon: Brain,
    color: "from-[hsl(330,85%,60%)] to-[hsl(330,85%,40%)]",
    borderColor: "border-[hsl(330,85%,60%)]/30",
    topics: ["Statistics", "Calculus", "Optimization", "Neural Network Math"],
    lessons: 15,
    duration: "8 weeks",
  },
  {
    id: "algorithms",
    title: "Algorithms & DS",
    level: "Advanced",
    icon: Code2,
    color: "from-success to-success/70",
    borderColor: "border-success/30",
    topics: ["Dynamic Programming", "Complexity Theory", "Amortized Analysis"],
    lessons: 14,
    duration: "6 weeks",
  },
  {
    id: "security",
    title: "Cybersecurity",
    level: "Advanced",
    icon: Shield,
    color: "from-destructive to-destructive/70",
    borderColor: "border-destructive/30",
    topics: ["Number Theory", "Cryptography", "RSA", "Hash Functions"],
    lessons: 12,
    duration: "5 weeks",
  },
  {
    id: "networking",
    title: "Networking & IoT",
    level: "Advanced",
    icon: Network,
    color: "from-warning to-warning/70",
    borderColor: "border-warning/30",
    topics: ["Signal Processing", "Fourier Transforms", "Queuing Theory"],
    lessons: 10,
    duration: "4 weeks",
  },
];

export function TracksSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Choose Your <span className="gradient-text">Learning Path</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Specialized tracks designed for your career goals, from software engineering to machine learning.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass-card rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300 group ${track.borderColor}`}
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${track.color} p-4`}>
                <div className="flex items-center justify-between">
                  <track.icon className="h-8 w-8 text-primary-foreground" />
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-background/20 text-primary-foreground">
                    {track.level}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-primary-foreground mt-3">
                  {track.title}
                </h3>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span>{track.lessons} lessons</span>
                  <span>•</span>
                  <span>{track.duration}</span>
                </div>

                <div className="space-y-2 mb-5">
                  {track.topics.map((topic) => (
                    <div key={topic} className="flex items-center gap-2 text-sm">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>

                <Link to={`/curriculum?track=${track.id}`}>
                  <Button variant="subtle" className="w-full group/btn">
                    Explore Track
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link to="/curriculum">
            <Button variant="outline" size="lg" className="group">
              View Full Curriculum
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
