import React from 'react'
import { useState } from 'react';
import {z} from 'zod';
import { useForm } from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {User} from './user';

const schema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email" }),
    age: z.number().min(18, 'You must be at least 18 years old')

    });
    type FormData = z.infer<typeof schema>;


function AddUser() {
    const [register, handleSubmit, formState: { errors }] = useForm<FormData>({
        resolver: zodResolver(schema)
    });
    const [users, setUsers] = useState<FormData | null>(null);
    const onSubmit = (data: FormData) => {
        setUsers(data);
        console.log(data);
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

        {users && (
            <div>
                <h2>User Details</h2>
                <p>Name: {users.name}</p>
                <p>Email: {users.email}</p>
                <p>Age: {users.age}</p>
            </div>
        )}
    </div>
  )
}

export default AddUser