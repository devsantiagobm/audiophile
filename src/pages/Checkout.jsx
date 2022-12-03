import { useEffect, useState, useRef } from "react"
import MoneyIcon from "/images/checkout/icon-cash-on-delivery.svg"
import { motion } from "framer-motion"
import useFormatter from "../hooks/useFormatter"
import getContext from "../Context"
import { Link, useNavigate } from "react-router-dom"
import { BsCheck2 as CheckIcon } from "react-icons/bs"

export default function Checkout() {
    const [cashMethod, setCashMethod] = useState(false)
    const [isSent, setIsSent] = useState(false);
    const { cart, total, setCart } = getContext()
    const navigation = useNavigate()
    const $form = useRef(null)

    useEffect(() => {
        cart.length === 0 ? navigation("/") : null
    }, [cart])


    const totals = [
        {
            text: "total",
            quantity: useFormatter(Math.round(total))
        },
        {
            text: "shipping",
            quantity: useFormatter(50)
        },
        {
            text: "vat (included)",
            quantity: useFormatter(Math.round(total * 0.2))
        },
        {
            text: "grand total",
            quantity: useFormatter(Math.round(total + 50 + (total * 0.2)))
        },

    ]

    function handleSubmit(e) {
        e.preventDefault()
        const data = Object.entries(Object.fromEntries(new FormData(e.target)))
        const dataWrong = useGetDataWrong(data)
        resetInputs()

        dataWrong.length === 0
            ? noWrongData()
            : showDataWrong(dataWrong)
    }

    function noWrongData(){
        setIsSent(true);
        $form.current.reset();
    }

    function showDataWrong(data) {
        const form = $form.current;

        for (const input of data) {
            form[input].parentElement.classList.add('checkout__box--error')
        }

    }

    function resetInputs() {
        for (const input of document.querySelectorAll(".checkout__box")) {
            input.classList.remove("checkout__box--error")
        }
    }

    function useGetDataWrong(datos) {
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        return datos.filter(([key, value]) => {
            return key === "email" ? !value.match(regex) : value === ""
        })
            .map(([key]) => key)
    }

    return (
        <>
            {isSent ? <Greetings /> : null }
            <form className="checkout" method="#" action="#" onSubmit={handleSubmit} ref={$form}>
                <div className="checkout__column">
                    <div className="checkout__form" spellCheck={"false"}>

                        <h1 className="checkout__title">checkout</h1>

                        <div className="checkout__section">
                            <span className="checkout__subtitle">billing details</span>
                            <div className="checkout__structure">

                                {
                                    inputs.slice(0, 3).map(input => {
                                        const { name } = input
                                        return <Input key={name} element={input} />
                                    })
                                }
                            </div>
                        </div>

                        <div className="checkout__section">
                            <span className="checkout__subtitle">shipping info</span>

                            <div className="checkout__structure">

                                {
                                    inputs.slice(3, 7).map(input => {
                                        const { name } = input
                                        return <Input key={name} element={input} />
                                    })
                                }
                            </div>
                        </div>

                        <div className="checkout__section">
                            <span className="checkout__subtitle">payment details</span>

                            <div className="checkout__method">
                                <span className="checkout__label-and-error">
                                    payment method
                                </span>

                                <div className="checkout__checkboxes">

                                    <label htmlFor="money" className="checkout__checkbox checkbox">
                                        <input onInput={() => setCashMethod(false)}
                                            hidden
                                            type="radio"
                                            name="method"
                                            id="money"
                                            defaultChecked
                                            className="checkbox__input" />
                                        <div className="checkbox__button"></div>
                                        <span className="checkbox__text">e-Money</span>
                                        <div className="checkbox__border"></div>
                                    </label>

                                    <label htmlFor="cash" className="checkout__checkbox checkbox">
                                        <input onInput={() => setCashMethod(true)}
                                            hidden
                                            type="radio"
                                            name="method"
                                            id="cash"
                                            className="checkbox__input" />
                                        <div className="checkbox__button"></div>
                                        <span className="checkbox__text">Cash on Delivery</span>
                                        <div className="checkbox__border"></div>
                                    </label>

                                </div>

                                {
                                    cashMethod
                                        ? <Cash />
                                        : <EMoney />
                                }

                            </div>
                        </div>

                    </div>
                </div>

                <div className="checkout__column">
                    <div className="checkout__summary">
                        <h2 className="checkout__title checkout__title--small">
                            summary
                        </h2>
                        <div className="cart__list">
                            {
                                cart.map(product => {
                                    const { id } = product
                                    return <ProductItem key={id} product={product} />
                                })
                            }

                        </div>

                        <div className="checkout__prices">
                            {
                                totals.map(({ text, quantity }) => (
                                    <div className="checkout__total" key={text}>
                                        <span className="checkout__price-text">
                                            {text}
                                        </span>
                                        <span className="checkout__price-data">
                                            {quantity}
                                        </span>
                                    </div>
                                ))
                            }
                        </div>

                        <button className="checkout__button">continue & pay</button>
                    </div>
                </div>

            </form>
        </>

    )
}

