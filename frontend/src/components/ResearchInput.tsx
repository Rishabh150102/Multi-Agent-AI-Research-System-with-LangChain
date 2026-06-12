import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Loader2, X, ArrowRight } from 'lucide-react';

interface ResearchInputProps {
  onSubmit: (topic: string) => void;
  isLoading: boolean;
}

const exampleTopics = [
  'Artificial Intelligence',
  'Quantum Computing',
  'Climate Change',
  'Stock Market Trends'
];

export default function ResearchInput({ onSubmit, isLoading }: ResearchInputProps) {
  const [topic, setTopic] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (topic.trim() && !isLoading) {
      onSubmit(topic.trim());
    }
  };

  const handleExampleClick = (example: string) => {
    setTopic(example);
    inputRef.current?.focus();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section className="py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="max-w-[720px] mx-auto"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative card p-2 hover:border-gray-300 transition-colors">
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 ml-3 shrink-0 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Research any topic..."
                disabled={isLoading}
                className="flex-1 py-3.5 bg-transparent focus:outline-none text-base placeholder-gray-400 text-gray-900"
              />
              {topic && !isLoading && (
                <button
                  type="button"
                  onClick={() => setTopic('')}
                  className="p-2 rounded-lg mr-1 hover:bg-gray-100 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
              <button
                type="submit"
                disabled={!topic.trim() || isLoading}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all mr-1 ${
                  topic.trim() && !isLoading
                    ? 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-sm'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">Research</span>
              </button>
            </div>
          </div>
        </form>

        {!isLoading && (
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            <span className="text-sm text-gray-400">Try:</span>
            {exampleTopics.map((example) => (
              <button
                key={example}
                onClick={() => handleExampleClick(example)}
                className="px-3 py-1.5 rounded-full text-sm border transition-all text-gray-600 bg-white border-gray-200 hover:text-gray-900 hover:border-blue-300 hover:bg-blue-50/50"
              >
                {example}
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
