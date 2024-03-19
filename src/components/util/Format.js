import React, { Component } from "react";

const getBrText = (text) =>
    {
      let res = []
      let rows = text.split("\n")
      for (let row of rows)
        res.push(<div>{row}<br/></div>)
      return res;
    }

export { getBrText };