import { fetch, ClientIdentifier } from "node-tls-client";

const getTicketMasterPrice = async (eventId) => {
  try {
    let minPrice = Infinity;

    await fetch(
      `https://services.ticketmaster.com/api/ismds/event/${eventId}/quickpicks?mode=primary:ppsectionrow+resale:ga_areas+platinum:all&includeResale=true&embed=offer&apikey=b462oi7fic6pehcdkzony5bxhe&apisecret=pquzpfrfz7zd2ylvtz3w5dtyse&sort=totalprice`,
      {
        proxy: `http://9AOJ3CyVgpOJNQnr:MjwRbEOoFPkn5mK6@geo.iproyal.com:12321`,
        headers: {
          "user-agent":
            "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:127.0) Gecko/20100101 Firefox/127.0",
          accept: "*/*",
          "accept-language": "en-US,en;q=0.5",
          "accept-encoding": "gzip, deflate, br, zstd",
          "TMPS-Correlation-Id": "47a5f4d7-d282-419c-b981-b85799317586",
          connection: "keep-alive",
          referer: "https://www.ticketmaster.com/",
          priority: "u=1",
        },
        options: {
          clientIdentifier: ClientIdentifier.firefox_123,
        },
      }
    ).then(async (response) => {
      let res = await response.json();
      const listings = res?._embedded?.offer;

      if (!listings) return;

      for (const listing of listings) {
        if (listing.totalPrice < minPrice) {
          minPrice = listing.totalPrice;
        }
      }
    });
    return minPrice;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export { getTicketMasterPrice };
