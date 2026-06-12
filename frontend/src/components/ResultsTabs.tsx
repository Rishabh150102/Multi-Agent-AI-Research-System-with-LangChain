import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Brain, Lightbulb, AlertCircle } from 'lucide-react';
import ReportViewer from './ReportViewer';
import CritiqueViewer from './CritiqueViewer';
import ScrapedContentViewer from './ScrapedContentViewer';

interface ResultsTabsProps {
  results: {
    search_results: string;
    scraped_content: string;
    report: string;
    feedback: string;
  } | null;
  error: string | null;
}

const tabs = [
  { id: 'report', label: 'Research Report', icon: FileText },
  { id: 'critique', label: 'AI Critique', icon: Brain },
  { id: 'scraped', label: 'Research Insights', icon: Lightbulb },
];

export default function ResultsTabs({ results, error }: ResultsTabsProps) {
  const [activeTab, setActiveTab] = useState('report');
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (results || error) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [results, error]);

  if (!results && !error) return null;

  return (
    <section ref={resultsRef} className="py-12 px-4" id="results">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-4xl mx-auto"
      >
        {/* Error state */}
        {error && (
          <div className="card p-5 border-red-200 bg-red-50/50 mb-6">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-red-100 shrink-0">
                <AlertCircle size={20} className="text-red-600" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-red-800">Research Generation Failed</h3>
                <p className="text-sm text-red-600 mt-1">{error}. Please try again.</p>
              </div>
            </div>
          </div>)}

        {/* Results tabs */}
        {results && (
          <>
            {/* Tab navigation - centered horizontally */}
            <div className="flex items-center justify-center gap-1 p-1 bg-gray-100 rounded-xl mb-8 w-fit mx-auto">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                      isActive
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <IconComponent size={16} className={isActive ? 'text-blue-600' : ''} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab content - no internal scroll containers */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'report' && <ReportViewer content={results.report} />}
                {activeTab === 'critique' && <CritiqueViewer feedback={results.feedback} />}
                {activeTab === 'scraped' && <ScrapedContentViewer content={results.scraped_content} />}
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </motion.div>
    </section>
  );
}