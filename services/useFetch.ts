import {useState} from "react";

const useFetch = <T>(fetchFunc: () => Promise<T>, autoFetch = true): any => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<T | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null)
            const result = await fetchFunc();
            setData(result);
        } catch (err) {
            // @ts-ignore
            setError(err instanceof Error ? err : new Error('Fetch failed:'));
        } finally {
            setLoading(false);
        }
    }

    const reset = () => {
        setData(null);
        setLoading(false);
        setError(null);
    }

    useEffect(() => {
        if (autoFetch) {
            fetchData();
        }
    }, []);


    return {data, loading, error, refetch: fetchData, reset};

}

export default useFetch;


