import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useUser } from "../context/userContext";

const useFetchLocation = () => {
  const { setLocation } = useUser();

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch(`${BASE_URL}/quick-services/locations`);
        const data = await response.json();
        setLocation(data);
      } catch (error) {
      }
    };

    fetchLocation();
  }, [setLocation]);

  return null;
};

export default useFetchLocation;
