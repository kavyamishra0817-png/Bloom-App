import { Address, MemberProfile, NotificationItem, Order, Product, PromoBanner, Store, Voucher } from '../types';

export const INITIAL_PROFILE: MemberProfile = {
  name: 'Quỳnh Anh',
  phone: '0988 345 219',
  email: 'quynhanh.bloom@gmail.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  tier: 'Bloom Gold',
  spendablePoints: 350,
  tierPoints: 350,
  nextTierThreshold: 500,
  joinedDate: '15/03/2024'
};

export const INITIAL_STORES: Store[] = [
  {
    id: 'store-1',
    name: 'Bloom Flagship Trần Phú (Biển Nha Trang)',
    address: '46 Trần Phú, Phường Lộc Thọ, TP. Nha Trang, Khánh Hòa',
    district: 'Lộc Thọ',
    distance: '0.6 km',
    openHours: '06:30 - 23:00',
    isOpen: true,
    phone: '0258 3822 559',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80',
    lat: 12.2388,
    lng: 109.1967
  },
  {
    id: 'store-2',
    name: 'Bloom Garden Biệt Thự (Phố Tây)',
    address: '24 Biệt Thự, Phường Tân Lập, TP. Nha Trang, Khánh Hòa',
    district: 'Tân Lập',
    distance: '1.2 km',
    openHours: '07:00 - 22:30',
    isOpen: true,
    phone: '0258 3744 123',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80',
    lat: 12.2356,
    lng: 109.1925
  },
  {
    id: 'store-3',
    name: 'Bloom Boutique Thái Nguyên (Ga Nha Trang)',
    address: '92 Thái Nguyên, Phường Phương Sài, TP. Nha Trang, Khánh Hòa',
    district: 'Phương Sài',
    distance: '2.1 km',
    openHours: '07:00 - 22:00',
    isOpen: true,
    phone: '0258 3995 889',
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=600&q=80',
    lat: 12.2482,
    lng: 109.1865
  },
  {
    id: 'store-4',
    name: 'Bloom Beachfront Vinpearl Harbour',
    address: 'Căn A12, Phố đi bộ Vinpearl Harbour, Đảo Hòn Tre, Vĩnh Nguyên, TP. Nha Trang',
    district: 'Vĩnh Nguyên',
    distance: '4.8 km',
    openHours: '08:30 - 22:30',
    isOpen: true,
    phone: '0258 5413 778',
    image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=600&q=80',
    lat: 12.2185,
    lng: 109.2155
  },
  {
    id: 'store-5',
    name: 'Bloom Roastery Đường 2/4 (Tháp Bà)',
    address: '180 Đường 2/4, Phường Vĩnh Phước, TP. Nha Trang, Khánh Hòa',
    district: 'Vĩnh Phước',
    distance: '3.5 km',
    openHours: '07:00 - 22:00',
    isOpen: false, // Tạm đóng để nâng cấp sân vườn
    phone: '0258 3824 112',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80',
    lat: 12.2652,
    lng: 109.1948
  }
];

