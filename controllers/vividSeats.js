import axios from "axios";

const getVividSeatsMinPrice = async (artistName, eventDateTime) => {
  try {
    const { data } = await axios.get(
      `https://www.vividseats.com/hermes/api/v1/search-suggestions`,
      {
        params: {
          query: artistName,
          includeIpAddress: false,
        },
      }
    );

    const performers = data?.performers;
    if (!performers) return;

    let performerId = null;
    for (const performer of performers) {
      if (performer.name === artistName) {
        performerId = performer.id;
        break;
      }
    }

    if (!performerId) {
      console.log("No performer found");
      return;
    }

    const productions = data?.productions;
    if (!productions) {
      console.log("No events found");
      return;
    }
    let event;
    const eventDate = eventDateTime.split("T")[0];
    for (const production of productions) {
      const productionDate = production.utcDate.split("T")[0];
      if (productionDate === eventDate) {
        event = production;
        break;
      }
    }
    if (!event) {
      console.log("No events found");
      return;
    }
    const minPrice = event.minPrice;
    const eventURL = "https://www.vividseats.com" + event.webPath;
    return { minPrice, eventURL };
  } catch (error) {
    console.error("Error occurred:", error);
    return null;
  }
};

export { getVividSeatsMinPrice };
