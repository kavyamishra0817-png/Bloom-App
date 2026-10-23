import React from 'react';
import { X, Trash2, Plus, Minus, Ticket, ChevronRight, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem, ReceiveMode, Voucher } from '../types';
import { calculateVoucherDiscount, formatVND } from '../utils/formatters';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onContinueShopping: () => void;
  onOpenVoucherModal: () => void;
  selectedVoucher: Voucher | null;
  onRemoveVoucher: () => void;
  onProceedToCheckout: () => void;
  receiveMode: ReceiveMode;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onContinueShopping,
  onOpenVoucherModal,
  selectedVoucher,
  onRemoveVoucher,
  onProceedToCheckout,
  receiveMode
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const shippingFee = receiveMode === 'delivery' && items.length > 0 ? 22000 : 0;
  const discount = calculateVoucherDiscount(selectedVoucher, subtotal, shippingFee);
  const total = Math.max(0, subtotal + shippingFee - discount);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-[400px] bg-white rounded-t-3xl shadow-2xl z-10 max-h-[92vh] flex flex-col overflow-hidden">
        {/* Grab Handle */}
        <div className="w-12 h-1.5 bg-stone-200 rounded-full mx-auto my-2 shrink-0" />

        {/* Header */}
        <div className="px-5 py-3 border-b border-stone-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-rose-600" />
            <h3 className="text-base font-bold text-stone-900 font-display">
              Giỏ hàng của bạn ({items.reduce((s, i) => s + i.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 text-stone-500 hover:text-stone-800 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          /* Empty Cart State */
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-rose-50 flex items-center justify-center text-rose-400">
              <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-800 font-display">
                Giỏ hàng của bạn đang trống
              </h4>
              <p className="text-xs text-stone-500 mt-1 max-w-xs">
                Hãy thưởng thức những tách cà phê thơm ngát và chiếc bánh tươi mềm từ Bloom nhé!
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onContinueShopping();
              }}
              className="py-3 px-6 rounded-xl bg-rose-600 text-white text-xs font-bold shadow-md hover:bg-rose-700 transition-all"
            >
              Khám phá thực đơn ngay
            </button>
          </div>
        ) : (
          /* Cart Items & Summary */
          <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4">
            {/* List of items */}
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-2xl border border-stone-200/80 bg-white flex gap-3 relative"
                >
                  {/* Item Image */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>

                  {/* Item Info */}
                  <div className="min-w-0 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-bold text-stone-900 truncate font-display">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-stone-300 hover:text-rose-600 p-0.5 transition-colors"
                          title="Xóa món"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Selected options tags */}
                      {item.selectedOptions.length > 0 && (
                        <p className="text-[11px] text-stone-500 line-clamp-2 mt-0.5">
                          {item.selectedOptions.map((o) => o.optionName).join(' · ')}
                        </p>
                      )}

                      {item.note && (
                        <p className="text-[10px] text-rose-700 italic mt-0.5">
                          Ghi chú: {item.note}
                        </p>
                      )}
                    </div>

                    {/* Price and Quantity Stepper */}
                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-stone-100">
                      <span className="text-xs font-extrabold text-rose-700 font-display">
                        {formatVND(item.totalPrice)}
                      </span>

                      <div className="flex items-center gap-1.5 bg-stone-100 p-0.5 rounded-lg">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded bg-white shadow-2xs flex items-center justify-center text-stone-700 hover:bg-stone-50"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center text-xs font-bold text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded bg-white shadow-2xs flex items-center justify-center text-stone-700 hover:bg-stone-50"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add more items button */}
            <button
              onClick={() => {
                onClose();
                onContinueShopping();
              }}
              className="w-full py-2.5 rounded-xl border border-dashed border-rose-300 text-xs font-semibold text-rose-700 hover:bg-rose-50/50 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Thêm món khác vào giỏ</span>
            </button>

            {/* Voucher Section Row */}
            <div className="p-3 rounded-2xl bg-rose-50/60 border border-rose-100 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <Ticket className="w-5 h-5 text-rose-600 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-rose-900 truncate">
                    {selectedVoucher ? selectedVoucher.title : 'Ví Voucher & Khuyến mãi'}
                  </p>
                  <p className="text-[11px] text-rose-700 truncate">
                    {selectedVoucher
                      ? `Đã áp dụng mã: ${selectedVoucher.code}`
                      : 'Chọn hoặc nhập mã giảm giá'}
                  </p>
                </div>
              </div>

              {selectedVoucher ? (
                <button
                  onClick={onRemoveVoucher}
                  className="text-xs font-semibold text-rose-600 hover:text-rose-800 p-1"
                >
                  Gỡ bỏ
                </button>
              ) : (
                <button
                  onClick={onOpenVoucherModal}
                  className="text-xs font-bold text-rose-700 hover:text-rose-900 flex items-center gap-0.5 shrink-0"
                >
                  <span>Chọn mã</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Pricing Summary */}
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Tạm tính tiền món</span>
                <span className="font-semibold text-stone-900 font-display">
                  {formatVND(subtotal)}
                </span>
              </div>

              {receiveMode === 'delivery' && (
                <div className="flex justify-between text-stone-600">
                  <span>Phí giao hàng</span>
                  <span className="font-semibold text-stone-900 font-display">
                    {formatVND(shippingFee)}
                  </span>
                </div>
              )}

              {discount > 0 && (
                <div className="flex justify-between text-rose-600 font-semibold">
                  <span>Giảm giá khuyến mãi</span>
                  <span className="font-display">-{formatVND(discount)}</span>
                </div>
              )}

              <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline">
                <span className="font-bold text-stone-900 text-sm font-display">
                  Tổng thanh toán
                </span>
                <span className="text-base font-extrabold text-rose-600 font-display">
                  {formatVND(total)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Footer Proceed */}
        {items.length > 0 && (
          <div className="p-4 bg-white border-t border-stone-100 shrink-0">
            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-3.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center justify-between shadow-md transition-all active:scale-[0.98]"
            >
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-stone-400 font-normal">
                  {items.reduce((s, i) => s + i.quantity, 0)} món · {receiveMode === 'delivery' ? 'Giao hàng' : 'Đến lấy'}
                </span>
                <span className="text-sm font-extrabold text-white font-display">
                  {formatVND(total)}
                </span>
              </div>
              <div className="flex items-center gap-1 text-rose-300 font-bold">
                <span>Tiếp tục đặt hàng</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
