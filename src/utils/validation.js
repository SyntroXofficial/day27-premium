export const validateEmail = (email) => {
  if (!email) {
    return { isValid: false, error: 'Email is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Invalid email format' };
  }

  const supportedDomains = [
    'gmail.com',
    'hotmail.com',
    'proton.me',
    'protonmail.com'
  ];

  const domain = email.split('@')[1]?.toLowerCase();
  if (!supportedDomains.includes(domain)) {
    return {
      isValid: false,
      error: 'Only Gmail, Hotmail, and ProtonMail accounts are supported'
    };
  }

  return { isValid: true, error: null };
};