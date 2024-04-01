import { useMemo } from 'react';

export default () => {
  const Authorization =
    'Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImY2M2YxM2Y2LTA1NDYtNDg5Ny04YjZlLTYyYzU5NzA4YTc0MyJ9.x29JtD59sFzRmJhQaDa0atyzGhYvxJdHW_iTdcJ3M7sN8gVVNbP4qT6koCrjDzb88oFKmBSSsx45endaZu-GCw';
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
