

import Image from "next/image";
import { client } from "../sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";

const getProductData = async () => {
  const data = await client.fetch(`*[_type == "product"]{
    price,
    _id,
    title,
    description,
    image,
    category -> {
      name
    }
  }`);
  console.log(data); // Log the fetched data here
  return data;
};

// const getProductData = async () => {
//   const data = await client.fetch(`*[_type == "product"]{
//     console.log(data);
//     price,
//     _id,
//     title,
//     description,
//     image,
//     category -> {
//       name
//     }
//   }`);
//   return data;
// };

interface IProduct {
  title: string;
  _id: string;
  description: string;
  image: Array<{ asset: { _ref: string; _type: string } }>;
  price: number;
  category: {
    name: string;
  };
}

export default async function Home() {
  const products: IProduct[] = await getProductData();

  const handleAddtoCart = () => {
    console.log("Add to Cart");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
          >
            {/* Product Image Carousel */}
            <div className="relative group">
              <div className="relative h-60 w-full overflow-hidden">
                {item.image && Array.isArray(item.image) && item.image.length > 0 ? (
                  item.image.map((img, index) => (
                    <Image
                      key={index}
                      src={urlForImage(img)}
                      alt={item.title}
                      fill
                      className={`object-cover transition-transform duration-500 group-hover:scale-110 ${
                        index === 0 ? "block" : "hidden"
                      }`}
                    />
                  ))
                ) : (
                  <div className="h-60 w-full flex items-center justify-center bg-gray-100 text-gray-500">
                    No Image Available
                  </div>
                )}
              </div>
              {/* Carousel Navigation */}
              <div className="absolute inset-0 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-80">
                  ❮
                </button>
                <button className="bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-80">
                  ❯
                </button>
              </div>
            </div>
            {/* Product Details */}
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-800">{item.title}</h2>
              {/* <p className="text-sm text-gray-500 mb-2">{item.category.name}</p> */}
              <p className="text-xl font-semibold text-gray-800">${item.price}</p>
              {/* <button onClick={() => handleAddtoCart} className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                Add to Cart
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



