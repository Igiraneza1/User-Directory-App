import { z } from "zod";

export const userFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  address: z.object({
    street: z.string().optional(),
    suite: z.string().optional(),
    city: z.string().min(1, "City is required"),
    zipcode: z.string().optional(),
    geo: z
      .object({
        lat: z.string().optional(),
        lng: z.string().optional(),
      })
      .optional(),
  }),
  phone: z.string().optional(),
  website: z.string().optional(),
  company: z.object({
    name: z.string().optional(),
    catchPhrase: z.string().optional(),
    bs: z.string().optional(),
  }).optional(),
  age: z.coerce.number().optional(),
});

export type UserFormData = z.infer<typeof userFormSchema>;

export interface User extends UserFormData {
  id: number;
}
