import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ScrapedContentViewerProps {
  content: string;
}

// Custom component for links that open in new tab
const MarkdownLink = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a target="_blank" rel="noopener noreferrer" {...props} />
);

export default function ScrapedContentViewer({ content }: ScrapedContentViewerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const wordCount = content.split(/\s+/).filter(Boolean).length;

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
          <div className="p-2.5 rounded-xl bg-sky-50">
            <Lightbulb size={22} className="text-sky-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Research Insights</h3>
            <p className="text-sm text-gray-500 mt-0.5">Extracted by Reader Agent · ~{wordCount.toLocaleString()} words</p>
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

      {/* Content - NO fixed height, NO internal scrollbar, natural page scroll only */}
      <div className="card p-8 sm:p-10 lg:p-12">
        <div className="markdown-content max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ node, ...props }) => <MarkdownLink {...props} />, 
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
}