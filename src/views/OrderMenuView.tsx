import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, MapPin, Store as StoreIcon, ShoppingBag, ArrowRight, X } from 'lucide-react';
import { Address, CategoryType, Product, ReceiveMode, Store } from '../types';
import { ProductCard } from '../components/ProductCard';
import { FilterState } from '../components/SmartFilterModal';
import { formatVND } from '../utils/formatters';

interface OrderMenuViewProps {
  products: Product[];
  receiveMode: ReceiveMode;
  selectedAddress: Address | null;
  selectedStore: Store | null;
  onOpenReceiveModeSheet: () => void;
  onOpenProductDetail: (product: Product) => void;
  onQuickAdd: (product: Product, e: React.MouseEvent) => void;
  cartCount: number;
  cartSubtotal: number;
  onOpenCart: () => void;
  onOpenSmartFilter: () => void;
  filters: FilterState;
  onResetFilters: () => void;
  selectedCategoryTab: CategoryType;
  onSelectCategoryTab: (cat: CategoryType) => void;
}

export const OrderMenuView: React.FC<OrderMenuViewProps> = ({
  products,
  receiveMode,
  selectedAddress,
  selectedStore,
  onOpenReceiveModeSheet,
  onOpenProductDetail,
  onQuickAdd,
  cartCount,
  cartSubtotal,
  onOpenCart,
  onOpenSmartFilter,
  filters,
  onResetFilters,
  selectedCategoryTab,
  onSelectCategoryTab
}) => {
  const [searchKeyword, setSearchKeyword] = useState('');

  // Category definitions
  const categories: { id: CategoryType; label: string }[] = [
    { id: 'all', label: 'Tất cả' },
    { id: 'coffee', label: 'Cà phê' },
    { id: 'tea', label: 'Trà hoa quả' },
    { id: 'cake', label: 'Bánh tươi' },
    { id: 'gift', label: 'Hộp quà & Combo' }
  ];

  // Filtering and sorting logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Tab filter
        if (selectedCategoryTab !== 'all' && p.category !== selectedCategoryTab) {
          return false;
        }

        // Search Keyword
        if (
          searchKeyword.trim() &&
          !p.name.toLowerCase().includes(searchKeyword.toLowerCase()) &&
          !p.description.toLowerCase().includes(searchKeyword.toLowerCase()) &&
          !p.tags.some((t) => t.toLowerCase().includes(searchKeyword.toLowerCase()))
        ) {
          return false;
        }

        // Price range filter
        if (filters.priceRange === 'under50' && p.price >= 50000) return false;
        if (filters.priceRange === '50to70' && (p.price < 50000 || p.price > 70000)) return false;
        if (filters.priceRange === '70to100' && (p.price < 70000 || p.price > 100000)) return false;
        if (filters.priceRange === 'above100' && p.price <= 100000) return false;

        // Tag filter
        if (filters.selectedTag) {
          const hasTag =
            p.tags.includes(filters.selectedTag) ||
            (filters.selectedTag === 'Best Seller' && p.isBestSeller) ||
            (filters.selectedTag === 'Món mới' && p.isNew);
          if (!hasTag) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'popular') {
          return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
        }
        if (filters.sortBy === 'newest') {
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        }
        if (filters.sortBy === 'priceAsc') {
          return a.price - b.price;
        }
        if (filters.sortBy === 'priceDesc') {
          return b.price - a.price;
        }
        return 0;
      });
  }, [products, selectedCategoryTab, searchKeyword, filters]);

  const hasActiveCustomFilters =
    filters.priceRange !== 'all' || filters.selectedTag !== null || filters.sortBy !== 'popular';

  return (
    <div className="flex-1 flex flex-col pb-28 select-none">
      {/* 1. Header Location & Receive Mode Strip */}
      <div className="px-4 py-2 bg-white border-b border-stone-100 flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-stone-100 flex items-center justify-center shrink-0 text-stone-700">
            {receiveMode === 'delivery' ? (
              <MapPin className="w-4 h-4 text-rose-500" />
            ) : (
              <StoreIcon className="w-4 h-4 text-emerald-600" />
            )}
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
              {receiveMode === 'delivery' ? 'Giao đến:' : 'Lấy tại:'}
            </span>
            <p className="text-xs font-bold text-stone-900 truncate">
              {receiveMode === 'delivery'
                ? selectedAddress?.fullAddress || 'Chọn địa chỉ'
                : selectedStore?.name || 'Chọn chi nhánh'}
            </p>
          </div>
        </div>

        <button
          onClick={onOpenReceiveModeSheet}
          className="text-xs font-bold text-rose-600 hover:text-rose-700 px-2 py-1 rounded-lg hover:bg-rose-50 shrink-0 transition-colors"
        >
          Thay đổi
        </button>
      </div>

      {/* 2. Search & Smart Filter Bar */}
      <div className="px-4 py-2.5 bg-white border-b border-stone-100 flex items-center gap-2 shrink-0">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Tìm theo tên món, hương vị..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="w-full bg-stone-100 pl-9 pr-8 py-2 rounded-xl text-xs text-stone-800 placeholder-stone-400 focus:bg-white focus:ring-2 focus:ring-rose-500/20 focus:outline-none transition-all"
          />
          {searchKeyword && (
            <button
              onClick={() => setSearchKeyword('')}
              className="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Trigger Button */}
        <button
          onClick={onOpenSmartFilter}
          className={`h-9 px-3 rounded-xl border flex items-center gap-1.5 text-xs font-semibold transition-colors shrink-0 ${
            hasActiveCustomFilters
              ? 'bg-rose-50 border-rose-300 text-rose-800'
              : 'border-stone-200 text-stone-600 hover:bg-stone-50'
          }`}
          title="Bộ lọc món"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Lọc</span>
          {hasActiveCustomFilters && (
            <span className="w-2 h-2 rounded-full bg-rose-600"></span>
          )}
        </button>
      </div>

      {/* Active Filter Chips bar (if filtered) */}
      {hasActiveCustomFilters && (
        <div className="px-4 py-1.5 bg-rose-50/50 border-b border-rose-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-[10px] text-stone-500">Đang lọc:</span>
            {filters.selectedTag && (
              <span className="text-[10px] bg-white border border-rose-200 text-rose-700 px-2 py-0.5 rounded-full font-semibold">
                {filters.selectedTag}
              </span>
            )}
            {filters.priceRange !== 'all' && (
              <span className="text-[10px] bg-white border border-rose-200 text-rose-700 px-2 py-0.5 rounded-full font-semibold">
                Giá {filters.priceRange}
              </span>
            )}
            {filters.sortBy !== 'popular' && (
              <span className="text-[10px] bg-white border border-rose-200 text-rose-700 px-2 py-0.5 rounded-full font-semibold">
                Sắp xếp
              </span>
            )}
          </div>
          <button
            onClick={onResetFilters}
            className="text-[10px] text-stone-400 hover:text-stone-700 underline shrink-0 ml-2"
          >
            Xóa lọc
          </button>
        </div>
      )}

      {/* 3. Horizontal Category Tabs */}
      <div className="bg-white border-b border-stone-100 px-4 py-2 shrink-0">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategoryTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategoryTab(cat.id)}
                className={`py-2 px-3.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all ${
                  isSelected
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Products Grid */}
      <div className="flex-1 p-4 overflow-y-auto no-scrollbar">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-stone-400 space-y-2">
            <Search className="w-10 h-10 mx-auto stroke-[1.2] text-stone-300" />
            <p className="text-xs font-semibold">Không tìm thấy món nào phù hợp</p>
            <p className="text-[11px] text-stone-400">
              Hãy thử thay đổi từ khóa hoặc thiết lập lại bộ lọc.
            </p>
            <button
              onClick={() => {
                setSearchKeyword('');
                onResetFilters();
                onSelectCategoryTab('all');
              }}
              className="py-1.5 px-3 bg-stone-100 text-stone-700 text-xs font-semibold rounded-lg hover:bg-stone-200"
            >
              Xem tất cả menu
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onOpenDetail={onOpenProductDetail}
                onQuickAdd={onQuickAdd}
              />
            ))}
          </div>
        )}
      </div>

      {/* 5. Sticky Mini-Cart Bar (placed right above bottom navigation) */}
      {cartCount > 0 && (
        <div className="fixed bottom-16 left-0 right-0 max-w-[400px] mx-auto px-4 z-20 pointer-events-auto">
          <div
            onClick={onOpenCart}
            className="w-full bg-stone-900 text-white rounded-2xl p-3 shadow-xl flex items-center justify-between cursor-pointer hover:bg-stone-800 transition-all active:scale-[0.98] border border-stone-700/50"
          >
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-white font-extrabold text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              </div>
              <div>
                <p className="text-xs font-bold font-display text-white">
                  {cartCount} món trong giỏ
                </p>
                <p className="text-[10px] text-stone-400">
                  {receiveMode === 'delivery' ? 'Giao tận nơi' : 'Đến lấy tại quán'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold text-rose-300 font-display">
                {formatVND(cartSubtotal)}
              </span>
              <div className="py-1 px-2.5 bg-white text-stone-900 text-xs font-bold rounded-lg flex items-center gap-1 shadow-2xs">
                <span>Xem giỏ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
