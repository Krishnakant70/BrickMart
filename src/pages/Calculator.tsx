import React, { useState } from 'react';
import { Calculator as CalculatorIcon, RefreshCw, Ruler, Layers, DollarSign, Pickaxe } from 'lucide-react';

// Common US brick size in inches: 8 x 2.25 x 3.75
// With mortar (~0.375 inch), let's say 8.375 x 2.625 face size.
// Square feet of one brick with mortar = (8.375 * 2.625) / 144 = 0.1527 sq ft
// Number of bricks per sq ft = 1 / 0.1527 ≈ 6.55 bricks (Single layer)

const BRICKS_PER_SQ_FT = 6.55;
const MOCK_PRICE_PER_BRICK = 0.85;

export function Calculator() {
  const [length, setLength] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [thickness, setThickness] = useState<string>('single');
  
  const [results, setResults] = useState<{
    totalBricks: number;
    bricksWithWastage: number;
    estimatedCost: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    
    const l = parseFloat(length);
    const h = parseFloat(height);
    
    if (isNaN(l) || isNaN(h) || l <= 0 || h <= 0) {
      return;
    }
    
    const sqFt = l * h;
    const thicknessMultiplier = thickness === 'double' ? 2 : 1;
    
    const baseBricks = Math.ceil(sqFt * BRICKS_PER_SQ_FT * thicknessMultiplier);
    const withWastage = Math.ceil(baseBricks * 1.05); // 5% wastage
    const cost = withWastage * MOCK_PRICE_PER_BRICK;
    
    setResults({
      totalBricks: baseBricks,
      bricksWithWastage: withWastage,
      estimatedCost: cost
    });
  };

  const handleReset = () => {
    setLength('');
    setHeight('');
    setThickness('single');
    setResults(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <CalculatorIcon size={32} />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-4">Smart Brick Calculator</h1>
        <p className="text-lg text-slate-600">
          Estimate the number of building blocks you need for your next structure. Includes 5% standard wastage calculation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Input Form */}
        <div className="lg:col-span-5 bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8">
          <h2 className="text-xl font-bold mb-6 text-slate-900">Project Dimensions</h2>
          
          <form onSubmit={handleCalculate} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <Ruler size={16} className="text-slate-400" /> Wall Length (feet)
              </label>
              <input 
                type="number" 
                required 
                min="0.1" 
                step="0.1"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                placeholder="e.g., 20"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <Ruler size={16} className="text-slate-400" /> Wall Height (feet)
              </label>
              <input 
                type="number" 
                required 
                min="0.1" 
                step="0.1"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                placeholder="e.g., 8"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <Layers size={16} className="text-slate-400" /> Wall Thickness
              </label>
              <select
                value={thickness}
                onChange={(e) => setThickness(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow bg-white"
              >
                <option value="single">Single Layer (Standard)</option>
                <option value="double">Double Layer (Thick)</option>
              </select>
            </div>

            <div className="pt-4 flex gap-4">
              <button
                type="button"
                onClick={handleReset}
                className="flex-[1] flex items-center justify-center gap-2 px-6 py-3 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition font-medium"
              >
                <RefreshCw size={18} /> Reset
              </button>
              <button
                type="submit"
                className="flex-[2] bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-bold transition shadow-sm"
              >
                Calculate Materials
              </button>
            </div>
          </form>
        </div>

        {/* Results */}
        <div className="lg:col-span-7">
          {results ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-8 rounded-2xl border border-slate-100 h-full content-start">
              <div className="sm:col-span-2 mb-2">
                <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-4">Calculation Results</h2>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Base Requirement</p>
                <div className="flex items-end gap-2">
                  <h3 className="text-3xl font-bold text-slate-900">{results.totalBricks.toLocaleString()}</h3>
                  <span className="text-slate-500 font-medium mb-1">bricks</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">Exact coverage area</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-indigo-100 ring-1 ring-indigo-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-10 text-indigo-600">
                  <Pickaxe size={48} />
                </div>
                <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-2">With 5% Wastage</p>
                <div className="flex items-end gap-2 relative z-10">
                  <h3 className="text-3xl font-bold text-slate-900">{results.bricksWithWastage.toLocaleString()}</h3>
                  <span className="text-slate-500 font-medium mb-1">bricks</span>
                </div>
                <p className="text-xs text-slate-500 mt-2 relative z-10">Recommended order quantity</p>
              </div>

              <div className="sm:col-span-2 bg-indigo-600 p-6 rounded-xl shadow-md text-white mt-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-bold text-indigo-200 uppercase tracking-wider mb-1">Estimated Cost</p>
                    <p className="text-xs text-indigo-300">Based on mock rate of ${MOCK_PRICE_PER_BRICK.toFixed(2)}/brick</p>
                  </div>
                  <div className="text-right">
                    <h3 className="text-3xl font-bold flex items-center justify-end font-display">
                      <DollarSign size={24} />
                      {results.estimatedCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 border-dashed h-full min-h-[400px] flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-slate-100 text-slate-300 rounded-full flex items-center justify-center mb-6">
                <Pickaxe size={40} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Ready to Calculate</h3>
              <p className="text-slate-500 max-w-sm">
                Enter your wall dimensions and thickness on the left to estimate the number of bricks required and the total cost.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
