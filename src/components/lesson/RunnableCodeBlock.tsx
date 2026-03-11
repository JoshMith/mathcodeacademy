import { useEffect, useRef, useState } from "react";
import { Code, Copy, Check, Play, Loader2, Terminal, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Prism from "prismjs";
import { executeCode, isLanguageSupported, type ExecutionResult } from "@/lib/codeExecutor";

interface RunnableCodeBlockProps {
  title?: string;
  language?: string;
  code: string;
}

export function RunnableCodeBlock({ title, language, code }: RunnableCodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [editableCode, setEditableCode] = useState(code);
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const lang = (language || "").toLowerCase();
  const prismLang = Prism.languages[lang] ? lang : "javascript";
  const canRun = isLanguageSupported(lang);

  useEffect(() => {
    if (codeRef.current && !isEditing) {
      Prism.highlightElement(codeRef.current);
    }
  }, [editableCode, prismLang, isEditing]);

  useEffect(() => {
    setEditableCode(code);
    setResult(null);
    setIsEditing(false);
  }, [code]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(editableCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = async () => {
    setIsRunning(true);
    const res = await executeCode(editableCode, lang);
    setResult(res);
    setIsRunning(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setTimeout(() => textareaRef.current?.focus(), 50);
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditableCode(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-border min-w-0">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 sm:px-4 py-3 bg-secondary/50 border-b border-border">
        <Code className="h-4 w-4 text-primary shrink-0" />
        <span className="font-medium text-sm truncate">{title}</span>
        <Badge variant="outline" className="ml-auto text-xs shrink-0">
          {language}
        </Badge>
        {canRun && (
          <Button
            size="sm"
            variant="ghost"
            onClick={handleRun}
            disabled={isRunning}
            className="h-7 px-2 text-xs gap-1 text-primary hover:text-primary shrink-0"
          >
            {isRunning ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Play className="h-3.5 w-3.5" />
            )}
            Run
          </Button>
        )}
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground shrink-0"
          title="Copy code"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
      </div>

      {/* Code Area */}
      <div className="relative overflow-x-auto" onClick={canRun ? handleEdit : undefined}>
        {isEditing ? (
          <textarea
            ref={textareaRef}
            value={editableCode}
            onChange={handleCodeChange}
            onBlur={handleBlur}
            spellCheck={false}
            className="w-full p-3 sm:p-4 bg-[hsl(222,47%,5%)] text-[hsl(220,14%,96%)] font-mono text-sm outline-none resize-none min-h-[120px]"
            style={{ tabSize: 2 }}
            rows={editableCode.split("\n").length + 1}
          />
        ) : (
          <pre
            className={`p-3 sm:p-4 !bg-[hsl(222,47%,5%)] !m-0 ${canRun ? "cursor-text" : ""}`}
          >
            <code ref={codeRef} className={`language-${prismLang} font-mono text-sm`}>
              {editableCode}
            </code>
          </pre>
        )}
      </div>

      {/* Output Panel */}
      {result && (
        <div className="border-t border-border">
          <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-secondary/30 border-b border-border/50">
            <Terminal className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">Output</span>
            <span className="text-xs text-muted-foreground ml-auto">
              {result.duration.toFixed(0)}ms
            </span>
            <button
              onClick={() => setResult(null)}
              className="p-1 rounded hover:bg-secondary text-muted-foreground"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
          <div className="p-3 sm:p-4 bg-[hsl(222,47%,3%)] max-h-48 overflow-auto">
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
