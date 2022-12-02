import React, { memo } from 'react';
import GoogleMapReact from 'google-map-react';


const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Map = ({ coords }) => {

    return (
        <div style={{ height: '400px', width: '100%', marginTop: "15px" }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_KEY }}
                defaultCenter={coords}
                defaultZoom={14}
                center={coords}
            >
                <AnyReactComponent
                    lat={coords?.lat}
                    lng={coords?.lng}
                    text={<i className="fas fa-map-marker" style={{ color: "red", fontSize: "25px" }}></i>}
                />
            </GoogleMapReact>
        </div>

    )
}

export default Map