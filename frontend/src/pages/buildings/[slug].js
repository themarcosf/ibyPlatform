import Image from "next/image";
import { useRouter } from "next/router";
import BuildingPage from "../../components/BuildingPage/BuildingPage";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import NavBar from "../../components/NavBar/NavBar";
import styles from "./build.module.scss";

function build({ data }) {
  const router = useRouter();

  return (
    <>
      <Header>
        <Image
          src="/iby_logo.svg"
          width={220}
          height={130}
          alt="iby_logo"
          priority
        />
        <NavBar />
      </Header>
      <BuildingPage
        image={data.images}
        isBuilding={data.isBuilding}
        description={data.description}
        street={data.street}
        district={data.district}
        state={data.state}
        price={data.price}
        area={data.area}
        id={data.id}
        startDate={data.startDate}
        endDate={data.endDate}
      />
      <Footer />
    </>
  );
}

export default build;

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps = async (ctx) => {
  const { slug } = ctx.params;

  const res = await fetch(`http://localhost:3333/properties/${slug}`);
  const data = await res.json();

  return {
    props: {
      data,
    },
    revalidate: 60 * 5,
  };
};
