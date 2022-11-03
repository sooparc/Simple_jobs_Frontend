import React, { useState, useEffect, useRef } from "react";
import * as tt from "@tomtom-international/web-sdk-maps";
import classes from "./Map.module.css";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import { useParams } from "react-router-dom";

const Map = (props) => {
  const mapElement = useRef();
  const [map, setMap] = useState({});
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const axios = require("axios");
  const id = useParams();

  useEffect(() => {
    axios.get("https://pt-finder.herokuapp.com/companies").then((response) => {
      const newArr = response.data;
      const newId = id.id;
      const filteredObj = newArr.find((e) => e.id == newId);
      setLatitude(filteredObj.latitude);
      setLongitude(filteredObj.longitude);
    });

    let map = tt.map({
      key: "IZAA6GH9vFq56WSpmttQBQyST1h6IZES",
      container: mapElement.current,
      stylesVisibility: {
        trafficIncidents: true,
        trafficFlow: true,
      },
      center: [longitude, latitude],
      zoom: 14,
    });

    setMap(map);

    const addMarker = () => {
      const element = document.createElement("div");
      element.className = "marker";

      const marker = new tt.Marker({
        draggable: true,
        element: element,
      })
        .setLngLat([longitude, latitude])
        .addTo(map);

      marker.on("dragend", () => {
        const lngLat = marker.getLngLat();
        setLongitude(lngLat.lng);
        setLatitude(lngLat.lat);
      });
    };

    addMarker();
    return () => map.remove();
  }, [longitude, latitude]);

  return (
    <>
      {map && (
        <div>
          <div ref={mapElement} className={classes.map}></div>
        </div>
      )}
    </>
  );
};

export default Map;
