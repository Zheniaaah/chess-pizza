import { Container, Filters, Title, TopBar } from '@/components/shared';

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title size="lg" className="font-extrabold">
          Усі піци
        </Title>
      </Container>

      <TopBar />

      <Container className="mt-10 pb-14">
        <div className="flex gap-15">
          <div className="w-[250px]">
            <Filters />
          </div>

          <div className="flex flex-1 flex-col gap-16">Список товарів</div>
        </div>
      </Container>
    </>
  );
}
