"use client";

import { FooterLayout, HeaderLayout } from "@/components";
import "@fontsource/poppins";
import { Layout, Spin, Typography } from "antd";
import { useEffect, useState } from 'react';
import Slider from "react-slick";
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
const { Content } = Layout;
const { Text } = Typography;

const movies = [
 {
  id: 'clw692bbc000568fwng9jqucp',
  title: 'Possession: Kerasukan',
  poster: 'https://media.21cineplex.com/webcontent/gallery/pictures/171229180745163_287x421.jpg'
 },
 {
  id: 'clw692bbc000e68fw4v65uewe',
  title: 'Menjelang Ajal',
  poster: 'https://cdn.idntimes.com/content-images/post/20240320/img-5285-cc55ff00508c0f7986bd60cbccc30d67.jpeg'
 },
 {
  id: 'clw692bbc000268fwb1jc5s82',
  title: 'The Architecture of Love (TAOL)',
  poster: 'https://media.21cineplex.com/webcontent/gallery/pictures/171229069497776_287x421.jpg'
 },
 {
  id: 'clw692bbc000668fwxu62m2jj',
  title: 'Dua Hati Biru',
  poster: 'https://media.21cineplex.com/webcontent/gallery/pictures/17109994074491_287x421.jpg'
 },
 {
  id: 'clw692bbc000b68fweh73wlec',
  title: 'Siksa Kubur',
  poster: 'https://upload.wikimedia.org/wikipedia/id/b/bf/Poster_Siksa_Kubur.jpg'
 },
 {
  id: 'clw692bbc000d68fw11h8ksu8',
  title: 'Mukidi',
  poster: 'https://tugumalang.id/wp-content/uploads/2024/04/WhatsApp-Image-2024-04-15-at-10.56.28.jpeg'
 },
 {
  id: 'clw692bbc000168fwa8t0rmmm',
  title: 'Badarawuhi di Desa Penari',
  poster: 'https://media.21cineplex.com/webcontent/gallery/pictures/171196601780400_287x421.jpg'
 }
];


function SimpleSlider() {
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    initialSlide: 0,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className="-mx-2">
      <Slider {...settings} className="pl-2 pr-2">
        {movies.map((movie, index) => (
          <div key={index} className="px-2">
            <div className="card">
              <img src={movie.poster} alt="" className="mx-auto my-auto w-[222px] h-[349px] object-cover rounded-lg flex-none p-4 min-width-[200px] max-width-[200px]" style={{cursor: "pointer", borderRadius:"27px"}}/>
              <p className="text-white-600 text-center">{movie.title}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

const ForumBox = () => {
  return (
    <div className="forum-box">
      {/* Add your desired content here (text, images, buttons, etc.) */}
      <p>This is the content of the right box.</p>
      <button>Click Me!</button>
    </div>
  );
};


export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <Spin fullscreen />;
  }

  
  return (
    <Layout style={{ minHeight: "100dvh", backgroundColor: "#9E140F" }}>
      <HeaderLayout />
      <h1 style={{marginTop: "14px", marginLeft: "54px", fontSize: "32px", color: "#E2B808", fontWeight: "bold"}}>Tayang Hari Ini</h1>
      <SimpleSlider></SimpleSlider>
      <h1 style={{marginTop: "14px", marginLeft: "54px", fontSize: "32px", color: "#E2B808", fontWeight: "bold"}}>Rekomendasi</h1>
      <SimpleSlider></SimpleSlider>
      <h1 style={{marginTop: "14px", marginLeft: "54px", fontSize: "32px", color: "#E2B808", fontWeight: "bold"}}>10 Teratas</h1>
      <SimpleSlider></SimpleSlider>
      <h1 style={{marginTop: "14px", marginLeft: "54px", fontSize: "32px", color: "#E2B808", fontWeight: "bold"}}>Favorit</h1>
      <SimpleSlider></SimpleSlider>
      <FooterLayout />
    </Layout>
  );
}