import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { User } from "../types/User";

const LOCAL_STORAGE_KEY = "addedUsers";

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) throw new Error("Network error");

        const data = await response.json();
        const storedUsers = localStorage.getItem(LOCAL_STORAGE_KEY);
        const addedUsers: User[] = storedUsers ? JSON.parse(storedUsers) : [];

        setUsers([...data, ...addedUsers]);
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <main className="p-5 bg-slate-300 rounded-md border-3 border-black">
      <h1 className="text-3xl text-slate-700 font-bold text-center p-5">User Directory</h1>
      <input
        type="text"
        placeholder="Search user"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full border p-2 mb-5"
      />
      {filteredUsers.length === 0 ? (
        <p className="text-red-600">No users found.</p>
      ) : (
        <section className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredUsers.map(({ id, name, email, address }) => (
            <div key={id} className="p-5 bg-white shadow-lg">
              <p><strong>Name:</strong> {name}</p>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>City:</strong> {address?.city}</p>
              <p><strong>Zipcode:</strong> {address?.zipcode}</p>
              <Link to={`/users/${id}`}>
                <button className="bg-blue-400 hover:bg-blue-500 text-white font-bold px-2 py-1 rounded-xl m-2">
                  View Profile
                </button>
              </Link>
            </div>
          ))}
        </section>
      )}
    </main>
  );
};

export default Home;
