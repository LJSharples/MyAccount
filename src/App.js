import React from "react";
import { Authenticator } from "aws-amplify-react";
import "./App.css";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import AuthWrapper from "./components/AuthWrapper";
import "./css/tailwind.css";

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    identityPoolId: 'eu-west-2:cb3f96be-2ea8-4a61-8638-d46b2506f0fa', // (required) - Amazon Cognito Identity Pool ID
    region: 'eu-west-2', // (required) - Amazon Cognito Region
    userPoolId: 'eu-west-2_zuXp6xWTL', // (optional) - Amazon Cognito User Pool ID
    userPoolWebClientId: '2kd0vl8jbjjn9ahuaidj0b6nhu', // (optional) - Amazon Cognito Web Client ID (App client secret needs to be disabled)
    cookieStorage: {
      // - Cookie domain (only required if cookieStorage is provided)
        domain: '.managedbills.com',
        secure: false
      },  
  },
});
Amplify.configure(awsconfig);

function App() {
  return (
    <div className="App">
      <header>
        <Authenticator hideDefault={true} amplifyConfig={awsconfig}>
          <AuthWrapper />
        </Authenticator>
      </header>
    </div>
  );
}

export default App;