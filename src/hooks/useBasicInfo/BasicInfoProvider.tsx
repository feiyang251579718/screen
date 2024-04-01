import React, { FC, useCallback, useState } from 'react';
import { BasicInformation } from '@/types';
import { omit } from 'lodash';

export interface ConfigProps {
  basicData?: BasicInformation;
  refetch?: () => Promise<BasicInformation>;
  collapse?: boolean;
  setCollapse?: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
}
export const ConfigContext = React.createContext<ConfigProps>({});

const ServiceProvider: FC<ConfigProps> = (props: ConfigProps) => {
  return (
    <ConfigContext.Provider value={{ ...omit(props, ['children']) }}>
      {props.children}
    </ConfigContext.Provider>
  );
};

export default ServiceProvider;
