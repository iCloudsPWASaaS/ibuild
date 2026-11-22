import { Monitor, Smartphone, Tablet, ArrowLeft, Download, Edit3 } from "lucide-react";
import { Button } from "../index";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/index";
import { Loader } from "lucide-react";

interface PreviewHeaderProps {
    handleStartOver: () => void;
    viewMode: "desktop" | "tablet" | "mobile";
    setViewMode: (mode: "desktop" | "tablet" | "mobile") => void;
    showCustomizer: boolean;
    setShowCustomizer: (show: boolean) => void;
    selectPage: any;
    setSelectPage: any;
    preferences: any;
    handleExport: any;
    isPending: boolean;
    savedText: any;
    savedStatus: any;
}

export function PreviewHeader({
    handleStartOver,
    viewMode,
    setViewMode,
    showCustomizer,
    setShowCustomizer,
    selectPage,
    setSelectPage,
    preferences,
    handleExport,
    isPending,
    savedText,
    savedStatus
}: PreviewHeaderProps) {
    return (
        <div className="bg-white border-b sticky top-0 z-50">
            <div className="container-full mx-auto px-4 py-2">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" onClick={handleStartOver} className="text-black">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Start Over
                        </Button>
                        <div>
                            <h2 className="font-bold text-black">{preferences?.websiteName || ""}</h2>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                        <div className="text-xs bg-white px-3 py-1 rounded shadow z-10 flex items-center">
                            {savedStatus && <Loader className="w-5 h-5 animate-spin text-black" />}{savedText}
                        </div>
                        <div className="space-y-1">
                            <Select
                                value={selectPage}
                                onValueChange={setSelectPage}
                                disabled={savedStatus}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select design style" />
                                </SelectTrigger>

                                <SelectContent>
                                    {preferences?.activepages.map((value:any) => (
                                        <SelectItem key={value} value={value} className="capitalize">
                                            {value}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center bg-secondary rounded-lg p-1">
                            <button
                                onClick={() => setViewMode("desktop")}
                                className={`p-2 rounded ${viewMode === "desktop" ? "bg-white shadow" : ""}`}
                                title="Desktop View"
                            >
                                <Monitor className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode("tablet")}
                                className={`p-2 rounded ${viewMode === "tablet" ? "bg-white shadow" : ""}`}
                                title="Tablet View"
                            >
                                <Tablet className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode("mobile")}
                                className={`p-2 rounded ${viewMode === "mobile" ? "bg-white shadow" : ""}`}
                                title="Mobile View"
                            >
                                <Smartphone className="w-4 h-4" />
                            </button>
                        </div>

                        <Button variant="outline" className="text-black" onClick={() => setShowCustomizer(!showCustomizer)}>
                            <Edit3 className="w-4 h-4 mr-2" />
                            Customize
                        </Button>
                        <Button className="gradient-primary" disabled={isPending} onClick={handleExport}>
                            <Download className="w-4 h-4 mr-2" />
                            Export Website
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}