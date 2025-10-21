import { useGetBookQuery } from '@/features/api/bookapi';
import { useParams, Link } from 'react-router';

export default function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: book, isLoading } = useGetBookQuery(id!, { skip: !id });

  if (isLoading) return <div>Loading…</div>;
  if (!book) return <div>Book not found</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-2">{book.title}</h2>
      <p className="mb-1"><strong>Author:</strong> {book.author}</p>
      <p className="mb-1"><strong>Genre:</strong> {book.genre || '-'}</p>
      <p className="mb-1"><strong>ISBN:</strong> {book.isbn || '-'}</p>
      <p className="mb-1"><strong>Copies:</strong> {book.copies}</p>
      <p className="mb-4"><strong>Availability:</strong> {book.copies > 0 && book.available ? 'Available' : 'Unavailable'}</p>
      <div className="mb-4">
        <h3 className="font-semibold">Description</h3>
        <p>{book.description || '-'}</p>
      </div>
      <div className="space-x-2">
        <Link to={`/edit-book/${book._id}`} className="px-3 py-1 border rounded">Edit</Link>
        <Link to={`/borrow/${book._id}`} className="px-3 py-1 bg-green-600 text-white rounded">Borrow</Link>
      </div>
    </div>
  );
}
