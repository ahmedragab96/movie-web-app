import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../../hooks/useStores';

const MoviesScreen = observer(() => {
  const { moviesStore } = useStores();
  const [selectedTable, setSelectedTable] = useState('candidateTable');


  return (
    <React.Fragment>
      in movies screen
    </React.Fragment>
  );
});

export default MoviesScreen;
