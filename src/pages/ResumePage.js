import React, { useEffect, useRef, useState } from "react";
import { Form, Link } from "react-router-dom";
import "./ResumePage.css";

function PersonalInfo() {

    const [formErrors, setFormErrors] = useState({});
    console.log(formErrors);
    const [FormData, setFormData] = useState(JSON.parse(sessionStorage.getItem('userData')) || {
        name: '',
        surname: '',
        email: '',
        phone_number: '',
        experiences: [],
        educations: [],
        image: '',
        about_me: ''
    })
    console.log(FormData)

    useEffect(() => {
        sessionStorage.setItem('userData', JSON.stringify(FormData));
        setFormErrors(validate(FormData));
    }, [FormData])

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    function handleChange(event) {
        const { name, value, type, checked, files } = event.target
        try {
            toBase64(files[0]).then((res) => { sessionStorage.setItem('File', res) })
        } catch { }
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value,
                [name]: type === "file" ? URL.createObjectURL(files[0]) : value
            }
        })
    }


    const validate = (values) => {
        const errors = {};
        const pattern = /^[ა-ჰ]+$/;
        if (values.name.length < 2) {
            errors.name = true;
        } else if (!pattern.test(values.name)) {
            errors.name = true;
        }
        if (values.surname.length < 2) {
            errors.surname = true;
        } else if (!pattern.test(values.surname)) {
            errors.surname = true;
        }
        if (!values.image) {
            errors.image = true;
        }
        if (values.about_me.length > 0) {
            errors.about_me = false;
        }
        if (!values.email) {
            errors.email = true;
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
            errors.email = true;
        } else if (values.email.split('@')[1] !== 'redberry.ge') {
            errors.email = true;
        }
        if (!values.phone_number) {
            errors.phone_number = true
        } else if (!/\+\S*9\S*9\S*5\S*5\S*[976514]\S*\d\S*\d\S*\d\S*\d\S*\d\S*\d\S*\d\S*/.test(values.phone_number)) {
            errors.phone_number = true
        }
        return errors;
    }


    function handleSubmit(event) {
        event.preventDefault();
    }

    const redColor = {
        color: '#E52F2F'
    };
    const borderRedColor = {
        border: '1px solid #EF5050'
    }

    const greenBorderColor = {
        border: '1px solid #98E37E'
    }

    return (
        <div className="personal-info">
            <form className="form-content" onSubmit={handleSubmit}>
                <Link to={"/"}>
                    <div className="goToFirstPage"><img src="./images/arrow.png" alt="" /></div>
                </Link>
                <div className="content-width">
                    <div className="content-header">
                        <div className="header-title">პირადი ინფო</div>
                        <span>1/3</span>
                    </div>
                    <div className="headerBottomLine"></div>
                    <div className="input-content">
                        <div className="input-flex">
                            <div className="text-input">
                                <label style={formErrors.name && redColor} className="input-header">სახელი</label>
                                <input
                                    type="text"
                                    placeholder="ანზორ"
                                    name="name"
                                    value={FormData.name}
                                    onChange={handleChange}
                                    style={formErrors.name ? borderRedColor : greenBorderColor}
                                />
                                <span>მინიმუმ 2 ასო,ქართული ასოები</span>
                            </div>
                            <div className="text-input">
                                <label htmlFor="surname" className="input-header">გვარი</label>
                                <input
                                    type="text"
                                    placeholder="მუმლაძე"
                                    name="surname"
                                    value={FormData.surname}
                                    onChange={handleChange}
                                />
                                <span>მინიმუმ 2 ასო,ქართული ასოები</span>
                            </div>
                        </div>
                    </div>
                    <div className="upload-image">
                        <label>პირადი ფოტოს ატვირთვა</label>
                        <input
                            type="file"
                            id="image"
                            onChange={handleChange}
                            name="image"
                            accept='image*/'
                            hidden
                        />
                        <label htmlFor="image" id="upload-image">ატვირთე</label>
                    </div>
                    <div className="text-input">
                        <label htmlFor="about_me" className="input-header">ჩემს შესახებ (არასავალდებულო)</label>
                        <textarea
                            placeholder="ზოგადი ინფო შენს შესახებ"
                            className="textarea"
                            name="about_me"
                            value={FormData.about_me}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="text-input margin-tb">
                        <label htmlFor="email" className="input-header">ელ.ფოსტა</label>
                        <input
                            type="email"
                            placeholder="anzor69@redberry.ge"
                            name="email"
                            value={FormData.email}
                            onChange={handleChange}
                        />
                        <span>უნდა მთავრდებოდეს @redberry.ge-ით</span>
                    </div>
                    <div className="text-input margin-tb">
                        <label htmlFor="phone_number" className="input-header">მობილურის ნომერი</label>
                        <input
                            type="text"
                            placeholder="+995 551 12 34 56"
                            name="phone_number"
                            value={FormData.phone_number}
                            onChange={handleChange}
                        />
                        <span>უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს</span>
                    </div>
                    <button className="next-button">შემდეგი</button>
                </div>
            </form>
            <div className="output-content">
                <div className="flex-cv">
                    <div className="inl">
                        <div className="cv-title">
                            {FormData.name &&
                                <div className="name">{FormData.name}</div>
                            }
                            {FormData.name &&
                                <div className="surname">{FormData.surname}</div>
                            }
                        </div>
                        {FormData.email && <div className="cv-email">
                            <img src="./images/email.png" />
                            <span>{FormData.email}</span>
                        </div>}
                        {FormData.phone_number && <div className="cv-phone">
                            <img src="./images/phone.png" />
                            <span>{FormData.phone_number}</span>
                        </div>}
                        {FormData.about_me && <div className="cv-about">
                            <h1 className="title-about-me">ჩემს შესახებ</h1>
                            <p>{FormData.about_me}</p>
                        </div>}
                    </div>
                    {FormData.image &&
                        <img id="cv-image" src={FormData.image} alt="" />
                    }
                </div>
            </div>
        </div>
    )
}

export default PersonalInfo