/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCreateBookMutation } from '@/features/api/bookapi';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

export default function CreateBook() {
  const [form, setForm] = useState({
    title: '',
    author: '',
    genre: 'FICTION',
    isbn: '',
    description: '',
    copies: 1,
    available: true,
  });

  const [createBook, { isLoading }] = useCreateBookMutation();
  const navigate = useNavigate();

  const genres = [
    'FICTION',
    'NON_FICTION',
    'SCIENCE',
    'HISTORY',
    'BIOGRAPHY',
    'FANTASY',
  ];

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.author) {
      alert('Title and author are required');
      return;
    }
    try {
      await createBook(form).unwrap();
      navigate('/books');
    } catch (err) {
      alert('Failed to create book');
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add New Book</h2>

      <form onSubmit={onSubmit} className="space-y-4">
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Title"
          className="w-full p-2 border rounded"
          required
        />

        <input
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          placeholder="Author"
          className="w-full p-2 border rounded"
          required
        />

        <select
          value={form.genre}
          onChange={(e) => setForm({ ...form, genre: e.target.value })}
          className="w-full p-2 border rounded bg-white"
        >
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        <input
          value={form.isbn}
          onChange={(e) => setForm({ ...form, isbn: e.target.value })}
          placeholder="ISBN"
          className="w-full p-2 border rounded"
        />

        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Description"
          className="w-full p-2 border rounded"
        />

        <div className="flex items-center space-x-4">
          <input
            type="number"
            value={form.copies}
            min={0}
            onChange={(e) =>
              setForm({ ...form, copies: Number(e.target.value) })
            }
            className="w-32 p-2 border rounded"
          />

          <label className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              checked={form.available}
              onChange={(e) =>
                setForm({ ...form, available: e.target.checked })
              }
            />
            <span>Available</span>
          </label>
        </div>

        <div className="flex space-x-3 pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Creating...' : 'Create'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/books')}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
