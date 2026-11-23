import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { AlertTriangle, Loader2, Code2, ExternalLink, ArrowLeft, Download, Settings2, Plus, Trash2, Check, Rocket, Copy } from "lucide-react";
import { getappstatus, getappenv, updateappenv, getappfiles, updateappfiles } from "../../../api/baseapi";
import { APIURL } from "../../../api/apiurl";
import { USER_DASHBOARD_ROUTE } from "../../../helper/routes";

// Preview panel is disabled: with deploy=true an empty Coolify resource is
// created and there is no live build to embed yet. The original preview imports
// (kept here for when the panel is re-enabled) were:
// import { useState, useEffect, useRef } from "react";
// import { AlertTriangle, Loader2, Code2, RefreshCw, ExternalLink, ArrowLeft,
//   Download, Settings2, Plus, Trash2, Check, Rocket } from "lucide-react";

// location.state is a nice-to-have (avoids one fetch when it's present), but
// the page must work without it too — navigate(`/webpreviewextra/${id}`)
// doesn't pass any state, so a fetch-by-id on mount is the source of truth.
interface PreviewLocationState {
    url?: string | null;
    buildError?: string | null;
}

const DEFAULT_INSTRUCTIONS = [
    "1. Select the project ZIP.",
    "2. Open that folder in IClouds AI.",
    "3. type: start",
    "4. Tell the agent what you want changed.",
    "5. Use normal prompts for further changes.",
].join("\n");

const instructionsToText = (value: unknown): string => {
    if (typeof value === "string") return value;
    if (!Array.isArray(value)) return "";
    return value
        .map((step) =>
            typeof step === "string"
                ? step
                : [step?.title || "", step?.desc || ""].filter(Boolean).join(" | ")
        )
        .join("\n");
};

