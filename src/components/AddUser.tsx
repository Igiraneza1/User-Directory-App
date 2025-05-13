import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserFormData } from "../types/User";

const LOCAL_STORAGE_KEY = "addedUsers";

const Home = () => {
  const [users, setUsers] = useState<UserFormData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUsers = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedUsers) {
        const parsedUsers = JSON.parse(storedUsers);
        if (Array.isArray(parsedUsers)) {
          setUsers(parsedUsers);
        } else {
          console.error("Invalid user data format.");
        }
      }
    } catch (error) {
      console.error("Failed to load users from localStorage", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;

  return (
    <main style={{ padding: "20px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1>User Directory</h1>
      </header>

      <section style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search users"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "8px", width: "100%", maxWidth: "300px" }}
        />
      </section>

      {filteredUsers.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <section style={{ display: "grid", gap: "16px", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}>
          {filteredUsers.map((user, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "16px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3>{user.name}</h3>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Age:</strong> {user.age}</p>
              <Link to={`/users/${index}`}>
                <button style={{ marginTop: "10px", padding: "6px 12px", cursor: "pointer" }}>
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
