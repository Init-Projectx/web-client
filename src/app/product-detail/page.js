import ProductImage from '../../components/ui/ProductImage';
import ProductDetail from '../../components/ui/ProductDetail';
import ProductCard from '../../components/ui/ProductCard';

const LandingPage = () => {
  return (
    <div>
      <div className="pt-16 container mx-auto p-4">
        <div className="flex flex-wrap">
          <ProductImage />
          <ProductDetail />
        </div>
        <div className="flex flex-wrap mt-8">
          {Array.from({ length: 12 }).map((_, index) => (
            <ProductCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
