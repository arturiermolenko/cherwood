import axios from "axios";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { getChart, getUser } from "../../../api";
import { useAppSelector } from "../../../app/hooks";
import { UserType } from "../../../helpers/UserType";

type Props = {
  id: number,
  noAbsolute?: boolean,
}

export const LikeAndChart: React.FC<Props> = ({id, noAbsolute}) => {
  const [arr, setArr] = useState(false);
  const [user, setUser] = useState<UserType>();
  const [isLike, setIsLike] = useState(false);
  const [isInChart, setIsInChart] = useState(false);
  const registrationReducer = useAppSelector(state => state.registration);

useEffect(() => {
  getUser(registrationReducer.registration.access)
  .then((userFromServer) => {
    setUser(userFromServer)
  })
}, [isLike]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      getChart()
      .then((chartData) => {
        const isArray = Array.isArray(chartData);
        const isProductInChart = isArray && chartData.some((item) => item.id === id);
        console.log(isArray)
        setIsInChart(isProductInChart);
      })
      .catch((error) => {
        console.error(error);
      });
    }, 1000);
  
    return () => {
      clearTimeout(timerId);
    };
  }, [arr]);

  const handleLike = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${registrationReducer.registration.access}`
        }
      };
  
      const url = `http://127.0.0.1:8000/api/products/${id}/favourite/`;
      await axios.post(url, null, config);
      setIsLike(!isLike);
      console.log(isLike)
    } catch (error) {
      console.log(error);
    } 
  };

const handleChart = async () => {
  try {
    const data = {
      product_id: id,
      action: 'add'
    };

    const url = 'http://127.0.0.1:8000/api/cart/';

    console.log(data)

    await axios.post(url, data);
    setArr(!arr)
  } catch (error) {
    console.log(error);
  }
};
  return (
    <div className="card__minicontainer">
      <button 
        className={classNames("card__notLike", {
          'card__like': user && user.favourites.includes(id),
          'card__noAbsolute' : noAbsolute,
        })} 
        onClick={handleLike}
      />
      <button className={classNames("card__chart--cont", {
          'card__chart--cont--select': isInChart,
          'card__noAbsolute' : noAbsolute,
        })} 
        onClick={handleChart}
      >
        <div 
          className="card__chart"
        />
      </button>
  </div>
  );
}