import { useMemo } from 'react';

export default () => {
  const Authorization =
    'Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjFmNTY0Nzk5LTcwYmUtNDcxNS04Mjg2LWEwM2MwY2QxNzcwMCJ9.5y482FiVCAxX9yCepJTK44Wh_UzM8OnNlDs8j1T6zCIyF26AfiOrcFvRI-EXApsCOQTDagmSfqVH0jOg_ELlMA';
  return useMemo(
    () => ({
      exerciseId: '10000153',
      appId: '10001',
      deviceType: 'PC',
      deviceId: 'bigscreen',
      appKey: '111fbbbac2cd416dba1c11396e6eccd5',
      version: '1.0.0',
      Authorization,
    }),
    [],
  );
};
