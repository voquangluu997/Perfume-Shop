export enum VALIDATE_ERROR {
  PASSWORD_WEAK = 'Password must have 8-32 characters, at least 1 upper case and 1 lowercase letter, and at least 1 number and 1 special character',
  NEW_PASSWORD_WEAK = 'New pasword is to weak',
  INVALID_EMAIL = 'Email incorrect! Please check your email and try again',
  EMAIL_CONFLICT = 'Email already exist',
  EXISTS_EMAIL_CODE = '23505',
  PASSWORD_INCORRECT = 'Password incorrect',
  CONFIRM_PASSWORD_FAILED = 'New password and confirm password must be the same',
  CONFLICT_CODE = '23505',
  NOT_MATCHED = 'NOT MATCHED',
  LOGIN_CREDENTIALS = 'Please check your login credentials',
  EMAIL_NOT_FOUND = 'Email is not existed',
  EMAIL_SHOULD_NOT_EMPTY = 'email should not be empty',
  IS_NOT_EMAIL = 'email must be an email',
  PASSWORD_SHOULD_NOT_EMPTY = 'password should not be empty',
  PASSWORD_LENGTH = 'password must be longer than or equal to 8 characters',
}

export enum EXCEPTION_MESSAGE {
  UNAUTHORIZED = 'Please check your login credentials',
  USER_NOTFOUND = 'User not found',
  GET_AUTHORS_FAIL = 'Failed to get authors',
  CREATE_AUTHOR_FAIL = 'Failed to create author',
  GET_CATEGORIES_FAIL = 'Failed to get categories',
  CREATE_CATEGORY_FAIL = 'Failed to get category',
  GET_BOOKS_FAIL = 'Failed to get books',
  CREATE_BOOK_FAIL = 'Failed to create book',
  CATEGORY_CONFLICT = 'category already exists',
  BOOK_CONFLICT = 'book already exists',
  CATEGORY_NOT_FOUND = 'category not found',
  AUTHOR_NOT_FOUND = 'author not found',
  BOOK_NOT_FOUND = 'Book not found',
  QUERY_FAIL = 'Query failed, please check your query',
}

export enum SUCCESS_MESSAGE {
  PASSWORD_CONFIRM_SUCCESSFULY = 'Update password succesfuly',
}