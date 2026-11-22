import { useEffect, useRef } from "react";
import { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { WebsitePreferences } from "../../types/website";
import { Editor } from "../../../editor";
import Seo from "../../../components/seo/Seo";
import { WEB_PREVIEW_ROUTE } from "../../../helper/routes";
import { usePagedata } from "../../../hooks/useWebhistory";
import { useRegeneratePreference, useUpdatePreference } from "../../../hooks/usePreferenceupdate";
import { toast } from "react-toastify";
import { useExportWebsite } from "../../../hooks/usePublish";
import buildExportPayload from "../../../export/exportWebsite";
import { getViewModeClass, setPreferencesData, UpdateOriginalPreferencesData } from "../../../helper/function";
import ConfirmModal from "../../../components/ui/confirmmodal";
import isEqual from "lodash/isEqual";
import { ExportConfirmModal } from "../../../components/customizer/ExportConfirmModal";
import ExportLoader from "../../../components/customizer/ExportLoader";
import { messageData } from "../../../helper/data";
import type { sectionSchemas } from "../../../helper/sectionSchemas";
type SectionType = keyof typeof sectionSchemas;

type Section = {
    id: string;
    type: SectionType;
    variant: string;
    visible: boolean;
    data: Record<string, any>;
};

export function WebPreviewShow({ id, data, refetch, setSuccessOpen }: any) {
    const navigate = useNavigate();
    const pagesList = usePagedata()?.data;
    const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
    const [showSuccess, setShowSuccess] = useState(true);
    const [showCustomizer, setShowCustomizer] = useState(false);
    const [selectPage, setSelectPage] = useState('home');
    const iframeRef = useRef<HTMLIFrameElement | null>(null)
    const [refreshKey, setRefreshKey] = useState(0);
    const [showConfirm, setShowConfirm] = useState(false);
    const [mode, setMode] = useState("");
    const [activeSection, setActiveSection] = useState(null);
    const [sectionOverlay, setSectionOverlay] = useState({ top: 0, height: 0 });
    const [sectionsData, setSectionsData] = useState<Section[]>([]);
    const [activeSectionModal, setActiveSectionModal] = useState(false);
    const [modalSectionId, setModalSectionsId] = useState(null);
    const [preferences, setPreferences] = useState<WebsitePreferences>();

    const { mutate: updatePreferenceMutate } = useUpdatePreference();
    const { mutate: regeneratePreferenceMutate, isPending: regenerateIsPending } = useRegeneratePreference();
    const { mutate, isPending } = useExportWebsite();

    useEffect(() => {
        setTimeout(() => {
            setShowSuccess(false)
        }, 1500)
    }, []);
    useEffect(() => {
        if (data?.data?.name) {
            var newData = setPreferencesData(data)
            handlePageData(selectPage)
            setPreferences(newData)
        }
    }, [data, selectPage]);

    const handleStartOver = () => {
        navigate("/");
    };
    const saveChanges = (value: any) => {
        if (iframeRef?.current) {
            iframeRef?.current?.contentWindow?.postMessage(
                { type: "UPDATE_WEBSITE", payload: value },
                "*"
            );
        }
    };
    useEffect(() => {
        if (preferences && preferences?.websiteName != "") {
            saveChanges(preferences)
        }
    }, [preferences]);

    const setSelectPageOnchange = (value: any) => {
        setSelectPage(value)
        refetch()
    };
    const exportWebsiteConfirm = () => {
        setConfirmOpen(false);

        if (!preferences && !data?.data?.config) {
            toast.error(messageData.error1);
            return;
        }

        const exportContent = buildExportPayload(data?.data?.config, preferences);

        const finalPayload = {
            preferenceId: id,
            pages: exportContent.pages,
            css: exportContent.css || "",
            animations: exportContent.animations || ""
        };

        mutate(finalPayload, {
            onSuccess: (response) => {
                if (response?.success === true) {
                    toast.success(response.message || messageData.success1);
                    setSuccessOpen(true);
                    refetch();
                    return;
                } else {
                    toast.error(response?.message || messageData.error1);
                    return;
                }
            },
            onError: (error) => {
                const message = error?.message || messageData.error1;
                toast.error(message);
            },
        });
    };

    const handleRegenerate = async (mode: string) => {
        if (regenerateIsPending) return;
        setMode(mode)
        if (mode == "content-only") {
            await regenerateLayouts(mode);
        } else {
            setShowConfirm(true)
        }
    };


    const regenerateLayouts = async (mode: string) => {
        if (regenerateIsPending) return;
        var redata = {
            brandTone: preferences?.brandTone,
            designStyle: preferences?.designStyle,
            contentLength: preferences?.contentlength,
            activepages: preferences?.activepages,
            mode: mode == "content-only" ? "content-only" : "full"
        }
        regeneratePreferenceMutate({
            preferenceId: id,
            data: redata,
        }, {
            onSuccess: (response) => {
                if (response.success === true) {
                    toast.success(response?.message || messageData.success2);
                    setMode("");
                    setRefreshKey((prev) => prev + 1);
                    return;
                }else{
                     toast.error(response?.message || messageData.error2);
                    setMode("");
                      return;
                }
            },
            onError: (error) => {
                const message = error?.message || messageData.error2;
                toast.error(message);
            },
        });
    };

    const handleConfirm = async () => {
        setShowConfirm(false);
        await regenerateLayouts(mode); // your API call
    };

    const handlePageData = async (page: any) => {
        var datacheck = data?.data?.config?.pages?.find((p: any) => p.id.toLowerCase() === page?.toLowerCase());
        setSectionsData(datacheck?.sections || [])
    };

    // 🧠 Listen iframe messages
    useEffect(() => {
        const handleMessage = (event: any) => {
            const { type, sectionid, rect } = event.data;

            if (type === "SECTION_HOVER" || type === "SECTION_ACTIVE") {
                setActiveSection(sectionid);

                // 👇 viewport me visible part calculate
                const viewportTop = 0;
                const viewportBottom = window.innerHeight;

                const sectionTop = rect.top;
                const sectionBottom = rect.top + rect.height;

                const visibleTop = Math.max(sectionTop, viewportTop);
                const visibleBottom = Math.min(sectionBottom, viewportBottom);

                const visibleHeight = visibleBottom - visibleTop;

                setSectionOverlay({
                    top: visibleTop,
                    height: Math.max(0, visibleHeight),
                });

            }
        };

        window.addEventListener("message", handleMessage);

        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, []);


    // =========================
    // UPDATE FUNCTIONS
    // =========================
    const onSectionSelect = (sectionid: any) => {
        setActiveSection(sectionid);
        iframeRef?.current?.contentWindow?.postMessage(
            { type: "SCROLL_TO_SECTION", sectionid },
            "*"
        );
    };

    const updateIframeData = (updatedSections: any) => {
        setSectionsData(updatedSections);
        iframeRef?.current?.contentWindow?.postMessage(
            {
                type: "UPDATE_PAGE_DATA",
                sections: updatedSections,
                pageId: selectPage,
            },
            "*"
        );
    };
    // 🔁 Toggle
    const toggleSectionVisibility = async (sectionid: string) => {
        const updatedSections = sectionsData.map((sec: any) =>
            sec.id === sectionid
                ? { ...sec, visible: !sec.visible }
                : sec
        );
        updateIframeData(updatedSections)
    };

    const updateSectionData = (field: any, value: any) => {
        const updatedSections = sectionsData.map((sec: any) =>
            sec.id === modalSectionId
                ? {
                    ...sec,
                    data: {
                        ...sec.data,
                        [field]: value,
                    },
                }
                : sec
        );
        updateIframeData(updatedSections)
    };

    const updateSectionReorder = (updatedSections: any) => {
        updateIframeData(updatedSections)
    };

    const handleEditModal = async (sectionid: any) => {
        setModalSectionsId(sectionid)
        setActiveSectionModal(true)
    };


    // =========================
    // STATES
    // =========================

    const [dirtyPreferences, setDirtyPreferences] = useState(false);
    const [dirtySections, setDirtySections] = useState(false);

    const [saving, setSaving] = useState(false);

    const prevPreferencesRef = useRef(preferences);
    const prevSectionsRef = useRef(sectionsData);

    // =========================
    // DETECT CHANGES
    // =========================

    useEffect(() => {
        if (!isEqual(prevPreferencesRef.current, preferences)) {
            prevPreferencesRef.current = preferences;
            setDirtyPreferences(true);
        }
    }, [preferences]);

    useEffect(() => {
        if (!isEqual(prevSectionsRef.current, sectionsData)) {
            prevSectionsRef.current = sectionsData;
            setDirtySections(true);
        }
    }, [sectionsData]);

    // =========================
    // AUTOSAVE (PREFERENCES)
    // =========================

    useEffect(() => {
        if (!dirtyPreferences || !id) return;

        const timer = setTimeout(async () => {
            try {
                if (saving) return;
                setSaving(true);
                const newUpdateData = UpdateOriginalPreferencesData(preferences)
                updatePreferenceMutate({
                    preferenceId: id,
                    data: newUpdateData,
                },
                    {
                        onSuccess: (response) => {
                            if (response.success === true) {
                                var datacheck = preferences?.activepages?.find((p: any) => p.toLowerCase() === selectPage?.toLowerCase());

                                if (!datacheck) {
                                    setSelectPageOnchange(preferences ? preferences?.activepages[0] : "")
                                } else {

                                }
                            }
                        },
                        onError: () => {
                        },
                    }
                );

                setDirtyPreferences(false);
            } catch (err) {
            } finally {
                setSaving(false);
            }
        }, 1500);

        return () => clearTimeout(timer);
    }, [preferences, dirtyPreferences]);

    // =========================
    // AUTOSAVE (SECTIONS)
    // =========================

    useEffect(() => {
        if (!dirtySections || !id) return;

        const timer = setTimeout(async () => {
            try {
                if (saving) return;

                setSaving(true);
                if (sectionsData?.length != 0) {
                    const updatedPages = data?.data?.config?.pages.map((page: any) => {
                        if (page.id.toLowerCase() !== selectPage?.toLowerCase()) return page;
                        return {
                            ...page,
                            sections: sectionsData,
                        };
                    });
                    updatePreferenceMutate({
                        preferenceId: id,
                        data: { pages: updatedPages },
                    });
                }
                setDirtySections(false);

            } catch (err) {
            } finally {
                setSaving(false);
            }
        }, 1500);

        return () => clearTimeout(timer);
    }, [data, sectionsData, dirtySections]);

    const [confirmOpen, setConfirmOpen] = useState(false);
    const handleExport = async () => {
        setConfirmOpen(true);
    };

    return (
        <>
            {isPending && <ExportLoader />}
            <Seo url={WEB_PREVIEW_ROUTE} page="webpreview" />
            <section >
                <div className="min-h-screen  bg-secondary">

                    {showSuccess && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-linear-to-r from-green-500 to-emerald-500 text-white py-4"
                        >
                            <div className="container mx-auto px-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="w-6 h-6" />
                                    <span className="font-medium">
                                        🎉 Your website has been generated successfully!
                                    </span>
                                </div>
                                <button
                                    onClick={() => setShowSuccess(false)}
                                    className="text-white/80 hover:text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    <div className={regenerateIsPending ? "pointer-events-none opacity-70" : ""}>
                        {/* Status */}
                        {data?.data && <Editor
                            websiteId={id}
                            showCustomizer={showCustomizer}
                            preferences={preferences}
                            setPreferences={setPreferences}
                            setShowCustomizer={setShowCustomizer}
                            viewMode={viewMode}
                            getViewModeClass={() => getViewModeClass(viewMode)}
                            handleStartOver={handleStartOver}
                            setViewMode={setViewMode}
                            iframeRef={iframeRef}
                            setSelectPage={setSelectPageOnchange}
                            selectPage={selectPage}
                            pagesList={pagesList}
                            handleExport={handleExport}
                            isPending={isPending}
                            regenerateIsPending={regenerateIsPending}
                            handleRegenerate={handleRegenerate}
                            refreshKey={refreshKey}
                            sectionsActiveData={sectionsData?.length != 0 ? sectionsData.find((sec: any) => sec?.id === activeSection) : null}
                            activeSection={activeSection}
                            sectionOverlay={sectionOverlay}
                            toggleSectionVisibility={toggleSectionVisibility}
                            sectionsData={sectionsData}
                            updateSectionReorder={updateSectionReorder}
                            onSectionSelect={onSectionSelect}
                            updateSectionData={updateSectionData}
                            activeSectionModal={activeSectionModal}
                            setActiveSectionModal={setActiveSectionModal}
                            savedText={saving
                                ? messageData.saving
                                : dirtyPreferences || dirtySections
                                    ? messageData.unsavedchanges
                                    : messageData.changessaved}

                            savedStatus={saving
                                ? true
                                : dirtyPreferences || dirtySections
                                    ? true
                                    : false}
                            handleEditModal={handleEditModal}
                            modalSectionsData={sectionsData.length !== 0 && modalSectionId != null
                                ? sectionsData.find((sec) => sec.id === modalSectionId) || null
                                : null}
                            userfeature={data?.userfeature ?? null}
                        />}
                    </div>
                </div>

                <ConfirmModal
                    open={showConfirm}
                    onClose={() => setShowConfirm(false)}
                    onConfirm={handleConfirm}
                />

                <ExportConfirmModal
                    open={confirmOpen}
                    onClose={() => setConfirmOpen(false)}
                    onConfirm={exportWebsiteConfirm}
                />
            </section>
        </>
    );

}
