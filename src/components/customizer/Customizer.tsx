import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Upload, Check, ChevronDown, Type, Settings, Layout, Layers, Globe, Droplet, MessageCircle, Maximize2, Square, AlignJustify, CornerDownLeft, FileText } from "lucide-react";
import { Button, Card, Input } from "../index";
import type { WebsitePreferences } from "../../app/types/website";
import { Label, Textarea, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/index";
import { getAllBorderRadiusList, getAllBrandToneList, getAllButtonStyleList, getAllContainerWidthList, getAllContentLengthList, getAllDesignStyleList, getAllFontsList, getAllSectionSpacingList } from "../../helper/function";
import { useUpdatePreferencePhoto } from "../../hooks/usePreferenceupdate";
import SectionReorder from "./SectionReorder";
import { APIURL } from "../../api/apiurl";

interface CustomizerProps {
    websiteId: any;
    preferences: WebsitePreferences;
    setPreferences: (preferences: WebsitePreferences) => void;
    setShowCustomizer: (show: boolean) => void;
    pagesList?: any;
    handleRegenerate: (show: string) => void;
    regenerateIsPending?: any;
    sectionsData: any;
    activeSection: any;
    toggleSectionVisibility: (show: string) => void;
    onSectionSelect: (show: any) => void;
    updateSectionReorder: any;
    handleEditModal: any;
    isSectionOpen: any;
    setIsSectionOpen: any;
    userdata: any;
}

const ModernMultiSelect = ({
    label,
    options,
    selected,
    onChange,
    placeholder,
    icon: Icon
}: {
    label: string,
    options: [],
    selected: string[],
    onChange: (value: string) => void,
    placeholder: string,
    icon?: any
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (option: string) => {
        onChange(option);
    };

    const removeOption = (e: React.MouseEvent, option: string) => {
        e.stopPropagation();
        onChange(option);
    };

    return (
        <div className="relative w-full" ref={containerRef}>
            <label className="text-sm leading-none font-medium mb-1.5 flex items-center gap-2">
                {Icon && <Icon className="w-4 h-4 text-primary" />}
                {label}
            </label>

            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`
                w-full min-h-[42px] bg-white border border-gray-200 dark:border-gray-800 rounded-lg cursor-pointer
                flex flex-wrap items-center gap-2 px-3 py-2 transition-all duration-200
                ${isOpen ? 'border-primary ring-2 ring-blue-100' : ' hover:border-gray-400'}
            `}
            >
                {selected.length === 0 && (
                    <span className="text-black text-sm">{placeholder}</span>
                )}

                {selected.map((item) => (
                    <span
                        key={item}
                        className="inline-flex items-center px-2.5 py-1 rounded-md text-sm badge-hero-primary bg-blue-soft border-primary capitalize"
                    >
                        {item}
                        <button
                            disabled={item.toLowerCase() === "home" ? true : false}
                            onClick={(e) => removeOption(e, item)}
                            className="ml-1.5 hover:bg-indigo-200 rounded-full p-0.5 transition-colors"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </span>
                ))}

                <div className="ml-auto">
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </div>
            </div>


            {isOpen && (
                <div className="absolute z-50 mt-2 w-full bg-white rounded-lg shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden max-h-64 overflow-y-auto">
                    <div className="p-1">
                        {options.map((option: any) => {
                            const isSelected = selected.includes(option?.name);
                            const isDisabled = option?.name.toLowerCase() === "home";
                            return (
                                <div
                                    key={option?.name}
                                    onClick={() => !isDisabled && handleSelect(option?.name)}
                                    className={`
                                        flex items-center my-1 gap-3 px-3 py-2.5 rounded-md cursor-pointer text-sm transition-colors
                                        // ${isSelected ? 'bg-blue-soft badge-hero-primary' : 'text-primary2 hover:bg-secondary'}
                                          ${isDisabled
                                            ? 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-400'
                                            : isSelected
                                                ? 'bg-blue-soft badge-hero-primary cursor-pointer'
                                                : 'text-primary2 hover:bg-secondary cursor-pointer'
                                        }
                                    `}
                                >
                                    <div className={`
                                        w-5 h-5 rounded border flex items-center justify-center transition-colors
                                        ${isSelected ? 'bg-blue-soft border-primary' : ' bg-white'}
                                    `}>
                                        {isSelected && <Check className="w-3.5 h-3.5 herobadge-primary" />}
                                    </div>
                                    <span className="font-medium">{option?.label}</span>
                                </div>
                            );
                        })}
                        {options.length === 0 && (
                            <div className="py-4 text-center text-gray-500 text-sm">No options available</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export function Customizer({
    websiteId,
    preferences,
    setPreferences,
    setShowCustomizer,
    pagesList = [],
    handleRegenerate,
    regenerateIsPending,
    sectionsData,
    activeSection,
    toggleSectionVisibility,
    onSectionSelect,
    updateSectionReorder,
    handleEditModal,
    isSectionOpen,
    setIsSectionOpen,
    userdata
}: CustomizerProps) {

    const { mutate: updatePreferenceMutates } = useUpdatePreferencePhoto();

    const availablePages = pagesList?.data ?? [];
    const fontOptions = getAllFontsList();
    const handleImageUpload = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: "logo" | "favicon"
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        updatePreferenceMutates({
            preferenceId: websiteId,
            [field]: file,
            type: field
        }, {
            onSuccess: (data) => {
                if (data.success === true) {
                    setPreferences({
                        ...preferences,
                        [field]: data?.url ? APIURL.BASE_URL + "/" + APIURL.PREVIEW_PATH + "/" + data?.id + "/" + data?.url : "",
                    });
                }
            },
            onError: () => {
            }
        });
    };

    const handleRemoveImage = (field: "logo" | "favicon") => {
        setPreferences({
            ...preferences,
            [field]: "",
        });
    };


    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="h-full"
        >
            <Card className="h-full bg-white shadow-2xl flex flex-col border-0 rounded-2xl">
                <div className="px-6 py-5 border-b flex items-center justify-between bg-white sticky top-0 z-10 rounded-t-2xl">
                    <div>
                        <h3 className="text-xl font-bold text-black">Site Builder</h3>
                        <p className="text-xs text-gray-500 mt-1">Customize your online presence</p>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowCustomizer(false)}
                        className="hover:bg-red-50 hover:text-red-500 rounded-full p-2 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                <div className="p-6 space-y-8 h-full overflow-auto">
                    <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => setIsSectionOpen((prev: any) => ({ ...prev, identity: !prev.identity }))}
                    >
                        <h4 className="text-xs font-bold uppercase tracking-wider text-primary2 flex items-center gap-2">
                            <Globe className="w-4 h-4" /> Site Basics
                        </h4>
                        <ChevronDown
                            className={`w-5 h-5 text-black transition-transform duration-200 ${isSectionOpen.identity ? "rotate-180" : ""
                                }`}
                        />
                    </div>
                    <AnimatePresence>
                        {isSectionOpen.identity && (
                            <motion.section
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="space-y-4"
                            >
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <Label htmlFor="websiteName" className="text-black">
                                            Website Name
                                        </Label>
                                        <Input
                                            id="websiteName"
                                            value={preferences.websiteName}
                                            onChange={(e) =>
                                                setPreferences({ ...preferences, websiteName: e.target.value })
                                            }
                                            placeholder="My Awesome Brand"
                                            className="w-full bg-white rounded-lg border border-gray-200 dark:border-gray-800 p-3 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                        />
                                    </div>

                                    {/* ================== Description ================== */}
                                    <div className="space-y-1">
                                        <Label htmlFor="description" className="text-black">
                                            Description
                                        </Label>

                                        <Textarea
                                            id="description"
                                            placeholder="Briefly describe what your site is about..."
                                            value={preferences.description}
                                            onChange={(e) => setPreferences({ ...preferences, description: e.target.value })}
                                            rows={3}
                                            className="w-full bg-white rounded-lg border border-gray-200 dark:border-gray-800 p-3 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none transition-all"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <Label htmlFor="websiteName" className="text-black">
                                            Industry
                                        </Label>
                                        <Input
                                            id="websiteName"
                                            value={preferences.industry}
                                            onChange={(e) =>
                                                setPreferences({ ...preferences, industry: e.target.value })
                                            }
                                            placeholder="Industry"
                                            className="w-full bg-white rounded-lg border border-gray-200 dark:border-gray-800 p-3 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                        />
                                    </div>
                                </div>
                            </motion.section>
                        )};
                    </AnimatePresence>
                    <div className="h-px bg-gray-200 dark:bg-gray-800 w-full"></div>

                    <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => setIsSectionOpen((prev: any) => ({ ...prev, image: !prev.image }))}
                    >
                        <h4 className="text-xs font-bold uppercase tracking-wider text-primary2 flex items-center gap-2">
                            <Droplet className="w-4 h-4" />
                            Branding & Colors
                        </h4>
                        <ChevronDown
                            className={`w-5 h-5 text-black transition-transform duration-200 ${isSectionOpen.image ? "rotate-180" : ""
                                }`}
                        />

                    </div>
                    <AnimatePresence>
                        {isSectionOpen.image && (
                            <motion.section
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="space-y-4"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    {/* ================= LOGO ================= */}
                                    <div className="space-y-2">
                                        <Label className="text-black flex justify-center">Logo Upload</Label>

                                        <div className="relative group bg-white p-4 text-center hover:border-primary transition-all">
                                            {preferences.logo ? (
                                                <div className="relative inline-block mx-auto">
                                                    {/* Preview */}
                                                    <img
                                                        src={preferences.logo}
                                                        alt="Logo Preview"
                                                        className="mx-auto max-h-24 object-contain rounded-md"
                                                    />

                                                    {/* Remove Icon */}
                                                    <button
                                                        onClick={() => handleRemoveImage("logo")}
                                                        className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-md transition"
                                                    >
                                                        <X className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => handleImageUpload(e, "logo")}
                                                        className="hidden"
                                                        id="logoUpload"
                                                    />

                                                    <label
                                                        htmlFor="logoUpload"
                                                        className="cursor-pointer flex flex-col items-center justify-center gap-2"
                                                    >
                                                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-50 hover:bg-blue-100 transition">
                                                            <Upload className="w-4 h-4 text-primary" />
                                                        </div>
                                                    </label>
                                                </>
                                            )}



                                        </div>
                                    </div>

                                    {/* ================= FAVICON ================= */}
                                    <div className="space-y-2">
                                        <Label className="text-black flex justify-center">Favicon Upload</Label>

                                        <div className="relative group bg-white p-4 text-center hover:border-primary transition-all">
                                            {preferences.favicon ? (
                                                <div className="relative inline-block mx-auto">
                                                    {/* Preview */}
                                                    <img
                                                        src={preferences.favicon}
                                                        alt="Favicon Preview"
                                                        className="mx-auto h-12 w-12 object-contain rounded-md"
                                                    />

                                                    {/* Remove Icon */}
                                                    <button
                                                        onClick={() => handleRemoveImage("favicon")}
                                                        className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-md transition"
                                                    >
                                                        <X className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => handleImageUpload(e, "favicon")}
                                                        className="hidden"
                                                        id="faviconUpload"
                                                    />

                                                    <label
                                                        htmlFor="faviconUpload"
                                                        className="cursor-pointer flex flex-col items-center justify-center gap-2"
                                                    >
                                                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-50 hover:bg-blue-100 transition">
                                                            <Upload className="w-4 h-4 text-primary" />
                                                        </div>
                                                    </label>
                                                </>
                                            )}

                                        </div>
                                    </div>

                                </div>

                                <div className="grid grid-cols-1 gap-5">
                                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                                        {(
                                            [
                                                { label: "Primary Color", key: "primaryColor" },
                                                { label: "Secondary Color", key: "secondaryColor" },
                                                { label: "Accent Color", key: "accent" },
                                                { label: "Background Color", key: "backgroundColor" },
                                            ] as const
                                        ).map((item) => (
                                            <div key={item.key} className="space-y-1">
                                                <Label htmlFor={item.key} className="text-black">
                                                    {item.label}
                                                </Label>

                                                <div className="flex items-center gap-2 border p-2 rounded-md bg-white">
                                                    {/* Color Picker */}
                                                    <input
                                                        type="color"
                                                        id={item.key}
                                                        value={preferences[item.key]}
                                                        onChange={(e) =>
                                                            setPreferences({
                                                                ...preferences,
                                                                [item.key]: e.target.value,
                                                            })
                                                        }
                                                        className="w-12 h-10 rounded cursor-pointer border-none p-0"
                                                    />

                                                    {/* Hex value */}
                                                    <input
                                                        type="text"
                                                        value={preferences[item.key]}
                                                        onChange={(e) =>
                                                            setPreferences({
                                                                ...preferences,
                                                                [item.key]: e.target.value,
                                                            })
                                                        }
                                                        className="bg-transparent border-none text-sm font-mono text-black focus:ring-0 w-full uppercase"
                                                    />

                                                </div>
                                            </div>
                                        ))}
                                    </div>


                                </div>

                            </motion.section>
                        )};
                    </AnimatePresence>
                    <div className="h-px bg-gray-200 dark:bg-gray-800 w-full"></div>

                    <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => setIsSectionOpen((prev: any) => ({ ...prev, other: !prev.other }))}
                    >
                        <h4 className="text-xs font-bold uppercase tracking-wider text-primary2 flex items-center gap-2">
                            <Settings className="w-4 h-4" /> Layout & UI
                        </h4>
                        <ChevronDown
                            className={`w-5 h-5 text-black transition-transform duration-200 ${isSectionOpen.other ? "rotate-180" : ""
                                }`}
                        />
                    </div>
                    <AnimatePresence>
                        {isSectionOpen.other && (
                            <motion.section
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="space-y-4"
                            >
                                <div className="grid grid-cols-1 gap-5">
                                    {/* ================== Container Width ================== */}
                                    <div className="space-y-1">
                                        <Label className="text-black">
                                            <Maximize2 className="w-4 h-4 text-primary" /> Container Width
                                        </Label>

                                        <Select
                                            value={preferences.containerWidth}
                                            onValueChange={(value) => setPreferences({ ...preferences, containerWidth: value })}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select container width" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                {getAllContainerWidthList().map((width) => (
                                                    <SelectItem key={width.value} value={width.value}>
                                                        {width.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* ================== Section Spacing ================== */}
                                    <div className="space-y-1">
                                        <Label className="text-black">
                                            <AlignJustify className="w-4 h-4 text-primary" /> Section Spacing
                                        </Label>

                                        <Select
                                            value={preferences.sectionSpacing}
                                            onValueChange={(value) => setPreferences({ ...preferences, sectionSpacing: value })}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select section spacing" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                {getAllSectionSpacingList().map((spacing) => (
                                                    <SelectItem key={spacing.value} value={spacing.value}>
                                                        {spacing.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>


                                    {/* ================== Border Radius ================== */}
                                    <div className="space-y-1">
                                        <Label className="text-black">
                                            <CornerDownLeft className="w-4 h-4 text-primary" /> Border Radius
                                        </Label>

                                        <Select
                                            value={preferences.borderRadius}
                                            onValueChange={(value) => setPreferences({ ...preferences, borderRadius: value })}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select border radius" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                {getAllBorderRadiusList().map((radius) => (
                                                    <SelectItem key={radius.value} value={radius.value}>
                                                        {radius.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* ================== Button Style ================== */}
                                    <div className="space-y-1">
                                        <Label className="text-black">
                                            <Square className="w-4 h-4 text-primary" /> Button Style
                                        </Label>

                                        <Select
                                            value={preferences.buttonStyle}
                                            onValueChange={(value) => setPreferences({ ...preferences, buttonStyle: value })}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select button style" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                {getAllButtonStyleList().map((style) => (
                                                    <SelectItem key={style.value} value={style.value}>
                                                        {style.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* ================== Font Family ================== */}
                                    <div className="space-y-1">
                                        <Label className="text-black">
                                            <Type className="w-4 h-4 text-primary" /> Font Family
                                        </Label>

                                        <Select
                                            value={preferences.font || "Inter"}
                                            onValueChange={(value) => setPreferences({ ...preferences, font: value })}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a font" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                {fontOptions.map((font) => (
                                                    <SelectItem key={font?.key} value={font?.key}>
                                                        {font?.value}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                </div>
                            </motion.section>
                        )};
                    </AnimatePresence>

                    <div className="h-px bg-gray-200 dark:bg-gray-800 w-full"></div>

                    <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => setIsSectionOpen((prev: any) => ({ ...prev, uistyle: !prev.uistyle }))}
                    >
                        <h4 className="text-xs font-bold uppercase tracking-wider text-primary2 flex items-center gap-2">
                            <Settings className="w-4 h-4" /> Style & Content
                        </h4>
                        <ChevronDown
                            className={`w-5 h-5 text-black transition-transform duration-200 ${isSectionOpen.uistyle ? "rotate-180" : ""
                                }`}
                        />
                    </div>
                    <AnimatePresence>
                        {isSectionOpen.uistyle && (
                            <motion.section
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="space-y-4"
                            >
                                <div className="grid grid-cols-1 gap-5">
                                    {/* ================== Design Style ================== */}

                                    <div className="space-y-1">
                                        <Label className="text-black">
                                            <Layout className="w-4 h-4 text-primary" /> Design Style
                                        </Label>
                                        <div className="relative">
                                            <Select
                                                value={preferences.designStyle || "modern"}
                                                onValueChange={(value) => setPreferences({ ...preferences, designStyle: value })}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select design style" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    {getAllDesignStyleList().map((style) => (
                                                        <SelectItem key={style.value} value={style.value}>
                                                            {style.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>

                                        </div>
                                    </div>


                                    {/* ================== Brand Tone ================== */}
                                    <div className="space-y-1">
                                        <Label className="text-black">
                                            <MessageCircle className="w-4 h-4 text-primary" /> Brand Tone
                                        </Label>

                                        <Select
                                            value={preferences.brandTone}
                                            onValueChange={(value) => setPreferences({ ...preferences, brandTone: value })}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select brand tone" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                {getAllBrandToneList().map((tone) => (
                                                    <SelectItem key={tone.value} value={tone.value}>
                                                        {tone.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* ================== Content Length ================== */}
                                    <div className="space-y-1">
                                        <Label className="text-black">
                                            <FileText className="w-4 h-4 text-primary" /> Content Length
                                        </Label>

                                        <Select
                                            value={preferences.contentlength}
                                            onValueChange={(value) => setPreferences({ ...preferences, contentlength: value })}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select content length" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                {getAllContentLengthList().map((length) => (
                                                    <SelectItem key={length.value} value={length.value}>
                                                        {length.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-2 text-center">⚠️ Changes will apply after regeneration</p>
                                    <div className="relative group w-full">
                                        <Button
                                            variant="web"
                                            size="sm"
                                            onClick={() => handleRegenerate("content-only")}
                                            disabled={regenerateIsPending}
                                            className="w-full"

                                        >Regenerate Content</Button>
                                    </div>

                                </div>
                            </motion.section>
                        )};
                    </AnimatePresence>

                    <div className="h-px bg-gray-200 dark:bg-gray-800 w-full"></div>

                    <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => setIsSectionOpen((prev: any) => ({ ...prev, structure: !prev.structure }))}
                    >
                        <h4 className="text-xs font-bold uppercase tracking-wider text-primary2 flex items-center gap-2">
                            <Layers className="w-4 h-4" /> Pages
                        </h4>
                        <ChevronDown
                            className={`w-5 h-5 text-black transition-transform duration-200 ${isSectionOpen.structure ? "rotate-180" : ""
                                }`}
                        />
                    </div>
                    <AnimatePresence>


                        {isSectionOpen.structure && (
                            <motion.section
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="space-y-4"
                            >


                                {/* Active Pages */}
                                <ModernMultiSelect
                                    label="Active Pages"
                                    placeholder="Select pages to include..."
                                    options={availablePages}
                                    selected={preferences.activepages || []} // array state
                                    onChange={(pageName: string) => {
                                        const updatedPages = preferences.activepages?.includes(pageName)
                                            ? preferences.activepages.filter((p) => p !== pageName)
                                            : [...(preferences.activepages || []), pageName];
                                        setPreferences({ ...preferences, activepages: updatedPages });
                                    }}
                                    icon={Layout}
                                />
                                <p className="text-xs text-gray-400 mt-2 text-center">⚠️ Page changes require regeneration</p>

                            </motion.section>
                        )};


                    </AnimatePresence>


                    <div className="h-px bg-gray-200 dark:bg-gray-800 w-full"></div>

                    <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => setIsSectionOpen((prev: any) => ({ ...prev, sections: !prev.sections }))}
                    >
                        <h4 className="text-xs font-bold uppercase tracking-wider text-primary2 flex items-center gap-2">
                            <Layers className="w-4 h-4" /> Sections
                        </h4>
                        <ChevronDown
                            className={`w-5 h-5 text-black transition-transform duration-200 ${isSectionOpen.sections ? "rotate-180" : ""
                                }`}
                        />
                    </div>
                    <AnimatePresence>


                        {isSectionOpen.sections && (
                            <motion.section
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="space-y-4"
                            >
                                {/* List */}
                                <SectionReorder
                                    sections={sectionsData}
                                    setSections={updateSectionReorder}
                                    onSectionSelect={onSectionSelect}
                                    toggleSectionVisibility={toggleSectionVisibility}
                                    activeSection={activeSection}
                                    handleEditModal={handleEditModal}
                                    userdata={userdata}

                                />
                            </motion.section>
                        )};



                    </AnimatePresence>

                </div>

                {/* STICKY CTA */}
                <div className="px-6 py-5 border-t flex items-center justify-between bg-white sticky  bottom-0 z-10 rounded-b-2xl">
                    <div className="w-full relative group">

                        <Button
                            variant="web"
                            onClick={() => handleRegenerate("full-layout")}
                            disabled={regenerateIsPending}
                            className="w-full py-5 transition"
                        >
                            ✨ {regenerateIsPending ? "Generating Layout..." : "Regenerate Website"}
                        </Button>
                        <p className="text-xs text-gray-400 mt-2 text-center">
                            Applies AI changes & rebuilds layout
                        </p>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}