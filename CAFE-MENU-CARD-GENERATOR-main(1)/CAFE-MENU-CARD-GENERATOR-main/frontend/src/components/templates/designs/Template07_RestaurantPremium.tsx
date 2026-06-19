import React from 'react';
import { TemplateProps, TemplateMeta } from '../registry';

export const templateMeta: TemplateMeta = {
  id: 7,
  name: 'Restaurant Premium',
  orientation: 'portrait',
  aspectRatio: '9:16',
  width: 794,
  height: 1123,
};

export default function Template07_RestaurantPremium({ data }: TemplateProps) {
  return (
    <div 
      className="w-full h-full relative flex flex-col"
      style={{ 
        backgroundColor: '#1E293B',
        color: '#F8FAFC',
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0F172A] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0F172A] to-transparent pointer-events-none" />

      <header className="pt-24 pb-12 text-center px-12 relative z-10 shrink-0">
        <h1 
          className="text-4xl tracking-widest uppercase text-[#38BDF8]"
          style={{ fontFamily: "'EB Garamond', serif" }}
        >
          {data.cafeName}
        </h1>
        <div className="h-0.5 w-24 bg-[#38BDF8] mx-auto mt-6" />
      </header>

      <div className="flex-1 overflow-y-auto px-16 pb-20 relative z-10 flex flex-col gap-10 scrollbar-hide">
        {data.categories.map((category) => {
          if (!category.items || category.items.length === 0) return null;
          return (
            <div key={category.id}>
              <h2 className="text-xl font-medium uppercase tracking-[0.2em] mb-6 text-center text-[#94A3B8]">
                {category.name}
              </h2>
              <div className="flex flex-col gap-6">
                {category.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center group">
                    <h3 className="text-lg font-light tracking-wide">{item.item_name}</h3>
                    <div className="flex-1 border-b border-[#334155] mx-4" />
                    <span className="text-lg font-medium text-[#38BDF8]">₹{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
