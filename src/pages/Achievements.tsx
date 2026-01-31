import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Trophy,
  Star,
  Flame,
  BookOpen,
  Code,
  Brain,
  Shield,
  Zap,
  Target,
  Medal,
  Crown,
  Lock,
} from "lucide-react";

const achievements = [
  {
    id: "first-lesson",
    title: "First Steps",
    description: "Complete your first lesson",
    icon: BookOpen,
    color: "text-primary",
    bgColor: "bg-primary/10",
    unlocked: true,
    date: "Jan 15, 2024",
  },
  {
    id: "streak-3",
    title: "On Fire",
    description: "Maintain a 3-day streak",
    icon: Flame,
    color: "text-warning",
    bgColor: "bg-warning/10",
    unlocked: true,
    date: "Jan 17, 2024",
  },
  {
    id: "streak-7",
    title: "Week Warrior",
    description: "Maintain a 7-day streak",
    icon: Flame,
    color: "text-warning",
    bgColor: "bg-warning/10",
    unlocked: false,
    progress: 71,
  },
  {
    id: "perfect-quiz",
    title: "Perfect Score",
    description: "Get 100% on any quiz",
    icon: Star,
    color: "text-accent",
    bgColor: "bg-accent/10",
    unlocked: true,
    date: "Jan 16, 2024",
  },
  {
    id: "binary-master",
    title: "Binary Master",
    description: "Complete all binary lessons",
    icon: Code,
    color: "text-success",
    bgColor: "bg-success/10",
    unlocked: false,
    progress: 50,
  },
  {
    id: "foundation-complete",
    title: "Strong Foundation",
    description: "Complete the Foundation track",
    icon: Trophy,
    color: "text-primary",
    bgColor: "bg-primary/10",
    unlocked: false,
    progress: 25,
  },
  {
    id: "ml-pioneer",
    title: "ML Pioneer",
    description: "Start the ML & AI track",
    icon: Brain,
    color: "text-[hsl(330,85%,60%)]",
    bgColor: "bg-[hsl(330,85%,60%)]/10",
    unlocked: false,
    progress: 0,
  },
  {
    id: "security-expert",
    title: "Security Expert",
    description: "Complete the Security track",
    icon: Shield,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    unlocked: false,
    progress: 0,
  },
  {
    id: "xp-1000",
    title: "Rising Star",
    description: "Earn 1,000 XP",
    icon: Zap,
    color: "text-accent",
    bgColor: "bg-accent/10",
    unlocked: true,
    date: "Jan 18, 2024",
  },
  {
    id: "xp-5000",
    title: "XP Champion",
    description: "Earn 5,000 XP",
    icon: Crown,
    color: "text-warning",
    bgColor: "bg-warning/10",
    unlocked: false,
    progress: 49,
  },
  {
    id: "problems-50",
    title: "Problem Solver",
    description: "Solve 50 practice problems",
    icon: Target,
    color: "text-success",
    bgColor: "bg-success/10",
    unlocked: true,
    date: "Jan 19, 2024",
  },
  {
    id: "problems-200",
    title: "Math Wizard",
    description: "Solve 200 practice problems",
    icon: Medal,
    color: "text-primary",
    bgColor: "bg-primary/10",
    unlocked: false,
    progress: 30,
  },
];

const unlockedAchievements = achievements.filter((a) => a.unlocked);
const lockedAchievements = achievements.filter((a) => !a.unlocked);

export default function Achievements() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-display text-4xl font-bold mb-2">Achievements</h1>
            <p className="text-muted-foreground">
              Track your accomplishments and unlock new badges
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            <div className="glass-card rounded-xl p-5 text-center">
              <Trophy className="h-8 w-8 text-warning mx-auto mb-2" />
              <div className="font-display text-3xl font-bold">{unlockedAchievements.length}</div>
              <div className="text-sm text-muted-foreground">Unlocked</div>
            </div>
            <div className="glass-card rounded-xl p-5 text-center">
              <Lock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <div className="font-display text-3xl font-bold">{lockedAchievements.length}</div>
              <div className="text-sm text-muted-foreground">Locked</div>
            </div>
            <div className="glass-card rounded-xl p-5 text-center">
              <Star className="h-8 w-8 text-accent mx-auto mb-2" />
              <div className="font-display text-3xl font-bold">2,450</div>
              <div className="text-sm text-muted-foreground">Total XP</div>
            </div>
            <div className="glass-card rounded-xl p-5 text-center">
              <Flame className="h-8 w-8 text-warning mx-auto mb-2" />
              <div className="font-display text-3xl font-bold">5</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </div>
          </motion.div>

          {/* Unlocked Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
              <Trophy className="h-6 w-6 text-warning" />
              Unlocked
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {unlockedAchievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="glass-card rounded-xl p-5 border-primary/30"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${achievement.bgColor}`}>
                      <achievement.icon className={`h-6 w-6 ${achievement.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-semibold mb-1">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {achievement.description}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        Unlocked {achievement.date}
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Locked Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
              <Lock className="h-6 w-6 text-muted-foreground" />
              In Progress
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lockedAchievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="glass-card rounded-xl p-5 opacity-70"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-secondary`}>
                      <achievement.icon className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-semibold mb-1">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {achievement.description}
                      </p>
                      {achievement.progress !== undefined && achievement.progress > 0 && (
                        <div>
                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                            <span>Progress</span>
                            <span>{achievement.progress}%</span>
                          </div>
                          <Progress value={achievement.progress} className="h-2" />
                        </div>
                      )}
                      {achievement.progress === 0 && (
                        <Badge variant="outline" className="text-xs text-muted-foreground">
                          Not started
                        </Badge>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
