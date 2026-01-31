import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
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
  Target
} from "lucide-react";

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

// Sample lesson content
const lessonContent = {
  title: "Introduction to Binary",
  duration: "15 min",
  objectives: [
    "Understand what binary number system is",
    "Convert between binary and decimal",
    "Understand why computers use binary",
  ],
  sections: [
    {
      type: "text",
      content: `Binary is a base-2 number system that uses only two digits: 0 and 1. It's the fundamental language that all computers speak, representing data and instructions at the most basic level.`,
    },
    {
      type: "concept",
      title: "Why Binary?",
      content: `Computers use binary because electronic circuits have two stable states: on (1) and off (0). This makes binary the most reliable and efficient way to store and process information electronically.`,
    },
    {
      type: "math",
      title: "Binary to Decimal Conversion",
      content: `Each position in a binary number represents a power of 2. To convert binary to decimal, multiply each digit by its position value and sum the results.`,
      formula: "1011_2 = 1 \\times 2^3 + 0 \\times 2^2 + 1 \\times 2^1 + 1 \\times 2^0 = 8 + 0 + 2 + 1 = 11_{10}",
    },
    {
      type: "code",
      title: "Binary Conversion in Python",
      language: "python",
      code: `# Convert decimal to binary
decimal_num = 11
binary_str = bin(decimal_num)  # Returns '0b1011'
print(f"{decimal_num} in binary is {binary_str[2:]}")

# Convert binary to decimal
binary_str = "1011"
decimal_num = int(binary_str, 2)  # Returns 11
print(f"Binary 1011 is {decimal_num} in decimal")

# Manual conversion function
def decimal_to_binary(n):
    if n == 0:
        return "0"
    binary = ""
    while n > 0:
        binary = str(n % 2) + binary
        n //= 2
    return binary`,
    },
    {
      type: "example",
      title: "Worked Example",
      problem: "Convert the binary number 11010 to decimal.",
      solution: `Starting from the rightmost digit:
• Position 0: 0 × 2⁰ = 0
• Position 1: 1 × 2¹ = 2  
• Position 2: 0 × 2² = 0
• Position 3: 1 × 2³ = 8
• Position 4: 1 × 2⁴ = 16

Sum: 0 + 2 + 0 + 8 + 16 = 26`,
      formula: "11010_2 = 26_{10}",
    },
  ],
  practices: [
    {
      id: 1,
      question: "What is 1100 in decimal?",
      options: ["10", "12", "14", "16"],
      correct: 1,
    },
    {
      id: 2,
      question: "What is 13 in binary?",
      options: ["1011", "1100", "1101", "1110"],
      correct: 2,
    },
    {
      id: 3,
      question: "How many bits are needed to represent the number 64?",
      options: ["5", "6", "7", "8"],
      correct: 2,
    },
  ],
};

export default function Lesson() {
  const { trackId, moduleId, lessonId } = useParams();
  const [currentSection, setCurrentSection] = useState(0);
  const [showPractice, setShowPractice] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const progress = ((currentSection + 1) / lessonContent.sections.length) * 100;

  const handleAnswer = (questionId: number, optionIndex: number) => {
    setAnswers({ ...answers, [questionId]: optionIndex });
  };

  const checkAnswers = () => {
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Progress Bar */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border/50">
        <Progress value={showPractice ? 100 : progress} className="h-1 rounded-none" />
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
                  <Badge variant="outline" className="text-primary">Foundation</Badge>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {lessonContent.duration}
                  </span>
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
          </motion.div>

          {/* Content */}
          {!showPractice ? (
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {lessonContent.sections.map((section, index) => (
                <div
                  key={index}
                  className={`${index > currentSection ? "opacity-40 pointer-events-none" : ""}`}
                >
                  {section.type === "text" && (
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      {section.content}
                    </p>
                  )}

                  {section.type === "concept" && (
                    <div className="p-5 rounded-xl bg-accent/10 border border-accent/20">
                      <div className="flex items-center gap-2 text-accent font-medium mb-3">
                        <Lightbulb className="h-5 w-5" />
                        {section.title}
                      </div>
                      <p className="text-muted-foreground">{section.content}</p>
                    </div>
                  )}

                  {section.type === "math" && (
                    <div className="p-5 rounded-xl glass-card">
                      <h3 className="font-display font-semibold text-lg mb-3">{section.title}</h3>
                      <p className="text-muted-foreground mb-4">{section.content}</p>
                      <div className="p-4 rounded-lg bg-background/50 text-center">
                        <MathBlock math={section.formula || ""} display />
                      </div>
                    </div>
                  )}

                  {section.type === "code" && (
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
                  )}

                  {section.type === "example" && (
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
                  )}
                </div>
              ))}

              {/* Navigation */}
              <div className="flex items-center justify-between pt-8 border-t border-border/50">
                <Button
                  variant="outline"
                  onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                  disabled={currentSection === 0}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                {currentSection < lessonContent.sections.length - 1 ? (
                  <Button
                    variant="hero"
                    onClick={() => setCurrentSection(currentSection + 1)}
                  >
                    Continue
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button variant="hero" onClick={() => setShowPractice(true)}>
                    Start Practice
                    <Play className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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

              <div className="flex justify-center pt-4">
                {!showResults ? (
                  <Button
                    variant="hero"
                    size="lg"
                    onClick={checkAnswers}
                    disabled={Object.keys(answers).length !== lessonContent.practices.length}
                  >
                    Check Answers
                  </Button>
                ) : (
                  <div className="text-center">
                    <div className="mb-4">
                      <span className="text-2xl font-bold">
                        {lessonContent.practices.filter((q) => answers[q.id] === q.correct).length}
                      </span>
                      <span className="text-muted-foreground"> / {lessonContent.practices.length} correct</span>
                    </div>
                    <Link to="/curriculum">
                      <Button variant="hero" size="lg">
                        Continue Learning
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
