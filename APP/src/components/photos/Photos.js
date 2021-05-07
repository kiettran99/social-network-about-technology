import React, { useEffect, useState } from 'react';
import HeaderBackground from '../groups/header/HeaderBackground';
import { getPhotos } from './services/photosService';
import Photo from './Photo';

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

    return (
        <>
            <HeaderBackground title={'Your Photos'} imageUrl={"/images/page-img/profile-bg5.jpg"} />
            <div id="content-page" className="content-page">
                <div className="container">
                    <div className="row">
                        {photos.length > 0 && photos.map((photo, index) => (
                            <Photo key={index} photo={photo} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
};

export default Photos;