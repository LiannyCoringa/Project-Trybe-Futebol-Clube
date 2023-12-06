const validPassword = 'secret_admin';
const noEmailLoginBody = { email: '', password: validPassword };

const validEmail = 'admin@admin.com';
const noPasswordLoginBody = { email: validEmail, password: '' };

const notExistingUserBody = { email: 'notfound', password: validPassword };

const existingUserWithWrongPasswordBody = { email: validEmail, password: 'wrong_password' };
const hashedPassword = '$2a$12$5tIC3FqPsF/JMM4R41m4J.UnnUA4RkIcMlKKx666Mi5IHpcEtPYhq';

const existingUser = { 
  id: 1, 
  username: 'Admin',
  role: 'admin',
  email: validEmail,
  password: hashedPassword,
};

const validLoginBody = { email: validEmail, password: validPassword };

export default {
  noEmailLoginBody,
  noPasswordLoginBody,
  notExistingUserBody,
  existingUserWithWrongPasswordBody,
  existingUser,
  validLoginBody,
};