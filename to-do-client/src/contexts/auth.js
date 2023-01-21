import { createContext } from "react";
import axios from "axios";
import { generateRandomString } from "../utils/random-string";
import { challengeFromVerifier } from "../utils/code-challenge";

const AuthContext = createContext({
  loginRedirect: () => {},
  auth: () => {}
});

export const AuthProvider = ({ children }) => {

  function loginRedirect() {
    const state = btoa(window.location.href);
    const verifier = generateRandomString();

    sessionStorage.setItem('state', state);
    sessionStorage.setItem('verifier', verifier);

    challengeFromVerifier(verifier).then(challenge => {
      const data = {
        response_type: 'code',
        client_id: process.env.REACT_APP_CLIENT_ID,
        scope: `openid profile offline_access ${process.env.REACT_APP_SCOPE}`,
        state: state,
        redirect_uri: process.env.REACT_APP_REDIRECT_URI,
        code_challenge: challenge,
        code_challenge_method: 'S256'
      }
  
      const params = new URLSearchParams(data);
  
      const url = new URL('authorize', process.env.REACT_APP_MICROSOFT_OAUTH2_URI);
      url.search = params.toString();
  
      window.location.href = url.href;
    });
  }

  async function auth(code, state) {

    const sessionState = sessionStorage.getItem('state');
    const sessionVerifier = sessionStorage.getItem('verifier');

    if (!code || !state || !sessionState || state !== sessionState) {
      throw new Error('Could not authenticate the given user information');
    }

    const url = new URL('token', process.env.REACT_APP_MICROSOFT_OAUTH2_URI);

    axios.post(url.href, {
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: process.env.REACT_APP_REDIRECT_URI,
      client_id: process.env.REACT_APP_CLIENT_ID,
      code_verifier: sessionVerifier
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    }).then(response => {
      sessionStorage.removeItem('state');
      sessionStorage.removeItem('verifier');

      localStorage.setItem(process.env.REACT_APP_TOKEN_KEY, response.data.access_token);
      window.location.href = atob(sessionState);
    });
  }

  return (
    <AuthContext.Provider value={{ loginRedirect, auth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;