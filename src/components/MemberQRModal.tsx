import React, { useState, useEffect, useRef } from 'react';
import { X, Sparkles, ChevronRight, Award, Camera, QrCode, Flashlight, RefreshCw, AlertCircle, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { MemberProfile } from '../types';
import { IconQR } from './BrandIcons';

interface MemberQRModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: MemberProfile;
  onOpenLoyaltyTiers: () => void;
  onScannedResult?: (content: string) => void;
}

export const MemberQRModal: React.FC<MemberQRModalProps> = ({
  isOpen,
  onClose,
  profile,
  onOpenLoyaltyTiers,
  onScannedResult
}) => {
  const [activeMode, setActiveMode] = useState<'my_qr' | 'scan_qr'>('my_qr');
  const [cameraPermission, setCameraPermission] = useState<'idle' | 'prompt' | 'granted' | 'denied'>('idle');
  const [torchOn, setTorchOn] = useState(false);
  const [scanSuccessText, setScanSuccessText] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Stop video stream helper
  const stopStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  // Start camera stream when scan_qr tab is active
  const startCamera = async () => {
    setCameraPermission('prompt');
    setScanSuccessText(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraPermission('denied');
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
      }
      setCameraPermission('granted');
    } catch (err) {
      console.warn('Camera permission denied or device not found:', err);
      setCameraPermission('denied');
    }
  };

  useEffect(() => {
    if (isOpen && activeMode === 'scan_qr') {
      startCamera();
    } else {
      stopStream();
    }

    return () => {
      stopStream();
    };
  }, [isOpen, activeMode]);

  if (!isOpen) return null;

  // Mask phone number (0988 345 219 -> 0988 ••• 219)
  const maskedPhone = profile.phone.replace(/(\d{4})\s*(\d{3})\s*(\d{3})/, '$1 ••• $3');

  const handleSimulateScan = (codeText: string) => {
    setScanSuccessText(codeText);
    setTimeout(() => {
      if (onScannedResult) onScannedResult(codeText);
      stopStream();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in select-none">
      <div className="w-full max-w-[380px] bg-white rounded-3xl shadow-2xl p-5 relative flex flex-col items-center overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => {
            stopStream();
            onClose();
          }}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 text-stone-500 hover:text-stone-800 flex items-center justify-center transition-colors z-20"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Header */}
        <div className="w-full text-center pb-1">
          <div className="w-11 h-11 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-pink-400 via-rose-300 to-emerald-400 mx-auto shadow-xs mb-1.5 flex items-center justify-center">
            <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center">
              <img
                src="/assets/aistudio/image_409_9964af08.png"
                alt="Bloom Logo"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          </div>
          <h3 className="font-display font-extrabold text-base text-stone-900 tracking-tight">
            Bloom Member & QR
          </h3>
        </div>

        {/* Mode Switcher Tabs: Mã thành viên vs Quét mã QR */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-stone-100/90 rounded-2xl w-full my-3">
          <button
            onClick={() => setActiveMode('my_qr')}
            className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeMode === 'my_qr'
                ? 'bg-white text-rose-700 shadow-xs'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>Mã của tôi</span>
          </button>

          <button
            onClick={() => setActiveMode('scan_qr')}
            className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeMode === 'scan_qr'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Quét mã QR</span>
          </button>
        </div>

        {/* Tab 1: Mã của tôi (My QR code) */}
        {activeMode === 'my_qr' ? (
          <div className="w-full flex flex-col items-center animate-fade-in">
            {/* The Digital Membership Card */}
            <div className="w-full p-4 rounded-2xl bg-gradient-to-tr from-stone-900 via-stone-800 to-rose-950 text-white shadow-xl relative overflow-hidden border border-rose-900/30">
              {/* Background floral aura from logo colors */}
              <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-rose-500/20 blur-xl pointer-events-none" />
              <div className="absolute -left-8 -bottom-8 w-32 h-32 rounded-full bg-emerald-500/20 blur-xl pointer-events-none" />

              {/* Member Card Top row */}
              <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-rose-300 font-bold block">
                    Hạng hội viên
                  </span>
                  <p className="font-display font-bold text-xs text-white flex items-center gap-1.5 mt-0.5">
                    <Award className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>{profile.tier}</span>
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[9px] uppercase tracking-widest text-emerald-300 font-bold block">
                    BloomPoints
                  </span>
                  <p className="font-display font-extrabold text-sm text-emerald-400">
                    {profile.spendablePoints} <span className="text-[10px] font-normal text-white/70">pts</span>
                  </p>
                </div>
              </div>

              {/* Center High-Contrast QR Code */}
              <div className="my-3 p-3 bg-white rounded-2xl mx-auto w-40 h-40 flex flex-col items-center justify-center shadow-inner relative">
                <svg
                  className="w-full h-full text-stone-900"
                  viewBox="0 0 100 100"
                  fill="currentColor"
                >
                  <rect x="10" y="10" width="24" height="24" rx="4" fill="#1c1917" />
                  <rect x="15" y="15" width="14" height="14" rx="2" fill="#ffffff" />
                  <rect x="18" y="18" width="8" height="8" rx="1.5" fill="#e11d48" />

                  <rect x="66" y="10" width="24" height="24" rx="4" fill="#1c1917" />
                  <rect x="71" y="15" width="14" height="14" rx="2" fill="#ffffff" />
                  <rect x="74" y="18" width="8" height="8" rx="1.5" fill="#e11d48" />

                  <rect x="10" y="66" width="24" height="24" rx="4" fill="#1c1917" />
                  <rect x="15" y="71" width="14" height="14" rx="2" fill="#ffffff" />
                  <rect x="18" y="74" width="8" height="8" rx="1.5" fill="#e11d48" />

                  <rect x="38" y="12" width="6" height="6" rx="1" fill="#1c1917" />
                  <rect x="48" y="12" width="6" height="6" rx="1" fill="#1c1917" />
                  <rect x="58" y="16" width="4" height="6" rx="1" fill="#1c1917" />
                  <rect x="38" y="24" width="6" height="6" rx="1" fill="#1c1917" />
                  <rect x="50" y="26" width="8" height="4" rx="1" fill="#1c1917" />

                  {/* Center Floral Bloom Icon */}
                  <circle cx="50" cy="50" r="14" fill="#f43f5e" />
                  <path d="M50 42 C53 46, 56 47, 58 50 C56 53, 53 54, 50 58 C47 54, 44 53, 42 50 C44 47, 47 46, 50 42 Z" fill="#ffffff" />

                  <rect x="38" y="66" width="6" height="6" rx="1" fill="#1c1917" />
                  <rect x="50" y="70" width="8" height="6" rx="1" fill="#1c1917" />
                  <rect x="66" y="50" width="6" height="8" rx="1" fill="#1c1917" />
                  <rect x="78" y="50" width="8" height="6" rx="1" fill="#1c1917" />
                  <rect x="68" y="68" width="6" height="6" rx="1" fill="#1c1917" />
                  <rect x="80" y="74" width="6" height="8" rx="1" fill="#1c1917" />
                </svg>
              </div>

              {/* Member Card Bottom row */}
              <div className="flex items-center justify-between text-xs text-stone-300 pt-1">
                <span className="font-semibold text-white">{profile.name}</span>
                <span className="font-mono text-[11px] text-stone-400">{maskedPhone}</span>
              </div>
            </div>

            {/* Instruction */}
            <div className="text-center px-2 py-2">
              <p className="text-xs font-bold text-stone-800">
                Đưa mã này cho nhân viên để tích điểm tại quầy
              </p>
              <p className="text-[10px] text-stone-400 mt-0.5">
                Áp dụng tại tất cả chi nhánh Bloom Cake & Coffee ở Nha Trang
              </p>
            </div>

            {/* Loyalty tiers link */}
            <button
              onClick={() => {
                onClose();
                onOpenLoyaltyTiers();
              }}
              className="w-full mt-2 py-2.5 px-3 rounded-xl bg-rose-50/70 hover:bg-rose-100/70 text-rose-800 text-xs font-semibold flex items-center justify-between transition-colors border border-rose-100"
            >
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-rose-600" />
                <span>Xem quyền lợi thăng hạng Bloom Diamond</span>
              </div>
              <ChevronRight className="w-4 h-4 text-rose-400" />
            </button>
          </div>
        ) : (
          /* Tab 2: Quét mã QR (Camera Scanner with Permission Flow) */
          <div className="w-full flex flex-col items-center animate-fade-in space-y-3">
            {/* Camera Viewport Frame */}
            <div className="relative w-full aspect-square max-w-[280px] rounded-3xl overflow-hidden bg-stone-900 shadow-inner flex items-center justify-center border-2 border-stone-800">
              {/* Video Feed */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover ${cameraPermission === 'granted' ? 'block' : 'hidden'}`}
              />

              {/* Reticle Overlay Corners in Bloom Logo Colors */}
              <div className="absolute inset-4 pointer-events-none">
                {/* Top Left */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-rose-500 rounded-tl-xl"></div>
                {/* Top Right */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-emerald-500 rounded-tr-xl"></div>
                {/* Bottom Left */}
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-emerald-500 rounded-bl-xl"></div>
                {/* Bottom Right */}
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-rose-500 rounded-br-xl"></div>

                {/* Animated Laser Scanning Line */}
                {cameraPermission === 'granted' && (
                  <div className="w-full h-1 bg-gradient-to-r from-rose-500 via-pink-400 to-emerald-400 shadow-md shadow-rose-500/50 absolute animate-[bounce_2.5s_infinite]"></div>
                )}
              </div>

              {/* Status or Prompt over Video */}
              {cameraPermission === 'prompt' && (
                <div className="absolute inset-0 bg-stone-900/90 flex flex-col items-center justify-center p-4 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center animate-pulse">
                    <Camera className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-bold text-white">Đang yêu cầu quyền Camera...</p>
                  <p className="text-[11px] text-stone-400">
                    Vui lòng chọn "Cho phép / Allow" trên trình duyệt để khởi động ống kính quét mã.
                  </p>
                </div>
              )}

              {cameraPermission === 'denied' && (
                <div className="absolute inset-0 bg-stone-900/95 flex flex-col items-center justify-center p-4 text-center space-y-2.5 z-10">
                  <div className="w-10 h-10 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-bold text-white">Chưa cấp quyền truy cập Camera</p>
                  <p className="text-[11px] text-stone-400 leading-relaxed">
                    Bạn có thể cấp quyền trong cài đặt trình duyệt, hoặc bấm nút dưới đây để thử kết nối lại.
                  </p>
                  <button
                    onClick={startCamera}
                    className="py-1.5 px-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Cấp quyền lại</span>
                  </button>
                </div>
              )}

              {/* Success Result Overlay */}
              {scanSuccessText && (
                <div className="absolute inset-0 bg-emerald-950/90 flex flex-col items-center justify-center p-4 text-center space-y-2 z-20 animate-fade-in">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                  <p className="text-sm font-bold text-white font-display">Quét mã thành công!</p>
                  <p className="text-xs text-emerald-200">{scanSuccessText}</p>
                </div>
              )}
            </div>

            {/* Scan Guidance Text */}
            <div className="text-center px-3">
              <p className="text-xs font-bold text-stone-800">
                Hướng camera vào mã QR tại bàn hoặc cửa hàng Bloom
              </p>
              <p className="text-[10px] text-stone-400 mt-0.5">
                Tự động nhận diện mã đặt món tại bàn, voucher sự kiện hoặc tích điểm
              </p>
            </div>

            {/* Quick Simulation Buttons for User Testing */}
            <div className="w-full space-y-1.5 pt-1">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block text-center">
                Mô phỏng quét mã mẫu tại Nha Trang:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() =>
                    handleSimulateScan('Mã Bàn 08 - Bloom Flagship Trần Phú (Nha Trang)')
                  }
                  className="p-2 rounded-xl border border-stone-200 bg-stone-50 hover:bg-rose-50 hover:border-rose-300 text-left text-[11px] transition-colors"
                >
                  <span className="font-bold text-stone-800 block">Mã bàn 08</span>
                  <span className="text-[10px] text-rose-600">Gọi món tại quán</span>
                </button>

                <button
                  onClick={() =>
                    handleSimulateScan('Ưu đãi Nha Trang: Tặng Voucher 30k BLOOMWELCOME')
                  }
                  className="p-2 rounded-xl border border-stone-200 bg-stone-50 hover:bg-emerald-50 hover:border-emerald-300 text-left text-[11px] transition-colors"
                >
                  <span className="font-bold text-stone-800 block">Voucher 30k</span>
                  <span className="text-[10px] text-emerald-700">Nhận quà chào mừng</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
