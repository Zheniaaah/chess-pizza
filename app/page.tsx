import { Container, Filters, ProductCardsGroup, Title, TopBar } from '@/components/shared';

export default function Home() {
  const products = [
    {
      id: 1,
      name: 'Гавайська',
      price: 399,
      imageUrl: 'https://dodobrands.io/img/webp/pizza-dodomix.webp',
    },
    {
      id: 2,
      name: 'Гавайська',
      price: 399,
      imageUrl: 'https://dodobrands.io/img/webp/pizza-dodomix.webp',
    },
    {
      id: 3,
      name: 'Гавайська',
      price: 399,
      imageUrl: 'https://dodobrands.io/img/webp/pizza-dodomix.webp',
    },
    {
      id: 4,
      name: 'Гавайська',
      price: 399,
      imageUrl: 'https://dodobrands.io/img/webp/pizza-dodomix.webp',
    },
    {
      id: 5,
      name: 'Гавайська',
      price: 399,
      imageUrl: 'https://dodobrands.io/img/webp/pizza-dodomix.webp',
    },
    {
      id: 6,
      name: 'Гавайська',
      price: 399,
      imageUrl: 'https://dodobrands.io/img/webp/pizza-dodomix.webp',
    },
    {
      id: 7,
      name: 'Гавайська',
      price: 399,
      imageUrl: 'https://dodobrands.io/img/webp/pizza-dodomix.webp',
    },
    {
      id: 8,
      name: 'Гавайська',
      price: 399,
      imageUrl: 'https://dodobrands.io/img/webp/pizza-dodomix.webp',
    },
    {
      id: 9,
      name: 'Гавайська',
      price: 399,
      imageUrl: 'https://dodobrands.io/img/webp/pizza-dodomix.webp',
    },
    {
      id: 10,
      name: 'Гавайська',
      price: 399,
      imageUrl: 'https://dodobrands.io/img/webp/pizza-dodomix.webp',
    },
    {
      id: 11,
      name: 'Гавайська',
      price: 399,
      imageUrl: 'https://dodobrands.io/img/webp/pizza-dodomix.webp',
    },
    {
      id: 12,
      name: 'Гавайська',
      price: 399,
      imageUrl: 'https://dodobrands.io/img/webp/pizza-dodomix.webp',
    },
    {
      id: 13,
      name: 'Гавайська',
      price: 399,
      imageUrl: 'https://dodobrands.io/img/webp/pizza-dodomix.webp',
    },
  ];

  return (
    <>
      <Container className="mt-10">
        <Title size="lg" className="font-extrabold">
          Усі піци
        </Title>
      </Container>

      <TopBar />

      <Container className="mt-10 pb-14">
        <div className="flex gap-20">
          <div className="w-[250px]">
            <Filters />
          </div>

          <div className="flex flex-1 flex-col gap-16">
            <ProductCardsGroup
              title="Піци"
              items={products}
              categoryId={1}
              className="scroll-mt-28"
            />

            <ProductCardsGroup
              title="Комбо"
              items={products}
              categoryId={2}
              className="scroll-mt-28"
            />
          </div>
        </div>
      </Container>
    </>
  );
}
