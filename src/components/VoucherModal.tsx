import React, { useState } from 'react';
import { X, Tag, Ticket, Check, AlertCircle, Info, ChevronRight, Truck, Gift } from 'lucide-react';
import { Voucher } from '../types';
import { formatVND } from '../utils/formatters';

interface VoucherModalProps {
  isOpen: boolean;
  onClose: () => void;
  vouchers: Voucher[];
  selectedVoucher: Voucher | null;
  onApplyVoucher: (voucher: Voucher) => void;
  currentSubtotal: number;
}

export const VoucherModal: React.FC<VoucherModalProps> = ({
  isOpen,
  onClose,
  vouchers,
  selectedVoucher,
  onApplyVoucher,
  currentSubtotal
}) => {
  const [activeTab, setActiveTab] = useState<'eligible' | 'ineligible' | 'expired'>('eligible');
  const [detailVoucher, setDetailVoucher] = useState<Voucher | null>(null);

  if (!isOpen) return null;

  // Dynamically evaluate eligibility against currentSubtotal
  const evaluatedVouchers = vouchers.map((v) => {
    if (v.id === 'vouch-5') {
      return { ...v, statusGroup: 'expired' as const };
    }
    if (currentSubtotal < v.minOrder) {
      return {
        ...v,
        statusGroup: 'ineligible' as const,
        ineligibleReason: `Đơn tối thiểu ${formatVND(v.minOrder)}, hiện tại ${formatVND(currentSubtotal)} (cần thêm ${formatVND(v.minOrder - currentSubtotal)})`
      };
    }
    return { ...v, statusGroup: 'eligible' as const };
  });

  const eligibleList = evaluatedVouchers.filter((v) => v.statusGroup === 'eligible');
  const ineligibleList = evaluatedVouchers.filter((v) => v.statusGroup === 'ineligible');
  const expiredList = evaluatedVouchers.filter((v) => v.statusGroup === 'expired');

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-[400px] bg-white rounded-t-3xl shadow-2xl p-5 z-10 max-h-[88vh] flex flex-col">
        {/* Grab Handle */}
        <div className="w-12 h-1.5 bg-stone-200 rounded-full mx-auto mb-3 shrink-0" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100 shrink-0">
          <div className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-rose-600" />
            <h3 className="text-base font-bold text-stone-900 font-display">
              Ví ưu đãi Bloom
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 text-stone-500 hover:text-stone-800 flex items-center justify-center shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-3 gap-1 p-1 bg-stone-100 rounded-xl my-3 shrink-0 text-center">
          <button
            onClick={() => setActiveTab('eligible')}
            className={`py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'eligible'
                ? 'bg-white text-rose-700 shadow-2xs'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            Khả dụng ({eligibleList.length})
          </button>
          <button
            onClick={() => setActiveTab('ineligible')}
            className={`py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'ineligible'
                ? 'bg-white text-stone-800 shadow-2xs'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            Chưa đủ ({ineligibleList.length})
          </button>
          <button
            onClick={() => setActiveTab('expired')}
            className={`py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'expired'
                ? 'bg-white text-stone-800 shadow-2xs'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            Hết hạn ({expiredList.length})
          </button>
        </div>

        {/* Voucher List */}
        <div className="flex-1 overflow-y-auto no-scrollbar space-y-3 pb-3">
          {activeTab === 'eligible' && (
            eligibleList.length === 0 ? (
              <div className="text-center py-10 text-stone-400 text-xs">
                Hiện chưa có mã ưu đãi khả dụng cho giỏ hàng hiện tại.
              </div>
            ) : (
              eligibleList.map((v) => {
                const isSelected = selectedVoucher?.id === v.id;
                return (
                  <div
                    key={v.id}
                    className={`rounded-2xl border p-3 flex flex-col justify-between transition-all relative overflow-hidden ${
                      isSelected
                        ? 'border-rose-500 bg-rose-50/50 shadow-xs'
                        : 'border-stone-200/80 bg-white hover:border-rose-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-400 text-white flex items-center justify-center shrink-0 shadow-2xs">
                        {v.category === 'shipping' ? (
                          <Truck className="w-5 h-5" />
                        ) : (
                          <Gift className="w-5 h-5" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded">
                            {v.category === 'shipping' ? 'Freeship' : 'Giảm món'}
                          </span>
                          <span className="text-xs font-bold text-stone-900 truncate">
                            {v.code}
                          </span>
                        </div>

                        <p className="text-xs font-bold text-stone-800 mt-1">
                          {v.title}
                        </p>
                        <p className="text-[11px] text-stone-500 mt-0.5">
                          Đơn tối thiểu {formatVND(v.minOrder)} · HSD: {v.expiryDate}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          onApplyVoucher(v);
                          onClose();
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                          isSelected
                            ? 'bg-rose-600 text-white shadow-2xs'
                            : 'bg-stone-900 text-white hover:bg-stone-800'
                        }`}
                      >
                        {isSelected ? 'Đang dùng' : 'Áp dụng'}
                      </button>
                    </div>

                    {/* View Terms link */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100 text-[10px] text-stone-400">
                      <span>Được áp dụng cùng BloomPoints</span>
                      <button
                        onClick={() => setDetailVoucher(v)}
                        className="text-stone-500 hover:text-stone-800 flex items-center gap-0.5 font-medium"
                      >
                        <span>Điều kiện</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })
            )
          )}

          {activeTab === 'ineligible' && (
            ineligibleList.map((v) => (
              <div
                key={v.id}
                className="rounded-2xl border border-stone-200 bg-stone-50/60 p-3 opacity-85"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="w-10 h-10 rounded-xl bg-stone-200 text-stone-500 flex items-center justify-center shrink-0">
                    <Tag className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-bold text-stone-700">
                      {v.code} - {v.title}
                    </span>
                    <p className="text-[11px] text-amber-700 font-medium mt-1 flex items-start gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0 mt-0.5" />
                      <span>{v.ineligibleReason}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}

          {activeTab === 'expired' && (
            expiredList.map((v) => (
              <div
                key={v.id}
                className="rounded-2xl border border-stone-200 bg-stone-50 p-3 opacity-60"
              >
                <span className="text-xs font-bold text-stone-500 line-through">
                  {v.code} - {v.title}
                </span>
                <p className="text-[11px] text-stone-400 mt-0.5">
                  Đã hết hạn vào ngày {v.expiryDate}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Voucher Detail Sub-Modal */}
        {detailVoucher && (
          <div className="absolute inset-0 bg-white rounded-t-3xl p-5 z-20 flex flex-col justify-between animate-fade-in">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <h4 className="text-sm font-bold text-stone-900 font-display">
                  Chi tiết điều kiện ưu đãi
                </h4>
                <button
                  onClick={() => setDetailVoucher(null)}
                  className="w-7 h-7 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="py-4 space-y-3 text-xs text-stone-600">
                <div className="p-3 bg-rose-50 rounded-xl border border-rose-100">
                  <p className="text-xs font-bold text-rose-900">{detailVoucher.title}</p>
                  <p className="text-[11px] text-rose-700 mt-0.5 font-mono">Mã: {detailVoucher.code}</p>
                </div>

                <div className="space-y-1.5">
                  <p className="font-bold text-stone-800">Quy định áp dụng:</p>
                  <p>• {detailVoucher.description}</p>
                  <p>• Giá trị đơn hàng tối thiểu: {formatVND(detailVoucher.minOrder)}</p>
                  <p>• Hạn sử dụng đến hết 23:59 ngày: {detailVoucher.expiryDate}</p>
                  <p>• Áp dụng cho cả đơn Giao hàng và Đến lấy.</p>
                  <p>• Mỗi đơn hàng chỉ áp dụng tối đa 01 voucher giảm giá.</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setDetailVoucher(null)}
              className="w-full py-2.5 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800"
            >
              Đã hiểu
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
