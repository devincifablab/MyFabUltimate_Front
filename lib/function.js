import { removeCookies } from "cookies-next";
import router from "next/router";

export function setZero(number) {
    if (number < 10) {
        return "000" + number;
    } else if (number < 100) {
        return "00" + number;
    } else if (number < 1000) {
        return "0" + number;
    } else {
        return number;
    }
}

export function logout(user) {
    if(user.isMicrosoft == 1){
        window.sessionStorage.clear();
    }
    removeCookies('jwt');
    window.location.href = "/";
}

export function getColor(step, waitingAnswer) {
    if (waitingAnswer == true && step<3) {
        return 10;
    }

    return step;
}