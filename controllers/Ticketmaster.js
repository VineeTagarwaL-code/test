import axios from "axios";

const getTicketMasterPrice = async (eventId) => {
  
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://services.ticketmaster.com/api/ismds/event/${eventId}/quickpicks?mode=primary:ppsectionrow+resale:ga_areas+platinum:all&includeResale=true&embed=offer&apikey=b462oi7fic6pehcdkzony5bxhe&apisecret=pquzpfrfz7zd2ylvtz3w5dtyse&sort=totalprice`,    
       headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:127.0) Gecko/20100101 Firefox/127.0",
        Accept: "*/*",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "TMPS-Correlation-Id": "47a5f4d7-d282-419c-b981-b85799317586",
        Connection: "keep-alive",
        Referer: "https://www.ticketmaster.com/",
        Priority: "u=1",
      },
    };
    let minPrice = Infinity;
    await axios.request(config).then((response) => {
      const res = response.data;
      const listings = res?._embedded?.offer;
  

      if (!listings) return;
      for (const listing of listings) {
        if (listing.totalPrice < minPrice) {
          
          minPrice = listing.totalPrice;
        }
      }
    });

    return minPrice
  } catch (err) {

    return null;
  }
};

export { getTicketMasterPrice };