export function WebPreviewExtra() {
    const { id: preferenceId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const state = (location.state || {}) as PreviewLocationState;

    const [url, setUrl] = useState<string | null>(state.url ?? null);
    const [buildError, setBuildError] = useState<string | null>(state.buildError ?? null);
    const [statusLoading, setStatusLoading] = useState(state.url === undefined && state.buildError === undefined);
    const [appId, setAppId] = useState<string | null>(null);
    const [appName, setAppName] = useState<string | null>(null);
    const [deploying, setDeploying] = useState(false);
    // Whether this app has a hosted (Coolify) deployment. False for the free
    // plan and config-only engines (wordpress, seo) — download-only.
    const [deployEnabled, setDeployEnabled] = useState(true);
    // The app's engine ("supa" | "mongo" | "node" | "laravel" | "wordpress" |
    // "seo"). wordpress/seo are config-only: they are never hosted.
    const [engine, setEngine] = useState<string | null>(null);
    // "How to use" steps generated from the business type.
    const [instructions, setInstructions] = useState("");

    // ── Preview panel state (disabled — kept for when the panel is re-enabled) ──
    // const [previewKey, setPreviewKey] = useState(0);
    // const [refreshing, setRefreshing] = useState(false);
    // const [appReachable, setAppReachable] = useState<boolean | null>(null);
    // const prevStatusRef = useRef<string | null>(null);

    // ── Per-app project files (.env / AGENTS.md / opencode.json) ──
    // A tabbed editor for the three exported files. `.env` is a KEY/value list;
    // the other two are raw text. Everything is stamped into the zip on the next
    // download — it does not affect an already-downloaded project.
    type EnvRow = { key: string; value: string };
    type EditorTab = "env" | "agents" | "opencode" | "howto";
    const [activeTab, setActiveTab] = useState<EditorTab>("env");
    const [filesLoading, setFilesLoading] = useState(false);
    const [filesSaving, setFilesSaving] = useState(false);
    const [filesSaved, setFilesSaved] = useState(false);
    const [filesError, setFilesError] = useState<string | null>(null);
    const [envRows, setEnvRows] = useState<EnvRow[]>([]);
    const [agentsMd, setAgentsMd] = useState("");
    const [opencodeJson, setOpencodeJson] = useState("");
    const [instructionsText, setInstructionsText] = useState("");
    // Bumped after every successful save so the download link requests a fresh
    // zip instead of a browser-cached copy of the previous one.
    const [zipVersion, setZipVersion] = useState(0);
    // Direct .zip link for the "Edit your project locally" panel. Shown in a
    // read-only input so the user can copy it instead of downloading.
    const [zipCopied, setZipCopied] = useState(false);
    const [appIdCopied, setAppIdCopied] = useState(false);

    // Loads the three exported files once the app is known: the .env as an
    // editable KEY/value list, and AGENTS.md / opencode.json as text. The
    // editor is always visible — no expand/collapse.
    const loadEditor = async () => {
        if (!preferenceId) return;
        setFilesLoading(true);
        setFilesError(null);
        try {
            const [files, env] = await Promise.all([
                getappfiles(preferenceId),
                getappenv(preferenceId),
            ]);
            if (files?.success) {
                setAgentsMd(files.data?.agentsMd || "");
                setOpencodeJson(files.data?.opencodeJson || "");
                const instructionsText = instructionsToText(files.data?.instructions);
                if (instructionsText) {
                    setInstructions(instructionsText);
                    setInstructionsText(instructionsText);
                }
            }
            if (env?.success) {
                const map = (env.data?.env || {}) as Record<string, string>;
                setEnvRows(Object.entries(map).map(([key, value]) => ({ key, value: String(value) })));
            }
        } catch {
            setFilesError("Could not load the project files.");
        } finally {
            setFilesLoading(false);
        }
    };

    useEffect(() => {
        if (!preferenceId) return;
        let cancelled = false;

        (async () => {
            try {
                const data = await getappstatus(preferenceId);
                if (cancelled) return;
                if (data.success) {
                    setUrl(data.data?.url ?? data.data?.previewUrl ?? null);
                    setBuildError(data.data?.buildError ?? null);
                    if (data.data?.appId) setAppId(data.data.appId);
                    if (data.data?.appName) setAppName(data.data.appName);
                    setDeploying(data.data?.status === "generating");
                    setDeployEnabled(data.data?.deployEnabled !== false);
                    setEngine(data.data?.engine ?? null);
                    if (typeof data.data?.instructions === "string" && data.data.instructions.trim()) setInstructions(data.data.instructions);
                    // App exists — load the editable project files (async, so no
                    // synchronous state update inside the effect body).
                    if (data.data?.appId) await loadEditor();
                }
            } catch {
                // Silent — keeps whatever state.url/buildError we already had, if any.
            } finally {
                if (!cancelled) setStatusLoading(false);
            }
        })();

        return () => { cancelled = true; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [preferenceId]);

    // Preview refresh (disabled with the preview panel). Bumped the iframe key
    // AND showed a brief "refreshing…" pill; the key change also fed
    // `previewIframeSrc`'s ?_cb= param so the reload bypassed the HTTP cache.
    // const bumpPreview = () => {
    //     setPreviewKey((k) => k + 1);
    //     setRefreshing(true);
    //     window.setTimeout(() => setRefreshing(false), 2500);
    // };

    // Poll app-status while an app is still being created, so the page updates
    // the moment it's ready. 5s poll, only while the tab is visible.
    useEffect(() => {
        if (!preferenceId) return;
        const poll = async () => {
            if (document.visibilityState !== "visible") return;
            try {
                const data = await getappstatus(preferenceId);
                if (!data?.success) return;

                const status: string | null = data.data?.status ?? null;
                // Preview auto-refresh on build completion (disabled with the panel):
                // const wasBusy = prevStatusRef.current === "generating";
                // const nowBusy = status === "generating";
                // setDeploying(nowBusy);
                // if (wasBusy && !nowBusy && status === "ready") bumpPreview();
                // prevStatusRef.current = status;
                setDeploying(status === "generating");
                if (data.data?.deployEnabled !== undefined) setDeployEnabled(data.data.deployEnabled !== false);
                if (data.data?.engine) setEngine(data.data.engine);
                if (data.data?.buildError !== undefined) setBuildError(data.data.buildError);
                if (data.data?.previewUrl || data.data?.url) {
                    setUrl(data.data?.previewUrl ?? data.data?.url);
                }
                if (data.data?.appId) setAppId(data.data.appId);
                if (data.data?.appName) setAppName(data.data.appName);
                if (Array.isArray(data.data?.instructions)) setInstructions(data.data.instructions);
            } catch {
                // Backend temporarily unreachable — try again next tick.
            }
        };
        const iv = setInterval(poll, 5000);
        return () => clearInterval(iv);
    }, [preferenceId]);

    // ── Preview URL reachability probe (disabled with the preview panel) ──
    // A fresh hostname has no SSL cert yet, so it can be live on the server but
    // unreachable over HTTPS for the first minute. Probing avoided mounting an
    // iframe that just showed the browser's "temporarily down" page.
    //
    // useEffect(() => {
    //     if (!url) {
    //         setAppReachable(null);
    //         return;
    //     }
    //     let cancelled = false;
    //     (async () => {
    //         while (!cancelled) {
    //             try {
    //                 await fetch(url, { mode: "no-cors", cache: "no-store" });
    //                 if (!cancelled) setAppReachable(true);
    //                 return;
    //             } catch {
    //                 if (!cancelled) setAppReachable(false);
    //             }
    //             await new Promise((r) => setTimeout(r, 4000));
    //         }
    //     })();
    //     return () => { cancelled = true; };
    // }, [url, previewKey]);

    const switchTab = (tab: EditorTab) => {
        setActiveTab(tab);
        setFilesError(null);
        setFilesSaved(false);
    };

    const setEnvRow = (index: number, patch: Partial<EnvRow>) => {
        setEnvRows((rows) => rows.map((r, i) => (i === index ? { ...r, ...patch } : r)));
        setFilesSaved(false);
    };

    const addEnvRow = () => {
        setEnvRows((rows) => [...rows, { key: "", value: "" }]);
        setFilesSaved(false);
    };

    const removeEnvRow = (index: number) => {
        setEnvRows((rows) => rows.filter((_, i) => i !== index));
        setFilesSaved(false);
    };

    // Saves only the active tab: .env -> overrides, the other two -> file text.
    const saveActiveTab = async () => {
        if (!preferenceId) return;
        setFilesSaving(true);
        setFilesError(null);
        try {
            let data;
            if (activeTab === "env") {
                const env: Record<string, string> = {};
                for (const { key, value } of envRows) {
                    const k = key.trim();
                    if (k) env[k] = value;
                }
                data = await updateappenv(preferenceId, env);
            } else if (activeTab === "agents") {
                data = await updateappfiles(preferenceId, { agentsMd });
            } else if (activeTab === "opencode") {
                try {
                    JSON.parse(opencodeJson);
                } catch {
                    setFilesError("opencode.json is not valid JSON.");
                    setFilesSaving(false);
                    return;
                }
                data = await updateappfiles(preferenceId, { opencodeJson });
            } else {
                data = await updateappfiles(preferenceId, {
                    instructions: instructionsText,
                });
            }
            if (data?.success) {
                // Re-read the saved files so the editor shows exactly what the
                // next download will contain (including the updated how-to-use).
                await loadEditor();
                setZipVersion((v) => v + 1);
                setFilesSaved(true);
                window.setTimeout(() => setFilesSaved(false), 2500);
            } else {
                setFilesError(data?.message || "Could not save.");
            }
        } catch {
            setFilesError("Could not save.");
        } finally {
            setFilesSaving(false);
        }
    };

    // wordpress / seo are config-only engines: they never get a hosted app.
    const configOnly = engine === "wordpress" || engine === "seo";
    const howToText = instructions.trim() || DEFAULT_INSTRUCTIONS;
    const howToSteps = howToText.split(/\r?\n/).filter(Boolean);
    const zipUrl = appId ? `${APIURL.API_URL}apps/${appId}/opencode-project?v=${zipVersion}` : "";

    const copyZipUrl = async () => {
        if (!zipUrl) return;
        try {
            await navigator.clipboard.writeText(zipUrl);
            setZipCopied(true);
            window.setTimeout(() => setZipCopied(false), 2500);
        } catch {
            // Clipboard access can be blocked outside a secure context.
        }
    };

    const copyAppId = async () => {
        if (!appId) return;
        try {
            await navigator.clipboard.writeText(appId);
            setAppIdCopied(true);
            window.setTimeout(() => setAppIdCopied(false), 2500);
        } catch {
            // Clipboard access can be blocked outside a secure context.
        }
    };

    // ========================================================================
    // PREVIEW IFRAME / PANEL — DISABLED
    // ========================================================================
    // deploy=true creates the Coolify resource immediately, but it is empty
    // until deployment completes. The preview panel is commented out so
    // the client no longer shows an empty/erroring iframe; the former sidebar
    // is rendered as the main content area below. Uncomment these (and the
    // state/probe above) to restore the two-column preview page.
    //
    // const previewSrc = url;
    //
    // // Bumping the iframe `key` remounts the element, but the browser can still
    // // serve the *document itself* from HTTP cache. A cache-busting query param
    // // forces a genuinely fresh request on every refresh.
    // const previewIframeSrc = url ? `${url}${url.includes("?") ? "&" : "?"}_cb=${previewKey}` : null;
    //
    // // Center overlay shown while the app is building (status "generating") —
    // // or while a freshly-detected build is being swapped in.
    // const previewOverlay = (
    //     <div className="absolute inset-0 z-20 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center gap-3 text-center px-8">
    //         <Loader2 className="w-8 h-8 animate-spin text-primary" />
    //         <div>
    //             <p className="font-semibold text-black">
    //                 {deploying ? "Your app will be ready shortly…" : "New build live — refreshing preview…"}
    //             </p>
    //             <p className="text-sm text-primary2 mt-1">
    //                 {deploying
    //                     ? "We're building your site — it'll appear here automatically."
    //                     : "Hold on a moment while the latest version loads."}
    //             </p>
    //         </div>
    //     </div>
    // );
    //
    // Original preview column (left side of the old `grid lg:grid-cols-[1fr_520px]`):
    //
    // <div className="overflow-y-auto h-screen bg-white">
    //     <div className="p-4 bg-white h-full">
    //         <div className="mx-auto transition-all duration-300 rounded-xl">
    //             <div className="bg-white rounded-lg shadow-xl overflow-hidden h-[calc(100vh-32px)]">
    //                 <div className="bg-secondary px-4 py-2 flex items-center gap-2 border-b">
    //                     <button
    //                         type="button"
    //                         onClick={() => navigate(USER_DASHBOARD_ROUTE)}
    //                         title="Back to dashboard"
    //                         className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-primary2 hover:bg-white transition-colors shrink-0"
    //                     >
    //                         <ArrowLeft className="w-4 h-4" />
    //                         Back
    //                     </button>
    //                     <div className="flex gap-1.5">
    //                         <div className="w-3 h-3 rounded-full bg-red-500" />
    //                         <div className="w-3 h-3 rounded-full bg-yellow-500" />
    //                         <div className="w-3 h-3 rounded-full bg-green-500" />
    //                     </div>
    //                     <div className="flex-1 bg-white rounded px-3 py-1 text-sm text-primary2 flex items-center gap-2">
    //                         <span className="truncate">{previewSrc}</span>
    //                         {deploying && (
    //                             <span className="flex items-center gap-1 text-[11px] text-primary shrink-0">
    //                                 <Loader2 className="w-3 h-3 animate-spin" />
    //                                 deploying…
    //                             </span>
    //                         )}
    //                     </div>
    //                     <button
    //                         type="button"
    //                         onClick={bumpPreview}
    //                         title="Refresh preview"
    //                         className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-primary2 hover:bg-white"
    //                     >
    //                         <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
    //                     </button>
    //                 </div>
    //                 <div className="h-[calc(100vh-80px)] relative">
    //                     {statusLoading ? (
    //                         <div className="h-full flex items-center justify-center">
    //                             <Loader2 className="w-6 h-6 animate-spin text-primary2" />
    //                         </div>
    //                     ) : (
    //                         <>
    //                             {buildError && (
    //                                 <div className="absolute top-0 left-0 right-0 z-30 bg-yellow-50 border-b border-yellow-200 px-4 py-2 flex items-start gap-2">
    //                                     <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 shrink-0" />
    //                                     <p className="text-xs text-yellow-800">
    //                                         Your last change didn't build — showing the previous working version.
    //                                         Download the project below and fix it in opencode.
    //                                     </p>
    //                                 </div>
    //                             )}
    //                             {previewIframeSrc ? (
    //                                 appReachable ? (
    //                                     <>
    //                                         <iframe
    //                                             key={previewKey}
    //                                             src={previewIframeSrc}
    //                                             title="website-preview"
    //                                             width="100%"
    //                                             height="100%"
    //                                             style={{ border: "none" }}
    //                                         />
    //                                         {(deploying || refreshing) && previewOverlay}
    //                                     </>
    //                                 ) : (
    //                                     <div className="h-full flex items-center justify-center p-8">
    //                                         <div className="max-w-md text-center">
    //                                             <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3 text-primary" />
    //                                             <h4 className="font-semibold text-black mb-2">Your app is being prepared…</h4>
    //                                             <p className="text-sm text-primary2">
    //                                                 The first visit to a brand-new site can take a minute
    //                                                 while the SSL certificate is issued. It'll appear here
    //                                                 automatically.
    //                                             </p>
    //                                         </div>
    //                                     </div>
    //                                 )
    //                             ) : deploying ? (
    //                                 previewOverlay
    //                             ) : !deployEnabled ? (
    //                                 <div className="h-full flex items-center justify-center p-8">
    //                                     <div className="max-w-md text-center">
    //                                         <Code2 className="w-10 h-10 mx-auto mb-3 text-primary" />
    //                                         <h4 className="font-semibold text-black mb-2">
    //                                             {configOnly ? "Edit your project locally" : "No live preview on this plan"}
    //                                         </h4>
    //                                         <p className="text-sm text-primary2">
    //                                             {configOnly
    //                                                 ? "This project runs in opencode, not here. Use “Edit your project locally” on the right to download it, then open the folder in opencode to build and run it."
    //                                                 : "This app isn't hosted here — download the project on the right and open it in opencode to build and run it yourself."}
    //                                         </p>
    //                                     </div>
    //                                 </div>
    //                             ) : (
    //                                 <div className="h-full flex items-center justify-center p-8">
    //                                     <div className="max-w-md text-center">
    //                                         <AlertTriangle className="w-10 h-10 mx-auto mb-3 text-yellow-500" />
    //                                         <h4 className="font-semibold text-black mb-2">No preview yet</h4>
    //                                         <p className="text-sm text-primary2 mb-3">
    //                                             This app hasn't been deployed yet. Download the project on the right,
    //                                             open it in IClouds AI, and the preview appears here after deployment.
    //                                         </p>
    //                                     </div>
    //                                 </div>
    //                             )}
    //                         </>
    //                     )}
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // </div>
    // ========================================================================

    return (
        <div className="min-h-screen bg-secondary/40 transition-colors duration-300">
            <header className="sticky top-0 z-30 border-b bg-white">
                <div className="mx-auto flex h-14 max-w-3xl items-center gap-3 px-4">
                    <button
                        type="button"
                        onClick={() => navigate(USER_DASHBOARD_ROUTE)}
                        title="Back to dashboard"
                        className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-primary2 hover:bg-secondary transition-colors shrink-0"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </button>
                    <Code2 className="w-4 h-4 text-primary shrink-0" />
                    <h1 className="min-w-0 flex-1 truncate text-sm font-bold text-black">{appName || "Your project"}</h1>
                    {deploying && (
                        <span className="flex items-center gap-1 text-[11px] text-primary shrink-0">
                            <Loader2 className="w-3 h-3 animate-spin" />
                            preparing…
                        </span>
                    )}
                    {url && (
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-primary hover:underline"
                        >
                            Open project
                            <ExternalLink className="w-3 h-3" />
                        </a>
                    )}
                </div>
            </header>

            <main className="mx-auto max-w-3xl space-y-4 px-4 py-6">
                {buildError && (
                    <div className="flex items-start gap-2 rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3">
                        <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 shrink-0" />
                        <p className="text-xs text-yellow-800">
                            Your last change didn't build — showing the previous working version.
                            Download the project below and fix it in opencode.
                        </p>
                    </div>
                )}

                {statusLoading ? (
                    <div className="flex items-center justify-center py-24">
                        <Loader2 className="w-6 h-6 animate-spin text-primary2" />
                    </div>
                ) : (
                    <>
                        <section className="space-y-2 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                            <div className="flex items-center justify-between gap-2">
                                <div className="flex min-w-0 items-center gap-2">
                                    <Code2 className="w-4 h-4 text-primary shrink-0" />
                                    <h2 className="min-w-0 truncate font-bold text-black">{appName || "Your project"}</h2>
                                </div>
                                {appId && (
                                    <button
                                        type="button"
                                        onClick={copyAppId}
                                        title="Copy Project ID"
                                        className="inline-flex shrink-0 items-center gap-1 text-xs hover:underline"
                                    >
                                        <span className="font-semibold text-primary2">Project ID</span>
                                        <span className="font-mono text-primary">{appId}</span>
                                        {appIdCopied ? <Check className="w-3 h-3 text-primary" /> : <Copy className="w-3 h-3 text-primary" />}
                                    </button>
                                )}
                            </div>
                            {url && (
                                <div className="flex items-center justify-between gap-2 text-xs">
                                    <span className="text-primary2 shrink-0">Visit your project</span>
                                    <a
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary font-semibold hover:underline inline-flex items-center gap-1 min-w-0"
                                    >
                                        <span className="truncate">{url}</span>
                                        <ExternalLink className="w-3 h-3 shrink-0" />
                                    </a>
                                </div>
                            )}
                            {!url && (configOnly || !deployEnabled) && (
                                <p className="text-xs text-primary2">
                                    {configOnly
                                        ? "This project is edited locally — download it below and open it in opencode."
                                        : "No hosted project for this business type — download the project below to work on it."}
                                </p>
                            )}
                        </section>

                        <section className="space-y-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                            <div className="flex items-center gap-2">
                                <Rocket className="w-4 h-4 text-primary shrink-0" />
                                <h2 className="font-bold text-black text-sm">Instruction</h2>
                            </div>
                            <div className="space-y-1.5">
                                {howToSteps.map((line, i) => (
                                    <p key={i} className="text-xs text-black whitespace-pre-wrap">{line}</p>
                                ))}
                            </div>
                        </section>

                        {!deploying && appId && (
                            <section className="space-y-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                                <div className="flex items-center gap-2">
                                    <Download className="w-4 h-4 text-primary shrink-0" />
                                    <h2 className="font-bold text-black text-sm">Edit your project locally</h2>
                                </div>
                                <p className="text-xs text-primary2">
                                    Get IClouds AI, click add projects(+), copy the direct .zip link below, paste the link and click import. The agent sets everything up for you.
                                </p>
                                <a
                                    href="https://ibuild.iclouds.co.uk/iclouds-ai-builder-win-x64.exe"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                                >
                                    <ExternalLink className="w-3 h-3" />
                                    Download IClouds AI
                                </a>
                                <div className="flex items-center gap-1.5">
                                    <a
                                        href={zipUrl}
                                        title="Direct .zip download link"
                                        className="min-w-0 flex-1 break-all rounded border border-gray-300 px-2 py-1.5 text-[11px] font-mono text-primary hover:underline focus:outline-none focus:border-primary"
                                    >
                                        {zipUrl}
                                    </a>
                                    <button
                                        type="button"
                                        onClick={copyZipUrl}
                                        className="flex shrink-0 items-center gap-1 rounded-lg border border-primary px-2.5 py-1.5 text-xs font-semibold text-primary hover:bg-primary hover:text-white transition-colors"
                                    >
                                        {zipCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                        {zipCopied ? "Copied" : "Copy"}
                                    </button>
                                </div>
                            </section>
                        )}

                        {appId && (
                            <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
                                <div className="flex items-center gap-2 px-4 py-3 border-b">
                                    <Settings2 className="w-4 h-4 text-primary" />
                                    <span className="font-bold text-black text-sm">Edit project files</span>
                                </div>
                                <div>
                                    <div className="flex items-center gap-1 px-3 pt-2">
                                        {([
                                            { id: "env", label: ".env" },
                                            { id: "agents", label: "AGENTS.md" },
                                            { id: "opencode", label: "opencode.json" },
                                            { id: "howto", label: "Instruction" },
                                        ] as { id: EditorTab; label: string }[]).map((t) => (
                                            <button
                                                key={t.id}
                                                type="button"
                                                onClick={() => switchTab(t.id)}
                                                className={`rounded-t-md px-3 py-1.5 text-xs font-semibold border-b-2 ${activeTab === t.id
                                                    ? "border-primary text-primary"
                                                    : "border-transparent text-primary2 hover:text-primary"
                                                    }`}
                                            >
                                                {t.label}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="px-4 pb-4 pt-2 space-y-2">
                                        {filesLoading ? (
                                            <div className="flex items-center justify-center gap-2 text-xs text-primary2 py-6">
                                                <Loader2 className="w-4 h-4 animate-spin" /> Loading…
                                            </div>
                                        ) : (
                                            <>
                                                <p className="text-xs text-primary2">
                                                    {activeTab === "env"
                                                        ? "These values are written to the project's .env on the next download."
                                                        : activeTab === "agents"
                                                            ? "Instructions the opencode agent follows. Leave blank to use the default."
                                                            : activeTab === "opencode"
                                                                ? "The opencode.json for this project (must be valid JSON). Leave blank to use the default."
                                                                : "Plain text shown to clients as the Instruction. One step per line."}
                                                </p>

                                                {activeTab === "env" && (
                                                    <>
                                                        <div className="space-y-2">
                                                            {envRows.map((row, i) => (
                                                                <div key={i} className="flex items-center gap-1.5">
                                                                    <input
                                                                        value={row.key}
                                                                        onChange={(e) => setEnvRow(i, { key: e.target.value })}
                                                                        placeholder="KEY"
                                                                        className="w-2/5 rounded border border-gray-300 px-2 py-1 text-xs font-mono focus:outline-none focus:border-primary"
                                                                    />
                                                                    <input
                                                                        value={row.value}
                                                                        onChange={(e) => setEnvRow(i, { value: e.target.value })}
                                                                        placeholder="value"
                                                                        className="flex-1 rounded border border-gray-300 px-2 py-1 text-xs font-mono focus:outline-none focus:border-primary"
                                                                    />
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => removeEnvRow(i)}
                                                                        title="Remove"
                                                                        className="text-primary2 hover:text-red-500 p-1"
                                                                    >
                                                                        <Trash2 className="w-3.5 h-3.5" />
                                                                    </button>
                                                                </div>
                                                            ))}
                                                            {!envRows.length && <p className="text-xs text-primary2 italic">No variables.</p>}
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={addEnvRow}
                                                            className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                                                        >
                                                            <Plus className="w-3.5 h-3.5" /> Add variable
                                                        </button>
                                                    </>
                                                )}

                                                {activeTab === "agents" && (
                                                    <textarea
                                                        value={agentsMd}
                                                        onChange={(e) => { setAgentsMd(e.target.value); setFilesSaved(false); }}
                                                        rows={12}
                                                        spellCheck={false}
                                                        className="w-full rounded border border-gray-300 px-2 py-1 text-xs font-mono focus:outline-none focus:border-primary"
                                                    />
                                                )}

                                                {activeTab === "opencode" && (
                                                    <textarea
                                                        value={opencodeJson}
                                                        onChange={(e) => { setOpencodeJson(e.target.value); setFilesSaved(false); }}
                                                        rows={12}
                                                        spellCheck={false}
                                                        className="w-full rounded border border-gray-300 px-2 py-1 text-xs font-mono focus:outline-none focus:border-primary"
                                                    />
                                                )}

                                                {activeTab === "howto" && (
                                                    <textarea
                                                        value={instructionsText}
                                                        onChange={(e) => { setInstructionsText(e.target.value); setFilesSaved(false); }}
                                                        rows={12}
                                                        spellCheck={false}
                                                        className="w-full rounded border border-gray-300 px-2 py-1 text-xs font-mono focus:outline-none focus:border-primary"
                                                    />
                                                )}

                                                {filesError && <p className="text-xs text-red-600">{filesError}</p>}

                                                <button
                                                    type="button"
                                                    onClick={saveActiveTab}
                                                    disabled={filesSaving}
                                                    className="flex items-center justify-center gap-2 w-full rounded-lg bg-primary text-white px-3 py-2 text-xs font-semibold hover:opacity-90 disabled:opacity-60"
                                                >
                                                    {filesSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : filesSaved ? <Check className="w-3.5 h-3.5" /> : null}
                                                    {filesSaved ? "Saved" : "Save"}
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </section>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}
