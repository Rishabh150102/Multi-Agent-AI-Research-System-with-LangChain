export default function Footer() {
  return (
    <footer className="py-12 px-4 border-t mt-20 border-gray-200 transition-colors duration-200">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm font-medium mb-1 text-gray-900">
          © 2026 ResearchAI
        </p>
        <p className="text-sm mb-3 text-gray-500">
          Multi-Agent Research Platform
        </p>
        <p className="text-xs text-gray-400">
          Built using LangChain and FastAPI
        </p>
      </div>
    </footer>
  );
}
