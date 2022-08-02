import { Stripe } from 'stripe'

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`);

export default async function handler(req, res) {
  if (req.method === 'POST') {

    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        submit_type: 'pay',
           payment_method_types: ['card'],
           shipping_options: [
            { shipping_rate: 'shr_1LS2MLH3OlYkMoR4sD4HoCVq' }
           ],
            line_items: req.body.productsInCart.map((product) => {
              
               return {

                price_data: {
                    currency: 'eur',
                    tax_behavior:  "exclusive",
                    product_data: {
                      name: product.name,
                      images: [product.image],
                    },
                    unit_amount: product.price * 100,
                },
                quantity: product.quantity
               }
            }),
            mode: 'payment',
            success_url: `${req.headers.origin}/success`,
            cancel_url: `${req.headers.origin}/?canceled=true`,
            automatic_tax: {enabled: true},
      });

      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}