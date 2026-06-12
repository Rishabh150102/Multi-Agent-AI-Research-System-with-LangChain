import { motion } from 'framer-motion';
import { Search, Globe, PenTool, Brain, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

interface LoadingWorkflowProps {
  currentStep: number;
}

const steps = [
  { id: 1, icon: Search, primaryLabel: 'Discover Sources', secondaryLabel: 'Search Agent', description: 'Gathering sources...', color: '#2563EB', glowColor: 'rgba(37, 99, 235, 0.15)' },
  { id: 2, icon: Globe, primaryLabel: 'Analyze Content', secondaryLabel: 'Reader Agent', description: 'Scraping content...', color: '#0891B2', glowColor: 'rgba(8, 145, 178, 0.15)' },
  { id: 3, icon: PenTool, primaryLabel: 'Generate Report', secondaryLabel: 'Writer Agent', description: 'Writing report...', color: '#7C3AED', glowColor: 'rgba(124, 58, 237, 0.15)' },
  { id: 4, icon: Brain, primaryLabel: 'Evaluate Quality', secondaryLabel: 'Critic Agent', description: 'Reviewing report...', color: '#059669', glowColor: 'rgba(5, 102, 105, 0.15)' },
];

export default function LoadingWorkflow({ currentStep }: LoadingWorkflowProps) {
  return (
    <section className="py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[520px] mx-auto"
      >
        <div className="card p-6 sm:p-7">
          {/* Header */}
          <div className="text-center mb-7">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-3">
              <Loader2 size={14} className="animate-spin" />
              Processing your request
            </div>
            <p className="text-sm text-gray-500">
              Our multi-agent system is working on your research topic...
            </p>
          </div>

          {/* Mini horizontal workflow during loading */}
          <div className="flex items-center justify-between gap-1 mb-7 pb-6 border-b border-gray-100">
            {steps.map((step) => {
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;
              const IconComponent = step.icon;

              return (
                <div key={step.id} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300"
                      style={{ 
                        backgroundColor: isCompleted ? `${step.color}12` : isActive ? `${step.color}10` : '#F3F4F6',
                        border: `1.5px solid ${isCompleted ? step.color + '40' : isActive ? step.color + '30' : '#E5E7EB'}`,
                        boxShadow: isActive ? `0 2px 12px ${step.glowColor}` : 'none',
                      }}
                    >
                      {isCompleted ? (
                        <CheckCircle2 size={17} style={{ color: step.color }} />
                      ) : (
                        <IconComponent size={17} style={{ color: isActive ? step.color : '#D1D5DB' }} />
                      )}
                    </div>
                    <span className={`text-[10px] mt-1.5 text-center font-medium leading-tight ${isActive || isCompleted ? 'text-gray-700' : 'text-gray-400'}`}>
                      {isCompleted ? '✓ ' : ''}{step.primaryLabel.split(' ')[0]}
                    </span>
                  </div>
                  {step.id < steps.length && (
                    <ArrowRight size={13} className="shrink-0 mx-0.5 text-gray-300" style={{ marginTop: '-10px' }} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Active step detail card */}
          <div className="space-y-3">
            {steps.map((step) => {
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;
              if (!isActive && !isCompleted) return null;
              
              const IconComponent = step.icon;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 }}
                  className={`flex items-center gap-3 p-3.5 rounded-xl transition-all duration-300 ${
                    isActive ? 'bg-gray-50 border' : ''
                  }`}
                  style={{ borderColor: isActive ? `${step.color}30` : 'transparent' }}
                >
                  {/* Icon with colored background */}
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${step.color}10`, border: `1px solid ${step.color}25` }}
                  >
                    {isCompleted && !isActive ? (
                      <CheckCircle2 size={20} style={{ color: step.color }} />
                    ) : (
                      <IconComponent size={20} style={{ color: step.color }} />
                    )}
                  </div>

                  {/* Text - hierarchy: primary label dominant, agent name smaller */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">
                      {isCompleted && !isActive ? '✓ ' : ''}{step.primaryLabel}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{step.secondaryLabel} · {step.description}</p>
                  </div>

                  {/* Active typing indicator */}
                  {isActive && (
                    <div className="typing-indicator flex gap-0.5">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: step.color }}></span>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: step.color }}></span>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: step.color }}></span>
                    </div>
                  )}

                  {isCompleted && !isActive && (
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ color: step.color, backgroundColor: `${step.color}10` }}>
                      Done
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="mt-6 pt-5 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-2.5">
              <span>Progress</span>
              <span>Step {currentStep} of 4</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, #2563EB 0%, #7C3AED 50%, #059669 100%)` }}
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / 4) * 100}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}