import React, { memo, useEffect, useState } from 'react';
import BasicInfoProvider from '@/hooks/useBasicInfo/BasicInfoProvider';
import { connectWS, disconnectWS } from '@/utils';
import { useQueryBasicInfo, useConnectConfig } from '@/hooks';

interface IProps {
  children?: React.ReactNode;
}

const Main: React.FC<IProps> = ({ children }) => {
  const { data, refetch } = useQueryBasicInfo();
  const config = useConnectConfig();
  const [collapse, setCollapse] = useState(false);
  useEffect(() => {
    connectWS(config.Authorization, config.exerciseId);
    return () => {
      disconnectWS();
    };
  }, []);
  return (
    <BasicInfoProvider
      basicData={data}
      refetch={refetch}
      setCollapse={setCollapse}
      collapse={collapse}
    >
      <div className="mainBody">{children}</div>
    </BasicInfoProvider>
  );
};

export default memo(Main);
