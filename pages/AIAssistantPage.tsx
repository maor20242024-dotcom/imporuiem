

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { analyzeProjectDescription } from '@/services/geminiService';
import Spinner from '@/components/Spinner';

// FIX: Updated component to accept and pass down className prop
const FaRobot = ({ className }: { className?: string }) => <svg className={className} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M32 320c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32v-96c0-17.7-14.3-32-32-32H32zm0-128c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32v-96c0-17.7-14.3-32-32-32H32zM384 192c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32v-96c0-17.7-14.3-32-32-32h-96zm0 128c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32v-96c0-17.7-14.3-32-32-32h-96zM144 64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32V128c0-35.3-28.7-64-64-64h-32zM288 96c0-17.7 14.3-32 32-32h32c35.3 0 64 28.7 64 64v32c0 17.7-14.3 32-32 32h-96c-17.7 0-32-14.3-32-32V96z"></path></svg>;
const FaPaperPlane = () => <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"></path></svg>;

export default function AIAssistantPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const descriptionFromUrl = searchParams.get('description');
    if (descriptionFromUrl) {
      setPrompt(descriptionFromUrl);
      handleSendMessage(null, descriptionFromUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleSendMessage = async (e: React.FormEvent | null, text: string = prompt) => {
    if (e) e.preventDefault();
    if (!text.trim()) {
      setError(t('ai_analysis_empty_desc'));
      return;
    }

    setLoading(true);
    setError('');
    setResponse('');

    try {
      const analysisResult = await analyzeProjectDescription(text);
      setResponse(analysisResult);
    } catch (err: any) {
      setError(err.message || t('ai_analysis_failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-brand-navy p-8 md:p-12">
      <h1 className="text-4xl font-extrabold text-brand-gold mb-4 text-center flex items-center justify-center gap-4">
        <FaRobot className="text-5xl" /> {t('ai_insights_studio')}
      </h1>
      <p className="text-lg text-white/80 mb-12 text-center max-w-2xl mx-auto">
        {t('ai_studio_description')}
      </p>

      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl max-w-4xl mx-auto">
        <form onSubmit={handleSendMessage} className="flex flex-col sm:flex-row gap-4 mb-8">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={t('ask_ai_question') || ''}
            className="flex-grow p-4 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 ring-brand-gold text-lg min-h-[100px] sm:min-h-0"
            disabled={loading}
          />
          <button
            type="submit"
            className="px-6 py-3 bg-brand-gold text-black font-semibold rounded-lg hover:bg-[var(--brand-gold-light)] transition-colors flex items-center justify-center gap-2 self-start sm:self-stretch"
            disabled={loading}
          >
            {loading ? <Spinner /> : <FaPaperPlane />}
            <span className="hidden sm:inline">{t('send')}</span>
          </button>
        </form>

        {loading && (
          <div className="text-center text-brand-gold mb-4 flex items-center justify-center gap-2">
            <Spinner />
            <span>{t('ai_thinking')}</span>
          </div>
        )}

        {error && (
          <p className="text-center text-red-500 mb-4">
            {t('error')}: {error}
          </p>
        )}

        {response && (
          <div className="bg-zinc-800 p-6 rounded-lg text-white/90 whitespace-pre-wrap leading-relaxed">
            <h3 className="text-xl font-bold text-brand-gold mb-4">{t('ai_response')}:</h3>
            <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: response.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br />') }} />
          </div>
        )}
      </div>
    </main>
  );
}