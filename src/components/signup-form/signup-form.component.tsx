import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../form-input/form-input.component";
import { Link, useNavigate } from "react-router-dom";
import CrownIcon from "../../icons/crown.icon";
import { ActionDispatch } from "../../store/store";
import { signupUserAsync } from "../../store/user/user.slice";
import { selectUserDetailsSignUpError, selectUserDetailsIsLoading } from "../../store/user/user.selector";

const defaultFormFields = {
    name: "",
    email: "",
    password: ""
}

const SignUpForm = () => {

    const dispatch = useDispatch<ActionDispatch>();
    const navigate = useNavigate();
    const isLoading = useSelector(selectUserDetailsIsLoading);
    const signUpError = useSelector(selectUserDetailsSignUpError);

    const [formFields, setFormFields] = useState(defaultFormFields);
    const [message, setMessage] = useState("");
    const { name, email, password } = formFields;

    const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }

    const isFormValid = () => {
        return formFields.name && formFields.email && formFields.password;
    };

    const resetFormFields = () => setFormFields(defaultFormFields);

    useEffect(() => {
        if (signUpError) {
            setMessage(signUpError);
        } else if (!isLoading && isFormValid()) {
            resetFormFields();
            navigate("/auth/login");
        }
    }, [signUpError, isLoading, navigate]);

    const closeErrorhandler = () => {
        setMessage("");
    }

    const formSubmissionHandler = (event: FormEvent) => {
        event.preventDefault();
        closeErrorhandler();
        dispatch(signupUserAsync({ name, email, password }));
    }

    return (
        <div className="mx-5 my-10 md:w-1/2 xl:w-1/3 md:mx-auto">
            <div className="flex flex-col">
                <div className="flex justify-center pb-4">
                    <Link to="/">
                        <CrownIcon />
                    </Link>
                </div>
                <div className="text-center text-2xl mb-4">
                    <span className="text-[#C21292] font-serif font-semibold">Signup to Crown Clothing</span>
                </div>
                {
                    !isLoading
                    &&
                    <div className={message === "" ? "hidden" : "bg-red-100 rounded my-2 p-2 text-red-800 flex justify-between items-center"}>
                        <span>{message}</span>
                        <button className="font-medium rounded hover:bg-red-200" onClick={closeErrorhandler}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                }
                <div className="p-4 border-2 rounded">
                    <form onSubmit={formSubmissionHandler}>
                        <FormInput
                            label="Name"
                            type="text"
                            name="name"
                            value={name}
                            required
                            autoComplete="on"
                            onChange={inputChangeHandler} />
                        <FormInput
                            label="Email"
                            type="email"
                            name="email"
                            value={email}
                            required
                            autoComplete="on"
                            onChange={inputChangeHandler} />
                        <FormInput
                            label="Password"
                            type="password"
                            name="password"
                            value={password}
                            required
                            autoComplete="on"
                            onChange={inputChangeHandler} />
                        <div className="my-1">
                            <button type="submit"
                                className="flex justify-center items-center rounded text-white w-full py-2 bg-blue-700 hover:bg-blue-500 active:bg-blue-900 disabled:opacity-80"
                                disabled={isLoading}
                            >
                                {
                                    isLoading
                                    &&
                                    <div className="h-5 w-5 mr-2 animate-spin rounded-full border-2 border-t-white" />
                                }
                                Signup
                            </button>
                        </div>
                    </form>
                </div>
                <div className="my-3 text-center">
                    Already have an account? <Link to="/auth/login" className="text-blue-500">Login</Link>
                </div>
            </div>
        </div>
    );
}

export default SignUpForm;

{/* < span className="mx-2 border-blue-700 border-2 text-blue-600 px-2 rounded-xl font-bold font-serif" onClick={passwordInfoToggler}>i</span>
<div className={passwordInfoToggle ? "absolute z-10 mt-2 origin-top-right rounded-md bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" : "hidden"}>
    Password should have:
    <ul>
        <li>* 8 or more characters</li>
        <li>* one lowercase letter</li>
        <li>* one uppercase letter</li>
        <li>* one digit</li>
        <li>* one special character</li>
    </ul>
</div> */}
