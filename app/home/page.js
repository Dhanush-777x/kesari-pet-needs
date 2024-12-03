import Image from "next/image";
import {
  Search,
  ArrowRight,
  CheckCircle,
  Star,
  ThumbsUp,
  PawPrint,
} from "lucide-react";
import Marquee from "react-fast-marquee";
import AuthGuard from "@/components/Authguard";
import Navbar from "@/components/navbar";

const productImages = [
  "/assets/pet-foods/pedigree.png",
  "/assets/pet-foods/yarrah.png",
  "/assets/pet-foods/whiskas.png",
  "/assets/pet-foods/medley.png",
  "/assets/pet-foods/soya.png",
  "/assets/pet-foods/tomi.png",
  "/assets/pet-foods/canin.png",
];

const Home = () => {
  return (
    <AuthGuard>
      <Navbar />
      <div className="relative min-h-screen flex flex-col bg-background text-text">
        {/* Main Content */}
        <main className="flex-grow">
          <div className="pt-10 mt-32 mb-12 container mx-auto bg-secondary rounded-lg text-text flex flex-row justify-between px-4 relative">
            {/* Left Side */}
            <div className="flex flex-col items-start justify-center w-1/2 px-20 py-10">
              <h1 className="text-4xl sm:text-5xl font-bold text-left">
                Welcome to Kesari Pet Needs
              </h1>
              <p className="mt-4 text-base sm:text-lg text-left text-gray-600">
                Find the best food and services for your pets!
              </p>

              {/* Decorative Paw Icons */}
              <PawPrint className="h-10 w-10 text-primary absolute top-5 left-10 opacity-20 rotate-12" />
              <PawPrint className="h-40 w-40 text-accent absolute top-20 left-60 opacity-10 rotate-10" />
              <PawPrint className="h-12 w-12 text-primary absolute bottom-60 right-10 opacity-40 -rotate-90" />
              <PawPrint className="h-12 w-12 text-primary absolute bottom-80 right-40 opacity-40 -rotate-90" />

              <a
                href="/products"
                className="mt-6 flex items-center bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-accent transition"
              >
                Explore Pet Essentials
                <ArrowRight className="h-5 w-5 ml-2" />
              </a>
            </div>

            {/* Right Side */}
            <div className="w-1/2 flex items-center justify-center">
              <img
                src="/assets/others/dog-herosection.png" // Replace with your actual image path
                alt="Dog"
                className="max-w-96 h-auto rounded-lg"
              />
            </div>
          </div>

          <div className="py-12 bg-light container mx-auto rounded-lg">
            <div className="relative overflow-hidden">
              {/* Wrapper for images with animation */}
              <Marquee
                gradient={true}
                pauseOnHover={true}
                gradientColor="#F7F7FE"
              >
                <div className="flex items-center justify-center space-x-8">
                  {productImages.concat(productImages).map((src, index) => (
                    <div
                      key={index}
                      className="h-32 w-32 relative flex-shrink-0"
                    >
                      <Image
                        src={src}
                        alt={`Product ${index + 1}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </Marquee>
            </div>
          </div>
          {/* Feature Cards Section */}
          <div className="py-16 container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: Top Brands */}
            <div className="bg-white shadow-lg rounded-lg p-10 text-center hover:shadow-xl transition">
              <CheckCircle className="h-10 w-10 text-primary mx-auto" />
              <h3 className="text-xl font-semibold text-primary mt-4">
                Top Pet Brands
              </h3>
              <p className="mt-4 text-gray-600">
                We feature the most trusted and high-quality pet brands to keep
                your furry friends happy and healthy.
              </p>
            </div>

            {/* Card 2: Best Services */}
            <div className="bg-white shadow-lg rounded-lg p-10 text-center hover:shadow-xl transition">
              <Star className="h-10 w-10 text-primary mx-auto" />
              <h3 className="text-xl font-semibold text-primary mt-4">
                Best Services for Pets
              </h3>
              <p className="mt-4 text-gray-600">
                From grooming to healthcare, find the best services tailored for
                your pets' needs.
              </p>
            </div>

            {/* Card 3: Expert Recommendations */}
            <div className="bg-white shadow-lg rounded-lg p-10 text-center hover:shadow-xl transition">
              <ThumbsUp className="h-10 w-10 text-primary mx-auto" />
              <h3 className="text-xl font-semibold text-primary mt-4">
                Expert Recommendations
              </h3>
              <p className="mt-4 text-gray-600">
                Our experts help you choose the best products and services to
                ensure your pets get the care they deserve.
              </p>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
};

export default Home;
