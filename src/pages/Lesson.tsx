import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import katex from "katex";
import "katex/dist/katex.min.css";
import { 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Code,
  Lightbulb,
  Play,
  Target,
  Loader2,
  AlertCircle
} from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { useAuth } from "@/hooks/useAuth";
import { getLessonById, allLessons, type LessonContent, type LessonSection } from "@/data/lessons";

// Math rendering component
function MathBlock({ math, display = false }: { math: string; display?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current) {
      katex.render(math, ref.current, {
        throwOnError: false,
        displayMode: display,
      });
    }
  }, [math, display]);

  return <span ref={ref} />;
}

// Section renderer component
function SectionRenderer({ section }: { section: LessonSection }) {
  switch (section.type) {
    case "text":
      return (
        <p className="text-lg leading-relaxed text-muted-foreground">
          {section.content}
        </p>
      );
    case "concept":
      return (
        <div className="p-5 rounded-xl bg-accent/10 border border-accent/20">
          <div className="flex items-center gap-2 text-accent font-medium mb-3">
            <Lightbulb className="h-5 w-5" />
            {section.title}
          </div>
          <p className="text-muted-foreground">{section.content}</p>
        </div>
      );
    case "math":
      return (
        <div className="p-5 rounded-xl glass-card">
          <h3 className="font-display font-semibold text-lg mb-3">{section.title}</h3>
          <p className="text-muted-foreground mb-4">{section.content}</p>
          <div className="p-4 rounded-lg bg-background/50 text-center">
            <MathBlock math={section.formula || ""} display />
          </div>
        </div>
      );
    case "code":
      return (
        <div className="rounded-xl overflow-hidden border border-border">
          <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
            <Code className="h-4 w-4 text-primary" />
            <span className="font-medium text-sm">{section.title}</span>
            <Badge variant="outline" className="ml-auto text-xs">
              {section.language}
            </Badge>
          </div>
          <pre className="p-4 overflow-x-auto bg-[hsl(222,47%,5%)]">
            <code className="font-mono text-sm text-foreground/90">
              {section.code}
            </code>
          </pre>
        </div>
      );
    case "example":
      return (
        <div className="p-5 rounded-xl bg-success/5 border border-success/20">
          <div className="flex items-center gap-2 text-success font-medium mb-3">
            <BookOpen className="h-5 w-5" />
            {section.title}
          </div>
          <div className="mb-3">
            <span className="font-medium">Problem: </span>
            <span className="text-muted-foreground">{section.problem}</span>
          </div>
          <div className="p-4 rounded-lg bg-background/50 mb-3">
            <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
              {section.solution}
            </pre>
          </div>
          <div className="text-center p-3 rounded-lg bg-success/10">
            <MathBlock math={section.formula || ""} display />
          </div>
        </div>
      );
    default:
      return null;
  }
}

type LessonView = "content" | "practice";

