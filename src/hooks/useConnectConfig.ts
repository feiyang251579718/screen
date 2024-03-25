import { useMemo } from 'react';

export default () => {
  const Authorization =
    'Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6Ijg0MjE0Mjk2LTUwMzgtNDNkOC1hNWY1LTQ2MzVkZjM0YWUzMCJ9.RPa8rqEpULBqSEi_MURegS7FOVVVjpFQaWjAcmVv3IGOv5wV4s0-HvMRWv__R4Bcd5QNI8Jvq-Ln9YSyUBn1sw';
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
