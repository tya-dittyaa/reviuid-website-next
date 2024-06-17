"use client";

import { FooterLayout, HeaderLayout } from "@/components";
import { FilmHomeHorizontal, FilmHomeVertical } from "@/components/film/home";
import {
  FilmBroadcastTodayProvider,
  FilmComingSoonProvider,
  FilmTop10Provider,
  FilmTopFavoriteProvider,
  UserSessionProvider,
  ViewLayoutProvider,
  useViewLayout,
} from "@/context";
import { useWindowSize } from "@/hooks";
import { FilmData, UserSession } from "@/types";
import {
  GetFilmBroadcastToday,
  GetFilmComingSoon,
  GetFilmTop10,
  GetFilmTopFavorite,
  GetUserSession,
} from "@/utils";
import "@fontsource/poppins";
<<<<<<< HEAD
import { Layout, Spin, Typography } from "antd";
import { useEffect, useState } from 'react';
import Slider from "react-slick";
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
=======
import { Layout, Spin } from "antd";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

>>>>>>> 3d8eaa29a09e879e49ca046274ea3d1a135f492c
const { Content } = Layout;

<<<<<<< HEAD
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
=======
function ContentLayout() {
  const layout = useViewLayout();

  return (
    <Content
      style={{
        flex: 1,
        backgroundColor: "#9E140F",
        display: "flex",
        flexDirection: "column",
        padding: layout === "horizontal" ? "2rem" : "1rem",
      }}
    >
      {layout === "vertical" ? <FilmHomeVertical /> : <FilmHomeHorizontal />}
    </Content>
>>>>>>> 3d8eaa29a09e879e49ca046274ea3d1a135f492c
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
  const size = useWindowSize();

  const [layout, setLayout] = useState<"vertical" | "horizontal">("horizontal");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const [broadcastTodayFilm, setBroadcastTodayFilm] = useState<
    FilmData[] | null
  >(null);
  const [top10Film, setTop10Film] = useState<FilmData[] | null>(null);
  const [topFavoriteFilm, setTopFavoriteFilm] = useState<FilmData[] | null>(
    null
  );
  const [comingSoonFilm, setComingSoonFilm] = useState<FilmData[] | null>(null);

  const getUserSession = async () => {
    const user = await GetUserSession();
    setUserSession(user);
    setIsLoading(false);
  };

  const getBroadcastTodayFilm = async () => {
    const film = await GetFilmBroadcastToday();
    setBroadcastTodayFilm(film);
  };

  const getTop10Film = async () => {
    const film = await GetFilmTop10();
    setTop10Film(film);
  };

  const getTopFavoriteFilm = async () => {
    const film = await GetFilmTopFavorite();
    setTopFavoriteFilm(film);
  };

  const getComingSoonFilm = async () => {
    const film = await GetFilmComingSoon();
    setComingSoonFilm(film);
  };

  useEffect(() => {
    if (size.width && size.width < 800) {
      setLayout("vertical");
    } else {
      setLayout("horizontal");
    }
  }, [size.width]);

  useEffect(() => {
    getUserSession();
    getBroadcastTodayFilm();
    getTop10Film();
    getTopFavoriteFilm();
    getComingSoonFilm();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <Spin fullscreen />;
  }

  
  return (
<<<<<<< HEAD
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
=======
    <ViewLayoutProvider view={layout}>
      <UserSessionProvider user={userSession}>
        <FilmBroadcastTodayProvider film={broadcastTodayFilm}>
          <FilmTop10Provider film={top10Film}>
            <FilmTopFavoriteProvider film={topFavoriteFilm}>
              <FilmComingSoonProvider film={comingSoonFilm}>
                <Layout style={{ minHeight: "100dvh" }}>
                  <HeaderLayout />
                  <ContentLayout />
                  <FooterLayout />
                </Layout>
              </FilmComingSoonProvider>
            </FilmTopFavoriteProvider>
          </FilmTop10Provider>
        </FilmBroadcastTodayProvider>
      </UserSessionProvider>
    </ViewLayoutProvider>
>>>>>>> 3d8eaa29a09e879e49ca046274ea3d1a135f492c
  );
}