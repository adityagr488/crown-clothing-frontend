import { useNavigate } from "react-router-dom";

export interface CategoryPreview {
    id: number;
    title: string;
    imageUrl: string;
    route: string;
}

const CategoryItem: React.FC<{ category: CategoryPreview }> = ({ category }) => {

    const { title, imageUrl, route } = category;

    const navigate = useNavigate();

    const onNavigateHandler = () => {
        navigate(route);
    };
    return (
        <div
            className="flex justify-center items-center w-full h-[300px] rounded-lg overflow-hidden mb-4 cursor-pointer
            group"
            onClick={onNavigateHandler}
        >
            <div
                style={{ backgroundImage: `url(${imageUrl})` }}
                className="bg-cover bg-center w-full h-full transition
                group-hover:scale-110 group-hover:duration-1000 group-hover:ease-in-out duration-1000"
            />
            <div className="flex flex-col justify-center px-3 bg-gray-300 bg-opacity-80
             group-hover:bg-white group-hover:opacity-80 border border-black absolute">
                <h2 className="px-2 py-2 text-center text-2xl font-mono font-extrabold">{title}</h2>
                <h2 className="px-2 pb-3 text-center text-xl font-mono font-extrabold">Shop now</h2>
            </div>
        </div>
    );
}

export default CategoryItem;
