import React from 'react';
import { IconHome, IconOrder, IconQR, IconStore, IconAccount } from './BrandIcons';

export type MainTabType = 'home' | 'order' | 'qr' | 'store' | 'account';

interface BottomNavBarProps {
  activeTab: MainTabType;
  onChangeTab: (tab: MainTabType) => void;
  cartCount: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onChangeTab,
  cartCount
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-rose-100/80 px-2 py-1 max-w-[400px] mx-auto select-none shadow-lg shadow-rose-950/5">
      <div className="grid grid-cols-5 items-center">
        {/* Tab 1: Trang chủ */}
        <button
          onClick={() => onChangeTab('home')}
          className={`flex flex-col items-center justify-center py-1 transition-all relative min-h-[44px] group active:scale-95 ${
            activeTab === 'home' ? 'text-rose-700' : 'text-stone-400 hover:text-rose-600'
          }`}
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <IconHome active={activeTab === 'home'} className="w-5 h-5 transition-transform group-hover:scale-105" />
          </div>
          <span className={`text-[10px] font-bold tracking-tight mt-0.5 ${
            activeTab === 'home' ? 'text-rose-700' : 'text-stone-500'
          }`}>
            Trang chủ
          </span>
          {activeTab === 'home' && (
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600 absolute bottom-0.5"></span>
          )}
        </button>

        {/* Tab 2: Đặt hàng */}
        <button
          onClick={() => onChangeTab('order')}
          className={`flex flex-col items-center justify-center py-1 transition-all relative min-h-[44px] group active:scale-95 ${
            activeTab === 'order' ? 'text-emerald-800' : 'text-stone-400 hover:text-emerald-700'
          }`}
        >
          <div className="w-6 h-6 flex items-center justify-center relative">
            <IconOrder active={activeTab === 'order'} className="w-5 h-5 transition-transform group-hover:scale-105" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-rose-600 text-white font-extrabold text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </div>
          <span className={`text-[10px] font-bold tracking-tight mt-0.5 ${
            activeTab === 'order' ? 'text-emerald-800' : 'text-stone-500'
          }`}>
            Đặt hàng
          </span>
          {activeTab === 'order' && (
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 absolute bottom-0.5"></span>
          )}
        </button>

        {/* Tab 3: QR thành viên (Center Glowing Flower Emblem) */}
        <button
          onClick={() => onChangeTab('qr')}
          className="flex flex-col items-center justify-center -mt-4 group min-h-[50px] active:scale-95 transition-transform"
          aria-label="QR Thành viên Bloom"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-500 via-rose-500 to-emerald-500 p-0.5 shadow-md shadow-rose-300/50 group-hover:shadow-rose-400/60 transition-all flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
              <IconQR active={activeTab === 'qr'} className="w-6 h-6" />
            </div>
          </div>
          <span className={`text-[10px] font-extrabold tracking-tight mt-0.5 ${
            activeTab === 'qr' ? 'text-rose-600' : 'text-stone-600'
          }`}>
            QR Bloom
          </span>
        </button>

        {/* Tab 4: Cửa hàng */}
        <button
          onClick={() => onChangeTab('store')}
          className={`flex flex-col items-center justify-center py-1 transition-all relative min-h-[44px] group active:scale-95 ${
            activeTab === 'store' ? 'text-emerald-800' : 'text-stone-400 hover:text-emerald-700'
          }`}
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <IconStore active={activeTab === 'store'} className="w-5 h-5 transition-transform group-hover:scale-105" />
          </div>
          <span className={`text-[10px] font-bold tracking-tight mt-0.5 ${
            activeTab === 'store' ? 'text-emerald-800' : 'text-stone-500'
          }`}>
            Cửa hàng
          </span>
          {activeTab === 'store' && (
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 absolute bottom-0.5"></span>
          )}
        </button>

        {/* Tab 5: Tài khoản */}
        <button
          onClick={() => onChangeTab('account')}
          className={`flex flex-col items-center justify-center py-1 transition-all relative min-h-[44px] group active:scale-95 ${
            activeTab === 'account' ? 'text-rose-700' : 'text-stone-400 hover:text-rose-600'
          }`}
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <IconAccount active={activeTab === 'account'} className="w-5 h-5 transition-transform group-hover:scale-105" />
          </div>
          <span className={`text-[10px] font-bold tracking-tight mt-0.5 ${
            activeTab === 'account' ? 'text-rose-700' : 'text-stone-500'
          }`}>
            Tài khoản
          </span>
          {activeTab === 'account' && (
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600 absolute bottom-0.5"></span>
          )}
        </button>
      </div>
    </nav>
  );
};
