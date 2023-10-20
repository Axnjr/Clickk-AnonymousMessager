import Stripe from "stripe";

export default function getStripe(){
    const ss = process?.env?.NEXT_PUBLIC_STRIPE_SECRET_KEY;
    if(ss){
        return new Stripe(ss, {
            apiVersion:"2023-08-16",
            typescript:true
        });
    }
    throw new Error("Stripe secret key not found in .env !")
}