import React, { useState } from 'react';
import { X, Star, Heart, Camera, CheckCircle2, Sparkles } from 'lucide-react';
import { Order, ServiceReview } from '../types';

interface ServiceReviewModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: ServiceReview) => void;
}

export const ServiceReviewModal: React.FC<ServiceReviewModalProps> = ({
  order,
  isOpen,
  onClose,
  onSubmitReview
}) => {
  const [ratingOverall, setRatingOverall] = useState(5);
  const [ratingTaste, setRatingTaste] = useState(5);
  const [ratingSpeed, setRatingSpeed] = useState(5);
  const [selectedTags, setSelectedTags] = useState<string[]>(['Đồ uống thơm ngon', 'Bánh mềm tươi']);
  const [comment, setComment] = useState('');
  const [photoAdded, setPhotoAdded] = useState(false);

  if (!isOpen || !order) return null;

  const quickTags = [
    'Đồ uống thơm ngon',
    'Bánh mềm tươi',
    'Đóng gói cẩn thận',
    'Giao hàng đúng giờ',
    'Đúng yêu cầu ít đường',
    'Trang trí bắt mắt'
  ];

  const handleToggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReview: ServiceReview = {
      id: `rev-${Date.now()}`,
      orderId: order.id,
      orderNumber: order.orderNumber,
      date: 'Vừa xong',
      ratingOverall,
      ratingTaste,
      ratingSpeed,
      tags: selectedTags,
      comment: comment.trim()
    };

    onSubmitReview(newReview);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in select-none">
      <div className="w-full max-w-[360px] bg-white rounded-3xl shadow-2xl p-5 relative max-h-[90vh] overflow-y-auto no-scrollbar">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 rounded-full bg-stone-100 text-stone-500 hover:text-stone-800 flex items-center justify-center"
        >
          <X className="w-4 h-4" />
        </button>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-center pt-2">
            <div className="w-11 h-11 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-2">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-stone-900 font-display">
              Đánh giá dịch vụ Bloom
            </h3>
            <p className="text-[11px] text-stone-500">
              Đơn hàng #{order.orderNumber} · Tặng ngay +20 BloomPoints
            </p>
          </div>

          {/* Overall Star Rating */}
          <div className="text-center space-y-1.5 py-1 bg-stone-50 rounded-2xl p-3">
            <span className="text-[11px] font-semibold text-stone-600">
              Trải nghiệm tổng thể của bạn
            </span>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRatingOverall(star)}
                  className="p-1 transition-transform hover:scale-110 active:scale-90"
                >
                  <Star
                    className={`w-7 h-7 ${
                      star <= ratingOverall
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-stone-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-xs font-bold text-amber-700">
              {ratingOverall === 5
                ? 'Tuyệt vời, rất hài lòng!'
                : ratingOverall === 4
                ? 'Hài lòng'
                : ratingOverall === 3
                ? 'Bình thường'
                : 'Chưa hài lòng'}
            </p>
          </div>

          {/* Sub-ratings */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-stone-600">Hương vị đồ uống & bánh:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setRatingTaste(s)}
                    className="p-0.5"
                  >
                    <Star
                      className={`w-4 h-4 ${
                        s <= ratingTaste ? 'fill-amber-400 text-amber-400' : 'text-stone-200'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-stone-600">Tốc độ chuẩn bị & giao hàng:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setRatingSpeed(s)}
                    className="p-0.5"
                  >
                    <Star
                      className={`w-4 h-4 ${
                        s <= ratingSpeed ? 'fill-amber-400 text-amber-400' : 'text-stone-200'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick compliment chips */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold text-stone-600 block">
              Điều bạn thích nhất:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {quickTags.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    type="button"
                    key={tag}
                    onClick={() => handleToggleTag(tag)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                      isSelected
                        ? 'bg-rose-100 text-rose-800 border border-rose-200 font-semibold'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detailed comment */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-stone-600 block">
              Góp ý thêm cho Bloom:
            </label>
            <textarea
              rows={3}
              placeholder="Chia sẻ cảm nhận của bạn về hương vị, đóng gói hoặc tài xế..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full bg-stone-100 rounded-xl p-2.5 text-xs text-stone-800 focus:bg-white focus:ring-2 focus:ring-rose-500/20 focus:outline-none resize-none"
            />
          </div>

          {/* Photo attach simulation */}
          <div>
            <button
              type="button"
              onClick={() => setPhotoAdded(!photoAdded)}
              className={`w-full py-2 border rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-colors ${
                photoAdded
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                  : 'border-dashed border-stone-300 text-stone-600 hover:bg-stone-50'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>{photoAdded ? 'Đã đính kèm 1 ảnh chụp món' : 'Thêm ảnh món đồ uống/bánh'}</span>
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700 shadow-md shadow-rose-200 transition-all active:scale-[0.98]"
          >
            Gửi đánh giá & Nhận 20 BloomPoints
          </button>
        </form>
      </div>
    </div>
  );
};
