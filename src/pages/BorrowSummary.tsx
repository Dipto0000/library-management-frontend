import { useGetBorrowSummaryQuery } from "@/features/api/bookapi";

export default function BorrowSummary() {
  const { data, isLoading, isError } = useGetBorrowSummaryQuery();
  console.log(data);

  if (isLoading) return <div>Loading summary…</div>;
  if (isError) return <div>Failed to load summary</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Borrow Summary</h2>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="p-2 text-left">Title</th>
            <th className="p-2 text-left">ISBN</th>
            <th className="p-2 text-left">Total Borrowed</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((row) => (
            <tr key={row.bookId} className="border-t">
              <td className="p-2">{row.bookTitle}</td>
              <td className="p-2">{row.isbn || '-'}</td>
              <td className="p-2">{row.totalQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
