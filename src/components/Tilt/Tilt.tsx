import { Children, FC, useEffect, useRef } from 'react';
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
  return <div ref={tilt}>{children}</div>;
};
