import { useState } from "react";
import { Play, Loader2, Terminal, Trash2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { executeCode, SUPPORTED_LANGUAGES, isLanguageSupported, type ExecutionResult } from "@/lib/codeExecutor";

const STARTER_CODE: Record<string, string> = {
  javascript: `// Try it out! Write any JavaScript here.
const fibonacci = (n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
};

for (let i = 0; i < 10; i++) {
  console.log(\`fib(\${i}) = \${fibonacci(i)}\`);
}`,
  typescript: `// TypeScript playground
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));`,
  python: `# Python playground (runs in browser via Pyodide)
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

for i in range(10):
    print(f"fib({i}) = {fibonacci(i)}")`,
};

interface CodePlaygroundProps {
  initialCode?: string;
  initialLanguage?: string;
}

export function CodePlayground({ initialCode, initialLanguage }: CodePlaygroundProps) {
  const defaultLang = initialLanguage && isLanguageSupported(initialLanguage)
    ? initialLanguage.toLowerCase()
    : "javascript";

  const [language, setLanguage] = useState(defaultLang);
  const [code, setCode] = useState(initialCode || STARTER_CODE[defaultLang] || STARTER_CODE.javascript);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [isPyodideLoading, setIsPyodideLoading] = useState(false);

  const handleRun = async () => {
    setIsRunning(true);
    if (language === "python") setIsPyodideLoading(true);
    const res = await executeCode(code, language);
    setResult(res);
    setIsRunning(false);
    setIsPyodideLoading(false);
  };

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    setCode(STARTER_CODE[newLang] || "");
    setResult(null);
  };

  const handleReset = () => {
    setCode(initialCode || STARTER_CODE[language] || "");
    setResult(null);
  };

  const handleClear = () => {
    setResult(null);
  };

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-3 sm:px-4 py-3 bg-secondary/50 border-b border-border flex-wrap">
        <Terminal className="h-4 w-4 text-primary shrink-0" />
        <span className="font-medium text-sm">Code Playground</span>

        <div className="flex items-center gap-1 ml-auto">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all capitalize ${
                language === lang
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="relative">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          className="w-full p-3 sm:p-4 bg-[hsl(222,47%,5%)] text-[hsl(220,14%,96%)] font-mono text-sm outline-none resize-none min-h-[200px]"
          style={{ tabSize: 2 }}
          rows={Math.max(10, code.split("\n").length + 2)}
          onKeyDown={(e) => {
            // Allow Tab to insert spaces
            if (e.key === "Tab") {
              e.preventDefault();
              const start = e.currentTarget.selectionStart;
              const end = e.currentTarget.selectionEnd;
              const newCode = code.substring(0, start) + "  " + code.substring(end);
              setCode(newCode);
              setTimeout(() => {
                e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 2;
              }, 0);
            }
            // Ctrl/Cmd + Enter to run
            if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
              e.preventDefault();
              handleRun();
            }
          }}
        />
      </div>

      {/* Action Bar */}
      <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-secondary/30 border-t border-border">
        <Button
          size="sm"
          onClick={handleRun}
          disabled={isRunning || !code.trim()}
          className="gap-1.5"
        >
          {isRunning ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              {isPyodideLoading ? "Loading Python..." : "Running..."}
            </>
          ) : (
            <>
              <Play className="h-3.5 w-3.5" />
              Run
            </>
          )}
        </Button>
        <span className="text-xs text-muted-foreground hidden sm:inline">
          Ctrl+Enter to run
        </span>
        <div className="flex items-center gap-1 ml-auto">
          <Button size="sm" variant="ghost" onClick={handleReset} className="h-7 px-2 text-xs gap-1">
            <RotateCcw className="h-3 w-3" />
            Reset
          </Button>
          {result && (
            <Button size="sm" variant="ghost" onClick={handleClear} className="h-7 px-2 text-xs gap-1">
              <Trash2 className="h-3 w-3" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Output */}
      {result && (
        <div className="border-t border-border">
          <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-secondary/20">
            <Terminal className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">Output</span>
            <span className="text-xs text-muted-foreground ml-auto">
              {result.duration.toFixed(0)}ms
            </span>
          </div>
          <div className="p-3 sm:p-4 bg-[hsl(222,47%,3%)] max-h-64 overflow-auto">
            {result.output && (
              <pre className="text-sm font-mono text-[hsl(142,71%,65%)] whitespace-pre-wrap break-words !bg-transparent !m-0">
                {result.output}
              </pre>
            )}
            {result.error && (
              <pre className="text-sm font-mono text-[hsl(0,84%,60%)] whitespace-pre-wrap break-words !bg-transparent !m-0">
                {result.error}
              </pre>
            )}
            {!result.output && !result.error && (
              <span className="text-xs text-muted-foreground italic">No output</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
