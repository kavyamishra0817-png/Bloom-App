import React, { useState } from 'react';
import { X, Award, ChevronDown, ChevronUp, History, Sparkles, Shield, Info, Check } from 'lucide-react';
import { MemberProfile } from '../types';
import { TIER_BENEFITS } from '../data/mockData';

interface LoyaltyTierModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: MemberProfile;
}

export const LoyaltyTierModal: React.FC<LoyaltyTierModalProps> = ({
  isOpen,
  onClose,
  profile
}) => {
  const [activeTab, setActiveTab] = useState<'benefits' | 'history' | 'policy'>('benefits');
  const [expandedTier, setExpandedTier] = useState<string>('Bloom Gold');

  if (!isOpen) return null;

  // Mock points history ledger
  const pointsLedger = [
    { id: 'tx-1', title: 'Tích điểm đơn hàng #BLM-9842', date: 'Hôm nay, 10:45', amount: '+35 pts', type: 'earn' },
    { id: 'tx-2', title: 'Đổi voucher Giảm 30k BLOOMWELCOME', date: '21/10/2026', amount: '-50 pts', type: 'spend' },
    { id: 'tx-3', title: 'Thưởng sinh nhật Bloom Gold', date: '15/10/2026', amount: '+100 pts', type: 'earn' },
    { id: 'tx-4', title: 'Tích điểm đơn hàng #BLM-9710', date: '10/10/2026', amount: '+42 pts', type: 'earn' }
  ];

  const progressPercent = Math.min(
    100,
    Math.round((profile.tierPoints / profile.nextTierThreshold) * 100)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in select-none">
      <div className="w-full max-w-[400px] h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-stone-200/80 px-4 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-rose-600" />
            <h3 className="text-base font-bold text-stone-900 font-display">
              Thành viên & Điểm thưởng
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 text-stone-500 hover:text-stone-800 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </header>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4">
          {/* Tier Overview Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-stone-900 via-stone-800 to-rose-950 text-white shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-rose-300 font-bold block">
                  Hạng hiện tại
                </span>
                <h4 className="text-xl font-bold font-display text-white mt-0.5">
                  {profile.tier}
                </h4>
              </div>
              <div className="w-10 h-10 rounded-full bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-amber-300">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>

            {/* Progress to next tier */}
            <div className="mt-4 space-y-1.5">
              <div className="flex justify-between text-xs text-stone-300">
                <span>Tiến độ thăng hạng Bloom Diamond</span>
                <span className="font-bold text-white font-mono">{profile.tierPoints} / {profile.nextTierThreshold}</span>
              </div>
              <div className="w-full h-2 bg-stone-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 to-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-[10px] text-stone-400">
                Tích lũy thêm {profile.nextTierThreshold - profile.tierPoints} điểm để thăng hạng Bloom Diamond trước 31/12/2026.
              </p>
            </div>

            {/* Clear Separation: Điểm xét hạng vs Điểm đổi ưu đãi */}
            <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/10 text-xs">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-emerald-300 block font-semibold uppercase">
                  Điểm đổi ưu đãi
                </span>
                <span className="text-base font-extrabold text-white font-display">
                  {profile.spendablePoints} <span className="text-xs font-normal text-white/70">pts</span>
                </span>
                <p className="text-[9px] text-stone-400 mt-0.5 leading-tight">
                  Dùng để đổi voucher giảm giá và quà tặng.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-amber-300 block font-semibold uppercase">
                  Điểm xét hạng
                </span>
                <span className="text-base font-extrabold text-white font-display">
                  {profile.tierPoints} <span className="text-xs font-normal text-white/70">pts</span>
                </span>
                <p className="text-[9px] text-stone-400 mt-0.5 leading-tight">
                  Tổng điểm tích lũy trong năm xét hạng hội viên.
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="grid grid-cols-3 gap-1 p-1 bg-stone-100 rounded-xl text-center">
            <button
              onClick={() => setActiveTab('benefits')}
              className={`py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'benefits'
                  ? 'bg-white text-stone-900 shadow-2xs'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              Quyền lợi
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'history'
                  ? 'bg-white text-stone-900 shadow-2xs'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              Lịch sử điểm
            </button>
            <button
              onClick={() => setActiveTab('policy')}
              className={`py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'policy'
                  ? 'bg-white text-stone-900 shadow-2xs'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              Chính sách
            </button>
          </div>

          {/* Tab 1: Expandable Tier Benefits */}
          {activeTab === 'benefits' && (
            <div className="space-y-3">
              {TIER_BENEFITS.map((tier) => {
                const isCurrent = profile.tier === tier.tier;
                const isExpanded = expandedTier === tier.tier;

                return (
                  <div
                    key={tier.tier}
                    className={`rounded-2xl border transition-all ${
                      isCurrent
                        ? 'border-rose-400 bg-rose-50/40 shadow-xs'
                        : 'border-stone-200/80 bg-white'
                    }`}
                  >
                    <div
                      onClick={() => setExpandedTier(isExpanded ? '' : tier.tier)}
                      className="p-3.5 flex items-center justify-between cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                            tier.tier === 'Bloom Diamond'
                              ? 'bg-rose-600 text-white'
                              : tier.tier === 'Bloom Gold'
                              ? 'bg-amber-500 text-white'
                              : 'bg-stone-600 text-white'
                          }`}
                        >
                          <Award className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-xs font-bold text-stone-900 font-display">
                              {tier.tier}
                            </h4>
                            {isCurrent && (
                              <span className="text-[9px] bg-rose-100 text-rose-700 px-1.5 py-0.2 rounded font-bold">
                                Hạng của bạn
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-stone-500">{tier.requirement}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          {tier.pointsRate}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-stone-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-stone-400" />
                        )}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="px-3.5 pb-3.5 pt-1 border-t border-stone-100 text-xs space-y-2">
                        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                          Đặc quyền dành riêng:
                        </p>
                        <ul className="space-y-1.5">
                          {tier.perks.map((perk, i) => (
                            <li key={i} className="flex items-start gap-2 text-stone-700 text-xs">
                              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{perk}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Tab 2: Points History */}
          {activeTab === 'history' && (
            <div className="space-y-2.5">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                Biến động điểm gần đây
              </span>
              {pointsLedger.map((tx) => (
                <div
                  key={tx.id}
                  className="p-3 rounded-2xl border border-stone-200/80 bg-white flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <p className="font-bold text-stone-800">{tx.title}</p>
                    <p className="text-[10px] text-stone-400 mt-0.5">{tx.date}</p>
                  </div>
                  <span
                    className={`font-mono font-bold text-xs ${
                      tx.type === 'earn' ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {tx.amount}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Membership Policy */}
          {activeTab === 'policy' && (
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-3 text-xs text-stone-700 leading-relaxed">
              <h5 className="font-bold text-stone-900 font-display flex items-center gap-1.5">
                <Info className="w-4 h-4 text-rose-600" />
                <span>Chính sách chương trình Bloom Loyalty</span>
              </h5>
              <div className="space-y-2">
                <p>• <strong>Cơ chế tích điểm:</strong> Mỗi 10.000đ chi tiêu qua ứng dụng hoặc tại quầy tương đương tích lũy điểm theo tỷ lệ từng hạng thành viên.</p>
                <p>• <strong>Hạn sử dụng điểm:</strong> Điểm đổi ưu đãi có giá trị trong vòng 12 tháng kể từ ngày phát sinh giao dịch.</p>
                <p>• <strong>Thời gian duy trì hạng:</strong> Hạng thành viên được xét theo chu kỳ 1 năm dương lịch. Điểm xét hạng sẽ làm mới vào ngày 1 tháng 1 hàng năm.</p>
                <p>• <strong>Đổi thưởng:</strong> Điểm có thể dùng để đổi các mã giảm giá cà phê, bánh ngọt, hoặc hộp quà lưu niệm trong mục Ví Voucher.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
