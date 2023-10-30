import Select from 'react-select';



export default function CustomSelect(props) {

    // Destructuring props
    const { id, label, labelClassName, error, ...selectProps } = props;


    // Style for select component
    const selectStyles = {
        control: (styles) => ({ ...styles, backgroundColor: 'white' }),
        option: (base) => ({
            ...base,
            cursor: 'pointer',
        }),
        menuList: (base) => ({
            ...base,
            boxShadow: "0 0.1rem 0.2rem 0.1rem rgba(0, 0, 0, 0.082)",
        })
    }

    return (
        <div>
            {/* You can use label and labelClassName from ISelect */}
            {label && <label className={`${labelClassName} select-none`}>{label}</label>}
            <Select
                {...selectProps}
                styles={selectStyles}
                unstyled
                theme={(theme) => ({ ...theme, borderRadius: 0 })}
                classNames={{
                    control: (state) => `border
                                        border-slate-300
                                        rounded-xl
                                        text-secondary-500
                                        duration-300
                                        text-sm
                                        p-2.5
                                        ${state.isFocused ? 'border-slate-500' : ''}
                                        `,
                    option: (state) => `       
                                        p-3
                                        text-sm
                                        duration-300
                                        ${state.isFocused ? 'bg-gray-200 ' : ''}
                                        ${state.isSelected ? 'bg-gray-200 ' : ''}
                                        `,
                    menuList: () => `               
                                        text-sm
                                        duration-300
                                        rounded-md
                                        bg-white
                                        `
                }}
            />

            {error && <span className='text-red-500 text-xs '>{error}</span>}
        </div>
    );
}
