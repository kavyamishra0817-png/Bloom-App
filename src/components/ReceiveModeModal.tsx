import React from 'react';
import { X, Check, Plus, ChevronRight } from 'lucide-react';
import { Address, ReceiveMode, Store } from '../types';
import { IconDelivery, IconPickup } from './BrandIcons';

interface ReceiveModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentMode: ReceiveMode;
  onSelectMode: (mode: ReceiveMode) => void;
  addresses: Address[];
  selectedAddress: Address | null;
  onSelectAddress: (address: Address) => void;
  onOpenAddressManager: () => void;
  stores: Store[];
  selectedStore: Store | null;
  onSelectStore: (store: Store) => void;
  onOpenStoreSelector: () => void;
}

export const ReceiveModeModal: React.FC<ReceiveModeModalProps> = ({
  isOpen,
  onClose,
  currentMode,
  onSelectMode,
  addresses,
  selectedAddress,
  onSelectAddress,
  onOpenAddressManager,
  stores,
  selectedStore,
  onSelectStore,
  onOpenStoreSelector
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in select-none">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-[400px] bg-white rounded-t-3xl shadow-2xl p-5 z-10 max-h-[85vh] flex flex-col">
        {/* Grab Handle */}
        <div className="w-12 h-1.5 bg-rose-200 rounded-full mx-auto mb-4 shrink-0" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-rose-100">
          <div>
            <h3 className="text-base font-bold text-stone-900 font-display">
              Phương thức nhận đồ uống
            </h3>
            <p className="text-[11px] text-stone-500">Tại khu vực TP. Nha Trang (Khánh Hòa)</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 text-stone-500 hover:text-stone-800 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-stone-100/90 rounded-2xl my-4">
          <button
            onClick={() => onSelectMode('delivery')}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              currentMode === 'delivery'
                ? 'bg-white text-rose-700 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <IconDelivery className="w-4 h-4" />
            <span>Giao tận nơi</span>
          </button>

          <button
            onClick={() => onSelectMode('pickup')}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              currentMode === 'pickup'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <IconPickup className="w-4 h-4" />
            <span>Đến lấy tại quán</span>
          </button>
        </div>

        {/* Content based on selected mode */}
        <div className="flex-1 overflow-y-auto no-scrollbar space-y-3 pb-4">
          {currentMode === 'delivery' ? (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-rose-800 uppercase tracking-wider">
                  Địa chỉ giao đến tại Nha Trang
                </span>
                <button
                  onClick={onOpenAddressManager}
                  className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Thêm địa chỉ mới
                </button>
              </div>

              <div className="space-y-2">
                {addresses.map((addr) => {
                  const isSelected = selectedAddress?.id === addr.id;
                  return (
                    <div
                      key={addr.id}
                      onClick={() => {
                        onSelectAddress(addr);
                        onClose();
                      }}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                        isSelected
                          ? 'border-rose-400 bg-rose-50/70 shadow-2xs'
                          : 'border-stone-100 bg-stone-50/60 hover:bg-stone-50'
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-stone-900">
                            {addr.label}
                          </span>
                          {addr.isDefault && (
                            <span className="text-[10px] text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded-md font-bold">
                              Mặc định
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-stone-700 font-medium mt-1 truncate">
                          {addr.recipientName} · {addr.phone}
                        </p>
                        <p className="text-xs text-stone-500 mt-0.5 line-clamp-2">
                          {addr.fullAddress} ({addr.detail})
                        </p>
                      </div>

                      <div className="shrink-0 pt-1">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            isSelected
                              ? 'bg-rose-600 text-white'
                              : 'border border-stone-300 text-transparent'
                          }`}
                        >
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={onOpenAddressManager}
                className="w-full mt-3 py-2.5 border border-dashed border-rose-300 rounded-xl text-xs font-semibold text-rose-700 hover:bg-rose-50/50 flex items-center justify-center gap-2 transition-colors"
              >
                <span>Quản lý danh sách địa chỉ nhận hàng</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  Chọn chi nhánh Bloom Nha Trang
                </span>
                <button
                  onClick={onOpenStoreSelector}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 underline"
                >
                  Xem bản đồ & tất cả
                </button>
              </div>

              <div className="space-y-2">
                {stores.map((store) => {
                  const isSelected = selectedStore?.id === store.id;
                  return (
                    <div
                      key={store.id}
                      onClick={() => {
                        if (!store.isOpen) return;
                        onSelectStore(store);
                        onClose();
                      }}
                      className={`p-3 rounded-2xl border transition-all ${
                        !store.isOpen
                          ? 'opacity-50 cursor-not-allowed bg-stone-100 border-stone-200'
                          : isSelected
                          ? 'border-emerald-500 bg-emerald-50/70 shadow-2xs'
                          : 'border-stone-100 bg-stone-50/60 hover:bg-stone-50 cursor-pointer'
                      } flex items-center justify-between gap-3`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-stone-900 truncate">
                            {store.name}
                          </span>
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold ${
                              store.isOpen
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-stone-200 text-stone-600'
                            }`}
                          >
                            {store.isOpen ? 'Mở cửa' : 'Tạm đóng'}
                          </span>
                        </div>
                        <p className="text-xs text-stone-500 mt-1 truncate">
                          {store.address}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-[11px] text-stone-500">
                          <span className="font-bold text-emerald-700">{store.distance}</span>
                          <span>·</span>
                          <span>{store.openHours}</span>
                        </div>
                      </div>

                      <div className="shrink-0">
                        {store.isOpen && (
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center ${
                              isSelected
                                ? 'bg-emerald-600 text-white'
                                : 'border border-stone-300 text-transparent'
                            }`}
                          >
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Confirmation */}
        <button
          onClick={onClose}
          className="w-full mt-2 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
        >
          Xác nhận lựa chọn
        </button>
      </div>
    </div>
  );
};
