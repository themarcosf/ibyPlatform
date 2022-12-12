import Image from "next/image";
import { useRouter } from "next/router";
import BuildingPage from "../../components/BuildingPage/BuildingPage";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import NavBar from "../../components/NavBar/NavBar";
import styles from "./build.module.scss";

function build({ data, auctionsData }) {

  console.log(data)
  
  const auction = auctionsData.find((auction) => auction.realtyId == data._id);


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
        inConstruction={data.inConstruction}
        toRetrofit={data.toRetrofit}
        image={data.images}
        description={data.description}
        streetAddress={data.streetAddress}
        neighborhood={data.neighborhood}
        state={data.state}
        sqMeters={data.sqMeters}
        lastBidValue={auction?.lastBidValue}
        minValue={auction?.minValue}
        id={data._id}
        auctionId={auction.id}
        expired={true}
        leaseBeginDate={auction.leaseBeginDate}
        auctionEndDate={auction.auctionEndDate}
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

  const res = await fetch(`http://127.0.0.1:8000/api/v1/realty/${slug}`);
  const initialData = await res.json();
  const data = initialData.data._realty;

  const auctionsRes = await fetch("http://127.0.0.1:8000/api/v1/auctions/");
  const initialAuctionsData = await auctionsRes.json();
  const auctionsData = initialAuctionsData.data._auctions;

  return {
    props: {
      data,
      auctionsData,
    },
    revalidate: 60 * 5,
  };
};
