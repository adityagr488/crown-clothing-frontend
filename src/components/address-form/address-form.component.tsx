import { useDispatch, useSelector } from "react-redux";
import { Address, addUserAddressAsync, updateUserAddressAsync } from "../../store/user/user.slice";
import { ActionDispatch } from "../../store/store";
import { selectUserAddressError, selectUserDetailsIsLoading } from "../../store/user/user.selector";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import FormInput from "../form-input/form-input.component";
import { defaultAddressFieldValues } from "../../routes/profile/profile.route";

export const AddressFormType = {
    ADD_ADDRESS : "Add new address",
    UPDATE_ADDRESS: "Update address"
}

const AddressForm: React.FC<{title: string, toggleFormVisibility: any, addressFieldValues: Address, setAddressFieldValues: React.Dispatch<React.SetStateAction<Address>>}> = ({title, toggleFormVisibility, addressFieldValues, setAddressFieldValues}) => {

    const dispatch = useDispatch<ActionDispatch>();

    const isLoading = useSelector(selectUserDetailsIsLoading);
    const addressError = useSelector(selectUserAddressError);

    const [message, setMessage] = useState("");

    const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setAddressFieldValues({ ...addressFieldValues, [name]: value });
    }

    const isFormValid = ()=>{
        return addressFieldValues.tag &&
        addressFieldValues.houseNo &&
        addressFieldValues.area &&
        addressFieldValues.city &&
        addressFieldValues.state &&
        addressFieldValues.pincode &&
        addressFieldValues.mobileNo
    }

    const closeErrorhandler = () => {
        setMessage("");
    }

    useEffect(()=>{
        if(addressError){
            setMessage(addressError);
        }
        else if(!isLoading){
            if(!isFormValid()) {
                setAddressFieldValues(defaultAddressFieldValues);
                return;
            }
            else if(isFormValid()){
                setAddressFieldValues(addressFieldValues);
                return;
            }
            toggleFormVisibility();
        }
        else{
            setAddressFieldValues(defaultAddressFieldValues);
        }
    }, [addressError, isLoading]);

    const formSubmissionHandler = async (event: FormEvent) => {
        event.preventDefault();
        closeErrorhandler();
        if(title === AddressFormType.ADD_ADDRESS){
            dispatch(addUserAddressAsync(addressFieldValues));
        }
        else if(title === AddressFormType.UPDATE_ADDRESS){
            dispatch(updateUserAddressAsync(addressFieldValues));
        }
    }

    return (
        <>
            <div className={message === "" ? "hidden" : "bg-red-100 rounded mx-auto xl:w-1/2 my-2 p-2 text-red-800 flex justify-between"}>
                <span>{message}</span>
                <button className="px-2 py-1 font-medium rounded hover:bg-red-200" onClick={closeErrorhandler}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div className="mx-auto xl:w-1/2 p-4 border-2 rounded">
                <h2 className="text-2xl font-semibold mb-2">{title}</h2>
                <form onSubmit={formSubmissionHandler}>
                    <FormInput label="Tag" type="text" name="tag" value={addressFieldValues.tag} autoComplete="on" onChange={inputChangeHandler} />
                    <FormInput label="House No/Flat No" type="text" name="houseNo" value={addressFieldValues.houseNo} autoComplete="on" onChange={inputChangeHandler} />
                    <FormInput label="Street/Area" type="text" name="area" value={addressFieldValues.area} autoComplete="on" onChange={inputChangeHandler} />
                    <FormInput label="City" type="text" name="city" value={addressFieldValues.city} autoComplete="on" onChange={inputChangeHandler} />
                    <FormInput label="State" type="text" name="state" value={addressFieldValues.state} autoComplete="on" onChange={inputChangeHandler} />
                    <FormInput label="Pincode" type="text" name="pincode" value={addressFieldValues.pincode} autoComplete="on" onChange={inputChangeHandler} />
                    <FormInput label="MobileNo" type="text" name="mobileNo" value={addressFieldValues.mobileNo} autoComplete="on" onChange={inputChangeHandler} />
                    <div className="my-1 flex flex-row">
                        <button
                            type="submit"
                            className="flex justify-center items-center rounded text-white px-6 py-2 
                                bg-green-600 hover:bg-green-700 active:bg-green-800 disabled:opacity-80"
                            disabled={isLoading}
                        >
                            {
                                isLoading
                                &&
                                <div className="h-5 w-5 mr-2 animate-spin rounded-full border-2 border-t-white" />
                            }
                            Save
                        </button>
                        <button
                            type="reset"
                            className="flex justify-center items-center rounded text-white px-6 py-2 ml-3
                                bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:opacity-80"
                            onClick={()=>toggleFormVisibility()}
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddressForm;