import React from "react";
import Cocktail from "./Cocktail";
import Loading from "./Loading";
import { useGlobalContext } from "../context";

const CocktailList = () => {
  const { loading, coctailsData } = useGlobalContext();

  if (loading) {
    return <Loading></Loading>;
  }

  if (coctailsData.length < 1) {
    return (
      <h2 className="section-title">
        No Cocktails Matched Your Search Criteria
      </h2>
    );
  }

  return (
    <section className="section">
      <h2 className="section-title">cocktails</h2>
      <div className="cocktails-center">
        {coctailsData.map((item) => (
          <Cocktail key={item.id} {...item}></Cocktail>
        ))}
      </div>
    </section>
  );
};

export default CocktailList;
