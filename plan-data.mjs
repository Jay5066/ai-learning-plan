// Source of truth for the learning plan. Run `npm run build` after editing.
      const YT = "https://www.youtube.com/watch?v=";
      const DLAI = "https://learn.deeplearning.ai/courses/";

      function v(id, title, meta, verified, extra) { return { kind: "video", url: YT + id + (extra || ""), text: title, meta: meta, verified: verified }; }
      function c(slug, title, meta) { return { kind: "course", url: DLAI + slug, text: title, meta: meta }; }
      function d(url, title, meta) { return { kind: "doc", url: url, text: title, meta: meta }; }

      export const PLAN = [
        {
          n: 1, level: 1, title: "Foundations: how LLMs work and effective prompting",
          goal: "Understand tokens, context windows and hallucinations, and prompt well.",
          items: [
            {
              id: "1-1", title: "How LLMs work: tokens, context windows, hallucinations",
              desc: "Watch both; the first is the more practical one.",
              links: [
                v("XPq_tcPY1MU", "How LLMs Actually Work: Tokens, Context Windows and Hallucinations", "AI in Practice", false),
                v("vAtDue4yx6E", "Large Language Models Explained: How LLMs Actually Work", "SH's Lab", false)
              ]
            },
            {
              id: "1-2", title: "Prompting for real work",
              desc: "Do the modules on finding information and building small apps; skip the rest if short on time.",
              links: [c("ai-prompting-for-everyone", "AI Prompting for Everyone", "DeepLearning.AI, about 7h")]
            },
            {
              id: "1-3", title: "Practice: two weeks of daily LLM use on real dev tasks", practice: true,
              desc: "Keep a prompt journal: what worked, what the model got wrong, and how you verified it."
            }
          ]
        },

        {
          n: 2, level: 2, title: "AI pair programming with GitHub Copilot in VS Code",
          goal: "Use chat, inline suggestions and agent mode productively, and review every diff.",
          items: [
            {
              id: "2-1", title: "VS Code agents quickstart",
              desc: "Complete the first agent task from the official quickstart.",
              links: [d("https://code.visualstudio.com/docs/agents/quickstart", "Agents quickstart (VS Code docs)", "official"),
              d("https://code.visualstudio.com/docs/agents/overview", "Build with AI in VS Code (overview)", "official")]
            },
            {
              id: "2-2", title: "Copilot in VS Code: hands-on lab",
              links: [v("dxDqelvVc2U", "Hands-On Lab: The Power of GitHub Copilot in VS Code", "Visual Studio Code (official)", false)]
            },
            {
              id: "2-3", title: "Practice: use Copilot on a real module or theme task", practice: true,
              desc: "Explain unfamiliar code, generate tests, refactor one function, then review the diff and run the tests yourself."
            }
          ]
        },

        {
          n: 3, level: 3, title: "Customizing Copilot: instructions, agents, skills, MCP",
          goal: "Teach the tools your project's conventions so output is consistent.",
          items: [
            {
              id: "3-1", title: "Agent customizations in VS Code",
              desc: "Instructions, prompts, skills, hooks, MCP servers and plugins.",
              links: [
                v("os2eqa69gko", "Mastering AI with VS Code's New Agent Customizations", "James Montemagno", false),
                v("ZzMr9TeJoTs", "GitHub Copilot One Shot 2026: Instructions, Skills, MCP, Hooks and Agents", "CodeSnippet by Chetan", false)
              ]
            },
            {
              id: "3-2", title: "Official guide: adapt agents to your project",
              links: [d("https://code.visualstudio.com/docs/agents/guides/customize-copilot-guide", "Customize Copilot guide (VS Code docs)", "official")]
            },
            {
              id: "3-3", title: "Practice: add instructions, a custom agent and a skill to a repo", practice: true,
              desc: "Encode coding standards, test commands and review rules. Compare output before and after."
            }
          ]
        },

        {
          n: 4, level: 4, title: "Agentic coding with Claude Code",
          goal: "Plan, implement, test and review with a terminal coding agent.",
          items: [
            {
              id: "4-1", title: "Claude Code fundamentals (official partner course)",
              links: [c("claude-code-a-highly-agentic-coding-assistant", "Claude Code: A Highly Agentic Coding Assistant", "DeepLearning.AI with Anthropic, 2h")]
            },
            {
              id: "4-2", title: "Full beginner tutorials",
              desc: "Watch one end to end, skim the other for settings and workflow tips.",
              links: [
                v("ntDIxaeo3Wg", "Claude Code: Full Tutorial for Beginners", "Tech With Tim", false),
                v("X_zVY3-mbM8", "FULL Claude Code Tutorial For Beginners in 2026", "AI Foundations", false)
              ]
            },
            {
              id: "4-3", title: "Build with a coding agent and deploy to Hugging Face Spaces",
              links: [v("44RXU8Cxoas", "Build a Business Dashboard with AI in Minutes (Codex, Claude Code, Hugging Face)", "Hugging Face, about 27 min", true)]
            },
            {
              id: "4-4", title: "Practice: ship a small web app with Claude Code", practice: true,
              desc: "Use plan mode first, commit often, and write down where the agent needed correction."
            }
          ]
        },

        {
          n: 5, level: 5, title: "LLM APIs, structured output and tool calling",
          goal: "Call model APIs from code and get reliable, validated output.",
          items: [
            {
              id: "5-1", title: "First API calls: keys, requests, thinking levels, chat history",
              links: [v("JGly6PSK5iw", "Gemini 4 Argon API Crash Course", "freeCodeCamp, about 10 min", true)]
            },
            {
              id: "5-2", title: "Reliable structured outputs with Pydantic",
              desc: "Python is used here; the ideas (schemas, validation, retries) transfer to TypeScript with Zod.",
              links: [c("pydantic-for-llm-workflows", "Pydantic for LLM Workflows", "DeepLearning.AI, 1h50m")]
            },
            {
              id: "5-3", title: "Claude API mechanics: messages, streaming, caching, batch",
              desc: "Watch the 'Claude API Mechanics' section (starts at 1:48:16, about 28 min).",
              links: [v("C_1QKZAcJjk", "Claude Certified Developer Foundations (CCDV-F) Course, API mechanics section", "freeCodeCamp", true, "&t=6496s")]
            },
            {
              id: "5-4", title: "Optional: Python basics with AI assistance",
              desc: "Only if you are not yet comfortable with Python.",
              links: [c("ai-python-for-beginners", "AI Python for Beginners", "DeepLearning.AI, about 11.5h")]
            },
            {
              id: "5-5", title: "Practice: a script that returns validated JSON and calls one tool", practice: true,
              desc: "Example: classify and summarize pages from your site into a schema you define."
            }
          ]
        },

        {
          n: 6, level: 6, title: "Embeddings, vector databases and RAG",
          goal: "Build retrieval-augmented generation over your own content.",
          items: [
            {
              id: "6-1", title: "RAG with LangChain and vector databases",
              links: [
                v("mHxLXzYjQRE", "Production RAG with LangChain & Vector Databases: Full Course", "freeCodeCamp", false),
                v("qXOchjCKt0A", "LangChain Tutorial for Beginners: Vector Database and RAG Ingestion (Qdrant)", "KGP Talkie", false)
              ]
            },
            {
              id: "6-2", title: "Keyword plus vector (hybrid) search in PostgreSQL",
              links: [v("kT7nXO32L-Q", "PostgreSQL Hybrid Search Course: Keyword (BM25) + Vector Retrieval", "freeCodeCamp, about 58 min", true)]
            },
            {
              id: "6-3", title: "Optional deep dive: production RAG",
              desc: "Pick the modules on evaluation and deployment.",
              links: [c("retrieval-augmented-generation", "Retrieval Augmented Generation (RAG)", "DeepLearning.AI, about 26h total")]
            },
            {
              id: "6-4", title: "Practice: RAG search over your site's content", practice: true,
              desc: "Chunk, embed, store, retrieve and answer with citations. Measure retrieval quality on 20 test questions."
            }
          ]
        },

        {
          n: 7, level: 7, title: "Agents with LangChain and LangGraph",
          goal: "Build agents with tools, memory and managed context.",
          items: [
            {
              id: "7-1", title: "Concepts in minutes: LangGraph and Deep Agents",
              links: [
                v("4iYOJ6gyQV4", "LangGraph explained in 1 minute", "LangChain", true),
                v("8gCam2-iGLc", "Deep Agents by LangChain explained in 1 minute", "LangChain", true)
              ]
            },
            {
              id: "7-2", title: "Free hands-on course: Introduction to LangGraph",
              links: [{ kind: "course", url: "https://academy.langchain.com/courses/intro-to-langgraph", text: "Introduction to LangGraph", meta: "LangChain Academy, free" }]
            },
            {
              id: "7-3", title: "Agentic design patterns from first principles",
              links: [c("agentic-ai", "Agentic AI", "DeepLearning.AI (Andrew Ng), about 10h")]
            },
            {
              id: "7-4", title: "Context engineering: offloading and summarization",
              links: [v("Ud5RsBegyfw", "How Deep Agents Manages Context: Offloading and Summarization", "LangChain, about 5 min", true)]
            },
            {
              id: "7-5", title: "Practice: an agent that uses your RAG index and two tools", practice: true,
              desc: "Add short-term memory and a human approval step before any write action."
            }
          ]
        },

        {
          n: 8, level: 7, title: "MCP: connecting agents to your systems safely",
          goal: "Build and secure Model Context Protocol servers.",
          items: [
            {
              id: "8-1", title: "Build and deploy an MCP server",
              links: [v("UYasOw2JBT4", "MCP Full Course Masterclass 2026: Build and Deploy MCP Server From Scratch", "GenAI Unplugged", false)]
            },
            {
              id: "8-2", title: "MCP security: the OWASP MCP Top 10",
              desc: "Tool poisoning, secret exposure, command injection and more.",
              links: [v("gYXLRMycVMk", "MCP Security Fundamentals Course", "freeCodeCamp, about 2h10m", true)]
            },
            {
              id: "8-3", title: "Use MCP servers from VS Code",
              links: [d("https://code.visualstudio.com/docs/agent-customization/mcp-servers", "MCP servers in VS Code", "official")]
            },
            {
              id: "8-4", title: "Practice: a read-only MCP server for your content or search", practice: true,
              desc: "Connect it to Copilot or Claude Code. Apply least privilege and log every call."
            }
          ]
        },

        {
          n: 9, level: 8, title: "Hugging Face, open models and local inference",
          goal: "Find, run and evaluate open models; know when local beats hosted.",
          items: [
            {
              id: "9-1", title: "Hugging Face beginner walkthroughs",
              links: [
                v("ZLPveA-ia1A", "Hugging Face Tutorial for Beginners (Step-by-Step 2026)", "DoITNew Lap", false),
                v("gDM75qDk29A", "Getting Started With Hugging Face In 2026", "ProgrammingKnowledge2", false)
              ]
            },
            {
              id: "9-2", title: "Agent harnesses and running models locally",
              links: [
                v("EuN8WCWQf7g", "How to Build Your Own AI Agent (Like PewDiePie)", "Hugging Face, about 24 min", true),
                v("w6dSNCg9I5k", "Llama: Local AI on Your Mac", "Hugging Face", true)
              ]
            },
            {
              id: "9-3", title: "Structured courses from Hugging Face",
              desc: "Text and notebook based. Do the LLM Course basics and the first agents units.",
              links: [
                d("https://huggingface.co/learn/llm-course", "Hugging Face LLM Course", "official"),
                d("https://huggingface.co/learn/agents-course", "Hugging Face Agents Course", "official")
              ]
            },
            {
              id: "9-4", title: "Practice: run a local model and compare it to a hosted one", practice: true,
              desc: "Swap it into your RAG app. Record quality, latency and cost differences."
            }
          ]
        },

        {
          n: 10, level: 8, title: "Always-on agents and automation (OpenClaw, n8n)",
          goal: "Run personal and team agents safely and automate real workflows.",
          items: [
            {
              id: "10-1", title: "OpenClaw setup and usage",
              desc: "Use an isolated VM or container and throwaway accounts.",
              links: [
                v("n1sfrc-RjyM", "OpenClaw Full Tutorial for Beginners: How to Set Up and Use OpenClaw", "freeCodeCamp", false),
                v("FPtZYSLogmQ", "The ULTIMATE OpenClaw Tutorial for Beginners (Step by Step, 2026)", "Hostinger Academy", false)
              ]
            },
            {
              id: "10-2", title: "OpenClaw with its community and maintainers",
              links: [v("Xe0fZxAA-Ys", "Open Source Friday: OpenClaw with Hannes Rudolph", "GitHub", true)]
            },
            {
              id: "10-3", title: "Build an always-on agent with a Telegram gateway",
              links: [v("HU03WDFB_tQ", "Build Your Own Open-Source Dots with Pi and Telegram", "Hugging Face, about 20 min", true)]
            },
            {
              id: "10-4", title: "Workflow automation with AI agents",
              links: [v("YY-egxTQirA", "n8n Full Course: Architect Scalable AI Automations from Scratch", "freeCodeCamp", true)]
            },
            {
              id: "10-5", title: "Practice: automate one recurring task end to end", practice: true,
              desc: "Example: weekly broken-link and content QA report with human approval before any change."
            }
          ]
        },

        {
          n: 11, level: 9, title: "Quality: spec-driven development, review, evals",
          goal: "Make AI-assisted work testable, reviewable and measurable.",
          items: [
            {
              id: "11-1", title: "Spec-driven development with coding agents",
              links: [
                c("spec-driven-development-with-coding-agents", "Spec-Driven Development with Coding Agents", "DeepLearning.AI with JetBrains, 1h16m"),
                v("8hHCpNVLhmI", "Open Source Friday: Spec Kit part 2", "GitHub", true)
              ]
            },
            {
              id: "11-2", title: "AI code review",
              links: [c("ai-code-review", "AI Code Review", "DeepLearning.AI with Qodo, 1h04m")]
            },
            {
              id: "11-3", title: "Evaluating AI agents",
              links: [c("evaluating-ai-agents", "Evaluating AI Agents", "DeepLearning.AI with Arize, 2h36m")]
            },
            {
              id: "11-4", title: "Making agents improve over time: model, harness, context",
              links: [v("xy_7SzwsIjM", "How to Build Agents That Improve Over Time", "LangChain (Interrupt London), about 20 min", true)]
            },
            {
              id: "11-5", title: "Practice: add an eval set and CI checks to your RAG or agent project", practice: true,
              desc: "Include prompt-injection test cases and a regression gate on retrieval quality."
            }
          ]
        },

        {
          n: 12, level: 10, title: "Capstone: ship an AI feature to production",
          goal: "Deploy, observe and document a real AI feature, then consolidate with a certification-style course.",
          items: [
            {
              id: "12-1", title: "Ship an agent end to end from VS Code",
              links: [
                v("rfBulzrp5wY", "Ship an AI Agent without leaving VS Code", "Visual Studio Code, about 10 min", true),
                v("AT3EltQ4gTM", "How to build and ship an AI agent in the GitHub Copilot app", "GitHub, about 9 min", true)
              ]
            },
            {
              id: "12-2", title: "Deploying and operating agents",
              links: [v("tJ-hlNVS7AI", "What is LangChain Managed Deep Agents?", "LangChain", true)]
            },
            {
              id: "12-3", title: "Consolidate: Agent SDK, hooks, MCP, security and cost",
              desc: "Long course; watch it in sections and take notes on gaps.",
              links: [v("C_1QKZAcJjk", "Claude Certified Developer Foundations (CCDV-F) Certification Course", "freeCodeCamp, about 7h50m", true)]
            },
            {
              id: "12-4", title: "Capstone: production-ready AI feature with docs and metrics", practice: true,
              desc: "Example: AI-assisted site search or content assistant with auth, rate limits, logging, evals and a rollback plan."
            },
            { id: "12-5", title: "Write a short case study and present it to your team", practice: true }
          ]
        }
      ];
