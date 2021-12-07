import Link from "next/link";
import Image from "next/image";
import Moment from "react-moment";
import "moment/locale/fr";
import useNextBlurhash from "use-next-blurhash";

function BlogPreview(prop) {
  const link = "/blog/" + prop.slug;
  const [blurDataUrl] = useNextBlurhash(prop.blurHash);
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-4 flex flex-col rounded shadow-sm bg-white overflow-hidden">
      <div>
        <Image
          layout="responsive"
          objectFit="cover"
          placeholder="blur"
          blurDataURL={blurDataUrl}
          width={6}
          height={4}
          src={prop.banner}
          alt="Thumbnail"
        />
      </div>
      <div className="p-5 lg:p-6 flex-grow w-full">
        <p className="font-semibold mb-1 text-indigo-500 uppercase">
          {prop.categorie}
        </p>
        <h3 className="font-semibold text-xl mb-2">{prop.title}</h3>
        <p>{prop.description}</p>
        <Link href={link}>
          <div className="py-5 text-sm uppercase font-bold text-indigo-800 hover:underline">
            <span data-config-id="action">Lire l'article</span>
            <span className="inline-block ml-2">
              <svg
                className="text-blue-500 h-3 w-3"
                viewBox="0 0 8 12"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1.875 0L0 1.875L4.125 6L0 10.125L1.875 12L7.875 6L1.875 0Z" />
              </svg>
            </span>
          </div>
        </Link>
      </div>
      <div className="py-4 px-5 lg:px-6 w-full flex items-center bg-gray-50">
        <div>
          <p className="font-semibold">{prop.author}</p>
          <p className="text-gray-500 text-sm">
            <Moment format="Do MMM YYYY HH:MM" locale="fr">
              {prop.date}
            </Moment>{" "}
            ∙ {prop.readingTime} min
          </p>
        </div>
      </div>
    </div>
  );
}

export default BlogPreview;
