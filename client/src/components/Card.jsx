
const Card = ({props}) => {
    return (
        <div className="bg-[#D9D9D9] w-[100%] rounded-md py-4 hover:scale-[1.05] cursor-pointer">
            <img src={props.url} alt={props.title} className="w-[100%] p-2 md:p-8 lg:p-4" />
            <p className="text-center text-[#363062] text-lg md:text-2xl font-semibold ">{props.title}</p>
        </div>
    )
}

export default Card