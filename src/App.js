// 应用的根组件


import React from 'react'
import './App.less'
import { useRoutes } from 'react-router-dom';
import routes from './routes';

const App = () => {
    // 根据路由表生成路由规则
    const element = useRoutes(routes);
    return (
        <div className="App">
            {element}
        </div>
    )
};
  
  export default App;
