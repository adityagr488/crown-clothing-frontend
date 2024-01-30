import { Route, Routes } from "react-router-dom";
import LoginForm from "../../components/login-form/login-form.component";
import SignUpForm from "../../components/signup-form/signup-form.component";

const Authentication = () => {
    return (
        <Routes>
            <Route path="login" element={<LoginForm />} />
            <Route path="signup" element={<SignUpForm />} />
        </Routes>
    );
}

export default Authentication;

