export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'IACL System'
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  'IACL System - The performance management system for all university and local sellers'

export const SENDER_EMAIL = process.env.SENDER_EMAIL || 'IACL System <no-reply@iacl.com>'

export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 3

export const PAYMENT_METHODS = process.env.PAYMENT_METHODS
  ? process.env.PAYMENT_METHODS.split(", ")
  : ["Card/Paypal" /* 'CashOnDelivery' */];
export const DEFAULT_PAYMENT_METHOD =
  process.env.DEFAULT_PAYMENT_METHOD || 'Card/Paypal'

export const USER_ROLES = process.env.USER_ROLES
  ? process.env.USER_ROLES.split(', ')
  : ['admin', 'user', 'seller']

export const signInDefaultValues = {
  email: '',
  password: '',
}

export const signUpDefaultValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}









