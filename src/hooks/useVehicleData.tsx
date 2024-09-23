'use client';

import { useEffect, useState } from 'react';

interface VehicleProps {
  MakeId: number;
  MakeName: string;
  VehicleTypeId: number;
  VehicleTypeName: string;
}

const useVehicleData = () => {
  const [brands, setBrands] = useState<VehicleProps[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<number | undefined>(
    undefined,
  );
  const [years, setYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | undefined>(
    undefined,
  );
  const [ids, setIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const urlData = process.env.NEXT_PUBLIC_DB_URL_DATA;
        if (!urlData) {
          throw new Error(
            'URL_DATA is not defined in the environment variables',
          );
        }
        const response = await fetch(urlData);
        const data = await response.json();

        const makeNames = data.Results.map((brand: VehicleProps) => ({
          MakeId: brand.MakeId,
          MakeName: brand.MakeName,
        }));

        setIds(data.Results.map((brand: VehicleProps) => brand.MakeId));
        setBrands(makeNames);
      } catch (error) {
        console.error('Erro ao buscar marcas:', error);
      }
    };

    fetchBrands();

    const currentYear = new Date().getFullYear();
    const yearsArray = Array.from(
      { length: currentYear - 2015 + 1 },
      (_, i) => 2015 + i,
    );
    setYears(yearsArray);
  }, []);

  const isNextEnabled =
    selectedBrand !== undefined && selectedYear !== undefined;

  return {
    brands,
    selectedBrand,
    setSelectedBrand,
    years,
    selectedYear,
    setSelectedYear,
    isNextEnabled,
    ids,
  };
};

export default useVehicleData;
