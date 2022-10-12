import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import React, { useEffect, useState } from "react";

const DUMMY_MEALS = [
  {
    id: 5,
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: 3,
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
  },
  {
    id: 2,
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: 1,
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
];
interface meals {
  id: number;
  name: string;
  description: string;
  price: number;
}

const AvailableMeals = () => {
  const [meals, setMeals] = useState<meals[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const  [httpError, setHttpError] = useState<string>('');
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-http-3eed4-default-rtdb.firebaseio.com/meals.json"
      );
      if(!response.ok){  
        throw new Error('Something went wrong!');

      }
      const responseData = await response.json();

      const loadedMeals: meals[] = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: parseInt(key),
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setIsLoading(false)
      setMeals(loadedMeals);
      // return loadedMeals;
    };

    fetchMeals().then().catch(error =>{
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);
if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>error occured </p>
      </section>
    );
  }
  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
