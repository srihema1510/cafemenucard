import React from 'react';
import { TemplateProps, TemplateMeta } from '../registry';

export const templateMeta: TemplateMeta = {
  id: 8,
  name: 'Modern Typography',
  orientation: 'portrait',
  aspectRatio: '9:16',
  width: 794,
  height: 1123,
};

export default function Template08_ModernTypography({ data }: TemplateProps) {
  return (
    <div 
      className="w-full h-full relative flex flex-col"
      style={{ 
        backgroundColor: '#FF4500',
        color: '#FFFFFF',
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      <header className="pt-16 pb-12 px-12 relative z-10 shrink-0">
        <h1 
          className="text-6xl font-black uppercase tracking-tighter leading-none"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          {data.cafeName.split(' ').map((word, i) => (
            <React.Fragment key={i}>
              {word}<br/>
            </React.Fragment>
          ))}
        </h1>
      </header>

      <div className="flex-1 overflow-y-auto px-12 pb-16 relative z-10 flex flex-col gap-12 scrollbar-hide">
        {data.categories.map((category) => {
          if (!category.items || category.items.length === 0) return null;
          return (
            <div key={category.id}>
              <h2 
                className="text-2xl font-bold uppercase tracking-widest mb-6 opacity-80"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {category.name}
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {category.items.map((item) => (
                  <div key={item.id} className="bg-[#FFFFFF]/10 p-4 rounded-lg flex justify-between items-center">
                    <h3 className="text-xl font-bold tracking-wide">{item.item_name}</h3>
                    <span className="text-xl font-black bg-[#FFFFFF] text-[#FF4500] px-3 py-1 rounded">
                      ₹{item.price}
                    </span>
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
