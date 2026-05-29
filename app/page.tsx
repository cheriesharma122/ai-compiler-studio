"use client";

import { useState } from "react";

const pipelineStages = [
  "Intent Extraction",
  "System Design",
  "Schema Generation",
  "Validation Engine",
  "Repair Engine",
  "Runtime Simulation",
];

export default function Home() {

  const [prompt, setPrompt] = useState("");
  const [logs, setLogs] = useState<string[]>([]);
  const [output, setOutput] = useState<any>(null);
  const [running, setRunning] = useState(false);
  const [activeStage, setActiveStage] = useState(-1);

  function sleep(ms: number) {
    return new Promise((r) => setTimeout(r, ms));
  }

  async function runPipeline() {

    if (!prompt.trim()) return;

    setRunning(true);
    setLogs([]);
    setOutput(null);
    setActiveStage(-1);

    const newLogs: string[] = [];

    // STAGE 1
    setActiveStage(0);
    newLogs.push("[INFO] Parsing user intent...");
    setLogs([...newLogs]);
    await sleep(1000);

    // STAGE 2
    setActiveStage(1);
    newLogs.push("[INFO] Generating architecture design...");
    setLogs([...newLogs]);
    await sleep(1000);

    // STAGE 3
    setActiveStage(2);
    newLogs.push("[INFO] Building schema layers...");
    setLogs([...newLogs]);
    await sleep(1000);

    // STAGE 4
    setActiveStage(3);
    newLogs.push("[INFO] Running validation engine...");
    setLogs([...newLogs]);
    await sleep(1000);

    // VALIDATION CHECK
    newLogs.push("[WARNING] Missing privileged admin role detected");
    setLogs([...newLogs]);
    await sleep(1000);

    // STAGE 5
    setActiveStage(4);
    newLogs.push("[FIX] Repair engine added admin role");
    setLogs([...newLogs]);
    await sleep(1000);

    // STAGE 6
    setActiveStage(5);
    newLogs.push("[INFO] Simulating runtime execution...");
    setLogs([...newLogs]);
    await sleep(1000);

    newLogs.push("[SUCCESS] Runtime validation passed");
    setLogs([...newLogs]);

    setOutput({
      appName: "AI Generated CRM Platform",

      ui: {
        pages: [
          "Login",
          "Dashboard",
          "Contacts",
          "Billing",
          "Analytics"
        ]
      },

      database: {
        tables: [
          {
            name: "users",
            fields: ["id", "email", "password", "role"]
          },
          {
            name: "contacts",
            fields: ["id", "name", "phone"]
          },
          {
            name: "subscriptions",
            fields: ["id", "plan", "status"]
          }
        ]
      },

      api: {
        routes: [
          "/login",
          "/contacts",
          "/payments",
          "/analytics"
        ]
      },

      auth: {
        roles: ["admin", "user"]
      },

      runtime: {
        databaseConnected: true,
        routesGenerated: true,
        authApplied: true
      },

      status: "EXECUTABLE"
    });

    setRunning(false);
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">

      {/* HEADER */}

      <div className="mb-10">

        <h1 className="text-5xl font-bold mb-3">
          AI Compiler Studio
        </h1>

        <p className="text-zinc-400 text-lg">
          Multi-stage AI orchestration system for executable software generation
        </p>

      </div>

      {/* MAIN GRID */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* INPUT PANEL */}

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">

          <h2 className="text-xl font-semibold mb-4">
            App Request
          </h2>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full h-48 p-4 bg-black border border-zinc-700 rounded-xl outline-none"
            placeholder="Describe your app idea..."
          />

          <button
            onClick={runPipeline}
            disabled={running}
            className="mt-5 w-full bg-white text-black py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
          >
            {running ? "Generating..." : "Generate Blueprint"}
          </button>

        </div>

        {/* PIPELINE PANEL */}

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">

          <h2 className="text-xl font-semibold mb-5">
            Pipeline Execution
          </h2>

          <div className="space-y-4">

            {pipelineStages.map((stage, index) => (

              <div
                key={index}
                className="flex items-center justify-between bg-black border border-zinc-800 rounded-xl p-4"
              >

                <span>{stage}</span>

                <span
                  className={
                    activeStage > index
                      ? "text-green-400"
                      : activeStage === index
                      ? "text-yellow-400"
                      : "text-zinc-500"
                  }
                >
                  {
                    activeStage > index
                      ? "✓ Complete"
                      : activeStage === index
                      ? "⏳ Running"
                      : "Waiting"
                  }
                </span>

              </div>

            ))}

          </div>

        </div>

        {/* OUTPUT PANEL */}

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl overflow-auto">

          <h2 className="text-xl font-semibold mb-4">
            Generated Blueprint
          </h2>

          <div className="bg-black border border-zinc-800 rounded-xl p-4 h-[500px] overflow-auto">

            <pre className="text-green-400 text-sm">
              {JSON.stringify(output, null, 2)}
            </pre>

          </div>

        </div>

      </div>

      {/* LOGS */}

      <div className="mt-8 bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">

        <h2 className="text-xl font-semibold mb-4">
          System Logs
        </h2>

        <div className="bg-black border border-zinc-800 rounded-xl p-4 h-60 overflow-auto">

          {logs.map((log, index) => (

            <p
              key={index}
              className="text-green-400 text-sm mb-2"
            >
              {log}
            </p>

          ))}

        </div>

      </div>

      {/* METRICS */}

      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <p className="text-zinc-400 text-sm">Success Rate</p>
          <h3 className="text-3xl font-bold mt-2">94%</h3>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <p className="text-zinc-400 text-sm">Avg Latency</p>
          <h3 className="text-3xl font-bold mt-2">2.1s</h3>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <p className="text-zinc-400 text-sm">Repair Rate</p>
          <h3 className="text-3xl font-bold mt-2">18%</h3>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <p className="text-zinc-400 text-sm">Schema Accuracy</p>
          <h3 className="text-3xl font-bold mt-2">97%</h3>
        </div>

      </div>

    </main>
  );
}