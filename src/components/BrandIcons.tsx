import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
  active?: boolean;
}

// 1. Home Icon with blooming floral roof
export const IconHome: React.FC<IconProps> = ({ className = 'w-6 h-6', active = false }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3 10.5L12 3.5L21 10.5"
      stroke={active ? '#DB2777' : '#E879A8'}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 9.5V19C5 19.8 5.7 20.5 6.5 20.5H17.5C18.3 20.5 19 19.8 19 19V9.5"
      stroke={active ? '#15803D' : '#16A34A'}
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Blooming petal inside */}
    <path
      d="M12 12C11 13.5 10 15 10 16.5C10 17.6 10.9 18.5 12 18.5C13.1 18.5 14 17.6 14 16.5C14 15 13 13.5 12 12Z"
      fill={active ? '#F43F5E' : '#FDA4AF'}
      stroke="#DB2777"
      strokeWidth="1.2"
    />
    <circle cx="12" cy="7" r="1.5" fill="#15803D" />
  </svg>
);

// 2. Order / Coffee & Beverage Icon with floral steam
export const IconOrder: React.FC<IconProps> = ({ className = 'w-6 h-6', active = false }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Cup body */}
    <path
      d="M4 8H18C18 13.5 15.5 17 11 17C6.5 17 4 13.5 4 8Z"
      stroke={active ? '#15803D' : '#16A34A'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={active ? '#F0FDF4' : 'none'}
    />
    {/* Handle with petal curve */}
    <path
      d="M18 10C19.7 10 21 11.3 21 13C21 14.7 19.7 16 18 16"
      stroke={active ? '#DB2777' : '#F472B6'}
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Base saucer */}
    <path
      d="M2.5 19.5H19.5"
      stroke={active ? '#15803D' : '#86EFAC'}
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Blooming steam curves */}
    <path
      d="M8.5 5C8.5 3.5 9.5 2.5 9.5 2"
      stroke="#DB2777"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M13.5 5.5C13.5 4 14.5 3 14.5 2.5"
      stroke="#F43F5E"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    {/* Floral leaf badge */}
    <circle cx="11" cy="12.5" r="1.8" fill="#DB2777" />
  </svg>
);

// 3. QR Code & Scanner Center Icon
export const IconQR: React.FC<IconProps> = ({ className = 'w-6 h-6', active = false }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Top left corner */}
    <path d="M3 8V5C3 3.9 3.9 3 5 3H8" stroke="#DB2777" strokeWidth="2.4" strokeLinecap="round" />
    {/* Top right corner */}
    <path d="M16 3H19C20.1 3 21 3.9 21 5V8" stroke="#15803D" strokeWidth="2.4" strokeLinecap="round" />
    {/* Bottom left corner */}
    <path d="M3 16V19C3 20.1 3.9 21 5 21H8" stroke="#15803D" strokeWidth="2.4" strokeLinecap="round" />
    {/* Bottom right corner */}
    <path d="M16 21H19C20.1 21 21 20.1 21 19V16" stroke="#DB2777" strokeWidth="2.4" strokeLinecap="round" />

    {/* Center Bloom emblem flourish */}
    <path
      d="M12 7.5C10 9.5 9 10.5 7.5 12C9 13.5 10 14.5 12 16.5C14 14.5 15 13.5 16.5 12C15 10.5 14 9.5 12 7.5Z"
      fill={active ? '#DB2777' : '#F43F5E'}
    />
    <circle cx="12" cy="12" r="1.5" fill="#FFFFFF" />
  </svg>
);

// 4. Store / Boutique Icon
export const IconStore: React.FC<IconProps> = ({ className = 'w-6 h-6', active = false }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Awning stripes */}
    <path
      d="M3 9L4.5 4H19.5L21 9V10C21 11.1 20.1 12 19 12C17.9 12 17 11.1 17 10C17 11.1 16.1 12 15 12C13.9 12 13 11.1 13 10C13 11.1 12.1 12 11 12C9.9 12 9 11.1 9 10C9 11.1 8.1 12 7 12C5.9 12 5 11.1 5 10C5 11.1 4.1 12 3 12C2.4 12 2 11.6 2 11V9H3Z"
      fill={active ? '#FCE7F3' : '#FDF2F8'}
      stroke="#DB2777"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    {/* Body */}
    <path
      d="M4 12V20C4 20.6 4.4 21 5 21H19C19.6 21 20 20.6 20 20V12"
      stroke={active ? '#15803D' : '#16A34A'}
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Arch door */}
    <path
      d="M9 21V15C9 14.2 9.7 13.5 10.5 13.5H13.5C14.3 13.5 15 14.2 15 15V21"
      stroke="#DB2777"
      strokeWidth="1.8"
      fill={active ? '#FDF2F8' : 'none'}
    />
    {/* Hanging plant dot */}
    <circle cx="6.5" cy="15" r="1.5" fill="#15803D" />
  </svg>
);

// 5. Account / Profile Icon
export const IconAccount: React.FC<IconProps> = ({ className = 'w-6 h-6', active = false }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Head circle with flower clip */}
    <circle
      cx="12" cy="8" r="4.5"
      stroke={active ? '#DB2777' : '#F472B6'}
      strokeWidth="2"
      fill={active ? '#FFF1F2' : 'none'}
    />
    {/* Flower in hair */}
    <path
      d="M15 5C15.8 4.2 16.5 4.5 16.5 5.5C16.5 6.5 15.5 7 15 7"
      stroke="#15803D"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    {/* Body shoulders */}
    <path
      d="M4.5 20.5C4.5 16.5 8 14.5 12 14.5C16 14.5 19.5 16.5 19.5 20.5"
      stroke={active ? '#15803D' : '#16A34A'}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// 6. Delivery Scooter Icon with flower speed lines
