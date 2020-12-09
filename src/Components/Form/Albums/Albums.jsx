import React from 'react';
import { Nav } from 'react-bootstrap';
import albums from '../../../PngImages/albumsImg/albumsImg';

import './Albums.css';

const Albums = () => {
    return (
        <Nav className="albumsContainer" variant="pills">
            {albums.map(album =>
                <Nav.Item key={album.id} className="navbar navitem-expand-lg navbar-light bg-light customNavItem">
                    <Nav.Link className="nav-link customNavLink" eventKey={album.id} href={`/albums/${album.id}/photos`}>
                        {album.id}: {album.title}
                    </Nav.Link>
                </Nav.Item>
            )}
        </Nav>
    );
};

export default Albums;