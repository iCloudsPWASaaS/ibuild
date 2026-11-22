import React, { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, Upload, Send, Info } from "lucide-react";
import {
    Button, Input, Label, Textarea, Select, SelectContent,
    SelectItem, SelectTrigger, SelectValue, Footer, Header, SectionHeader
} from "../../../components/index";
import { useNavigate } from "react-router";
import { useCreateTicket } from "../../../hooks/useCreateTicket";
import { toast } from "react-toastify";
import Seo from "../../../components/seo/Seo";
import { ADD_TICKETS_ROUTE, SUPPORT_TICKETS_ROUTE } from "../../../helper/routes";

export function AddTicketPage() {
    const { mutate } = useCreateTicket();
    const navigate = useNavigate();

    // OpenTicket wala exact state logic
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [formData, setFormData] = useState({
        subject: "",
        priority: "medium",
        message: "",
        attachments: [] as File[]
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files);
            setSelectedFiles((prev) => [...prev, ...newFiles]);
            setFormData((prev) => ({
                ...prev,
                attachments: [...prev.attachments, ...newFiles],
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Manual Validation
        if (!formData.subject.trim()) {
            toast.error("Subject is required.");
            return;
        }

        if (!formData.message.trim()) {
            toast.error("Message is required.");
            return;
        }

        // Exact payload logic as OpenTicket
        const payload = new FormData();
        payload.append('subject', formData.subject);
        payload.append('priority', formData.priority);
        payload.append('message', formData.message);

        formData.attachments.forEach((file) => {
            payload.append('attachments', file);
        });

        mutate(payload, {
            onSuccess: (data) => {
                if (data?.success === true) {
                    toast.success(data?.message || "Ticket created successfully!");
                    setFormData({ subject: "", priority: "medium", message: "", attachments: [] });
                    setSelectedFiles([]);
                    setTimeout(() => {
                        navigate(SUPPORT_TICKETS_ROUTE);
                    }, 1500);
                } else {
                    toast.error(data?.message || "Failed to create ticket.");
                }
            },
            onError: (error) => {
                toast.error(error?.message || "Error creating ticket. Please try again.");
            }
        });
    };

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950">
            <Seo url={ADD_TICKETS_ROUTE} />
            <Header isWhite={true} />
            <SectionHeader
                variant="hero"
                badge="Create Support Ticket"
                title="Create Support Ticket"
                description="We're here to help. Describe your issue and we'll get back to you soon."
            />

            <section className="py-12 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid lg:grid-cols-3 gap-8">

                        {/* Left Side: Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="lg:col-span-2"
                        >
                            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border p-8">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="subject" className="text-black dark:text-white">Subject *</Label>
                                        <Input
                                            id="subject"
                                            placeholder="Brief description of your issue"
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="priority" className="text-black dark:text-white">Priority *</Label>
                                        <Select
                                            value={formData.priority}
                                            onValueChange={(value) => setFormData({ ...formData, priority: value })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select priority" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="low">Low - General question</SelectItem>
                                                <SelectItem value="medium">Medium - Need assistance</SelectItem>
                                                <SelectItem value="high">High - Critical issue</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message" className="text-black dark:text-white">Message *</Label>
                                        <Textarea
                                            id="message"
                                            rows={8}
                                            placeholder="Please provide as much detail as possible..."
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-black dark:text-white">Attachments (optional)</Label>
                                        <div className="border-2 border-dashed border-gray-300 dark:border-zinc-700 rounded-xl p-8 text-center hover:border-blue-700 transition-colors">
                                            <Upload className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
                                            <div className="mb-2">
                                                <label htmlFor="fileUpload" className="cursor-pointer">
                                                    <span className="text-primary font-medium">Click to upload</span>
                                                    <span className="text-zinc-500"> or drag and drop</span>
                                                </label>
                                                <input
                                                    id="fileUpload"
                                                    type="file"
                                                    multiple
                                                    onChange={handleFileChange}
                                                    className="hidden"
                                                    accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                                                />
                                            </div>
                                            <p className="text-sm text-zinc-500">JPG, PNG, PDF, DOC up to 10MB</p>
                                        </div>

                                        {selectedFiles.length > 0 && (
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {selectedFiles.map((file, index) => (
                                                    <div key={index} className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-md text-xs">
                                                        <span className="truncate max-w-[150px]">{file.name}</span>
                                                        <span className="text-zinc-500">{(file.size / 1024).toFixed(1)} KB</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-3 pt-6 border-t dark:border-zinc-800">
                                        <Button type="button" variant="outline" onClick={() => navigate(SUPPORT_TICKETS_ROUTE)} className="flex-1">
                                            Cancel
                                        </Button>
                                        <Button type="submit" className="flex-1 gradient-primary">
                                            <Send className="w-4 h-4 mr-2" />
                                            Submit Ticket
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>

                        {/* Right Side: Info Panel */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-6"
                        >
                            <div className="bg-gradient-primary rounded-2xl p-6 text-white">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-black/20 dark:bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Info className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold mb-2 text-black">Expected Response Time</h3>
                                        <ul className="space-y-2 text-sm opacity-90">
                                            <li className="flex items-center gap-2 text-black">
                                                <div className="w-2 h-2 bg-red-400 rounded-full" />
                                                <span >High Priority: 2-4 hours</span>
                                            </li>
                                            <li className="flex items-center gap-2 text-black">
                                                <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                                                <span>Medium Priority: 8-12 hours</span>
                                            </li>
                                            <li className="flex items-center gap-2 text-black">
                                                <div className="w-2 h-2 bg-green-400 rounded-full" />
                                                <span>Low Priority: 24-48 hours</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border dark:border-zinc-800 shadow-lg">
                                <h3 className="font-bold mb-4 text-black dark:text-white">Other Contact Options</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                            <Sparkles className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-sm text-black dark:text-white">Email Support</div>
                                            <div className="text-zinc-500 text-xs">support@weblify.com</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}