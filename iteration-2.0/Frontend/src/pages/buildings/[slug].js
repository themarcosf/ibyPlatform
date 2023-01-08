import BuildingPage from "../../components/BuildingPage/BuildingPage";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

function build({ realtyData, auctionData }) {
  let currentValue;
  let lastBidChecking = auctionData.auctionLog.slice(-1)[0]?.lastBidValue;

  lastBidChecking
    ? (currentValue = lastBidChecking)
    : (currentValue = auctionData.minAskValue);

    let realtyAuctionEndDate = new Date(auctionData.auctionEndDate).getTime();

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
        currentValue={currentValue}
        id={realtyData.id}
        auctionId={auctionData.id}
        minAskValue={auctionData.minAskValue}
        active={auctionData.active}
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
