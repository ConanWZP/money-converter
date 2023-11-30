import React from 'react';
import loaderGif from '../../assets/svg/LoaderBalls.svg'

const Loader = () => {
    return (
        <div className={'loader_container'}>
            <div className={'loader'}>
                <img src={loaderGif} alt="Loading......."/>
            </div>
        </div>
    );
};

export default Loader;