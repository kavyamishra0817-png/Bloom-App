import React from 'react';
import { Plus, Star } from 'lucide-react';
import { Product } from '../types';
import { formatVND } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
  onOpenDetail: (product: Product) => void;
  onQuickAdd: (product: Product, e: React.MouseEvent) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetail,
  onQuickAdd
}) => {
  return (
    <div
      onClick={() => onOpenDetail(product)}
      className="group bg-white rounded-2xl border border-stone-200/80 p-2.5 flex flex-col justify-between hover:shadow-md hover:border-rose-200 transition-all cursor-pointer relative overflow-hidden"
    >
      {/* Product Image & Badges */}
      <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-stone-100 mb-2">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
            product.isOutOfStock ? 'grayscale opacity-60' : ''
          }`}
          onError={(e) => {
            // Elegant botanical SVG fallback
            (e.target as HTMLElement).style.display = 'none';
          }}
        />

        {/* Fallback flower gradient container */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-rose-100 via-pink-50 to-emerald-50 flex items-center justify-center text-rose-300">
          <svg className="w-12 h-12 opacity-40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C13.5 6 16 8.5 20 10C16 11.5 13.5 14 12 18C10.5 14 8 11.5 4 10C8 8.5 10.5 6 12 2Z" />
          </svg>
        </div>

        {/* Status Badges */}
        <div className="absolute top-1.5 left-1.5 flex flex-col gap-1 items-start">
          {product.isOutOfStock ? (
            <span className="px-1.5 py-0.5 rounded-md bg-stone-900/90 text-white text-[9px] font-bold backdrop-blur-xs">
              Hết hàng
            </span>
          ) : (
            <>
              {product.isBestSeller && (
                <span className="px-1.5 py-0.5 rounded-md bg-rose-600 text-white text-[9px] font-bold shadow-2xs">
                  Bán chạy
                </span>
              )}
              {product.isNew && (
                <span className="px-1.5 py-0.5 rounded-md bg-emerald-600 text-white text-[9px] font-bold shadow-2xs">
                  Món mới
                </span>
              )}
            </>
          )}
        </div>

        {/* Rating preview */}
        <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded-md bg-black/60 text-white text-[9px] font-medium backdrop-blur-xs flex items-center gap-0.5">
          <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
          <span>{product.rating}</span>
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h4 className="text-xs font-bold text-stone-900 group-hover:text-rose-600 transition-colors line-clamp-1 font-display">
            {product.name}
          </h4>
          <p className="text-[11px] text-stone-500 line-clamp-2 mt-0.5 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Add Action */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100">
          <div className="flex items-baseline gap-1">
            <span className="text-xs font-bold text-rose-700">
              {formatVND(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] text-stone-400 line-through">
                {formatVND(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Quick Add Button */}
          <button
            onClick={(e) => {
              if (product.isOutOfStock) return;
              onQuickAdd(product, e);
            }}
            disabled={product.isOutOfStock}
            title={product.isOutOfStock ? 'Món đã hết' : 'Thêm nhanh'}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
              product.isOutOfStock
                ? 'bg-stone-100 text-stone-300 cursor-not-allowed'
                : 'bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white active:scale-90 shadow-2xs'
            }`}
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};
