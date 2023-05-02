import { Ability } from 'components/BattleMode/Ability';
import { createContext, useState } from 'react';

export type EquippedContextType = {
  equippedAbilities: Ability[];
  changeEquippedList: (changeTo: Ability[]) => void;
};
export const EquippedContext = createContext<EquippedContextType | null>(null);

interface EQProps {
  children: React.ReactNode;
}

export const EquippedProvider = ({ children }: EQProps) => {
  const [equippedAbilities, setEquippedAbilities] = useState<Ability[]>([]);
  const changeEquippedList = (changeTo: Ability[]) => {
    setEquippedAbilities(() => [...changeTo]);
  };
  return (
    <EquippedContext.Provider value={{ equippedAbilities, changeEquippedList }}>{children}</EquippedContext.Provider>
  );
};
