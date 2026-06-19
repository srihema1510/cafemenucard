import React, { useState, useEffect } from 'react';
import { useMenu } from '../hooks/useMenu';
import { useMenuStore } from '../store/menuStore';
import { Store } from 'lucide-react';

export default function Settings() {
  const { updateCafe } = useMenu();
  const cafeInfo = useMenuStore(state => state.cafeInfo);
  
  const [cafeName, setCafeName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (cafeInfo) setCafeName(cafeInfo.cafe_name);
  }, [cafeInfo]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cafeName.trim()) return;
    
    setIsSaving(true);
    setSuccessMsg('');
    
    try {
      updateCafe(cafeName);
      setSuccessMsg('Cafe name updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
        <div className="p-6 border-b border-border bg-muted/30">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Store className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">General Settings</h3>
              <p className="text-sm text-muted-foreground">Manage your cafe's public information</p>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="cafeName" className="text-sm font-medium leading-none text-foreground">
                Cafe Name
              </label>
              <input
                id="cafeName"
                type="text"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={cafeName}
                onChange={(e) => setCafeName(e.target.value)}
                maxLength={100}
                required
              />
              <p className="text-xs text-muted-foreground">
                This name will appear on all your generated menu cards.
              </p>
            </div>

            {successMsg && (
              <div className="text-sm text-green-600 bg-green-50 p-3 rounded-md border border-green-200">
                {successMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={isSaving || cafeName === cafeInfo?.cafe_name}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 disabled:opacity-50 disabled:pointer-events-none"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
