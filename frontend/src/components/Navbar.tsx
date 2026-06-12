export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md border-b bg-white/80 border-gray-200/80 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-sky-500 flex items-center justify-center shadow-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="10" r="6" stroke="white" strokeWidth="1.5" />
                <circle cx="12" cy="10" r="2.5" fill="white" />
                <path d="M8 17L12 13L16 17L14 21H10L8 17Z" fill="white" opacity="0.9" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold tracking-tight leading-none text-gray-900">
                ResearchAI
              </span>
              <span className="text-xs mt-0.5 hidden sm:block leading-none text-gray-500">
                Powered by autonomous AI agents
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
