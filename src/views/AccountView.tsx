import React, { useState } from 'react';
import { MemberProfile } from '../types';
import { Ticket, Award, MapPin, Sparkles, PhoneCall, FileText, Bell, LogOut, ChevronRight, Star } from 'lucide-react';
import { IconOrder, IconAccount } from '../components/BrandIcons';

interface AccountViewProps {
  profile: MemberProfile;
  onOpenOrderHistory: () => void;
  onOpenVouchers: () => void;
  onOpenLoyaltyTiers: () => void;
  onOpenAddressManager: () => void;
  onOpenBrandIntro: () => void;
  onOpenServiceReview: () => void;
  onShowToast: (message: string) => void;
}

export const AccountView: React.FC<AccountViewProps> = ({
  profile,
  onOpenOrderHistory,
  onOpenVouchers,
  onOpenLoyaltyTiers,
  onOpenAddressManager,
  onOpenBrandIntro,
  onOpenServiceReview,
  onShowToast
}) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showPolicyModal, setShowPolicyModal] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4 pb-24 select-none animate-fade-in">
      {/* 1. Profile Card with Logo Watercolor Aura */}
      <div className="p-4 rounded-3xl bg-gradient-to-br from-stone-900 via-emerald-950 to-rose-950 text-white shadow-xl relative overflow-hidden border border-rose-900/40">
        <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-rose-500/20 blur-xl pointer-events-none" />
        <div className="absolute -left-6 -bottom-6 w-28 h-28 rounded-full bg-emerald-500/20 blur-xl pointer-events-none" />

        <div className="flex items-center gap-3.5 relative z-10">
          <div className="w-14 h-14 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-rose-400 to-emerald-400 border border-white/30 shrink-0 shadow-md">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white font-display truncate">
                {profile.name}
              </h3>
              <span className="text-[9px] bg-gradient-to-r from-rose-600 to-pink-600 px-2.5 py-0.5 rounded-full font-bold shadow-2xs">
                {profile.tier}
              </span>
            </div>
            <p className="text-xs text-stone-300 mt-0.5 font-mono">{profile.phone}</p>
            <p className="text-[11px] text-emerald-300 font-semibold truncate flex items-center gap-1">
              <span>Hội viên Bloom Nha Trang</span>
            </p>
          </div>
        </div>

        {/* Quick loyalty stat bar */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/10 text-xs relative z-10">
          <button
            onClick={onOpenLoyaltyTiers}
            className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-left transition-colors border border-white/10"
          >
            <span className="text-[10px] text-emerald-300 uppercase block font-bold">
              Điểm đổi ưu đãi
            </span>
            <span className="text-base font-extrabold text-emerald-400 font-display">
              {profile.spendablePoints} <span className="text-xs font-normal text-white/70">pts</span>
            </span>
          </button>

          <button
            onClick={onOpenLoyaltyTiers}
            className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-left transition-colors border border-white/10"
          >
            <span className="text-[10px] text-rose-300 uppercase block font-bold">
              Điểm xét hạng
            </span>
            <span className="text-base font-extrabold text-rose-300 font-display">
              {profile.tierPoints} / {profile.nextTierThreshold}
            </span>
          </button>
        </div>
      </div>

      {/* 2. Primary Activity Section */}
      <div className="bg-white rounded-3xl border border-rose-100 overflow-hidden divide-y divide-rose-50 shadow-xs">
        {/* Đơn hàng của tôi */}
        <button
          onClick={onOpenOrderHistory}
          className="w-full p-3.5 flex items-center justify-between text-left hover:bg-rose-50/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100">
              <IconOrder className="w-5 h-5" active />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-900 font-display">Đơn hàng của tôi</p>
              <p className="text-[10px] text-stone-400">Theo dõi trạng thái giao hàng thực tế tại Nha Trang</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-400" />
        </button>

        {/* Ưu đãi của tôi */}
        <button
          onClick={onOpenVouchers}
          className="w-full p-3.5 flex items-center justify-between text-left hover:bg-rose-50/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center border border-pink-100">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-900 font-display">Ví ưu đãi & Voucher</p>
              <p className="text-[10px] text-stone-400">Mã giảm giá đồ uống và freeship</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-400" />
        </button>

        {/* Thành viên và điểm */}
        <button
          onClick={onOpenLoyaltyTiers}
          className="w-full p-3.5 flex items-center justify-between text-left hover:bg-rose-50/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-900 font-display">Thành viên & Điểm thưởng</p>
              <p className="text-[10px] text-stone-400">Tiến độ thăng hạng Bloom Diamond</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-400" />
        </button>

        {/* Sổ địa chỉ đã lưu */}
        <button
          onClick={onOpenAddressManager}
          className="w-full p-3.5 flex items-center justify-between text-left hover:bg-rose-50/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-100">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-900 font-display">Sổ địa chỉ nhận hàng tại Nha Trang</p>
              <p className="text-[10px] text-stone-400">Quản lý các địa chỉ nhà riêng, khách sạn ven biển</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-400" />
        </button>
      </div>

      {/* 3. Brand & Feedback Section */}
      <div className="bg-white rounded-3xl border border-rose-100 overflow-hidden divide-y divide-rose-50 shadow-xs">
        {/* Đánh giá dịch vụ & Góp ý */}
        <button
          onClick={onOpenServiceReview}
          className="w-full p-3.5 flex items-center justify-between text-left hover:bg-rose-50/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100">
              <Star className="w-5 h-5 fill-rose-500 text-rose-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-900 font-display">Đánh giá dịch vụ & Góp ý</p>
              <p className="text-[10px] text-stone-400">Gửi nhận xét và nhận +20 BloomPoints</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-400" />
        </button>

        {/* Giới thiệu thương hiệu */}
        <button
          onClick={onOpenBrandIntro}
          className="w-full p-3.5 flex items-center justify-between text-left hover:bg-rose-50/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-100">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-900 font-display">Câu chuyện Bloom Cake & Coffee</p>
              <p className="text-[10px] text-stone-400">Hành trình hương hoa bên bờ vịnh Nha Trang</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-400" />
        </button>

        {/* Liên hệ hỗ trợ */}
        <button
          onClick={() => onShowToast('Tổng đài hỗ trợ Bloom Nha Trang: 0258 3822 559 (6:30 - 23:00)')}
          className="w-full p-3.5 flex items-center justify-between text-left hover:bg-rose-50/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-stone-100 text-stone-700 flex items-center justify-center">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-900 font-display">Hotline CSKH Nha Trang</p>
              <p className="text-[10px] text-stone-400">0258 3822 559 (Miễn phí cước gọi)</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-400" />
        </button>

        {/* Chính sách và điều khoản */}
        <button
          onClick={() => setShowPolicyModal(true)}
          className="w-full p-3.5 flex items-center justify-between text-left hover:bg-rose-50/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-stone-100 text-stone-700 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-900 font-display">Chính sách & Điều khoản</p>
              <p className="text-[10px] text-stone-400">Quy định giao nhận và tích điểm</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-400" />
        </button>

        {/* Cài đặt nhận thông báo toggle */}
        <div className="p-3.5 flex items-center justify-between text-left">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-stone-100 text-stone-700 flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-900 font-display">Cài đặt nhận thông báo</p>
              <p className="text-[10px] text-stone-400">Cập nhật đơn hàng và voucher mới</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={(e) => {
              setNotificationsEnabled(e.target.checked);
              onShowToast(
                e.target.checked
                  ? 'Đã bật nhận thông báo ứng dụng'
                  : 'Đã tắt nhận thông báo ứng dụng'
              );
            }}
            className="w-5 h-5 rounded text-rose-600 focus:ring-rose-500 cursor-pointer"
          />
        </div>
      </div>

      {/* 4. Logout / Switch account button */}
      <div className="pt-2 text-center">
        <button
          onClick={() => onShowToast('Đã đăng xuất tài khoản an toàn.')}
          className="w-full py-3 rounded-2xl border border-rose-200 text-rose-700 text-xs font-bold hover:bg-rose-50 flex items-center justify-center gap-2 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Đăng xuất tài khoản</span>
        </button>
        <p className="text-[10px] text-stone-400 mt-2">
          Phiên bản Bloom Cake & Coffee Nha Trang 2.5.0
        </p>
      </div>

      {/* Policy Modal */}
      {showPolicyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-[360px] bg-white rounded-3xl p-5 space-y-3.5 max-h-[80vh] overflow-y-auto no-scrollbar shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-rose-100">
              <h4 className="text-sm font-bold text-stone-900 font-display">Chính sách & Điều khoản</h4>
              <button
                onClick={() => setShowPolicyModal(false)}
                className="w-7 h-7 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center"
              >
                ✕
              </button>
            </div>
            <div className="text-xs text-stone-600 space-y-2 leading-relaxed">
              <p><strong>1. Quy định giao nhận tại TP. Nha Trang:</strong> Bloom cam kết giao đơn tận nơi trong vòng 20-30 phút dọc trục đường Trần Phú, Tân Lập, Lộc Thọ, Phương Sài.</p>
              <p><strong>2. Đổi trả & Hủy đơn:</strong> Khách hàng có thể hủy đơn miễn phí trong trạng thái Đã nhận đơn. Với đơn đang chuẩn bị hoặc đã giao, vui lòng liên hệ hotline 0258 3822 559.</p>
              <p><strong>3. Bảo mật thông tin:</strong> Bloom tôn trọng quyền riêng tư của khách hàng, cam kết bảo mật tuyệt đối dữ liệu cá nhân.</p>
            </div>
            <button
              onClick={() => setShowPolicyModal(false)}
              className="w-full py-2.5 bg-stone-900 text-white text-xs font-bold rounded-xl"
            >
              Đã hiểu
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
