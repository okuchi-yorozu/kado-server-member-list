import React from "react";
import {login, logout} from "../firebase/auth";
import {Button} from "@mui/material";

type BaseButtonProps = {
    style?: React.CSSProperties
    variant: "contained" | "outlined"
    text: string;
    onclick(): void;
}

const BaseButton: React.FC<BaseButtonProps> = (props) => (
    <Button style={props.style} variant={props.variant} onClick={props.onclick}>{props.text}</Button>
)

const LoginButton = (props) => <BaseButton style={props.style} variant="contained" text="Google ログイン" onclick={
    () => login()
}/>

const LogoutButton = () => <BaseButton variant="outlined" text="ログアウト" onclick={
    () => logout()
}/>

const SaveButton = (props) => <BaseButton variant="contained" text="送信" onclick={props.onclick
}/>

export {LoginButton, LogoutButton, SaveButton}