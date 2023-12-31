declare module '*.svg?url' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  import { ComponentType, SVGProps } from 'react';
  export const ReactComponent: ComponentType<SVGProps<SVGSVGElement>>;

  const src: string;
  export default src;
}