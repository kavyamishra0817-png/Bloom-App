import React from 'react';
import { X, Leaf, Award, MapPin } from 'lucide-react';

interface BrandIntroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandIntroModal: React.FC<BrandIntroModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in select-none">
      <div className="w-full max-w-[380px] h-[85vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-rose-100 px-4 py-3 flex items-center justify-between shrink-0">
          <span className="text-xs font-bold text-stone-900 font-display">
            Câu chuyện thương hiệu
          </span>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-stone-100 text-stone-500 hover:text-stone-800 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-5 text-stone-700 text-xs leading-relaxed">
          {/* Logo & Slogan */}
          <div className="text-center space-y-2 pb-2 border-b border-rose-100">
            <div className="w-16 h-16 rounded-full overflow-hidden p-1 bg-gradient-to-tr from-pink-400 via-rose-400 to-emerald-400 mx-auto shadow-md flex items-center justify-center">
              <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center">
                <img
                  src="/assets/aistudio/image_409_9964af08.png"
                  alt="Bloom Emblem"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <h3 className="text-lg font-bold text-stone-900 font-display">
              Bloom Cake & Coffee Nha Trang
            </h3>
            <p className="text-xs text-rose-600 font-semibold italic">
              “Nơi hương hoa và vị ngọt nở rộ bên bờ vịnh biển xanh”
            </p>
          </div>

          {/* Triết lý */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-stone-900 font-display flex items-center gap-1.5 uppercase tracking-wider">
              <Leaf className="w-3.5 h-3.5 text-emerald-600" />
              <span>Tinh Thần Thương Hiệu Bloom</span>
            </h4>
            <p>
              Bloom Cake & Coffee ra đời với cảm hứng từ những đóa hoa bốn cánh cách điệu uyển chuyển trên logo và sắc xanh biếc của vịnh Nha Trang. Chúng tôi tạo dựng không gian cafe sân vườn thoáng đãng, mang đến trải nghiệm đồ uống thanh mát, cà phê Arabica Cầu Đất nguyên chất và những mẻ bánh Pháp nướng nóng thơm phức mỗi ngày.
            </p>
          </div>

          {/* Chi nhánh tại Nha Trang */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-rose-50 to-emerald-50 border border-rose-200/80 space-y-1.5">
            <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs">
              <MapPin className="w-4 h-4 text-rose-500" />
              <span>5 Chi Nhánh Tại Thành Phố Biển Nha Trang</span>
            </div>
            <p className="text-[11px] text-stone-600 leading-normal">
              • <strong>46 Trần Phú:</strong> Flagship view trọn biển Nha Trang.<br />
              • <strong>24 Biệt Thự:</strong> Sân vườn nhiệt đới khu phố Tây.<br />
              • <strong>92 Thái Nguyên:</strong> Boutique cổ điển gần Ga Nha Trang.<br />
              • <strong>Vinpearl Harbour:</strong> Trải nghiệm ẩm thực đảo Hòn Tre.<br />
              • <strong>180 Đường 2/4:</strong> Roastery gần Tháp Bà Ponagar.
            </p>
          </div>

          {/* 3 Trụ cột chất lượng */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-stone-900 font-display flex items-center gap-1.5 uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-rose-600" />
              <span>3 Tiêu Chuẩn Cam Kết</span>
            </h4>

            <div className="p-3 rounded-2xl bg-rose-50/70 border border-rose-100 space-y-1">
              <p className="font-bold text-rose-900">1. Cà phê đặc sản & Trà hoa tự nhiên</p>
              <p className="text-[11px] text-stone-600">
                100% hạt cà phê Arabica Cầu Đất rang mộc cùng trà Oolong Lâm Đồng kết hợp hoa hồng, hoa cúc sấy hữu cơ.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-1">
              <p className="font-bold text-emerald-900">2. Bánh tươi làm mới mỗi ngày</p>
              <p className="text-[11px] text-stone-600">
                Bơ lạt Elle & Vire của Pháp, dâu tây tươi Đà Lạt, giảm 40% lượng đường so với bánh thông thường.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition-colors shadow-sm"
            >
              Khám phá thực đơn ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
