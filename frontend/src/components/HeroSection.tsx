import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="pt-20 pb-10 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl font-bold tracking-tight mb-5 leading-[1.15] text-gray-900"
        >
          Research Any Topic Using{' '}
          <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
            AI Agents
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg max-w-2xl mx-auto leading-relaxed text-gray-500"
        >
          Generate research-backed reports through a multi-agent workflow that discovers sources, analyzes content, writes insights, and evaluates quality.
        </motion.p>
      </div>
    </section>
  );
}
