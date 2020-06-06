/* o storage usa o sistema de persistência local padrão do sistema que
está sendo utilizado. No caso do navegador é o localStorage, no caso do
react native é o async storage */
import storage from 'redux-persist/lib/storage';

import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persistedReducer = persistReducer(
    {
      key: 'gobarber',
      storage,
      // lista dos reducers que serão persistidos
      whitelist: ['auth', 'user'],
    },
    reducers
  );

  return persistedReducer;
};
