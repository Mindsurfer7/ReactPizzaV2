import React from "react";
import ContentLoader from "react-content-loader";

const PizzaLoader = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="46" y="292" rx="3" ry="3" width="150" height="10" />
    <rect x="1" y="417" rx="3" ry="3" width="79" height="33" />
    <rect x="371" y="56" rx="3" ry="3" width="410" height="6" />
    <rect x="7" y="322" rx="3" ry="3" width="251" height="4" />
    <rect x="454" y="99" rx="3" ry="3" width="178" height="6" />
    <circle cx="119" cy="162" r="117" />
    <rect x="1" y="336" rx="0" ry="0" width="257" height="69" />
    <rect x="160" y="352" rx="0" ry="0" width="49" height="12" />
    <circle cx="435" cy="64" r="24" />
    <rect x="123" y="422" rx="24" ry="24" width="132" height="29" />
  </ContentLoader>
);
export default PizzaLoader;
