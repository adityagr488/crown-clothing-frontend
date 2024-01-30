import React, { InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
}

const FormInput: React.FC<FormInputProps> = ({ label, ...otherProps }) => {
    const { name } = otherProps;
    return (
        <div className="pb-2">
            <label className="block p-1" htmlFor={name}>{label}</label>
            <input className="border-2 rounded p-1 w-full" {...otherProps} />
        </div>
    );
}

export default FormInput;