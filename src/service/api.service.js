import axios from "axios";
export async function fetchLanguages() {
  const options = {
    method: "GET",
    url: "https://google-translate1.p.rapidapi.com/language/translate/v2/languages",
    headers: {
      "Accept-Encoding": "application/gzip",
      "X-RapidAPI-Key": "882e931aebmshbc12544499d7b7cp1345c8jsnd736986143a8",
      "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
    },
  };
  return await axios.request(options);
}

export async function translate(text, sl, tl) {
  const encodedParams = new URLSearchParams();
  encodedParams.set("q", text);
  encodedParams.set("source", sl);
  encodedParams.set("target", tl);

  const options = {
    method: "POST",
    url: "https://google-translate1.p.rapidapi.com/language/translate/v2",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "Accept-Encoding": "application/gzip",
      "X-RapidAPI-Key": "882e931aebmshbc12544499d7b7cp1345c8jsnd736986143a8",
      "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
    },
    data: encodedParams,
  };
  return await axios.request(options);
}
