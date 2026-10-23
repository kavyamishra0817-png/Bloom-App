import React, { useState } from 'react';
import { Store } from '../types';
import { Search, MapPin, Phone, Clock, Navigation2, Check, List, Map } from 'lucide-react';
import { IconStore } from '../components/BrandIcons';

interface StoresViewProps {
  stores: Store[];
  selectedStore: Store | null;
  onSelectStore: (store: Store) => void;
  onShowToast: (message: string) => void;
}

export const StoresView: React.FC<StoresViewProps> = ({
  stores,
  selectedStore,
  onSelectStore,
  onShowToast
}) => {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [activePinStore, setActivePinStore] = useState<Store | null>(selectedStore || stores[0]);

  const districts = ['all', 'Lộc Thọ', 'Tân Lập', 'Phương Sài', 'Vĩnh Nguyên', 'Vĩnh Phước'];

  const filteredStores = stores.filter((s) => {
    const matchesDistrict = selectedDistrict === 'all' || s.district === selectedDistrict;
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDistrict && matchesSearch;
  });

  const handleDirections = (store: Store) => {
    onShowToast(`Đang mở chỉ đường đến ${store.name} (${store.distance}). Thời gian di chuyển ~6 phút.`);
  };

  return (
    <div className="flex-1 flex flex-col pb-24 select-none animate-fade-in">
      {/* Top Header & Search */}
      <div className="px-4 py-3 bg-white border-b border-rose-100/70 space-y-2.5 shrink-0 shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconStore className="w-5 h-5" active />
            <div>
              <h2 className="text-sm font-bold text-stone-900 font-display">
                Hệ thống Bloom Nha Trang
              </h2>
              <p className="text-[10px] text-stone-500">5 chi nhánh ven biển & trung tâm TP. Nha Trang</p>
            </div>
          </div>

          {/* List/Map toggle */}
          <div className="flex items-center p-1 bg-stone-100 rounded-xl border border-stone-200/60">
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                viewMode === 'list'
                  ? 'bg-white text-emerald-800 shadow-2xs'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
              title="Danh sách"
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
              title="Bản đồ"
            >
              <Map className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Tìm theo đường Trần Phú, Biệt Thự, Vinpearl..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-stone-100/80 pl-9 pr-4 py-2 rounded-xl text-xs text-stone-800 placeholder-stone-400 focus:bg-white focus:ring-2 focus:ring-rose-500/20 focus:outline-none border border-transparent focus:border-rose-200 transition-all"
          />
        </div>

        {/* District Filter Chips */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pt-0.5">
          {districts.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDistrict(d)}
              className={`px-3 py-1 rounded-xl text-xs font-medium whitespace-nowrap shrink-0 transition-all ${
                selectedDistrict === d
                  ? 'bg-gradient-to-r from-emerald-700 to-teal-800 text-white font-bold shadow-2xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {d === 'all' ? 'Tất cả khu vực' : d}
            </button>
          ))}
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-4">
        {viewMode === 'list' ? (
          <div className="space-y-3">
            {filteredStores.length === 0 ? (
              <div className="text-center py-16 text-stone-400 text-xs">
                Không tìm thấy chi nhánh nào tại khu vực đã chọn.
              </div>
            ) : (
              filteredStores.map((store) => {
                const isSelected = selectedStore?.id === store.id;

                return (
                  <div
                    key={store.id}
                    className={`rounded-2xl border p-3 transition-all ${
                      !store.isOpen
                        ? 'bg-stone-50/70 border-stone-200'
                        : isSelected
                        ? 'border-emerald-500 bg-emerald-50/40 shadow-xs ring-1 ring-emerald-300'
                        : 'border-rose-100/70 bg-white hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-stone-100 shrink-0 relative border border-stone-200/50">
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

                        {/* Actions */}
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
                                onShowToast(`Đã chọn chi nhánh: ${store.name}`);
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
              })
            )}
          </div>
        ) : (
          /* Nha Trang Coastal Map View */
          <div className="space-y-3">
            <div className="relative w-full h-72 rounded-3xl overflow-hidden bg-gradient-to-b from-teal-950 via-emerald-950 to-stone-950 border border-emerald-800 shadow-inner flex items-center justify-center">
              {/* Nha Trang Bay & Coastal Road SVG Texture */}
              <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
                {/* Sea waves Vịnh Nha Trang on right side */}
                <path d="M240 0 Q 200 100, 220 200 T 260 300 L 400 300 L 400 0 Z" fill="#047857" opacity="0.4" />
                {/* Coastal Road: Đường Trần Phú */}
                <path d="M220 0 Q 180 100, 200 200 T 240 300" fill="none" stroke="#F472B6" strokeWidth="6" />
                {/* Sông Cái & Cầu Trần Phú */}
                <path d="M0 60 Q 120 70, 200 65" fill="none" stroke="#6ee7b7" strokeWidth="5" />
                {/* Đảo Hòn Tre (Vinpearl) */}
                <ellipse cx="320" cy="220" rx="45" ry="30" fill="#065f46" stroke="#34d399" strokeWidth="1.5" />
                <path d="M220 180 L 290 215" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 3" />
              </svg>

              <div className="absolute top-3 left-3 text-[10px] font-bold text-emerald-200 tracking-wider bg-black/50 px-2 py-0.5 rounded backdrop-blur-xs">
                VỊNH BIỂN NHA TRANG (KHÁNH HÒA)
              </div>
              <div className="absolute top-3 right-3 text-[9px] text-pink-300 font-semibold bg-black/50 px-2 py-0.5 rounded backdrop-blur-xs">
                Đường Trần Phú
              </div>

              {/* Nha Trang Store Pins */}
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
                            ? 'bg-rose-500 text-white ring-4 ring-rose-400/50 animate-bounce'
                            : 'bg-emerald-600 text-white ring-2 ring-white/90'
                        }`}
                      >
                        <MapPin className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] font-bold text-white bg-black/75 px-1.5 py-0.2 rounded-full whitespace-nowrap mt-0.5 shadow-xs">
                        {store.name.replace('Bloom ', '').split('(')[0]}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Selected Card below map */}
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
                  <span>Khoảng cách: <strong className="text-emerald-700">{activePinStore.distance}</strong></span>
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
                        onShowToast(`Đã chọn chi nhánh: ${activePinStore.name}`);
                      }}
                      className="flex-1 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Chọn quán này</span>
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
  );
};
