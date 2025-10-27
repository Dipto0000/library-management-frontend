export type Book = { 
    _id: string;
    title: string;
    author: string;
    genre?: string;
    isbn?: string;
    description?: string;
    copies: number; 
    available: boolean;
    createdAt?: string;
    updatedAt?: string;
  };
  
export type BorrowRecord = {
    _id: string;
    bookId: string;
    quantity: number;
    dueDate: string;
    createdAt?: string;
  };
  