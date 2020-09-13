import { useEffect, useState } from 'react';

import { useClient } from '../../api';

const useDoc = (id) => {
    const [doc, setDoc] = useState();
    const client = useClient();

    useEffect(() => {
        async function getDoc () {
            client.getUploadDoc(id).then(doc => setDoc(doc));
        }
        getDoc();
    }, [client, id]);

    return doc;
}

export default useDoc;
