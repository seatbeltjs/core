export interface IRouteConfig {
  type: string;
  path: string;
}

export function Route(config: IRouteConfig) {
  return (classToDecorate: Object|Function) => {

  };
}
