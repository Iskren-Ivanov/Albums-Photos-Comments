import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../../shared/loader/loader';
import albumsPhotos from '../../../PngImages/albumsImg/albumsImg';

import './Albums.css';

const Albums = () => {
    const [albums, setAlbums] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setAlbums(albumsPhotos);
        setLoading(false);
    }, []);


    return (
        <section>
            <div className="albums-container">
                {loading ? <Loader /> :
                    albums.map((album) => (
                        <ul className="albums-title" key={album.id}>
                            <Link className='album-link' to={`/albums/${album.id}/photos`} id={album.id}>  {album.id}: {album.title} </Link>
                        </ul>
                    ))
                }
            </div>
        </section>
    )
}

export default Albums;