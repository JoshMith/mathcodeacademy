import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const PISTON_API = "https://emkc.org/api/v2/piston";

// Map common language names to Piston runtime names
const LANGUAGE_MAP: Record<string, { language: string; version: string }> = {
  python: { language: "python", version: "3.10.0" },
  javascript: { language: "javascript", version: "18.15.0" },
  typescript: { language: "typescript", version: "5.0.3" },
  java: { language: "java", version: "15.0.2" },
  c: { language: "c", version: "10.2.0" },
  cpp: { language: "c++", version: "10.2.0" },
  "c++": { language: "c++", version: "10.2.0" },
  rust: { language: "rust", version: "1.68.2" },
  bash: { language: "bash", version: "5.2.0" },
  sql: { language: "sqlite3", version: "3.36.0" },
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { code, language } = await req.json();

    if (!code || !language) {
      return new Response(
        JSON.stringify({ error: "Missing 'code' or 'language' field" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const langKey = language.toLowerCase();
    const runtime = LANGUAGE_MAP[langKey];

    if (!runtime) {
      return new Response(
        JSON.stringify({ error: `Unsupported language: ${language}. Supported: ${Object.keys(LANGUAGE_MAP).join(", ")}` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const response = await fetch(`${PISTON_API}/execute`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: runtime.language,
        version: runtime.version,
        files: [{ name: `main`, content: code }],
        stdin: "",
        run_timeout: 10000,
        compile_timeout: 10000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Piston API error [${response.status}]: ${errorText}`);
    }

    const result = await response.json();
    
    const output = result.run?.output || "";
    const stderr = result.run?.stderr || "";
    const exitCode = result.run?.code ?? 0;
    const compileOutput = result.compile?.output || "";

    return new Response(
      JSON.stringify({
        output: output.trim(),
        stderr: stderr.trim(),
        exitCode,
        compileOutput: compileOutput.trim(),
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Code execution error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
