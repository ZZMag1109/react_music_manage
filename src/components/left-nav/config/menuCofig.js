 const menuList =  [
    {
        title: '系统首页',
        key: 'home',
        icon: 'PieChartOutlined',
         subNodeFlag: '0',
    },
    {
        title: '用户管理',
        key: 'consumer',
        icon: 'UserOutlined',
        subNodeFlag: '1',
         children: [{
             title: '测试',
             key: 'test',
             icon: 'PieChartOutlined',
             subNodeFlag: '0',
        }]
    },
    {
        title: '歌手管理',
        key: 'singer',
        icon: 'UserAddOutlined',
        subNodeFlag: '0'
    },
    {
        title: '歌单管理',
        key: 'songList',
        icon: 'ProfileOutlined',
        subNodeFlag: '0',
    }
]

export default menuList;