export type Book = { 
    title: string;
    author: string;
    genre?: string;
    isbn?: string;
    description?: string;
    copies: number; // integer >= 0
    available: boolean;
    createdAt?: string;
    updatedAt?: string;
  };
  
  export type BorrowRecord = {
    bookId: string;
    quantity: number;
    dueDate: string; // ISO
    createdAt?: string;
  };
  