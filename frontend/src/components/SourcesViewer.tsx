import { motion } from 'framer-motion';
import { Search, ExternalLink, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface SourcesViewerProps {
  sources: string;
}

export default function SourcesViewer({ sources }: SourcesViewerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(sources);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Extract URLs from the sources text
  const urls = sources.match(/https?:\/\/[^\s<>"]+/gi) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <Search className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Sources Found</h3>
            <p className="text-xs text-slate-500">Discovered by Search Agent ({urls.length} links)</p>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all text-sm"
        >
          {copied ? (
            <><Check className="w-4 h-4 text-emerald-400" /><span className="text-emerald-400">Copied!</span></>
          ) : (
            <><Copy className="w-4 h-4" /><span>Copy</span></>
          )}
        </button>
      </div>

      {/* Sources content */}
      <div className="glass-card rounded-xl p-6 max-h-[60vh] overflow-y-auto">
        <div className="space-y-3">
          {/* If we found URLs, show them as cards */}
          {urls.length > 0 ? (
            <>
              <div className="mb-4 pb-4 border-b border-white/5">
                <p className="text-sm text-slate-400">Raw search results:</p>
              </div>
              <pre className="whitespace-pre-wrap font-sans text-sm text-slate-300 leading-relaxed bg-transparent border-none p-0 mb-4">
                {sources}
              </pre>
              
              <div className="pt-4 border-t border-white/5">
                <p className="text-sm font-medium text-slate-300 mb-3">Extracted Links:</p>
                <div className="space-y-2">
                  {urls.slice(0, 20).map((url, index) => (
                    <a
                      key={index}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 rounded-lg bg-white/[0.03] border border-white/5 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all group"
                    >
                      <ExternalLink className="w-4 h-4 text-blue-400 shrink-0" />
                      <span className="text-sm text-slate-400 group-hover:text-blue-300 truncate">{url}</span>
                    </a>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <pre className="whitespace-pre-wrap font-sans text-sm text-slate-300 leading-relaxed bg-transparent border-none p-0">
              {sources}
            </pre>
          )}
        </div>
      </div>
    </motion.div>
  );
}