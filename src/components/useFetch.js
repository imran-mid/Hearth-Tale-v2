import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const abortControl = new AbortController();
        fetch(url, { signal: abortControl.signal })
            .then(res => {
                if (!res.ok) {
                    throw Error("Could not fetch resource data");
                }
                return res.json()
            })
            .then(data => {
                setData(data);
                setIsLoading(false);
                setError(null);
            })
            .catch(error => {
                if (error.name === 'AbortError') {
                    console.log("Fetch Aborted");
                }
                else {
                    setIsLoading(false);
                    setError(error.message);
                }

            })
        return () => abortControl.abort();
    }, [url]) //data is only fetched once when url is changed

    return { data, isLoading, error }
}

export default useFetch