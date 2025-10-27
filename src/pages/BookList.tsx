/* eslint-disable @typescript-eslint/no-unused-vars */

import { Link, useNavigate } from 'react-router';
import type { Book } from '../types';
import { useDeleteBookMutation, useGetBooksQuery } from '@/features/api/bookapi';

export default function BooksList() {
  const { data: books, isLoading, isError } = useGetBooksQuery();
  const [deleteBook, { isLoading: deleting }] = useDeleteBookMutation();
  const navigate = useNavigate();

  if (isLoading) return <div>Loading books…</div>;
  if (isError) return <div>Error loading books</div>;

  const onDelete = async (id: string) => {
    const ok = window.confirm('Are you sure you want to delete this book?');
    if (!ok) return;
    try {
      await deleteBook(id).unwrap();
      
    } catch (err) {
      alert('Failed to delete');
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">All Books</h2>
        <div>
          <Link to="/create-book" className="px-3 py-1 bg-blue-600 text-white rounded">Add Book</Link>
          <Link to="/borrow-summary" className="ml-2 px-3 py-1 border rounded">Borrow Summary</Link>
        </div>
      </div>

      <table className="min-w-full border-collapse">
        <thead>
          <tr className="text-left">
            <th className="p-2">Title</th>
            <th className="p-2">Author</th>
            <th className="p-2">Genre</th>
            <th className="p-2">ISBN</th>
            <th className="p-2">Copies</th>
            <th className="p-2">Availability</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books?.map((b: Book) => (
            <tr key={b._id} className="border-t">
              <td className="p-2">{b.title}</td>
              <td className="p-2">{b.author}</td>
              <td className="p-2">{b.genre || '-'}</td>
              <td className="p-2">{b.isbn || '-'}</td>
              <td className="p-2">{b.copies}</td>
              <td className="p-2">{b.copies > 0 && b.available ? 'Available' : 'Unavailable'}</td>
              <td className="p-2 space-x-2">
                <button onClick={() => navigate(`/books/${b._id}`)} className="px-2 py-1 border rounded">View</button>
                <button onClick={() => navigate(`/edit-book/${b._id}`)} className="px-2 py-1 border rounded">Edit</button>
                <button onClick={() => navigate(`/borrow/${b._id}`)} className="px-2 py-1 border rounded">Borrow</button>
                <button onClick={() => onDelete(b._id)} disabled={deleting} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
