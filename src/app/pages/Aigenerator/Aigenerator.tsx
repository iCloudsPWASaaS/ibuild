import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Sparkles, Check } from "lucide-react";
import { Progress } from "../../../components/index";

const generationSteps = [
    { label: "Analyzing your project requirements", duration: 1500 },
    { label: "Designing project screens & layout", duration: 2000 },
    { label: "Generating color scheme & theme", duration: 1000 },
    { label: "Building project components & sections", duration: 2000 },
    { label: "Optimizing for mobile devices", duration: 1500 },
    { label: "Adding SEO metadata", duration: 1000 },
    { label: "Finalizing your project", duration: 1000 },
];
interface Props {
  apiDone: boolean;
  onComplete: () => void;
}

export function AIgenerator({ apiDone, onComplete }: Props) {
    const [currentStep, setCurrentStep] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let stepTimer: number;
        let progressTimer: number;

        const runStep = (stepIndex: number) => {
            if (stepIndex >= generationSteps.length) {
                setProgress(99);
                return;
            }

            setCurrentStep(stepIndex);
            const step = generationSteps[stepIndex];
            const stepProgress = (stepIndex / generationSteps.length) * 99;

            // Animate progress for this step
            let currentProgress = stepProgress;
            const targetProgress = ((stepIndex + 1) / generationSteps.length) * 99;
            const progressIncrement = (targetProgress - stepProgress) / (step.duration / 50);

            progressTimer = window.setInterval(() => {
                currentProgress += progressIncrement;
                if (currentProgress >= targetProgress) {
                    currentProgress = targetProgress;
                    clearInterval(progressTimer);
                }
                setProgress(currentProgress);
            }, 50);

            stepTimer = window.setTimeout(() => {
                clearInterval(progressTimer);
                runStep(stepIndex + 1);
            }, step.duration);
        };

        runStep(0);

        return () => {
            clearTimeout(stepTimer);
            clearInterval(progressTimer);
        };
    }, []);
  // ✅ API DONE → FORCE COMPLETE
  useEffect(() => {
    if (apiDone) {
      setProgress(100);

      setTimeout(() => {
        onComplete();
      }, 500); // smooth finish
    }
  }, [apiDone]);

    useEffect(() => {
    if (apiDone && progress < 90) {
      setProgress(100);
    }
  }, [apiDone, progress]);
    return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    
                <div className="flex items-center justify-center min-h-[calc(100vh-200px)] pt-0 pb-0 md:py-0">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-2xl w-full mx-4 "
                    >
                        <div className="bg-white rounded-2xl shadow-xl py-8 md:py-8 md:px-10">
                            <div className="text-center mb-8">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    className="w-20 h-20 banner-gradient rounded-full flex items-center justify-center mx-auto mb-6"
                                >
                                    <Sparkles className="w-10 h-10 text-white" />
                                </motion.div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                    Building Your Project
                                </h2>
                                <p className="text-primary2 text-lg">
                                    Our AI is working its magic to build your perfect project
                                </p>
                            </div>

                            <div className="mb-8">
                                <Progress value={progress} className="h-3" />
                                <p className="text-center mt-2 text-sm text-primary2">
                                    {Math.round(progress)}% Complete
                                </p>
                            </div>

                            <div className="space-y-4">
                                {generationSteps.map((step, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{
                                            opacity: index <= currentStep ? 1 : 0.3,
                                            x: 0
                                        }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-center gap-3"
                                    >
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${index < currentStep
                                            ? 'bg-green-500'
                                            : index === currentStep
                                                ? 'bg-primary'
                                                : 'bg-secondary'
                                            }`}>
                                            {index < currentStep ? (
                                                <Check className="w-5 h-5 text-white" />
                                            ) : (
                                                <span className="text-white font-medium">{index + 1}</span>
                                            )}
                                        </div>
                                        <span className={`flex-1 ${index <= currentStep ? 'text-primary2' : 'text-primary2'
                                            }`}>
                                            {step.label}
                                        </span>
                                        {index === currentStep && (
                                            <motion.div
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ duration: 1, repeat: Infinity }}
                                            >
                                                <Sparkles className="w-5 h-5 text-primary" />
                                            </motion.div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-8 p-4 bg-blue-soft rounded-lg border border-primary">
                                <p className="text-sm text-primary text-center">
                                    ✨ Your project will be fully responsive, SEO-optimized, and ready to customize
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
        
       </div>
    );
}
