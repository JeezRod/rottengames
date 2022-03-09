import React from "react";
import {useUser, useUserUpdateContext} from "../../UserContext"

export default function About() {

  const user = useUser()

  return (
    <div className="About">
      <h1>About page</h1>
      <h2>{user.email}</h2>
      <h2>{user.name}</h2>
      <h2>{user.admin}</h2>
      <h2>{user.email}</h2>
    </div>

  );
}
