import { useContext, useEffect } from "react";

import AuthContext from "../../../contexts/auth";

function LoginCallback() {
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    auth(code, state);
  }, [auth]);

  return (
    <div>
      <h1>Login successful redirecting...</h1>
    </div>
  );
}

export default LoginCallback;