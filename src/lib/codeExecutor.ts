// Browser-based code execution engine
// Supports JavaScript/TypeScript natively, Python via Pyodide WASM

export interface ExecutionResult {
  output: string;
  error: string | null;
  duration: number;
}

type ConsoleMethod = "log" | "error" | "warn" | "info";

// Execute JavaScript code in a sandboxed environment
function executeJavaScript(code: string): ExecutionResult {
  const start = performance.now();
  const logs: string[] = [];
  
  try {
    // Create a sandboxed console
    const sandboxConsole: Record<ConsoleMethod, (...args: unknown[]) => void> = {
      log: (...args: unknown[]) => logs.push(args.map(formatValue).join(" ")),
      error: (...args: unknown[]) => logs.push(`[ERROR] ${args.map(formatValue).join(" ")}`),
      warn: (...args: unknown[]) => logs.push(`[WARN] ${args.map(formatValue).join(" ")}`),
      info: (...args: unknown[]) => logs.push(args.map(formatValue).join(" ")),
    };

    // Execute in sandboxed Function scope
    const fn = new Function("console", code);
    const result = fn(sandboxConsole);
    
    // If the code returns a value and nothing was logged, show the return value
    if (result !== undefined && logs.length === 0) {
      logs.push(formatValue(result));
    }

    return {
      output: logs.join("\n"),
      error: null,
      duration: performance.now() - start,
    };
  } catch (err: unknown) {
    return {
      output: logs.join("\n"),
      error: err instanceof Error ? `${err.name}: ${err.message}` : String(err),
      duration: performance.now() - start,
    };
  }
}

function formatValue(val: unknown): string {
  if (val === null) return "null";
  if (val === undefined) return "undefined";
  if (typeof val === "object") {
    try {
      return JSON.stringify(val, null, 2);
    } catch {
      return String(val);
    }
  }
  return String(val);
}

// Pyodide-based Python execution
let pyodidePromise: Promise<unknown> | null = null;

async function loadPyodide(): Promise<unknown> {
  if (pyodidePromise) return pyodidePromise;
  
  pyodidePromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js";
    script.onload = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const pyodide = await (window as any).loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/",
        });
        resolve(pyodide);
      } catch (err) {
        pyodidePromise = null;
        reject(err);
      }
    };
    script.onerror = () => {
      pyodidePromise = null;
      reject(new Error("Failed to load Pyodide"));
    };
    document.head.appendChild(script);
  });
  
  return pyodidePromise;
}

async function executePython(code: string): Promise<ExecutionResult> {
  const start = performance.now();
  
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pyodide = (await loadPyodide()) as any;
    
    // Capture stdout
    pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
sys.stderr = StringIO()
    `);
    
    pyodide.runPython(code);
    
    const stdout = pyodide.runPython("sys.stdout.getvalue()");
    const stderr = pyodide.runPython("sys.stderr.getvalue()");
    
    // Reset stdout/stderr
    pyodide.runPython(`
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
    `);
    
    return {
      output: stdout?.trim() || "",
      error: stderr?.trim() || null,
      duration: performance.now() - start,
    };
  } catch (err: unknown) {
    return {
      output: "",
      error: err instanceof Error ? err.message : String(err),
      duration: performance.now() - start,
    };
  }
}

export const SUPPORTED_LANGUAGES = ["javascript", "typescript", "python"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export function isLanguageSupported(lang: string): lang is SupportedLanguage {
  return SUPPORTED_LANGUAGES.includes(lang.toLowerCase() as SupportedLanguage);
}

export async function executeCode(code: string, language: string): Promise<ExecutionResult> {
  const lang = language.toLowerCase();
  
  switch (lang) {
    case "javascript":
    case "typescript":
      return executeJavaScript(code);
    case "python":
      return executePython(code);
    default:
      return {
        output: "",
        error: `Language "${language}" is not yet supported for execution. Supported: JavaScript, TypeScript, Python.`,
        duration: 0,
      };
  }
}
