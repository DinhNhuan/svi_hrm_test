
const Loading = ({isOpen}) => {

    return (
        <>
            {isOpen ?
                <div
                    className="fixed inset-0 flex items-center justify-center z-50"
                >
                    <div className="fixed inset-0 bg-black opacity-20"></div>
                    <div className="w-12 h-12 rounded-full animate-spin
                    border-[2.5px] border-dashed  border-primary-500 border-t-transparent"></div>
                </div>
                : null}
        </>
    )
}

export default Loading