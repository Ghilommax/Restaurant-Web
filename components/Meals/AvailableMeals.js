import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useState,useEffect } from 'react';
import { isElement } from 'react-dom/test-utils';

const DUMMY_MEALS = [
  {
    id: 'm1',
    name: 'Sushi',
    description: 'Finest fish and veggies',
    price: 22.99,
  },
  {
    id: 'm2',
    name: 'Schnitzel',
    description: 'A german specialty!',
    price: 16.5,
  },
  {
    id: 'm3',
    name: 'Barbecue Burger',
    description: 'American, raw, meaty',
    price: 12.99,
  },
  {
    id: 'm4',
    name: 'Green Bowl',
    description: 'Healthy...and green...',
    price: 18.99,
  },
];

const AvailableMeals = () => {
  const [dataloaded, setdataloaded] = useState([]);
  const [isloaing, setisloading] = useState(false);
  const [iserror, setiserror] = useState(false)
 const fetchfucntion = async () =>
 {
  setisloading(true);
   const loadingdata = [];
   const res = await fetch('https://movieapi-6269e-default-rtdb.firebaseio.com/meals.json')
   const data = await res.json();
   if (!res.ok){
     throw new Error('something is wrong');
   }
   for(const key in data){
    console.log(key)
     loadingdata.push({
      
       id: key,
       name:data[key].name,
       description:data[key].description,
       price:data[key].price,
     })
   }
        setdataloaded(loadingdata);
   setisloading(false);
  
 }
 
 useEffect(() =>{
  
  fetchfucntion().catch(error => {
    setiserror(true);
  })
    

}, [])
const sign = <p>LOADING......</p>;
if (isloaing){
  return <Card>
    {sign}
  </Card>
}
    if(iserror){
      return (<Card>
        <p> some thing is wrong </p>
      </Card>)
    }
   
   
  const mealsList = DUMMY_MEALS.map((meal) => (
    
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
