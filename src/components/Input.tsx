interface InputProps { 
    placeholder: string; 
    reference?: any
}

export function Input({placeholder, reference}: InputProps) {
    return <div>
        <input ref={reference} placeholder={placeholder} type={"text"} className="px-6 text-md py-2  border rounded m-2" ></input>
    </div>
}