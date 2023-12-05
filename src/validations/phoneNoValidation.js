export const validatePhoneNumber = (phoneNumber) => {
  // Regular expression for Sri Lankan phone numbers
  const phoneRegex = /^(?:\+94|0)([1-9][0-9]{7})$/;
  // setIsValid(!phoneRegex.test(phoneNumber));
  console.log('validatePhoneNumber', phoneRegex.test(phoneNumber));
  return !phoneRegex.test(phoneNumber)
};