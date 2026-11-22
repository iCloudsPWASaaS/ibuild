import { useState } from "react";
import { Customizer } from "../components/customizer/Customizer";
import type { WebsitePreferences } from "../app/types/website";
import { Card, Button, PreviewHeader } from "../components/index";
import { Sparkles, CheckCircle, Settings, Edit3, Download } from "lucide-react";
import { Eye } from "lucide-react";
import { EyeOff, Pencil } from "lucide-react";
import { sectionSchemas } from "../helper/sectionSchemas";
import EditPanelModal from "../components/customizer/EditPanelModal";
import { LayoutTemplate, Wand2 } from "lucide-react";
import { GeneratingLoader } from "../components/customizer/GeneratingLoader";
type SectionType = keyof typeof sectionSchemas;
type Section = {
    id: string;
    type: SectionType;
    variant: string;
    visible: boolean;
    data: Record<string, any>;
};
interface EditorProps {
    showCustomizer: boolean;
    websiteId?: string;
    preferences: any;
    setPreferences: (preferences: WebsitePreferences) => void;
    setShowCustomizer: (show: boolean) => void;
    getViewModeClass: () => string;
    handleStartOver: () => void;
    viewMode: "desktop" | "tablet" | "mobile";
    setViewMode: (mode: "desktop" | "tablet" | "mobile") => void;
    iframeRef: any;
    selectPage: any;
    setSelectPage: any;
    pagesList: any;
    handleExport: any;
    isPending: any;
    handleRegenerate: (show: string) => void;
    regenerateIsPending: any;
    refreshKey: number;
    sectionsActiveData: any;
    activeSection: any;
    sectionOverlay: any;
    toggleSectionVisibility: (show: string) => void;
    sectionsData: any;
    onSectionSelect: (show: any) => void;
    updateSectionData: any;
    activeSectionModal: boolean;
    setActiveSectionModal: (show: boolean) => void;
    savedText: any;
    savedStatus: any;
    updateSectionReorder: any;
    handleEditModal: any;
    modalSectionsData: Section | null;
    userfeature: any
}

