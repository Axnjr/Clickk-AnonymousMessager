import { prismaDB } from '../../../../../../backendLib/prismaDb'
import Cors from "micro-cors";
import getStripe from '@/lib/getStripe'
import colors from "colors";
import { headers } from 'next/headers'
import type Stripe from 'stripe'

Cors({ allowMethods: ["POST", "HEAD"] });

function getSubscriptionsEndDate(startDate : string, type : string){
	const tempDate = startDate.split("/")
	if(type == "Divine Plan - Monthly"){
		return tempDate[0] + "/" + `${parseInt(tempDate[1]) + 1}` + "/" + tempDate[2]
	}
	if(type == "Divine Plan - Annually"){
		return tempDate[0] + "/" + tempDate[1] + "/" + `${parseInt(tempDate[2]) + 1}`
	}
}

export async function POST(request: Request) {
	const body = await request.text(),
		  signature = headers().get('Stripe-Signature') ?? '',
		  day = new Date().toLocaleDateString() as string
	;

	let event: Stripe.Event ; const stripe = await getStripe()

	try {
		event = stripe.webhooks.constructEvent(
			body,
			signature,
			process?.env?.NEXT_PUBLIC_STRIPE_WEBHOOKS_KEY || ''
		)
	} catch (err) {
		console.log(colors.bgWhite.red("Stripe evnt error --->"),err)
		return new Response(
			`Webhook Error: ${err instanceof Error ? err.message : 'Unknown Error' }`,
			{ status: 400 }
		)
	}

	const session = event.data.object as Stripe.Checkout.Session

	if (!session?.metadata?.userId) { return new Response(null, { status: 200 }) }

	const { userId , planName } = session.metadata

	if (event.type === 'checkout.session.completed') {
		// membership property is present in the user model and in detail 
		// in userMembership model hence both needs to be updated

		await prismaDB.userMembership.upsert({
			where : { userId : userId },
			update : {
				membership : planName,
				membershipStartDate : day,
				membershipEndDate : getSubscriptionsEndDate(day,planName),
				paymentIntent : session.id
			},
			create:{
				userId : userId,
				membership : planName,
				membershipStartDate : day,
				membershipEndDate : getSubscriptionsEndDate(day,planName),
				paymentIntent : session.id
			}
		})

		await prismaDB.user.update({
			where:{ id : userId }, data:{ membership : planName }
		})
	}

	if (event.type == "invoice.payment_succeeded") {
		// membership property is present in the user model and in detail 
		// in userMembership model hence both needs to be updated

		await prismaDB.userMembership.upsert({
			where : { userId : userId },
			update : {
				membership : planName,
				membershipStartDate : day,
				membershipEndDate : getSubscriptionsEndDate(day,planName),
				paymentIntent : session.id
			},
			create:{
				userId : userId,
				membership : planName,
				membershipStartDate : day,
				membershipEndDate : getSubscriptionsEndDate(day,planName),
				paymentIntent : session.id
			}
		})
		
		await prismaDB.user.update({
			where:{ id : userId }, data:{ membership : planName }
		})
	}

	return new Response(null, { status: 200 })
}

// console.log(colors.bgWhite.green("9999999999999999999999999999999999999999999999999999999999999999999 CAME IN IF STATEMENT"))
// Retrieve the subscription details from Stripe.
// const subscription = await stripe.subscriptions.retrieve( session.subscription as string )
// await prismaDB.user.update({
//   where: {
//     stripeSubscriptionId: subscription.id,
//   },
//   data: {
//     stripePriceId: subscription.items.data[0]?.price.id,
//     stripeCurrentPeriodEnd: new Date(
//       subscription.current_period_end * 1000
//     ),
//   },
// })
// console.log(colors.bgWhite.green("55555555555555555555555555555555555555555555555555555555555555555555555 CAME IN IF STATEMENT"))
// await db.user.update({
//   where: {
//     id: session.metadata.userId,
//   },
//   data: {
//     stripeSubscriptionId: subscription.id,
//     stripeCustomerId: subscription.customer as string,
//     stripePriceId: subscription.items.data[0]?.price.id,
//     stripeCurrentPeriodEnd: new Date(
//       subscription.current_period_end * 1000
//     ),
//   },
// })
