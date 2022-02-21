import React, { useEffect, useState } from 'react';
import './Header.css';
import { useMediaQuery } from 'react-responsive';
import { connect } from 'react-redux';
import { 
  changeCountryId,
  setBurgerOpen 
} from '../../../actions';
import { ReactSVG } from 'react-svg';
import Burger from '../../../assets/images/svgs/burger.svg';
import BurgerColor from '../../../assets/images/svgs/burgerColor.svg';
import { ReactComponent as Arrow } from '../../../assets/images/svgs/arrowCountry.svg';
import { useNavigate } from 'react-router-dom';
import { countries } from '../../../data';
import logoWhite from '../../../assets/images/logoWhite.png';
import logoColor from '../../../assets/images/logoColor.png';
import { GetGlobalParams } from '../../../util/GetGlobalParams';
import { GetCountryUrl } from '../../../util/GetCountryUrl';

let isTabletOrMobile = false;

const Header = (props: any) => {
  isTabletOrMobile = useMediaQuery({ query: '(max-width: 37.5em)' })

  const [menuOpen, setMenuOpen] = useState<boolean>(false)

  const navigate = useNavigate();

  const countrySize = 45;

  const renderCurrentCountry = () => {
    const country = countries.find(c => c.id === props.countryId);
    if (country != null) {
      const Logo = country.img;
      return <Logo height={countrySize} width={countrySize}/>
    }
  }

  const renderOtherCountry = () => {
    if (menuOpen) {
      const countryCurrentIndex = countries.findIndex(c => c.id === props.countryId);

      let otherCountries = countries;
      if (countryCurrentIndex !== -1) {
        otherCountries = countries.splice(countryCurrentIndex, 1);
      }

      return otherCountries.map(c => {
        return (
          <div>
          </div>
        )
      });
    }
  }

  return (
    <div
      className={props.fixed ? "header-containerFixed" : "header-container"}
      style={{
        backgroundColor: 
          props.home || props.admin ? 'transparent' :
          props.backgroundColor ? props.backgroundColor : 
          props.color ? props.color : 'var(--primaryBackgroundColor)'
      }}
    >
      { !props.burger && <ReactSVG 
       src={props.backgroundColor === '#FFFFFF' || props.backgroundColor === '#F4F4F4' || props.admin ? BurgerColor : Burger}
       style={{cursor: 'pointer'}}
       onClick={() => props.setBurgerOpen(true)}
     />}
      <div className="header-container-right">
        {<div
          className={menuOpen ? "header-container-right-countrySelectorOpen" : "header-container-right-countrySelectorClose"}
          style={{
            width: props.enabled ? 96 : 46,
            backgroundColor: props.secondaryColor ? props.secondaryColor : 'var(--eigthBackgroundColor)'
          }}
          >
          <div
            className="header-container-right-countryInnerContainer"
            style={{
              marginLeft: menuOpen ? 10 : 0,
              marginTop: menuOpen ? 10 : 5,
            }}
           >
            <div
              className="header-container-right-countrySelectorOpen-current"
              onClick={() => props.enabled ? setMenuOpen(!menuOpen) : {}}
             >
              {renderCurrentCountry()}
              {props.enabled && <Arrow />}
            </div>
            {renderOtherCountry()}
          </div>
        </div> }
        {!isTabletOrMobile && !props.admin ?
          <img 
            onClick={() => navigate(GetCountryUrl(props.countryId) + 'inicio?' + GetGlobalParams())} 
            className="header-container-right-logo"
            src={logoWhite} 
            alt="" 
            style={{width: isTabletOrMobile ? '30%' : '40%', borderBottomLeftRadius: 0, margin: 0}}
          /> : props.colored ?
            <img 
              onClick={() => navigate(GetCountryUrl(props.countryId) + 'inicio?' + GetGlobalParams())} 
              className="header-container-right-logo"
              src={logoWhite} 
              alt="" 
              style={{width: isTabletOrMobile ? '30%' : '40%', borderBottomLeftRadius: 0, margin: 0}}
            /> :
            !props.admin ?
            <img 
              onClick={() => navigate(GetCountryUrl(props.countryId) + 'inicio?'+ GetGlobalParams())} 
              className="header-container-right-logo"
              src={logoColor} 
              alt="" 
              style={{width: isTabletOrMobile ? '30%' : '40%', borderBottomLeftRadius: 0, margin: 0}}
            />
            :
            null
        }
        {props.candado ? 
        <img 
          onClick={() => navigate(GetCountryUrl(props.countryId) + 'inicio?' + GetGlobalParams())} 
          className="header-container-right-logo"
          src={logoColor} 
          alt="" 
          style={{width: isTabletOrMobile ? '30%' : '40%', borderBottomLeftRadius: 0, margin: 0}}
        />
    :
    null}
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    countryId: state.general.countryId,
  };
};

export default connect(mapStateToProps, {
  changeCountryId,
  setBurgerOpen
})(Header);