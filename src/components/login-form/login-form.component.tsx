import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../form-input/form-input.component";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CrownIcon from "../../icons/crown.icon";
import { loginUserAsync, setUserDropDownVisibility } from "../../store/user/user.slice";
import { ActionDispatch } from "../../store/store";
import { selectUserDetailsLoginError, selectUserDetailsIsLoading, selectUserSessionError } from "../../store/user/user.selector";

const defaultFormFields = {
    email: "",
    password: ""
}

const LoginForm = () => {

    const dispatch = useDispatch<ActionDispatch>();
    const navigate = useNavigate();
    const { state } = useLocation();
    const isLoading = useSelector(selectUserDetailsIsLoading);
    const loginError = useSelector(selectUserDetailsLoginError);
    const sessionError = useSelector(selectUserSessionError);

    const [formFields, setFormFields] = useState(defaultFormFields);
    const [message, setMessage] = useState("");
    const { email, password } = formFields;


    const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }

    const isFormValid = () => {
        return formFields.email && formFields.password;
    };

    const resetFormFields = () => setFormFields(defaultFormFields);

    useEffect(() => {
        if (sessionError) {
            setMessage(sessionError);
        }
        else if (!isLoading && loginError) {
            setMessage(loginError);
        } else if (!isLoading && isFormValid()) {
            resetFormFields();
            const redirectUrl = state?.redirectUrl || "/";
            navigate(redirectUrl);
        }
    }, [sessionError, isLoading, loginError, state, navigate]);

    const closeErrorhandler = () => {
        setMessage("");
    }

    const formSubmissionHandler = async (event: FormEvent) => {
        event.preventDefault();
        closeErrorhandler();
        dispatch(loginUserAsync({ email, password }));
        dispatch(setUserDropDownVisibility(false));
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
                    <span className="text-[#C21292] font-serif font-semibold">Login to CROWN</span>
                </div>
                {
                    !isLoading
                    &&
                    <div className={message === "" ? "hidden" : "bg-red-100 rounded my-2 p-2 text-red-800 flex justify-between"}>
                        <span>{message}</span>
                        <button className="px-2 py-1 font-medium rounded hover:bg-red-200" onClick={closeErrorhandler}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                }
                <div className="p-4 border-2 rounded">
                    <form onSubmit={formSubmissionHandler}>
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
                                Login
                            </button>
                        </div>
                    </form>
                </div>
                <div className="my-3 text-center">
                    Don't have an account? <Link to="/auth/signup" className="text-blue-500">Signup</Link>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
