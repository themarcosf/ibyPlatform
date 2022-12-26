import BuildingPage from "../../components/BuildingPage/BuildingPage";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

function build({ realtyData, auctionData }) {
  let expired

  let realtyAuctionEndDate = new Date(
    auctionData.auctionEndDate
  ).getTime();

  if (realtyAuctionEndDate > Date.now()){
    expired = false
  } else {
    expired = true
  }

  return (
    <>
      <Header />
      <BuildingPage
        inConstruction={realtyData.inConstruction}
        toRetrofit={realtyData.toRetrofit}
        image={realtyData.images}
        description={realtyData.description}
        address={realtyData.address}
        district={realtyData.district}
        state={realtyData.state}
        sqMeters={realtyData.sqMeters}
        currentValue={auctionData.currentValue}
        minValue={auctionData.minValue}
        id={realtyData.id}
        auctionId={auctionData.id}
        expired={expired}
        auctionEndDate={realtyAuctionEndDate}
        leaseBeginDate={auctionData.leaseBeginDate}
        leaseEndDate={auctionData.leaseEndDate}
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
  const data = initialData.data;

  const realtyData = data.realty;
  const auctionData = data.auction;

  return {
    props: {
      realtyData,
      auctionData,
    },
    revalidate: 60 * 5,
  };
};
