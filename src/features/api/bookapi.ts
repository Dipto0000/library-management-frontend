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
    // 📚 Books
    getBooks: build.query<Book[], void>({
      query: () => "/books",
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
      providesTags: (result, error, id) => [{ type: "Book", id }],
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
      invalidatesTags: (result, error, { id }) => [
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
      query: (payload) => ({
        url: "/borrow",
        method: "POST",
        body: payload, 
      }),
      invalidatesTags: [
        { type: "Books", id: "LIST" },
        { type: "BorrowSummary", id: "LIST" },
      ],
    }),

    getBorrowSummary: build.query<BorrowSummaryRow[], void>({
      query: () => "/borrow",
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
