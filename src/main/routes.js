import { LoginView, useUser } from '../auth';
import { View as Posts } from '../posts';
import Upload from '../upload';
import Tools from '../tools';

const anonymous = [
    {
        path: "/",
        component: LoginView
    }
]

const authenticated = [
    {
        label: 'images',
        path: "/i",
        component: Posts,
        props: {
            type: 'image'
        }
    },
    {
        label: 'discussions',
        path: "/d",
        component: Posts,
        props: {
            type: 'discussion'
        }
    },
    {
        label: 'upload',
        path: "/u",
        component: Upload,
    },
    {
        label: 'dev',
        path: "/dev",
        component: Tools,
    },
]

export const useRoutes = () => {
    const user = useUser();
    return user ? authenticated : anonymous;
}
