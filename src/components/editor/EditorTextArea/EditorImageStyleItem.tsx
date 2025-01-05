import Image from "next/image";

interface EditorImageStyleItemProps {
    imgSrc: string;
    title: string;
    onClick: () => void;
};

export const EditorImageStyleItem: React.FC<EditorImageStyleItemProps> = ({ imgSrc, onClick, title }) => (
    <div onClick={onClick} className="">
        <Image alt='image style' src={imgSrc} width={150} height={300}/>
        <p>{title}</p>
    </div>
);