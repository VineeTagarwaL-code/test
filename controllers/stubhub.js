import axios from "axios";

const stubhubURL = 'https://www.stubhub.com';

const fetchPerformerIdAndURL = async (artistName) => {
  const formData = new FormData();
  formData.append("text", artistName);
  formData.append("searchGuid", "E1BCC8EE-CE62-49F5-9497-3656CE041C89");
  formData.append("searchType", 2);
  try {
    const { data } = await axios.post("https://www.stubhub.com/search/groupedsearch?FormatDate=true", formData);
    const result = data.resultsWithMetadata;
    for (const item of result) {
      if (item.results.desc === "Top Result") {
        const topResults = item.results.results;
        for (const result of topResults) {
          if (result.title === artistName && result.url.split("/")[2] === "performer") {
            console.log("Performer ID: " + result.id);
            return { id: result.id, url: result.url.split("?")[0] };
          }
        }
      }
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const fetchEventURL = async (artistName, eventDate) => {
  const performer = await fetchPerformerIdAndURL(artistName);
  if (!performer) {
    return null;
  }
  try {
    const url = stubhubURL + performer.url;
    const params = {
      sortBy: 0,
      pageIndex: 0,
      method: 'GetFilteredEvents',
      categoryId: performer.id,
      from: `${eventDate}T00:00:00.000Z`,
      to: `${eventDate}T23:59:59.999Z`,
      countryCode: 'US',
    };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: url,
      params: params,
      headers: {}
    };

    const { data } = await axios(config);
    if (data.items && data.items.length > 0) {
      const eventURL = stubhubURL + data.items[0].url;
      console.log("Event URL: " + eventURL);
      return eventURL;
    } else {
      console.log("No events found for the given artist and date.");
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const fetchStubhubMinPrice = async (artistName, eventDateTime) => {
  const eventDate = eventDateTime.split("T")[0];
  const eventURL = await fetchEventURL(artistName, eventDate);
  if (!eventURL) {
    return null;
  }
  try {
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: eventURL,
      headers: {},
      data: {
        EstimatedFees: true,
        Quantity: 1,
        SortBy: "PriceWithFees"
      }
    };

    const { data } = await axios(config);
    const seat = data.Items[0];
    if (!seat) {
      console.log("No seats found for the given event.");
      return null;
    }

    const priceString = seat.PriceWithFees.replace(/,/g, ''); // Remove commas
    const priceMatch = priceString.match(/[\d.]+/);
    let minPrice = priceMatch ? parseFloat(priceMatch[0]) : null;

    return { minPrice, eventURL };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { fetchStubhubMinPrice };
