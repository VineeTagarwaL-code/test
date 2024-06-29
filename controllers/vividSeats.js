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
    console.log(event.minPrice);
  } catch (error) {
    console.error("Error occurred:", error);
  }
};

getVividSeatsMinPrice("Charli XCX", "2024-09-23T01:30:00Z");
