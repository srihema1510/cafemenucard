import React from 'react';
import { TemplateProps, TemplateMeta } from '../registry';

export const templateMeta: TemplateMeta = {
  id: 9,
  name: 'Creative Board',
  orientation: 'landscape',
  aspectRatio: '16:9',
  width: 1123,
  height: 794,
};

export default function Template09_CreativeBoard({ data }: TemplateProps) {
  return (
    <div 
      className="w-full h-full relative flex flex-row overflow-hidden"
      style={{ 
        backgroundColor: '#2E3A59',
        color: '#FFFFFF',
        fontFamily: "'Jost', sans-serif",
      }}
    >
      <div className="w-1/3 bg-[#FFC107] p-12 text-[#2E3A59] flex flex-col justify-center shrink-0 z-10 shadow-2xl">
        <h1 className="text-6xl font-black uppercase leading-none tracking-tighter mb-4">
          {data.cafeName}
        </h1>
        <p className="text-xl font-medium tracking-wide opacity-80 uppercase">Menu</p>
      </div>

      <div className="flex-1 p-12 overflow-y-auto scrollbar-hide">
        <div className="columns-2 gap-12">
          {data.categories.map((category) => {
            if (!category.items || category.items.length === 0) return null;
            return (
              <div key={category.id} className="break-inside-avoid mb-10">
                <h2 className="text-2xl font-bold uppercase tracking-widest text-[#FFC107] mb-6 border-b-2 border-[#FFC107] pb-2 inline-block">
                  {category.name}
                </h2>
                <div className="flex flex-col gap-4">
                  {category.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-start group">
                      <h3 className="text-lg font-medium">{item.item_name}</h3>
                      <span className="text-lg font-bold ml-4">₹{item.price}</span>
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
