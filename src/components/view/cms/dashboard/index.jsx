import CardProductCms from '@/components/ui/cardProductCms';

const product = {
    src: 'https://via.placeholder.com/50',
    alt: 'contoh'
}

export default function Dashboard() {
  return (
    <div className="">
      <CardProductCms product={product} />
    </div>
  );
}
