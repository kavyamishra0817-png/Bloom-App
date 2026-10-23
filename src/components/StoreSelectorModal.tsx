import React, { useState } from 'react';
import { X, Search, List, Map, MapPin, Phone, Clock, Navigation2, Check } from 'lucide-react';
import { Store } from '../types';
import { IconStore } from './BrandIcons';

interface StoreSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  stores: Store[];
  selectedStore: Store | null;
  onSelectStore: (store: Store) => void;
  onShowToast: (message: string) => void;
}

export const StoreSelectorModal: React.FC<StoreSelectorModalProps> = ({
  isOpen,
  onClose,
  stores,
  selectedStore,
  onSelectStore,
  onShowToast
}) => {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePinStore, setActivePinStore] = useState<Store | null>(selectedStore || stores[0]);

  if (!isOpen) return null;

  const filteredStores = stores.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDirections = (store: Store) => {
    onShowToast(`Đang mở chỉ đường đến ${store.name} (${store.distance}). Thời gian di chuyển ước tính ~6 phút.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs animate-fade-in select-none">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-[400px] bg-white rounded-t-3xl shadow-2xl p-5 z-10 max-h-[92vh] flex flex-col">
        {/* Grab Handle */}
        <div className="w-12 h-1.5 bg-rose-200 rounded-full mx-auto mb-3 shrink-0" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-rose-100 shrink-0">
          <div className="flex items-center gap-2">
            <IconStore className="w-6 h-6" active />
            <div>
              <h3 className="text-base font-bold text-stone-900 font-display">
                Chi nhánh Bloom Nha Trang
              </h3>
              <p className="text-[11px] text-stone-500">
                Chọn chi nhánh ven biển hoặc trung tâm để nhận đồ uống
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 text-stone-500 hover:text-stone-800 flex items-center justify-center shrink-0 ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* View Toggle & Search */}
        <div className="space-y-2.5 py-3 shrink-0">
          <div className="flex items-center justify-between gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Tìm đường Trần Phú, Biệt Thự, Ga..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-100 pl-9 pr-3 py-2 rounded-xl text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:bg-white transition-all"
              />
            </div>

            <div className="flex items-center p-1 bg-stone-100 rounded-xl shrink-0">
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white text-emerald-800 shadow-2xs'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
                title="Xem danh sách"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                  viewMode === 'map'
                    ? 'bg-white text-emerald-800 shadow-2xs'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
                title="Xem bản đồ"
              >
                <Map className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-3">
          {viewMode === 'list' ? (
            <div className="space-y-3">
              {filteredStores.map((store) => {
                const isSelected = selectedStore?.id === store.id;
                return (
                  <div
                    key={store.id}
                    className={`rounded-2xl border p-3 transition-all ${
                      !store.isOpen
                        ? 'bg-stone-50/70 border-stone-200'
                        : isSelected
                        ? 'border-emerald-500 bg-emerald-50/40 shadow-xs ring-1 ring-emerald-300'
                        : 'border-stone-200/80 bg-white hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-stone-100 shrink-0 relative">
                        <img
                          src={store.image}
                          alt={store.name}
                          className={`w-full h-full object-cover ${!store.isOpen ? 'grayscale' : ''}`}
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <div
                          className={`absolute top-1 left-1 px-1.5 py-0.5 rounded-md text-[9px] font-bold ${
                            store.isOpen
                              ? 'bg-emerald-600 text-white'
                              : 'bg-stone-800 text-stone-200'
                          }`}
                        >
                          {store.isOpen ? 'Mở cửa' : 'Đóng cửa'}
                        </div>
                      </div>

                      <div className="min-w-0 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between gap-1">
                            <h4 className="text-xs font-bold text-stone-900 truncate font-display">
                              {store.name}
                            </h4>
                            <span className="text-[11px] font-bold text-emerald-700 shrink-0">
                              {store.distance}
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                            {store.address}
                          </p>
                          <div className="flex items-center gap-2 mt-1 text-[10px] text-stone-500">
                            <span className="flex items-center gap-1 text-emerald-800 font-medium">
                              <Clock className="w-3 h-3 text-emerald-600" />
                              {store.openHours}
                            </span>
                            <span>·</span>
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3 text-stone-400" />
                              {store.phone}
                            </span>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-stone-100">
                          <button
                            onClick={() => handleDirections(store)}
                            className="flex-1 py-1.5 px-2 rounded-lg border border-stone-200 text-[11px] font-semibold text-stone-700 hover:bg-stone-50 flex items-center justify-center gap-1 transition-colors"
                          >
                            <Navigation2 className="w-3 h-3 text-rose-500" />
                            <span>Chỉ đường</span>
                          </button>

                          {store.isOpen ? (
                            <button
                              onClick={() => {
                                onSelectStore(store);
                                onClose();
                              }}
                              className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-colors ${
                                isSelected
                                  ? 'bg-emerald-700 text-white shadow-xs'
                                  : 'bg-stone-900 text-white hover:bg-stone-800'
                              }`}
                            >
                              {isSelected ? (
                                <>
                                  <Check className="w-3 h-3 stroke-[3]" />
                                  <span>Đang chọn</span>
                                </>
                              ) : (
                                <span>Chọn quán này</span>
                              )}
                            </button>
                          ) : (
                            <div className="flex-1 py-1.5 px-2 rounded-lg bg-stone-100 text-[10px] font-medium text-stone-400 text-center">
                              Tạm không nhận đơn
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Interactive Stylized Nha Trang Coastal Map View */
            <div className="space-y-3">
              <div className="relative w-full h-56 rounded-2xl overflow-hidden bg-gradient-to-b from-teal-950 via-emerald-950 to-stone-950 border border-emerald-900 shadow-inner flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
                  <path d="M240 0 Q 200 100, 220 200 T 260 300 L 400 300 L 400 0 Z" fill="#047857" opacity="0.4" />
                  <path d="M220 0 Q 180 100, 200 200 T 240 300" fill="none" stroke="#F472B6" strokeWidth="6" />
                  <path d="M0 60 Q 120 70, 200 65" fill="none" stroke="#6ee7b7" strokeWidth="5" />
                  <ellipse cx="320" cy="180" rx="40" ry="25" fill="#065f46" stroke="#34d399" strokeWidth="1.5" />
                </svg>

                <div className="absolute top-3 left-3 text-[10px] font-bold text-emerald-200 tracking-wider bg-black/50 px-2 py-0.5 rounded">
                  BẢN ĐỒ TP. NHA TRANG (KHÁNH HÒA)
                </div>

                {/* Animated Store Pins */}
                {stores.map((store, idx) => {
                  const positions = [
                    { top: '44%', left: '46%' }, // 1. Flagship Trần Phú (mặt biển)
                    { top: '56%', left: '38%' }, // 2. Garden Biệt Thự (Phố Tây)
                    { top: '38%', left: '26%' }, // 3. Boutique Thái Nguyên (Ga Nha Trang)
                    { top: '72%', left: '76%' }, // 4. Vinpearl Harbour (Hòn Tre)
                    { top: '22%', left: '35%' }  // 5. Roastery 2/4 (Tháp Bà)
                  ];
                  const pos = positions[idx] || { top: '50%', left: '50%' };
                  const isSelected = activePinStore?.id === store.id;

                  return (
                    <button
                      key={store.id}
                      onClick={() => setActivePinStore(store)}
                      style={{ top: pos.top, left: pos.left }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all transform hover:scale-125 z-20 ${
                        isSelected ? 'scale-125 z-30' : ''
                      }`}
                    >
                      <div className="relative flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-colors ${
                            !store.isOpen
                              ? 'bg-stone-600 text-stone-300'
                              : isSelected
                              ? 'bg-rose-500 text-white ring-4 ring-rose-400/40 animate-bounce'
                              : 'bg-emerald-600 text-white ring-2 ring-white/80'
                          }`}
                        >
                          <MapPin className="w-4 h-4" />
                        </div>
                        <span className="text-[9px] font-bold text-white bg-black/70 px-1.5 py-0.2 rounded-full whitespace-nowrap mt-0.5">
                          {store.name.replace('Bloom ', '').split('(')[0]}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Selected Pin Store Info Card */}
              {activePinStore && (
                <div className="p-3.5 rounded-2xl border border-rose-200/80 bg-rose-50/40">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold text-stone-900 font-display">
                        {activePinStore.name}
                      </span>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        {activePinStore.address}
                      </p>
                    </div>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-md font-bold shrink-0 ${
                        activePinStore.isOpen
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-stone-200 text-stone-600'
                      }`}
                    >
                      {activePinStore.isOpen ? 'Đang mở cửa' : 'Tạm đóng'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-200/60 text-[11px] text-stone-600">
                    <span>Cách bạn: <strong className="text-emerald-700">{activePinStore.distance}</strong></span>
                    <span>{activePinStore.openHours}</span>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleDirections(activePinStore)}
                      className="flex-1 py-2 rounded-xl border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-white flex items-center justify-center gap-1.5"
                    >
                      <Navigation2 className="w-3.5 h-3.5 text-rose-500" />
                      <span>Chỉ đường</span>
                    </button>

                    {activePinStore.isOpen ? (
                      <button
                        onClick={() => {
                          onSelectStore(activePinStore);
                          onClose();
                        }}
                        className="flex-1 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 shadow-sm flex items-center justify-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Chọn cửa hàng này</span>
                      </button>
                    ) : (
                      <div className="flex-1 py-2 rounded-xl bg-stone-200 text-stone-400 text-xs font-medium text-center">
                        Cửa hàng đóng cửa
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
