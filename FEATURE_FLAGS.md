# Feature Flag System

This project includes a comprehensive feature flag system that allows you to control the visibility of calculators across different parts of the application, including individual calculator visibility controls.

## Overview

The feature flag system is implemented using React Context and provides:

### General Flags
- `showCalculators`: Controls the visibility of calculators on the main page
- `showCalculatorNavigation`: Controls the visibility of the calculator navigation section
- `showFooterCalculators`: Controls the visibility of calculator links in the footer

### Individual Calculator Flags
- `calculatorVisibility`: An object containing individual visibility flags for each calculator
- Each calculator can be individually shown/hidden across the entire application

## Usage

### Basic Setup

The feature flag system is already integrated into the application. The `FeatureFlagProvider` wraps the entire app in `App.tsx`.

### Setting Initial Values

You can set initial feature flag values when creating the provider:

```tsx
const initialFeatureFlags = {
  showCalculators: true,         // Show calculators on main page
  showCalculatorNavigation: true, // Show calculator navigation
  showFooterCalculators: true,   // Show footer calculator links
  // Hide specific calculators
  calculatorVisibility: {
    'crypto-profit': false,      // Hide crypto calculator
    'meeting-cost': false,       // Hide meeting cost calculator
    // All other calculators will be visible by default
  }
};

<FeatureFlagProvider initialFlags={initialFeatureFlags}>
  {/* Your app content */}
</FeatureFlagProvider>
```

### Using Feature Flags in Components

Import and use the `useFeatureFlag` hook in any component:

```tsx
import { useFeatureFlag } from '../contexts/FeatureFlagContext';

const MyComponent = () => {
  const showCalculators = useFeatureFlag('showCalculators');
  
  return (
    <div>
      {showCalculators ? (
        <CalculatorList />
      ) : (
        <div>Calculators are currently unavailable</div>
      )}
    </div>
  );
};
```

### Managing Feature Flags

Use the `useFeatureFlags` hook to get access to all flags and update functions:

```tsx
import { useFeatureFlags } from '../contexts/FeatureFlagContext';

const AdminPanel = () => {
  const { 
    featureFlags, 
    updateFeatureFlag, 
    toggleFeatureFlag,
    updateCalculatorVisibility,
    toggleCalculatorVisibility,
    isCalculatorVisible,
    getVisibleCalculators,
    getVisibleCalculatorsByCategory
  } = useFeatureFlags();
  
  return (
    <div>
      <button onClick={() => toggleFeatureFlag('showCalculators')}>
        Toggle Calculators
      </button>
      <button onClick={() => updateFeatureFlag('showCalculators', false)}>
        Hide Calculators
      </button>
      <button onClick={() => updateCalculatorVisibility('bmi', false)}>
        Hide BMI Calculator
      </button>
      <button onClick={() => toggleCalculatorVisibility('crypto-profit')}>
        Toggle Crypto Calculator
      </button>
    </div>
  );
};
```

### Working with Individual Calculators

```tsx
import { useFeatureFlags, ALL_CALCULATORS } from '../contexts/FeatureFlagContext';

const CalculatorManager = () => {
  const { getVisibleCalculators, getVisibleCalculatorsByCategory } = useFeatureFlags();
  
  // Get all visible calculators
  const visibleCalculators = getVisibleCalculators();
  
  // Get visible calculators from a specific category
  const healthCalculators = getVisibleCalculatorsByCategory('Hälsa');
  
  return (
    <div>
      <h3>Visible Calculators: {visibleCalculators.length}</h3>
      <h3>Health Calculators: {healthCalculators.length}</h3>
    </div>
  );
};
```

## Testing

A `FeatureFlagControls` component is included for testing purposes. It appears as a floating panel in the bottom-right corner of the application with two tabs:

1. **General Tab**: Toggle the main feature flags (showCalculators, showCalculatorNavigation, showFooterCalculators)
2. **Calculators Tab**: Toggle individual calculator visibility organized by category

The controls show:
- Category headers with visible/total calculator counts
- Expandable categories to show individual calculator toggles
- Real-time updates across the entire application

## Implementation Details

### Files Modified/Created

1. **`src/contexts/FeatureFlagContext.tsx`** - Core feature flag context and provider
2. **`src/App.tsx`** - Updated to use feature flags for main page calculator visibility
3. **`src/components/CalculatorNavigation.tsx`** - Updated to respect `showCalculatorNavigation` flag
4. **`src/components/Footer.tsx`** - Updated to respect `showFooterCalculators` flag
5. **`src/components/FeatureFlagControls.tsx`** - Testing component for toggling flags
6. **`src/components/Layout.tsx`** - Updated to include feature flag controls

### Feature Flag Types

```tsx
interface FeatureFlags {
  showCalculators: boolean;           // Main page calculators
  showCalculatorNavigation: boolean;  // Calculator navigation section
  showFooterCalculators: boolean;     // Footer calculator links
  calculatorVisibility: { [calculatorId: string]: boolean }; // Individual calculator visibility
}

interface CalculatorInfo {
  id: string;        // Unique identifier
  title: string;     // Display name
  path: string;      // Route path
  category: string;  // Category name
  description: string; // Description text
}
```

### Available Calculators

The system includes 26 calculators across 6 categories:

- **Ekonomi** (11 calculators): compound-interest, loan, mortgage, vat, crypto-profit, savings-goal, car-lease, hourly-rate, discount, energy-savings, meeting-cost
- **Hälsa** (6 calculators): bmi, bmr, calorie, weight-reduce, fasting, ovulation
- **Livsstil** (6 calculators): sleep, alcohol, countdown, age, jet-lag, caffeine
- **Träning** (3 calculators): running-pace, race-finish, heart-rate-zones
- **Matlagning** (2 calculators): measurement-converter, cup-converter
- **Produktivitet** (1 calculator): deadline

## Production Usage

For production, you might want to:

1. Remove the `FeatureFlagControls` component from the Layout
2. Set initial feature flag values based on environment variables or API calls
3. Add persistence to localStorage or a backend service
4. Add more granular feature flags for individual calculators

## Examples

### Hiding All Calculators

To hide all calculators across the application:

```tsx
const initialFeatureFlags = {
  showCalculators: false,
  showCalculatorNavigation: false,
  showFooterCalculators: false,
};
```

This will:
- Show a "calculators unavailable" message on the main page
- Hide the calculator navigation section on other pages
- Hide the calculator links in the footer

### Hiding Specific Calculators

To hide only specific calculators while keeping others visible:

```tsx
const initialFeatureFlags = {
  showCalculators: true,
  showCalculatorNavigation: true,
  showFooterCalculators: true,
  calculatorVisibility: {
    'crypto-profit': false,    // Hide crypto calculator
    'meeting-cost': false,     // Hide meeting cost calculator
    'alcohol': false,          // Hide alcohol calculator
    // All other calculators remain visible
  }
};
```

### Hiding Entire Categories

To hide all calculators from specific categories:

```tsx
const initialFeatureFlags = {
  showCalculators: true,
  showCalculatorNavigation: true,
  showFooterCalculators: true,
  calculatorVisibility: {
    // Hide all economy calculators
    'compound-interest': false,
    'loan': false,
    'mortgage': false,
    'vat': false,
    'crypto-profit': false,
    'savings-goal': false,
    'car-lease': false,
    'hourly-rate': false,
    'discount': false,
    'energy-savings': false,
    'meeting-cost': false,
    // Keep all other calculators visible
  }
};
```
