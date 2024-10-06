import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
// tri evenements pas date decroisante
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  ) || []; // data null utilise un tableau vide

  // focntion passer slide suivant
  const nextCard = () => {
    setIndex((prevIndex) => (prevIndex + 1) % byDateDesc.length);
  }; // retourne a zero quand arrrive a la fin

  useEffect(() => {
    const timer = setTimeout(nextCard, 5000); // change de slide toutes les 5s
    return () => clearTimeout(timer); // reinitialiser le temps a 0
  }, [index, byDateDesc.length]);

  const handleDotChange = (dotIdx) => {
    setIndex(dotIdx); // mettre a jour slide avec dots
  };
//
  return (
    <div className="SlideCardList">
      {byDateDesc.map((event, idx) => (        
        <div
          key={event.title}
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
          {byDateDesc.map((event, radioIdx) => (
            <input
              key={event.title}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              onChange={() => handleDotChange(radioIdx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;