import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getPhotosByUserId } from '../../photos/services/photosService';
import Photo from './Photo';

const Photos = ({ match }) => {
    const [photos, setPhotos] = useState([]);

    const auth = useSelector((state) => ({
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user
    }));

    useEffect(() => {
        try {
            if (match) {
                getPhotosByUserId(match.params.id).then(data => {

                    const photos = mapDataToPhotos(data);

                    setPhotos(photos);
                });
            }
        }
        catch (e) {
            console.log(e);
        }
    }, [match]);

    const editPhotos = useMemo(() => {
        return match && auth && auth.user && auth.isAuthenticated
            && auth.user._id === match.params.id;
    }, [match, auth]);

    const mapDataToPhotos = (data) => {
        return data.reduce((result, datum) => {

            if (datum.imageUrls.length > 0) {
                const photo = datum.imageUrls.map(imageUrl => ({
                    _id: datum._id,
                    imageUrl
                }));

                return [...result, ...photo];
            }

            return result;
        }, []);
    };

    return (
        <div className="iq-card">
            <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                    <h4 className="card-title">Photos</h4>
                </div>
                {editPhotos && (
                    <div className="iq-card-header-toolbar d-flex align-items-center">
                        <Link to='/photos' data-toggle="tooltip" title="Edit Photos">
                            <i className="ri-edit-2-fill" />
                        </Link>
                    </div>
                )}
            </div>
            <div className="iq-card-body">
                <ul className="profile-img-gallary d-flex flex-wrap p-0 m-0">
                    {photos.length > 0 && photos.map((photo, index) => (
                        <Photo key={index} photo={photo} />
                    ))}
                </ul>
            </div>
        </div>

    );

};

export default Photos;