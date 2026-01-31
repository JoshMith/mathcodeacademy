import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Trophy,
  Flame,
  Target,
  Clock,
  ArrowRight,
  Zap,
  Star,
  TrendingUp,
  Calendar,
} from "lucide-react";

const stats = [
  { label: "Lessons Completed", value: 12, icon: BookOpen, color: "text-primary" },
  { label: "Current Streak", value: 5, icon: Flame, color: "text-warning" },
  { label: "Total XP", value: 2450, icon: Zap, color: "text-accent" },
  { label: "Achievements", value: 8, icon: Trophy, color: "text-success" },
];

const recentActivity = [
  { title: "Binary Arithmetic", track: "Foundation", xp: 150, time: "2 hours ago", completed: true },
  { title: "Introduction to Binary", track: "Foundation", xp: 100, time: "Yesterday", completed: true },
  { title: "Boolean Algebra Basics", track: "Foundation", xp: 0, time: "In progress", completed: false },
];

const weeklyProgress = [
  { day: "Mon", lessons: 2 },
  { day: "Tue", lessons: 1 },
  { day: "Wed", lessons: 3 },
  { day: "Thu", lessons: 0 },
  { day: "Fri", lessons: 2 },
  { day: "Sat", lessons: 1 },
  { day: "Sun", lessons: 0 },
];

const trackProgress = [
  { name: "Foundation", progress: 25, total: 12, completed: 3, color: "bg-primary" },
  { name: "Core Programming", progress: 0, total: 18, completed: 0, color: "bg-accent" },
  { name: "ML & AI", progress: 0, total: 15, completed: 0, color: "bg-[hsl(330,85%,60%)]" },
];

export default function Dashboard() {
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
            <h1 className="font-display text-4xl font-bold mb-2">
              Welcome back, <span className="gradient-text">Learner</span>
            </h1>
            <p className="text-muted-foreground">
              Keep up the great work! You're on a 5-day streak.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="glass-card rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg bg-secondary ${stat.color}`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="font-display text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Continue Learning */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-xl font-bold">Continue Learning</h2>
                  <Link to="/curriculum">
                    <Button variant="ghost" size="sm">
                      View All
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </div>

                <div className="p-5 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <Badge variant="outline" className="text-primary mb-2">
                        Foundation Track
                      </Badge>
                      <h3 className="font-display text-lg font-semibold">
                        Hexadecimal & Octal Systems
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Learn about base-16 and base-8 number systems
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                        <Clock className="h-4 w-4" />
                        18 min
                      </div>
                      <div className="text-sm text-muted-foreground">
                        +100 XP
                      </div>
                    </div>
                  </div>
                  
                  <Progress value={0} className="h-2 mb-4" />
                  
                  <Link to="/lesson/foundation/number-systems/hexadecimal">
                    <Button variant="hero" className="w-full">
                      Continue Lesson
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </motion.div>

              {/* Weekly Progress */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-xl font-bold">Weekly Activity</h2>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    This Week
                  </div>
                </div>

                <div className="flex items-end justify-between gap-2 h-32">
                  {weeklyProgress.map((day) => (
                    <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full flex flex-col items-center">
                        <div
                          className={`w-full max-w-[40px] rounded-t-md ${
                            day.lessons > 0 ? "bg-primary" : "bg-secondary"
                          }`}
                          style={{ height: `${Math.max(day.lessons * 25, 8)}px` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{day.day}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-border/50">
                  <div className="text-center">
                    <div className="font-display text-2xl font-bold">9</div>
                    <div className="text-xs text-muted-foreground">Lessons this week</div>
                  </div>
                  <div className="h-10 w-px bg-border" />
                  <div className="text-center">
                    <div className="font-display text-2xl font-bold text-success flex items-center gap-1">
                      <TrendingUp className="h-5 w-5" />
                      +45%
                    </div>
                    <div className="text-xs text-muted-foreground">vs last week</div>
                  </div>
                </div>
              </motion.div>

              {/* Track Progress */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card rounded-xl p-6"
              >
                <h2 className="font-display text-xl font-bold mb-6">Track Progress</h2>
                <div className="space-y-5">
                  {trackProgress.map((track) => (
                    <div key={track.name}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{track.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {track.completed}/{track.total} lessons
                        </span>
                      </div>
                      <div className="h-3 rounded-full bg-secondary overflow-hidden">
                        <div
                          className={`h-full rounded-full ${track.color} transition-all duration-500`}
                          style={{ width: `${track.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card rounded-xl p-6"
              >
                <h2 className="font-display text-lg font-bold mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className={`mt-1 p-1.5 rounded-lg ${activity.completed ? "bg-success/10" : "bg-warning/10"}`}>
                        {activity.completed ? (
                          <Star className="h-4 w-4 text-success" />
                        ) : (
                          <Target className="h-4 w-4 text-warning" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.track}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">{activity.time}</span>
                          {activity.xp > 0 && (
                            <span className="text-xs text-primary">+{activity.xp} XP</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Daily Goal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card rounded-xl p-6"
              >
                <h2 className="font-display text-lg font-bold mb-4">Daily Goal</h2>
                <div className="text-center">
                  <div className="relative inline-flex items-center justify-center">
                    <svg className="w-32 h-32">
                      <circle
                        className="text-secondary"
                        strokeWidth="8"
                        stroke="currentColor"
                        fill="transparent"
                        r="56"
                        cx="64"
                        cy="64"
                      />
                      <circle
                        className="text-primary"
                        strokeWidth="8"
                        strokeDasharray={352}
                        strokeDashoffset={352 * (1 - 0.6)}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="56"
                        cx="64"
                        cy="64"
                        transform="rotate(-90 64 64)"
                      />
                    </svg>
                    <div className="absolute">
                      <div className="font-display text-2xl font-bold">60%</div>
                      <div className="text-xs text-muted-foreground">2/3 lessons</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    Complete 1 more lesson to reach your daily goal!
                  </p>
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="glass-card rounded-xl p-6"
              >
                <h2 className="font-display text-lg font-bold mb-4">Quick Practice</h2>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Zap className="h-4 w-4 text-warning" />
                    Daily Challenge
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Target className="h-4 w-4 text-primary" />
                    Review Weak Areas
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <BookOpen className="h-4 w-4 text-accent" />
                    Random Topic
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
