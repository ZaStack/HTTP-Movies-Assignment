import React, { useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { Formik, Form, useField } from 'formik';
import { Button } from '@material-ui/core';
import axios from 'axios';

const TextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className='text-input' {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className='error'>{meta.error}</div>
            ) : null}
        </>
    );
};

const UpdateMovie = props => {
    // const [movie, setMovie ] = useState({
    //     id: '',
    //     title: '',
    //     director: '',
    //     metascore: '',
    //     stars: []
    // })
    const { id } = useParams();
    const [toNext, setToNext] = useState(false);

    // const handleChange = e => {
    //     let value = e.target.value;
    //     if (e.target.name === 'stars') {
    //         value = [value]
    //     }
    //     setMovie({
    //         ...movie,
    //         [e.target.name]: e.target.value
    //     })
    // }

    return (
        <div className='form-wrapper'>
            <h1>Update Movie</h1>

            <Formik
                initialValues={{
                    id: `${id}`,
                    title: props.title,
                    director: props.director,
                    metascore: props.metascore,
                    stars: props.stars
                }}
                onSubmit={values => {
                    console.log('Values', values);
                    axios
                        .put(`http://localhost:5000/api/movies/${id}`, values)
                        .then(res => {
                            console.log('POST response', res);
                            setToNext(true);
                        })
                        .catch(err => console.log(`Submit failure, ${err}`));
                }}>
                {({ errors, handleChange, touched, values }) => (
                    <Form key={props.id}>
                        {toNext ? <Redirect to={`/movies/${id}`} /> : null}
                        <TextInput
                            error={errors.title && touched.title}
                            label='Title'
                            name='title'
                            type='text'
                            onChange={handleChange}
                        />
                        <TextInput
                            error={errors.director && touched.director}
                            label='Director'
                            name='director'
                            type='text'
                            onChange={handleChange}
                        />
                        <TextInput
                            error={errors.metascore && touched.metascore}
                            label='Metascore'
                            name='metascore'
                            type='number'
                            onChange={handleChange}
                        />
                        <TextInput
                            error={errors.stars && touched.stars}
                            label='Stars'
                            name='stars'
                            type='text'
                            onChange={handleChange}
                        />
                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'>
                            Update
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default UpdateMovie;
