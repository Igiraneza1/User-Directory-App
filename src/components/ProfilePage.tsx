import React from "react";
import { useParams } from "react-router-dom";
import { User } from "./User";
import { useEffect, useState } from "react";

function ProfilePage(){
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(res => res.json())
            .then(data => {
                setUser(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);
    if (loading) {
        return <p>Loading..........</p>;
    }
    if (!user) {
        return <p>User not found</p>;
    }
    return(
        <div>
            <h1>{user.name}</h1>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Website: {user.website}</p>
            <p>Company: {user.company.name}</p>
            <p>Address: {user.address.street}, {user.address.city}, {user.address.zipcode}</p>
        </div>
    )

}
export default ProfilePage;