const inputs = [
    {
        name: "name",
        type: "text",
        error: "Name cannot be empty",
        label: "name",
        placeholder: "Alexei Ward"
    },
    {
        name: "email",
        type: "text",
        error: "Looks like this is not an email",
        label: "email adress",
        placeholder: "alexei@mail.com"
    },
    {
        name: "phone",
        type: "number",
        error: "Phone cannot be empty",
        label: "phone number",
        placeholder: "+1 202-555-0136"
    },
    {
        name: "address",
        type: "text",
        error: "Adress cannot be empty",
        label: "address",
        placeholder: "1137 williams avenue"
    },
    {
        name: "zip",
        type: "number",
        error: "ZIP code cannot be empty",
        label: "ZIP code",
        placeholder: "10001"
    },
    {
        name: "city",
        type: "text",
        error: "City cannot be empty",
        label: "city",
        placeholder: "new york"
    },
    {
        name: "country",
        type: "text",
        error: "Country cannot be empty",
        label: "country",
        placeholder: "united states"
    },
    {
        name: "e-money",
        type: "number",
        error: "Number cannot be empty",
        label: "e-Money number",
        placeholder: "238521993"
    },
    {
        name: "e-money-pin",
        type: "number",
        error: "PIN cannot be empty",
        label: "e-money PIN",
        placeholder: "6891"
    },
]

function Input({ element }) {
    const { name, error, label, type, placeholder } = element;
    return (
        <div className="checkout__box" key={name} data-name={name}>
            <div className="checkout__label-and-error">
                <label htmlFor={name} className="checkout__label">{label}</label>
                <span className="checkout__error">{error}</span>
            </div>
            <input className="checkout__input" type={type} name={name} id={name} placeholder={placeholder} />
        </div>
    )
}

function ProductItem({ product }) {
    const { cartImage, id, quantity, shortName, price } = product

    return (
        <div className="cart__item">
            <div className="cart__information">
                <picture className="cart__picture">
                    <img src={cartImage} alt={`${shortName} name`} className="cart__image" />
                </picture>
                <div className="cart__data">
                    <span className="cart__name">{shortName}</span>
                    <span className="cart__total-price">{useFormatter(price)}</span>
                </div>
            </div>

            <div className="cart__amount">
                x{quantity}
            </div>
        </div>
    )
}

function EMoney() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: .3 }}
            className="checkout__structure checkout__structure--e-money">
            {
                inputs.slice(7, 9).map(input => {
                    const { name } = input
                    return <Input key={name} element={input} />
                })
            }
        </motion.div>
    )
}

function Cash() {
    return (


        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: .3 }}
            className="checkout__pay-in-cash">
            <img src={MoneyIcon} alt="" />
            <p className="checkout__paragraph">
                The ‘Cash on Delivery’ option enables you to pay in cash when our delivery courier arrives at your residence. Just make sure your address is correct so that your order will not be cancelled.
            </p>

        </motion.div>
    )
}

function Greetings() {
    const { setCart, total} = getContext()
    return (
        <motion.div className="greetings"
            animate={{ opacity: [0,1] }}
            transition={{duration: .4}}
        >
            <div className="greetings__box">
                <picture className="greetings__picture">
                    <CheckIcon/>
                </picture>

                <h3 className="greetings__title">
                    thank you for your order
                </h3>

                <span className="greetings__subtitle">
                    You will receive an email confirmation shortly.
                </span>

                <div className="greetings__total">
                    <span>grand total</span>
                    <span className="greetings__total-amount">{useFormatter(Math.round(total + 50 + (total * 0.2)))}</span>
                </div>

                <Link to="/" className="greetings__button" onClick={() => { setCart([]); window.scroll({ top: 0}) }}>back to home</Link>
            </div>

        </motion.div>
    )
}
