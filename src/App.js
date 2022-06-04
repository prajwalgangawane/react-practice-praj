import "./styles.css";
import data from "./db.json";
import _ from "lodash";

import { useEffect, useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [sources, setSources] = useState([]);
  const [selectedSource, setSelectedSource] = useState();

  useEffect(() => {
    const filter_sources = _.uniqBy(
      data.map((news) => news.source),
      "id"
    );
    setSources(filter_sources);
    setSelectedSource(filter_sources[0].id);
  }, []);

  useEffect(() => {
    const _filter = (e) => {
      let retvalue = e.title.includes(query) && e.source.id === selectedSource;
      return retvalue;
    };
    let value = _.filter(data, _filter);
    value = _.sortBy(value, ["source.name"]);
    setFiltered(value);
  }, [query, selectedSource]);

  return (
    <div className="App">
      <h1>News Feed</h1>
      <input
        type="text"
        placeholder="Enter a Query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <select
        placeholder="Select a Source"
        value={selectedSource}
        onChange={(e) => setSelectedSource(e.target.value)}
      >
        {sources.map((source) => (
          <option key={source.id} value={source.id} label={source.name} />
        ))}
      </select>
      <hr />
      {query
        ? `Found ${filtered.length} topics for "${query}" from Current Source`
        : `All topics listed : ${filtered.length} from current source`}
      <hr />
      {filtered.map((news) => (
        <div key={news.id}>
          <a style={{ textDecoration: "none" }} href={news.url}>
            <b>{news.title}</b>
          </a>
          <p>{news.description}</p>
          <p>{news.content}</p>
          <p>
            {news.publishedAt
              ? `Published at ${new Date(news.publishedAt).toLocaleString()}`
              : null}
          </p>
          <p>{news.source.name ? `Sources : ${news.source.name}` : null}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}
