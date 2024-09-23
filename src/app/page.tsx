'use client';

import { useRouter } from 'next/navigation';
import useVehicleData from '@/hooks/useVehicleData';

const HomePage = () => {
  const router = useRouter();
  const {
    brands,
    selectedBrand,
    setSelectedBrand,
    years,
    selectedYear,
    setSelectedYear,
    isNextEnabled,
  } = useVehicleData();

  const handleNext = () => {
    if (isNextEnabled) {
      router.push(`/result/${selectedBrand}/${selectedYear}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-3">
      <h1 className="text-2xl font-bold mb-6 text-blue-500">Vehicle Filter</h1>
      <div className="w-full bg-white p-6 rounded-lg shadow-md max-w-xl">
        <label className="block mb-2 text-gray-800" htmlFor="brand-selector">
          Marca:
        </label>
        <select
          id="brand-selector"
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(Number(e.target.value))}
          className="w-full p-2 border rounded text-gray-800"
        >
          <option value="" className="text-gray-800">
            Selecione uma marca
          </option>
          {brands.map((brand) => (
            <option
              key={brand.MakeId}
              value={brand.MakeId}
              className="text-gray-800"
            >
              {brand.MakeName}
            </option>
          ))}
        </select>

        <label
          className="block mb-2 mt-4 text-gray-800"
          htmlFor="year-selector"
        >
          Ano Modelo:
        </label>
        <select
          id="year-selector"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="w-full p-2 border rounded text-gray-800"
        >
          <option value="" className="text-gray-800">
            Selecione um ano
          </option>
          {years.map((year) => (
            <option key={year} value={year} className="text-gray-800">
              {year}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={handleNext}
          className={`mt-6 w-full p-2 text-white bg-blue-500 rounded ${isNextEnabled ? 'hover:bg-blue-600' : 'bg-blue-300 cursor-not-allowed'}`}
          disabled={!isNextEnabled}
        >
          Próximo
        </button>
      </div>
    </div>
  );
};

export default HomePage;
