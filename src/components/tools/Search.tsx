import React, { useCallback, useState } from "react";
import { Button, Input } from "antd";
import { debounce } from "lodash";
import { useDispatch } from "react-redux";
import { setSearchString } from "../../Redux/FilterSlice.ts";

//type setSearch = (event) => void

const SearchBtn = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const search2Redux = useCallback(
    debounce((str) => {
      dispatch(setSearchString(str));
    }, 500),
    []
  );
  const searchOnType = (e) => {
    setSearch(e);
    search2Redux(search);
  };
  return (
    <Input
      value={search}
      placeholder="pizza search..."
      allowClear
      onSearch={setSearch}
      onChange={(e) => searchOnType(e.target.value)} // onChange={(e) => setSearch(e.target.value)}
      style={{ width: 200 }}
    />
  );
};
export default SearchBtn;
