import { Children, FC, useEffect, useRef } from 'react';
import { transform } from 'typescript';
import VanillaTilt from 'vanilla-tilt';

interface TiltProps {
  children: React.ReactNode;
  optionsProp: any;
}
export const Tilt: FC<TiltProps> = ({ children, optionsProp }) => {
  const options = optionsProp;
  const tilt = useRef<any>(null);
  useEffect(() => {
    VanillaTilt.init(tilt.current, options);
  }, [options]);
  return (
    <div style={{ transformStyle: 'preserve-3d' }} ref={tilt}>
      {children}
    </div>
  );
};
