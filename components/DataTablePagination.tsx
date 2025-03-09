import { PAGE_SIZES } from '@/lib/constants';
import type { Pagination } from '@/schemas/params';
import { router } from 'expo-router';
import { DataTable } from 'react-native-paper';

export default function DataTablePagination({ current, count, limit }: Pagination) {
  const from = current * limit;
  const to = Math.min((current + 1) * limit, count);
  const total = Math.ceil(count / limit);

  return (
    <DataTable.Pagination
      page={current}
      numberOfPages={total}
      onPageChange={(page) => {
        router.setParams({ page: page.toString() });
      }}
      label={`${from + 1} - ${to} of ${count}`}
      showFastPaginationControls
      numberOfItemsPerPageList={PAGE_SIZES}
      numberOfItemsPerPage={limit}
      onItemsPerPageChange={(limit) => {
        router.setParams({ limit: limit.toString(), page: '0' });
      }}
      selectPageDropdownLabel={'Rows per page'}
    />
  );
}
