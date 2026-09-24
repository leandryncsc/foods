import Image from "next/image";
import Link from "next/link";

import { db } from "@/lib/prisma";

const HomePage = async () => {
  const restaurants = await db.restaurant.findMany({
    select: {
      slug: true,
      name: true,
      avatarImageUrl: true,
    },
    orderBy: { name: "asc" },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 px-6 py-16">
      <h1 className="text-3xl font-bold">Escolha seu restaurante</h1>

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
        {restaurants.map((restaurant) => (
          <Link
            key={restaurant.slug}
            href={`/${restaurant.slug}`}
            className="flex flex-col items-center gap-2 rounded-xl border p-4 shadow-sm transition-shadow hover:shadow-md"
          >
            <Image
              src={restaurant.avatarImageUrl}
              alt={restaurant.name}
              width={80}
              height={80}
              className="rounded-full object-cover"
            />
            <span className="text-center text-sm font-semibold">
              {restaurant.name}
            </span>
          </Link>
        ))}

        {restaurants.length === 0 && (
          <p className="col-span-full text-center opacity-60">
            Nenhum restaurante cadastrado.
          </p>
        )}
      </div>
    </main>
  );
};

export default HomePage;
