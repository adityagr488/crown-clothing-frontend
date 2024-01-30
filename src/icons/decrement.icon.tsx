const DecrementIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({className, color}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={color} className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
        </svg>
    );
}

export default DecrementIcon;