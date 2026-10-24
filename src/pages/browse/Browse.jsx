import {useState} from 'react';
import Navbar from './Navbar';
import Banner from './Banner';
import MovieList from './MovieList';
import MovieDetail from './MovieDetail';
import requests from "../../requests";
import classes from './Browse.module.css'

function Browse() {
	const [selectedMovie, setSelectedMovie] = useState(null);

	function handleMovieClick(movie) {
		if (selectedMovie?.id === movie.id) {
			setSelectedMovie(null);
		} else {
			setSelectedMovie(movie);
		}
	}

	return (
		<div className={classes.browse}>
			<Navbar/>
			<Banner/>

			<MovieList
				title="Original"
				endpoint={requests.fetchNetflixOriginals}
				isOriginal={true}
				onMovieClick={handleMovieClick}
				selectedMovie={selectedMovie}
			/>

			<MovieList
				title="Xu hướng"
				endpoint={requests.fetchTrending}
				isOriginal={false}
				onMovieClick={handleMovieClick}
				selectedMovie={selectedMovie}
			/>

			<MovieList
				title="Xếp hạng cao"
				endpoint={requests.fetchTopRated}
				isOriginal={false}
				onMovieClick={handleMovieClick}
				selectedMovie={selectedMovie}
			/>

			<MovieList
				title="Phim hành động"
				endpoint={requests.fetchActionMovies}
				isOriginal={false}
				onMovieClick={handleMovieClick}
				selectedMovie={selectedMovie}
			/>

			<MovieList
				title="Phim hài"
				endpoint={requests.fetchComedyMovies}
				isOriginal={false}
				onMovieClick={handleMovieClick}
				selectedMovie={selectedMovie}
			/>

			<MovieList
				title="Phim kinh dị"
				endpoint={requests.fetchHorrorMovies}
				isOriginal={false}
				onMovieClick={handleMovieClick}
				selectedMovie={selectedMovie}
			/>

			<MovieList
				title="Phim lãng mạn"
				endpoint={requests.fetchRomanceMovies}
				isOriginal={false}
				onMovieClick={handleMovieClick}
				selectedMovie={selectedMovie}
			/>

			<MovieList
				title="Phim tài liệu"
				endpoint={requests.fetchDocumentaries}
				isOriginal={false}
				onMovieClick={handleMovieClick}
				selectedMovie={selectedMovie}
			/>
		</div>
	);
}

export default Browse;

