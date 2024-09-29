import { FilmData } from "@/types";
import { useEffect, useState } from "react";
import Slider, { Settings } from "react-slick";
import FilmCard from "./FilmCard";
import FilmCardLoading from "./FilmCardLoading";
import FilmCardNull from "./FilmCardNull";

const FilmListCard: React.FC<{
  film: FilmData[] | null;
  slidesToShow?: number;
}> = ({ film, slidesToShow }) => {
  const [isLoading, setIsLoading] = useState(true);

  const settings: Settings = {
    dots: false,
    infinite: true,
    arrows: false,
    draggable: true,
    speed: 500,
    slidesToShow: slidesToShow || 5,
    slidesToScroll: 1,
    initialSlide: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <FilmCardLoading />;
  }

  if (!film || film.length === 0) {
    return <FilmCardNull />;
  }

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {film.map((item, index) => (
          <FilmCard key={index} film={item} />
        ))}
      </Slider>
    </div>
  );
};

export default FilmListCard;
