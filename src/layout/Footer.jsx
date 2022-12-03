import Logo from "/images/shared/desktop/logo.svg"
import { Link } from "react-router-dom"
import { BsTwitter as TwitterLogo } from "react-icons/bs"
import { AiFillFacebook as FacebookLogo } from "react-icons/ai"

export default function Footer() {

    function goUp() {

        window.scroll({
            top: 0,
            left: 0,
        })
    }

    return (
        <footer className='footer'>

            <div className="footer__row">
                <picture className="footer__picture">
                    <img src={Logo} alt="audiophile logo image" />
                </picture>
                <ul className="footer__list">
                    {
                        links.map(({ link, id }) => (
                            <li key={id} onClick={goUp}>
                                <Link to={link} className="footer__link">{id}</Link>
                            </li>
                        ))
                    }
                </ul>
            </div>

            <div className="footer__row">

                <div className="footer__column">
                    <p className="footer__paragraph">
                        Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we’re open 7 days a week.
                    </p>
                    <span className="footer__rights">
                        Copyright 2021. All Rights Reserved
                    </span>
                </div>

                <div className="footer__column">

                    {
                        socialMedia.map(({ link, Icon }) => (
                            <a href={link} key={link} target="_blank">
                                <Icon className="footer__icon" />
                            </a >
                        ))

                    }
                </div>
            </div>


        </footer>
    )
}

const links = [
    {
        link: "/",
        id: "home"
    },
    {
        link: "/headphones",
        id: "headphones"
    },
    {
        link: "/speakers",
        id: "speakers"
    },
    {
        link: "/earphones",
        id: "earphones"
    },
]

const socialMedia = [
    {
        link: "https://web.facebook.com/frontendmentor/?_rdc=1&_rdr",
        Icon: FacebookLogo
    },
    {
        link: "https://twitter.com/frontendmentor",
        Icon: TwitterLogo
    }
]