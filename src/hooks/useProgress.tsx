import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { useToast } from "./use-toast";

interface UserProgress {
  id: string;
  user_id: string;
  xp_points: number;
  current_streak: number;
  longest_streak: number;
  completed_lessons: string[];
  last_activity_date: string | null;
  created_at: string;
  updated_at: string;
}

interface Profile {
  id: string;
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
}

export function useProgress() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProgress = useCallback(async () => {
    if (!user) {
      setProgress(null);
      setProfile(null);
      setLoading(false);
      return;
    }

    try {
      const [progressResult, profileResult] = await Promise.all([
        supabase
          .from("user_progress")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle(),
        supabase
          .from("profiles")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle(),
      ]);

      if (progressResult.error) throw progressResult.error;
      if (profileResult.error) throw profileResult.error;

      if (progressResult.data) {
        setProgress({
          ...progressResult.data,
          completed_lessons: Array.isArray(progressResult.data.completed_lessons)
            ? (progressResult.data.completed_lessons as string[])
            : [],
        });
      }
      setProfile(profileResult.data);
    } catch (error) {
      console.error("Error fetching progress:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  const completeLesson = useCallback(
    async (lessonId: string, xpEarned: number = 100) => {
      if (!user || !progress) return false;

      // Check if already completed
      if (progress.completed_lessons.includes(lessonId)) {
        return true;
      }

      const today = new Date().toISOString().split("T")[0];
      const lastActivity = progress.last_activity_date;
      
      // Calculate streak
      let newStreak = progress.current_streak;
      if (lastActivity) {
        const lastDate = new Date(lastActivity);
        const todayDate = new Date(today);
        const diffDays = Math.floor(
          (todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (diffDays === 0) {
          // Same day, keep streak
        } else if (diffDays === 1) {
          // Consecutive day, increment streak
          newStreak += 1;
        } else {
          // Streak broken
          newStreak = 1;
        }
      } else {
        newStreak = 1;
      }

      const newCompletedLessons = [...progress.completed_lessons, lessonId];
      const newXP = progress.xp_points + xpEarned;
      const newLongestStreak = Math.max(progress.longest_streak, newStreak);

      try {
        const { error } = await supabase
          .from("user_progress")
          .update({
            completed_lessons: newCompletedLessons,
            xp_points: newXP,
            current_streak: newStreak,
            longest_streak: newLongestStreak,
            last_activity_date: today,
          })
          .eq("user_id", user.id);

        if (error) throw error;

        setProgress({
          ...progress,
          completed_lessons: newCompletedLessons,
          xp_points: newXP,
          current_streak: newStreak,
          longest_streak: newLongestStreak,
          last_activity_date: today,
        });

        toast({
          title: "Lesson Completed! 🎉",
          description: `You earned ${xpEarned} XP!`,
        });

        return true;
      } catch (error) {
        console.error("Error updating progress:", error);
        toast({
          title: "Error",
          description: "Failed to save your progress. Please try again.",
          variant: "destructive",
        });
        return false;
      }
    },
    [user, progress, toast]
  );

  const isLessonCompleted = useCallback(
    (lessonId: string) => {
      return progress?.completed_lessons.includes(lessonId) ?? false;
    },
    [progress]
  );

  return {
    progress,
    profile,
    loading,
    completeLesson,
    isLessonCompleted,
    refreshProgress: fetchProgress,
  };
}
