import App from "@/App";
import BookDetail from "@/pages/BookDetail";
import BooksList from "@/pages/BookList";
import BorrowBook from "@/pages/BorrowBook";
import BorrowSummary from "@/pages/BorrowSummary";
import CreateBook from "@/pages/CreateBook";
import EditBook from "@/pages/EditBook";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
    
    {
    
        Component: App,
        path: "/",
        children: [
            {
              index: true,
              Component: BooksList,
            },
            {
              path: "books",
              Component: BooksList,
            },
            {
              path: "create-book",
              Component: CreateBook,
            },
            {
              path: "books/:id",
              Component: BookDetail,
            },
            {
              path: "edit-book/:id",
              Component: EditBook,
            },
            {
              path: "borrow/:bookId",
              Component: BorrowBook,
            },
            {
              path: "borrow-summary",
              Component: BorrowSummary,
            },
          ],
      
    }

])