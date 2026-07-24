const MAX_ADS_PER_DAY = 5;
const GOLD_REWARD = 5000;

const STORAGE_KEY = "cosmic_ads";

const getToday = () => new Date().toDateString();

const isBrowser = () =>
  typeof window !== "undefined" &&
  typeof localStorage !== "undefined";


export function getAdsData() {

  if (!isBrowser()) {
    return {
      date: getToday(),
      watched: 0,
    };
  }


  const saved = localStorage.getItem(
    STORAGE_KEY
  );


  if (!saved) {

    const data = {
      date: getToday(),
      watched: 0,
    };


    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(data)
    );


    return data;
  }


  const data = JSON.parse(saved);



  if (data.date !== getToday()) {

    data.date = getToday();

    data.watched = 0;


    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(data)
    );

  }


  return data;

}



export function canWatchAd() {

  if (!isBrowser()) return false;


  return (
    getAdsData().watched <
    MAX_ADS_PER_DAY
  );

}




export async function registerAdWatch(
  telegramId: string
) {

  if (!isBrowser()) return false;


  const data = getAdsData();



  if (
    data.watched >=
    MAX_ADS_PER_DAY
  ) {
    return false;
  }



  const response = await fetch(
    "/api/player/add-coins",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        telegramId,
        amount: GOLD_REWARD,
      }),

    }
  );



  if (!response.ok) {

    console.error(
      "Erro ao adicionar coins"
    );

    return false;

  }



  data.watched++;



  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data)
  );



  return true;

}




export function getAdsRemaining() {

  if (!isBrowser()) {
    return MAX_ADS_PER_DAY;
  }


  return (
    MAX_ADS_PER_DAY -
    getAdsData().watched
  );

}



export const AD_REWARD = GOLD_REWARD;

export const MAX_DAILY_ADS =
  MAX_ADS_PER_DAY;