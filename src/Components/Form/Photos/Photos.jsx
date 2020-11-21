import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { Card, Button, Form, FormGroup, FormControl, Toast, FormLabel } from 'react-bootstrap';
import Loader from '../../../shared/loader/loader';

import albumsData from '../../../PngImages/albumsImg/albumsImg';

import './Photos.css';

const urlFirebase = 'https://project-albums-photos-comment.firebaseio.com/comments.json?';
const urlForDeleting = 'https://project-albums-photos-comment.firebaseio.com/comments/';

const Photos = (props) => {
    let history = useHistory();

    const authData = JSON.parse(localStorage.getItem('userData'));

    const idToken = authData.idToken;
    const strLocation = window.location.pathname.trim();
    const locationToArr = strLocation.split("/").filter(function (str) {
        return /\S/.test(str);
    });;
    const matchAlbumID = parseInt(locationToArr[1]);

    const [loading, setLoading] = useState(false);

    const [photos, setPhotos] = useState([]);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [disabledNextBtn, setDisabledNextBtn] = useState();
    const [disabledPrevBtn, setDisabledPrevBtn] = useState();
    const usernameInputRef = useRef();

    const formatDate = (date) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        let strTime = hours + ':' + minutes + ' ' + ampm;
        return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
    }

    useEffect(() => {
        disabledButtonPrevАndNext();
        getPhoto();
        getComments();
    }, [matchAlbumID]);

    const disabledButtonPrevАndNext = () => {
        if (matchAlbumID === albumsData.length) {
            setDisabledNextBtn(true);
        } else {
            setDisabledNextBtn(false);
        }
        if (matchAlbumID === 1) {
            setDisabledPrevBtn(true);
        }
        else {
            setDisabledPrevBtn(false);
        }
    }

    const getPhoto = async () => {
        const currentPhoto = albumsData.find(x => x.id === matchAlbumID);
        setPhotos(currentPhoto);
    };

    const getComments = async () => {
        setLoading(true);
        let data = null;
        await axios.get(urlFirebase + idToken)
            .then(response => {
                data = response.data;
                setLoading(false)
            })
            .catch(error => {
                console.log('error photo', error);
                setLoading(false)
            });

        if (data) {
            const sortDataWhithCurrentID = [];
            for (const [key, value] of Object.entries(data)) {
                if (value.albumID === matchAlbumID) {
                    sortDataWhithCurrentID.push({
                        albumID: value.albumID,
                        body: value.body,
                        date: value.date,
                        email: value.email,
                        id: key
                    });
                };
            };
            setComments(sortDataWhithCurrentID);
        };
    }

    const postNewComment = async (email, body, albumID) => {
        const dates = new Date();
        const dateFormating = formatDate(dates);
        const postObject = {
            email,
            body,
            albumID,
            date: dateFormating
        }

        await axios.post(urlFirebase, postObject)
            .then(response => {
                setLoading(false)
            })
            .catch(error => {
                console.log('error photo postComment', error);
                setLoading(false)
            })
        setComments([...comments, postObject])
    }

    const onSubmitComment = (event) => {
        event.preventDefault();
        usernameInputRef.current.value = '';

        if (comment?.length >= 1) {
            postNewComment(authData.email, comment, matchAlbumID);
        }
    }

    const deleteComment = (id) => {
        const commentID = id;
        const filteredComments = comments.filter(x => x.id !== commentID);
        setComments(filteredComments);

        const deleteUrl = `${urlForDeleting}${commentID}${'.json'}`;
        axios.delete(deleteUrl);
    };

    const commentsBox = (
        comments.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
        }).map(c => {
            return (
                <div>
                    <Toast className='custom-toast'>
                        <Toast.Header closeButton={false} >
                            <strong className="mr-auto">{c.email}</strong>
                            <small>{c.date}</small>
                            <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                                <span onClick={() => deleteComment(c.id)} aria-hidden="true">&times;</span>
                            </button>
                        </Toast.Header>
                        <Toast.Body>{c.body}</Toast.Body>
                    </Toast>
                </div >
            );
        }));

    const inputNewComment = (
        <Form onSubmit={onSubmitComment}>
            <FormGroup role="form" >
                <FormLabel><b>Add your comment:</b></FormLabel>
                <FormControl ref={usernameInputRef} onBlur={event => setComment(event.target.value)} as="textarea" className="form-control" />
                <Button className="btn btn-primary btn-large btn-send" type="submit">Send</Button>
            </FormGroup>
        </Form>
    );

    const PrevPhoto = () => {
        const minLengthAlbumData = 1;
        if (matchAlbumID > minLengthAlbumData) {
            const prevAlbumId = matchAlbumID - 1;
            history.push({
                pathname: `/albums/${prevAlbumId}/photos`,
            });
        }
    }

    const NextPhoto = () => {
        const maxLengthAlbumData = albumsData.length
        if (matchAlbumID < maxLengthAlbumData) {
            const nextAlbumId = matchAlbumID + 1;
            history.push({
                pathname: `/albums/${nextAlbumId}/photos`,
            });
        }
    }

    return (
        loading ? <Loader /> :
            <Card className="photo-card">
                <Card.Img className="photo" variant="top" src={photos.img} alt="Loading..." />
                <Card.Body>
                    <div className="btn-prev-container ">
                        <Button disabled={disabledPrevBtn} onClick={PrevPhoto} className="btn btn-primary btn-large my-button" >Previous</Button>
                    </div>
                    <div className="btn-next-container ">
                        <Button disabled={disabledNextBtn} onClick={NextPhoto} className="btn btn-primary btn-large my-button" >Next</Button>
                    </div>
                    <br />
                    <Card.Title>Title: <i>{photos.title}</i></Card.Title>
                    {commentsBox}
                    <br />
                    {inputNewComment}
                </Card.Body>
            </Card >
    );
}

export default Photos;