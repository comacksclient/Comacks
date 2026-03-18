"use client";

import { MessageCircle } from "lucide-react";

interface ShareReportButtonProps {
  score: number;
  monthlyLoss: number;
  currency: string;
}

export function ShareReportButton({ score, monthlyLoss, currency }: ShareReportButtonProps) {
  const handleShare = () => {
    const shareUrl = window.location.href;
    const formattedLoss = currency === '₹' 
      ? `${currency}${(monthlyLoss / 100000).toFixed(1)}L` 
      : `${currency}${Math.round(monthlyLoss).toLocaleString()}`;

    const text = `I just ran a clinic growth diagnosis for my clinic with Comacks and scored ${score}/100! \n\nIt also showed we may be losing around ${formattedLoss}/month in the patient flow.\n\nYou can test your clinic here:\nhttps://comacks.com/diagnosis\n\nCurious what your clinic score would be.`;

    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <button
      onClick={handleShare}
      className="bg-[#25D366] text-white hover:bg-[#20bd5a] text-[10px] md:text-xs tracking-widest uppercase font-bold px-2.5 sm:px-4 py-2 flex items-center gap-2 transition-colors rounded shadow-[0_0_15px_rgba(37,211,102,0.3)]"
    >
      <MessageCircle className="w-4 h-4" />
      <span className="hidden sm:inline">Share on WhatsApp</span>
    </button>
  );
}
