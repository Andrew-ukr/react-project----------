import React, { useCallback } from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleCocktail = () => {
  const { id } = useParams();
  const [details, setDetails] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const getDetails = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${url}${id}`);
      const data = await res.json();

      if (data.drinks) {
        const {
          strDrink,
          strDrinkThumb,
          strAlcoholic,
          strCategory,
          strGlass,
          strInstructions,
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5,
        } = data.drinks[0];

        const newDetails = {
          name: strDrink,
          img: strDrinkThumb,
          info: strAlcoholic,
          category: strCategory,
          glass: strGlass,
          instructions: strInstructions,
          ingredient: [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          ],
        };
        setDetails(newDetails);
      } else {
        setDetails(null);
      }
    } catch (error) {
      setLoading(false);
    }
    setLoading(false);
  }, [id]);

  React.useEffect(() => {
    getDetails();
  }, [getDetails, id]);

  if (loading) {
    return <Loading></Loading>;
  }

  if (!details) {
    return <h2 className="section-title">no cocktails to display</h2>;
  }

  const {
    name,
    img,
    info,
    category,
    glass,
    instructions,
    ingredient,
  } = details;
  return (
    <section className="section cocktail-section">
      <Link to="/" className="btn btn-primary">
        back home
      </Link>
      <h2 className="section-title">{name}</h2>
      <div className="drink">
        <img src={img} alt={name} />
        <div className="drink-info">
          <p>
            <span className="drink-data">name :</span>
            {name}
          </p>
          <p>
            <span className="drink-data">category :</span>
            {category}
          </p>
          <p>
            <span className="drink-data">info :</span>
            {info}
          </p>
          <p>
            <span className="drink-data">glass :</span>
            {glass}
          </p>
          <p>
            <span className="drink-data">instructons :</span>
            {instructions}
          </p>
          <p>
            <span className="drink-data">ingredients :</span>
            {ingredient.map((elem, i) =>
              elem ? <span key={i}>{elem},</span> : null
            )}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SingleCocktail;