export function Editor({
    websiteId,
    showCustomizer,
    preferences,
    setPreferences,
    setShowCustomizer,
    getViewModeClass,
    handleStartOver,
    viewMode,
    setViewMode,
    iframeRef,
    selectPage,
    setSelectPage,
    pagesList,
    handleExport,
    isPending,
    handleRegenerate,
    regenerateIsPending,
    refreshKey,
    sectionsActiveData,
    activeSection,
    sectionOverlay,
    toggleSectionVisibility,
    sectionsData,
    onSectionSelect,
    updateSectionData,
    activeSectionModal,
    setActiveSectionModal,
    savedText,
    savedStatus,
    updateSectionReorder,
    handleEditModal,
    modalSectionsData,
    userfeature
}: EditorProps) {
    const userdata = userfeature;
    // Customizer component
    const [isSectionOpen, setIsSectionOpen] = useState({
        identity: false,
        image: false,
        other: false,
        uistyle: false,
        appearance: false,
        structure: false,
        sections: false,
    }); // default: open

    function SectionItem({ section }: any) {
        return (
            <div className={`sectionVisibilityEdit transition-all`}
                style={{
                    top: sectionOverlay.top,
                    height: sectionOverlay.height,
                }}
            >
                <div className={`sectionVisibilityEditInner`}>
                    {/* 🔥 Hover Actions */}
                    <div className="sectionVisibilityHover absolute right-3 top-3 flex items-center gap-2 transition z-10">

                        {/* Hide/Show */}
                        <button
                            onClick={() => toggleSectionVisibility(section?.id)}
                            className="p-2 shadow"
                            title={section?.visible ? "Hide section" : "Show section"}
                        >
                            {section?.visible ? (
                                <Eye className="w-4 h-4 text-gray-200" />
                            ) : (
                                <EyeOff className="w-4 h-4 text-gray-400" />
                            )}
                        </button>
                        <hr className="sectionVisibilityhr bg-gray-500" />
                        {/* Edit (optional) */}
                        <button
                            className={`p-2 shadow group ${!section.visible && "cursor-not-allowed"}`}
                            title="Edit section"
                            onClick={() => handleEditModal(section?.id)}
                            disabled={!section.visible}

                        >
                            <Pencil className="w-4 h-4 text-gray-200" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }


    function EmptyPageState({ onGenerate }: any) {
        return (
            <div className="flex items-center justify-center h-full w-full bg-gradient-to-br from-gray-50 to-gray-100">

                <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-8 max-w-md w-full text-center">

                    {/* ICON */}
                    <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-blue-50">
                        <LayoutTemplate className="text-blue-500" size={28} />
                    </div>

                    {/* TITLE */}
                    <h2 className="text-lg font-semibold text-white">
                        This page is not generated yet
                    </h2>

                    {/* DESCRIPTION */}
                    <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                        You’ve added a new page, but it doesn’t have any layout yet.
                        Generate the layout to preview and customize this page.
                    </p>

                    <div className="w-full">
                        <Button
                            variant="popular"
                            onClick={onGenerate}
                            className="mt-6 w-full transition shadow"
                        >
                            <Wand2 size={16} />
                            Apply Changes & Regenerate Site
                        </Button>
                    </div>
                    {/* OPTIONAL HELP TEXT */}
                    <p className="text-xs text-gray-400 mt-3">
                        This will update all pages and generate layout for this page.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid lg:grid-cols-[1fr_320px] h-screen overflow-hidden">

            <div className="overflow-y-auto h-screen bg-white">
                <PreviewHeader
                    handleStartOver={handleStartOver}
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                    showCustomizer={showCustomizer}
                    setShowCustomizer={setShowCustomizer}
                    selectPage={selectPage}
                    setSelectPage={setSelectPage}
                    preferences={preferences}
                    handleExport={handleExport}
                    isPending={isPending}
                    savedText={savedText}
                    savedStatus={savedStatus}
                />
                <div className="p-4 bg-white h-[calc(100vh-90px)]">
                    <div className={`mx-auto transition-all duration-300 ${getViewModeClass()} rounded-xl `}>

                        <div className="bg-white rounded-lg shadow-xl overflow-hidden ">
                            <div className="bg-secondary px-4 py-2 flex items-center gap-2 border-b">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                </div>
                                <div className="flex-1 bg-white rounded px-3 py-1 text-sm text-primary2 flex items-center gap-2">
                                    <Eye className="w-3 h-3" />
                                    <span>preview.weblify.com/{preferences?.websiteName?.toLowerCase().replace(/\s+/g, '-') || "your-website"}</span>
                                </div>
                            </div>
                            <div className="h-[calc(100vh-120px)] relative">
                                {
                                    regenerateIsPending ? (
                                        <GeneratingLoader />
                                    ) :
                                        (sectionsData?.length) ?
                                            (
                                                <>
                                                    <iframe
                                                        key={refreshKey}
                                                        ref={iframeRef}
                                                        src={"/webiframepreview/" + websiteId + "/" + selectPage}
                                                        title="website-preview"
                                                        width="100%"
                                                        height="100%"
                                                        style={{ border: "none" }}
                                                    />
                                                    {sectionsActiveData && activeSection !== null && (sectionsActiveData?.type != "header" && sectionsActiveData?.type != "footer") &&
                                                        <SectionItem
                                                            section={sectionsActiveData}
                                                            index={activeSection}
                                                        />}
                                                </>
                                            )
                                            :
                                            (
                                                <EmptyPageState onGenerate={() => handleRegenerate("full-page")} />
                                            )

                                }

                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="h-screen sticky top-0 overflow-y-auto">
                <div className="container-full mx-auto px-4 py-2 h-full">

                    {showCustomizer ? (
                        <Customizer
                            websiteId={websiteId}
                            preferences={preferences}
                            setPreferences={setPreferences}
                            setShowCustomizer={setShowCustomizer}
                            pagesList={pagesList}
                            handleRegenerate={handleRegenerate}
                            regenerateIsPending={regenerateIsPending}
                            sectionsData={sectionsData}
                            updateSectionReorder={updateSectionReorder}
                            activeSection={activeSection}
                            toggleSectionVisibility={toggleSectionVisibility}
                            onSectionSelect={onSectionSelect}
                            handleEditModal={handleEditModal}
                            isSectionOpen={isSectionOpen}
                            setIsSectionOpen={setIsSectionOpen}
                            userdata={userdata}
                        />
                    ) : (
                        <div className="space-y-4">
                            <Card className="p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <Sparkles className="w-5 h-5 text-primary" />
                                    <h3 className="font-bold text-black">AI Features</h3>
                                </div>
                                <div className="space-y-3">
                                    {[
                                        "Responsive Design",
                                        "SEO Optimized",
                                        "Fast Loading",
                                        "Mobile-First",
                                        "Accessibility Ready",
                                        "Cross-Browser Compatible"
                                    ].map((feature, index) => (
                                        <div key={index} className="flex items-center gap-2 text-sm">
                                            <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                                            <span className="text-black">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            <Card className="p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <Settings className="w-5 h-5 text-primary" />
                                    <h3 className="font-bold text-black">Quick Actions</h3>
                                </div>
                                <div className="space-y-2 ">
                                    <Button onClick={() => { window.open("/webiframepreview/" + websiteId + "/" + selectPage) }} variant="outline" className="w-full justify-start text-black">
                                        <Sparkles className="w-4 h-4 mr-2" />
                                        Preview
                                    </Button>
                                    <Button onClick={() => {
                                        setShowCustomizer(!showCustomizer);
                                        setIsSectionOpen(prev => ({ ...prev, uistyle: true }))
                                    }} variant="outline" className="w-full justify-start text-black">
                                        <Edit3 className="w-4 h-4 mr-2" />
                                        Edit Content
                                    </Button>
                                    <Button onClick={() => {
                                        setShowCustomizer(!showCustomizer);
                                        setIsSectionOpen(prev => ({ ...prev, other: true }))
                                    }}
                                        variant="outline" className="w-full justify-start text-black">
                                        <Settings className="w-4 h-4 mr-2" />
                                        Change Style
                                    </Button>
                                    <Button onClick={handleExport} variant="outline" className="w-full justify-start text-black">
                                        <Download className="w-4 h-4 mr-2" />
                                        Export Website
                                    </Button>
                                </div>
                            </Card>

                            <Card className="p-6 bg-gradient-primary border-primary">
                                <h3 className="font-bold mb-2 text-black">Next Steps</h3>
                                <ul className="space-y-2 text-sm text-primary2 ">
                                    <li>• Customize colors and fonts</li>
                                    <li>• Add your own logo and favicon</li>
                                    <li>• Change new style</li>
                                    <li>• Export Website</li>
                                </ul>
                            </Card>
                        </div>
                    )}
                </div>
            </div>

            {(modalSectionsData !== null && activeSectionModal) && <EditPanelModal
                open={activeSectionModal}
                onClose={() => setActiveSectionModal(false)}
                section={modalSectionsData}
                schema={sectionSchemas[modalSectionsData?.type]}
                onChange={updateSectionData}
            />}
        </div>
    );
}