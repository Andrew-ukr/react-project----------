import React from "react";
import { useGlobalContext } from "../context";

const SearchForm = () => {
  const { setSearchInput } = useGlobalContext();

  const refInput = React.useRef(null);
  
    // ХУКИ можна імпортувати не тільки за длопомогою команди імпорт , але й React.useEffect, React.useRef(null)
  React.useEffect(() => {
    refInput.current.focus(); // при рендері сторінки одразу фокусується на інпуті
  }, []);

  const handlSubmit = (e) => { // fix bug щоб при натисканні ентер не перезавантажувало сторінку
    e.preventDefault();
  };

  return (
    <section className="section search">
      <form className="search-form" onSubmit={handlSubmit}>
        <div className="form-control">
          <label htmlFor="search">search your favorite cocktail</label>
          <input
            type="text"
            name="search"
            id="search"
            ref={refInput}
            onChange={() => {
              setSearchInput(refInput.current.value);
            }}
          />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
