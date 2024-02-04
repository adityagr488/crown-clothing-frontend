const MenuIcon: React.FC<{ menuVisibility: boolean, setMenuVisibility: React.Dispatch<React.SetStateAction<boolean>> }> = ({ menuVisibility, setMenuVisibility }) => {

    const menuVisibilityHandler = () => {
        setMenuVisibility(!menuVisibility);
    }

    return (
        <div className="lg:hidden ml-2 mt-2" onClick={menuVisibilityHandler}>
            {
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#756AB6" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                </svg>
            }
        </div>
    );
}

export default MenuIcon;