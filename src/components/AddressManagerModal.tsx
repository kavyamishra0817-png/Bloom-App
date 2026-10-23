import React, { useState } from 'react';
import { X, Search, Navigation, Plus, Trash2, Check, AlertCircle, Home, Briefcase, Heart, MapPin } from 'lucide-react';
import { Address } from '../types';

interface AddressManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  addresses: Address[];
  selectedAddress: Address | null;
  onSelectAddress: (addr: Address) => void;
  onAddAddress: (newAddr: Address) => void;
  onDeleteAddress: (id: string) => void;
}

export const AddressManagerModal: React.FC<AddressManagerModalProps> = ({
  isOpen,
  onClose,
  addresses,
  selectedAddress,
  onSelectAddress,
  onAddAddress,
  onDeleteAddress
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsNotice, setGpsNotice] = useState<string | null>(null);

  // New address form state
  const [formLabel, setFormLabel] = useState('Nhà riêng');
  const [formRecipient, setFormRecipient] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [formDetail, setFormDetail] = useState('');
  const [formNote, setFormNote] = useState('');
  const [formIsOutOfZone, setFormIsOutOfZone] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSimulateGPS = () => {
    setGpsLoading(true);
    setGpsNotice(null);
    setTimeout(() => {
      setGpsLoading(false);
      setGpsNotice('Đã định vị tại: 72 Trần Phú, Phường Lộc Thọ, TP. Nha Trang (Cách bạn 250m)');
      if (isAddingNew) {
        setFormAddress('72 Trần Phú, Phường Lộc Thọ, TP. Nha Trang, Khánh Hòa');
      }
    }, 700);
  };

  const handleSaveNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRecipient.trim() || !formPhone.trim() || !formAddress.trim()) {
      setFormError('Vui lòng điền đầy đủ họ tên, số điện thoại và địa chỉ nhận hàng tại Nha Trang.');
      return;
    }

    const newAddress: Address = {
      id: `addr-${Date.now()}`,
      label: formLabel,
      recipientName: formRecipient.trim(),
      phone: formPhone.trim(),
      fullAddress: formAddress.trim(),
      detail: formDetail.trim() || 'Căn hộ / Tầng',
      note: formNote.trim(),
      isDefault: addresses.length === 0,
      isOutOfZone: formIsOutOfZone
    };

    onAddAddress(newAddress);
    setIsAddingNew(false);
    setFormRecipient('');
    setFormPhone('');
    setFormAddress('');
    setFormDetail('');
    setFormNote('');
    setFormIsOutOfZone(false);
    setFormError(null);
  };

  const filteredAddresses = addresses.filter(
    (a) =>
      a.fullAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.recipientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs animate-fade-in select-none">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-[400px] bg-white rounded-t-3xl shadow-2xl p-5 z-10 max-h-[90vh] flex flex-col">
        {/* Grab Handle */}
        <div className="w-12 h-1.5 bg-rose-200 rounded-full mx-auto mb-3 shrink-0" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-rose-100 shrink-0">
          <div>
            <h3 className="text-base font-bold text-stone-900 font-display">
              {isAddingNew ? 'Thêm địa chỉ giao hàng' : 'Sổ địa chỉ tại Nha Trang'}
            </h3>
            <p className="text-[11px] text-stone-500">Phục vụ giao tận nơi nội thành TP. Nha Trang</p>
          </div>
          <button
            onClick={() => {
              if (isAddingNew) {
                setIsAddingNew(false);
              } else {
                onClose();
              }
            }}
            className="w-8 h-8 rounded-full bg-stone-100 text-stone-500 hover:text-stone-800 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body content */}
        <div className="flex-1 overflow-y-auto no-scrollbar py-3 space-y-4">
          {!isAddingNew ? (
            <>
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Tìm theo tên đường, tòa nhà tại Nha Trang..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-stone-100 pl-9 pr-4 py-2.5 rounded-xl text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:bg-white transition-all"
                />
              </div>

              {/* Current Location GPS Button */}
              <button
                onClick={handleSimulateGPS}
                disabled={gpsLoading}
                className="w-full p-3 rounded-2xl border border-rose-200 bg-rose-50/60 hover:bg-rose-100/60 flex items-center gap-3 transition-colors text-left shadow-2xs"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-600 to-pink-500 text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <Navigation className={`w-4 h-4 ${gpsLoading ? 'animate-spin' : ''}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-rose-900">
                    Sử dụng vị trí hiện tại tại Nha Trang
                  </p>
                  <p className="text-[11px] text-rose-700 truncate">
                    {gpsLoading ? 'Đang định vị vệ tinh GPS...' : 'Định vị tự động để giao nhanh nhất'}
                  </p>
                </div>
              </button>

              {gpsNotice && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-800">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="truncate">{gpsNotice}</span>
                </div>
              )}

              {/* Add New Address Button */}
              <button
                onClick={() => setIsAddingNew(true)}
                className="w-full py-2.5 border-2 border-dashed border-rose-300 hover:border-rose-400 bg-rose-50/40 rounded-2xl text-xs font-bold text-rose-700 flex items-center justify-center gap-2 transition-all hover:bg-rose-50"
              >
                <Plus className="w-4 h-4" />
                <span>Thêm địa chỉ nhận hàng mới</span>
              </button>

              {/* Address List */}
              <div className="space-y-2.5 pt-1">
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                  Danh sách địa chỉ ({filteredAddresses.length})
                </span>

                {filteredAddresses.length === 0 ? (
                  <div className="text-center py-8 text-stone-400 text-xs">
                    Không tìm thấy địa chỉ nào phù hợp.
                  </div>
                ) : (
                  filteredAddresses.map((addr) => {
                    const isSelected = selectedAddress?.id === addr.id;
                    return (
                      <div
                        key={addr.id}
                        className={`p-3.5 rounded-2xl border transition-all relative ${
                          addr.isOutOfZone
                            ? 'bg-amber-50/40 border-amber-200 opacity-80'
                            : isSelected
                            ? 'border-rose-400 bg-rose-50/50 shadow-2xs ring-1 ring-rose-200'
                            : 'border-stone-200/80 bg-white hover:border-rose-200'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div
                            onClick={() => {
                              if (addr.isOutOfZone) return;
                              onSelectAddress(addr);
                              onClose();
                            }}
                            className="min-w-0 flex-1 cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                                {addr.label === 'Nhà riêng' && <Home className="w-3.5 h-3.5 text-rose-600" />}
                                {addr.label === 'Văn phòng' && <Briefcase className="w-3.5 h-3.5 text-emerald-600" />}
                                {addr.label === 'Nhà bạn bè' && <Heart className="w-3.5 h-3.5 text-pink-500" />}
                                {addr.label}
                              </span>
                              {addr.isDefault && (
                                <span className="text-[10px] bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded-md font-bold">
                                  Mặc định
                                </span>
                              )}
                              {addr.isOutOfZone && (
                                <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-md font-bold">
                                  Ngoài vùng giao
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-stone-700 font-semibold mt-1">
                              {addr.recipientName} · {addr.phone}
                            </p>
                            <p className="text-xs text-stone-600 mt-0.5">
                              {addr.fullAddress}
                            </p>
                            <p className="text-[11px] text-stone-400 mt-0.5">
                              {addr.detail} {addr.note ? `• ${addr.note}` : ''}
                            </p>

                            {addr.isOutOfZone && (
                              <div className="mt-2 p-2 bg-amber-100/70 rounded-lg flex items-start gap-1.5 text-[11px] text-amber-900">
                                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-600" />
                                <span>
                                  Địa chỉ này cách cửa hàng Bloom gần nhất hơn 12km. Vui lòng chọn địa chỉ trong nội thành Nha Trang hoặc chọn Đến lấy tại quán.
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {!addr.isOutOfZone && (
                              <button
                                onClick={() => {
                                  onSelectAddress(addr);
                                  onClose();
                                }}
                                className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                                  isSelected
                                    ? 'bg-rose-600 text-white'
                                    : 'border border-stone-300 text-transparent hover:border-rose-400'
                                }`}
                              >
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              </button>
                            )}

                            <button
                              onClick={() => onDeleteAddress(addr.id)}
                              className="w-6 h-6 rounded-full hover:bg-stone-100 text-stone-400 hover:text-rose-600 flex items-center justify-center transition-colors"
                              title="Xóa địa chỉ"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </>
          ) : (
            /* New Address Form */
            <form onSubmit={handleSaveNewAddress} className="space-y-3.5">
              {formError && (
                <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Label selector */}
              <div>
                <label className="text-[11px] font-bold text-stone-600 uppercase block mb-1.5">
                  Đặt tên địa chỉ
                </label>
                <div className="flex items-center gap-2">
                  {['Nhà riêng', 'Khách sạn / Resort', 'Văn phòng', 'Khác'].map((lbl) => (
                    <button
                      key={lbl}
                      type="button"
                      onClick={() => setFormLabel(lbl)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                        formLabel === lbl
                          ? 'bg-rose-600 text-white'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      {lbl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recipient & Phone */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-stone-600 uppercase block mb-1">
                    Người nhận *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Quỳnh Anh"
                    value={formRecipient}
                    onChange={(e) => setFormRecipient(e.target.value)}
                    className="w-full bg-stone-100 px-3 py-2 rounded-xl text-xs text-stone-800 focus:bg-white focus:ring-2 focus:ring-rose-500/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-stone-600 uppercase block mb-1">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0988 345 219"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full bg-stone-100 px-3 py-2 rounded-xl text-xs text-stone-800 focus:bg-white focus:ring-2 focus:ring-rose-500/20 focus:outline-none"
                  />
                </div>
              </div>

              {/* Full Address */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-bold text-stone-600 uppercase">
                    Địa chỉ (Số nhà, Tên đường, Phường tại Nha Trang) *
                  </label>
                  <button
                    type="button"
                    onClick={handleSimulateGPS}
                    className="text-[11px] font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1"
                  >
                    <Navigation className="w-3 h-3" /> Lấy vị trí
                  </button>
                </div>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: 34 Trần Phú, Phường Lộc Thọ, TP. Nha Trang"
                  value={formAddress}
                  onChange={(e) => setFormAddress(e.target.value)}
                  className="w-full bg-stone-100 px-3 py-2 rounded-xl text-xs text-stone-800 focus:bg-white focus:ring-2 focus:ring-rose-500/20 focus:outline-none"
                />
              </div>

              {/* Detail */}
              <div>
                <label className="text-[11px] font-bold text-stone-600 uppercase block mb-1">
                  Số phòng / Căn hộ / Tên khách sạn
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Phòng 502, Khách sạn Novotel Nha Trang"
                  value={formDetail}
                  onChange={(e) => setFormDetail(e.target.value)}
                  className="w-full bg-stone-100 px-3 py-2 rounded-xl text-xs text-stone-800 focus:bg-white focus:ring-2 focus:ring-rose-500/20 focus:outline-none"
                />
              </div>

              {/* Note for driver */}
              <div>
                <label className="text-[11px] font-bold text-stone-600 uppercase block mb-1">
                  Ghi chú cho tài xế
                </label>
                <input
                  type="text"
                  placeholder="Gửi lễ tân, gọi trước khi đến..."
                  value={formNote}
                  onChange={(e) => setFormNote(e.target.value)}
                  className="w-full bg-stone-100 px-3 py-2 rounded-xl text-xs text-stone-800 focus:bg-white focus:ring-2 focus:ring-rose-500/20 focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="flex-1 py-2.5 rounded-xl border border-stone-200 text-stone-700 text-xs font-bold hover:bg-stone-50"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white text-xs font-bold hover:from-rose-700 hover:to-pink-700 shadow-md transition-all"
                >
                  Lưu địa chỉ
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
