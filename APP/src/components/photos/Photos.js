import React, { useEffect, useState } from 'react';

import HeaderBackground from '../groups/header/HeaderBackground';
import Photo from './Photo';
import LoadMore from '../shared/LoadMore';

import { getPhotos } from './services/photosService';

const Photos = () => {

    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        getPhotos().then(data => {

            const photos = mapDataToPhotos(data);

            setPhotos(photos);
        });
    }, []);

    const mapDataToPhotos = (data) => {

        if (!data) {
            return [];
        }

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
    }

    const getMore = (callback) => {
        getPhotos(photos.length, 6).then(data => {

            const newPhotos = mapDataToPhotos(data);

            setPhotos(state => [...state, ...newPhotos]);

            callback();
        });
    }

    return (
        <>
            <HeaderBackground title={'Your Photos'} imageUrl={"/images/page-img/profile-bg5.jpg"} />
            <div id="content-page" className="content-page">
                <div className="container">
                    <div className="row">
                        {photos.length > 0 && photos.map((photo, index) => (
                            <Photo key={index} photo={photo} />
                        ))}
                        <div className="col-sm-12 form-group text-center">
                            {photos && photos.length > 0 && (
                                <LoadMore action={getMore} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Photos;