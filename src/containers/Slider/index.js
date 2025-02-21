import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // trie par ordre décroissant
  const byDateDesc = data?.focus.sort( // Récupère les dates du tableau focus dans la data
    (evtA, evtB) => new Date(evtB.date) - new Date(evtA.date) // Compare les dates
  );

  useEffect(() => {
    // useEffet pour changer de slide toutes les 5 secondes
    const interval = setInterval(() => {
      setIndex((prevIndex) => // Change l'index de la slide
        prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000); // Change l'index de la slide après 5 secondes
    return () => clearInterval(interval); // Nettoie le timeout lors du démontage du composant
  }, [byDateDesc]);

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          key={Math.random()} // Key unique
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((_, radioIdx) => (
            <input
              key={Math.random()} // Key unique
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              onChange={() => setIndex(radioIdx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
