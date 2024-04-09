import { useCallback, useEffect, useState } from 'react';
import { BasicInformation } from '@/types';
import useRequest from '../useRequest';
import { RequestUrl, bus } from '@/utils';
import { useContext } from 'react';
import { ConfigContext } from './BasicInfoProvider';

export const useBasicInfo = () => {
  return useContext(ConfigContext);
};

export const useQueryBasicInfo = () => {
  const [data, setData] = useState<BasicInformation>();
  const { get } = useRequest();
  const refetch = useCallback(() => {
    return get<BasicInformation>(RequestUrl.basicInformation).then(
      (response) => {
        const result = response.data;
        setData(result);
        bus.emit('update:basicInfo', result);
        console.log('send');
        return result;
      },
    );
  }, []);
  useEffect(() => {
    bus.addListener('ws:refresh:resource', () => {
      refetch();
    });
    return () => {
      bus.removeListener('ws:refresh:resource');
    };
  }, []);
  return {
    data,
    refetch,
  };
};

export default useBasicInfo;
