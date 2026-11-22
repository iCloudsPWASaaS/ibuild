import { useEffect, useState } from "react";

const steps = [
  "Analyzing your design...",
  "Building layout...",
  "Generating HTML & CSS...",
  "Finalizing download package..."
];

export default function ExportLoader() {
  const [progress, setProgress] = useState(10);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((prev) => (prev < 95 ? prev + 5 : prev));
    }, 500);

    const stepTimer = setInterval(() => {
      setStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 2000);

    return () => {
      clearInterval(progressTimer);
      clearInterval(stepTimer);
    };
  }, []);



  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-md">
      <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl px-8 py-6 text-center">

        {/* Circle */}
        <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-6" />

        {/* Title */}
        <h2 className="text-xl dark:text-black font-semibold mb-2">
          Generating your website...
        </h2>

        {/* Step */}
        <p className="text-gray-500 dark:text-black text-sm mb-4">
          {steps[step]}
        </p>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-black transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage */}
        <p className="text-xs text-gray-400 mt-2">
          {progress}%
        </p>

      </div>
    </div>
  );
}