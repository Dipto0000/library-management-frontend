import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Book } from "../../types";

type BorrowRequest = {
  bookId: string;
  quantity: number;
  dueDate: string; // ISO string
};

type BorrowSummaryRow = {
  bookTitle: string;
  isbn?: string;
  totalQuantity: number;
  bookId: string;
};

export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({
    baseUrl:"http://localhost:3000/api",
  }),
  tagTypes: ["Books", "Book", "BorrowSummary"],
  endpoints: (build) => ({
    
    getBooks: build.query<Book[], void>({
      query: () => "/books",
      transformResponse: (response: { success: boolean; message: string; data: Book[] }) => {
        return response.data;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Book" as const, id: _id })),
              { type: "Books", id: "LIST" },
            ]
          : [{ type: "Books", id: "LIST" }],
    }),

    getBook: build.query<Book, string>({
      query: (id) => `/books/${id}`,
      transformResponse: (response: { success: boolean; message: string; data: Book }) => {
        return response.data;
      },
      providesTags: (_result, _error, id) => [{ type: "Book", id }],
    }),

    createBook: build.mutation<Book, Partial<Book>>({
      query: (body) => ({
        url: "/books",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Books", id: "LIST" }],
    }),

    updateBook: build.mutation<Book, { id: string; data: Partial<Book> }>({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Book", id },
        { type: "Books", id: "LIST" },
      ],
    }),

    deleteBook: build.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Books", id: "LIST" }],
    }),

    // Borrow
    borrowBook: build.mutation<{ success: boolean }, BorrowRequest>({
    
      query: (data) => ({
        url: '/borrow',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [
        { type: "Books", id: "LIST" },
        { type: "BorrowSummary", id: "LIST" },
      ],
    }),

    getBorrowSummary: build.query<BorrowSummaryRow[], void>({
      query: () => "/borrow",
      transformResponse: (response: { success: boolean; message: string; data: { book: Book, totalQuantity: number }[] }) => {
        return response.data.map(item => ({
          
          bookId: item.book._id,
          bookTitle: item.book.title,
          isbn: item.book.isbn,
          totalQuantity: item.totalQuantity,
        }));
      },
      providesTags: [{ type: "BorrowSummary", id: "LIST" }],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useGetBorrowSummaryQuery,
} = booksApi;
