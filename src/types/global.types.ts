export interface VehicleModel {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}

export interface ResultPageProps {
  params: {
    makeId: string;
    year: string;
  };
}
