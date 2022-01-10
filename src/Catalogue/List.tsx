import { Box } from "cogi-collectibles";
import { useEffect, useState } from "react";
import Item from "./Item";

export default function List() {

    const [ catalogue, setCatalogue ] = useState<Array<Box>>([]);

    useEffect(() => {

        import('cogi-catalogue-gw/space-marines-boxes.json').then((data:any) => {

            const list = data.default as Array<Box>;
            setCatalogue(list);
        });
    });

    return (
        <div>
            {catalogue.map((b:Box) => (<Item key={b.id} box={b}/> ))}
        </div>
    );
};