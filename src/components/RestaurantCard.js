import { CDN_URL } from '../utils/constants';

const RestaurantCard = (props) => {
  const { resData } = props;

  const cloudinaryImageId= resData.cloudinaryImageId;
  const name= resData.name;
  const   cuisines = resData.cuisines;
  const  avgRating = resData?.avgRating;
  const  costForTwo= resData?.costForTwo;

  const  deliveryTime= resData?.sla?.deliveryTime;  
    
    
  console.log(resData);
  return (
    <div
      className="res-card"
      style={{
        backgroundColor: '#f0f0f0',
      }}
    >
      <img
        className="res-logo"
        src={CDN_URL + cloudinaryImageId}
        alt="Biryani"
      />

      <div className="res-card-content">
        <h3>{name}</h3>
        <hr />
        <em>{Array.isArray(cuisines) ? cuisines.join(', ') : 'N/A'}</em>
        <h4>{parseFloat((avgRating-0.3).toFixed(1))} stars</h4>
        <h4>{costForTwo } </h4>
        <h4>{deliveryTime} minutes</h4>
      </div>
    </div>
  );
};

export default RestaurantCard;
