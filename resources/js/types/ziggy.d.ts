declare function route(_name?: string, _params?: any, _absolute?: boolean): string;

declare global {
  const route: typeof route;
}

export { route };