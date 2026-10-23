import React from 'react';
import { X, SlidersHorizontal, RotateCcw, Check } from 'lucide-react';
import { CategoryType } from '../types';

export interface FilterState {
  category: CategoryType;
  priceRange: 'all' | 'under50' | '50to70' | '70to100' | 'above100';
  selectedTag: string | null;
  sortBy: 'popular' | 'priceAsc' | 'priceDesc' | 'newest';
}

interface SmartFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onChangeFilters: (filters: FilterState) => void;
  onResetFilters: () => void;
}

export const SmartFilterModal: React.FC<SmartFilterModalProps> = ({
  isOpen,
  onClose,
  filters,
  onChangeFilters,
  onResetFilters
}) => {
  if (!isOpen) return null;

  const tasteTags = [
    'Tất cả vị',
    'Best Seller',
    'Món mới',
    'Ít ngọt',
    'Thơm hoa',
    'Béo ngậy',
    'Nướng nóng',
    'Quà tặng'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs animate-fade-in select-none">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-[400px] bg-white rounded-t-3xl shadow-2xl p-5 z-10 max-h-[85vh] flex flex-col">
        {/* Grab Handle */}
        <div className="w-12 h-1.5 bg-stone-200 rounded-full mx-auto mb-3 shrink-0" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100 shrink-0">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-rose-600" />
            <h3 className="text-base font-bold text-stone-900 font-display">
              Bộ lọc món thông minh
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 text-stone-500 hover:text-stone-800 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar py-3 space-y-4">
          {/* 1. Sắp xếp theo */}
          <div>
            <span className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-2">
              Sắp xếp theo
            </span>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'popular', label: 'Bán chạy nhất' },
                { id: 'newest', label: 'Món mới ra mắt' },
                { id: 'priceAsc', label: 'Giá: Thấp đến cao' },
                { id: 'priceDesc', label: 'Giá: Cao đến thấp' }
              ].map((s) => {
                const isSelected = filters.sortBy === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() =>
                      onChangeFilters({ ...filters, sortBy: s.id as FilterState['sortBy'] })
                    }
                    className={`py-2 px-3 rounded-xl text-xs font-medium border text-left flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'border-rose-400 bg-rose-50 text-rose-800 font-semibold shadow-2xs'
                        : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <span>{s.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-rose-600 stroke-[3]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Khoảng giá */}
          <div>
            <span className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-2">
              Khoảng giá (VND)
            </span>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'all', label: 'Tất cả mức giá' },
                { id: 'under50', label: 'Dưới 50.000đ' },
                { id: '50to70', label: '50.000đ - 70.000đ' },
                { id: '70to100', label: '70.000đ - 100.000đ' },
                { id: 'above100', label: 'Trên 100.000đ' }
              ].map((p) => {
                const isSelected = filters.priceRange === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() =>
                      onChangeFilters({ ...filters, priceRange: p.id as FilterState['priceRange'] })
                    }
                    className={`py-2 px-3 rounded-xl text-xs font-medium border text-left flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'border-rose-400 bg-rose-50 text-rose-800 font-semibold shadow-2xs'
                        : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <span>{p.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-rose-600 stroke-[3]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Gu thưởng thức & Đặc trưng */}
          <div>
            <span className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-2">
              Gu thưởng thức & Đặc trưng
            </span>
            <div className="flex flex-wrap gap-1.5">
              {tasteTags.map((t) => {
                const isSelected =
                  t === 'Tất cả vị'
                    ? filters.selectedTag === null
                    : filters.selectedTag === t;
                return (
                  <button
                    key={t}
                    onClick={() =>
                      onChangeFilters({
                        ...filters,
                        selectedTag: t === 'Tất cả vị' ? null : t
                      })
                    }
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-rose-600 text-white shadow-2xs font-semibold'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-stone-100 flex gap-2 shrink-0">
          <button
            onClick={onResetFilters}
            className="flex-1 py-3 rounded-xl border border-stone-200 text-stone-700 text-xs font-semibold hover:bg-stone-50 flex items-center justify-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Thiết lập lại</span>
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 shadow-sm transition-colors"
          >
            Áp dụng bộ lọc
          </button>
        </div>
      </div>
    </div>
  );
};
