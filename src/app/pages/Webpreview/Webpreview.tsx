import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Seo from "../../../components/seo/Seo";
import { WEB_PREVIEW_ROUTE } from "../../../helper/routes";
import { useWebDetailsydata } from "../../../hooks/useWebhistory";
import { ExportSuccessModal } from "../../../components/customizer/ExportSuccessModal";
import { Sparkles, Settings, Download, Eye } from "lucide-react";
import { Card, Button } from "../../../components/index";
import NotFoundPage from "../404/404";
import { WebPreviewShow } from "./Webpreviewshow";
import { APIURL } from "../../../api/apiurl";

export function WebPreview() {

    const navigate = useNavigate();
    const { id } = useParams();
    const { data, refetch, isLoading } = useWebDetailsydata(id);

    const [successOpen, setSuccessOpen] = useState(false);

    function onDownload() {
        window.location.href = APIURL.BASE_URL + data?.data?.zipUrl
    }
    return (
        <>
            <Seo url={WEB_PREVIEW_ROUTE} page="webpreview" />
            {isLoading ?
                <div className="flex h-screen">
                    {/* RIGHT PREVIEW */}
                    <div className="flex-1 px-6">
                        <div className="h-[100px] bg-gray-200 rounded animate-pulse mb-4" />
                        <div className="h-[calc(100vh-140px)] bg-gray-200 rounded animate-pulse" />
                    </div>
                    {/* LEFT SIDEBAR */}
                    <div className="w-80 border-r p-4 space-y-4">
                        <div className="h-40 bg-gray-200 rounded animate-pulse" />
                        <div className="h-40 bg-gray-200 rounded animate-pulse" />
                        <div className="h-40 bg-gray-200 rounded animate-pulse" />
                        <div className="h-40 bg-gray-200 rounded animate-pulse" />
                    </div>

                </div>
                : data?.data?.status == "draft" ?
                    <WebPreviewShow setSuccessOpen={setSuccessOpen} id={id} data={data} refetch={refetch} />
                    : data?.data ?
                        <section >
                            <div className="min-h-screen  bg-secondary">

                                <div>

                                    <div className="grid lg:grid-cols-[1fr_320px] h-screen overflow-hidden">

                                        <div className="overflow-y-auto h-screen bg-white">

                                            <div className="p-4 bg-yellow-100 text-yellow-800 text-center">
                                                🔒 This website is finalized and cannot be edited.
                                            </div>
                                            <div className="p-4 bg-white h-[calc(100vh-90px)]">
                                                <div className={`mx-auto transition-all duration-300 rounded-xl `}>

                                                    <div className="bg-white rounded-lg shadow-xl overflow-hidden ">
                                                        <div className="bg-secondary px-4 py-2 flex items-center gap-2 border-b">
                                                            <div className="flex gap-1.5">
                                                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                                                <div className="w-3 h-3 rounded-full bg-green-500" />
                                                            </div>
                                                            <div className="flex-1 bg-white rounded px-3 py-1 text-sm text-primary2 flex items-center gap-2">
                                                                <Eye className="w-3 h-3" />
                                                                <span>preview.weblify.com/{"your-website"}</span>
                                                            </div>
                                                        </div>
                                                        <div className="h-[calc(100vh-120px)] relative">
                                                            {/* Status */}
                                                            <div className="h-[calc(100vh-120px)] relative">
                                                                {data?.data &&
                                                                    <iframe
                                                                        src={APIURL.BASE_URL + "/" + APIURL.PREVIEW_PATH + "/" + id}
                                                                        title="website-preview"
                                                                        width="100%"
                                                                        height="100%"
                                                                        style={{ border: "none" }}
                                                                    />
                                                                }
                                                            </div>

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="h-screen sticky top-0 overflow-y-auto">
                                            <div className="container-full mx-auto px-4 py-2 h-full">
                                                <div className="space-y-4">

                                                    <Card className="p-6">
                                                        <div className="flex items-center gap-2 mb-4">
                                                            <Settings className="w-5 h-5 text-primary" />
                                                            <h3 className="font-bold text-black">Quick Actions</h3>
                                                        </div>
                                                        <div className="space-y-2 ">
                                                            <Button onClick={onDownload} variant="outline" className="w-full justify-start text-black">
                                                                <Download className="w-4 h-4 mr-2" />
                                                                Downlaod Code
                                                            </Button>
                                                            <Button
                                                                onClick={() => navigate("/userdashboard")}
                                                                variant="outline" className="w-full justify-start text-black">
                                                                <Settings className="w-4 h-4 mr-2" />
                                                                Go to Dashboard
                                                            </Button>
                                                        </div>
                                                    </Card>

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

                                                </div>

                                            </div>
                                        </div>

                                    </div>


                                </div>
                            </div>
                        </section>

                        :
                        <div>
                            <NotFoundPage />
                        </div>
            }

            <ExportSuccessModal
                open={successOpen}
                onDownload={onDownload}
                onDashboard={() => navigate("/userdashboard")}
            />
        </>
    )

}
