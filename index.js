import { registerRootComponent } from 'expo';

import App from './App';
import { UserProvider } from './context/UserContext';


const Root = () => (
    <UserProvider>
      <App />
    </UserProvider>
  );

registerRootComponent(Root);
