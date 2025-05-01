import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaChevronCircleDown, FaChevronCircleUp } from '../../../public/Icons.js';
import "./menu.css";

interface MenuItem {
    name: string;
    label: string;
    navHref?: string;
    src?: React.ReactNode;
    items?: SubMenuItem[];
}

interface SubMenuItem {
    name: string;
    label: string;
    navHref: string;
}

interface MenuProps {
    menuItems: MenuItem[];
    responsive?: string;
}

const Menu = ({ menuItems, responsive = 'desktop' }: MenuProps) => {
    const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
    const navigate = useNavigate();
    const location = useLocation();
    const isOnPreviewLanding = location.pathname.includes('preview-landing-page');

    // Initialize expanded state based on current location
    useEffect(() => {
        const newExpandedItems: Record<string, boolean> = {};
        
        menuItems.forEach(item => {
            if (item.items) {
                // Check if any sub-item matches current path
                const isActive = item.items.some(subItem => 
                    subItem.navHref === location.pathname
                );
                
                if (isActive) {
                    newExpandedItems[item.name] = true;
                }
            }
        });
        
        setExpandedItems(newExpandedItems);
    }, [location.pathname, menuItems]);

    const toggleExpand = (name: string) => {
        setExpandedItems(prev => ({
            ...prev,
            [name]: !prev[name]
        }));
    };

    return (
        <>
        {!isOnPreviewLanding && (
            <div className={`side-menu ${responsive === 'mobile' ? 'mobile' : ''}`}>
                {menuItems.map(({label, name, navHref, src, items: subItems}) => (
                    <div key={name}>
                        <ul className="menu-item-container">
                            {subItems ? (
                                <li 
                                    className={`side-menu-btn ${expandedItems[name] ? 'expanded' : ''}`} 
                                    onClick={() => toggleExpand(name)}
                                >
                                    <a href={navHref} className="menu-tab">
                                        <div className="menu-tab-label">
                                            {src}
                                            {label}
                                        </div>
                                        {subItems && (
                                            expandedItems[name] 
                                                ? <FaChevronCircleUp className="expand-icon"/> 
                                                : <FaChevronCircleDown className="expand-icon"/>
                                        )}
                                    </a>
                                </li>
                            ) : (
                                <li 
                                    className={`side-menu-btn ${location.pathname === navHref ? 'active' : ''}`} 
                                >
                                    <a href={navHref} className="menu-tab">
                                        <div className="menu-tab-label">
                                            {src}
                                            {label}
                                        </div>
                                    </a>
                                </li>
                            )}
                        
                            {Array.isArray(subItems) && expandedItems[name] && (
                                <ul className="sub-menu">
                                    {subItems.map((subItem) => (
                                        <li 
                                            className={`sub-navHref-hover ${location.pathname === subItem.navHref ? 'active' : ''}`}
                                            key={subItem.name}
                                            onClick={() => navigate(subItem.navHref)}
                                        >
                                            {subItem.label}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </ul>
                    </div>
                ))}
            </div>
        )}
        </>
        
    );
};

export default Menu;