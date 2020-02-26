import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, Link, useParams } from 'react-router-dom';
import MovieCard from './MovieCard';
import { Button } from '@material-ui/core';

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  const { id } = useParams();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }


  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
      <Link to={`/update-movie/${id}`} >
        <Button >Update</Button>
      </Link>
    </div>
  );
}

export default Movie;