export const IconDelivery: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Wheels */}
    <circle cx="6" cy="17" r="3" stroke="#DB2777" strokeWidth="2" fill="#FDF2F8" />
    <circle cx="18" cy="17" r="3" stroke="#15803D" strokeWidth="2" fill="#F0FDF4" />
    {/* Chassis */}
    <path
      d="M6 17H11L14 11H17.5"
      stroke="#15803D"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Handlebar & Windshield */}
    <path
      d="M15.5 8L17.5 11H19.5"
      stroke="#DB2777"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Cafe Delivery Bloom Box on back */}
    <rect x="5.5" y="8" width="5" height="5" rx="1.2" stroke="#DB2777" strokeWidth="1.8" fill="#FCE7F3" />
    <path d="M7 10.5H9" stroke="#DB2777" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 7. Pickup Store Icon
export const IconPickup: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Takeaway cup */}
    <path
      d="M7 6H17L15.5 18C15.5 19.1 14.6 20 13.5 20H10.5C9.4 20 8.5 19.1 8.5 18L7 6Z"
      stroke="#15803D"
      strokeWidth="2"
      strokeLinejoin="round"
      fill="#F0FDF4"
    />
    {/* Cup lid */}
    <path d="M6 6H18" stroke="#DB2777" strokeWidth="2" strokeLinecap="round" />
    <path d="M10 3.5H14" stroke="#DB2777" strokeWidth="2" strokeLinecap="round" />
    {/* Heart or Leaf badge on cup */}
    <path
      d="M12 11C11.5 10 10.5 10 10 10.5C9.5 11 9.5 12 10.5 13L12 14.5L13.5 13C14.5 12 14.5 11 14 10.5C13.5 10 12.5 10 12 11Z"
      fill="#DB2777"
    />
  </svg>
);

// 8. Category Icons
export const IconCoffeeBadge: React.FC<IconProps> = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 28 28" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="14" r="13" fill="#FDF2F8" stroke="#FBCFE8" strokeWidth="1.5" />
    <path d="M8 11H18C18 16 16 19 13 19C10 19 8 16 8 11Z" stroke="#DB2777" strokeWidth="2" strokeLinecap="round" fill="#FCE7F3" />
    <path d="M18 12.5C19.5 12.5 20.5 13.5 20.5 15C20.5 16.5 19.5 17.5 18 17.5" stroke="#15803D" strokeWidth="2" strokeLinecap="round" />
    <path d="M6.5 21.5H19.5" stroke="#15803D" strokeWidth="2" strokeLinecap="round" />
    <path d="M11 6C11 4.5 12 3.5 12 3" stroke="#DB2777" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M15 7C15 5.5 16 4.5 16 4" stroke="#16A34A" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const IconTeaBadge: React.FC<IconProps> = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 28 28" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="14" r="13" fill="#F0FDF4" stroke="#BBF7D0" strokeWidth="1.5" />
    <path
      d="M14 6C10 7 7 11 8 16C9 20 13 22 17 21C21 20 22 16 21 11C20 7 17 6 14 6Z"
      stroke="#15803D"
      strokeWidth="2"
      fill="#DCFCE7"
    />
    <path d="M14 8V19" stroke="#15803D" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M14 12C12 11 10.5 11.5 10 12" stroke="#15803D" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M14 15C16 14 17.5 14.5 18 15" stroke="#15803D" strokeWidth="1.5" strokeLinecap="round" />
    {/* Rose accent flower */}
    <circle cx="18" cy="9" r="2.5" fill="#F43F5E" stroke="#DB2777" strokeWidth="1" />
  </svg>
);

export const IconCakeBadge: React.FC<IconProps> = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 28 28" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="14" r="13" fill="#FFF1F2" stroke="#FECDD3" strokeWidth="1.5" />
    {/* Cake slice */}
    <path
      d="M7 18L14 8L21 18H7Z"
      stroke="#DB2777"
      strokeWidth="2"
      strokeLinejoin="round"
      fill="#FCE7F3"
    />
    {/* Cream layers */}
    <path d="M9 15H19" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    <path d="M10.5 12.5H17.5" stroke="#15803D" strokeWidth="1.8" strokeLinecap="round" />
    {/* Cherry on top */}
    <circle cx="14" cy="6.5" r="2" fill="#E11D48" />
    <path d="M14 5C15 3.5 16.5 3.5 17 4" stroke="#15803D" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const IconGiftBadge: React.FC<IconProps> = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 28 28" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="14" r="13" fill="#FDF2F8" stroke="#FBCFE8" strokeWidth="1.5" />
    {/* Box body */}
    <rect x="7" y="11" width="14" height="11" rx="2" stroke="#15803D" strokeWidth="2" fill="#F0FDF4" />
    {/* Lid */}
    <rect x="6" y="9" width="16" height="3.5" rx="1" stroke="#DB2777" strokeWidth="1.8" fill="#FCE7F3" />
    {/* Ribbon cross */}
    <path d="M14 9V22" stroke="#DB2777" strokeWidth="2" />
    {/* Bow curves */}
    <path d="M14 9C12.5 6.5 9 6.5 10.5 9H14Z" fill="#F43F5E" stroke="#DB2777" strokeWidth="1.2" />
    <path d="M14 9C15.5 6.5 19 6.5 17.5 9H14Z" fill="#F43F5E" stroke="#DB2777" strokeWidth="1.2" />
  </svg>
);
