import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';

const INITIAL_ZOOM = 12

function Map({ geometry }) {
    const mapRef = useRef()
    const mapContainerRef = useRef()
    const [zoom, setZoom] = useState(INITIAL_ZOOM)

    useEffect(() => {
        mapboxgl.accessToken = import.meta.env.VITE_MAP_TOKEN
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: geometry,
            zoom: zoom
        });

        new mapboxgl.Marker({ color: 'black' })
            .setLngLat(geometry)
            .addTo(mapRef.current)

        mapRef.current.on('move', () => {
            // get the current zoom level from the map
            const mapZoom = mapRef.current.getZoom()

            // update state
            setZoom(mapZoom)
        })

        return () => {
            mapRef.current.remove()
        }
    }, [])

    const handleButtonClick = () => {
        mapRef.current.flyTo({
            center: geometry,
            zoom: INITIAL_ZOOM
        })
    }

    return (
        <>
            <hr className="my-6 border-gray-300" />
            <h4 className="text-xl font-semibold mb-4">Explore the Area</h4>
            <button className="btn bg-green-500 absolute z-10 m-4" onClick={handleButtonClick}>
                Reset
            </button>
            <div className="map-container h-[300px] w-[100%] bg-gray-500 relative" ref={mapContainerRef}>
            </div>
        </>
    );
}

export default Map;