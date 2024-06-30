import { Session, ClientIdentifier } from "node-tls-client";
import axios from "axios";
import qs from "qs";

const getCookies = async () => {
  try {
    const data = qs.stringify({
      jsData:
        '{"ttst":53,"ifov":false,"hc":8,"br_oh":1080,"br_ow":1920,"ua":"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:127.0) Gecko/20100101 Firefox/127.0","wbd":false,"tagpu":7.822007536135473,"wdif":false,"wdifrm":false,"npmtm":"NA","br_h":995,"br_w":1920,"isf":false,"nddc":1,"rs_h":1080,"rs_w":1920,"rs_cd":24,"phe":false,"nm":false,"jsf":false,"lg":"en-US","pr":1,"ars_h":1080,"ars_w":1920,"tz":-330,"str_ss":true,"str_ls":true,"str_idb":true,"str_odb":false,"plgod":false,"plg":5,"plgne":true,"plgre":true,"plgof":false,"plggt":false,"pltod":false,"hcovdr":false,"plovdr":false,"ftsovdr":false,"hcovdr2":false,"plovdr2":false,"ftsovdr2":false,"lb":false,"eva":37,"lo":false,"ts_mtp":0,"ts_tec":false,"ts_tsa":false,"vnd":"","bid":"20181001000000","mmt":"application/pdf,text/pdf","plu":"PDF Viewer,Chrome PDF Viewer,Chromium PDF Viewer,Microsoft Edge PDF Viewer,WebKit built-in PDF","hdn":false,"awe":false,"geb":false,"dat":false,"med":"defined","aco":"probably","acots":false,"acmp":"maybe","acmpts":false,"acw":"probably","acwts":false,"acma":"maybe","acmats":false,"acaa":"maybe","acaats":false,"ac3":"","ac3ts":false,"acf":"maybe","acfts":false,"acmp4":"maybe","acmp4ts":true,"acmp3":"maybe","acmp3ts":false,"acwm":"maybe","acwmts":true,"ocpt":false,"vco":"probably","vcots":false,"vch":"probably","vchts":true,"vcw":"probably","vcwts":true,"vc3":"","vc3ts":false,"vcmp":"","vcmpts":false,"vcq":"maybe","vcqts":false,"vc1":"probably","vc1ts":true,"dvm":-1,"sqt":false,"so":"landscape-primary","wdw":true,"ecpc":false,"lgs":true,"lgsod":false,"psn":true,"edp":false,"addt":false,"wsdc":true,"ccsr":true,"nuad":false,"bcda":false,"idn":true,"capi":false,"svde":false,"vpbq":true,"ucdv":false,"spwn":false,"emt":false,"bfr":false,"dbov":false,"cfpfe":"ZnVuY3Rpb24oKXt2YXIgdD1kb2N1bWVudFsnXHg3MVx4NzVceDY1XHg3Mlx4NzlceDUzXHg2NVx4NmNceDY1XHg2M1x4NzRceDZmXHg3MiddKCdceDYyXHg3Mlx4NmZceDc3XHg3M1x4NjVceDcyXHg2Nlx4NmNceDZmXHg3N1x4MmRceDYzXHg2Zlx4NmVceDc0XHg2","stcfp":"LmpzOjI6MTI2MjY5CmlAaHR0cHM6Ly9kYXRhZG9tZS5zZWF0Z2Vlay5jb20vdGFncy5qczoyOjQyOAplQGh0dHBzOi8vZGF0YWRvbWUuc2VhdGdlZWsuY29tL3RhZ3MuanM6Mjo3MTEKQGh0dHBzOi8vZGF0YWRvbWUuc2VhdGdlZWsuY29tL3RhZ3MuanM6Mjo3MjgK","ckwa":true,"prm":true,"tzp":"Asia/Kolkata","cvs":true,"usb":"NA","log2":true,"glvd":"Mozilla","glrd":"Radeon R9 200 Series, or similar","jset":1719427343}',
      eventCounters: "[]",
      jsType: "ch",
      cid: "59a4VJmjguixHGOqLUtCgGwC~pHYTWB8YT~8x~OVWUY8PZ2aVPu4~dUOIBdJN8T7P4i4Q43AjC8JAL~fXj_HxlWg_j_yzBOdr2nr4z2nhN6wArn97zOVc_RJf62gTZn_",
      ddk: "60D428DD4BC75DF55D205B3DBE4AFF",
      Referer:
        "https%3A%2F%2Fseatgeek.com%2Fjessica-pratt-tickets%2Fseattle-washington-neumos-2024-06-26-7-pm%2Fconcert%2F16837086",
      request:
        "%2Fjessica-pratt-tickets%2Fseattle-washington-neumos-2024-06-26-7-pm%2Fconcert%2F16837086",
      responsePage: "origin",
      ddv: "4.29.3",
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://datadome.seatgeek.com/js/",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:127.0) Gecko/20100101 Firefox/127.0",
        Accept: "*/*",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Content-type": "application/x-www-form-urlencoded",
        Origin: "https://seatgeek.com",
        Connection: "keep-alive",
        Referer: "https://seatgeek.com/",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-site",
        TE: "trailers",
        Cookie:
          "datadome=GHy9X1Y7DlIKKCEkrMap_wVf86ino_BDjhBHr~FioWPozOKMilSIeqHXrBgmCY5Yy9qEnkJujrzPCD8iraZ1BK_3KJhsN6N7Iw5aR7QqggbtHJBS4zR8fgiyTSrFM7UD; sg-event-page-view-id=158455d7-0b85-4847-b6e4-f597f4671d2c",
      },
      data: data,
    };
    let cookie = "";
    await axios.request(config).then((response) => {
      cookie = response.data.cookie;
    });
    return cookie;
  } catch (err) {
    console.log(err);
  }
};
const fetchPrices = async (eventId) => {
  try {
    const session = new Session({
      clientIdentifier: ClientIdentifier.firefox_123,
      randomTlsExtensionOrder: true,
    });
    const cookie1 = await getCookies();
    const res = await session
      .get(
        `https://seatgeek.com/api/event_listings_v2?client_id=MTY2MnwxMzgzMzIwMTU4&event_page_view_id=5edd5639-95a9-4ce2-8aa5-7d38e8cb3115&id=${eventId}&sixpack_client_id=ce5b70b5-5330-4947-bb4e-9a760b74e561`,
        {
          headers: {
            "user-agent":
              "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:127.0) Gecko/20100101 Firefox/127.0",
            accept: "*/*",
            "accept-language": "en-US,en;q=0.5",
            "accept-encoding": "gzip, deflate, br, zstd",
            connection: "keep-alive",
            TE: "trailers",
            cookie: `${cookie1}`,
          },
        }
      )
      .then(async (res) => await res?.json());
    const listings = res?.listings;
    let minPrice = Infinity;
    if (listings.length == 0) return null;
    for (const listing of listings) {
      if (listing.p + listing.dp < minPrice) {
        minPrice = listing.p + listing.dp;
      }
    }
    return minPrice;
  } catch (err) {
    console.log(err);
  }
};

export { fetchPrices };
