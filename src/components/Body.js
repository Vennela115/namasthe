import { useEffect, useState } from 'react';
import RestaurantCard from './RestaurantCard';
import Shimmer from './Shimmer';

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState('');

  console.log('Body rendered');

  useEffect(() => {
    fetchData();
  }, []);

//   const fetchData = async () => {
//     try {
//       const response = await fetch(
//         //  DEVELOPMENT USE ONLY: Avoid using this proxy in production!
//         //'https://cors-anywhere.herokuapp.com/https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.624480699999999&page_type=DESKTOP_WEB_LISTING'
  
//   'https://cors-anywhere.herokuapp.com/https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9716&lng=77.5946&page_type=DESKTOP_WEB_LISTING'
//  );

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const json = await response.json();

//       const restaurants = json?.data?.cards[2]?.data?.data?.cards || [];
//       console.log(restaurants);
//       console.log(1);
//       setListOfRestaurants(restaurants);
//       setFilteredRestaurant(restaurants);
//     } catch (error) {
//       console.error('Fetch error:', error);
//     }
//   };

const fetchData = async () => {
  try {
    const response = await fetch(
      'http://localhost:3000/restaurants'

    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const json = await response.json();
  

    const restaurants = json?.data || [];
    setListOfRestaurants(restaurants);
    setFilteredRestaurant(restaurants);
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            placeholder="Search a restaurant you want..."
            className="searchBox"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            onClick={() => {
              const filtered = listOfRestaurants.filter((res) =>
                res.data.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRestaurant(filtered);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            const topRated = listOfRestaurants.filter(
              (res) => res.data.avgRating > 4
            );
            setFilteredRestaurant(topRated);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {filteredRestaurant.map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} resData={restaurant.info} />
        ))}
      </div>
    </div>
  );
};

export default Body;
