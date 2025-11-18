import { useState } from 'react';
import { Share2 } from 'lucide-react';

interface ShareButtonProps {
  onShare: () => Promise<boolean>;
  color?: 'rose' | 'teal' | 'yellow' | 'violet' | 'indigo' | 'blue' | 'green' | 'red' | 'orange';
  className?: string;
}

const colorClasses = {
  rose: {
    bg: 'bg-rose-100 hover:bg-rose-200',
    text: 'text-rose-700',
    icon: 'text-rose-600'
  },
  teal: {
    bg: 'bg-teal-100 hover:bg-teal-200',
    text: 'text-teal-700',
    icon: 'text-teal-600'
  },
  yellow: {
    bg: 'bg-yellow-100 hover:bg-yellow-200',
    text: 'text-yellow-700',
    icon: 'text-yellow-600'
  },
  violet: {
    bg: 'bg-violet-100 hover:bg-violet-200',
    text: 'text-violet-700',
    icon: 'text-violet-600'
  },
  indigo: {
    bg: 'bg-indigo-100 hover:bg-indigo-200',
    text: 'text-indigo-700',
    icon: 'text-indigo-600'
  },
  blue: {
    bg: 'bg-blue-100 hover:bg-blue-200',
    text: 'text-blue-700',
    icon: 'text-blue-600'
  },
  green: {
    bg: 'bg-green-100 hover:bg-green-200',
    text: 'text-green-700',
    icon: 'text-green-600'
  },
  red: {
    bg: 'bg-red-100 hover:bg-red-200',
    text: 'text-red-700',
    icon: 'text-red-600'
  },
  orange: {
    bg: 'bg-orange-100 hover:bg-orange-200',
    text: 'text-orange-700',
    icon: 'text-orange-600'
  }
};

const buttonTexts = {
  default: "Dela din kalkyl",
  copied: "Kopierad!",
  error: "Kunde inte dela"
}

const ShareButton = ({ onShare, color = 'rose', className = '' }: ShareButtonProps) => {
  const [buttonText, setButtonText] = useState(buttonTexts.default);
  const colors = colorClasses[color];

  const handleClick = async () => {
    const success = await onShare();
    if (success) {
      setButtonText(buttonTexts.copied);
      setTimeout(() => setButtonText(buttonTexts.default), 2000);
    } else {
      setButtonText(buttonTexts.error);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full ${colors.bg} ${colors.text} font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center ${className}`}
    >
      <Share2 className={`w-5 h-5 mr-2 ${colors.icon}`} />
      {buttonText}
    </button>
  );
};

export default ShareButton;

