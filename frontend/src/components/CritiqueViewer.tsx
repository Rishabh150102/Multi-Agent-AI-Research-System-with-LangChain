import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Brain, Copy, Check, Star } from 'lucide-react';

interface CritiqueViewerProps {
  feedback: string;
}

function getRatingLabel(score: number): { label: string; color: string; bgColor: string } {
  if (score >= 8) return { label: 'Excellent', color: 'text-emerald-700', bgColor: 'bg-emerald-50' };
  if (score >= 6) return { label: 'Good', color: 'text-blue-700', bgColor: 'bg-blue-50' };
  if (score >= 4) return { label: 'Average', color: 'text-amber-700', bgColor: 'bg-amber-50' };
  return { label: 'Needs Improvement', color: 'text-red-700', bgColor: 'bg-red-50' };
}

export default function CritiqueViewer({ feedback }: CritiqueViewerProps) {
  const [copied, setCopied] = useState(false);

  // Only extract the numeric score — nothing else
  const { score, ratingInfo } = useMemo(() => {
    const match = feedback.match(/(?:score|rating|quality)[:\s]*(\d+(?:\.\d+)?)/i);
    const num = match ? parseFloat(match[1]) : null;
    return {
      score: num,
      ratingInfo: num !== null ? getRatingLabel(num) : null,
    };
  }, [feedback]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(feedback);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-violet-50">
            <Brain size={22} className="text-violet-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">AI Critique</h3>
            <p className="text-sm text-gray-500 mt-0.5">Analysis by Critic Agent</p>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all text-sm font-medium"
        >
          {copied ? (
            <><Check size={16} className="text-emerald-600" /><span className="text-emerald-600">Copied!</span></>
          ) : (
            <><Copy size={16} /><span>Copy</span></>
          )}
        </button>
      </div>

      {/* Single card: Score summary + raw critique content */}
      <div className="card overflow-hidden border-gray-200">

        {/* ── Score Summary (Centered) ── */}
        <div className="py-10 sm:px-10 text-center border-b border-gray-100">
          <Star size={36} className="mx-auto mb-4 text-amber-500 fill-amber-500" />

          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">
            Research Score
          </p>

          {score !== null ? (
            <>
              <p className="text-5xl font-bold text-gray-900 tabular-nums tracking-tight">
                {score.toFixed(1)}
                <span className="text-2xl text-gray-300 font-normal ml-1.5">/ 10</span>
              </p>

              {ratingInfo && (
                <span className={`inline-block mt-4 px-5 py-1.5 rounded-full text-sm font-semibold ${ratingInfo.color} ${ratingInfo.bgColor}`}>
                  {ratingInfo.label}
                </span>
              )}
            </>
          ) : (
            <p className="text-4xl font-bold text-gray-200 tabular-nums">—</p>
          )}

          {/* Rating scale reference */}
          <div className="mt-8 pt-6 border-t border-gray-100 w-fit mx-auto px-6">
            <div className="flex items-center justify-center gap-1.5 flex-wrap">
              {[
                { min: 8, max: 10, label: 'Excellent' },
                { min: 6, max: 8, label: 'Good' },
                { min: 4, max: 6, label: 'Average' },
                { min: 0, max: 4, label: 'Needs Improvement' },
              ].map(({ min, max, label }) => {
                const isActive = score !== null && (
                  (score >= min && score < max) ||
                  (max === 10 && score <= max)
                );
                return (
                  <span
                    key={label}
                    className={`text-[11px] px-2 py-0.5 rounded-md ${
                      isActive
                        ? 'bg-violet-100 text-violet-700 font-medium'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {min}–{max === 10 ? '+' : max - 1} = {label}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Full Critique Content (Raw from Backend) ── */}
        <div className="px-8 sm:px-10 py-10">
          <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700 leading-relaxed bg-transparent border-none p-0 m-0">
            {feedback}
          </pre>
        </div>

      </div>
    </motion.div>
  );
}
