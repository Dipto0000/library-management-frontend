/* eslint-disable @typescript-eslint/no-unused-vars */
import { useBorrowBookMutation, useGetBookQuery } from '@/features/api/bookapi';
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';

export default function BorrowBook() {
  const { bookId } = useParams<{ bookId: string }>();
  const { data: book, isLoading } = useGetBookQuery(bookId!, { skip: !bookId });
  const [borrowBook, { isLoading: borrowing }] = useBorrowBookMutation();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7); 
    return d.toISOString().slice(0, 10);
  });

  if (isLoading) return <div>Loading…</div>;
  if (!book) return <div>Book not found</div>;

  const max = book.copies;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (quantity <= 0 || quantity > max) {
      alert(`Quantity must be between 1 and ${max}`);
      return;
    }

    try {
      await borrowBook({
        bookId: book._id,
        quantity,
        dueDate,
      }).unwrap();

      alert('Borrow successful');
      navigate('/borrow-summary');
    } catch (err) {
      console.error(err);
      alert('Failed to borrow');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-3">Borrow: {book.title}</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label>Quantity (available: {book.copies})</label>
          <input
            type="number"
            value={quantity}
            min={1}
            max={book.copies}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full p-2 border"
          />
        </div>

        <div>
          <label>Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-2 border"
          />
        </div>

        <div className="space-x-2">
          <button
            type="submit"
            disabled={borrowing}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            {borrowing ? 'Borrowing…' : 'Borrow'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/books')}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
