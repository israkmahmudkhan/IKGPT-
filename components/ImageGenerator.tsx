
import React, { useState, FormEvent } from 'react';
import { generateImage } from '../services/geminiService';
import { ImageIcon } from './common/Icons';
import LoadingSpinner from './common/LoadingSpinner';

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError('Please enter a prompt.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const response = await generateImage(prompt);
      if (response.generatedImages && response.generatedImages.length > 0) {
        const base64ImageBytes = response.generatedImages[0].image.imageBytes;
        setImageUrl(`data:image/png;base64,${base64ImageBytes}`);
      } else {
        throw new Error('No image was generated.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to generate image. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full flex-grow bg-gray-900/50 border border-gray-800 rounded-lg p-6 backdrop-blur-sm space-y-6">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="A neon-lit cyberpunk city in the rain..."
          className="flex-grow w-full bg-gray-800/80 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto bg-pink-500 text-black font-bold px-6 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-pink-400 transition-all duration-300 shadow-[0_0_10px_rgba(236,72,153,0.5)] hover:shadow-[0_0_15px_rgba(236,72,153,0.8)]"
        >
          {isLoading ? 'Generating...' : 'Generate'}
        </button>
      </form>

      {error && <p className="text-red-400 text-center">{error}</p>}

      <div className="flex-grow flex items-center justify-center border-2 border-dashed border-gray-700 rounded-lg min-h-[400px] p-4 bg-black/20">
        {isLoading ? (
          <LoadingSpinner />
        ) : imageUrl ? (
          <img src={imageUrl} alt={prompt} className="max-w-full max-h-full object-contain rounded-lg shadow-2xl shadow-pink-500/20" />
        ) : (
          <div className="text-center text-gray-500">
            <ImageIcon className="w-16 h-16 mx-auto mb-4" />
            <p>Your generated image will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGenerator;
