import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
    const { id } = useParams(); // url의 파라메터 가져오기
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState();
    const getMovie = async() => {
        const json = await(
            await fetch(`https://yts.mx/api/v2//movie_details.json?movie_id=${id}`)
        ).json();

        setMovie(json.data.movie);
        setLoading(false);
    }
    useEffect(() => {
        getMovie();
        

    }, [])

    return (
        <div>
        {loading ? (
            <h1>Loading...</h1>
        ) : (
            <div>
                <img src={movie.large_cover_image} />
                <h1>{movie.title} ({movie.year})</h1>
                <div>
                    {movie.genres.map((g) => <div key={g}>{g}</div>)}
                </div>
                <h4>rating: <strong>{movie.rating}</strong></h4>
                <h4>like count: <strong>{movie.like_count}</strong></h4>
                <p>{movie.description_full}</p>

            </div>
        )}
        </div>
    );
}

export default Detail;