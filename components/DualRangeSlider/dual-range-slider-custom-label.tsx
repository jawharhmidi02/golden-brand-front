'use client';

import * as React from 'react';
import { DualRangeSlider } from '@/components/ui/dual-range-slider';
import { useState } from 'react';

const DualRangeSliderCustomLabel = () => {
  const [values, setValues] = useState([0, 10000]);

  return (
    <div className="w-full space-y-5">
      <DualRangeSlider
        label={(value) => <span>{value}$</span>}
        value={values}
        onValueChange={setValues}
        min={0}
        max={10000}
        step={1}
      />
    </div>
  );
};
export default DualRangeSliderCustomLabel;