export const INITIAL_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    label: 'Nhà riêng',
    recipientName: 'Quỳnh Anh',
    phone: '0988 345 219',
    fullAddress: 'Căn 18.06, Tòa The Costa Nha Trang, 32-34 Trần Phú',
    detail: 'Phòng 18.06, Tầng 18',
    note: 'Bấm chuông hoặc gọi trước khi lên',
    isDefault: true,
    isOutOfZone: false
  },
  {
    id: 'addr-2',
    label: 'Văn phòng',
    recipientName: 'Quỳnh Anh (Lễ tân)',
    phone: '0988 345 219',
    fullAddress: 'Tòa nhà Gold Coast Nha Trang, 01 Trần Hưng Đạo, Lộc Thọ',
    detail: 'Tầng 8, Văn phòng Du lịch & Sự kiện',
    note: 'Giao giờ hành chính, để tại bàn lễ tân',
    isDefault: false,
    isOutOfZone: false
  },
  {
    id: 'addr-3',
    label: 'Nhà bạn bè',
    recipientName: 'Minh Thảo',
    phone: '0903 112 455',
    fullAddress: 'Chung cư Scenia Bay, 25-26 Phạm Văn Đồng, Vĩnh Hải',
    detail: 'Căn hộ A-14.02',
    note: 'Gửi quà tặng sinh nhật',
    isDefault: false,
    isOutOfZone: false
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  // COFFEE
  {
    id: 'prod-c1',
    name: 'Bloom Salted Caramel Latte',
    category: 'coffee',
    categoryName: 'Cà phê',
    price: 55000,
    originalPrice: 65000,
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80',
    description: 'Espresso thơm nồng hòa quyện sữa tươi thanh trùng, sốt caramel muối hồng Himalaya và lớp kem béo mịn thơm ngát cánh hoa.',
    isNew: false,
    isBestSeller: true,
    tags: ['Được yêu thích', 'Ít đắng', 'Béo ngậy'],
    calories: 195,
    rating: 4.9,
    reviewsCount: 384,
    optionGroups: [
      {
        id: 'opt-size',
        title: 'Kích cỡ ly',
        required: true,
        type: 'single',
        items: [
          { id: 's-m', name: 'Size Vừa (M)', price: 0, isDefault: true },
          { id: 's-l', name: 'Size Lớn (L)', price: 10000 }
        ]
      },
      {
        id: 'opt-sugar',
        title: 'Lượng đường',
        required: true,
        type: 'single',
        items: [
          { id: 'sug-100', name: '100% đường (Chuẩn vị)', price: 0, isDefault: true },
          { id: 'sug-70', name: '70% đường (Vừa ngọt)', price: 0 },
          { id: 'sug-50', name: '50% đường (Ít ngọt)', price: 0 },
          { id: 'sug-0', name: 'Không đường', price: 0 }
        ]
      },
      {
        id: 'opt-ice',
        title: 'Lượng đá',
        required: true,
        type: 'single',
        items: [
          { id: 'ice-100', name: '100% đá (Chuẩn)', price: 0, isDefault: true },
          { id: 'ice-70', name: '70% đá', price: 0 },
          { id: 'ice-50', name: '50% đá', price: 0 },
          { id: 'ice-0', name: 'Không đá (Ly mát)', price: 0 }
        ]
      },
      {
        id: 'opt-topping',
        title: 'Topping thêm',
        required: false,
        type: 'multiple',
        items: [
          { id: 'top-foam', name: 'Kem Macchiato Hoa Hồng', price: 12000 },
          { id: 'top-boba', name: 'Trân châu trắng giòn', price: 10000 },
          { id: 'top-shot', name: 'Thêm 1 shot Espresso', price: 12000 }
        ]
      }
    ]
  },
  {
    id: 'prod-c2',
    name: 'Cold Brew Dâu Tây Rừng & Vỏ Cam',
    category: 'coffee',
    categoryName: 'Cà phê',
    price: 62000,
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80',
    description: 'Cà phê ủ lạnh 18 tiếng từ hạt Arabica Cầu Đất, kết hợp mứt dâu tây thủ công và hương vỏ cam thanh mát sảng khoái gió biển Nha Trang.',
    isNew: true,
    isBestSeller: false,
    tags: ['Món mới', 'Thanh mát', 'Ít ngọt'],
    calories: 85,
    rating: 4.8,
    reviewsCount: 142,
    optionGroups: [
      {
        id: 'opt-size',
        title: 'Kích cỡ ly',
        required: true,
        type: 'single',
        items: [
          { id: 's-m', name: 'Size Vừa (M)', price: 0, isDefault: true },
          { id: 's-l', name: 'Size Lớn (L)', price: 10000 }
        ]
      },
      {
        id: 'opt-sugar',
        title: 'Lượng ngọt',
        required: true,
        type: 'single',
        items: [
          { id: 'sug-100', name: 'Ngọt thanh (Chuẩn vị)', price: 0, isDefault: true },
          { id: 'sug-50', name: 'Ít ngọt', price: 0 },
          { id: 'sug-0', name: 'Không thêm mật', price: 0 }
        ]
      },
      {
        id: 'opt-ice',
        title: 'Lượng đá',
        required: true,
        type: 'single',
        items: [
          { id: 'ice-100', name: 'Đá viên tròn lớn', price: 0, isDefault: true },
          { id: 'ice-50', name: 'Ít đá', price: 0 }
        ]
      }
    ]
  },
  {
    id: 'prod-c3',
    name: 'Cà Phê Sữa Bột Kem Dừa Nướng',
    category: 'coffee',
    categoryName: 'Cà phê',
    price: 48000,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80',
    description: 'Cà phê sữa pha phin truyền thống thơm đậm đà, phủ lớp sốt kem dừa béo bùi và vụn dừa sấy giòn rụm.',
    isNew: false,
    isBestSeller: true,
    tags: ['Được yêu thích', 'Đậm vị'],
    calories: 220,
    rating: 4.9,
    reviewsCount: 520,
    optionGroups: [
      {
        id: 'opt-size',
        title: 'Kích cỡ ly',
        required: true,
        type: 'single',
        items: [
          { id: 's-m', name: 'Size Vừa (M)', price: 0, isDefault: true },
          { id: 's-l', name: 'Size Lớn (L)', price: 10000 }
        ]
      },
      {
        id: 'opt-sugar',
        title: 'Độ ngọt',
        required: true,
        type: 'single',
        items: [
          { id: 'sug-100', name: 'Ngọt đậm đà', price: 0, isDefault: true },
          { id: 'sug-70', name: 'Giảm ngọt', price: 0 },
          { id: 'sug-50', name: 'Ít ngọt nhiều cà phê', price: 0 }
        ]
      },
      {
        id: 'opt-ice',
        title: 'Lượng đá',
        required: true,
        type: 'single',
        items: [
          { id: 'ice-100', name: '100% đá', price: 0, isDefault: true },
          { id: 'ice-70', name: '70% đá', price: 0 }
        ]
      }
    ]
  },
  {
    id: 'prod-c4',
    name: 'Kyoto Matcha Espresso Fusion',
    category: 'coffee',
    categoryName: 'Cà phê',
    price: 65000,
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80',
    description: 'Matcha Uji hảo hạng từ Nhật Bản kết hợp tầng sữa tươi ngọt dịu và shot espresso đậm chất Ý.',
    isNew: true,
    isBestSeller: false,
    tags: ['Món mới', 'Matcha', 'Hai tầng'],
    calories: 175,
    rating: 4.7,
    reviewsCount: 88,
    optionGroups: [
      {
        id: 'opt-size',
        title: 'Kích cỡ ly',
        required: true,
        type: 'single',
        items: [
          { id: 's-m', name: 'Size Vừa (M)', price: 0, isDefault: true },
          { id: 's-l', name: 'Size Lớn (L)', price: 10000 }
        ]
      },
      {
        id: 'opt-sugar',
        title: 'Lượng đường',
        required: true,
        type: 'single',
        items: [
          { id: 'sug-100', name: 'Chuẩn vị Bloom', price: 0, isDefault: true },
          { id: 'sug-50', name: '50% đường', price: 0 },
          { id: 'sug-0', name: 'Không đường (Đậm matcha)', price: 0 }
        ]
      },
      {
        id: 'opt-ice',
        title: 'Lượng đá',
        required: true,
        type: 'single',
        items: [
          { id: 'ice-100', name: '100% đá', price: 0, isDefault: true },
          { id: 'ice-70', name: '70% đá', price: 0 }
        ]
      }
    ]
  },

  // TEA
  {
    id: 'prod-t1',
    name: 'Trà Oolong Hoa Hồng Vải Thiều Bloom',
    category: 'tea',
    categoryName: 'Trà hoa',
    price: 58000,
    originalPrice: 68000,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80',
    description: 'Cốt trà Oolong thượng hạng ngâm ủ cùng nụ hoa hồng Pháp, trái vải ngọt mọng và thạch cánh hoa mềm mịn.',
    isNew: false,
    isBestSeller: true,
    tags: ['Best Seller', 'Thơm hoa', 'Thanh mát'],
    calories: 110,
    rating: 5.0,
    reviewsCount: 672,
    optionGroups: [
      {
        id: 'opt-size',
        title: 'Kích cỡ ly',
        required: true,
        type: 'single',
        items: [
          { id: 's-m', name: 'Size Vừa (M)', price: 0, isDefault: true },
          { id: 's-l', name: 'Size Lớn (L)', price: 10000 }
        ]
      },
      {
        id: 'opt-sugar',
        title: 'Lượng đường',
        required: true,
        type: 'single',
        items: [
          { id: 'sug-100', name: '100% đường (Chuẩn vị)', price: 0, isDefault: true },
          { id: 'sug-70', name: '70% đường', price: 0 },
          { id: 'sug-50', name: '50% đường (Thơm trà)', price: 0 },
          { id: 'sug-30', name: '30% đường', price: 0 }
        ]
      },
      {
        id: 'opt-ice',
        title: 'Lượng đá',
        required: true,
        type: 'single',
        items: [
          { id: 'ice-100', name: '100% đá', price: 0, isDefault: true },
          { id: 'ice-70', name: '70% đá', price: 0 },
          { id: 'ice-50', name: '50% đá', price: 0 }
        ]
      },
      {
        id: 'opt-topping',
        title: 'Topping thêm',
        required: false,
        type: 'multiple',
        items: [
          { id: 'top-rosejelly', name: 'Thạch Hoa Hồng Bloom', price: 10000 },
          { id: 'top-lychee', name: 'Thêm 2 trái vải tươi', price: 12000 },
          { id: 'top-aloe', name: 'Nha đam giòn tươi', price: 8000 }
        ]
      }
    ]
  },
  {
    id: 'prod-t2',
    name: 'Trà Đào Cam Sả Mật Ong Rừng',
    category: 'tea',
    categoryName: 'Trà hoa',
    price: 52000,
    image: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&w=600&q=80',
    description: 'Trà thanh dịu kết hợp vị chua ngọt tự nhiên của cam vàng, miếng đào giòn ngọt và mùi sả thoang thoảng.',
    isNew: false,
    isBestSeller: true,
    tags: ['Được yêu thích', 'Giải nhiệt'],
    calories: 125,
    rating: 4.8,
    reviewsCount: 310,
    optionGroups: [
      {
        id: 'opt-size',
        title: 'Kích cỡ ly',
        required: true,
        type: 'single',
        items: [
          { id: 's-m', name: 'Size Vừa (M)', price: 0, isDefault: true },
          { id: 's-l', name: 'Size Lớn (L)', price: 10000 }
        ]
      },
      {
        id: 'opt-sugar',
        title: 'Lượng ngọt',
        required: true,
        type: 'single',
        items: [
          { id: 'sug-100', name: 'Chuẩn vị ngọt mật ong', price: 0, isDefault: true },
          { id: 'sug-50', name: '50% ngọt dịu', price: 0 }
        ]
      },
      {
        id: 'opt-ice',
        title: 'Lượng đá',
        required: true,
        type: 'single',
        items: [
          { id: 'ice-100', name: '100% đá mát lạnh', price: 0, isDefault: true },
          { id: 'ice-70', name: '70% đá', price: 0 }
        ]
      }
    ]
  },
  {
    id: 'prod-t3',
    name: 'Trà Sữa Oolong Trân Châu Phô Mai Dẻo',
    category: 'tea',
    categoryName: 'Trà hoa',
    price: 59000,
    image: 'https://images.unsplash.com/photo-1558857563-b37cf5a452ef?auto=format&fit=crop&w=600&q=80',
    description: 'Hương vị trà sữa Oolong rang thơm nồng ngậy sữa tươi, kèm trân châu phô mai dẻo quánh độc quyền Bloom.',
    isNew: false,
    isBestSeller: true,
    tags: ['Đậm đà', 'Béo ngậy'],
    calories: 280,
    rating: 4.9,
    reviewsCount: 440,
    optionGroups: [
      {
        id: 'opt-size',
        title: 'Kích cỡ ly',
        required: true,
        type: 'single',
        items: [
          { id: 's-m', name: 'Size Vừa (M)', price: 0, isDefault: true },
          { id: 's-l', name: 'Size Lớn (L)', price: 10000 }
        ]
      },
      {
        id: 'opt-sugar',
        title: 'Lượng đường',
        required: true,
        type: 'single',
        items: [
          { id: 'sug-70', name: '70% đường (Khuyên dùng)', price: 0, isDefault: true },
          { id: 'sug-100', name: '100% đường', price: 0 },
          { id: 'sug-50', name: '50% đường', price: 0 },
          { id: 'sug-30', name: '30% đường', price: 0 }
        ]
      },
      {
        id: 'opt-ice',
        title: 'Lượng đá',
        required: true,
        type: 'single',
        items: [
          { id: 'ice-100', name: '100% đá', price: 0, isDefault: true },
          { id: 'ice-70', name: '70% đá', price: 0 }
        ]
      }
    ]
  },

  // CAKES
  {
    id: 'prod-k1',
    name: 'Bánh Chiffon Hoa Anh Đào Sakura',
    category: 'cake',
    categoryName: 'Bánh tươi',
    price: 68000,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
    description: 'Signature của Bloom: Cốt bánh chiffon mềm xốp như mây, phủ kem whipping hoa anh đào thơm thảo và dâu tây tươi Đà Lạt.',
    isNew: true,
    isBestSeller: true,
    tags: ['Signature', 'Bánh tươi', 'Mềm xốp'],
    calories: 240,
    rating: 5.0,
    reviewsCount: 420,
    optionGroups: [
      {
        id: 'opt-cake-size',
        title: 'Quy cách bánh',
        required: true,
        type: 'single',
        items: [
          { id: 'slice', name: '1 Miếng tam giác (Slice)', price: 0, isDefault: true },
          { id: 'mini-whole', name: 'Nguyên ổ Mini (12cm)', price: 120000 },
          { id: 'full-whole', name: 'Nguyên ổ Tiệc (18cm - Đặt trước)', price: 280000 }
        ]
      },
      {
        id: 'opt-cake-candle',
        title: 'Phụ kiện tiệc',
        required: false,
        type: 'multiple',
        items: [
          { id: 'acc-candle', name: 'Nến pastel xoắn ốc Bloom (Bộ 6 cây)', price: 15000 },
          { id: 'acc-card', name: 'Thiệp viết tay Bloom Florist', price: 10000 }
        ]
      }
    ]
  },
  {
    id: 'prod-k2',
    name: 'Mousse Matcha Uji & Dâu Tây Tươi',
    category: 'cake',
    categoryName: 'Bánh tươi',
    price: 65000,
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80',
    description: 'Lớp mousse matcha Uji chuẩn Nhật thanh mát xen kẽ nhân mứt dâu tây chua nhẹ trên đế bánh hạnh nhân thơm lừng.',
    isNew: false,
    isBestSeller: true,
    tags: ['Được yêu thích', 'Ít ngọt'],
    calories: 210,
    rating: 4.8,
    reviewsCount: 230,
    optionGroups: [
      {
        id: 'opt-cake-size',
        title: 'Quy cách bánh',
        required: true,
        type: 'single',
        items: [
          { id: 'slice', name: '1 Phần bánh cá nhân', price: 0, isDefault: true },
          { id: 'box2', name: 'Hộp quà 2 bánh Mousse', price: 60000 }
        ]
      }
    ]
  },
  {
    id: 'prod-k3',
    name: 'Croissant Hạnh Nhân Bơ Pháp',
    category: 'cake',
    categoryName: 'Bánh tươi',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
    description: 'Bánh sừng bò nướng mới mỗi sáng từ bơ Elle & Vire Pháp cao cấp, ngập tràn kem hạnh nhân và lát hạnh nhân nướng vàng ruộm.',
    isNew: false,
    isBestSeller: true,
    tags: ['Nướng nóng', 'Giòn tan'],
    calories: 320,
    rating: 4.9,
    reviewsCount: 390,
    optionGroups: [
      {
        id: 'opt-heat',
        title: 'Làm nóng trước khi giao',
        required: true,
        type: 'single',
        items: [
          { id: 'heat-yes', name: 'Nướng nóng giòn ngay', price: 0, isDefault: true },
          { id: 'heat-no', name: 'Để nguội tự nhiên', price: 0 }
        ]
      }
    ]
  },
  {
    id: 'prod-k4',
    name: 'Bánh Tart Trái Cây & Kem Phô Mai Bloom',
    category: 'cake',
    categoryName: 'Bánh tươi',
    price: 55000,
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=600&q=80',
    description: 'Đế tart bơ giòn rụm ôm ấp kem custard phô mai mịn màng cùng mâm xôi, việt quất và kiwi tươi mọng.',
    isNew: true,
    isBestSeller: false,
    tags: ['Món mới', 'Trái cây tươi'],
    calories: 190,
    rating: 4.8,
    reviewsCount: 105,
    optionGroups: [
      {
        id: 'opt-cake-size',
        title: 'Kích cỡ',
        required: true,
        type: 'single',
        items: [
          { id: 'tart-mini', name: '1 Bánh Tart (Đường kính 8cm)', price: 0, isDefault: true },
          { id: 'tart-set3', name: 'Set 3 Bánh Tart Mix vị', price: 100000 }
        ]
      }
    ]
  },

  // GIFTS & SETS
  {
    id: 'prod-g1',
    name: 'Hộp Quà Bloom Blossom Box Cao Cấp',
    category: 'gift',
    categoryName: 'Quà tặng',
    price: 245000,
    originalPrice: 280000,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80',
    description: 'Hộp quà bìa cứng thắt ruy băng hồng pastel: Gồm 6 bánh macaron hoa cỏ, 1 hũ trà hoa hồng sấy thăng hoa và thiệp thư tay Bloom.',
    isNew: true,
    isBestSeller: true,
    tags: ['Quà tặng', 'Sang trọng', 'Thủ công'],
    rating: 5.0,
    reviewsCount: 165,
    optionGroups: [
      {
        id: 'opt-gift-box',
        title: 'Màu hộp & Ruy băng',
        required: true,
        type: 'single',
        items: [
          { id: 'ribbon-pink', name: 'Hồng Phấn Bloom (Signature)', price: 0, isDefault: true },
          { id: 'ribbon-sage', name: 'Xanh Lá Xô Thơm (Sage Green)', price: 0 },
          { id: 'ribbon-white', name: 'Trắng Ngọc Trai Tinh Khôi', price: 0 }
        ]
      },
      {
        id: 'opt-gift-card',
        title: 'Lời chúc in trên thiệp',
        required: false,
        type: 'single',
        items: [
          { id: 'card-bday', name: 'Chúc mừng sinh nhật (Happy Birthday)', price: 0 },
          { id: 'card-love', name: 'Gửi trọn yêu thương (With All My Love)', price: 0 },
          { id: 'card-thank', name: 'Tri ân chân thành (Thank You)', price: 0 }
        ]
      }
    ]
  },
  {
    id: 'prod-g2',
    name: 'Combo Trà Chiều & Bánh Ngọt Afternoon Bliss',
    category: 'gift',
    categoryName: 'Quà tặng',
    price: 105000,
    originalPrice: 126000,
    image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=600&q=80',
    description: 'Combo hoàn hảo cho buổi chiều thư thái ngắm biển Nha Trang: 1 Trà Oolong Hoa Hồng Vải Thiều + 1 Bánh Chiffon Sakura thơm mát.',
    isNew: false,
    isBestSeller: true,
    tags: ['Tiết kiệm 21k', 'Combo trà bánh'],
    rating: 4.9,
    reviewsCount: 280,
    optionGroups: [
      {
        id: 'opt-combo-tea',
        title: 'Chọn lượng ngọt của trà',
        required: true,
        type: 'single',
        items: [
          { id: 'sug-100', name: '100% đường (Chuẩn vị)', price: 0, isDefault: true },
          { id: 'sug-50', name: '50% đường (Ít ngọt)', price: 0 }
        ]
      }
    ]
  },
  {
    id: 'prod-g3',
    name: 'Hộp Bánh Quy Bơ Hoa Cúc Bloom Garden',
    category: 'gift',
    categoryName: 'Quà tặng',
    price: 135000,
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80',
    description: 'Hộp thiếc vintage chứa 16 chiếc bánh quy bơ hảo hạng tạo hình bông hoa với cánh hoa cúc khô ăn được tinh tế.',
    isNew: false,
    isBestSeller: false,
    isOutOfStock: true,
    tags: ['Hết hàng hôm nay', 'Bánh quy bơ'],
    rating: 4.8,
    reviewsCount: 94,
    optionGroups: []
  }
];

