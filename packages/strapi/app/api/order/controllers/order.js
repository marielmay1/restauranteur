"use strict";
const stripe = require('stripe')('sk_test_51K4doTEsYJ1Hg2wHagckKRhBu3EqPJgkOTaAtsJqts5ccYZNJF8PK6kQzRbvYfnWOdBcNFM8RVWqPhsPDNKhMLK700Go2TvOhE');

module.exports = {
  create: async (ctx) => {
    const { address, amount, dishes, token, city, state } = JSON.parse(
      ctx.request.body
    );
    const stripeAmount = Math.floor(amount * 100);
    // charge on stripe
    const charge = await stripe.charges.create({
      // Transform cents to dollars.
      amount: stripeAmount,
      currency: "usd",
      description: `Order ${new Date()} by ${ctx.state.user._id}`,
      source: token,
    });

    // Register the order in the database
    const order = await strapi.services.order.create({
      user: ctx.state.user.id,
      charge_id: charge.id,
      amount: stripeAmount,
      address,
      dishes,
      city,
      state,
    });

    return order;
  },
};
