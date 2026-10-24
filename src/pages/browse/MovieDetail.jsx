
import { useEffect, useState } from "react";
import fetchData from "../../api";
import requests from "../../requests";
import classes from "./Browse.module.css";

export default function MovieDetail({ movieData }) {
  const [videoKey, setVideoKey] = useState(null);

  useEffect(() => {
    if (!movieData) {
      setVideoKey(null);
      return;
    }

    let cancelled = false;
    setVideoKey(null);

    // Lấy API key từ endpoint đã có trong requests.js
    const queryString =
      requests.fetchNetflixOriginals.split("?")[1];

    const apiKey = new URLSearchParams(queryString).get("api_key");

    const mediaType = movieData.media_type || "movie";

    const endpoint =
      `/${mediaType}/${movieData.id}/videos?api_key=${apiKey}`;

    fetchData(endpoint)
      .then((data) => {
        const videos = data.results || [];

        // Ưu tiên Trailer trước
        const trailer = videos.find(
          (video) =>
            video.site === "YouTube" &&
            video.type === "Trailer"
        );

        // Không có Trailer thì lấy Teaser
        const teaser = videos.find(
          (video) =>
            video.site === "YouTube" &&
            video.type === "Teaser"
        );

        if (!cancelled) {
          setVideoKey((trailer || teaser)?.key || null);
        }
      })
      .catch((error) => {
        console.error("Lỗi lấy trailer:", error);
        if (!cancelled) {
          setVideoKey(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [movieData]);

  if (!movieData) {
    return null;
  }

  const imagePath =
    movieData.backdrop_path || movieData.poster_path;

  return (
    <section className={classes.movieDetail}>
      <div className={classes.movieDetailInfo}>
        <h2>{movieData.name || movieData.title}</h2>

        <p>
          <strong>Release date:{" "}
          {movieData.first_air_date ||
            movieData.release_date ||
            "Chưa có thông tin"}</strong>
        </p>

        <p>
          <strong>Rating:{" "}
          {movieData.vote_average != null
            ? `${movieData.vote_average.toFixed(1)} / 10`
            : "N/A"}</strong>
        </p>

        <p>{movieData.overview || "Chưa có mô tả."}</p>
      </div>

      <div className={classes.movieDetailMedia}>
        {videoKey ? (
          <iframe
            key={videoKey}
            src={`https://www.youtube.com/embed/${videoKey}`}
            title={`Trailer - ${movieData.name || movieData.title}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : imagePath ? (
          <img
            src={`https://image.tmdb.org/t/p/w1280${imagePath}`}
            alt={movieData.name || movieData.title}
          />
        ) : (
          <p>Không có trailer hoặc hình ảnh.</p>
        )}
      </div>
    </section>
  );
}
