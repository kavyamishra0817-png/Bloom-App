import React, { useState } from 'react';
import { Smartphone, Monitor, Sparkles } from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  const [isPhoneFrame, setIsPhoneFrame] = useState<boolean>(true);

  return (
    <div className="min-h-screen bg-stone-100/90 text-stone-800 flex flex-col items-center justify-start antialiased">
      {/* Top utility bar visible on large screens to toggle frame view */}
      <div className="w-full bg-white/80 backdrop-blur-md border-b border-stone-200/80 px-4 py-2 flex items-center justify-between text-xs text-stone-600 z-50">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full overflow-hidden bg-rose-50 flex items-center justify-center">
            <img 
              src="/assets/aistudio/image_409_9964af08.png" 
              alt="Bloom Logo" 
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback icon
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <span className="font-semibold text-rose-900 tracking-tight">Bloom Cake & Coffee</span>
          <span className="hidden sm:inline-block text-stone-400">·</span>
          <span className="hidden sm:inline-block text-stone-500">Ứng dụng Mobile Thương hiệu</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPhoneFrame(true)}
            className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors ${
              isPhoneFrame
                ? 'bg-rose-100 text-rose-800 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Khung 390px</span>
          </button>
          <button
            onClick={() => setIsPhoneFrame(false)}
            className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors ${
              !isPhoneFrame
                ? 'bg-rose-100 text-rose-800 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mở rộng</span>
          </button>
        </div>
      </div>

      {/* Main content viewport */}
      <div className="flex-1 w-full flex items-center justify-center sm:py-6 sm:px-4">
        {isPhoneFrame ? (
          <div className="w-full max-w-[400px] h-[100dvh] sm:h-[844px] bg-white sm:rounded-[44px] sm:shadow-2xl sm:border-[8px] sm:border-stone-800 relative flex flex-col overflow-hidden sm:ring-1 sm:ring-black/5">
            {/* Phone Notch / Dynamic Island on desktop view */}
            <div className="hidden sm:flex items-center justify-between px-7 pt-3 pb-1 text-[11px] font-semibold text-stone-800 z-50 bg-white/95 backdrop-blur-sm select-none">
              <span>9:41</span>
              {/* Dynamic Island Pill */}
              <div className="w-24 h-4 bg-stone-900 rounded-full flex items-center justify-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-stone-800 border border-stone-700"></div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px]">5G</span>
                <div className="w-4 h-2 rounded-xs border border-stone-800 p-0.5 flex items-center">
                  <div className="w-full h-full bg-stone-800 rounded-2xs"></div>
                </div>
              </div>
            </div>

            {/* Application container */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col bg-stone-50/50 no-scrollbar">
              {children}
            </div>

            {/* Home indicator bar */}
            <div className="w-full h-4 bg-white/95 flex items-center justify-center shrink-0 z-40 select-none pb-1">
              <div className="w-32 h-1 bg-stone-300 rounded-full"></div>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-2xl min-h-screen sm:min-h-[844px] bg-white sm:rounded-3xl sm:shadow-xl sm:border border-stone-200/80 relative flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col bg-stone-50/50">
              {children}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
