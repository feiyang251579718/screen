import { useCallback, useState } from 'react';
import { BasicInformation } from '@/types';
import useRequest from '../useRequest';
import { RequestUrl } from '@/utils';
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
        return result;
      },
    );
  }, []);
  return {
    data,
    refetch,
  };
};

export default useBasicInfo;
