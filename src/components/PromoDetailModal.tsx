import React from 'react';
import { X, Sparkles, Copy, Check, ArrowRight } from 'lucide-react';
import { PromoBanner } from '../types';

interface PromoDetailModalProps {
  banner: PromoBanner | null;
  isOpen: boolean;
  onClose: () => void;
  onUseCode: (code: string) => void;
}

export const PromoDetailModal: React.FC<PromoDetailModalProps> = ({
  banner,
  isOpen,
  onClose,
  onUseCode
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen || !banner) return null;

  const handleCopy = () => {
    if (banner.voucherCode) {
      navigator.clipboard?.writeText(banner.voucherCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in select-none">
      <div className="w-full max-w-[360px] bg-white rounded-3xl shadow-2xl p-5 relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 rounded-full bg-stone-100 text-stone-500 hover:text-stone-800 flex items-center justify-center z-10"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-3.5">
          {/* Header Banner */}
          <div className={`p-5 rounded-2xl bg-gradient-to-tr ${banner.accentColor} text-white shadow-md`}>
            <span className="text-[10px] uppercase font-bold tracking-wider bg-white/20 px-2 py-0.5 rounded-full inline-block">
              {banner.tag}
            </span>
            <h3 className="text-lg font-bold font-display mt-2 leading-snug">
              {banner.title}
            </h3>
            <p className="text-xs text-white/90 mt-1">{banner.subtitle}</p>
          </div>

          {/* Description */}
          <div className="space-y-2 text-xs text-stone-600 leading-relaxed">
            <h4 className="font-bold text-stone-900 font-display">Chi tiết chương trình:</h4>
            <p>{banner.description}</p>
            <p>• Áp dụng trên toàn bộ hệ thống chi nhánh Bloom Cake & Coffee.</p>
            <p>• Có thể sử dụng song song cùng điểm thưởng thành viên Bloom.</p>
          </div>

          {/* Promo code copy strip */}
          {banner.voucherCode && (
            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-stone-400 font-semibold uppercase block">
                  Mã khuyến mãi
                </span>
                <span className="font-mono font-bold text-sm text-rose-600">
                  {banner.voucherCode}
                </span>
              </div>
              <button
                onClick={handleCopy}
                className="py-1.5 px-3 rounded-xl bg-white border border-stone-200 text-stone-700 text-xs font-semibold flex items-center gap-1 hover:bg-stone-100 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Đã sao chép' : 'Sao chép'}</span>
              </button>
            </div>
          )}

          {/* Use Now CTA */}
          <button
            onClick={() => {
              if (banner.voucherCode) onUseCode(banner.voucherCode);
              onClose();
            }}
            className="w-full py-3 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800 shadow-md flex items-center justify-center gap-1.5 transition-all"
          >
            <span>Áp dụng & Đặt món ngay</span>
            <ArrowRight className="w-4 h-4 text-rose-300" />
          </button>
        </div>
      </div>
    </div>
  );
};
