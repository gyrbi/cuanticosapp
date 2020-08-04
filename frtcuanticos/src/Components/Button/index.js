import React from 'react';

import {NavLink} from 'react-router-dom';
import './button.css';


let buttonLibs = {};
buttonLibs.StandardBtn = (p)=>{
  let {caption, onclick, ...props} = p;
  //caption  = (caption)? caption : "";
  onclick = (onclick)? onclick : ()=>{};
  return (<button className="btn" onClick={onclick}>{caption}</button>)
}

buttonLibs.NavLinkBtn = (p) => {
  let { children, toLink, className, ...props } = p;
  toLink = (toLink) ? toLink : "/";
  className = (className) ? "btn "+className : "btn primary";
  return (<NavLink to={toLink} className={className} onClick={onclick}>{children}</NavLink>)
}

export const StandardBtn = buttonLibs.StandardBtn;
export const NavLinkBtn = buttonLibs.NavLinkBtn;

export default buttonLibs;