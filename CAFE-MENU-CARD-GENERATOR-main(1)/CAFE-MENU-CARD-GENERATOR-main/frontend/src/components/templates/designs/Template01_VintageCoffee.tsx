import React from 'react';
import './Template01_VintageCoffee.css';
import { TemplateProps, TemplateMeta } from '../registry';
import { getItemImage } from '../imageHelper';

export const templateMeta: TemplateMeta = {
  id: 1,
  name: 'Coffee Menu Vintage',
  orientation: 'portrait',
  aspectRatio: '9:16',
  width: 794,
  height: 1123,
};

// Ornate Victorian Corner SVG
const CornerSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M 5 5 H 90 C 80 5, 70 15, 70 30 C 70 45, 80 50, 60 60 C 40 70, 30 50, 30 30 C 30 10, 10 30, 5 90 V 5" 
      stroke="#6B4226" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <path
      d="M 15 15 H 70 C 60 15, 55 20, 55 30 C 55 40, 40 45, 30 30 C 20 15, 15 45, 15 70 V 15"
      stroke="#6B4226" 
      strokeWidth="1" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeDasharray="2,2"
    />
    <path
      d="M 5 5 L 25 25 M 25 25 Q 35 15, 45 25 T 25 25 Q 15 35, 25 45 T 25 25"
      stroke="#6B4226"
      strokeWidth="1.2"
    />
    <circle cx="30" cy="30" r="3" fill="#6B4226" />
    <circle cx="70" cy="30" r="2" fill="#6B4226" />
    <circle cx="30" cy="70" r="2" fill="#6B4226" />
  </svg>
);

// Ornate Divider SVG
const OrnateDivider = () => (
  <svg className="t01-ornate-divider" viewBox="0 0 400 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M 50 20 C 120 10, 160 10, 180 20 C 190 23, 210 23, 220 20 C 240 10, 280 10, 350 20
         M 200 20 C 190 10, 180 10, 185 20 C 190 30, 210 30, 215 20 C 220 10, 210 10, 200 20"
      stroke="#6B4226"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="200" cy="20" r="3" fill="#6B4226" />
  </svg>
);

export default function Template01_VintageCoffee({ data }: TemplateProps) {
  return (
    <div className="t01-root">
      {/* Victorian Corners */}
      <div className="t01-corner t01-corner--tl"><CornerSVG /></div>
      <div className="t01-corner t01-corner--tr"><CornerSVG /></div>
      <div className="t01-corner t01-corner--bl"><CornerSVG /></div>
      <div className="t01-corner t01-corner--br"><CornerSVG /></div>

      {/* Frame Border */}
      <div className="t01-frame" />

      {/* Content Area */}
      <div className="t01-content">
        {/* Title */}
        <h1 className="t01-title">
          {data.cafeName || 'Coffee House'}
        </h1>

        <div className="t01-subtitle-decor">EST. 2026</div>

        <OrnateDivider />

        {/* Dynamic Categories */}
        <div className="t01-menu-sections">
          {data.categories.map((category) => {
            if (!category.items || category.items.length === 0) return null;
            return (
              <div key={category.id} className="t01-section">
                <div className="t01-section-header">
                  <span className="t01-section-leaf">❧</span>
                  <h2 className="t01-section-title">{category.name}</h2>
                  <span className="t01-section-leaf">❧</span>
                </div>

                <div className="t01-items-list">
                  {category.items.map((item) => (
                    <div key={item.id} className="t01-item-row">
                      <div className="t01-item-text">
                        <div className="t01-item-main">
                          <span className="t01-item-name">{item.item_name}</span>
                          <div className="t01-item-dots" />
                          <span className="t01-item-price">₹{item.price}</span>
                        </div>
                        <p className="t01-item-desc">
                          Freshly prepared selection, crafted with premium quality ingredients.
                        </p>
                      </div>
                      <img 
                        src={getItemImage(item.item_name, category.name)} 
                        alt={item.item_name} 
                        className="t01-item-image"
                      />
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