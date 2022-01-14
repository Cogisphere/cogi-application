import { Model } from "cogi-collectibles";
import { useEffect, useState } from "react";
import { listen } from "../Storage/exchange";
import fetchModels from "../Storage/fetchModels";

export default function useCollection() {

    const [ collection, setCollection ] = useState<Array<Model>>([]);

    useEffect(() => {

        let isMounted = true;

        fetchModels().then((models:Array<Model>) => isMounted && setCollection(models));

        return () => { isMounted = false };
    }, [ collection, setCollection ]);

    useEffect(() => {

        const cancelListener = listen('models', () => setCollection([]));

        return () => cancelListener();
    }, [])

    return {
        collection
    };
};