interface IConfig {
  mode: string;
  heroTurnInterval: number;
  step: number;
  heroSpeed: number;
  lifeQuantity: number;
  reaperSpeed: number;
  reaperSpawnTime: number;
  reaperSpawnQuantity: number;
  rogueSpeed: number;
  rogueSpawnTime: number;
}

let config: IConfig = {
  mode: "easy",
  heroTurnInterval: 350,
  step: 4,
  heroSpeed: 1,
  lifeQuantity: 10,
  reaperSpeed: 1,
  reaperSpawnTime: 2,
  reaperSpawnQuantity: 2,
  rogueSpeed: 2,
  rogueSpawnTime: 3
};