export const INITIAL_VOUCHERS: Voucher[] = [
  {
    id: 'vouch-1',
    code: 'BLOOMWELCOME',
    title: 'Giảm 30.000đ chào bạn mới Nha Trang',
    discountType: 'fixed',
    discountValue: 30000,
    minOrder: 99000,
    expiryDate: '30/11/2026',
    description: 'Áp dụng cho mọi đơn hàng từ 99.000đ dành cho thành viên Bloom Cake & Coffee tại các chi nhánh Nha Trang.',
    category: 'product',
    isEligible: true
  },
  {
    id: 'vouch-2',
    code: 'FREESHIP25',
    title: 'Miễn phí giao hàng tới 25k',
    discountType: 'shipping',
    discountValue: 25000,
    minOrder: 120000,
    expiryDate: '15/12/2026',
    description: 'Hỗ trợ tối đa 25.000đ phí giao hàng tận nơi cho đơn hàng từ 120.000đ trong TP. Nha Trang.',
    category: 'shipping',
    isEligible: true
  },
  {
    id: 'vouch-3',
    code: 'SWEETBLOSSOM',
    title: 'Giảm 20% Bánh Tươi & Quà Tặng',
    discountType: 'percent',
    discountValue: 20,
    maxDiscount: 45000,
    minOrder: 150000,
    expiryDate: '05/11/2026',
    description: 'Giảm 20% (tối đa 45.000đ) khi mua các món trong danh mục Bánh tươi và Hộp quà.',
    category: 'product',
    isEligible: true
  },
  {
    id: 'vouch-4',
    code: 'BLOOMVIP50',
    title: 'Ưu đãi Diamond giảm 50.000đ',
    discountType: 'fixed',
    discountValue: 50000,
    minOrder: 250000,
    expiryDate: '28/11/2026',
    description: 'Đặc quyền cho hóa đơn từ 250.000đ. Đơn hiện tại chưa đạt giá trị tối thiểu.',
    category: 'product',
    isEligible: false,
    ineligibleReason: 'Đơn hàng chưa đạt giá trị tối thiểu 250.000đ'
  },
  {
    id: 'vouch-5',
    code: 'AUTUMN15',
    title: 'Ưu đãi Biển Xanh 15k',
    discountType: 'fixed',
    discountValue: 15000,
    minOrder: 80000,
    expiryDate: '10/10/2026',
    description: 'Chương trình ưu đãi trà hoa quả mùa hè tại Nha Trang đã kết thúc hạn sử dụng.',
    category: 'product',
    isEligible: false,
    ineligibleReason: 'Mã ưu đãi đã hết hạn sử dụng vào ngày 10/10/2026'
  }
];

