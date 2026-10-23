import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Star, AlertCircle, Check } from 'lucide-react';
import { CartItem, Product, ProductOptionItem, SelectedOption } from '../types';
import { formatVND } from '../utils/formatters';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart
}) => {
  const [selectedSingleOptions, setSelectedSingleOptions] = useState<Record<string, ProductOptionItem>>({});
  const [selectedMultipleOptions, setSelectedMultipleOptions] = useState<Record<string, ProductOptionItem[]>>({});
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  // Initialize default options when product changes
  useEffect(() => {
    if (!product) return;
    setQuantity(1);
    setNote('');
    setValidationError(null);

    const initialSingle: Record<string, ProductOptionItem> = {};
    const initialMultiple: Record<string, ProductOptionItem[]> = {};

    product.optionGroups.forEach((group) => {
      if (group.type === 'single') {
        const defaultItem = group.items.find((i) => i.isDefault) || group.items[0];
        if (defaultItem) {
          initialSingle[group.id] = defaultItem;
        }
      } else {
        initialMultiple[group.id] = [];
      }
    });

    setSelectedSingleOptions(initialSingle);
    setSelectedMultipleOptions(initialMultiple);
  }, [product]);

  if (!isOpen || !product) return null;

  // Calculate Unit Price
  let optionsSurcharge = 0;
  Object.values(selectedSingleOptions).forEach((item) => {
    optionsSurcharge += item.price;
  });
  Object.values(selectedMultipleOptions).forEach((itemsList) => {
    itemsList.forEach((item) => {
      optionsSurcharge += item.price;
    });
  });

  const unitPrice = product.price + optionsSurcharge;
  const totalPrice = unitPrice * quantity;

  // Validate required options
  const isFormValid = product.optionGroups.every((group) => {
    if (!group.required) return true;
    if (group.type === 'single') {
      return Boolean(selectedSingleOptions[group.id]);
    }
    return (selectedMultipleOptions[group.id]?.length || 0) > 0;
  });

  const handleToggleMultiple = (groupId: string, item: ProductOptionItem) => {
    setSelectedMultipleOptions((prev) => {
      const current = prev[groupId] || [];
      const exists = current.some((i) => i.id === item.id);
      if (exists) {
        return {
          ...prev,
          [groupId]: current.filter((i) => i.id !== item.id)
        };
      } else {
        return {
          ...prev,
          [groupId]: [...current, item]
        };
      }
    });
  };

  const handleConfirmAddToCart = () => {
    if (!isFormValid) {
      setValidationError('Vui lòng chọn đầy đủ các tùy chọn bắt buộc.');
      return;
    }

    const flatSelectedOptions: SelectedOption[] = [];

    product.optionGroups.forEach((group) => {
      if (group.type === 'single') {
        const chosen = selectedSingleOptions[group.id];
        if (chosen) {
          flatSelectedOptions.push({
            groupId: group.id,
            groupTitle: group.title,
            optionId: chosen.id,
            optionName: chosen.name,
            price: chosen.price
          });
        }
      } else {
        const chosenList = selectedMultipleOptions[group.id] || [];
        chosenList.forEach((chosen) => {
          flatSelectedOptions.push({
            groupId: group.id,
            groupTitle: group.title,
            optionId: chosen.id,
            optionName: chosen.name,
            price: chosen.price
          });
        });
      }
    });

    const cartItem: CartItem = {
      id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      product,
      selectedOptions: flatSelectedOptions,
      quantity,
      note: note.trim(),
      unitPrice,
      totalPrice
    };

    onAddToCart(cartItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-[400px] bg-white rounded-t-3xl shadow-2xl z-10 max-h-[92vh] flex flex-col overflow-hidden">
        {/* Grab Handle */}
        <div className="w-12 h-1.5 bg-stone-200 rounded-full mx-auto my-2 shrink-0" />

        {/* Close Button Floating */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm text-stone-700 hover:text-stone-900 shadow-sm flex items-center justify-center"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Scrollable Product Details */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {/* Large Hero Image */}
          <div className="relative w-full aspect-16/10 bg-stone-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-rose-100 via-pink-50 to-emerald-50 flex items-center justify-center text-rose-300">
              <span className="font-display font-bold text-lg text-rose-400">Bloom Cake & Coffee</span>
            </div>
          </div>

          {/* Core Info */}
          <div className="p-4 border-b border-stone-100">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                  {product.categoryName}
                </span>
                <h2 className="text-base font-bold text-stone-900 font-display mt-1.5 leading-snug">
                  {product.name}
                </h2>
              </div>
              <div className="text-right shrink-0">
                <p className="text-base font-bold text-rose-600 font-display">
                  {formatVND(product.price)}
                </p>
                {product.originalPrice && (
                  <p className="text-[11px] text-stone-400 line-through">
                    {formatVND(product.originalPrice)}
                  </p>
                )}
              </div>
            </div>

            <p className="text-xs text-stone-600 mt-2 leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center gap-3 mt-3 text-xs text-stone-500">
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-semibold text-stone-700">{product.rating}</span>
                <span>({product.reviewsCount} đánh giá)</span>
              </div>
              {product.calories && (
                <>
                  <span>·</span>
                  <span>{product.calories} kcal</span>
                </>
              )}
            </div>
          </div>

          {/* Customization Options */}
          <div className="p-4 space-y-4">
            {product.optionGroups.map((group) => {
              const isRequired = group.required;

              return (
                <div key={group.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-800 font-display">
                      {group.title}
                    </span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold ${
                        isRequired
                          ? 'bg-rose-100 text-rose-700'
                          : 'bg-stone-100 text-stone-500'
                      }`}
                    >
                      {isRequired ? 'Bắt buộc' : 'Tùy chọn'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-1.5">
                    {group.items.map((item) => {
                      const isSelected =
                        group.type === 'single'
                          ? selectedSingleOptions[group.id]?.id === item.id
                          : (selectedMultipleOptions[group.id] || []).some(
                              (i) => i.id === item.id
                            );

                      return (
                        <div
                          key={item.id}
                          onClick={() => {
                            if (group.type === 'single') {
                              setSelectedSingleOptions((prev) => ({
                                ...prev,
                                [group.id]: item
                              }));
                            } else {
                              handleToggleMultiple(group.id, item);
                            }
                          }}
                          className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                            isSelected
                              ? 'border-rose-400 bg-rose-50/50 shadow-2xs'
                              : 'border-stone-200/80 bg-white hover:bg-stone-50'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-4 h-4 rounded-full flex items-center justify-center ${
                                group.type === 'single' ? 'rounded-full' : 'rounded-md'
                              } ${
                                isSelected
                                  ? 'bg-rose-600 text-white'
                                  : 'border border-stone-300'
                              }`}
                            >
                              {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                            </div>
                            <span className="text-xs text-stone-800 font-medium">
                              {item.name}
                            </span>
                          </div>

                          {item.price > 0 && (
                            <span className="text-xs font-semibold text-rose-600">
                              +{formatVND(item.price)}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Note input */}
            <div className="space-y-1 pt-1">
              <label className="text-xs font-bold text-stone-800 font-display">
                Ghi chú cho Bloom
              </label>
              <textarea
                rows={2}
                placeholder="Ví dụ: Mang kèm ống hút giấy, ít đá, đóng gói mang đi riêng..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full bg-stone-100 rounded-xl p-2.5 text-xs text-stone-800 placeholder-stone-400 focus:bg-white focus:ring-2 focus:ring-rose-500/20 focus:outline-none resize-none"
              />
            </div>
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="p-4 bg-white border-t border-stone-100 shrink-0 space-y-3">
          {validationError && (
            <div className="p-2 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-[11px] text-rose-700">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          <div className="flex items-center justify-between gap-3">
            {/* Quantity Stepper */}
            <div className="flex items-center gap-2 bg-stone-100 p-1 rounded-xl shrink-0">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                className="w-8 h-8 rounded-lg bg-white shadow-2xs flex items-center justify-center text-stone-700 disabled:opacity-40 hover:bg-stone-50"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-6 text-center text-xs font-bold text-stone-900">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 rounded-lg bg-white shadow-2xs flex items-center justify-center text-stone-700 hover:bg-stone-50"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Add to Cart CTA */}
            <button
              onClick={handleConfirmAddToCart}
              disabled={!isFormValid || product.isOutOfStock}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold text-white flex items-center justify-between shadow-md transition-all active:scale-[0.98] ${
                !isFormValid || product.isOutOfStock
                  ? 'bg-stone-300 cursor-not-allowed shadow-none'
                  : 'bg-rose-600 hover:bg-rose-700 shadow-rose-200'
              }`}
            >
              <span>{product.isOutOfStock ? 'Món đã hết' : 'Thêm vào giỏ hàng'}</span>
              <span className="font-display font-extrabold">
                {formatVND(totalPrice)}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
