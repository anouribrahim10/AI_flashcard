import { loadStripe } from "@stripe/stripe-js";
let stripPromise
const getStripe = () => {
    if (!stripPromise) {
        stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
    }
    return stripPromise
}

export default getStripe