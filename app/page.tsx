import { Container, Filters, ProductCardsGroup, Title, TopBar } from '@/components/shared';
import { prisma } from '@/lib';

export default async function Home() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          ingredients: true,
          variations: true,
        },
      },
    },
  });

  return (
    <>
      <Container className="mt-10">
        <Title size="lg" className="font-extrabold">
          Усі піци
        </Title>
      </Container>

      <TopBar categories={categories.filter((category) => category.products.length)} />

      <Container className="mt-10 pb-14">
        <div className="flex gap-20">
          <div className="w-[250px]">
            <Filters />
          </div>

          <div className="flex flex-1 flex-col gap-16">
            {categories.map(
              (category) =>
                category.products.length && (
                  <ProductCardsGroup
                    key={category.id}
                    title={category.name}
                    products={category.products}
                    categoryId={category.id}
                    className="scroll-mt-28"
                  />
                ),
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
