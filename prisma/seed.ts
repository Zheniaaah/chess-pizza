import { prisma } from '@/lib';
import {
  CARTS,
  CATEGORIES,
  INGREDIENTS,
  OTHER_PRODUCTS,
  OTHER_PRODUCTS_VARIATIONS,
  USERS,
} from '@/prisma';

async function up() {
  await prisma.user.createMany({
    data: USERS,
  });

  await prisma.category.createMany({
    data: CATEGORIES,
  });

  await prisma.product.createMany({
    data: OTHER_PRODUCTS,
  });

  await prisma.ingredient.createMany({
    data: INGREDIENTS,
  });

  const pizza1 = await prisma.product.create({
    data: {
      name: 'Пепероні фреш',
      imageUrl:
        'https://images.weserv.nl/?url=media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp',
      categoryId: 1,
      ingredients: {
        connect: INGREDIENTS.slice(0, 5),
      },
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: 'Сирна',
      imageUrl:
        'https://images.weserv.nl/?url=media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
      categoryId: 1,
      ingredients: {
        connect: INGREDIENTS.slice(5, 10),
      },
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: 'Чорізо фреш',
      imageUrl:
        'https://images.weserv.nl/?url=media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
      categoryId: 1,
      ingredients: {
        connect: INGREDIENTS.slice(10, 40),
      },
    },
  });

  await prisma.productVariation.createMany({
    data: [
      // Пепероні фреш
      {
        productId: pizza1.id,
        price: 220,
        size: 20,
        dough: 1,
      },
      {
        productId: pizza1.id,
        price: 380,
        size: 30,
        dough: 2,
      },
      {
        productId: pizza1.id,
        price: 540,
        size: 40,
        dough: 2,
      },
      // Сирна
      {
        productId: pizza2.id,
        price: 210,
        size: 20,
        dough: 1,
      },
      {
        productId: pizza2.id,
        price: 370,
        size: 30,
        dough: 1,
      },
      {
        productId: pizza2.id,
        price: 530,
        size: 40,
        dough: 1,
      },
      {
        productId: pizza2.id,
        price: 200,
        size: 20,
        dough: 2,
      },
      {
        productId: pizza2.id,
        price: 360,
        size: 30,
        dough: 2,
      },
      {
        productId: pizza2.id,
        price: 520,
        size: 40,
        dough: 2,
      },
      // Чорізо фреш
      {
        productId: pizza3.id,
        price: 250,
        size: 20,
        dough: 1,
      },
      {
        productId: pizza3.id,
        price: 420,
        size: 30,
        dough: 2,
      },
      {
        productId: pizza3.id,
        price: 580,
        size: 40,
        dough: 2,
      },
      // Інші продукти
      ...OTHER_PRODUCTS_VARIATIONS,
    ],
  });

  await prisma.cart.createMany({
    data: CARTS,
  });

  await prisma.cartItem.create({
    data: {
      cartId: 1,
      productVariationId: 1,
      quantity: 2,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
      },
    },
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "users" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "categories" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "products" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "product_variations" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ingredients" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "carts" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "cart_items" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit();
  });
