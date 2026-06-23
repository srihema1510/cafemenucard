import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useMenuStore } from '../store/menuStore';
import { useMenu } from '../hooks/useMenu';
import { baseTemplates } from '../components/templates/registry';
import { X, Download, Maximize2, Eye, FileText, Sparkles } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import axiosInstance from '../api/axiosInstance';
import { motion, AnimatePresence } from 'framer-motion';

/* ── tiny hook: measures the card container so we can compute the right scale ── */
function useContainerScale(templateWidth: number, templateHeight: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.3);

  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width: cw, height: ch } = entry.contentRect;
      if (cw === 0 || ch === 0) return;
      const s = Math.min(cw / templateWidth, ch / templateHeight);
      setScale(s);
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, [templateWidth, templateHeight]);

  return { ref, scale };
}

/* ── individual template card ── */
function TemplateCard({
  meta,
  TemplateComponent,
  dummyMenuData,
  onClick,
}: {
  meta: any;
  TemplateComponent: React.ComponentType<any>;
  dummyMenuData: any;
  onClick: () => void;
}) {
  const CARD_HEIGHT = 420;          // px – fixed card preview height
  const { ref, scale } = useContainerScale(meta.width, meta.height);

  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ 
        y: -8, 
        boxShadow: '0 20px 35px rgba(107,66,38,.12)',
        borderColor: 'rgba(107,66,38,0.2)'
      }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      style={{
        cursor: 'pointer',
        borderRadius: 16,
        overflow: 'hidden',
        background: '#fff',
        border: '1px solid rgba(0,0,0,.06)',
        boxShadow: '0 2px 12px rgba(107,66,38,.04)',
      }}
    >
      {/* ── Preview area ── */}
      <div
        ref={ref}
        style={{
          position: 'relative',
          height: CARD_HEIGHT,
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #faf6f1 0%, #f0e9df 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* scaled template */}
        <div
          style={{
            width: meta.width,
            height: meta.height,
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
            pointerEvents: 'none',
            flexShrink: 0,
          }}
        >
          <TemplateComponent data={dummyMenuData} />
        </div>

        {/* hover overlay */}
        <motion.div
          whileHover={{ opacity: 1 }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, transparent 40%, rgba(107,66,38,.45) 100%)',
            opacity: 0,
            transition: 'opacity .25s ease',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingBottom: 20,
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(255,255,255,.92)',
              backdropFilter: 'blur(8px)',
              padding: '10px 22px',
              borderRadius: 999,
              fontSize: 13,
              fontWeight: 600,
              color: '#6B4226',
              letterSpacing: '.02em',
              boxShadow: '0 4px 16px rgba(107,66,38,.15)',
            }}
          >
            <Eye size={16} /> Preview & Export
          </span>
        </motion.div>
      </div>

      {/* ── Info strip ── */}
      <div
        style={{
          padding: '14px 18px',
          borderTop: '1px solid rgba(0,0,0,.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <h3
            style={{
              margin: 0,
              fontSize: 15,
              fontWeight: 700,
              color: '#2d1a0e',
              lineHeight: 1.3,
            }}
          >
            {meta.name}
          </h3>
          <p
            style={{
              margin: '2px 0 0',
              fontSize: 12,
              color: '#9a8575',
              textTransform: 'capitalize',
            }}
          >
            {meta.orientation} · {meta.aspectRatio}
          </p>
        </div>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: 'linear-gradient(135deg, #6B4226 0%, #9a6844 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Maximize2 size={16} color="#fff" />
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════ MAIN COMPONENT ══════════════════ */

export default function Templates() {
  const { isLoading } = useMenu();
  const { categories, menuItems, cafeInfo, selectedTemplateId, setSelectedTemplateId } = useMenuStore();
  const [isExporting, setIsExporting] = useState(false);
  
  const selectedTemplate = baseTemplates.find(t => t.meta.id === selectedTemplateId);
  const [activeTab, setActiveTab] = useState('all');

  if (isLoading) {
    return (
      <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: '#6B4226' }}>
        Loading templates…
      </div>
    );
  }

  const realMenuData = {
    cafeName: cafeInfo?.cafe_name || 'My Cafe',
    categories: categories.map(c => ({
      id: c.id,
      name: c.name,
      items: menuItems
        .filter(i => i.category_id === c.id)
        .sort((a, b) => a.display_order - b.display_order)
        .map(i => ({
          id: i.id,
          item_name: i.item_name,
          price: i.price,
        }))
    }))
  };

  const dummyMenuData = {
    cafeName: cafeInfo?.cafe_name || 'Cafe Menu',
    categories: [
      {
        id: 1,
        name: 'Sample Category',
        items: [
          { id: 1, item_name: 'Sample Item 1', price: 4.50 },
          { id: 2, item_name: 'Sample Item 2', price: 5.00 },
          { id: 3, item_name: 'Sample Item 3', price: 6.50 },
        ]
      }
    ]
  };

  const activeCategories = realMenuData.categories
    .filter(c => c.items.length > 0)
    .map(c => c.name.toLowerCase());

  const cleanName = (name: string) => name.toLowerCase().trim().replace(/s$/, '');
  const activeCleaned = activeCategories.map(cleanName);

  const sections: any[] = [
    {
      title: 'Full Menu Templates',
      description: 'Designs displaying all category products together.',
      templates: baseTemplates.map(t => ({ meta: t.meta, component: t.component })),
    }
  ];

  realMenuData.categories.forEach(cat => {
    if (cat.items.length === 0) return;
    const catName = cat.name;
    sections.push({
      title: `${catName} Menu Templates`,
      description: `Designs displaying only ${catName} products.`,
      category: cleanName(catName),
      templates: baseTemplates.map(t => ({
        meta: { ...t.meta, name: `${t.meta.name.split(' ')[0]} ${catName} Menu`, category: cleanName(catName) },
        component: t.component,
      }))
    });
  });

  const tabs = [
    { id: 'all', label: 'All Templates' },
    { id: 'full', label: 'Full Menu' },
    ...realMenuData.categories
      .filter(c => c.items.length > 0)
      .map(c => ({ id: cleanName(c.name), label: `${c.name} Menu`, category: cleanName(c.name) }))
  ];

  const visibleTabs = tabs;

  const visibleSections = sections.filter(sec => {
    if (activeTab === 'all') return true;
    if (activeTab === 'full' && !sec.category) return true;
    if (sec.category && cleanName(sec.category) === activeTab) return true;
    return false;
  });

  /* ── export handler (unchanged logic) ── */
  const handleExport = async () => {
    const printArea = document.getElementById('print-area');
    if (!printArea || !selectedTemplate) return;

    setIsExporting(true);

    const originalTransform = printArea.style.transform;
    printArea.style.transform = 'none';
    await new Promise(resolve => setTimeout(resolve, 50));

    try {
      const canvas = await html2canvas(printArea, {
        scale: 2,
        useCORS: true,
        logging: false,
        width: selectedTemplate.meta.width,
        height: selectedTemplate.meta.height,
      });

      const imgData = canvas.toDataURL('image/jpeg', 1.0);

      const isPortrait = selectedTemplate.meta.orientation === 'portrait';
      const pdf = new jsPDF({
        orientation: isPortrait ? 'p' : 'l',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${cafeInfo?.cafe_name || 'Menu'}_Card.pdf`);

      // Log export
      await axiosInstance.post('/export/log', {
        template_id: selectedTemplate.meta.id.toString(),
        format: 'PDF',
      });
    } catch (err) {
      console.error('Export failed:', err);
      alert('Failed to export PDF.');
    } finally {
      printArea.style.transform = originalTransform;
      setIsExporting(false);
    }
  };

  /* ─────────────────── RENDER ─────────────────── */
  return (
    <div style={{ padding: '0 0 48px' }}>

      {/* ── Page header ── */}
      <div
        style={{
          marginBottom: 32,
          padding: '28px 32px',
          borderRadius: 16,
          background: 'linear-gradient(135deg, #6B4226 0%, #9a6844 60%, #c4956a 100%)',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* decorative circles */}
        <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,.07)' }} />
        <div style={{ position: 'absolute', bottom: -20, right: 60, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,.05)' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <Sparkles size={22} />
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: '-.01em' }}>
            Template Gallery
          </h2>
        </div>
        <p style={{ margin: 0, fontSize: 14, opacity: .85, maxWidth: 480 }}>
          Choose a design, preview it with your real menu data, and export as a print‑ready PDF.
        </p>
        <div
          style={{
            marginTop: 12,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(255,255,255,.15)',
            backdropFilter: 'blur(6px)',
            padding: '6px 14px',
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          <FileText size={14} />
          {baseTemplates.length} templates available
        </div>
      </div>

      {/* ── Navigation Tabs ── */}
      <div 
        style={{ 
          display: 'flex', 
          gap: 12, 
          overflowX: 'auto', 
          paddingBottom: 16, 
          marginBottom: 32,
          borderBottom: '1px solid rgba(107,66,38,.08)',
          scrollbarWidth: 'none',
        }}
      >
        {visibleTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                position: 'relative',
                padding: '10px 20px',
                borderRadius: 999,
                border: 'none',
                background: isActive ? '#6B4226' : 'rgba(107,66,38,.05)',
                color: isActive ? '#fff' : '#6B4226',
                fontWeight: 600,
                fontSize: 14,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                outline: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabGlow"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: 999,
                    background: 'linear-gradient(135deg, #6B4226 0%, #9a6844 100%)',
                    zIndex: -1,
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span style={{ position: 'relative', zIndex: 1 }}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Sections of template cards ── */}
      <motion.div 
        key={activeTab}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{ display: 'flex', flexDirection: 'column', gap: 48 }}
      >
        {visibleSections.map((section, secIdx) => (
          <motion.div 
            key={section.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: secIdx * 0.15, ease: "easeOut" }}
          >
            <div style={{ marginBottom: 20, borderBottom: '2px solid #f0e9df', paddingBottom: 10 }}>
              <h3
                style={{
                  margin: 0,
                  fontSize: 20,
                  fontWeight: 700,
                  color: '#6B4226',
                  letterSpacing: '-.01em',
                }}
              >
                {section.title}
              </h3>
              <p style={{ margin: '4px 0 0', fontSize: 14, color: '#9a8575' }}>
                {section.description}
              </p>
            </div>
            
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: 24,
              }}
            >
              {section.templates.map(({ meta, component: TemplateComponent }: any) => (
                <TemplateCard
                  key={meta.id}
                  meta={meta}
                  TemplateComponent={TemplateComponent}
                  dummyMenuData={dummyMenuData}
                  onClick={() => setSelectedTemplateId(meta.id)}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Full‑screen preview modal ── */}
      <AnimatePresence>
        {selectedTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 50,
              background: 'rgba(0,0,0,.65)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 16,
            }}
          >
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              style={{
                width: '100%',
                maxWidth: 1100,
                height: '90vh',
                background: '#fff',
                borderRadius: 20,
                boxShadow: '0 24px 80px rgba(0,0,0,.3)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              {/* toolbar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 20px',
                  borderBottom: '1px solid rgba(0,0,0,.08)',
                  background: 'linear-gradient(135deg, #faf6f1 0%, #f5efe7 100%)',
                  flexShrink: 0,
                }}
              >
                <div>
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#2d1a0e' }}>
                    {selectedTemplate.meta.name}
                  </h3>
                  <p style={{ margin: '2px 0 0', fontSize: 12, color: '#9a8575' }}>Preview Mode</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button
                    onClick={handleExport}
                    disabled={isExporting}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '10px 20px',
                      borderRadius: 10,
                      border: 'none',
                      background: 'linear-gradient(135deg, #6B4226 0%, #9a6844 100%)',
                      color: '#fff',
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: isExporting ? 'wait' : 'pointer',
                      opacity: isExporting ? .6 : 1,
                      transition: 'opacity .2s',
                    }}
                  >
                    <Download size={15} />
                    {isExporting ? 'Exporting…' : 'Export PDF'}
                  </button>
                  <button
                    onClick={() => setSelectedTemplateId(null)}
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 10,
                      border: '1px solid rgba(0,0,0,.1)',
                      background: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'background .15s',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#f5f5f5'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#fff'; }}
                  >
                    <X size={18} color="#6B4226" />
                  </button>
                </div>
              </div>

              {/* canvas */}
              <div
                style={{
                  flex: 1,
                  overflow: 'auto',
                  background: 'linear-gradient(180deg, #f0ebe4 0%, #e8e0d6 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 32,
                }}
              >
                <div
                  id="print-area"
                  style={{
                    width: selectedTemplate.meta.width,
                    height: selectedTemplate.meta.height,
                    background: '#fff',
                    boxShadow: '0 8px 40px rgba(0,0,0,.15)',
                    overflow: 'hidden',
                    flexShrink: 0,
                    transformOrigin: 'center center',
                    transform: 'scale(min(0.8, calc(100% / 1123)))',
                  }}
                >
                  <selectedTemplate.component data={realMenuData} isExporting={isExporting} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
