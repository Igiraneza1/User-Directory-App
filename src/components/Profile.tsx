import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { User } from "../types/User";

const LOCAL_STORAGE_KEY = "addedUsers";

const UserProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      try {
        const storedUsers = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedUsers) {
          const parsedUsers: User[] = JSON.parse(storedUsers);
          const foundUser = parsedUsers.find(u => u.id.toString() === id);
          if (foundUser) {
            setUser(foundUser);
            return;
          }
        }

        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (!response.ok) throw new Error("User not found");
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError("Failed to load user");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <main className="flex items-center justify-center h-screen bg-blue-200">
      <div className="p-8 rounded-lg shadow-2xl bg-white border-b-4 border-l-4 border-blue-500">
        <h1 className="flex items-center justify-center pb-5 font-bold text-xl">{user.name}</h1>
        <div className="flex flex-col gap-2">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Age:</strong> {user.age === 0 || user.age === undefined ? "N/A" : user.age}</p>
          <p><strong>Phone:</strong> {user.phone || "N/A"}</p>
          <p><strong>Website:</strong> {user.website || "N/A"}</p>
          <p><strong>Company:</strong> {user.company?.name || "N/A"}</p>
          <p><strong>Catch Phrase:</strong> {user.company?.catchPhrase || "N/A"}</p>
          <p><strong>Business:</strong> {user.company?.bs || "N/A"}</p>
          <p><strong>Street:</strong> {user.address?.street || "N/A"}</p>
          <p><strong>Suite:</strong> {user.address?.suite || "N/A"}</p>
          <p><strong>City:</strong> {user.address?.city || "N/A"}</p>
          <p><strong>Zipcode:</strong> {user.address?.zipcode || "N/A"}</p>
          <p><strong>Geo:</strong> {user.address?.geo ? `Lat: ${user.address.geo.lat}, Lng: ${user.address.geo.lng}` : "N/A"}</p>
        </div>
      </div>
    </main>
  );
};

export default UserProfile;
