import { useEffect, useRef } from 'react';
import './BurgerMenu.css';
import { useMediaQuery } from 'react-responsive';
import { connect, useDispatch } from 'react-redux';
import {
    setBurgerOpen,
    userAccessTokenSet,
    setRefCategory,
    setRefQuestion,
    setAccessTokenAux
} from '../../../actions';
import { ReactSVG } from 'react-svg';
import Exit from '../../../assets/images/svgs/exitQuote.svg'; 
import DefaultAvatar from '../../../assets/images/svgs/defaultAvatar.svg'; 
import Home from '../../../assets/images/svgs/homeIcon.svg'; 
import Cotiza from '../../../assets/images/svgs/cotizaIcon.svg'; 
import Perfil from '../../../assets/images/svgs/perfilIcon.svg'; 
import Faq from '../../../assets/images/svgs/faqIcon.svg'; 
import Contacto from '../../../assets/images/svgs/contactoIcon.svg';
import Reclamos from '../../../assets/images/svgs/reclamoIcon.svg';
import { useNavigate, Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { GetGlobalParams } from '../../../util/GetGlobalParams';
import { GetCountryUrl } from '../../../util/GetCountryUrl';

let isTabletOrMobile = false;

const BurgerMenu = (props: any) => {
    isTabletOrMobile = useMediaQuery({ query: '(max-width: 37.5em)' })
    const navigate = useNavigate();
    const mainRef: any = useRef();
    const dispatch = useDispatch();

    const avatarSize = isTabletOrMobile ? 100 : 125;

    const iconSize = isTabletOrMobile ? 15 : 20;

    useEffect(() => {
        function handleClickOutside(event: any) {
            if (mainRef.current && !mainRef.current.contains(event.target)) {
                props.setBurgerOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [mainRef]);

    return (
        <div
            ref={mainRef}
            className="burgerMenu-container"
            style={{ transform: props.burgerMenuOpen ? `translate(0px, 0px)` : `translate(${-window.screen.width}px, 0px)` }}
        >
            <div className="burgerMenu-container-top">
                <ReactSVG
                    src={Exit}
                    style={{
                        cursor: 'pointer',
                        position: 'absolute',
                        top: 20,
                        right: 20
                    }}
                    onClick={() => props.setBurgerOpen(false)}
                />
                {props.userAccessToken && props.userData?.imageProfile ?
                    <img src={props.userData?.imageProfile} className="burgerMenu-container-top-profileImg" />
                    :
                    <ReactSVG
                        src={DefaultAvatar}
                        beforeInjection={svg => {
                            svg.setAttribute('style', 'height: ' + avatarSize);
                            svg.setAttribute('style', 'width: ' + avatarSize);
                        }}
                    />
                }
                {props.userAccessToken && props.userData ?
                    <div className="burgerMenu-container-top-user">
                        <p className="burgerMenu-container-top-user-name">{props.userData.name + ' ' + props.userData.lastName}</p>
                        <p className="burgerMenu-container-top-user-email">{props.userData.username}</p>
                    </div>
                    :
                    <Link
                        className="burgerMenu-container-top-ingresar"
                        onClick={() => props.setBurgerOpen(false)} 
                        to={GetCountryUrl(props.countryId) + 'login?' + GetGlobalParams()} 
                        state={{ login: 'InicioSesion' }} 
                    >
                        <p className="burgerMenu-container-top-ingresar-text">INGRESAR</p>
                    </Link>
                }
            </div>
            <div className="burgerMenu-container-mask">
                <div className="burgerMenu-container-mask-inner"></div>
            </div>
            <div className="burgerMenu-container-main">
                <div
                    className="burgerMenu-container-main-item"
                    onClick={() => {
                        props.setBurgerOpen(false)
                        if (props.userAccessToken) {
                            navigate(GetCountryUrl(props.countryId) + 'home?' + GetGlobalParams())
                        } else {
                            navigate(GetCountryUrl(props.countryId) + 'inicio?' + GetGlobalParams())
                        }
                    }}
                >
                    <ReactSVG
                        src={Home}
                        beforeInjection={svg => {
                            svg.setAttribute('style', 'height: ' + iconSize);
                            svg.setAttribute('style', 'width: ' + iconSize);
                        }}
                    />
                    <p className="burgerMenu-container-main-item-text">Home</p>
                </div>
                {props.userAccessToken && <div
                    className="burgerMenu-container-main-item"
                    onClick={() => {
                        props.setBurgerOpen(false)
                        navigate(GetCountryUrl(props.countryId) + 'perfil?' + GetGlobalParams())
                        props.setRefCategory(true)
                    }}
                >
                    <ReactSVG
                        src={Perfil}
                        beforeInjection={svg => {
                            svg.setAttribute('style', 'height: ' + iconSize);
                            svg.setAttribute('style', 'width: ' + iconSize);
                        }}
                    />
                    <p className="burgerMenu-container-main-item-text">Mi Perfil</p>
                </div>}
                <div
                    className="burgerMenu-container-main-item"
                    onClick={() => {
                        props.setBurgerOpen(false)
                        navigate(GetCountryUrl(props.countryId) + 'inicio?' + GetGlobalParams())
                        props.setRefCategory(true)
                    }}
                >
                    <ReactSVG
                        src={Cotiza}
                        beforeInjection={svg => {
                            svg.setAttribute('style', 'height: ' + iconSize);
                            svg.setAttribute('style', 'width: ' + iconSize);
                        }}
                    />
                    <p className="burgerMenu-container-main-item-text"><FormattedMessage id="component.footer.cotiza" /></p>
                </div>
                <div 
                    className="burgerMenu-container-main-item"
                    onClick={() => {
                        props.setBurgerOpen(false)
                        navigate(GetCountryUrl(props.countryId) + 'reclamos?' + GetGlobalParams())
                        props.setRefCategory(true)
                    }}
                >
                    <ReactSVG 
                        src={Reclamos}
                        beforeInjection={svg => {
                            svg.setAttribute('style', 'height: ' + iconSize);
                            svg.setAttribute('style', 'width: ' + iconSize);
                        }}
                    />
                    <p className="burgerMenu-container-main-item-text">Mis reclamos</p>
                </div>
                <div
                    className="burgerMenu-container-main-item"
                    onClick={() => {
                        props.setBurgerOpen(false)
                        navigate(GetCountryUrl(props.countryId) + 'inicio?' + GetGlobalParams())
                        props.setRefQuestion(true)
                    }}
                >
                    <ReactSVG
                        src={Faq}
                        beforeInjection={svg => {
                            svg.setAttribute('style', 'height: ' + iconSize);
                            svg.setAttribute('style', 'width: ' + iconSize);
                        }}
                    />
                    <p className="burgerMenu-container-main-item-text">Preguntas frecuentes</p>
                </div>
                <div
                    className="burgerMenu-container-main-item"
                    onClick={() => {
                        props.setBurgerOpen(false)
                        navigate(GetCountryUrl(props.countryId) + 'contacto?' + GetGlobalParams())
                    }}
                >
                    <ReactSVG
                        src={Contacto}
                        beforeInjection={svg => {
                            svg.setAttribute('style', 'height: ' + iconSize);
                            svg.setAttribute('style', 'width: ' + iconSize);
                        }}
                    />
                    <p className="burgerMenu-container-main-item-text">Contactanos</p>
                </div>
            </div>
            {props.userAccessToken && props.userData && <div className="burgerMenu-container-bot">
                <div className="burgerMenu-container-bot-line"></div>
                <p
                    className="burgerMenu-container-bot-cerrar"
                    onClick={() => {
                        props.userAccessTokenSet(null);
                        dispatch(setAccessTokenAux(null));
                        dispatch({ type: 'USER_DATA', payload: null });
                        navigate(GetCountryUrl(props.countryId) + 'inicio?' + GetGlobalParams())
                        props.setBurgerOpen(false)
                    }}
                >Cerrar Sesion</p>
            </div>}
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return {
        countryId: state.general.countryId,
        burgerMenuOpen: state.general.burgerMenuOpen,
        userData: state.user.userData,
        userAccessToken: state.general.userAccessToken,
    };
};

export default connect(mapStateToProps, {
    setBurgerOpen,
    userAccessTokenSet,
    setRefCategory,
    setRefQuestion
})(BurgerMenu);