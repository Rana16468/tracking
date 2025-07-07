import { z } from 'zod';

const AuthSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});



const AuthValidationSchema = {
  AuthSchema,
};
export default AuthValidationSchema;
