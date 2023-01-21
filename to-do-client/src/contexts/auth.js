import { createContext, useState } from "react";
import { generateRandomString } from "../utils/random-string";
import { challengeFromVerifier } from "../utils/code-challenge";

const AuthContext = createContext({
  state: '',
  verifier: '',
  loginRedirect: () => {}
});

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState('');
  const [verifier, setVerifier] = useState('');

  async function loginRedirect() {
    const userState = generateRandomString();
    const userVerifier = generateRandomString();

    setState(userState);
    setVerifier(userVerifier);

    const data = {
      response_type: 'code',
      client_id: process.env.REACT_APP_CLIENT_ID,
      scope: `openid profile offline_access ${process.env.REACT_APP_SCOPE}`,
      state: userState,
      redirect_uri: process.env.REACT_APP_REDIRECT_URI,
      code_challenge: await challengeFromVerifier(userVerifier),
      code_challenge_method: 'S256'
    }

    const params = new URLSearchParams(data);

    const url = new URL('authorize', process.env.REACT_APP_MICROSOFT_OAUTH2_URI);
    url.search = params.toString();

    window.location.href = url.href;
  }

  return (
    <AuthContext.Provider value={{ state, verifier, loginRedirect }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;