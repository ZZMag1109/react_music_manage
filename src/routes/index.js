import { Navigate } from "react-router-dom";
import Admin from "../pages/admin/admin";
import Home from "../pages/home/home";
import Login from "../pages/login/login";
import Consumer from "../pages/consumer/consumer";
import Singer from "../pages/singer/singer";
import SongList from "../pages/songList/songList";
import Test from "@/pages/testPage/index.jsx";

export default [
    {
        path: '/login',
        element:<Login/>
    },
    {
        path: '/admin',
        element: <Admin />,
        children: [
            {
                path: 'home',
                element: <Home />
            },
            {
                path: 'consumer',
                children: [
                    {
                        path: 'test',
                        element: <Test />
                    }
                ]
            },
            {
                path: 'consumer',
                element: <Consumer/>
            },
            {
                path: 'singer',
                element: <Singer/>
            },
            {
                path: 'songList',
                element: <SongList/>
            },
            {
                path: '',
                element:<Navigate to="home"/>
            }
        ]
    },
    {
        path: '/',
        element:<Navigate to="/login"/>
    }
]