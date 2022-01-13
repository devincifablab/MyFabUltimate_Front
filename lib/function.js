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

export function getState(step, waitingAnswer) {
    if (waitingAnswer == true && step<3) {
        return "Vous avez reçu un commentaire.";
    }

    switch (step) {
        case 1:
            return "Vos fichiers STL ont été validés.";
        case 2:
            return "Votre impression est initiée.";
        case 3:
            return "Votre impression est terminée.";
        case 4:
            return "Votre ticket a été fermé.";
        default:
            return "Votre ticket n'est pas encore traité.";
    }
}

export function logout(user) {
    console.log(user);
    if(user.isMicrosoft == 1){
        window.sessionStorage.clear();
    }
    removeCookies('jwt');
    router.push('/');
}

export function getColor(step, waitingAnswer) {
    if (waitingAnswer == true && step<3) {
        return 10;
    }

    return step;
}