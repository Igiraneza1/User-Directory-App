import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../types/user';

function Home() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div>
      <h1>User Directory</h1>
      <Link to="/add-user">Add New User</Link>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <strong>{user.name}</strong> - {user.email}
            <Link to={`/users/${user.id}`}> View Profile </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
