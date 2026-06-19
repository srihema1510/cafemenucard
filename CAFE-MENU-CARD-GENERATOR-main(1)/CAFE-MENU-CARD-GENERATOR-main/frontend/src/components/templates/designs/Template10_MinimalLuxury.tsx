import React from 'react';
import { TemplateProps, TemplateMeta } from '../registry';

export const templateMeta: TemplateMeta = {
  id: 10,
  name: 'Minimal Luxury',
  orientation: 'landscape',
  aspectRatio: '16:9',
  width: 1123,
  height: 794,
};

export default function Template10_MinimalLuxury({ data }: TemplateProps) {
  return (
    <div 
      className="w-full h-full relative flex flex-col items-center"
      style={{ 
        backgroundColor: '#F9F9F9',
        color: '#222222',
        fontFamily: "'Cormorant', serif",
      }}
    >
      <header className="pt-12 pb-8 text-center shrink-0 w-full max-w-4xl border-b border-[#222222]/10 mb-8">
        <h1 className="text-5xl tracking-widest uppercase mb-4">
          {data.cafeName}
        </h1>
      </header>

      <div className="flex-1 w-full max-w-5xl overflow-y-auto px-8 pb-12 scrollbar-hide">
        <div className="columns-3 gap-12">
          {data.categories.map((category) => {
            if (!category.items || category.items.length === 0) return null;
            return (
              <div key={category.id} className="break-inside-avoid mb-10 text-center">
                <h2 className="text-xl uppercase tracking-[0.2em] mb-6 italic text-[#888888]">
                  {category.name}
                </h2>
                <div className="flex flex-col gap-4">
                  {category.items.map((item) => (
                    <div key={item.id} className="flex flex-col items-center">
                      <h3 className="text-lg tracking-wider mb-1 uppercase">{item.item_name}</h3>
                      <span className="text-base text-[#222222]/80">₹{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
