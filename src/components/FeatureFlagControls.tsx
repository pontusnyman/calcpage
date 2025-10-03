import React, { useState } from 'react';
import { useFeatureFlags, ALL_CALCULATORS } from '../contexts/FeatureFlagContext';

const FeatureFlagControls: React.FC = () => {
  const { featureFlags, updateFeatureFlag, updateCalculatorVisibility } = useFeatureFlags();
  const [activeTab, setActiveTab] = useState<'general' | 'calculators'>('general');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const categories = Array.from(new Set(ALL_CALCULATORS.map(calc => calc.category)));

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50 max-w-sm max-h-96 overflow-y-auto">
      <div className="flex space-x-2 mb-3">
        <button
          onClick={() => setActiveTab('general')}
          className={`px-2 py-1 text-xs rounded ${
            activeTab === 'general' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600'
          }`}
        >
          General
        </button>
        <button
          onClick={() => setActiveTab('calculators')}
          className={`px-2 py-1 text-xs rounded ${
            activeTab === 'calculators' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600'
          }`}
        >
          Calculators
        </button>
      </div>

      {activeTab === 'general' && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">General Flags</h3>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={featureFlags.showCalculators}
              onChange={(e) => updateFeatureFlag('showCalculators', e.target.checked)}
              className="rounded"
            />
            <span className="text-xs text-gray-600">Show Calculators</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={featureFlags.showCalculatorNavigation}
              onChange={(e) => updateFeatureFlag('showCalculatorNavigation', e.target.checked)}
              className="rounded"
            />
            <span className="text-xs text-gray-600">Show Calculator Navigation</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={featureFlags.showFooterCalculators}
              onChange={(e) => updateFeatureFlag('showFooterCalculators', e.target.checked)}
              className="rounded"
            />
            <span className="text-xs text-gray-600">Show Footer Calculators</span>
          </label>
        </div>
      )}

      {activeTab === 'calculators' && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Calculator Visibility</h3>
          {categories.map(category => {
            const categoryCalculators = ALL_CALCULATORS.filter(calc => calc.category === category);
            const visibleCount = categoryCalculators.filter(calc => featureFlags.calculatorVisibility[calc.id]).length;
            const isExpanded = expandedCategories.has(category);
            
            return (
              <div key={category} className="border border-gray-200 rounded">
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full px-2 py-1 text-xs text-left bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
                >
                  <span className="font-medium">{category}</span>
                  <span className="text-gray-500">({visibleCount}/{categoryCalculators.length})</span>
                </button>
                {isExpanded && (
                  <div className="p-2 space-y-1">
                    {categoryCalculators.map(calc => (
                      <label key={calc.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={featureFlags.calculatorVisibility[calc.id] ?? true}
                          onChange={(e) => updateCalculatorVisibility(calc.id, e.target.checked)}
                          className="rounded"
                        />
                        <span className="text-xs text-gray-600 truncate" title={calc.title}>
                          {calc.title}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FeatureFlagControls;
