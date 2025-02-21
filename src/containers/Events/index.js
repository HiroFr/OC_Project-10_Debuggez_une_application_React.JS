import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9; // Nombre d'événements à afficher par page

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState(); // ajouter un état pour stocker le type sélectionné
  const [currentPage, setCurrentPage] = useState(1);

  // Filtrer les événements en fonction de la catégorie sélectionnée
  const filteredEvents = (
    (!type? data?.events : data?.events.filter((event) => event.type === type)) || [] // filtrer les événements avec une opération ternaire
  ).filter((event, index) => {
    if (
      (currentPage - 1) * PER_PAGE <= index &&
      PER_PAGE * currentPage > index
    ) {
      return true;
    }
    return false;
  });

  const changeType = (eventType) => {
    setCurrentPage(1);
    setType(eventType);
  };

  const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1;
  const typeList = new Set(data?.events.map((event) => event.type));
  return (
    <>
      {error && <div>Une erreur s&apos;est produite</div>}
      {data === null ? (
        "chargement"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)} // Affiche la liste de catégorie
            onChange={(value) => (value ? changeType(value) : changeType(null))} // On appel la function lors du changement
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
