import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Link, Navigate } from "react-router-dom";
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
  Loader2,
} from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { useAuth } from "@/hooks/useAuth";
import { getNextLesson } from "@/data/lessons";

const trackProgress = [
  { name: "Foundation", total: 12, color: "bg-primary" },
  { name: "Core Programming", total: 18, color: "bg-accent" },
  { name: "ML & AI", total: 15, color: "bg-[hsl(330,85%,60%)]" },
];

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const { progress, profile, loading: progressLoading } = useProgress();

  // Redirect to login if not authenticated
  if (!authLoading && !user) {
    return <Navigate to="/login" replace />;
  }

  const loading = authLoading || progressLoading;

  const displayName = profile?.display_name || user?.email?.split("@")[0] || "Learner";
  const completedLessons = progress?.completed_lessons || [];
  const xpPoints = progress?.xp_points || 0;
  const currentStreak = progress?.current_streak || 0;

  // Calculate track-specific progress
  const calculateTrackProgress = (trackPrefix: string, total: number) => {
    const completed = completedLessons.filter((l) => l.startsWith(trackPrefix)).length;
    return {
      completed,
      progress: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  };

  const foundationProgress = calculateTrackProgress("foundation", 12);
  const coreProgress = calculateTrackProgress("core", 18);
  const mlProgress = calculateTrackProgress("ml-ai", 15);

  const stats = [
    { label: "Lessons Completed", value: completedLessons.length, icon: BookOpen, color: "text-primary" },
    { label: "Current Streak", value: currentStreak, icon: Flame, color: "text-warning" },
    { label: "Total XP", value: xpPoints, icon: Zap, color: "text-accent" },
    { label: "Achievements", value: 0, icon: Trophy, color: "text-success" },
  ];

  const trackProgressData = [
    { ...trackProgress[0], ...foundationProgress },
    { ...trackProgress[1], ...coreProgress },
    { ...trackProgress[2], ...mlProgress },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16 flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading your progress...</p>
          </div>
        </main>
      </div>
    );
  }

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
              Welcome back, <span className="gradient-text">{displayName}</span>
            </h1>
            <p className="text-muted-foreground">
              {currentStreak > 0
                ? `Keep up the great work! You're on a ${currentStreak}-day streak.`
                : "Start learning today to build your streak!"}
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

                {(() => {
                  const nextLesson = getNextLesson(completedLessons);
                  if (!nextLesson) {
                    return (
                      <div className="p-5 rounded-xl bg-gradient-to-br from-success/10 to-accent/10 border border-success/20 text-center">
                        <Trophy className="h-12 w-12 text-success mx-auto mb-3" />
                        <h3 className="font-display text-lg font-semibold mb-2">
                          All Lessons Completed!
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Congratulations! You've completed all available lessons.
                        </p>
                        <Link to="/curriculum">
                          <Button variant="outline">
                            Review Curriculum
                          </Button>
                        </Link>
                      </div>
                    );
                  }
                  return (
                    <div className="p-5 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <Badge variant="outline" className="text-primary mb-2">
                            {nextLesson.trackTitle} Track
                          </Badge>
                          <h3 className="font-display text-lg font-semibold">
                            {nextLesson.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Continue your learning journey
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                            <Clock className="h-4 w-4" />
                            {nextLesson.duration}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            +100 XP
                          </div>
                        </div>
                      </div>
                      
                      <Progress value={0} className="h-2 mb-4" />
                      
                      <Link to={`/lesson/${nextLesson.id}`}>
                        <Button variant="hero" className="w-full">
                          Continue Lesson
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  );
                })()}
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
                  {trackProgressData.map((track) => (
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
                        strokeDashoffset={352 * (1 - Math.min(completedLessons.length / 3, 1))}
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
                      <div className="font-display text-2xl font-bold">
                        {Math.min(Math.round((completedLessons.length / 3) * 100), 100)}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {Math.min(completedLessons.length, 3)}/3 lessons
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    {completedLessons.length >= 3
                      ? "Daily goal achieved! 🎉"
                      : `Complete ${3 - Math.min(completedLessons.length, 3)} more lesson${3 - completedLessons.length !== 1 ? "s" : ""} to reach your daily goal!`}
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
                  <Link to="/curriculum">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Zap className="h-4 w-4 text-warning" />
                      Browse Curriculum
                    </Button>
                  </Link>
                  <Link to="/achievements">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Trophy className="h-4 w-4 text-accent" />
                      View Achievements
                    </Button>
                  </Link>
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
