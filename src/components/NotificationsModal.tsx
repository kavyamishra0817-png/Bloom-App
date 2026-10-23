import React, { useState } from 'react';
import { X, Bell, Package, Gift, CheckCheck } from 'lucide-react';
import { NotificationItem, Order } from '../types';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onSelectNotification: (notif: NotificationItem) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onSelectNotification
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'order' | 'promo'>('all');

  if (!isOpen) return null;

  const filtered = notifications.filter((n) => {
    if (activeTab === 'all') return true;
    return n.type === activeTab;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in select-none">
      <div className="w-full max-w-[380px] h-[85vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-stone-200/80 px-4 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-rose-600" />
            <h3 className="text-sm font-bold text-stone-900 font-display">
              Thông báo của bạn
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllAsRead}
              title="Đánh dấu tất cả đã đọc"
              className="text-[11px] text-stone-500 hover:text-stone-900 font-medium flex items-center gap-1"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Đã đọc hết</span>
            </button>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-stone-100 text-stone-500 hover:text-stone-800 flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Filter Tabs */}
        <div className="p-3 border-b border-stone-100 shrink-0">
          <div className="grid grid-cols-3 gap-1 p-1 bg-stone-100 rounded-xl text-center">
            <button
              onClick={() => setActiveTab('all')}
              className={`py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'all'
                  ? 'bg-white text-stone-900 shadow-2xs'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setActiveTab('order')}
              className={`py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'order'
                  ? 'bg-white text-rose-700 shadow-2xs'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              Đơn hàng
            </button>
            <button
              onClick={() => setActiveTab('promo')}
              className={`py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'promo'
                  ? 'bg-white text-rose-700 shadow-2xs'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              Ưu đãi
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-3 space-y-2">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-stone-400 space-y-2">
              <Bell className="w-10 h-10 mx-auto stroke-[1.2] text-stone-300" />
              <p className="text-xs">Chưa có thông báo nào trong mục này</p>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectNotification(item);
                  onClose();
                }}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex gap-3 ${
                  !item.isRead
                    ? 'border-rose-200 bg-rose-50/40 shadow-2xs'
                    : 'border-stone-100 bg-white hover:bg-stone-50'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    item.type === 'order'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-rose-100 text-rose-700'
                  }`}
                >
                  {item.type === 'order' ? (
                    <Package className="w-4 h-4" />
                  ) : (
                    <Gift className="w-4 h-4" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-1">
                    <h4
                      className={`text-xs font-display leading-snug line-clamp-1 ${
                        !item.isRead ? 'font-bold text-stone-900' : 'font-semibold text-stone-700'
                      }`}
                    >
                      {item.title}
                    </h4>
                    {!item.isRead && (
                      <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0 mt-1"></span>
                    )}
                  </div>
                  <p className="text-[11px] text-stone-500 line-clamp-2 mt-0.5 leading-relaxed">
                    {item.message}
                  </p>
                  <span className="text-[10px] text-stone-400 mt-1 block">
                    {item.time}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
