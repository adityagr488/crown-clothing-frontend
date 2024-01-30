import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUserDetails } from "../../store/user/user.selector";
import LocationIcon from "../../icons/location.icon";
import MobileIcon from "../../icons/mobile.icon";
import EditIcon from "../../icons/edit.icon";
import DeleteIcon from "../../icons/delete.icon";
import AddressForm, { AddressFormType } from "../../components/address-form/address-form.component";
import { Address, deleteUserAddressAsync } from "../../store/user/user.slice";
import { ActionDispatch } from "../../store/store";
import { Link } from "react-router-dom";

export const defaultAddressFieldValues: Address = {
    tag: "",
    houseNo: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
    mobileNo: ""
}

const Profile = () => {

    const dispatch = useDispatch<ActionDispatch>();
    const user = useSelector(selectCurrentUserDetails);
    const addresses = user?.addresses;
    const addressFormRef = useRef<HTMLDivElement>(null);
    const [addressFormTitle, setAddressFormTitle] = useState("");
    const [formVisibility, setFormVisibility] = useState(false);
    const [addressFieldValues, setAddressFieldValues] = useState(defaultAddressFieldValues);

    useEffect(() => {
        if (formVisibility && addressFormRef.current) {
            addressFormRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [formVisibility]);

    const toggleFormVisibility = (title?: string, id?: string) => {
        if (title) {
            setAddressFormTitle(title);
        }
        if (id) {
            if (formVisibility && id === addressFieldValues.id) {
                setFormVisibility(false);
            }
            else {
                const addressToEdit = addresses?.find((address) => address.id === id);
                setAddressFieldValues(addressToEdit!);
                setFormVisibility(true);
            }
            return;
        }
        else {
            setAddressFieldValues(defaultAddressFieldValues);
            setFormVisibility(!formVisibility);
        }
    }

    const deleteAddress = (address_id: string) => {
        dispatch(deleteUserAddressAsync(address_id));
    }


    return (
        <div className="md:w-2/3 xl:w-1/2 md:mx-auto m-4">
            {
                user &&
                <>
                    <div className="mt-6">
                        <h2 className="text-2xl font-semibold mb-2">Personal Details:</h2>
                        <div className="flex flex-row md:items-center bg-white shadow-md px-4 py-2 md:p-0 rounded-md">
                            <div className="flex justify-center items-center">
                                <div className="w-20 h-20 md:w-28 md:h-28 bg-red-500 rounded-[50%] md:rounded-none flex items-center justify-center">
                                    <span className="text-white text-4xl">
                                        {user.name[0]}
                                    </span>
                                </div>
                            </div>
                            <div className="mt-4 md:w-2/3 md:mt-0 md:ml-4 px-2">
                                <div className="mb-2">
                                    <span className="font-bold block">Name:</span> {user?.name}
                                </div>
                                <div className="mb-2">
                                    <span className="font-bold block">Email:</span> {user?.email}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="my-6">
                        <h2 className="text-2xl font-semibold mb-2">Saved Addresses:</h2>
                        <div className="bg-white shadow-md p-2 rounded-md">
                            {user?.addresses.map((address, idx) => {
                                return (
                                    <div className="mb-2 flex flex-col" key={idx}>
                                        <div className="flex flex-col xl:flex-row xl:items-center">
                                            <div className="p-2 mr-2 xl:w-1/2">
                                                <div className="inline-flex items-center">
                                                    <LocationIcon className="w-6 h-6" color="#756AB6" />
                                                    <span className="ml-2 mb-2 text-xl font-bold">{address.tag}</span>
                                                </div>
                                                <div className="flex flex-col ml-7">
                                                    <span className="mb-1">{address.houseNo}, {address.area}, {address.city}, {address.state} - {address.pincode}</span>
                                                    <span className="mb-1 inline-flex items-center">
                                                        <MobileIcon className="w-5 h-5" color="#756AB6" />
                                                        {address.mobileNo}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="ml-7 mt-3 pl-2 md:mr-2">
                                                <button
                                                    className="bg-orange-600 hover:bg-orange-700 active:bg-orange-800 
                                            px-3 py-2 text-white inline-flex items-center rounded-md"
                                                    onClick={() => toggleFormVisibility(AddressFormType.UPDATE_ADDRESS, address.id)}
                                                >
                                                    <EditIcon className="w-5 h-5" color="white" />
                                                    <span className="ml-1">Edit</span>
                                                </button>
                                                <button
                                                    className="ml-4 bg-red-600 hover:bg-red-700 active:bg-red-800 px-3 py-2 
                                            text-white inline-flex items-center rounded-md"
                                                    onClick={() => deleteAddress(address.id!)}
                                                >
                                                    <DeleteIcon className="w-5 h-5" color="white" />
                                                    <span className="ml-1">Delete</span>
                                                </button>
                                            </div>
                                        </div>
                                        {
                                            idx !== user.addresses.length - 1 && <hr className="ml-6 mt-3" />
                                        }
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {
                        formVisibility &&
                        <div ref={addressFormRef}>
                            <AddressForm
                                title={addressFormTitle}
                                toggleFormVisibility={toggleFormVisibility}
                                addressFieldValues={addressFieldValues}
                                setAddressFieldValues={setAddressFieldValues}
                            />
                        </div>
                    }
                    {
                        !formVisibility
                        &&
                        <div className="mt-4 text-center">
                            <button
                                className="bg-green-600 hover:bg-green-700 active:bg-green-800 px-3 py-2 text-white rounded-md inline-flex"
                                onClick={() => toggleFormVisibility(AddressFormType.ADD_ADDRESS)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                                </svg>
                                <span className="ml-1">Add address</span>
                            </button>
                        </div>
                    }
                </>
            }
            {
                !user &&
                <div className="text-center mt-6">
                    <span className="text-xl">
                        Please <Link to="/auth/login" className="text-blue-700">Login</Link> to continue.
                    </span>
                </div>
            }
        </div>
    );
};

export default Profile;
