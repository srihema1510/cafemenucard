import React from 'react';
import { TemplateProps, TemplateMeta } from '../registry';

export const templateMeta: TemplateMeta = {
  id: 11,
  name: 'Coffee Branding',
  orientation: 'landscape',
  aspectRatio: '16:9',
  width: 1123,
  height: 794,
};

export default function Template11_CoffeeBranding({ data }: TemplateProps) {
  return (
    <div 
      className="w-full h-full relative flex flex-row"
      style={{ 
        backgroundColor: '#212121',
        color: '#FFFFFF',
        fontFamily: "'Bebas Neue', cursive",
      }}
    >
      <div className="w-1/4 bg-[#D32F2F] flex items-center justify-center p-8 shrink-0 relative overflow-hidden text-center z-10">
        <h1 className="text-7xl leading-[0.85] tracking-wide transform -rotate-90 whitespace-nowrap opacity-90 absolute">
          {data.cafeName}
        </h1>
      </div>

      <div className="flex-1 p-16 overflow-y-auto scrollbar-hide" style={{ fontFamily: "'Inter', sans-serif" }}>
        <div className="columns-2 gap-16">
          {data.categories.map((category) => {
            if (!category.items || category.items.length === 0) return null;
            return (
              <div key={category.id} className="break-inside-avoid mb-12">
                <h2 
                  className="text-4xl text-[#D32F2F] mb-6 tracking-wide"
                  style={{ fontFamily: "'Bebas Neue', cursive" }}
                >
                  {category.name}
                </h2>
                <div className="flex flex-col gap-5">
                  {category.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center group">
                      <h3 className="text-lg font-bold tracking-tight uppercase">{item.item_name}</h3>
                      <div className="flex-1 border-b border-[#FFFFFF]/20 mx-4" />
                      <span className="text-xl font-bold text-[#D32F2F]">₹{item.price}</span>
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