export default function Lesson() {
  const { trackId, moduleId, lessonId } = useParams();
  const navigate = useNavigate();
  const [view, setView] = useState<LessonView>("content");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  const { user } = useAuth();
  const { completeLesson, isLessonCompleted } = useProgress();

  const fullLessonId = `${trackId}/${moduleId}/${lessonId}`;
  const lessonContent = getLessonById(fullLessonId);
  const alreadyCompleted = isLessonCompleted(fullLessonId);

  // Scroll to top when lesson changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [trackId, moduleId, lessonId]);

  // Reset state when lesson changes
  useEffect(() => {
    setView("content");
    setAnswers({});
    setShowResults(false);
  }, [fullLessonId]);

  // Get track title for badge
  const lessonMeta = allLessons.find(l => l.id === fullLessonId);
  const trackTitle = lessonMeta?.trackTitle || "Foundation";

  // If lesson not found, show error state
  if (!lessonContent) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h1 className="font-display text-2xl font-bold mb-2">Lesson Not Found</h1>
              <p className="text-muted-foreground mb-6">
                This lesson is not available yet or doesn't exist.
              </p>
              <Link to="/curriculum">
                <Button variant="hero">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Curriculum
                </Button>
              </Link>
            </motion.div>
          </div>
        </main>
      </div>
    );
  }

  const progress = view === "practice" ? 100 : 50;

  const handleAnswer = (questionId: number, optionIndex: number) => {
    setAnswers({ ...answers, [questionId]: optionIndex });
  };

  const goToPractice = () => {
    setView("practice");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBackToContent = () => {
    setView("content");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const checkAnswers = async () => {
    setShowResults(true);
    
    // Only track completion if user is logged in and hasn't completed this lesson
    if (user && !alreadyCompleted) {
      const correctAnswers = lessonContent.practices.filter(
        (q) => answers[q.id] === q.correct
      ).length;
      const totalQuestions = lessonContent.practices.length;
      
      // Award XP based on performance (minimum 50 XP for completing)
      const baseXP = lessonContent.xpReward;
      const bonusMultiplier = correctAnswers / totalQuestions;
      const earnedXP = Math.round(baseXP * (0.5 + 0.5 * bonusMultiplier));
      
      setIsCompleting(true);
      await completeLesson(fullLessonId, earnedXP);
      setIsCompleting(false);
    }
  };

  // Find next lesson
  const currentIndex = allLessons.findIndex(l => l.id === fullLessonId);
  const nextLesson = currentIndex >= 0 && currentIndex < allLessons.length - 1 
    ? allLessons[currentIndex + 1] 
    : null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Progress Bar */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border/50">
        <Progress value={progress} className="h-1 rounded-none" />
      </div>

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link to="/curriculum" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Curriculum
            </Link>
            
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant="outline" className="text-primary">{trackTitle}</Badge>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {lessonContent.duration}
                  </span>
                  {alreadyCompleted && (
                    <Badge variant="outline" className="text-success border-success/30">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Completed
                    </Badge>
                  )}
                </div>
                <h1 className="font-display text-3xl font-bold">{lessonContent.title}</h1>
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-2 text-primary font-medium mb-3">
                <Target className="h-5 w-5" />
                Learning Objectives
              </div>
              <ul className="space-y-2">
                {lessonContent.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    {objective}
                  </li>
                ))}
              </ul>
            </div>

            {/* View Toggle Tabs */}
            <div className="mt-6 flex gap-2">
              <button
                onClick={goBackToContent}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  view === "content"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                📖 Lesson Content
              </button>
              <button
                onClick={goToPractice}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  view === "practice"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                ✏️ Practice ({lessonContent.practices.length} questions)
              </button>
            </div>
          </motion.div>

          {/* Content / Practice */}
          <AnimatePresence mode="wait">
            {view === "content" ? (
              <motion.div
                key="content"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {lessonContent.sections.map((section, index) => (
                  <SectionRenderer key={index} section={section} />
                ))}

                {/* Navigation */}
                <div className="flex items-center justify-between pt-8 border-t border-border/50">
                  <Link to="/curriculum">
                    <Button variant="outline">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Curriculum
                    </Button>
                  </Link>

                  <Button variant="hero" onClick={goToPractice}>
                    Start Practice
                    <Play className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="practice"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="font-display text-2xl font-bold mb-2">Practice Problems</h2>
                  <p className="text-muted-foreground">Test your understanding with these questions</p>
                </div>

                {lessonContent.practices.map((question, qIndex) => (
                  <div key={question.id} className="glass-card rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="flex items-center justify-center h-7 w-7 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        {qIndex + 1}
                      </span>
                      <h3 className="font-medium">{question.question}</h3>
                    </div>

                    <div className="grid gap-2">
                      {question.options.map((option, oIndex) => {
                        const isSelected = answers[question.id] === oIndex;
                        const isCorrect = showResults && oIndex === question.correct;
                        const isWrong = showResults && isSelected && oIndex !== question.correct;

                        return (
                          <button
                            key={oIndex}
                            onClick={() => !showResults && handleAnswer(question.id, oIndex)}
                            disabled={showResults}
                            className={`p-4 rounded-lg border text-left transition-all ${
                              isCorrect
                                ? "border-success bg-success/10 text-success"
                                : isWrong
                                ? "border-destructive bg-destructive/10 text-destructive"
                                : isSelected
                                ? "border-primary bg-primary/10"
                                : "border-border hover:border-primary/50 hover:bg-secondary/50"
                            }`}
                          >
                            <span className="font-mono mr-3 text-muted-foreground">
                              {String.fromCharCode(65 + oIndex)}.
                            </span>
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                <div className="flex items-center justify-between pt-4">
                  <Button variant="outline" onClick={goBackToContent}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Lesson
                  </Button>

                  {!showResults ? (
                    <Button
                      variant="hero"
                      size="lg"
                      onClick={checkAnswers}
                      disabled={Object.keys(answers).length !== lessonContent.practices.length || isCompleting}
                    >
                      {isCompleting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Saving Progress...
                        </>
                      ) : (
                        "Check Answers"
                      )}
                    </Button>
                  ) : (
                    <div className="text-center">
                      <div className="mb-4">
                        <span className="text-2xl font-bold">
                          {lessonContent.practices.filter((q) => answers[q.id] === q.correct).length}
                        </span>
                        <span className="text-muted-foreground"> / {lessonContent.practices.length} correct</span>
                      </div>
                      {alreadyCompleted && (
                        <p className="text-sm text-success mb-4 flex items-center justify-center gap-1">
                          <CheckCircle2 className="h-4 w-4" />
                          Lesson completed
                        </p>
                      )}
                      <div className="flex gap-3">
                        {nextLesson && (
                          <Link to={`/lesson/${nextLesson.id}`}>
                            <Button variant="hero" size="lg">
                              Next Lesson
                              <ArrowRight className="h-5 w-5 ml-2" />
                            </Button>
                          </Link>
                        )}
                        <Link to="/curriculum">
                          <Button variant="outline" size="lg">
                            Back to Curriculum
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
