import React, { memo } from 'react';
import BasicInfoProvider from '@/hooks/useBasicInfo/BasicInfoProvider';
import { useQueryBasicInfo } from '@/hooks';

interface IProps {
  children?: React.ReactNode;
}

const Main: React.FC<IProps> = ({ children }) => {
  const { data, refetch } = useQueryBasicInfo();
  return (
    <BasicInfoProvider basicData={data} refetch={refetch}>
      <div className="mainBody">{children}</div>
    </BasicInfoProvider>
  );
};

export default memo(Main);
