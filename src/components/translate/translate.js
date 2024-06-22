import { useEffect, useState } from "react";

import "./translate.css";
import { fetchLanguages, translate } from "../../service/api.service";

function Translate() {
  const [language, setlanuguage] = useState([]);
  const [srcLang, setSrcLang] = useState("");
  const [targetLang, setTargetLang] = useState("");
  const [srcText, setSrcText] = useState("");
  const [targetText, setTargetText] = useState("");
  useEffect(() => {
    fetchLanguages()
      .then(res => {
        const data = res?.data?.data?.languages?.splice(0) ?? [];
        setlanuguage(data);
        setSrcLang(data[0]?.language ?? "");
        setTargetLang(data[1]?.language ?? "");
      })
      .catch(err => {
        setlanuguage([]);
        console.log(err);
      });
  }, []);

  function translateText() {
    if (language.length < 1) return;
    translate(
      srcText,
      srcLang ?? language[0]?.language,
      targetLang ?? language[1]?.language
    )
      .then(res => {
        setTargetText(res?.data?.data?.translations?.[0]?.translatedText);
      })
      .catch(err => {
        setTargetText("");
        console.log(err);
      });
  }
  return (
    <div className="translate-wrapper">
      <div className="input-text-wrapper source-wrapper">
        <div className="language-wrapper">
          <label>Source Language</label>
          <select
            name="srcLang"
            value={srcLang}
            onChange={e => setSrcLang(e.target.value)}
          >
            {language?.map((lang, index) => (
              <option key={lang.language + index}> {lang.language}</option>
            ))}
          </select>
        </div>
        <div className="text-wrapper">
          <textarea
            name="input-text"
            value={srcText}
            rows="3"
            minLength="100%"
            style={{ color: "#e8eaed", background: "transparent" }}
            onChange={e => setSrcText(e.target.value)}
          />
        </div>
      </div>
      <button
        className="convert-wrapper action"
        disabled={!Boolean(srcLang)}
        onClick={() => translateText()}
      >
        Translate
      </button>
      <div className="input-text-wrapper target-wrapper">
        <div className="language-wrapper">
          <label>Target Language</label>
          <select
            name="targetLang"
            value={targetLang}
            onChange={e => setTargetLang(e.target.value)}
          >
            {language?.map((lang, index) => (
              <option key={lang.language + index}> {lang.language}</option>
            ))}
          </select>
        </div>
        <div className="text-wrapper">
          <textarea
            name="target-text"
            rows="3"
            value={targetText}
            readOnly
            style={{ color: "#9e9e9e", background: "#303134" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Translate;
