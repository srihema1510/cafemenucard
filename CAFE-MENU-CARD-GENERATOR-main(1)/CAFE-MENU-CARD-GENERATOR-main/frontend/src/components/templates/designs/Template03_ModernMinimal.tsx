import React from 'react';
import { getItemImage } from '../imageHelper';
import { TemplateProps, TemplateMeta } from '../registry';

export const templateMeta: TemplateMeta = {
  id: 3,
  name: 'Botanical Sage Minimalist',
  orientation: 'portrait',
  aspectRatio: '9:16',
  width: 794,
  height: 1123,
};

// Minimal Leaf Motif
const LeafDecor = () => (
  <svg className="t03-leaf-decor" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M 50 35 C 50 35, 42 22, 50 5 C 58 22, 50 35, 50 35 Z"
      fill="#2E4A35"
      opacity="0.15"
    />
    <path
      d="M 50 35 C 50 20, 30 18, 20 22 M 50 25 C 50 15, 70 12, 80 18"
      stroke="#2E4A35"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.4"
    />
  </svg>
);

export default function Template03_ModernMinimal({ data }: TemplateProps) {
  return (
    <div className="t03-root">
      {/* Soft Sage Background & Double Border Frame */}
      <div className="t03-outer-border" />

      {/* Main Content Area */}
      <div className="t03-content">
        <header className="t03-header">
          <LeafDecor />
          <h1 className="t03-title">
            {data.cafeName || 'Coffee House'}
          </h1>
          <div className="t03-header-divider" />
        </header>

        {/* Dynamic Categories */}
        <div className="t03-menu-wrap">
          {data.categories.map((category) => {
            if (!category.items || category.items.length === 0) return null;
            return (
              <div key={category.id} className="t03-menu-section">
                <h2 className="t03-section-heading">{category.name}</h2>
                <div className="t03-items-container">
                  {category.items.map((item) => (
                    <div key={item.id} className="t03-item-row">
                      <div className="t03-item-text">
                        <div className="t03-item-info">
                          <span className="t03-item-name">{item.item_name}</span>
                          <div className="t03-item-line" />
                          <span className="t03-item-price">₹{item.price}</span>
                        </div>
                        <p className="t03-item-desc">
                          A fresh, homemade recipe using local organic ingredients.
                        </p>
                      </div>
                      <img src={getItemImage(item.item_name, category.name)} alt={item.item_name} className="t03-item-image" />
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
