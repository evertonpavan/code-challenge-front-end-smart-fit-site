import Image from "next/image";

export function Legends() {
  const blocksData = [
    {
      title: "Mascára",
      value: "mask",
      items: [
        {
          id: 1,
          value: "Required",
          label: "Obrigatório",
          image: "/images/required-mask.png",
          altText: "icon masc",
        },
        {
          id: 2,
          value: "recommended",
          label: "Recomendado",
          image: "/images/recommended-mask.png",
          altText: "icon masc",
        }
      ]
    },
    {
      title: "Toalha",
      value: "towel",
      items: [
        {
          id: 1,
          value: "Required",
          label: "Obrigatório",
          image: "/images/required-towel.png",
          altText: "icon towel",
        },
        {
          id: 2,
          value: "recommended",
          label: "Recomendado",
          image: "/images/recommended-towel.png",
          altText: "icon towel",
        }
      ]
    },
    {
      title: "Bebedouro",
      value: "fountain",
      items: [
        {
          id: 1,
          value: "partial",
          label: "Parcial",
          image: "/images/partial-fountain.png",
          altText: "icon fountain",
        },
        {
          id: 2,
          value: "not_allowed",
          label: "Proibido",
          image: "/images/not_allowed-fountain.png",
          altText: "icon fountain",
        },
      ]
    },
    {
      title: "Vestiários",
      value: "locker_room",
      items: [
        {
          id: 1,
          value: "allowed",
          label: "Liberado",
          image: "/images/allowed-lockerroom.png",
          altText: "icon masc",
        },
        {
          id: 2,
          value: "partail",
          label: "Parcial",
          image: "/images/partial-lockerroom.png",
          altText: "icon masc",
        },
        {
          id: 3,
          value: "closed",
          label: "Fechado",
          image: "/images/closed-lockerroom.png",
          altText: "icon masc",
        }
      ]
    },
  ];

  return (
    <div className="py-12">
      <div className="bg-smartfit-lighGrey/5 grid grid-cols-1 md:grid-cols-4">
        {/* Map over the blocksData array to generate blocks dynamically */}
        {blocksData.map((block, index) => (
          <div key={index} className="items-center flex-col justify-center py-8 px-8 text-center space-y-4">
            <p className="font-extrabold text-lg">{block.title}</p>
            <div className="flex items-center justify-around md:justify-between">
              {/* Map over the items array within each block */}
              {block.items.map((item) => (
                <div key={item.id} className="items-center justify-center text-center flex flex-col">
                  <Image
                    src={item.image}
                    width={80}
                    height={80}
                    alt={item.altText}
                    className="w-20"
                  />
                  <p>{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