export const INITIAL_BANNERS: PromoBanner[] = [
  {
    id: 'banner-1',
    title: 'Mùa Hoa Nở: Chiffon Sakura Bên Vịnh Biển',
    subtitle: 'Thưởng thức bánh mây bồng bềnh cùng trà hoa ngắm biển',
    tag: 'Đặc sản mùa mới',
    description: 'Lấy cảm hứng từ những cánh hoa đào mùa xuân và làn gió biển Nha Trang, Bloom mang tới dòng bánh Chiffon mềm mịn phủ lớp kem hoa đào thanh khiết kết hợp dâu tây tươi.',
    voucherCode: 'SWEETBLOSSOM',
    accentColor: 'from-pink-500/90 via-rose-500/90 to-emerald-600/90'
  },
  {
    id: 'banner-2',
    title: 'Combo Cà Phê & Bánh Nóng 69k',
    subtitle: 'Khởi đầu ngày mới tràn đầy năng lượng tại Nha Trang',
    tag: 'Ưu đãi giờ vàng',
    description: 'Mỗi sáng từ 06:30 đến 10:30, chọn ngay 1 Cà phê truyền thống hoặc Latte kèm Croissant bơ Pháp nóng giòn chỉ với 69.000đ tại tất cả chi nhánh Nha Trang.',
    voucherCode: 'BLOOMWELCOME',
    accentColor: 'from-emerald-700/95 to-teal-700/90'
  },
  {
    id: 'banner-3',
    title: 'Freeship Nha Trang Đơn Từ 120k',
    subtitle: 'Giao tận nơi nhanh chóng trong 25 phút',
    tag: 'Miễn phí giao hàng',
    description: 'Nhận ngay ưu đãi miễn phí giao hàng bán kính 5km cho mọi đơn bánh & cà phê từ 120.000đ tại TP. Nha Trang. Đảm bảo đồ uống mát lạnh và bánh nguyên vẹn.',
    voucherCode: 'FREESHIP25',
    accentColor: 'from-pink-600/95 via-rose-500 to-emerald-700/95'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'BLM-9842',
    createdAt: 'Hôm nay, 10:15',
    mode: 'delivery',
    status: 'delivering',
    items: [
      {
        id: 'item-1',
        product: INITIAL_PRODUCTS[0],
        selectedOptions: [
          { groupId: 'opt-size', groupTitle: 'Kích cỡ', optionId: 's-m', optionName: 'Size Vừa (M)', price: 0 },
          { groupId: 'opt-sugar', groupTitle: 'Đường', optionId: 'sug-70', optionName: '70% đường', price: 0 },
          { groupId: 'opt-ice', groupTitle: 'Đá', optionId: 'ice-70', optionName: '70% đá', price: 0 }
        ],
        quantity: 1,
        note: 'Cho ống hút giấy giúp mình nhé',
        unitPrice: 55000,
        totalPrice: 55000
      },
      {
        id: 'item-2',
        product: INITIAL_PRODUCTS[4],
        selectedOptions: [
          { groupId: 'opt-cake-size', groupTitle: 'Quy cách', optionId: 'slice', optionName: '1 Miếng tam giác', price: 0 }
        ],
        quantity: 1,
        note: 'Đóng hộp cẩn thận giúp mình',
        unitPrice: 68000,
        totalPrice: 68000
      }
    ],
    subtotal: 123000,
    shippingFee: 22000,
    discount: 25000,
    total: 120000,
    paymentMethod: 'Ví MoMo',
    isPaid: true,
    address: INITIAL_ADDRESSES[0],
    driverInfo: {
      name: 'Nguyễn Văn Tuấn',
      phone: '0938 123 456',
      plateNumber: '79-N1 832.19',
      vehicle: 'Honda Wave Xanh',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    timeline: [
      { title: 'Đã nhận đơn', time: '10:15', done: true, current: false },
      { title: 'Đang chuẩn bị', time: '10:22', done: true, current: false },
      { title: 'Đang giao hàng', time: '10:35', done: true, current: true },
      { title: 'Hoàn tất', time: 'Dự kiến 10:45', done: false, current: false }
    ],
    isReviewed: false
  },
  {
    id: 'ord-102',
    orderNumber: 'BLM-9710',
    createdAt: 'Hôm qua, 15:30',
    mode: 'pickup',
    status: 'completed',
    items: [
      {
        id: 'item-3',
        product: INITIAL_PRODUCTS[3],
        selectedOptions: [
          { groupId: 'opt-size', groupTitle: 'Kích cỡ', optionId: 's-l', optionName: 'Size Lớn (L)', price: 10000 },
          { groupId: 'opt-sugar', groupTitle: 'Đường', optionId: 'sug-50', optionName: '50% đường', price: 0 }
        ],
        quantity: 2,
        note: '',
        unitPrice: 68000,
        totalPrice: 136000
      }
    ],
    subtotal: 136000,
    shippingFee: 0,
    discount: 30000,
    total: 106000,
    paymentMethod: 'Chuyển khoản VietQR',
    isPaid: true,
    store: INITIAL_STORES[0],
    pickupCode: 'NT-18',
    pickupTimeSlot: '15:45 - 16:00',
    timeline: [
      { title: 'Đã nhận đơn', time: '15:30', done: true, current: false },
      { title: 'Đang chuẩn bị', time: '15:34', done: true, current: false },
      { title: 'Sẵn sàng đến lấy', time: '15:42', done: true, current: false },
      { title: 'Đã nhận hàng', time: '15:50', done: true, current: true }
    ],
    isReviewed: true
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Tài xế đang giao đơn hàng BLM-9842',
    message: 'Tài xế Nguyễn Văn Tuấn đang trên đường giao đồ uống tới bạn tại The Costa Nha Trang.',
    time: '5 phút trước',
    type: 'order',
    isRead: false,
    orderId: 'ord-101'
  },
  {
    id: 'notif-2',
    title: 'Tặng bạn voucher 30.000đ chào bạn mới',
    message: 'Mã BLOOMWELCOME đã được thêm vào ví voucher của bạn. Thưởng thức cà phê ngắm biển Nha Trang nhé!',
    time: '2 giờ trước',
    type: 'promo',
    isRead: false
  },
  {
    id: 'notif-3',
    title: 'Bạn nhận được +35 BloomPoints',
    message: 'Điểm thưởng đã được tích lũy thành công từ đơn hàng BLM-9710 tại Bloom Flagship Trần Phú.',
    time: 'Hôm qua',
    type: 'order',
    isRead: true,
    orderId: 'ord-102'
  }
];

export const TIER_BENEFITS = [
  {
    tier: 'Bloom Member',
    color: 'stone',
    requirement: 'Đăng ký tài khoản mới',
    pointsRate: 'Tích 5% giá trị đơn hàng',
    perks: [
      'Tích điểm đổi voucher đồ uống và bánh tươi',
      'Quà tặng sinh nhật voucher 30.000đ',
      'Nhận thông báo ưu đãi ra mắt sản phẩm mới sớm nhất'
    ]
  },
  {
    tier: 'Bloom Gold',
    color: 'emerald',
    requirement: 'Tích lũy từ 300 điểm trong năm',
    pointsRate: 'Tích 8% giá trị đơn hàng',
    perks: [
      'Tất cả quyền lợi của Bloom Member',
      'Miễn phí upsize 1 ly đồ uống mỗi tuần',
      'Tặng 1 phần bánh kem cá nhân ngày sinh nhật',
      'Ưu tiên phục vụ và chuẩn bị món tại cửa hàng'
    ]
  },
  {
    tier: 'Bloom Diamond',
    color: 'rose',
    requirement: 'Tích lũy từ 500 điểm trong năm',
    pointsRate: 'Tích 12% giá trị đơn hàng',
    perks: [
      'Tất cả quyền lợi của Bloom Gold',
      'Miễn phí 4 lượt giao hàng tận nơi mỗi tháng tại Nha Trang',
      'Tặng Gift box quà tặng độc quyền dịp Lễ Tết',
      'Thưởng thức thử nghiệm các món menu mới trước ngày ra mắt'
    ]
  }
];
