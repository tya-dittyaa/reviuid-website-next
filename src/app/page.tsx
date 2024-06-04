"use client";

import { FooterLayout, HeaderLayout } from "@/components";
import "@fontsource/poppins";
import { Layout, Spin, Typography } from "antd";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from 'react';
const { Content } = Layout;
const { Text } = Typography;


const MultiCardCarousel: React.FC = () => {
  
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const cards = [
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

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

if(currentIndex>cards.length-4) {
  console.log(currentIndex)
  setCurrentIndex(0)
  console.log("hi")
}

const carousel=useRef();

const [width, setWidth] = useState(0);
useEffect(() => {
})

const [maxDescriptionLength, setMaxDescriptionLength] = useState(15); //title max berapa

  const truncateDescription = (description: string) => {
    if (description.length <= maxDescriptionLength) {
      return description;
    }

    return `${description.substring(0, maxDescriptionLength)}...`;
  };

  return (
    <motion.div className="mt-2 carousel ml-14 mr-50">
      <motion.div drag="x" dragConstraints={{right:0, left: -width}} className="inner-carousel w-11/12">
        <motion.div className="relative">
          
        <motion.div className="item flex space-x-4 flex-wrap">
          {cards.slice(currentIndex, currentIndex + 5).map((card, index) => (
            <div
            className="" // Adjust values as needed
            key={index}
          >
              <img className="w-[222px] h-[349px] object-cover rounded-lg flex-none p-4 min-width-[200px] max-width-[200px]" src={card.poster} alt="Card" style={{cursor: "pointer", borderRadius:"27px"}} />
              <p className="text-white-600 text-center"  style={{cursor: "pointer"}}>{truncateDescription(card.title)}</p>
            </div>
          ))}
          
        </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const MultiCardCarouselv2: React.FC = () => {
  
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const cards = [
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

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

if(currentIndex>cards.length-4) {
  console.log(currentIndex)
  setCurrentIndex(0)
  console.log("hi")
}

const [maxDescriptionLength, setMaxDescriptionLength] = useState(15); //title max berapa

  const truncateDescription = (description: string) => {
    if (description.length <= maxDescriptionLength) {
      return description;
    }

    return `${description.substring(0, maxDescriptionLength)}...`;
  };

  return (
    <motion.div className="mt-2 carousel ml-14">
      <motion.div drag="x" dragConstraints={{right:0}} className="inner-carousel w-11/12">
        <motion.div className="relative">
          
        <motion.div className="item flex space-x-4 flex-wrap">
          {cards.slice(currentIndex, currentIndex + 5).map((card, index) => (
            <div
            className="" // Adjust values as needed
            key={index}
          >
              <img className="w-[222px] h-[349px] object-cover rounded-lg flex-none p-4 min-width-[200px] max-width-[200px]" src={card.poster} alt="Card" style={{cursor: "pointer", borderRadius:"27px"}} />
              <p className="text-white-600 text-center"  style={{cursor: "pointer"}}>{truncateDescription(card.title)}</p>
            </div>
          ))}
          
        </motion.div>
        {/* BJIR BINGUNG GW BUAT DRAGGABLE SLIDER */}
        </motion.div>
      </motion.div>
    </motion.div>
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

  // planning
  // bikin div buat carousel v1 taro kotak forum
  // bikin file css buat rapih (ta tahu bagusnya gimans)
  // responsif (large desktop, desktop, tablet, hp)
  
  return (
    <Layout style={{ minHeight: "100dvh", backgroundColor: "#9E140F" }}>
      <HeaderLayout />
      <h1 style={{marginTop: "14px", marginLeft: "54px", fontSize: "32px", color: "#E2B808", fontWeight: "bold"}}>Tayang Hari Ini</h1>
      <MultiCardCarousel />
      <h1 style={{marginTop: "14px", marginLeft: "54px", fontSize: "32px", color: "#E2B808", fontWeight: "bold"}}>Rekomendasi</h1>
      <MultiCardCarousel />
      <h1 style={{marginTop: "14px", marginLeft: "54px", fontSize: "32px", color: "#E2B808", fontWeight: "bold"}}>10 Teratas</h1>
      <MultiCardCarouselv2 />
      <h1 style={{marginTop: "14px", marginLeft: "54px", fontSize: "32px", color: "#E2B808", fontWeight: "bold"}}>Favorit</h1>
      <MultiCardCarouselv2 />
      <FooterLayout />
    </Layout>
  );
}
