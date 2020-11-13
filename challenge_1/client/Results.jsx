import React from 'react';

const Results = (props) => (
  <div>
    {props.results.map((result, key) => {
      return <li>Category1: {result.category1} | Category2: {result.category2} | Date: {result.date} | Description: {result.description}| Granularity: {result.granularity} | Year: {result.year}</li>
    })}
  </div>
)

export default Results;
