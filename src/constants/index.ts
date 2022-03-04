import { Perfume } from './../perfume/perfume.entity';
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
  GET_PERFUMES_FAIL = 'Failed to get perfumes',
  CREATE_PERFUME_FAIL = 'Failed to create perfume',
  CATEGORY_CONFLICT = 'category already exists',
  PERFUME_CONFLICT = 'perfume already exists',
  BRAND_NOT_FOUND = 'brand not found',
  FRAGRANCE_NOT_FOUND = 'fragrance not found',
  PERFUME_NOT_FOUND = 'Perfume not found',
  QUERY_FAIL = 'Query failed, please check your query',
}

export enum SUCCESS_MESSAGE {
  PASSWORD_CONFIRM_SUCCESSFULY = 'Update password succesfuly',
}

export enum PERFUMES {
  GET_ALL_FAILED = 'GET_ALL_FAILED',
}

export enum ERROR {
  REVIEW_GET_ALL_FAILED = 'REVIEW_GET_ALL_FAILED',
  ALREADY_REVIEW = 'ALREADY_REVIEW',
  PERFUME_NOT_FOUND = 'PERFUME_NOT_FOUND',
  BRAND_NOT_FOUND = 'BRAND_NOT_FOUND',
  FRAGRANCE_NOT_FOUND = 'FRAGRANCE_NOT_FOUND',
  ADD_FRAGRANCE_ERROR = 'ERROR.ADD_FRAGRANCE_ERROR',
  ADD_BRAND_ERROR = 'ADD_BRAND_ERROR',
  GET_FRAGRANCES_FAILED = 'GET_FRAGRANCES_FAILED',
  GET_BRANDS_FAILED = 'GET_BRANDS_FAILED',
  REVIEW_IS_EMPTY = 'REVIEW_IS_EMPTY',
  USER_NOT_FOUND = 'USER_NOT_FOUND',

  SERVER_ERROR = 'SERVER_ERROR',
  ADD_CART_FAIELD = 'ADD_CART_FAILED',
  UPDATE_CART_FAIELD = 'UPDATE_CART_FAILED',
  UPDATE_FAILED = 'UPDATE_FAILED',
  ADD_BOOKING_FAILED = 'ADD_BOOKING_FAILED',
  BOOKING_NO_ITEM = 'BOOKING_NO_ITEM',
}
