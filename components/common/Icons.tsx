import React from 'react';

export const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
  </svg>
);

export const SparklesBotIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 14.5a3.5 3.5 0 10-7 0" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 11V9a2 2 0 012-2h10a2 2 0 012 2v2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 7V5.5a1.5 1.5 0 00-1.5-1.5h-3A1.5 1.5 0 009 5.5V7" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.5v3a2 2 0 002 2h2a2 2 0 002-2v-3" />
    <path stroke="none" fill="currentColor" d="M18.5 2.5l.5-.5.5.5-.5.5-.5-.5zM21.5 4.5l.5-.5.5.5-.5.5-.5-.5zM19.5 5.5l.5-.5.5.5-.5.5-.5-.5z" />
  </svg>
);


export const SunIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v.01M12 20.99v.01M4.22 4.22l.01.01M19.77 19.77l.01.01M3 12h.01M20.99 12h.01M4.22 19.78l.01-.01M19.77 4.23l.01-.01" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 17a5 5 0 100-10 5 5 0 000 10z" />
  </svg>
);

// Fix: Add ImageIcon to be used in ImageGenerator component.
export const ImageIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
);
