import { useCallback, useState } from 'react';
import { BasicInformation } from '@/types';
import useRequest from '../useRequest';
import { RequestUrl } from '@/utlis';

export const useBasicInfo = () => {
  const [data, setData] = useState<BasicInformation>();
  const { get } = useRequest();
  const refetch = useCallback(() => {
    return get<BasicInformation>(RequestUrl.basicInformation).then(
      (response) => {
        setData(response.data);
      },
    );
  }, []);

  return {
    data,
    refetch,
  };
};
