export const MESSAGES = {
  login: {
    lockedOutError: 'Epic sadface: Sorry, this user has been locked out.',
    requiredUsernameError: 'Epic sadface: Username is required',
    requiredPasswordError: 'Epic sadface: Password is required',
    invalidCredentialsError: 'Epic sadface: Username and password do not match any user in this service',
  },
  checkout: {
    requiredFirstNameError: 'Error: First Name is required',
    requiredLastNameError: 'Error: Last Name is required',
    requiredPostalCodeError: 'Error: Postal Code is required',
    successTitle: 'Thank you for your order!',
    successDescription: 'Your order has been dispatched, and will arrive just as fast as the pony can get there!',
  },
} as const;
