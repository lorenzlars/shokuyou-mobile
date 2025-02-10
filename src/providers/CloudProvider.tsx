import {
  createContext,
  createElement,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Database } from '@nozbe/watermelondb';
import { client } from '../api/client.gen';
import { AuthService } from '../api';

type CloudContext = {
  token?: string;
  setToken?: Dispatch<SetStateAction<string | undefined>>;
  database?: Database;
};

type Props = {
  database: Database;
  children: ReactNode;
};

const storageKey = 'accessToken';
const CloudContext = createContext<CloudContext>({});

export function CloudProvider({ children, database }: Props) {
  const [token, setToken] = useState<string>();

  database.localStorage.get<string>(storageKey).then((storedToken) => {
    setToken(storedToken ?? undefined);
  });

  client.instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  });

  return createElement(CloudContext.Provider, { value: { setToken, token, database } }, children);
}

export const useCloud = () => {
  const [signedIn, setSignedIn] = useState(false);
  const { database, setToken, token } = useContext<CloudContext>(CloudContext);

  useEffect(() => {
    setSignedIn(!!token);
  }, [token]);

  async function signIn(username: string, password: string) {
    if (!database || !setToken) {
      throw new Error('useCloud must be used within a CloudProvider');
    }

    const { data } = await AuthService.userLogin({
      body: { username, password },
    });

    await database.localStorage.set(storageKey, data?.accessToken);
    setToken(data?.accessToken);
  }

  async function signOut() {
    if (!database || !setToken) {
      throw new Error('useCloud must be used within a CloudProvider');
    }

    await database.localStorage.remove(storageKey);
    setToken(undefined);
  }

  return {
    signedIn,
    signIn,
    signOut,
  };
};
