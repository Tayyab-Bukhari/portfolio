'use client';

import { useEffect, useState } from 'react';
import Dropdown from '@/components/common/Dropdown';
import { countries } from '@/data/countries';
import { detectCountry } from '@/hooks/country';

const options = [...countries, 'Other'].map((value) => ({ value }));

/** Country dropdown, pre-selected to where the visitor appears to be. They can change it. */
export default function CountrySelect() {
  const [country, setCountry] = useState('');

  // Keep any choice the visitor has already made.
  useEffect(() => setCountry((current) => current || detectCountry()), []);

  return (
    <Dropdown
      label="Country"
      name="Country"
      options={options}
      placeholder="Select your country"
      searchable
      value={country}
      onChange={setCountry}
    />
  );
}
