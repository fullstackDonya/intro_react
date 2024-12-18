import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditRecipe = () => {
  const { id } = useParams(); // Récupère l'ID de la recette depuis l'URL
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [cuisineType, setCuisineType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/recipe/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const recipe = response.data;
        setTitle(recipe.title);
        setIngredients(recipe.ingredients);
        setInstructions(recipe.instructions);
        setCuisineType(recipe.cuisineType);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération de la recette", error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:8080/recipe/${id}`,
        { title, ingredients, instructions, cuisineType },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then(() => {
        alert("Recette mise à jour avec succès !");
        navigate("/"); // Redirige vers la page d'accueil après la mise à jour
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour de la recette", error);
      });
  };

  return (
    <div>
      <h1>Modifier la recette</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Ingrédients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
        />
        <textarea
          placeholder="Instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Type de cuisine"
          value={cuisineType}
          onChange={(e) => setCuisineType(e.target.value)}
          required
        />
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
};

export default EditRecipe;
