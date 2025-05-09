import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Context from '../components/Context';

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email" }),
  age: z.coerce.number().min(18, { message: "You must be at least 18 years old" })
});

type FormData = z.infer<typeof schema>;

function AddUser() {
  const { dispatch } = Context(); 

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const [user, setUser] = useState<FormData | null>(null);

  const onSubmit = (data: FormData) => {
    const newUser = { ...data, id: Date.now() }; // generate unique ID
    dispatch({ type: 'ADD_USER', payload: newUser }); // ✅ add to global state
    setUser(data);
    alert('User added successfully');
  };

  return (
    <div>
      <h1>Add User</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name</label>
          <input type="text" {...register('name')} />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <div>
          <label>Email</label>
          <input type="email" {...register('email')} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label>Age</label>
          <input type="number" {...register('age')} />
          {errors.age && <p>{errors.age.message}</p>}
        </div>

        <button type="submit">Add User</button>
      </form>

      {user && (
        <div>
          <h2>User Details</h2>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Age: {user.age}</p>
        </div>
      )}
    </div>
  );
}

export default AddUser;
