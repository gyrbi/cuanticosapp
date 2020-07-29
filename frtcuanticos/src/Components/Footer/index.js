// **************************************************** index.js de Footer ******************************************************************** //

import React from 'react';

import {NavLink} from 'react-router-dom';
import { TiHome } from 'react-icons/ti';
import { RiLoginBoxLine, RiUserHeartLine } from 'react-icons/ri';
import { FaUserEdit, FaHandHoldingHeart, FaBoxOpen } from 'react-icons/fa';
import { IoMdBasket } from 'react-icons/io';
import './footer.css';

export default ()=>{
    return (
        <section>
            <footer>
                <nav>
                    <ul>
                        {/* Menú Principal */}
                        {/* <li> <NavLink to="/"> <TiHome size="2em"/> </NavLink> </li>
                        <li> <NavLink to="/login"> <RiLoginBoxLine size="2em"/> </NavLink> </li>
                        <li> <NavLink to="/register"> <FaUserEdit size="2em"/> </NavLink> </li> */}

                        {/* Menú Donante */}
                        <li> <NavLink to="/donaciones"> <FaHandHoldingHeart size="2em" /> </NavLink> </li>
                        <li> <NavLink to="/miDonacion"> <IoMdBasket size="2em" /> </NavLink> </li>
                        <li> <NavLink to="/voluntariado"> <RiUserHeartLine size="2em" /> </NavLink> </li>

                        {/* Menú Empresa */}
                        {/* <li> <NavLink to="/donaciones"> <FaHandHoldingHeart size="2em" /> </NavLink> </li>
                        <li> <NavLink to="/miDonacion"> <IoMdBasket size="2em" /> </NavLink> </li>
                        <li> <NavLink to="/voluntariado"> <FaBoxOpen size="2em" /> </NavLink> </li> */}
                    </ul>
                </nav>
            </footer>
        </section>
    );
}
