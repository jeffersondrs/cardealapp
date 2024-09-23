'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { ResultPageProps, VehicleModel } from '@/types/global.types';

const Loading = () => <div className="text-gray-800">Carregando dados...</div>;

const fetchVehicleModels = async (makeId: string, year: string) => {
  const urlBase = process.env.NEXT_PUBLIC_URL_SEARCH_DATA_BASE;
  const url = urlBase
    ? urlBase.replace('{MAKEID}', makeId).replace('{YEAR}', year)
    : '';

  if (!url) {
    throw new Error('URL base não definida');
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Erro ao buscar os dados');
  }

  const data = await response.json();
  if (data.Results) {
    return data.Results;
  } else {
    return [];
  }
};

const ResultPageContent: React.FC<ResultPageProps> = ({ params }) => {
  const { makeId, year } = params;
  const [models, setModels] = useState<VehicleModel[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vehicleModels = await fetchVehicleModels(makeId, year);
        setModels(vehicleModels);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      }
    };

    fetchData();
  }, [makeId, year]);

  if (error) {
    throw new Error(error);
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-full px-3 pb-5">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 p-5 rounded shadow-md">
        Modelos de Veículos
      </h1>
      {models.length > 0 ? (
        <ul className="p-6 rounded-lg shadow-md w-full sm:max-w-lg">
          {models.map((model) => (
            <li
              key={model.Model_ID}
              className="p-2 border-b text-gray-800 flex flex-row justify-center items-start hover:bg-gray-100 gap-3 last:border-b-0"
            >
              <p className="font-semibold">Modelo:</p>
              <p className="w-full">{model.Model_Name}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-800">Nenhum modelo encontrado.</p>
      )}
    </div>
  );
};

const ResultPage: React.FC<ResultPageProps> = (props) => {
  return (
    <Suspense fallback={<Loading />}>
      <ResultPageContent {...props} />
    </Suspense>
  );
};

export default ResultPage;
