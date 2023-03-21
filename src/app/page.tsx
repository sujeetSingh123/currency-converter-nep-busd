import CurrencyConverter from '@/modules/CurrencyConverter/CurrencyConverter';

export default function Home() {
  return (
    <main className={' grid h-screen place-items-center w-screen '}>
      <CurrencyConverter />
    </main>
  );
}
