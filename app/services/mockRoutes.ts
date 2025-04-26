export type Trip = {
  id: string;
  title: string;
  date: string;
  transport: string;
  stops: {
    name: string;
    coords: [number, number];
  }[];
};

export const mockTrips: Trip[] = [
  {
    id: "1",
    title: "Viagem para o Rio",
    date: "2024-06-10",
    transport: "Ônibus",
    stops: [
      { name: "São Paulo", coords: [-46.6333, -23.5505] },
      { name: "Rio de Janeiro", coords: [-43.1729, -22.9068] },
    ],
  },
  {
    id: "2",
    title: "Férias na Bahia",
    date: "2024-08-20",
    transport: "Avião",
    stops: [
      { name: "São Paulo", coords: [-46.6333, -23.5505] },
      { name: "Salvador", coords: [-38.4817, -12.9718] },
    ],
  },
  {
    id: "3",
    title: "Viagem de Negócios",
    date: "2024-09-15",
    transport: "Carro",
    stops: [
      { name: "São Paulo", coords: [-46.6333, -23.5505] },
      { name: "Belo Horizonte", coords: [-43.9386, -19.9191] },
    ],
  },
  {
    id: "4",
    title: "Aventura na Amazônia",
    date: "2024-11-05",
    transport: "Avião",
    stops: [
      { name: "São Paulo", coords: [-46.6333, -23.5505] },
      { name: "Manaus", coords: [-60.0217, -3.1342] },
    ],
  },
  {
    id: "5",
    title: "Rota dos Vinhos",
    date: "2024-12-01",
    transport: "Carro",
    stops: [
      { name: "São Paulo", coords: [-46.6333, -23.5505] },
      { name: "Bento Gonçalves", coords: [-51.5151, -29.1672] },
    ],
  },
  {
    id: "6",
    title: "Caminho de Santiago",
    date: "2024-07-15",
    transport: "Avião",
    stops: [
      { name: "São Paulo", coords: [-46.6333, -23.5505] },
      { name: "Santiago de Compostela", coords: [-8.5449, 42.8806] },
    ],
  },
  {
    id: "7",
    title: "Viagem ao Nordeste",
    date: "2024-10-10",
    transport: "Ônibus",
    stops: [
      { name: "São Paulo", coords: [-46.6333, -23.5505] },
      { name: "Fortaleza", coords: [-38.5019, -3.7172] },
    ],
  },
  {
    id: "8",
    title: "Expedição Pantanal",
    date: "2024-05-20",
    transport: "Carro",
    stops: [
      { name: "São Paulo", coords: [-46.6333, -23.5505] },
      { name: "Cuiabá", coords: [-56.0969, -15.601] },
    ],
  },
  {
    id: "9",
    title: "Rota das Emoções",
    date: "2024-04-25",
    transport: "Avião",
    stops: [
      { name: "São Paulo", coords: [-46.6333, -23.5505] },
      { name: "Lençóis Maranhenses", coords: [-43.1247, -2.5111] },
    ],
  },
  {
    id: "10",
    title: "Viagem Cultural ao Sul",
    date: "2024-03-30",
    transport: "Carro",
    stops: [
      { name: "São Paulo", coords: [-46.6333, -23.5505] },
      { name: "Porto Alegre", coords: [-51.2294, -30.0346] },
    ],
  },
];

export const getMockRoute = (
  start: [number, number],
  end: [number, number]
) => {
  return {
    distance: Math.random() * 500 + 100, // 100-600 km
    duration: Math.random() * 300 + 60, // 1-6 horas
    coordinates: [
      start,
      [
        start[0] + (end[0] - start[0]) * 0.33,
        start[1] + (end[1] - start[1]) * 0.33,
      ],
      [
        start[0] + (end[0] - start[0]) * 0.66,
        start[1] + (end[1] - start[1]) * 0.66,
      ],
      end,
    ],
  };
};
