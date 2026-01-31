import { motion } from "framer-motion";
import { 
  BookOpen, 
  Code2, 
  Trophy, 
  Zap, 
  Target, 
  Users,
  Lightbulb,
  BarChart3
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Structured Curriculum",
    description: "Progressive learning paths from fundamentals to advanced topics, designed by industry experts.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Code2,
    title: "Code in Context",
    description: "See how every mathematical concept translates to real code with Python and JavaScript examples.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Target,
    title: "Practice Problems",
    description: "500+ problems with progressive difficulty, detailed solutions, and multiple approaches.",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    icon: Lightbulb,
    title: "Visual Learning",
    description: "Interactive visualizations that make abstract concepts concrete and memorable.",
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    icon: Trophy,
    title: "Gamified Progress",
    description: "Earn XP, unlock achievements, maintain streaks, and track your growth over time.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: BarChart3,
    title: "Adaptive Learning",
    description: "Personalized recommendations based on your strengths, weaknesses, and career goals.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Zap,
    title: "Quick Practice",
    description: "Daily challenges and spaced repetition to build lasting mathematical intuition.",
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    icon: Users,
    title: "Community",
    description: "Learn together with forums, peer solutions, and collaborative problem solving.",
    color: "text-success",
    bgColor: "bg-success/10",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-card/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Everything You Need to <span className="gradient-text">Master Math</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            A complete learning system designed for developers who want to level up their mathematical skills.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-xl p-6 hover:border-primary/30 transition-all duration-300 group"
            >
              <div className={`inline-flex p-3 rounded-lg ${feature.bgColor} mb-4`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
