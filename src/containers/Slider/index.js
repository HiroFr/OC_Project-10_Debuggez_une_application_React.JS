import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtB.date) - new Date(evtA.date)
  );
  const nextCard = () => {
    setIndex(index < byDateDesc.length - 1 ? index + 1 : 0)
  };

  useEffect(() => { // useEffect to change card every 5 seconds
    const timeout = setTimeout(() => {
      nextCard(); // call nextCard function
    }, 5000);
    return () => clearTimeout(timeout); // clear timeout on unmount
  }, [nextCard]); // run useEffect when nextCard function changes

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={index}> {/* key should be unique */}
        <div
          key={event.id}
          className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
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
        <div className="SlideCard__paginationContainer">
          <div className="SlideCard__pagination">
            {byDateDesc.map((_, radioIdx) => (
              <input
                key={`${index}`} /* key should be unique */
                type="radio"
                name="radio-button"
                checked={index === radioIdx}
                onChange={() => setIndex(radioIdx)}
              />
            ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
