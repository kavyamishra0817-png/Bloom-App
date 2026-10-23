import { Voucher } from '../types';

export function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN').format(Math.max(0, amount)) + 'đ';
}

export function calculateVoucherDiscount(
  voucher: Voucher | null,
  subtotal: number,
  shippingFee: number
): number {
  if (!voucher) return 0;
  if (subtotal < voucher.minOrder) return 0;

  if (voucher.discountType === 'shipping') {
    return Math.min(shippingFee, voucher.discountValue);
  }

  if (voucher.discountType === 'fixed') {
    return Math.min(subtotal, voucher.discountValue);
  }

  if (voucher.discountType === 'percent') {
    const rawDiscount = (subtotal * voucher.discountValue) / 100;
    if (voucher.maxDiscount) {
      return Math.min(rawDiscount, voucher.maxDiscount);
    }
    return rawDiscount;
  }

  return 0;
}
