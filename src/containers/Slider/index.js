import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  const byDateDesc = data?.focus.sort(
    (evtA, evtB) => new Date(evtB.date) - new Date(evtA.date)
  );

  useEffect(() => {
    // useEffet pour changer de carte toutes les 5 secondes
    const timeout = setTimeout(() => {
      setIndex(index < byDateDesc.length - 1 ? index + 1 : 0);
    }, 5000); // Change l'index de la carte après 5 secondes
    return () => clearTimeout(timeout); // Nettoie le timeout lors du démontage du composant
  }, [byDateDesc]);

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          key={Math.random()}
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
              key={Math.random()}
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
