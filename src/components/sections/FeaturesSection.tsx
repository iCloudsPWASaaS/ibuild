import { motion } from "motion/react";
import { Badge } from "../ui/index";
import DynamicIcon from "../ui/icon";
import { useFeature } from "../../hooks/useFeature";

const featureStyles = [
  { gradient: "from-purple-500 to-pink-500", delay: 0 },
  { gradient: "from-yellow-500 to-orange-500", delay: 0.1 },
  { gradient: "from-blue-500 to-cyan-500", delay: 0.2 },
  { gradient: "from-green-500 to-emerald-500", delay: 0.3 },
  { gradient: "from-pink-500 to-rose-500", delay: 0.4 },
  { gradient: "from-indigo-500 to-purple-500", delay: 0.5 }
];

export function FeaturesSection() {
  const { data } = useFeature()

  return (
    <section id="features" className="py-20 px-4 gradient-primary2 text-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.5, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.5, 1, 1.5], rotate: [360, 180, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-5" variant="cutting">{data?.badge}</Badge>
            <h2 className="text-4xl md:text-[38px] font-bold mb-4 text-white highlight"  dangerouslySetInnerHTML={{ __html: data?.title }}>
       </h2>
            <p className="text-xl text-[var(--text-light-gray)] mb-8">{data?.description}</p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.features.map((feature: any, index: number) => {
            const style = featureStyles[index] || featureStyles[0];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: style.delay, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className="h-full p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className={`w-16 h-16 bg-gradient-to-br ${style.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-2xl relative`}
                  >
                    <DynamicIcon name={feature?.icon} className="w-8 h-8 text-white" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity`} />
                  </motion.div>

                  <h3 className="text-2xl font-bold mb-3">{feature?.title}</h3>
                  <p className="feaure-gray leading-relaxed">{feature?.description}</p>

                  <motion.div
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    className={`h-1 bg-gradient-to-r ${style.gradient} rounded-full mt-6`}
                  />
                </div>
                <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient} rounded-2xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity -z-10`} />
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-3 gap-6"
        >
          {data?.stats.map((item: any, index: number) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1, type: "spring" }}
                viewport={{ once: true }}
                className="text-4xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent mb-2"
              >
                {item?.stat}
              </motion.div>
              <div className="text-blue-100">{item?.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}