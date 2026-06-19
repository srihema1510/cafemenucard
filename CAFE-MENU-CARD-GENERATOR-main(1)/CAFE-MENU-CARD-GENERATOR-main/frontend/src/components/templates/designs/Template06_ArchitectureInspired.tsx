import React from 'react';
import { getItemImage } from '../imageHelper';
import './Template06_ArchitectureInspired.css';
import { TemplateProps, TemplateMeta } from '../registry';

export const templateMeta: TemplateMeta = {
  id: 6,
  name: 'Cyberpunk & Mono Bold',
  orientation: 'portrait',
  aspectRatio: '9:16',
  width: 794,
  height: 1123,
};

export default function Template06_ArchitectureInspired({ data }: TemplateProps) {
  return (
    <div className="t06-root">
      {/* Sleek Industrial Double Corner Marks */}
      <div className="t06-corner-mark t06-corner-mark--tl" />
      <div className="t06-corner-mark t06-corner-mark--tr" />
      <div className="t06-corner-mark t06-corner-mark--bl" />
      <div className="t06-corner-mark t06-corner-mark--br" />

      {/* Frame Border */}
      <div className="t06-industrial-frame" />

      {/* Content */}
      <div className="t06-content">
        <header className="t06-header">
          <div className="t06-brand-badge">SYSTEM.V1</div>
          <h1 className="t06-title">
            {data.cafeName || 'Coffee House'}
          </h1>
          <p className="t06-subtitle">// URBAN REFRESHMENT SYSTEM</p>
        </header>

        {/* Dynamic Categories */}
        <div className="t06-sections-wrap">
          {data.categories.map((category) => {
            if (!category.items || category.items.length === 0) return null;
            return (
              <div key={category.id} className="t06-section-block">
                <div className="t06-section-header">
                  <span className="t06-section-dot" />
                  <h2 className="t06-section-name">{category.name}</h2>
                </div>

                <div className="t06-items-list">
                  {category.items.map((item) => (
                    <div key={item.id} className="t06-item-node">
                      <div className="t06-item-text">
                        <div className="t06-item-header">
                          <span className="t06-item-title">{item.item_name}</span>
                          <div className="t06-item-line" />
                          <span className="t06-item-price">₹{item.price}</span>
                        </div>
                        <p className="t06-item-desc">
                          [PREMIUM FORMULATION] Handcrafted with top-tier components.
                        </p>
                      </div>
                      <img src={getItemImage(item.item_name, category.name)} alt={item.item_name} className="t06-item-image" />
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
