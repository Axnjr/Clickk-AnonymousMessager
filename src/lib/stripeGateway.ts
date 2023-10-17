import { Stripe, loadStripe } from "@stripe/stripe-js"

export async function GoDivine({lineItems} : {lineItems : any}) {

    console.log("CAME TO PAYMENTS ")

    let stripePromise: Promise <Stripe | null> | null = null
    const getstripe = () => {
        if(!stripePromise && process?.env?.NEXT_PUBLIC_STRIPE_API_KEY){
            stripePromise = loadStripe(process?.env?.NEXT_PUBLIC_STRIPE_API_KEY)
        }
        return stripePromise
    }

    const stripe = await getstripe()
    //@ts-ignore
    await stripe.redirectToCheckout({
        mode:"payment",
        lineItems,
        successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
		cancelUrl: window.location.origin
    })
}