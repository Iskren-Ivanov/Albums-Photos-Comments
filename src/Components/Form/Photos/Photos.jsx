import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';
import CommentsBox from './CommentsBox/CommentsBox';
import albumsData from '../../../PngImages/albumsImg/albumsImg';
import './Photos.css';

const Photos = ({ history, match }) => {
    const albumId = parseInt(match.params.id);
    const photo = albumsData.find(x => x.id === albumId);
    const [disabledNextBtn, setDisabledNextBtn] = useState(false);
    const [disabledPrevBtn, setDisabledPrevBtn] = useState(false);

    useEffect(() => {
        setDisabledNextBtn(albumId === albumsData.length)
        setDisabledPrevBtn(albumId === 1);
        if (albumId > albumsData.length) {
            history.push(`/albums/${albumsData.length}/photos`);
        }
    }, [albumId])

    return (
        <Card className="photo-card">
            <Card.Img className="photo" variant="top" src={photo?.img} alt="Loading..." />
            <Card.Body>
                <div className="btn-prev-container ">
                    <Button
                        disabled={disabledPrevBtn}
                        onClick={() => history.push(`/albums/${albumId - 1}/photos`)}
                        className="btn btn-primary btn-large my-button"
                    >
                        Previous
                    </Button>
                </div>
                <div className="btn-next-container ">
                    <Button
                        disabled={disabledNextBtn}
                        onClick={() => history.push(`/albums/${albumId + 1}/photos`)}
                        className="btn btn-primary btn-large my-button"
                    >
                        Next
                    </Button>
                </div>
                <br />
                <Card.Title>Title: <i>{photo?.title}</i></Card.Title>
                <CommentsBox />
            </Card.Body>
        </Card >
    );
};

export default withRouter(Photos);