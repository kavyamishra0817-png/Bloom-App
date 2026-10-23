import React from 'react';
import { Award, ChevronRight, Sparkles, Tag } from 'lucide-react';
import { MemberProfile, Product, PromoBanner, ReceiveMode } from '../types';
import { ProductCard } from '../components/ProductCard';
import { IconDelivery, IconPickup, IconCoffeeBadge, IconTeaBadge, IconCakeBadge, IconGiftBadge } from '../components/BrandIcons';
import { formatVND } from '../utils/formatters';

interface HomeViewProps {
  profile: MemberProfile;
  banners: PromoBanner[];
  products: Product[];
  receiveMode: ReceiveMode;
  onChangeReceiveMode: (mode: ReceiveMode) => void;
  onOpenReceiveModeSheet: () => void;
  onOpenProductDetail: (product: Product) => void;
  onQuickAdd: (product: Product, e: React.MouseEvent) => void;
  onOpenBannerDetail: (banner: PromoBanner) => void;
  onOpenLoyaltyTiers: () => void;
  onOpenOrderMenu: (category?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  profile,
  banners,
  products,
  receiveMode,
  onChangeReceiveMode,
  onOpenReceiveModeSheet,
  onOpenProductDetail,
  onQuickAdd,
  onOpenBannerDetail,
  onOpenLoyaltyTiers,
  onOpenOrderMenu
}) => {
  const newProducts = products.filter((p) => p.isNew);
  const bestSellers = products.filter((p) => p.isBestSeller);
  const promoProducts = products.filter((p) => p.originalPrice);

  return (
    <div className="space-y-4 pb-24 animate-fade-in select-none">
      {/* 1. Small Member Card Banner with Logo's Watercolor Aura */}
      <div className="px-4 pt-1">
        <div className="p-3.5 rounded-3xl bg-gradient-to-r from-stone-900 via-emerald-950 to-rose-950 text-white shadow-md flex items-center justify-between border border-rose-900/40 relative overflow-hidden">
          {/* Subtle logo color glow behind */}
          <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-rose-500/20 blur-xl pointer-events-none" />
          <div className="absolute -left-4 -bottom-4 w-24 h-24 rounded-full bg-emerald-500/20 blur-xl pointer-events-none" />

          <div className="flex items-center gap-3 relative z-10">
            <div className="w-11 h-11 rounded-full overflow-hidden bg-rose-100/20 p-0.5 border border-rose-300/40 shrink-0 shadow-xs">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white font-display">
                  {profile.name}
                </span>
                <span className="text-[9px] bg-gradient-to-r from-rose-500 to-pink-500 text-white px-2 py-0.2 rounded-full font-bold shadow-2xs">
                  {profile.tier}
                </span>
              </div>
              <p className="text-[11px] text-emerald-300 mt-0.5 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>{profile.spendablePoints} BloomPoints tích lũy</span>
              </p>
            </div>
          </div>

          <button
            onClick={onOpenLoyaltyTiers}
            className="py-1 px-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-rose-100 hover:text-white text-[11px] font-bold flex items-center gap-1 transition-colors backdrop-blur-xs border border-white/10 relative z-10"
          >
            <span>Quyền lợi</span>
            <ChevronRight className="w-3.5 h-3.5 text-rose-300" />
          </button>
        </div>
      </div>

      {/* 2. Primary Receive Mode Action Buttons: Giao hàng & Đến lấy */}
      <div className="px-4">
        <div className="grid grid-cols-2 gap-2.5">
          {/* Giao hàng */}
          <button
            onClick={() => {
              onChangeReceiveMode('delivery');
              onOpenReceiveModeSheet();
            }}
            className={`p-3 rounded-2xl border transition-all text-left flex items-center gap-3 shadow-xs active:scale-[0.98] ${
              receiveMode === 'delivery'
                ? 'border-rose-400 bg-rose-50/70 ring-2 ring-rose-300/50'
                : 'border-rose-100/80 bg-white hover:border-rose-200'
            }`}
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-pink-50 via-rose-100 to-pink-100 border border-rose-200 flex items-center justify-center shrink-0 shadow-2xs">
              <IconDelivery className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-stone-900 font-display block leading-tight">
                Giao hàng
              </span>
              <span className="text-[10px] text-rose-700 font-medium block mt-0.5 truncate">
                Tận nơi Nha Trang ~25p
              </span>
            </div>
          </button>

          {/* Đến lấy */}
          <button
            onClick={() => {
              onChangeReceiveMode('pickup');
              onOpenReceiveModeSheet();
            }}
            className={`p-3 rounded-2xl border transition-all text-left flex items-center gap-3 shadow-xs active:scale-[0.98] ${
              receiveMode === 'pickup'
                ? 'border-emerald-500 bg-emerald-50/70 ring-2 ring-emerald-300/50'
                : 'border-emerald-100/80 bg-white hover:border-emerald-200'
            }`}
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-50 via-teal-50 to-green-100 border border-emerald-200 flex items-center justify-center shrink-0 shadow-2xs">
              <IconPickup className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-stone-900 font-display block leading-tight">
                Đến lấy
              </span>
              <span className="text-[10px] text-emerald-800 font-medium block mt-0.5 truncate">
                5 chi nhánh gần bạn
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* 3. Swipeable / Horizontal Promo Banners */}
      <div className="space-y-2">
        <div className="px-4 flex items-center justify-between">
          <span className="text-xs font-bold text-stone-900 font-display tracking-tight flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>Ưu đãi & Sự kiện mới tại Nha Trang</span>
          </span>
          <span className="text-[10px] text-stone-400">Vuốt ngang</span>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-1 snap-x">
          {banners.map((b) => (
            <div
              key={b.id}
              onClick={() => onOpenBannerDetail(b)}
              className={`snap-center shrink-0 w-[86%] sm:w-[320px] p-4 rounded-3xl bg-gradient-to-tr ${b.accentColor} text-white shadow-sm cursor-pointer hover:opacity-95 transition-all relative overflow-hidden border border-white/15`}
            >
              <span className="text-[9px] uppercase font-bold tracking-wider bg-white/20 px-2 py-0.5 rounded-full inline-block backdrop-blur-xs">
                {b.tag}
              </span>
              <h4 className="text-sm font-bold font-display mt-2 leading-snug line-clamp-1">
                {b.title}
              </h4>
              <p className="text-[11px] text-white/90 mt-0.5 line-clamp-1">
                {b.subtitle}
              </p>
              <div className="mt-3 flex items-center justify-between text-[10px] font-bold text-rose-100">
                <span>Xem chi tiết ưu đãi</span>
                <ChevronRight className="w-3.5 h-3.5 text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Quick Category Shortcuts with Custom Colorized Linework Badges */}
      <div className="px-4">
        <div className="grid grid-cols-4 gap-2 text-center">
          {[
            { id: 'coffee', label: 'Cà phê', icon: <IconCoffeeBadge className="w-8 h-8" /> },
            { id: 'tea', label: 'Trà hoa', icon: <IconTeaBadge className="w-8 h-8" /> },
            { id: 'cake', label: 'Bánh tươi', icon: <IconCakeBadge className="w-8 h-8" /> },
            { id: 'gift', label: 'Hộp quà', icon: <IconGiftBadge className="w-8 h-8" /> }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => onOpenOrderMenu(cat.id)}
              className="p-2.5 rounded-2xl bg-white border border-rose-100 hover:border-rose-300 transition-all shadow-2xs flex flex-col items-center group active:scale-95"
            >
              <div className="mb-1 group-hover:scale-110 transition-transform">{cat.icon}</div>
              <span className="text-[11px] font-bold text-stone-700 group-hover:text-rose-600 transition-colors">
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 5. Ưu đãi hôm nay (Deals of the day) */}
      {promoProducts.length > 0 && (
        <div className="space-y-2.5">
          <div className="px-4 flex items-center justify-between">
            <span className="text-xs font-bold text-stone-900 font-display flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-rose-600" />
              <span>Ưu đãi hôm nay</span>
            </span>
            <button
              onClick={() => onOpenOrderMenu()}
              className="text-[11px] font-bold text-rose-600 hover:text-rose-700"
            >
              Xem tất cả
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2.5 px-4">
            {promoProducts.slice(0, 2).map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onOpenDetail={onOpenProductDetail}
                onQuickAdd={onQuickAdd}
              />
            ))}
          </div>
        </div>
      )}

      {/* 6. Sản phẩm mới (New Arrivals) */}
      <div className="space-y-2.5">
        <div className="px-4 flex items-center justify-between">
          <span className="text-xs font-bold text-stone-900 font-display">
            Sản phẩm mới ra mắt
          </span>
          <button
            onClick={() => onOpenOrderMenu()}
            className="text-[11px] font-bold text-rose-600 hover:text-rose-700"
          >
            Xem menu
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5 px-4">
          {newProducts.slice(0, 4).map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onOpenDetail={onOpenProductDetail}
              onQuickAdd={onQuickAdd}
            />
          ))}
        </div>
      </div>

      {/* 7. Được yêu thích (Best Sellers) */}
      <div className="space-y-2.5">
        <div className="px-4 flex items-center justify-between">
          <span className="text-xs font-bold text-stone-900 font-display">
            Món được yêu thích nhất
          </span>
          <button
            onClick={() => onOpenOrderMenu()}
            className="text-[11px] font-bold text-rose-600 hover:text-rose-700"
          >
            Tất cả
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5 px-4">
          {bestSellers.slice(0, 4).map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onOpenDetail={onOpenProductDetail}
              onQuickAdd={onQuickAdd}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
