
const Button = ({
    type = 'button',
    isPadding = true,
    children,
    icon: Icon,
    iconPos = null,
    onClick,
    ...props
}) => {

    return (
        <button
            onClick={onClick}
            {...props}
            className={`${props.className}
                        ${isPadding ? 'px-8 py-2' : ''}
                        rounded-3xl
                        flex
                        justify-center
                        items-center
                        gap-2
                        duration-300
                        border
                        capitalize
                        text-sm
                        font-nunito`}
        >
            {iconPos === 'left' && Icon && <Icon />} {children} {iconPos === 'right' && Icon && <Icon />}
        </button>
    )
}

export default Button