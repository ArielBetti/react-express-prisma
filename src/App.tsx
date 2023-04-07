import { useState, useId, useEffect } from "react";
import { createUserData, getUserData } from "./services";
import { TUser } from "./types";

function App() {
  const [userList, setUserList] = useState<TUser[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const id = useId();

  const handleCreateUser = () => {
    createUserData({ email, name })
      .then(() => {
        return getUserData();
      })
      .then((data) => setUserList(data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getUserData().then((data) => setUserList(data));
  }, []);

  return (
    <div className="App">
      <input
        onChange={(e) => setName(e.target.value)}
        value={name}
        placeholder="name"
        type="text"
        name="name"
        id={id}
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
        type="email"
        name="email"
        id={id}
      />

      <button onClick={() => handleCreateUser()}>Criar user</button>
      {userList.map((user) => (
        <div key={user.email}>
          <p>
            {user.name} {user.email}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;
