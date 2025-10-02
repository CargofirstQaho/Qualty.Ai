import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { setLocation, setLocationError, setLocationLoading } from "../redux/slice/locationSlice";

const useFetchLocation=()=>{
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchLocation = async () => {
            dispatch(setLocationLoading());
            try {
                const response = await fetch(`${BASE_URL}/quick-services/locations`);
                const data = await response.json();                
                dispatch(setLocation(data.data));
            } catch (error) {
                  dispatch(setLocationError("Failed to fetch location data"));
                console.error("Error fetching locations:", error);
            }
        };

        fetchLocation();
    }, [setLocation]);
    return null;
}


export default useFetchLocation;