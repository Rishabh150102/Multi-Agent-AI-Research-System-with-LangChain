import { motion } from 'framer-motion';
import { Search, Globe, PenTool, Brain, ArrowRight, CheckCircle2 } from 'lucide-react';
import type { ResearchResponse } from '../App';

interface WorkflowVisualizationProps {
  isCompleted?: boolean;
  currentStep?: number;
  results?: ResearchResponse | null;
}

const steps = [
  { icon: Search, primaryLabel: 'Discover Sources', secondaryLabel: 'Search Agent', color: '#2563EB', glowColor: 'rgba(37, 99, 235, 0.15)' },
  { icon: Globe, primaryLabel: 'Analyze Content', secondaryLabel: 'Reader Agent', color: '#0891B2', glowColor: 'rgba(8, 145, 178, 0.15)' },
  { icon: PenTool, primaryLabel: 'Generate Report', secondaryLabel: 'Writer Agent', color: '#7C3AED', glowColor: 'rgba(124, 58, 237, 0.15)' },
  { icon: Brain, primaryLabel: 'Evaluate Quality', secondaryLabel: 'Critic Agent', color: '#059669', glowColor: 'rgba(5, 102, 105, 0.15)' },
];

export default function WorkflowVisualization({ isCompleted = false, currentStep = 0, results }: WorkflowVisualizationProps) {
  // Calculate metrics when results are available
  const getMetrics = () => {
    if (!results) return null;
    
    const sourceCount = (results.search_results.match(/https?:\/\/[^\s<>"]+/gi) || []).length;
    
    // Try to extract score from feedback
    const scoreMatch = results.feedback.match(/(?:score|rating|quality)[:\s]*(\d+(?:\.\d+)?)/i);
    const score = scoreMatch ? parseFloat(scoreMatch[1]) : null;
    
    return { sourceCount, score };
  };

  const metrics = getMetrics();

  const isStepCompleted = (stepIndex: number) => {
    if (isCompleted) return true;
    return stepIndex < currentStep;
  };

  const isStepActive = (stepIndex: number) => {
    if (isCompleted) return false;
    return stepIndex === currentStep - 1;
  };

  return (
    <section className="py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="max-w-5xl mx-auto"
      >
        <div className="card p-6 sm:p-8">
          {/* Section header */}
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider text-center mb-8">
            Research Workflow
          </p>
          
          {/* Workflow steps - horizontal layout, all on one line */}
          <div className="flex items-center justify-between gap-1 sm:gap-2 lg:gap-3">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const completed = isStepCompleted(index);
              const active = isStepActive(index);

              return (
                <div key={step.primaryLabel} className="flex items-center flex-1 last:flex-none">
                  {/* Step card with hover interaction */}
                  <motion.div
                    className={`flex-1 flex flex-col items-center group cursor-default`}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  >
                    {/* Icon container */}
                    <div
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 relative"
                      style={{ 
                        backgroundColor: completed 
                          ? `${step.color}12` 
                          : active 
                            ? `${step.color}10` 
                            : '#F9FAFB',
                        border: `1.5px solid ${completed ? step.color + '50' : active ? step.color + '35' : '#E5E7EB'}`,
                        boxShadow: completed || active 
                          ? `0 4px 20px ${step.glowColor}, 0 0 0 1px ${step.color}15` 
                          : 'none',
                      }}
                    >
                      <div 
                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{ 
                          background: `radial-gradient(circle at center, ${step.glowColor} 0%, transparent 70%)`,
                        }} 
                      />
                      
                      {completed ? (
                        <CheckCircle2 size={26} className="sm:w-[28px] sm:h-[28px]" style={{ color: step.color }} />
                      ) : (
                        <IconComponent size={26} className="sm:w-[28px] sm:h-[28px]" style={{ color: active ? step.color : '#9CA3AF' }} />
                      )}
                    </div>
                    
                    {/* Labels */}
                    <div className="text-center">
                      <span className={`text-sm sm:text-base font-semibold block leading-tight ${completed || active ? 'text-gray-900' : 'text-gray-500'}`}>
                        {completed && <span style={{ color: step.color }}>✓ </span>}{step.primaryLabel}
                      </span>
                      <span className="text-[11px] text-gray-400 mt-1 block font-normal">{step.secondaryLabel}</span>
                    </div>
                  </motion.div>

                  {/* Right arrow */}
                  {index < steps.length - 1 && (
                    <div className="flex-shrink-0 mx-0.5 sm:mx-1 lg:mx-2 self-center" style={{ marginTop: '-22px' }}>
                      <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px] text-gray-300 group-hover:text-gray-400 transition-colors duration-200" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Metrics row - ONLY Sources Used and Research Score */}
          {isCompleted && metrics && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mt-8 pt-6 border-t border-gray-100"
            >
              <div className="grid grid-cols-2 gap-6 sm:gap-10 max-w-md mx-auto">
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 tabular-nums">{metrics.sourceCount}</p>
                  <p className="text-xs text-gray-500 mt-1">Sources Used</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 tabular-nums">
                    {metrics.score !== null ? `${metrics.score.toFixed(1)}/10` : '—'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Research Score</p>
                </div>
              </div>
            </motion.div>)}
        </div>
      </motion.div>
    </section>
  );
}