import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [last, setLast] = useState(null);
  const getData = useCallback(async () => {
    try {
      const result = await api.loadData(); // Appeler l'API
      setData(result); // Définir les données
      setLast(result.events[result.events.length - 1]); // Définir le dernier événement
    } catch (err) {
      setError(err);
    }
  }, []);

  useEffect(() => {
    if (data) return; // Si les données sont déjà chargées, nous n'avons pas besoin d'appeler l'API
    getData(); // Sinon on appeler l'API
  }, [data, getData]);
  
  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
        last,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useData = () => useContext(DataContext);

export default DataContext;
