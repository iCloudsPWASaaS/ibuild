import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button, Input, Label, Card, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/index";
import { useNavigate } from "react-router-dom";
import { usePreference } from "../../../hooks/usePreference";
import { toast } from "react-toastify";
import Seo from "../../../components/seo/Seo";
import { PREFERENCE_ROUTE } from "../../../helper/routes";
import { AIgenerator } from "../Aigenerator";

export function Preference() {
    const navigate = useNavigate();
    const [isGenerating, setIsGenerating] = useState(false);
    const [apiDone, setApiDone] = useState(false);
    const [projectId, setProjectId] = useState<string | null>(null);
    const [nodeVersion, setNodeVersion] = useState("22");
    const [appType, setAppType] = useState("supabase");
    const { mutate } = usePreference();

    const [preferences, setPreferences] = useState({
        websiteName: "",
        //description: "",
        industryFocus: "",
        style: "modern",
        font: "poppins",
        colors: {
            primary: "#2563eb",
            secondary: "#7a18fa",
            accent: "#000000"
        }
    });
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsGenerating(true);
        setApiDone(false);
        const formattedData = {
            categoryId: undefined,
            websiteName: preferences.websiteName,
            //description: preferences.description,
            industry: preferences.industryFocus,
            designStyle: preferences.style,
            font: preferences.font,
            color: {
                primaryColor: preferences.colors.primary,
                secondaryColor: preferences.colors.secondary,
                accent: preferences.colors.accent
            },
            nodeVersion,
            appType,
        };

        mutate(formattedData, {
            onSuccess: (data) => {
                if (data?.success) {
                    const id = data?.data?.preferenceId;
                    setProjectId(id);
                    setApiDone(true);
                } else {
                    setIsGenerating(false);
                    toast.error(data?.message || "Failed to save preferences. Please try again.");
                }
            },
            onError: (error:any) => {
                setIsGenerating(false);
                toast.error(error?.message || error?.response?.data?.success?.message || "Failed to save preferences. Please try again.");
            }
        });
    };
    // Loader complete hone par
    const handleLoaderCompleteExtra = () => {
        if (apiDone && projectId) {
            navigate(`/webpreviewextra/${projectId}`);
        }
    };


    return (
        <div className="min-h-screen">
            <Seo url={PREFERENCE_ROUTE} />

            {isGenerating && <AIgenerator apiDone={apiDone} onComplete={handleLoaderCompleteExtra} />}
            <div className="py-10">
                <div className="mx-auto px-4 max-w-3xl">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="text-center mb-8">
                            {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-soft badge-hero-primary rounded-full mb-4">
                                {(websitetypedata && websitetypedata?.type) ?
                                <>
                                <DynamicIcon name={websitetypedata?.iconName} className="w-4 h-4" />
                                <span className="text-sm font-medium">{websitetypedata?.type}</span>
                                </>
                                :
                                <>
                                <Sparkles className="w-4 h-4" />
                                <span className="text-sm font-medium">Step 2 of 2</span>
                                </>
                                }
                            </div> */}
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">
                                Tell us about your vision
                            </h1>
                            <p className="text-xl text-primary2">
                                Provide some details and we'll create a custom project for you
                            </p>
                        </div>

                        <Card className="p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="websiteName" className="text-black">Project Name *</Label>
                                    <Input
                                        id="websiteName"
                                        placeholder="e.g., My Awesome Company"
                                        value={preferences.websiteName}
                                        onChange={(e) => setPreferences({ ...preferences, websiteName: e.target.value })}
                                        required
                                    />
                                </div>

                                {/* <div className="space-y-2">
                                    <Label htmlFor="description" className="text-black">Description</Label>
                                    
                                    <Textarea
                                        id="description"
                                        placeholder={getPlaceholderText()}
                                        value={preferences.description}
                                        onChange={(e) => setPreferences({ ...preferences, description: e.target.value })}
                                        rows={36}
                                        className="h-auto resize-y" // remove conflicting h-* if present
                                    />
                                    <p className="text-sm text-primary2">
                                        The more details you provide, the better our AI can tailor your website
                                    </p>
                                </div> */}

                                {/* <div className="space-y-2">
                                    <Label htmlFor="industryFocus" className="text-black">Industry/Focus *</Label>
                                    <Input
                                        id="industryFocus"
                                        placeholder="e.g., Technology, Fashion, Consulting"
                                        value={preferences.industryFocus}
                                        onChange={(e) => setPreferences({ ...preferences, industryFocus: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="font" className="text-black">Font Family</Label>
                                        <Select
                                            value={preferences.font}
                                            onValueChange={(value) => setPreferences({ ...preferences, font: value })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a font" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {fontOptions.map((font) => (
                                                    <SelectItem key={font.key} value={font.key}>
                                                        {font.value}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="style" className="text-black">Design Style</Label>
                                        <Select
                                            value={preferences.style}
                                            onValueChange={(value) => setPreferences({ ...preferences, style: value })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {styleOptions.map((style) => (
                                                    <SelectItem key={style.value} value={style.value}>
                                                        {style.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-black">Project Colors</Label>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="space-y-1">
                                            <Label htmlFor="primaryColor" className="text-xs text-primary2">Primary Color</Label>
                                            <div className="flex items-center gap-2 border p-2 rounded-md">
                                                <input
                                                    type="color"
                                                    id="primaryColor"
                                                    value={preferences.colors.primary}
                                                    onChange={(e) => handleColorChange('primary', e.target.value)}
                                                    className="w-8 h-8 rounded cursor-pointer border-none p-0"
                                                />
                                                <span className="text-sm font-mono">{preferences.colors.primary}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <Label htmlFor="secondaryColor" className="text-xs text-primary2">Secondary Color</Label>
                                            <div className="flex items-center gap-2 border p-2 rounded-md">
                                                <input
                                                    type="color"
                                                    id="secondaryColor"
                                                    value={preferences.colors.secondary}
                                                    onChange={(e) => handleColorChange('secondary', e.target.value)}
                                                    className="w-8 h-8 rounded cursor-pointer border-none p-0"
                                                />
                                                <span className="text-sm font-mono">{preferences.colors.secondary}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <Label htmlFor="accentColor" className="text-xs text-primary2">Text Color</Label>
                                            <div className="flex items-center gap-2 border p-2 rounded-md">
                                                <input
                                                    type="color"
                                                    id="accentColor"
                                                    value={preferences.colors.accent}
                                                    onChange={(e) => handleColorChange('accent', e.target.value)}
                                                    className="w-8 h-8 rounded cursor-pointer border-none p-0"
                                                />
                                                <span className="text-sm font-mono">{preferences.colors.accent}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="nodeVersion" className="text-black">Node.js Version</Label>
                                        <Select value={nodeVersion} onValueChange={setNodeVersion}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {["18", "20", "22", "24"].map((v) => (
                                                    <SelectItem key={v} value={v}>Node {v}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="appType" className="text-black">Project Type</Label>
                                        <Select value={appType} onValueChange={setAppType}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="supabase">Supabase</SelectItem>
                                                <SelectItem value="mongo">MongoDB + R2</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full gradient-primary"
                                    >
                                        Generate My Project with AI
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>
                            </form>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div >
    );
}
