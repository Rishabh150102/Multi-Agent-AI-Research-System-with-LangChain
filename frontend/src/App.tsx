import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import WorkflowVisualization from './components/WorkflowVisualization';
import ResearchInput from './components/ResearchInput';
import LoadingWorkflow from './components/LoadingWorkflow';
import ResultsTabs from './components/ResultsTabs';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

// API Configuration
const API_BASE_URL = 'https://multi-agent-ai-research-system-with-wqur.onrender.com';
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 120000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response type - exported for use in other components
export interface ResearchResponse {
  search_results: string;
  scraped_content: string;
  report: string;
  feedback: string;
}

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [results, setResults] = useState<ResearchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Always scroll to top on page load/reload
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Simulate agent workflow steps during loading
  const simulateSteps = useCallback(async (): Promise<void> => {
    const steps = [1, 2, 3, 4];
    for (const step of steps) {
      setCurrentStep(step);
      await new Promise(resolve => setTimeout(resolve, 2500));
    }
  }, []);

  const handleSubmit = useCallback(async (topic: string) => {
    setIsLoading(true);
    setCurrentStep(1);
    setError(null);
    setResults(null);

    try {
      const stepPromise = simulateSteps();
      
      const response = await apiClient.post<ResearchResponse>('/generate-report', {
        topic,
      });

      await Promise.all([stepPromise]);

      setResults(response.data);
      setIsLoading(false);
      setCurrentStep(0);
    } catch (err) {
      console.error('Research generation failed:', err);
      
      let errorMessage = 'An unexpected error occurred';
      if (axios.isAxiosError(err)) {
        if (err.code === 'ECONNABORTED') {
          errorMessage = 'Request timed out. The research is taking longer than expected.';
        } else if (err.response) {
          errorMessage = `Server error: ${err.response.status}`;
        } else if (err.request) {
          errorMessage = 'Network error. Please check your connection.';
        }
      }
      
      setError(errorMessage);
      setIsLoading(false);
      setCurrentStep(0);
    }
  }, [simulateSteps]);

  const hasResults = results !== null;

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Navbar />
      
      <main>
        <HeroSection />
        <WorkflowVisualization isCompleted={hasResults} results={results} />
        <ResearchInput onSubmit={handleSubmit} isLoading={isLoading} />
        
        {isLoading && <LoadingWorkflow currentStep={currentStep} />}
        
        <ResultsTabs results={results} error={error} />
      </main>
      
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
