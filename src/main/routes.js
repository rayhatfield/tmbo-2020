import { LoginView } from '../auth';
import { View as Posts } from '../posts';

export const anonymous = [
    {
        path: "/",
        component: LoginView
    }
]

export const authenticated = [
    {
        path: "/",
        component: Posts
    },
]
