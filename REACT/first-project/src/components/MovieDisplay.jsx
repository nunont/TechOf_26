
function MovieDisplay({ movie }) {
    return (
        <div className="movie-display">
            <h2>{movie.name}</h2>
            <p>Release Year: {movie.year}</p>
            <p>Genre: {movie.genre}</p>
            <img src={movie.photo} alt={movie.name} />
        </div>
    );
}

export default MovieDisplay;