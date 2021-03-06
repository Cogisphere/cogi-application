import { Model } from "cogi-collectibles";
import { useEffect, useState } from "react";
import { listen } from "../Storage/exchange";
import fetchModels from "../Storage/fetchModels";

/**
 *  A hook to get all models from collection. It automatically changes
 *  state when user adds/removes/modifies models and gives access to
 *  the update collection.
 */
export default function useCollection() {

    const [ collection, setCollection ] = useState<Array<Model>|undefined>();

    useEffect(() => {

        let isMounted = true;

        if (collection === undefined) fetchModels().then((models:Array<Model>) => { isMounted && setCollection(models.sort((a:Model, b:Model) => a.name.localeCompare(b.name))); });

        return () => { isMounted = false };
    }, [ collection, setCollection ]);

    useEffect(() => {

        const cancelListener = listen('models', () => setCollection(undefined));

        return () => cancelListener();
    }, [])

    return {
        collection: collection || []
    };
};