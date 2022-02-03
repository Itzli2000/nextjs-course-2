import fs from "fs/promises";
import path from "path";

const ProductDetailPage = ({ loadedProduct }) => {
  if (!loadedProduct) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  );
};

const getData = async () => {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  return JSON.parse(jsonData);
};

export const getStaticProps = async (context) => {
  const { params } = context;
  const productID = params.pid;
  const data = await getData();

  const product = data.products.find((product) => product.id == productID);

    if (!product) {
      return {
        notFound: true,
      };
    }

  return {
    props: {
      loadedProduct: product,
    },
  };
};

export const getStaticPaths = async () => {
  const data = await getData();
  const ids = data.products.map((product) => product.id);
  const paramsData = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: paramsData,
    fallback: true,
  };
};

export default ProductDetailPage;
