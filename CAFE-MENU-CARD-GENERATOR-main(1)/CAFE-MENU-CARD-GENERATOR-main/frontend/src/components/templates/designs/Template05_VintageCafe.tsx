import React from 'react';
import { getItemImage } from '../imageHelper';
import './Template05_VintageCafe.css';
import { TemplateProps, TemplateMeta } from '../registry';

export const templateMeta: TemplateMeta = {
  id: 5,
  name: 'Terracotta & Peach',
  orientation: 'portrait',
  aspectRatio: '9:16',
  width: 794,
  height: 1123,
};

// Retro / Modern Wave Ornament
const WaveOrnament = () => (
  <svg className="t05-wave" viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M 0 10 Q 12.5 0, 25 10 T 50 10 T 75 10 T 100 10"
      stroke="#D35400"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export default function Template05_VintageCafe({ data }: TemplateProps) {
  return (
    <div className="t05-root">
      {/* Terracotta Decorative Borders */}
      <div className="t05-terracotta-frame" />
      <div className="t05-terracotta-corners" />

      {/* Content Area */}
      <div className="t05-content">
        <header className="t05-header">
          <WaveOrnament />
          <h1 className="t05-title">
            {data.cafeName || 'Coffee House'}
          </h1>
          <p className="t05-subtitle">FRESHLY SOURCED MENU</p>
          <WaveOrnament />
        </header>

        {/* Dynamic Categories */}
        <div className="t05-menu-sections">
          {data.categories.map((category) => {
            if (!category.items || category.items.length === 0) return null;
            return (
              <div key={category.id} className="t05-section">
                <h2 className="t05-section-title">{category.name}</h2>
                <div className="t05-items-list">
                  {category.items.map((item) => (
                    <div key={item.id} className="t05-item-card">
                      <div className="t05-item-text">
                        <div className="t05-item-header">
                          <span className="t05-item-name">{item.item_name}</span>
                          <div className="t05-item-connector" />
                          <span className="t05-item-price">₹{item.price}</span>
                        </div>
                        <p className="t05-item-desc">
                          Handcrafted with fresh, seasonal selections and modern accents.
                        </p>
                      </div>
                      <img src={getItemImage(item.item_name, category.name)} alt={item.item_name} className="t05-item-image" />
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
