import { discography } from "../discography.js";
import sleep from "../utils/sleep.js";
import {
  SetlistResponse,
  computeUIData,
  discographySchema,
  setlistResponseSchema,
} from "@/lib/logic";
// import fs from "fs";

let cache: SetlistResponse | null = null;
const SETLIST_API_KEY = process.env.SETLIST_API_KEY;

function url(pageNumber: number) {
  return `https://api.setlist.fm/rest/1.0/search/setlists?artistMbid=20244d07-534f-4eff-b4d4-930878889970&p=${pageNumber}&tourName=eras%20tour`;
}

async function fetchSetlist(pageNumber: number) {
  const fetchOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "x-api-key": SETLIST_API_KEY ?? "",
    },
  };
  console.info(
    Math.floor(Date.now() / 1000) + "Fetching page " + pageNumber + " from API"
  );
  const response = await fetch(url(pageNumber), fetchOptions);
  if (response.status >= 400) {
    console.error(`
      ${Math.floor(Date.now() / 1000)}
        Error fetching page
        ${pageNumber}
        from API
    `);
    throw new Error(response.statusText);
  } else {
    console.info(
      Math.floor(Date.now() / 1000) +
        "Success fetching page " +
        pageNumber +
        " from API"
    );
    return response.json();
  }
}

export async function fetchAndTransformData(year?: number) {
  const setlistData = await readFromCache();
  // fs.writeFileSync("setlist.json", JSON.stringify(setlistData));
  const response = computeUIData({
    discography: discographySchema.parse(discography),
    setlistResponse: setlistResponseSchema.parse(setlistData),
    year: year,
  });
  // fs.writeFileSync("data.json", JSON.stringify(response));
  return response;
}

async function fetchPages(pageNumber = 1): Promise<SetlistResponse> {
  // await sleep(1000);
  const response = await fetchSetlist(pageNumber);
  if (response.itemsPerPage * response.page < response.total) {
    await sleep(600);
    const nextPage = await fetchPages(pageNumber + 1);

    return setlistResponseSchema.parse({
      setlist: response.setlist.concat(nextPage.setlist),
    });
  } else {
    return setlistResponseSchema.parse(response);
  }
}

const fillCache = async () => {
  console.info("Refreshing cache");
  cache = await fetchPages();
  console.info("Cache refreshed successfully");
};

const readFromCache = async () => {
  if (cache) {
    console.info("Cache hit");
  } else {
    console.info("Cache miss");
    try {
      await fillCache();
    } catch (error) {
      console.error(error);
      throw new Error("Cache not ready", { cause: error });
    }
  }
  return cache;
};

setInterval(() => {
  console.info("Timebased refreshing cache");
  fillCache().catch((error) => console.error("Error refreshing cache", error));
}, 1000 * 60 * 11);
