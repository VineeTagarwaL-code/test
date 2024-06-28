import axios from "axios";

const getTicketMasterPrice = async (eventId) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://services.ticketmaster.com/api/ismds/event/${eventId}/quickpicks?includeStandard=true&includeResale=true&includePlatinumInventoryType=true&ticketTypes=000000000001&embed=area&embed=offer&embed=description&apikey=b462oi7fic6pehcdkzony5bxhe&apisecret=pquzpfrfz7zd2ylvtz3w5dtyse&resaleChannelId=internal.ecommerce.consumer.desktop.web.browser.ticketmaster.us&limit=40&offset=0&sort=totalprice`,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:127.0) Gecko/20100101 Firefox/127.0",
        Accept: "*/*",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "TMPS-Correlation-Id": "47a5f4d7-d282-419c-b981-b85799317586",
        Origin: "https://www.ticketmaster.com",
        Connection: "keep-alive",
        Referer: "https://www.ticketmaster.com/",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-site",
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