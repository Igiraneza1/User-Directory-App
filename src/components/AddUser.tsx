import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userFormSchema, UserFormData, User } from "../types/User";

const LOCAL_STORAGE_KEY = "addedUsers";

const AddUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
  });

  const [storageError, setStorageError] = useState<string | null>(null);

  const onSubmit = (data: UserFormData) => {
    try {
      const storedUsers = localStorage.getItem(LOCAL_STORAGE_KEY);
      const parsedUsers: User[] = storedUsers ? JSON.parse(storedUsers) : [];

      const newUser: User = {
        ...data,
        id: Date.now(), 
      };

      const updatedUsers = [...parsedUsers, newUser];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedUsers));
      reset();
    } catch (error) {
      setStorageError("Failed to save user.");
    }
  };

  return (
    <main className="min-h-screen bg-slate-200 flex items-center justify-center py-10 px-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg bg-white shadow-xl rounded-lg p-6 space-y-4 border border-gray-300"
      >
        <h2 className="text-xl font-bold text-center text-slate-700 mb-4">Add New User</h2>

        <div className="space-y-2 flex flex-col gap-3">
          <input {...register("name")} placeholder="Name" />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          <input {...register("email")} placeholder="Email" />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          <input {...register("address.city")} placeholder="City"  />
          {errors.address?.city && <p className="text-red-500">{errors.address.city.message}</p>}
          <input {...register("address.zipcode")} placeholder="Zipcode" />
          <input {...register("phone")} placeholder="Phone"  />
          <input {...register("website")} placeholder="Website"  />
          <input {...register("company.name")} placeholder="Company Name"  />
          <input {...register("company.catchPhrase")} placeholder="Catch Phrase" />
          <input {...register("company.bs")} placeholder="Business" />
          <input {...register("age")} type="number" placeholder="Age"  />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200"
        >
          Add User
        </button>

        {storageError && <p className="text-red-500 text-sm">{storageError}</p>}
      </form>
    </main>
  );
};

export default AddUser;
