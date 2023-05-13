import { useForm } from "react-hook-form";
import {Select, Button, TextInput} from "flowbite-react";

export default function Form({onSubmit = () => {}, inputs, btn}) {
    const { register, handleSubmit} = useForm();
    const tempInp = inputs.map(({name, type, defaultValue = "", placeholder, choices, required=true}) => {
        if (type !== "select") return <TextInput defaultValue={defaultValue} type={type} placeholder={placeholder} {...register(name, {required})}/>
        else return (<Select defaultValue={defaultValue} {...register(name, {required})} >{choices.map(({value, text}) => <option key={text} value={value}>{text}</option>)}</Select>)
    })
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
            {...tempInp}
            <Button color="success" type="submit">{btn}</Button>
        </form>
    );
}