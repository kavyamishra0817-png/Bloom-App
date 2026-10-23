import React from 'react';
import { Bell, ChevronDown, Search } from 'lucide-react';
import { Address, ReceiveMode, Store } from '../types';
import { IconDelivery, IconPickup } from './BrandIcons';

interface HeaderBarProps {
  receiveMode: ReceiveMode;
  selectedAddress: Address | null;
  selectedStore: Store | null;
  onOpenReceiveMode: () => void;
  onOpenNotifications: () => void;
  onOpenSearch: () => void;
  unreadNotificationsCount: number;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  receiveMode,
  selectedAddress,
  selectedStore,
  onOpenReceiveMode,
  onOpenNotifications,
  onOpenSearch,
  unreadNotificationsCount
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-rose-100/70 px-4 py-2.5 flex flex-col gap-2 shadow-2xs">
      {/* Top row: Brand & Actions */}
      <div className="flex items-center justify-between gap-2">
        {/* Brand identity */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-pink-400 via-rose-400 to-emerald-500 shadow-xs shrink-0 flex items-center justify-center">
            <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center">
              <img
                src="/assets/aistudio/image_409_9964af08.png"
                alt="Bloom Cake & Coffee Logo"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-display font-bold text-base tracking-tight text-stone-900 leading-none">
                Bloom
              </span>
              <span className="text-[10px] font-extrabold tracking-wider text-rose-600 uppercase bg-rose-50 px-1.5 py-0.2 rounded-md">
                Nha Trang
              </span>
            </div>
            <p className="text-[11px] text-stone-500 leading-snug mt-0.5">
              Chào buổi sáng, Quỳnh Anh!
            </p>
          </div>
        </div>

        {/* Right utility buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onOpenSearch}
            aria-label="Tìm kiếm món"
            className="w-9 h-9 rounded-full bg-rose-50/80 hover:bg-rose-100 text-rose-700 hover:text-rose-900 flex items-center justify-center transition-colors border border-rose-100"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenNotifications}
            aria-label="Thông báo"
            className="w-9 h-9 rounded-full bg-emerald-50/80 hover:bg-emerald-100 text-emerald-800 hover:text-emerald-950 flex items-center justify-center relative transition-colors border border-emerald-100"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
            )}
          </button>
        </div>
      </div>

      {/* Second row: Location & Delivery Method Picker */}
      <button
        onClick={onOpenReceiveMode}
        className="w-full bg-gradient-to-r from-rose-50/80 via-white to-emerald-50/60 hover:from-rose-100/80 hover:to-emerald-100/70 border border-rose-200/80 rounded-2xl px-3 py-2 flex items-center justify-between text-left transition-colors group shadow-2xs"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-white shadow-2xs flex items-center justify-center shrink-0 border border-rose-100">
            {receiveMode === 'delivery' ? (
              <IconDelivery className="w-5 h-5" />
            ) : (
              <IconPickup className="w-5 h-5" />
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider flex items-center gap-1">
              {receiveMode === 'delivery' ? 'Giao tận nơi đến' : 'Đến lấy tại chi nhánh'}
              <span className="text-stone-300 font-normal">·</span>
              <span className="text-emerald-700 font-extrabold underline decoration-emerald-400">Thay đổi</span>
            </span>
            <p className="text-xs font-semibold text-stone-800 truncate">
              {receiveMode === 'delivery'
                ? selectedAddress
                  ? `${selectedAddress.label} - ${selectedAddress.fullAddress}`
                  : 'Chọn địa chỉ nhận hàng tại Nha Trang'
                : selectedStore
                ? `${selectedStore.name} (${selectedStore.distance})`
                : 'Chọn chi nhánh Bloom gần bạn'}
            </p>
          </div>
        </div>
        <ChevronDown className="w-4 h-4 text-rose-400 group-hover:text-rose-700 shrink-0 ml-1" />
      </button>
    </header>
  );
};
