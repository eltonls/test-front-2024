
const EMAIL_REGEX = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;

function isEmailValid(email: string): boolean {
  if(!email) return false;
  return EMAIL_REGEX.test(email);
}

export { isEmailValid };
