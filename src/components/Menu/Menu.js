import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

const menus = [
    {
        name: 'Trang chủ',
        path: '/',
        exact: true
    },
    {
        name: 'Quản lý sản phẩm',
        path: '/product-list',
        exact: false
    }
];

const MenuLink = ({ to, label, activeOnlyWhenExact }) => {
    return (
        <Route 
            path={to}
            exact={activeOnlyWhenExact}
            children={({match}) => {
                var active = match ? 'active' : '';
                return (
                    <li className={active}>
                        <Link to={to}>
                            {label}
                        </Link>
                    </li>
                );  
            }}
        /> 
    );
}

class Menu extends Component {
    render() {
        return (
            <div className="navbar navbar-default">
                <a className="navbar-brand" href="/">Call API</a>
                <ul className="nav navbar-nav">
                    {this.showMenus(menus)}
                </ul>
            </div>
        );
    }

    showMenus = menus => {
        var result = null;

        if(menus.length > 0){
            result = menus.map((menu, index) => {
                return (
                    <MenuLink
                        key={index}
                        to={menu.path}
                        label={menu.name}
                        activeOnlyWhenExact={menu.exact}
                    />
                );
            })
        }

        return result;
    }
}

export default Menu;